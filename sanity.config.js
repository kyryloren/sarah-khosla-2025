'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.jsx` route
 */

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { media } from 'sanity-plugin-media'
import { muxInput } from 'sanity-plugin-mux-input'

import { dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes'
import { structure } from './sanity/structure'

import { muxTokenId, muxTokenSecret } from './sanity/env'

export default defineConfig({
  name: 'default',
  title: 'Sarah Khosla',
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    media(),
    muxInput({
      // Mux credentials can be provided here or entered in Studio UI
      // If not provided, users will be prompted to enter them in Studio
      ...(muxTokenId && muxTokenSecret
        ? {
            tokenId: muxTokenId,
            tokenSecret: muxTokenSecret,
          }
        : {}),
    }),
    presentationTool({
      previewUrl: {
        initial: process.env.SANITY_STUDIO_PREVIEW_ORIGIN,
        preview: '/',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
  ],
  schema: {
    types: schema,
    templates: (prev) =>
      prev.filter(
        ({ schemaType }) =>
          !['home', 'about', 'globalSettings'].includes(schemaType),
      ),
  },
})
