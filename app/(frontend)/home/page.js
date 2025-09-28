import { Masonary } from 'components'
import { fetchSanity, queries } from 'lib'
import { Container } from 'styles'
import { draftMode } from 'next/headers'

export default async function Home() {
  const { isEnabled } = await draftMode()

  const homeDoc = await fetchSanity(
    queries.home,
    {},
    isEnabled
      ? {
          perspective: 'drafts',
          useCdn: false,
          stega: true,
        }
      : undefined,
  )

  return (
    <>
      <div className="mt-50 relative">
        <Container>
          <Masonary data={homeDoc?.featuredProjects} />
        </Container>
      </div>
    </>
  )
}
