import { db } from "@/actions/firebase";
import { client } from "@/sanity/lib/client";
import { z } from "zod";
import contentSchema from "./contentType";

export const imageSchema = z.object({
    _type: z.literal("image"),
    alt: z.string().optional(),
    asset: z.object({
        _ref: z.string(),
        _type: z.literal("reference")
    })
}).or(z.object({
    _upload: z.object({
        file: z.object({
            name: z.string(),
            type: z.string().startsWith("image/"),
        }),
        progress: z.number().min(0).max(100),
        previewImage: z.string().regex(/^data:image\/.+;base64,/),
        updatedAt: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
            message: 'Invalid date format',
        }),
        createdAt: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
            message: 'Invalid date format',
        }),
    }),
    _type: z.literal('image'),
    alt: z.string(),
}))

export const slug = z.object({
    current: z.string(),
    _type: z.literal("slug"),
})

const author = z.object({
    _createdAt: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
        message: 'Invalid date format',
    }),
    bio: z.string(),
    caption: z.string(),
    _id: z.string(),
    _updatedAt: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
        message: 'Invalid date format',
    }),
    slug: slug,
    image: imageSchema,
    _rev: z.string(),
    _type: z.literal("author"),
    name: z.string(),
});

const category = z.object({
    _type: z.literal("category"),
    description: z.string(),
    _id: z.string(),
    title: z.string(),
    _updatedAt: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
        message: 'Invalid date format',
    }),
    slug,
    _createdAt: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
        message: 'Invalid date format',
    }),
    _rev: z.string(),
})

export const blogsSchema = z.array(z.strictObject({
    _id: z.string(),
    rating: z.number().refine(i => i % 0.5 === 0),
    image: imageSchema,
    bannerImage: imageSchema.optional(),
    body: contentSchema,
    _rev: z.string(),
    href: slug,
    _updatedAt: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
        message: 'Invalid date format',
    }),
    publishedAt: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
        message: 'Invalid date format',
    }),
    author: author,
    title: z.string(),
    baseViews: z.number(),
    actualViews: z.number(),
    timeTakenToRead: z.string(),
    _createdAt: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
        message: 'Invalid date format',
    }),
    categories: z.array(category),
    _type: z.literal("post"),
    description: z.string(),
    comments: z.array(z.object({
        name: z.string(), 
        commented_at: z.string().refine(i => !Number.isNaN(Date.parse(i))), 
        message: z.string()
    }))
}))

export default async function getBlogs() {
    const query = `*[_type == "post"]{...,author->{...},categories[]->{...},comments[]->{...}}`;

    const result = await client.fetch(query, {}, { cache: 'no-store' });
    const parsedResult = blogsSchema.parse(result);
    const updatedResult = await Promise.all(parsedResult.map(async (result) => {
        const firebaseRes = await db
            .collection("posts")
            .doc(parsedResult[0]._id)
            .get();
        if (!firebaseRes.exists) {
            await db
                .collection("posts")
                .doc(parsedResult[0]._id)
                .create({
                    viewCount: 0
                })
        }
        const firebaseData = firebaseRes.data();
        const viewCount = (
            typeof firebaseData === "object" &&
            "viewCount" in firebaseData &&
            typeof firebaseData.viewCount === "number"
        ) ? firebaseData.viewCount : 0;
        return {
            ...result,
            actualViews: viewCount
        } satisfies typeof result
    }))
    return updatedResult;
}