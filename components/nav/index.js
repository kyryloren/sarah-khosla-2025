'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Container, Grid } from 'styles'
import Link from 'next/link'

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

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
      router.push(currentUrl.pathname + currentUrl.search)
    } else {
      // Remove ?about from URL
      const currentUrl = new URL(window.location.href)
      currentUrl.searchParams.delete('about')
      const newUrl = currentUrl.pathname + (currentUrl.search || '')
      router.push(newUrl)
    }
  }

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-neutral-50 py-5 text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50">
      <Container>
        <Grid>
          <div className="col-start-1 col-end-2">
            <p className="text-sm leading-4">
              <Link href={'/'}>
                Sarah Khosla
                <br />
                Design & Art Direction
              </Link>
            </p>
          </div>
          <div className="col-start-2 col-end-4">
            <p className="text-sm leading-4">
              Previously a Sr. Art Director
              <br />
              at Stink Studios, currently freelancing.
            </p>
          </div>
          <div className="col-start-4 col-end-5">
            <p className="text-sm leading-4">
              <a
                href="https://www.linkedin.com/in/sarahkhosla"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-60"
              >
                LinkedIn
              </a>
              <br />
              <a
                href="mailto:hello@sarahkhosla.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60"
              >
                hello@sarahkhosla.com
              </a>
            </p>
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
