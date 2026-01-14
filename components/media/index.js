'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import MuxPlayer from '@mux/mux-player-react'
import Icon from 'components/icon'

export default function Media({
  media,
  className,
  // Video-specific props
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  controls = false,
  // Image-specific props
  fill = false,
  priority = false,
  sizes,
  quality = 90,
  // Fallback alt text
  alt,
  ...props
}) {
  if (!media) return null

  const mediaType = media?.mediaType

  // Determine which media data to use based on mediaType
  const imageData = media?.image
  const videoData = media?.video
  const muxVideoData = media?.muxVideo
  const keepAudio = media?.keepAudio === true

  // Render based on mediaType
  if (mediaType === 'image') {
    return (
      <MediaImage
        data={imageData}
        fill={fill}
        priority={priority}
        sizes={sizes}
        quality={quality}
        alt={alt}
        className={className}
        {...props}
      />
    )
  }

  if (mediaType === 'video') {
    return (
      <MediaVideo
        data={videoData}
        fill={fill}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        controls={controls}
        keepAudio={keepAudio}
        alt={alt}
        className={className}
        {...props}
      />
    )
  }

  if (mediaType === 'muxVideo') {
    return (
      <MediaMuxVideo
        data={muxVideoData}
        fill={fill}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        controls={controls}
        keepAudio={keepAudio}
        alt={alt}
        className={className}
        {...props}
      />
    )
  }

  return null
}

/**
 * Image component for Sanity image assets
 */
function MediaImage({
  data,
  fill = false,
  priority = false,
  sizes,
  quality = 90,
  alt,
  className,
  ...props
}) {
  if (!data?.asset) return null

  const altText = data?.alt || alt || 'Image'

  const dimensions = {
    width: data.asset?.metadata?.dimensions?.width || 800,
    height: data.asset?.metadata?.dimensions?.height || 600,
  }

  const blurDataURL = data.asset?.metadata?.lqip || undefined

  return (
    <Image
      src={`${data?.asset?.url}?fm=webp&q=${quality}`}
      alt={altText}
      priority={priority}
      fill={fill}
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

/**
 * Video component for file-based video assets
 */
function MediaVideo({
  data,
  fill = false,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  controls = false,
  keepAudio = false,
  alt,
  className,
  ...props
}) {
  const videoUrl = data?.asset?.url
  if (!videoUrl) return null

  const [isInViewport, setIsInViewport] = useState(false)
  const [isMuted, setIsMuted] = useState(muted)
  const videoRef = useRef(null)
  const containerRef = useRef(null)

  const altText = data?.alt || alt || 'Video'

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting)
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = isMuted
  }, [isMuted])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isInViewport && autoPlay) {
      const playPromise = video.play()
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch((error) => {
          console.warn('Video autoplay failed:', error)
        })
      }
    } else {
      video.pause()
    }
  }, [isInViewport, autoPlay])

  const handleToggleMute = () => {
    setIsMuted((prev) => !prev)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleToggleMute()
    }
  }

  // Get dimensions for aspect ratio
  const dimensions = data?.asset?.metadata?.dimensions
  const aspectRatio =
    !fill && dimensions?.width && dimensions?.height
      ? (dimensions.height / dimensions.width) * 100
      : null

  const containerStyle = aspectRatio ? { paddingTop: `${aspectRatio}%` } : {}

  const videoElement = (
    <>
      <video
        ref={videoRef}
        src={videoUrl}
        poster={data?.asset?.metadata?.lqip || data?.asset?.metadata?.preview}
        autoPlay={autoPlay}
        muted={isMuted}
        loop={loop}
        playsInline={playsInline}
        controls={controls}
        className="h-full w-full object-cover"
        preload="auto"
        aria-label={altText}
      >
        <track kind="captions" />
        Your browser does not support the video tag.
      </video>
      {keepAudio && (
        <button
          onClick={handleToggleMute}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          className="absolute bottom-4 right-4 z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white/50 backdrop-blur-[10px] transition-all duration-200 hover:bg-white/70 focus:outline-none focus:ring-2 focus:ring-black/50"
        >
          <Icon
            name={isMuted ? 'unmute' : 'mute'}
            className="h-5 w-5 text-black"
          />
        </button>
      )}
    </>
  )

  if (fill) {
    return (
      <div
        ref={containerRef}
        className={twMerge('relative h-full w-full overflow-hidden', className)}
        {...props}
      >
        {videoElement}
      </div>
    )
  }

  if (aspectRatio) {
    return (
      <div
        ref={containerRef}
        className={twMerge('relative w-full', className)}
        style={containerStyle}
        {...props}
      >
        <div className="absolute inset-0 h-full w-full">{videoElement}</div>
      </div>
    )
  }

  // Fallback: 16:9 aspect ratio
  return (
    <div
      ref={containerRef}
      className={twMerge('relative h-full w-full', className)}
      style={{ paddingTop: '56.25%' }}
      {...props}
    >
      <div className="absolute inset-0 h-full w-full">{videoElement}</div>
    </div>
  )
}

/**
 * Mux Video component for Mux-hosted video assets
 */
function MediaMuxVideo({
  data,
  fill = false,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  controls = false,
  keepAudio = false,
  alt,
  className,
  ...props
}) {
  const playbackId = data?.asset?.playbackId
  if (!playbackId) return null

  const [isMuted, setIsMuted] = useState(muted)
  const altText = data?.alt || alt || 'Video'

  const dimensions = data?.asset?.data
  const aspectRatio =
    dimensions?.aspect_ratio?.replace(':', '/') ||
    (dimensions?.width && dimensions?.height
      ? `${dimensions.width}/${dimensions.height}`
      : '16/9')

  const handleToggleMute = () => {
    setIsMuted((prev) => !prev)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleToggleMute()
    }
  }

  const muxPlayerElement = (
    <>
      <MuxPlayer
        playbackId={playbackId}
        autoPlay={autoPlay ? 'muted' : false}
        muted={isMuted}
        loop={loop}
        playsInline={playsInline}
        streamType="on-demand"
        preload="auto"
        className="h-full w-full"
        style={{
          '--controls': controls ? 'inherit' : 'none',
          '--media-object-fit': 'cover',
          '--media-object-position': 'center',
          aspectRatio: fill ? undefined : aspectRatio,
        }}
        title={altText}
      />
      {keepAudio && (
        <button
          onClick={handleToggleMute}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          className="absolute bottom-4 right-4 z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white/50 backdrop-blur-[10px] transition-all duration-200 hover:bg-white/70 focus:outline-none focus:ring-2 focus:ring-black/50"
        >
          <Icon
            name={isMuted ? 'unmute' : 'mute'}
            className="h-5 w-5 text-black"
          />
        </button>
      )}
    </>
  )

  if (fill) {
    return (
      <div
        className={twMerge('relative h-full w-full overflow-hidden', className)}
      >
        {muxPlayerElement}
      </div>
    )
  }

  return (
    <div className={twMerge('relative w-full', className)} style={{aspectRatio}}>
      {muxPlayerElement}
    </div>
  )
}

// Export sub-components for direct use if needed
export { MediaImage, MediaVideo, MediaMuxVideo }
