import { fetchSanity, queries } from 'lib'
import { Hero, Article } from './components'

export default async function Project(props) {
  const params = await props.params
  const { slug } = params

  const projectsDoc = await fetchSanity(queries.projectBySlug, { slug })

  return (
    <div>
      <Hero data={projectsDoc} />
      <Article data={projectsDoc?.article} />
    </div>
  )
}
