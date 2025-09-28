import React from 'react'
import { Lenis, Nav, ScrollBar, About } from 'components'
import { fetchSanity, queries } from 'lib'
import { draftMode } from 'next/headers'

export default async function Template({ children }) {
  const { isEnabled } = await draftMode()

  const aboutDoc = await fetchSanity(
    queries.about,
    {},
    isEnabled
      ? {
          perspective: 'drafts',
          useCdn: false,
          stega: true,
        }
      : undefined,
  )

  const globalDoc = await fetchSanity(
    queries.global,
    {},
    isEnabled
      ? {
          perspective: 'drafts',
          useCdn: false,
          stega: true,
        }
      : undefined,
  )

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
      <Nav socials={globalDoc?.socials} />

      <main id="main" className="relative mt-40">
        <About
          data={aboutDoc}
          socials={globalDoc?.socials}
          projects={homeDoc?.featuredProjects}
        />
        {children}
      </main>
      {/* <Footer /> */}
      <ScrollBar />
      <Lenis root />
    </>
  )
}
