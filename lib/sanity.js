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
      asset->,
      alt
    },
    socials{ email, linkedin, instagram }
  }`,
  home: `*[_type == 'home'][0]{
    heroMedia{
      mediaType,
      image{
        asset->,
        alt
      },
      video{
        asset->,
        alt,
        "keepAudio": ^.keepAudio
      }
    },
    "featuredProjects": featuredProjects[]->{
      title,
      "slug": slug.current,
      thumbnail{
        asset->,
        alt
      },
      animated{
        asset->,
        alt
      }
    }
  }`,
  projectsList: `*[_type == 'project'] | order(_createdAt desc){
    title,
    "slug": slug.current,
    light,
    thumbnail{
      asset->,
      alt
    },
    animated{
      asset->,
      alt
    }
  }`,
  projectBySlug: `*[_type == 'project' && slug.current == $slug][0]{
    title,
    description,
    light,
    animated{
      asset->,
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
            asset->,
            alt
          },
          video{
            asset->,
            alt,
            "keepAudio": ^.keepAudio
          }
        },
        border
      },
      _type == 'articleSplit' => {
        _type,
        left_media{
          mediaType,
          image{
            asset->,
            alt
          },
          video{
            asset->,
            alt,
            "keepAudio": ^.keepAudio
          }
        },
        right_media{
          mediaType,
          image{
            asset->,
            alt
          },
          video{
            asset->,
            alt,
            "keepAudio": ^.keepAudio
          }
        },
        border
      }
    }
  }`,
}
