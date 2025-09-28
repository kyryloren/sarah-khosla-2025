import Link from 'next/link'
import { RenderImage } from 'styles'

export default function Masonary({ data }) {
  return (
    <div className="columns-3 gap-6" style={{ columnFill: 'balance' }}>
      {data?.map((project, idx) => (
        <div key={project?.slug || idx} className="mb-8 break-inside-avoid">
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
  )
}
