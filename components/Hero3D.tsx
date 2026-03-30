'use client'

import AutoPlayVideo from '@/components/AutoPlayVideo'

export default function Hero3D() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center"
      style={{ background: '#fff' }}
      aria-label="Hero"
    >
      <div className="flex flex-col items-center select-none">
        <AutoPlayVideo
          src="/images/hero-name.mp4"
          poster="/images/hero-poster.jpg"
          mobileSpeed={1.8}
          style={{
            width: 'clamp(700px, 95vw, 1400px)',
            height: 'auto',
          }}
        />
      </div>

      {/* Slogan - bottom right with vertical line */}
      <div
        className="absolute bottom-12 right-8 sm:bottom-16 sm:right-16 flex items-start gap-3"
      >
        <div className="w-[1px] h-10 bg-[#ccc] mt-[2px]" />
        <div>
          <p
            className="text-[13px] sm:text-[14px] text-[#666] leading-snug"
            style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', letterSpacing: '-0.04em' }}
          >
            I design products that just feel right.
          </p>
          <a
            href="/about"
            className="text-[13px] text-[#999] underline underline-offset-2 hover:text-[#111] transition-colors mt-1.5 inline-block"
            style={{ fontFamily: 'var(--font-mono), monospace' }}
          >
            More about me &rarr;
          </a>
        </div>
      </div>
    </section>
  )
}
