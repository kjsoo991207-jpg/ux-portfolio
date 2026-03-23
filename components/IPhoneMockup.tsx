'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
  images: string[]
  alt: string
  startIndex?: number
  width?: number
  height?: number
}

export default function IPhoneMockup({
  images,
  alt,
  startIndex = 0,
  width = 260,
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
    <div className="relative flex-shrink-0" style={{ width }}>
      <div
        className="absolute overflow-hidden"
        style={{ top: '1.5%', left: '4%', right: '4%', bottom: '1.5%', borderRadius: '28px', zIndex: 1 }}
      >
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[current]}
              alt={`${alt} — screen ${current + 1}`}
              className="w-full h-full object-cover object-top"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/iphone-17-frame.png"
        alt=""
        className="w-full h-auto block select-none relative z-[2]"
        draggable={false}
      />
    </div>
  )
}
