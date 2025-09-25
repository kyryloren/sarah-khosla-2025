import Link from 'next/link'

export default function Masonary() {
  // Sample data for the masonry grid
  const images = [
    {
      id: 1,
      height: 'h-64',
      title: 'Creative Project',
    },
    {
      id: 2,
      height: 'h-48',
      title: 'Brand Identity',
    },
    {
      id: 3,
      height: 'h-72',
      title: 'Web Design',
    },
    {
      id: 4,
      height: 'h-56',
      title: 'Mobile App',
    },
    {
      id: 5,
      height: 'h-40',
      title: 'Logo Design',
    },
    {
      id: 6,
      height: 'h-60',
      title: 'UI/UX Design',
    },
    {
      id: 7,
      height: 'h-52',
      title: 'Print Design',
    },
    {
      id: 8,
      height: 'h-44',
      title: 'Illustration',
    },
    {
      id: 9,
      height: 'h-68',
      title: 'Photography',
    },
    {
      id: 10,
      height: 'h-36',
      title: 'Icon Design',
    },
    {
      id: 11,
      height: 'h-58',
      title: 'Packaging',
    },
    {
      id: 12,
      height: 'h-50',
      title: 'Motion Graphics',
    },
  ]

  return (
    <div className="columns-3 gap-6" style={{ columnFill: 'balance' }}>
      {images.map((image) => (
        <Link
          key={image.id}
          href={`/${image.id}`}
          className="mb-8 block break-inside-avoid"
        >
          <div
            className={`${image.height} flex items-center justify-center bg-neutral-800`}
          />
          <div className="mt-2">
            <p className="text-sm leading-4">{image.title}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
