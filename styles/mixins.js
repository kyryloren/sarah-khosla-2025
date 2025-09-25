import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import { VideoPlayer } from 'components'

export default function RenderMedia({
  fill = false,
  priority = false,
  sizes,
  data,
  className,
  ...props
}) {
  if (data?.mime?.startsWith('image/')) {
    return (
      <div
        className={twMerge('relative h-full w-full overflow-hidden', className)}
        {...props}
      >
        <Image
          src={data?.url + '?format=webp'}
          alt={data?.alternativeText || 'Sarah Khosla Case Study Image'}
          priority={priority}
          fill={fill ? true : data?.width || data?.height ? false : true}
          sizes={sizes}
          className={'h-full w-full object-cover'}
          placeholder={data?.placeholder ? 'blur' : 'empty'}
          blurDataURL={data?.placeholder && data?.placeholder}
          {...(!fill && { width: data?.width, height: data?.height })}
        />
      </div>
    )
  } else if (data?.mime?.startsWith('video/')) {
    const videoUrl = data?.url

    return (
      <VideoPlayer
        src={videoUrl}
        poster={data?.placeholder || data?.preview}
        alt={data?.alternativeText || 'Sarah Khosla Case Study Video'}
        className={className}
        autoPlay={true}
        muted={true}
        loop={true}
        playsInline={true}
        controls={false}
        {...props}
      />
    )
  }

  return null
}
