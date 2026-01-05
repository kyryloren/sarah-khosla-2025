import { Masonary, Media } from 'components'
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
    <Container>
      <Media media={homeDoc?.heroMedia} />
      <Masonary data={homeDoc?.featuredProjects} />
    </Container>
  )
}
