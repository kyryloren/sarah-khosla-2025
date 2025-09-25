import React from 'react'
import { Lenis, Nav, ScrollBar, About } from 'components'
import { fetchAPI } from 'lib'

export default async function Template({ children }) {
  const aboutData = await fetchAPI('/about', {
    populate: '*',
  })
  const globalData = await fetchAPI('/global', {
    populate: '*',
  })
  const projectsData = await fetchAPI('/projects', {
    populate: {
      fields: ['title', 'slug'],
    },
  })

  const aboutDoc = aboutData?.data
  const globalDoc = globalData?.data
  const projectsDoc = projectsData?.data

  return (
    <>
      <Nav socials={globalDoc?.Socials} />
      <About
        data={aboutDoc}
        socials={globalDoc?.Socials}
        projects={projectsDoc}
      />
      <main id="main">
        {React.cloneElement(children, { projects: projectsDoc })}
      </main>
      {/* <Footer /> */}
      <ScrollBar />
      <Lenis root />
    </>
  )
}
