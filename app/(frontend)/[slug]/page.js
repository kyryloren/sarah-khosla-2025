import { fetchSanity, queries, sanityClient } from 'lib'
import { Hero, Article } from './components'
import { draftMode } from 'next/headers'

export default async function Project(props) {
  const params = await props.params
  const { slug } = params
  const { isEnabled } = await draftMode()

  const projectsDoc = await fetchSanity(
    queries.projectBySlug,
    { slug },
    isEnabled
      ? {
          perspective: 'drafts',
          useCdn: false,
          stega: true,
        }
      : undefined,
  )

  return (
    <div>
      <Hero data={projectsDoc} />
      <Article data={projectsDoc?.article} />
    </div>
  )
}
