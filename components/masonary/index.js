'use client'

import Link from 'next/link'
import MasonryComponent from 'react-masonry-css'
import { RenderImage } from 'styles'

export default function Masonary({ data }) {
  return (
    <>
      <p className="md:mt-30 mb-8 mt-20 text-sm leading-4 sm:mb-10 xl:mt-40">
        Selected Works
      </p>
      <MasonryComponent
        className="flex w-full gap-6"
        breakpointCols={{ 440: 1, 768: 2, default: 3 }}
      >
        {data?.map((project, idx) => (
          <div
            key={project?.slug || idx}
            className="mb-5 flex flex-col gap-2 sm:mb-8"
          >
            <Link
              href={`/${project?.slug}`}
              className="group relative flex cursor-pointer flex-col no-underline"
            >
              <div className="relative">
                <RenderImage
                  data={project?.thumbnail}
                  fill={false}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  className={
                    'z-4 visible h-auto opacity-100 group-hover:invisible group-hover:opacity-0'
                  }
                />
                <RenderImage
                  data={project?.animated}
                  fill={false}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  className={
                    'z-3 visible absolute left-0 top-0 h-auto opacity-0 group-hover:opacity-100'
                  }
                />
              </div>
              <p className="text-sm leading-4 mt-2">{project?.title}</p>
            </Link>
          </div>
        ))}
      </MasonryComponent>
    </>
  )
}
