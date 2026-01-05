export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-09-28'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

// Mux credentials
export const muxTokenId = process.env.MUX_TOKEN_ID || process.env.NEXT_PUBLIC_MUX_TOKEN_ID
export const muxTokenSecret =
  process.env.MUX_TOKEN_SECRET || process.env.NEXT_PUBLIC_MUX_TOKEN_SECRET
