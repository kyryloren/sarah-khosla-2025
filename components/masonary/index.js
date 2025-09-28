import Link from 'next/link'
import { RenderImage } from 'styles'

export default function Masonary({ data }) {
  return (
    <>
      <p className="md:mt-30 mb-8 mt-20 text-sm leading-4 sm:mb-10 xl:mt-40">
        Selected Works
      </p>
      <div
        className="columns-1 gap-6 sm:columns-2 md:columns-3"
        style={{ columnFill: 'balance' }}
      >
        {data?.map((project, idx) => (
          <div
            key={project?.slug || idx}
            className="mb-5 break-inside-avoid sm:mb-8"
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
              <p className="mt-2 text-sm leading-4">{project?.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
