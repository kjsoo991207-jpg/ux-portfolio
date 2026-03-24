'use client'

import { useEffect, useRef } from 'react'

export default function AutoPlayVideo({ src, className, style, mobileSpeed }: { src: string; className?: string; style?: React.CSSProperties; mobileSpeed?: number }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Speed up on mobile if specified
    if (mobileSpeed && window.innerWidth < 640) {
      video.playbackRate = mobileSpeed
    }

    // Force play on load
    const playVideo = () => {
      video.play().catch(() => {})
    }

    playVideo()

    // Re-play when video ends (backup for loop)
    const handleEnded = () => {
      video.currentTime = 0
      playVideo()
    }
    video.addEventListener('ended', handleEnded)

    // Re-play when tab becomes visible
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) playVideo()
    })

    // Re-play on any user interaction (mobile fix)
    const handleInteraction = () => {
      playVideo()
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('touchstart', handleInteraction)
    }
    window.addEventListener('click', handleInteraction)
    window.addEventListener('touchstart', handleInteraction)

    return () => {
      video.removeEventListener('ended', handleEnded)
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('touchstart', handleInteraction)
    }
  }, [])

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      className={className}
      style={style}
      draggable={false}
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}
