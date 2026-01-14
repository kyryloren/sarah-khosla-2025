import { Masonary, Media } from 'components'
import { fetchSanity, queries } from 'lib'
import { Container } from 'styles'
import { draftMode } from 'next/headers'

const HERO_VIDEO_THUMBNAIL =
  'https://image.mux.com/1bslTKXRopnz01UbK00gDmAIcTYLwoPesRE01osXfpToT8/thumbnail.png?time=1'

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
      <Media media={homeDoc?.heroMedia} poster={HERO_VIDEO_THUMBNAIL} />
      <Masonary data={homeDoc?.featuredProjects} />
    </Container>
  )
}
