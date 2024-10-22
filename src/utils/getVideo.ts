import { client } from '@/sanity/lib/client';
import { z } from 'zod';

const dataSchema = z.object({
    resolution_tier: z.string(),
    static_renditions: z.any(),
    max_resolution_tier: z.string(),
    mp4_support: z.string(),
    duration: z.number(),
    max_stored_resolution: z.string(),
    aspect_ratio: z.string(),
    video_quality: z.string(),
    master_access: z.string(),
    test: z.boolean(),
    passthrough: z.string(),
    tracks: z.any(),
});

const assetSchema = z.object({
    _type: z.literal('mux.videoAsset'),
    _updatedAt: z.string().refine(date => !Number.isNaN(Date.parse(date)), {
        message: 'Invalid date format for _updatedAt',
    }),
    uploadId: z.string(),
    assetId: z.string(),
    _id: z.string(),
    playbackId: z.string(),
    data: dataSchema,
    status: z.literal('ready'),
    _createdAt: z.string().refine(date => !Number.isNaN(Date.parse(date)), {
        message: 'Invalid date format for _createdAt',
    }),
    _rev: z.string(),
});

const videoSchema = z.object({
    video: z.object({
        _type: z.literal('mux.video'),
        _key: z.string(),
        asset: assetSchema,
    })
});

export default async function getVideo(key: string) {
    const query = `
    *[_type == "post" && count(body[_type == "mux.video" && _key == "${key}" && defined(asset)]) > 0] {
        "video": body[_type == "mux.video"]{
          ...,
          asset -> {
            ...
          }
        }[0]
    }[0]`;

    const result = await client.fetch(query, {}, { cache: 'no-store' });
    const parsedResult = videoSchema.parse(result);

    return parsedResult;
}