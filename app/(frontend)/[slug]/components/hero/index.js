'use client'

import Icon from 'components/icon'
import Link from 'next/link'
import { useState } from 'react'
import { Container, Grid } from 'styles'

const Hero = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section className="relative pt-52">
      <Container>
        <Grid>
          <div className="col-start-1 col-end-2">
            <Link
              className="flex w-fit cursor-pointer items-center gap-2 hover:opacity-60"
              href="/"
            >
              <Icon name="back" className="h-auto w-full" />
              <p className="text-sm leading-4">Back</p>
            </Link>
          </div>

          <div className="col-start-2 col-end-4">
            <p className="text-sm leading-4">{data?.title}</p>
          </div>

          <div className="col-start-4 -col-end-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex cursor-pointer items-center gap-2 transition-all duration-200 hover:opacity-60"
              aria-label={
                isExpanded ? 'Collapse project info' : 'Expand project info'
              }
            >
              <div className="relative w-2.5 flex-shrink-0">
                <span className="h-0.25 absolute left-1/2 top-1/2 w-2.5 -translate-x-1/2 -translate-y-1/2 bg-black transition-all duration-200"></span>
                <span
                  className={`w-0.25 absolute left-1/2 top-1/2 h-2.5 -translate-x-1/2 -translate-y-1/2 bg-black transition-all duration-200 ${
                    isExpanded ? 'opacity-0' : 'opacity-100'
                  }`}
                ></span>
              </div>
              <p className="text-sm font-bold leading-4">Project Info</p>
            </button>
          </div>
        </Grid>

        {/* expanded info */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? 'max-h-[1000px]' : 'max-h-0'
          }`}
        >
          <Grid className="mt-8">
            <ul className="col-start-2 col-end-4 flex flex-col">
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

            <div className="col-start-4 -col-end-1">
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
      </Container>
    </section>
  )
}

export default Hero
