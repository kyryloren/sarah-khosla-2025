import { fetchSanity, queries } from 'lib'
import { Hero, Article } from './components'
import { draftMode } from 'next/headers'

export default async function Project(props) {
  const params = await props.params
  const { slug } = params

  const projectsDoc = await fetchSanity(
    queries.projectBySlug,
    { slug },
    {
      perspective: (await draftMode()).isEnabled
        ? 'previewDrafts'
        : 'published',
    },
  )

  return (
    <div>
      <Hero data={projectsDoc} />
      <Article data={projectsDoc?.article} />
    </div>
  )
}
