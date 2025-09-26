import React from 'react'
import { Lenis, Nav, ScrollBar, About } from 'components'
import { fetchSanity, queries } from 'lib'

export default async function Template({ children }) {
  const [aboutDoc, globalDoc, projectsDoc] = await Promise.all([
    fetchSanity(queries.about),
    fetchSanity(queries.global),
    fetchSanity(queries.projectsList),
  ])

  return (
    <>
      <Nav socials={globalDoc?.socials} />
      <About
        data={aboutDoc}
        socials={globalDoc?.socials}
        projects={projectsDoc}
      />
      <main id="main">{children}</main>
      {/* <Footer /> */}
      <ScrollBar />
      <Lenis root />
    </>
  )
}
