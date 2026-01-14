'use client'

import Media, { MediaImage } from 'components/media'
import Link from 'next/link'
import MasonryComponent from 'react-masonry-css'

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
              aria-label={`View project: ${project?.title}`}
            >
              <div className="relative">
                <MediaImage
                  data={project?.thumbnail}
                  fill={false}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  className="z-[2] h-auto opacity-100 transition-opacity duration-300 group-hover:opacity-0"
                />
                {project?.animated && (
                  <div className="absolute inset-0 z-[1] opacity-0 transition-opacity duration-0 group-hover:opacity-100">
                    <Media
                      media={project?.animated}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls={false}
                      alt={project?.title}
                    />
                  </div>
                )}
              </div>
              <p className="mt-2 text-sm leading-4">{project?.title}</p>
            </Link>
          </div>
        ))}
      </MasonryComponent>
    </>
  )
}
