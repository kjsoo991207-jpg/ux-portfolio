'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
  images: string[]
  alt: string
  startIndex?: number
  width?: number
  height?: number
}

const FRAME = 10
const RADIUS = 44

export default function IPhoneMockup({
  images,
  alt,
  startIndex = 0,
  width = 260,
  height = 520,
}: Props) {
  const [current, setCurrent] = useState(startIndex % images.length)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const id = setInterval(() => {
      setDirection(1)
      setCurrent(i => (i + 1) % images.length)
    }, 2800)
    return () => clearInterval(id)
  }, [images.length])

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%' }),
    center: { x: 0 },
    exit:  (dir: number) => ({ x: dir > 0 ? '-100%' : '100%' }),
  }

  return (
    <div className="flex flex-col items-center select-none">

      {/* ── iPhone frame ── */}
      <div style={{ width, height }} className="relative flex-shrink-0">

        {/* ── Body ── */}
        <div
          className="absolute inset-0"
          style={{
            borderRadius: RADIUS,
            background: 'linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 50%, #151515 100%)',
            boxShadow: [
              '0 24px 60px rgba(0,0,0,0.12)',
              '0 8px 20px rgba(0,0,0,0.08)',
              '0 0 0 0.5px rgba(255,255,255,0.06)',
            ].join(','),
          }}
        />

        {/* ── Top sheen (light from above) ── */}
        <div
          className="absolute pointer-events-none"
          style={{
            inset: 0,
            borderRadius: RADIUS,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 30%)',
          }}
        />

        {/* ── Screen ── */}
        <div
          className="absolute overflow-hidden"
          style={{
            left: FRAME,
            right: FRAME,
            top: FRAME,
            bottom: FRAME,
            borderRadius: RADIUS - 6,
            background: '#fff',
          }}
        >
          {/* Dynamic Island */}
          <div
            className="absolute left-1/2 -translate-x-1/2 bg-black z-20"
            style={{ top: 8, width: 70, height: 18, borderRadius: 20 }}
          />

          {/* Status bar */}
          <div
            className="absolute top-0 left-0 right-0 z-10 flex items-end justify-between pointer-events-none"
            style={{ height: 42, paddingLeft: 18, paddingRight: 18, paddingBottom: 5 }}
          >
            <span style={{ fontSize: 11, fontWeight: 600, color: '#fff', letterSpacing: '-0.2px' }}>
              9:41
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              {/* Signal */}
              <svg width="15" height="11" viewBox="0 0 15 11" fill="white">
                <rect x="0"    y="7"  width="2.4" height="4"  rx="0.6" />
                <rect x="3.1"  y="5"  width="2.4" height="6"  rx="0.6" />
                <rect x="6.2"  y="3"  width="2.4" height="8"  rx="0.6" />
                <rect x="9.3"  y="1"  width="2.4" height="10" rx="0.6" opacity="0.38" />
                <rect x="12.4" y="0"  width="2.2" height="11" rx="0.6" opacity="0.38" />
              </svg>
              {/* WiFi */}
              <svg width="14" height="11" viewBox="0 0 14 11" fill="white">
                <path d="M7 8.5a1.2 1.2 0 1 1 0 2.4A1.2 1.2 0 0 1 7 8.5z" />
                <path d="M3.2 5.8a5.4 5.4 0 0 1 7.6 0" stroke="white" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                <path d="M0.5 3.2a9.2 9.2 0 0 1 13 0" stroke="white" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.5" />
              </svg>
              {/* Battery */}
              <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
                <rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="white" strokeOpacity="0.38" />
                <rect x="19"  y="3.5" width="2.5" height="4"  rx="1.2" fill="white" fillOpacity="0.38" />
                <rect x="1.5" y="1.5" width="13"  height="8"  rx="1.5" fill="white" />
              </svg>
            </div>
          </div>

          {/* Sliding app screens */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'tween', ease: [0.32, 0.72, 0, 1], duration: 0.24 }}
                className="absolute inset-0"
              >
                <Image
                  src={images[current]}
                  alt={`${alt} — screen ${current + 1}`}
                  fill
                  className="object-cover object-top"
                  sizes={`${width}px`}
                  unoptimized
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Home indicator */}
          <div
            className="absolute pointer-events-none"
            style={{
              bottom: 6, left: '50%', transform: 'translateX(-50%)',
              width: 72, height: 4,
              background: 'rgba(0,0,0,0.18)',
              borderRadius: 999,
              zIndex: 20,
            }}
          />
        </div>
      </div>
    </div>
  )
}
