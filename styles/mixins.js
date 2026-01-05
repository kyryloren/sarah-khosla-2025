/**
 * Legacy media rendering utilities.
 * For new code, prefer using the Media component from 'components'.
 *
 * These utilities are kept for backwards compatibility and for cases
 * where you need to render individual media types directly.
 */

import { twMerge } from 'tailwind-merge'
import Image from 'next/image'
import { getImageDimensions } from '@sanity/asset-utils'
import { VideoPlayer, Media } from 'components'
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

    dimensions = {
      width: data.asset?.metadata?.dimensions?.width || 800,
      height: data.asset?.metadata?.dimensions?.height || 600,
    }
    blurDataURL = data.asset?.metadata?.lqip || undefined
  } else {
    imageUrl = urlFor(data).format('webp').quality(quality).url()
    dimensions = getImageDimensions(data)
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

  const keepAudio = data?.keepAudio === true
  const dimensions = data?.asset?.metadata?.dimensions
  const aspectRatio =
    !fill && dimensions?.width && dimensions?.height
      ? (dimensions.height / dimensions.width) * 100
      : null

  const containerStyle = aspectRatio ? { paddingTop: `${aspectRatio}%` } : {}

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

  if (aspectRatio) {
    return (
      <div
        className={twMerge('relative w-full', className)}
        style={containerStyle}
      >
        <div className="absolute inset-0 h-full w-full">
          <VideoPlayer
            src={videoUrl}
            poster={
              data?.asset?.metadata?.lqip || data?.asset?.metadata?.preview
            }
            alt={data?.alt || 'Studio Case Study Video'}
            className="h-full w-full"
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

  return (
    <div
      className={twMerge('relative w-full', className)}
      style={{ paddingTop: '56.25%' }}
    >
      <div className="absolute inset-0 h-full w-full">
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
    </div>
  )
}

/**
 * RenderMedia - Legacy component for rendering media.
 *
 * For new code with Sanity media objects that include mediaType,
 * prefer using the Media component from 'components':
 *
 * @example
 * import { Media } from 'components'
 * <Media media={mediaObject} />
 *
 * This component is kept for backwards compatibility when you have
 * direct image/video asset data without the mediaType wrapper.
 */
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

  const mediaData = {
    ...data,
    alt: alt || data.alt,
  }

  const isImageAsset =
    data.asset._ref?.startsWith('image-') ||
    data.asset._type === 'sanity.imageAsset' ||
    (data.asset._ref && !data.asset._ref.startsWith('file-'))

  const isFileAsset =
    data.asset._ref?.startsWith('file-') ||
    data.asset._type === 'sanity.fileAsset'

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
