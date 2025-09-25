'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Container, Grid } from 'styles'
import Link from 'next/link'
import { useLenis } from 'lenis/react'

export default function Nav({ socials }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const lenis = useLenis()
  const pathname = usePathname()

  useEffect(() => {
    // Check if 'about' query parameter is set to 'true'
    const hasAboutParam = searchParams.get('about') === 'true'
    setIsMenuOpen(hasAboutParam)
  }, [searchParams])

  const handleMenuToggle = () => {
    const newMenuState = !isMenuOpen
    setIsMenuOpen(newMenuState)

    // Update URL based on menu state
    if (newMenuState) {
      // Add ?about=true to URL
      const currentUrl = new URL(window.location.href)
      currentUrl.searchParams.set('about', 'true')
      router.push(currentUrl.pathname + currentUrl.search, { scroll: false })
    } else {
      // Remove ?about from URL
      const currentUrl = new URL(window.location.href)
      currentUrl.searchParams.delete('about')
      const newUrl = currentUrl.pathname + (currentUrl.search || '')
      router.push(newUrl, { scroll: false })
    }
  }

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-neutral-50 py-7 text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50">
      <Container>
        <Grid>
          <div className="col-start-1 col-end-2">
            <Link
              href={'/'}
              className="hover:opacity-60"
              onClick={(e) => {
                e.preventDefault()
                // Close About tab if open and remove query param
                setIsMenuOpen(false)
                const currentUrl = new URL(window.location.href)
                currentUrl.searchParams.delete('about')

                if (pathname === '/') {
                  router.push(currentUrl.pathname + (currentUrl.search || ''), {
                    scroll: false,
                  })
                  lenis.scrollTo(0)
                } else {
                  router.push('/')
                }
              }}
            >
              <p className="text-sm leading-4">Sarah Khosla</p>
              <p className="text-sm leading-4">Design & Art Direction</p>
            </Link>
          </div>
          <div className="col-start-2 col-end-4">
            <p className="text-sm leading-4">
              Previously a Sr. Art Director
              <br />
              at Stink Studios, currently freelancing.
            </p>
          </div>
          <div className="col-start-4 col-end-5">
            {socials?.linkedin && (
              <a
                href={socials?.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-fit text-sm leading-4 underline hover:opacity-60"
              >
                LinkedIn
              </a>
            )}
            {socials?.email && (
              <a
                href={`mailto:${socials?.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-fit text-sm leading-4 hover:opacity-60"
              >
                {socials?.email}
              </a>
            )}
          </div>
          <div className="col-start-5 flex w-full justify-end">
            <button
              className="h-full w-fit cursor-pointer"
              onClick={handleMenuToggle}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <div
                className={`relative h-6 w-6 transition-transform duration-300 ease-in-out ${
                  isMenuOpen ? 'rotate-45' : 'rotate-0'
                }`}
              >
                <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 transform bg-current"></span>
                <span className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 transform bg-current"></span>
              </div>
            </button>
          </div>
        </Grid>
      </Container>
    </header>
  )
}
