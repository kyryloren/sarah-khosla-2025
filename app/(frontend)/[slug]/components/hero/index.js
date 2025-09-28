'use client'

import Icon from 'components/icon'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { Container, Grid } from 'styles'

const Hero = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [contentHeight, setContentHeight] = useState(0)
  const contentRef = useRef(null)

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight)
    }
  }, [data])

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <section className="relative">
      <Container>
        <Grid>
          <div className="col-start-1 col-end-2 hidden md:block">
            <Link
              className="flex w-fit cursor-pointer items-center gap-2 hover:opacity-60"
              href="/"
            >
              <Icon name="back" className="h-auto w-full" />
              <p className="text-sm leading-4">Back</p>
            </Link>
          </div>

          <div className="col-start-1 col-end-4 md:col-start-2">
            <p className="text-sm leading-4">{data?.title}</p>
          </div>

          <div className="col-start-4 -col-end-1 justify-items-end md:justify-items-start">
            <button
              onClick={handleToggle}
              className="flex cursor-pointer items-center gap-2 transition-all duration-200 hover:opacity-60"
              aria-label={
                isExpanded ? 'Collapse project info' : 'Expand project info'
              }
            >
              <div className="relative w-2.5 flex-shrink-0">
                <span className="h-0.25 absolute left-1/2 top-1/2 w-2.5 -translate-x-1/2 -translate-y-1/2 bg-black transition-all duration-200" />
                <span
                  className={`w-0.25 absolute left-1/2 top-1/2 h-2.5 -translate-x-1/2 -translate-y-1/2 bg-black transition-all duration-200 ${
                    isExpanded ? 'opacity-0' : 'opacity-100'
                  }`}
                />
              </div>
              <p className="text-sm font-bold leading-4">Project Info</p>
            </button>
          </div>
        </Grid>

        {/* expanded info */}
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxHeight: isExpanded ? `${contentHeight}px` : '0px',
          }}
        >
          <div ref={contentRef}>
            <Grid className="mt-8">
              <ul className="col-start-1 col-end-5 row-start-2 mt-4 flex flex-col md:col-start-2 md:col-end-4 md:row-start-1 md:mt-0">
                {data?.project_metadata?.agency && (
                  <li className="flex gap-4">
                    <p className="flex-1 text-sm leading-4">Agency</p>
                    <p
                      data-sanity-edit-target
                      className="flex-[4.5] text-sm leading-4"
                    >
                      {data.project_metadata.agency}
                    </p>
                  </li>
                )}
                {data?.project_metadata?.client && (
                  <li className="flex gap-4">
                    <p className="flex-1 text-sm leading-4">Client</p>
                    <p
                      data-sanity-edit-target
                      className="flex-[4.5] text-sm leading-4"
                    >
                      {data.project_metadata.client}
                    </p>
                  </li>
                )}
                {data?.project_metadata?.role && (
                  <li className="flex gap-4">
                    <p className="flex-1 text-sm leading-4">Role</p>
                    <p
                      data-sanity-edit-target
                      className="flex-[4.5] text-sm leading-4"
                    >
                      {data.project_metadata.role}
                    </p>
                  </li>
                )}
                {data?.project_metadata?.year && (
                  <li className="flex gap-4">
                    <p className="flex-1 text-sm leading-4">Year</p>
                    <p
                      data-sanity-edit-target="project_metadata.year"
                      className="flex-[4.5] text-sm leading-4"
                    >
                      {data.project_metadata.year}
                    </p>
                  </li>
                )}
              </ul>

              <div className="col-start-1 -col-end-1 row-start-1 md:col-start-4">
                <p className="mb-8 whitespace-pre-line text-2xl leading-7">
                  {data?.description}
                </p>

                {data?.project_info?.map((info, index) => (
                  <p
                    key={index}
                    className="mt-4 whitespace-pre-line text-sm leading-4"
                  >
                    <strong>{info?.title}</strong>
                    <br />
                    {info?.text}
                  </p>
                ))}
              </div>
            </Grid>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Hero
