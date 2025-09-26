import { Masonary } from 'components'
import { fetchSanity, queries } from 'lib'
import { Container } from 'styles'

export default async function Home() {
  const projectsDoc = await fetchSanity(queries.projectsList)

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
