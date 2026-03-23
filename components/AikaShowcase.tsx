'use client'

import Link from 'next/link'

const TAGS = ['Case Study', 'Longevity Health', 'AI Coaching', 'Habit Design', 'Product Design / Research']

interface AikaShowcaseProps {
  galleryImages: string[]
  name: string
}

export default function AikaShowcase({ galleryImages, name }: AikaShowcaseProps) {
  void galleryImages
  void name

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-10 items-center py-10 md:py-16">
      {/* ── Left: text ── */}
      <div className="flex flex-col items-start">
        <p className="font-mono text-[10px] tracking-[0.3em] text-neutral-400 uppercase mb-4">
          Aika
        </p>
        <h2 className="font-serif text-[36px] font-bold text-[#111] leading-[1.2] tracking-tight">
          Live longer.<br />By design.
        </h2>
        <div className="flex flex-wrap mt-6">
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="text-[11px] text-neutral-600 border border-neutral-300 rounded-full px-3 py-1.5 bg-white inline-block m-1 ml-0"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="pt-8">
          <Link
            href="/work/aika"
            className="inline-block bg-[#111] text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-neutral-800 transition-colors"
          >
            View Work →
          </Link>
        </div>
      </div>

      {/* ── Right: phone with video ── */}
      <div className="flex justify-center md:justify-end">
        <a
          href="/work/aika"
          className="relative block cursor-pointer"
          style={{
            width: 320,
            filter: 'drop-shadow(0px 20px 40px rgba(0,0,0,0.08)) drop-shadow(0px 8px 16px rgba(0,0,0,0.04))',
          }}
        >
          <div
            className="absolute overflow-hidden"
            style={{ top: '1.5%', left: '4%', right: '4%', bottom: '1.5%', borderRadius: '28px', zIndex: 1 }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/images/aika/hero-prototype.mp4" type="video/mp4" />
            </video>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/iphone-17-frame.png"
            alt=""
            className="w-full h-auto block select-none relative z-[2]"
            draggable={false}
          />
        </a>
      </div>
    </div>
  )
}
