import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01',
  useCdn: true,
  perspective: 'published',
  token: process.env.SANITY_VIEWER_TOKEN,
  stega: {
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
  },
  // Enable revalidation every 60 seconds (1 minute)
  revalidate: 60,
})

const builder = imageUrlBuilder(sanityClient)
export function urlFor(source) {
  return builder.image(source)
}

// Resolve a public URL for Sanity file assets (e.g., mp4, webm, gif)
export function fileUrlFromRef(fileLike) {
  try {
    if (!fileLike) return undefined
    // Support both asset objects and direct refs
    const ref = fileLike?.asset?._ref || fileLike?._ref || fileLike?.asset?.ref
    if (!ref || typeof ref !== 'string') return undefined

    // Expected formats:
    //  - file-<assetId>-<extension>
    //  - file-<assetId>-<dimensions>-<extension> (rare for files)
    if (!ref.startsWith('file-')) return undefined
    const parts = ref.split('-')
    // parts: ['file', '<assetId>', possibly more..., '<extension>']
    if (parts.length < 3) return undefined

    const extension = parts[parts.length - 1]
    const assetId = parts.slice(1, parts.length - 1).join('-')

    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
    if (!projectId || !dataset) return undefined

    return `https://cdn.sanity.io/files/${projectId}/${dataset}/${assetId}.${extension}`
  } catch (_) {
    return undefined
  }
}

export async function fetchSanity(query, params = {}, options = {}) {
  // Set default revalidation to 60 seconds (1 minute) if not specified
  const fetchOptions = {
    revalidate: 60,
    ...options,
  }

  const data = await sanityClient.fetch(query, params, fetchOptions)
  return data
}

export const getNextProject = (currentSlug, featuredProjects) => {
  if (!featuredProjects || !Array.isArray(featuredProjects)) return null

  const currentIndex = featuredProjects.findIndex(
    (project) => project.slug === currentSlug,
  )
  if (currentIndex === -1) return null

  return featuredProjects[(currentIndex + 1) % featuredProjects.length]
}

export const queries = {
  about: `*[_type == 'about'][0]{
    description,
    "clients": clients[]{ text }
  }`,
  global: `*[_type == 'globalSettings'][0]{
    siteName,
    siteDescription,
    keywords,
    shareImage{
      asset,
      alt
    },
    socials{ email, linkedin, instagram }
  }`,
  home: `*[_type == 'home'][0]{
    heroMedia{
      mediaType,
      image{
        asset,
        alt
      },
      video{
        asset,
        alt
      }
    },
    "featuredProjects": featuredProjects[]->{
      title,
      "slug": slug.current,
      thumbnail{
        asset,
        alt
      },
      animated{
        asset,
        alt
      }
    }
  }`,
  projectsList: `*[_type == 'project'] | order(_createdAt desc){
    title,
    "slug": slug.current,
    light,
    thumbnail{
      asset,
      alt
    },
    animated{
      asset,
      alt
    }
  }`,
  projectBySlug: `*[_type == 'project' && slug.current == $slug][0]{
    title,
    description,
    light,
    animated{
      asset,
      alt
    },
    project_metadata{
      agency,
      client,
      role,
      year
    },
    project_info[]{ title, text },
    article[]{
      _type == 'articleCover' => {
        _type,
        media{
          mediaType,
          image{
            asset,
            alt
          },
          video{
            asset,
            alt
          }
        },
        border
      },
      _type == 'articleSplit' => {
        _type,
        left_media{
          mediaType,
          image{
            asset,
            alt
          },
          video{
            asset,
            alt
          }
        },
        right_media{
          mediaType,
          image{
            asset,
            alt
          },
          video{
            asset,
            alt
          }
        },
        border
      }
    }
  }`,
}
