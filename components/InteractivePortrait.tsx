'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function InteractivePortrait() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 })
  const [isNear, setIsNear] = useState(false)

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height * 0.35 // eyes are in upper third

      const dx = e.clientX - centerX
      const dy = e.clientY - centerY
      const dist = Math.sqrt(dx * dx + dy * dy)
      const maxMove = 5

      // Normalize and limit movement
      const angle = Math.atan2(dy, dx)
      const move = Math.min(dist / 80, 1) * maxMove

      setPupilOffset({
        x: Math.cos(angle) * move,
        y: Math.sin(angle) * move,
      })

      // Check if mouse is near the portrait
      setIsNear(dist < 300)
    }

    function handleMouseLeave() {
      setPupilOffset({ x: 0, y: 0 })
      setIsNear(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative" style={{ width: 'fit-content' }}>
      <div className="relative h-72 w-56 rounded-lg bg-neutral-100 overflow-hidden sm:h-96 sm:w-72">
        <Image
          src="/images/jinsoo-profile.png"
          alt="Jinsoo Kim"
          fill
          className="object-cover"
          unoptimized
        />

        {/* Left eye pupil */}
        <div
          className="absolute rounded-full transition-transform duration-75 pointer-events-none"
          style={{
            width: 7,
            height: 7,
            backgroundColor: 'red',
            top: '33%',
            left: '40%',
            transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`,
          }}
        />

        {/* Right eye pupil */}
        <div
          className="absolute rounded-full transition-transform duration-75 pointer-events-none"
          style={{
            width: 7,
            height: 7,
            backgroundColor: 'red',
            top: '32.5%',
            left: '55%',
            transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`,
          }}
        />

        {/* Smile overlay - appears when mouse is near */}
        <svg
          className="absolute transition-opacity duration-500 pointer-events-none"
          style={{
            top: '44%',
            left: '40%',
            width: 50,
            height: 16,
            opacity: isNear ? 0.5 : 0,
          }}
          viewBox="0 0 50 16"
        >
          <path
            d="M 8 4 Q 25 16 42 4"
            fill="none"
            stroke="#2a2a2a"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  )
}
