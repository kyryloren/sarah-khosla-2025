'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { useLenis } from 'lenis/react'
import { Container, Grid } from 'styles'
import Masonary from 'components/masonary'

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
      <div className="col-span-4 row-start-1 md:col-span-1">
        <p className="text-sm leading-4">{title}</p>
      </div>
      <div className="col-span-5 mt-6 md:col-span-3 md:row-start-1 md:mt-0">
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
        <div className="col-span-1 row-start-1 flex items-start justify-end">
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

export default function About({ data, socials, projects }) {
  const searchParams = useSearchParams()
  const isVisible = searchParams.get('about') === 'true'
  const [isAnimated, setIsAnimated] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [isOpening, setIsOpening] = useState(false)
  const [isHidden, setIsHidden] = useState(true)
  const lenis = useLenis()
  const sectionRef = useRef(null)

  useEffect(() => {
    if (isVisible) {
      setIsHidden(false)
      setIsClosing(false)
      setIsAnimated(false)
      setIsOpening(true)

      // Stop Lenis to prevent background from scrolling when modal is open
      lenis?.stop?.()

      // Ensure modal scroll starts at top on open
      if (sectionRef.current) {
        sectionRef.current.scrollTop = 0
      }

      const openingTimer = setTimeout(() => {
        setIsOpening(false)
      }, 50)

      const rowTimer = setTimeout(() => {
        setIsAnimated(true)
      }, 100)

      return () => {
        clearTimeout(openingTimer)
        clearTimeout(rowTimer)
      }
    } else {
      if (!isHidden) {
        setIsClosing(true)
        setIsAnimated(false)
        const timer = setTimeout(() => {
          setIsClosing(false)
          setIsHidden(true)
          // Re-enable Lenis after modal fully closes
          lenis?.start?.()
          // Reset scroll so it does not persist into next open
          if (sectionRef.current) {
            sectionRef.current.scrollTop = 0
          }
        }, 300)
        return () => clearTimeout(timer)
      }
    }
  }, [isVisible, isHidden, lenis])

  return (
    <section
      ref={sectionRef}
      data-lenis-prevent
      id="about"
      className={`fixed left-0 top-0 z-40 h-screen w-full overflow-y-auto overscroll-contain bg-neutral-50 pt-40 text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50 ${
        isVisible ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      style={{
        display: isHidden ? 'none' : 'block',
        clipPath: isOpening
          ? 'polygon(0 0, 100% 0, 100% 0, 0 0)'
          : isClosing
            ? 'polygon(0 0, 100% 0, 100% 0, 0 0)'
            : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        transition:
          isOpening || isClosing ? 'clip-path 300ms ease-in-out' : 'none',
      }}
    >
      <Container>
        <Row title="About" isAnimated={isAnimated} delay={0}>
          <p className="whitespace-pre-line text-2xl leading-7 md:text-3xl md:leading-9">
            {data?.description}
          </p>
        </Row>
        <Row
          title="Clients"
          accordion={true}
          isAnimated={isAnimated}
          delay={200}
        >
          <div className="flex flex-col">
            {data?.clients?.map((client, index) => (
              <p key={index} className="text-sm leading-4">
                {client?.text}
              </p>
            ))}
          </div>
        </Row>
        <Row title={'Contact'} isAnimated={isAnimated} delay={400}>
          <div className="flex flex-col">
            {socials?.email && (
              <a
                href={`mailto:${socials?.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-sm leading-4 hover:opacity-60"
              >
                E {socials?.email}
              </a>
            )}
            {socials?.linkedin && (
              <a
                href={socials?.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-sm leading-4 hover:opacity-60"
              >
                L LinkedIn
              </a>
            )}
            {socials?.instagram && (
              <a
                href={socials?.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-sm leading-4 hover:opacity-60"
              >
                I Instagram
              </a>
            )}
          </div>
        </Row>

        <div
          className={`mt-7 transition-all duration-700 ease-out ${
            isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: isAnimated ? '600ms' : '0ms' }}
        >
          <Masonary data={projects} />
        </div>
      </Container>
    </section>
  )
}
