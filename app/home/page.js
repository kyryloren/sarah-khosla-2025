import { Masonary } from 'components'
import { fetchSanity, queries } from 'lib'
import { Container } from 'styles'
import { draftMode } from 'next/headers'

export default async function Home() {
  const projectsDoc = await fetchSanity(
    queries.projectsList,
    {},
    {
      perspective: (await draftMode()).isEnabled
        ? 'previewDrafts'
        : 'published',
    },
  )

  return (
    <>
      <div className="mt-50 relative">
        <Container>
          <Masonary data={projectsDoc} />
        </Container>
      </div>
    </>
  )
}
