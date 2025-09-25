import { Masonary } from 'components'
import { Container } from 'styles'

export default async function Home({ projects }) {
  return (
    <>
      <div className="mt-50 relative">
        <Container>
          <Masonary data={projects} />
        </Container>
      </div>
    </>
  )
}
