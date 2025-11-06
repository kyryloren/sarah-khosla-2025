import { twMerge } from 'tailwind-merge'
import Image from 'next/image'
import { getImageDimensions } from '@sanity/asset-utils'
import { VideoPlayer } from 'components'
import { urlFor } from 'lib'

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

  // Check if it's a GIF file (which should be rendered as an image, not video)
  const isGifFile =
    data.asset._ref?.endsWith('gif') ||
    data.asset?.extension === 'gif' ||
    data.asset?.metadata?.format === 'gif'

  let imageUrl, dimensions, blurDataURL

  if (isGifFile) {
    imageUrl = data?.asset?.url
    if (!imageUrl) return null

    // For file assets, we can't easily get dimensions or generate blur placeholder
    // We'll use the asset's metadata if available

    dimensions = {
      width: data.asset?.metadata?.dimensions?.width || 800,
      height: data.asset?.metadata?.dimensions?.height || 600,
    }
    // Use lqip from metadata if available
    blurDataURL = data.asset?.metadata?.lqip || undefined
  } else {
    // For image assets, use urlFor
    imageUrl = urlFor(data).format('webp').quality(quality).url()

    // Get dimensions using Sanity's utility
    dimensions = getImageDimensions(data)

    // Use lqip (Low Quality Image Placeholder) from Sanity metadata
    // This is a base64-encoded blur placeholder that Sanity generates automatically
    blurDataURL = data.asset?.metadata?.lqip || undefined
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

export function RenderVideo({ data, fill = false, className, ...props }) {
  const videoUrl = data?.asset?.url
  if (!videoUrl) return null

  // Always start muted for autoplay to work (browsers require this)
  // If keepAudio is true, show button to allow unmuting
  const keepAudio = data?.keepAudio === true

  // Get dimensions from video asset metadata to prevent CLS
  const dimensions = data?.asset?.metadata?.dimensions
  const aspectRatio =
    !fill && dimensions?.width && dimensions?.height
      ? (dimensions.height / dimensions.width) * 100
      : null

  // Use aspect ratio padding trick to reserve space and prevent CLS when not using fill
  const containerStyle = aspectRatio ? { paddingTop: `${aspectRatio}%` } : {}

  // When fill is true, render directly without aspect ratio container
  if (fill) {
    return (
      <VideoPlayer
        src={videoUrl}
        poster={data?.asset?.metadata?.lqip || data?.asset?.metadata?.preview}
        alt={data?.alt || 'Studio Case Study Video'}
        className={twMerge('absolute inset-0 h-full w-full', className)}
        autoPlay={true}
        muted={true}
        loop={true}
        playsInline={true}
        controls={false}
        keepAudio={keepAudio}
        {...props}
      />
    )
  }

  // If we have aspect ratio, use padding trick. Otherwise, let video determine its own size
  if (aspectRatio) {
    return (
      <div
        className={twMerge('relative w-full', className)}
        style={containerStyle}
      >
        <div className="absolute inset-0 h-auto w-full">
          <VideoPlayer
            src={videoUrl}
            poster={
              data?.asset?.metadata?.lqip || data?.asset?.metadata?.preview
            }
            alt={data?.alt || 'Studio Case Study Video'}
            className="h-auto w-full"
            autoPlay={true}
            muted={true}
            loop={true}
            playsInline={true}
            controls={false}
            keepAudio={keepAudio}
            {...props}
          />
        </div>
      </div>
    )
  }

  // Fallback: use default 16:9 aspect ratio if dimensions aren't available
  return (
    <div className={twMerge('relative h-full w-full', className)}>
      <VideoPlayer
        src={videoUrl}
        poster={data?.asset?.metadata?.lqip || data?.asset?.metadata?.preview}
        alt={data?.alt || 'Studio Case Study Video'}
        autoPlay={true}
        muted={true}
        loop={true}
        playsInline={true}
        controls={false}
        keepAudio={keepAudio}
        {...props}
      />
    </div>
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
    (data.asset._id?.endsWith('mp4') ||
      data.asset._id?.endsWith('webm') ||
      data.asset._id?.endsWith('mov') ||
      data.asset?.extension === 'mp4' ||
      data.asset?.extension === 'webm' ||
      data.asset?.extension === 'mov' ||
      data.asset?.metadata?.format === 'mp4' ||
      data.asset?.metadata?.format === 'webm' ||
      data.asset?.metadata?.format === 'mov')

  return (
    <div
      className={twMerge(
        'relative w-full overflow-hidden',
        fill ? 'absolute inset-0 h-full' : '',
        className,
      )}
      {...props}
    >
      {isVideoFile ? (
        <RenderVideo data={mediaData} fill={fill} />
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
