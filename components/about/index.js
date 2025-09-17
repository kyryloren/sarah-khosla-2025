'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Container, Grid } from 'styles'

function Row({
  title,
  children,
  accordion = false,
  isAnimated = false,
  delay = 0,
}) {
  const [isExpanded, setIsExpanded] = useState(true)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <Grid
      className={`relative py-7 transition-all duration-700 ease-out before:absolute before:left-0 before:top-0 before:block before:h-[1px] before:w-full before:bg-neutral-600 before:content-[""] ${
        accordion ? 'cursor-pointer' : ''
      } ${
        isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{
        transitionDelay: isAnimated ? `${delay}ms` : '0ms',
      }}
      onClick={accordion ? toggleExpanded : undefined}
    >
      <div className="col-span-1">
        <p className="text-sm leading-4">{title}</p>
      </div>
      <div className="col-span-3">
        <div
          className={`${
            accordion
              ? `overflow-hidden transition-all duration-300 ease-in-out ${
                  isExpanded ? 'max-h-96' : 'max-h-0'
                }`
              : ''
          }`}
        >
          {children}
        </div>
      </div>
      {accordion && (
        <div className="col-span-1 flex items-start justify-end">
          <div
            className="pointer-events-none"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            <div className="relative flex h-4 w-4 items-center justify-center">
              {/* Horizontal line (always visible) */}
              <span className="absolute h-0.5 w-4 bg-current"></span>
              {/* Vertical line (hidden when expanded) */}
              <span
                className={`absolute h-4 w-0.5 bg-current ${
                  isExpanded ? 'opacity-0' : 'opacity-100'
                }`}
              ></span>
            </div>
          </div>
        </div>
      )}
    </Grid>
  )
}

export default function About() {
  const searchParams = useSearchParams()
  const isVisible = searchParams.get('about') === 'true'
  const [isAnimated, setIsAnimated] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true)
      setIsClosing(false)
      setIsAnimated(false) // Reset animation state
      // Trigger animations after a short delay to ensure the component is mounted
      const timer = setTimeout(() => {
        setIsAnimated(true)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      if (shouldRender) {
        setIsClosing(true)
        setIsAnimated(false) // Stop row animations immediately
        // Delay hiding the component until clip-path animation completes
        const timer = setTimeout(() => {
          setIsClosing(false)
          setShouldRender(false)
        }, 300) // Match the clip-path transition duration
        return () => clearTimeout(timer)
      }
    }
  }, [isVisible, shouldRender])

  if (!shouldRender) {
    return null
  }

  return (
    <section
      className={`mt-30 fixed left-0 top-0 w-full bg-neutral-50 text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50 ${
        isVisible ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      style={{
        clipPath: isClosing
          ? 'polygon(0 0, 100% 0, 100% 0, 0 0)'
          : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        transition: isClosing ? 'clip-path 300ms ease-in-out' : 'none',
      }}
    >
      <Container>
        <Row title="About" isAnimated={isAnimated} delay={0}>
          <p className="text-2xl leading-7">
            Sarah Khosla is a independent designer & art director based in
            California.
            <br />
            <br />
            With a decade of experience in the field of brand and visual design,
            she has collaborated with a diverse range of clients, studios, and
            agencies, including Google, Manual, Stance, Dre & Snoop, HBOMax,
            Maude Apatow, among others. She's passionate about building brands
            that are as conceptually strong as they are beautiful.
          </p>
        </Row>
        <Row
          title="Client"
          accordion={true}
          isAnimated={isAnimated}
          delay={200}
        >
          <div className="flex flex-col">
            <p className="text-sm leading-4">Emmy's Cookies</p>
            <p className="text-sm leading-4">Google</p>
            <p className="text-sm leading-4">Dre & Snoop</p>
            <p className="text-sm leading-4">Scarrs Pizza</p>
            <p className="text-sm leading-4">Harley Davidson</p>
            <p className="text-sm leading-4">HBO Max</p>
            <p className="text-sm leading-4">Iggy Rosales</p>
            <p className="text-sm leading-4">OnePay</p>
            <p className="text-sm leading-4">KitKat</p>
            <p className="text-sm leading-4">Keap</p>
          </div>
        </Row>
        <Row title={'Contact'} isAnimated={isAnimated} delay={400}>
          <div className="flex flex-col">
            <a
              href="mailto:hello@sarahkhosla.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-sm leading-4 hover:opacity-60"
            >
              E hello@sarahkhosla.com
            </a>
            <a
              href="https://www.linkedin.com/in/sarahkhosla"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-sm leading-4 hover:opacity-60"
            >
              L LinkedIn
            </a>
            <a
              href="https://www.instagram.com/sarahkhosla"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-sm leading-4 hover:opacity-60"
            >
              I Instagram
            </a>
          </div>
        </Row>
      </Container>
    </section>
  )
}
