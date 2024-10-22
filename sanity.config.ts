'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/admin/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'
import {sanityComputedField} from "sanity-plugin-computed-field"
import {markdownSchema} from 'sanity-plugin-markdown/next'
import {codeInput} from "@sanity/code-input"
import {muxInput} from 'sanity-plugin-mux-input'
import {inlineSvgInput} from '@focus-reactive/sanity-plugin-inline-svg-input'
import {table} from '@sanity/table'
import {assist} from '@sanity/assist'
import type {InferSchemaValues} from "@sanity-typed/types";

const config = defineConfig({
  basePath: '/admin',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({structure}),
    sanityComputedField(),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
    markdownSchema(),
    codeInput(),
    muxInput(),
    inlineSvgInput(),
    // youtubeInput({ apiKey: 'AIzaSyD_s3lu76rpoAt_Ym6WC87-KFFBTxPj3hY' }),
    table(),
    assist()
  ],
})

export default config;

export type SanityValues = InferSchemaValues<typeof config>;
