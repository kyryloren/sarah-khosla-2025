import { twMerge } from 'tailwind-merge'
import Image from 'next/image'
import { getImageDimensions } from '@sanity/asset-utils'
import { VideoPlayer } from 'components'
import { urlFor, fileUrlFromRef } from 'lib'

export function RenderImage({
  fill = false,
  priority = false,
  sizes,
  data,
  className,
  quality = 90,
  ...props
}) {
  if (!data?.asset) return null

  const alt = data?.alt || 'Studio Case Study Image'

  // Check if this is a file asset (like a GIF) or an image asset
  const isFileAsset = data.asset._ref?.startsWith('file-')

  // Check if it's a GIF file (which should be rendered as an image, not video)
  const isGifFile =
    isFileAsset &&
    (data.asset._ref?.endsWith('gif') ||
      data.asset?.extension === 'gif' ||
      data.asset?.metadata?.format === 'gif')

  let imageUrl, dimensions, blurDataURL

  if (isFileAsset && isGifFile) {
    // For GIF file assets, use fileUrlFromRef
    imageUrl = fileUrlFromRef(data)
    if (!imageUrl) return null

    // For file assets, we can't easily get dimensions or generate blur placeholder
    // We'll use the asset's metadata if available

    dimensions = {
      width: data.asset?.metadata?.dimensions?.width || 800,
      height: data.asset?.metadata?.dimensions?.height || 600,
    }
    blurDataURL = undefined // No blur placeholder for file assets
  } else if (!isFileAsset) {
    // For image assets, use urlFor
    imageUrl = urlFor(data).format('webp').quality(quality).url()

    // Get dimensions using Sanity's utility
    dimensions = getImageDimensions(data)

    // Generate blur placeholder using Sanity's URL builder
    blurDataURL = urlFor(data).width(24).height(24).blur(10).url()
  } else {
    // Non-GIF file assets should not be handled by RenderImage
    return null
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      priority={priority}
      fill={fill ? true : false}
      sizes={sizes}
      className={twMerge('h-full w-full object-cover', className)}
      placeholder={blurDataURL ? 'blur' : 'empty'}
      blurDataURL={blurDataURL}
      {...(!fill && {
        width: dimensions.width,
        height: dimensions.height,
      })}
      {...props}
    />
  )
}

export function RenderVideo({ data, className, ...props }) {
  const videoUrl = fileUrlFromRef(data)

  if (!videoUrl) return null

  return (
    <VideoPlayer
      src={videoUrl}
      poster={data?.asset?.metadata?.lqip || data?.asset?.metadata?.preview}
      alt={data?.alt || 'Studio Case Study Video'}
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

export default function RenderMedia({
  fill = false,
  priority = false,
  sizes,
  data,
  alt,
  className,
  quality = 100,
  ...props
}) {
  if (!data?.asset) return null

  // Merge alt text from prop with data if available
  const mediaData = {
    ...data,
    alt: alt || data.alt,
  }

  // Check if it's an image asset by looking at the asset reference or type
  const isImageAsset =
    data.asset._ref?.startsWith('image-') ||
    data.asset._type === 'sanity.imageAsset' ||
    (data.asset._ref && !data.asset._ref.startsWith('file-'))

  // Check if it's a file asset (could be GIF or video)
  const isFileAsset =
    data.asset._ref?.startsWith('file-') ||
    data.asset._type === 'sanity.fileAsset'

  // Check if it's a video file (not a GIF)
  const isVideoFile =
    isFileAsset &&
    (data.asset._ref?.endsWith('mp4') ||
      data.asset._ref?.endsWith('webm') ||
      data.asset._ref?.endsWith('mov') ||
      data.asset?.extension === 'mp4' ||
      data.asset?.extension === 'webm' ||
      data.asset?.extension === 'mov' ||
      data.asset?.metadata?.format === 'mp4' ||
      data.asset?.metadata?.format === 'webm' ||
      data.asset?.metadata?.format === 'mov')

  return (
    <div
      className={twMerge('relative h-full w-full overflow-hidden', className)}
      {...props}
    >
      {isVideoFile ? (
        <RenderVideo
          data={mediaData}
          className={fill ? 'absolute inset-0 h-full w-full' : ''}
        />
      ) : isImageAsset || isFileAsset ? (
        <RenderImage
          fill={fill}
          priority={priority}
          sizes={sizes}
          data={mediaData}
          quality={quality}
        />
      ) : null}
    </div>
  )
}
