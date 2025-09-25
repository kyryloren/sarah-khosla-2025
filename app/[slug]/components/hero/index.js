'use client'

import Icon from 'components/icon'
import Link from 'next/link'
import { useState } from 'react'
import { Container, Grid } from 'styles'

export default function Hero({ data }) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <section className="relative pt-48">
      <Container>
        <Grid>
          <div className="col-start-1 col-end-2">
            <Link className="flex cursor-pointer items-center gap-2 w-fit" href="/">
              <Icon name="back" />
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
              <div className="relative w-3 flex-shrink-0">
                <span className="absolute left-1/2 top-1/2 h-0.5 w-3 -translate-x-1/2 -translate-y-1/2 bg-black transition-all duration-200"></span>
                <span
                  className={`absolute left-1/2 top-1/2 h-3 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-black transition-all duration-200 ${
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
              {data?.quick_info?.map((info, index) => (
                <li className="flex gap-4" key={index}>
                  <p className="flex-1 text-sm leading-4">{info?.title}</p>
                  <p className="flex-[4.5] text-sm leading-4">{info?.text}</p>
                </li>
              ))}
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
