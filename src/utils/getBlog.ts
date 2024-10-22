"use server";

import { db } from "@/actions/firebase";
import { client } from "@/sanity/lib/client";
import { z } from "zod";
import { blogsSchema } from "./getBlogs";

const commentsSchema = z.array(z.object({
    message: z.string(),
    name: z.string(),
    commented_at: z.string().refine(i =>!Number.isNaN(Date.parse(i)))
}))

export default async function getBlog(slug: string) {
    const query = `*[_type == "post" && slug.current == ${slug}]{...,author->{...},categories[]->{...},comments[]->{...}}`;
    // const query = `*[_type == "post"]`;
    // console.log(query, slug, await client.projects.list());
    const result = await client.fetch(query, {}, { cache: 'no-cache' });
    console.log(result[0].body[13]);
    const parsedResult = await blogsSchema.parseAsync(result);
    const firebaseRes = await db
        .collection("posts")
        .doc(parsedResult[0]._id)
        .get();
    if (!firebaseRes.exists) {
        await db
            .collection("posts")
            .doc(parsedResult[0]._id)
            .create({
                viewCount: 0,
            })
    }
    const firebaseData = firebaseRes.data();
    const viewCount = (
        typeof firebaseData === "object" &&
        "viewCount" in firebaseData &&
        typeof firebaseData.viewCount === "number"
    ) ? firebaseData.viewCount : 0;
    const comments = await commentsSchema.parseAsync((await db
        .collection('posts')
        .doc(parsedResult[0]._id)
        .collection('comments')
        .get()).docs.map(doc => doc.data()));
    return { 
        ...parsedResult[0],
        actualViews: viewCount,
        comments
    } satisfies typeof parsedResult[number];
    // return undefined
}