import React, { Suspense } from 'react'
import { Lenis, Nav, ScrollBar, About, Footer } from 'components'
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
      <Suspense
        fallback={
          <div className="fixed left-0 top-0 z-50 w-full bg-neutral-50 py-4 text-neutral-950 sm:py-5 md:py-7 dark:bg-neutral-950 dark:text-neutral-50" />
        }
      >
        <Nav socials={globalDoc?.socials} />
      </Suspense>

      <main id="main" className="relative mt-40">
        <Suspense fallback={<div />}>
          <About
            data={aboutDoc}
            socials={globalDoc?.socials}
            projects={homeDoc?.featuredProjects}
          />
        </Suspense>
        {children}
      </main>
      <Footer socials={globalDoc?.socials} homeDoc={homeDoc} />
      <ScrollBar />
      <Lenis root />
    </>
  )
}
