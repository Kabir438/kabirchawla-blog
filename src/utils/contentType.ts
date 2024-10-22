import { z } from "zod";

const spanSchema = z.object({
  _type: z.literal("span"),
  marks: z.array(z.string()),
  text: z.string(),
  _key: z.string()
});

const blockSchema = z.object({
  _type: z.literal("block"),
  style: z.string(),
  _key: z.string(),
  markDefs: z.array(z.any()),
  children: z.array(spanSchema),
  listItem: z.string().optional(),
  level: z.number().optional()
});

const codeSchema = z.object({
  _type: z.literal("code"),
  _key: z.string(),
  code: z.string(),
  language: z.string()
});

const youtubeVideoSchema = z.object({
  _type: z.literal("youtubeVideo"),
  videoId: z.string(),
  _key: z.string(),
  autoplay: z.boolean(),
  controls: z.boolean()
});

const tableRowSchema = z.object({
  _type: z.literal("tableRow"),
  _key: z.string(),
  cells: z.array(z.string())
});

const tableSchema = z.object({
  _type: z.literal("table"),
  _key: z.string(),
  rows: z.array(tableRowSchema)
});

const muxVideoSchema = z.object({
  _type: z.literal("mux.video"),
  _key: z.string()
});

export const imageSchema = z.object({
  _type: z.literal("image"),
  alt: z.string().optional(),
  glow: z.boolean().optional(),
  asset: z.object({
    _ref: z.string(),
    _type: z.literal("reference")
  })
}).or(z.object({
  glow: z.boolean().optional(),
  _upload: z.object({
    file: z.object({
      name: z.string(),
      type: z.string().startsWith("image/"),
    }),
    progress: z.number().min(0).max(100),
    previewImage: z.string().regex(/^data:image\/.+;base64,/),
    updatedAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    }),
    createdAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    }),
  }),
  _type: z.literal('image'),
  alt: z.string(),
}))

const contentSchema = z.array(
  z.union([
    blockSchema,
    codeSchema,
    youtubeVideoSchema,
    tableSchema,
    muxVideoSchema,
    imageSchema
  ])
);

export default contentSchema;