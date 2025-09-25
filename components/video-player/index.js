'use client'

import { useState, useRef, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

export default function VideoPlayer({
  src,
  poster,
  alt,
  className,
  autoPlay = false,
  muted = false,
  loop = false,
  playsInline = false,
  controls = false,
  ...props
}) {
  const [isInViewport, setIsInViewport] = useState(false)
  const videoRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInViewport(true)
        } else {
          setIsInViewport(false)
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.1,
      },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
      observer.disconnect()
    }
  }, [])

  // Play/pause based on viewport to avoid reloading source which can cause flashes
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isInViewport) {
      if (autoPlay) {
        const playPromise = video.play()
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {})
        }
      }
    } else {
      video.pause()
    }
  }, [isInViewport, autoPlay])

  return (
    <div
      ref={containerRef}
      className={twMerge('relative h-full w-full overflow-hidden', className)}
      {...props}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        controls={controls}
        className="h-full w-full object-cover"
        preload="metadata"
      >
        <track kind="captions" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
