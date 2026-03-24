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

        {/* Left eye pupil - covers original and moves */}
        <div
          className="absolute rounded-full transition-transform duration-100 pointer-events-none"
          style={{
            width: 14,
            height: 14,
            backgroundColor: '#111',
            top: '31.5%',
            left: '36.5%',
            transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`,
            boxShadow: '0 0 2px rgba(0,0,0,0.3)',
          }}
        />

        {/* Right eye pupil - covers original and moves */}
        <div
          className="absolute rounded-full transition-transform duration-100 pointer-events-none"
          style={{
            width: 14,
            height: 14,
            backgroundColor: '#111',
            top: '31%',
            left: '51%',
            transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`,
            boxShadow: '0 0 2px rgba(0,0,0,0.3)',
          }}
        />

      </div>
    </div>
  )
}
