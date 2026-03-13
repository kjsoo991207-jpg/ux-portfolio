'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Props {
  images: string[]
  alt: string
}

export default function ProjectCarousel({ images, alt }: Props) {
  const [current, setCurrent] = useState(0)
  const [resetKey, setResetKey] = useState(0)

  const goTo = (i: number) => {
    setCurrent(i)
    setResetKey(k => k + 1)
  }

  const prev = () => goTo((current - 1 + images.length) % images.length)
  const next = () => goTo((current + 1) % images.length)

  // Auto-advance — resets whenever the user navigates manually
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent(i => (i + 1) % images.length)
    }, 3000)
    return () => clearInterval(id)
  }, [resetKey, images.length])

  return (
    <div className="flex flex-col gap-3">
      {/* Image area */}
      <div className="relative w-full h-64 md:h-72 overflow-hidden rounded-xl bg-neutral-50 group">
        {images.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-500 ${
              i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <Image
              src={src}
              alt={`${alt} — ${i + 1}`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 600px"
              unoptimized={src.endsWith('.svg')}
            />
          </div>
        ))}

        {/* Prev button */}
        <button
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm"
        >
          ‹
        </button>

        {/* Next button */}
        <button
          onClick={next}
          aria-label="Next image"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm"
        >
          ›
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to image ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'w-4 h-1.5 bg-neutral-600'
                : 'w-1.5 h-1.5 bg-neutral-300 hover:bg-neutral-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
