import { fetchSanity } from 'lib'

const BASE_URL = 'https://www.sarahkhosla.com'

const sitemap = async () => {
  const projects = await fetchSanity(
    `*[_type == 'project' && defined(slug.current)]{
      "slug": slug.current,
      _updatedAt
    }`,
    {},
    { revalidate: 3600 },
  )

  const projectEntries = projects.map((project) => ({
    url: `${BASE_URL}/${project.slug}`,
    lastModified: new Date(project._updatedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...projectEntries,
  ]
}

export default sitemap
