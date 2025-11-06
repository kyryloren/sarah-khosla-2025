'use client'

import { useState, useRef, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'
import Icon from 'components/icon'

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
  keepAudio = false,
  ...props
}) {
  const [isInViewport, setIsInViewport] = useState(false)
  const [isMuted, setIsMuted] = useState(muted)
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

  // Sync muted state with video element
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = isMuted
  }, [isMuted])

  // Play/pause based on viewport to avoid reloading source which can cause flashes
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isInViewport) {
      if (autoPlay) {
        const playPromise = video.play()
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch((error) => {
            console.warn('Video autoplay failed:', error)
          })
        }
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

  return (
    <div
      ref={containerRef}
      className={twMerge('relative h-auto w-full overflow-hidden', className)}
      {...props}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        muted={isMuted}
        loop={loop}
        playsInline={playsInline}
        controls={controls}
        className="h-full w-full object-cover"
        preload="auto"
        aria-label={alt}
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
    </div>
  )
}
