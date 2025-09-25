import { fetchAPI } from 'lib'
import { Hero, Article } from './components'

export default async function Project(props) {
  const params = await props.params
  const { slug } = params

  const projectsData = await fetchAPI('/projects', {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      fields: ['title', 'description', 'light'],
      // thumbnail: { populate: '*' },
      quick_info: { populate: '*' },
      project_info: { populate: '*' },
      // // Adjusted population for the dynamic zone: case_study
      article: {
        populate: '*',
      },
    },
  })

  const projectsDoc = projectsData?.data[0]

  return (
    <>
      <Hero data={projectsDoc} />
      <Article data={projectsDoc?.article} />
    </>
  )
}
