'use client'

import { Container, Grid } from 'styles'
import { useLenis } from 'lenis/react'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { getNextProject } from 'lib'

export default function Footer({ socials, homeDoc }) {
  const lenis = useLenis()
  const pathname = usePathname()

  return (
    <footer className="relative pb-4 pt-20">
      <Container>
        <Grid className="items-end">
          <p className="col-span-2 col-start-1 row-start-1 text-sm leading-4 md:col-span-1">
            Sarah Khosla
          </p>

          <p
            className={twMerge(
              'col-span-5 col-start-1 row-start-2 text-sm leading-4 sm:col-span-2 md:col-start-2 md:row-start-1',
              pathname !== '/' && 'hidden',
            )}
          >
            Los Angeles, California
            <br />
            {socials?.email && (
              <a
                href={`mailto:${socials?.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-fit hover:opacity-60"
              >
                {socials?.email}
              </a>
            )}
          </p>

          <p className="col-span-2 col-start-1 row-start-3 justify-self-start text-sm leading-4 sm:col-start-4 sm:justify-self-end md:col-span-1 md:col-start-4 md:row-start-1 md:justify-self-start">
            {socials?.linkedin && (
              <a
                href={socials?.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-fit hover:opacity-60"
              >
                LinkedIn
              </a>
            )}
            {', '}
            {socials?.instagram && (
              <a
                href={socials?.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-fit hover:opacity-60"
              >
                Instagram
              </a>
            )}
          </p>
          <a
            href={
              pathname === '/'
                ? '#'
                : `/${getNextProject(pathname.slice(1), homeDoc?.featuredProjects)?.slug}`
            }
            onClick={() => pathname === '/' && lenis.scrollTo(0)}
            className='col-span-2 col-start-4 row-start-3 flex cursor-pointer items-center gap-2 justify-self-end text-sm leading-4 before:inline-block before:h-2 before:w-2 before:rounded-full before:bg-neutral-950 before:content-[""] sm:row-start-2 md:col-span-1 md:col-start-5 md:row-start-1 dark:before:bg-neutral-50'
          >
            {pathname === '/' ? 'Back to top' : 'Next Project'}
          </a>
        </Grid>
      </Container>
    </footer>
  )
}
