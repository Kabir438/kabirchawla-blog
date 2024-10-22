import { client } from "@/sanity/lib/client";
import { z } from "zod";
import { slug } from "./getBlogs";

const schema = z.array(z.object({
    _id: z.string(),
    slug: slug,
    description: z.string(),
    _rev: z.string(),
    _updatedAt: z.string().refine(el => typeof Date.parse(el) === "number"),
    title: z.string(),
    _createdAt: z.string().refine(el => typeof Date.parse(el) === "number"),
    _type: z.literal("category"),
}))

export default async function getCategories() {
    const query = `*[_type == "category"]`;

    const result = await client.fetch(query, {}, { cache: 'no-store' });
    const parsedResult = schema.parse(result);
    // console.log(result[0].author.bio)
    return parsedResult;
    // return result;
}