'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, useCallback } from 'react'

type SectionId = 'background' | 'philosophy' | 'love' | null

const SECTIONS = [
  {
    id: 'background' as const,
    label: 'Background',
    // Businessman with phone - percentage center point of the person
    center: { x: 47, y: 50 },
    hotspot: { left: '36%', top: '10%', width: '22%', height: '80%' },
  },
  {
    id: 'philosophy' as const,
    label: 'Design Philosophy',
    // Woman reading
    center: { x: 67, y: 50 },
    hotspot: { left: '58%', top: '12%', width: '18%', height: '78%' },
  },
  {
    id: 'love' as const,
    label: 'Things I Love',
    // Elderly man
    center: { x: 86, y: 50 },
    hotspot: { left: '76%', top: '10%', width: '20%', height: '80%' },
  },
]

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState<SectionId>(null)
  const [scales, setScales] = useState<Record<string, number>>({
    background: 1,
    philosophy: 1,
    love: 1,
  })
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleClick = (id: SectionId) => {
    setActiveSection(prev => prev === id ? null : id)
  }

  // Proximity-based scaling
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return

    const mouseX = ((e.clientX - rect.left) / rect.width) * 100
    const mouseY = ((e.clientY - rect.top) / rect.height) * 100

    const newScales: Record<string, number> = {}

    SECTIONS.forEach((section) => {
      const dx = mouseX - section.center.x
      const dy = mouseY - section.center.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      // Max effect within 20% distance, no effect beyond 40%
      const maxScale = 1.15
      const minDistance = 5
      const maxDistance = 35

      if (distance < maxDistance) {
        const t = Math.max(0, 1 - (distance - minDistance) / (maxDistance - minDistance))
        newScales[section.id] = 1 + (maxScale - 1) * t * t // ease-out curve
      } else {
        newScales[section.id] = 1
      }
    })

    setScales(newScales)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setScales({ background: 1, philosophy: 1, love: 1 })
  }, [])

  useEffect(() => {
    if (activeSection && contentRef.current) {
      setTimeout(() => {
        contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 150)
    }
  }, [activeSection])

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      {/* Header */}
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16 mb-16">
        <div className="flex-1">
          <h1 className="text-4xl font-bold tracking-tight text-[#111] mb-6">
            Jinsoo Kim
          </h1>
          <p className="font-serif text-[22px] sm:text-[26px] text-[#333] leading-snug max-w-[500px] mb-6">
            &ldquo;I don&apos;t ask users what they want. I watch what they do.&rdquo;
          </p>
          <p className="text-[14px] text-[#767676] leading-relaxed max-w-[500px]">
            Product Designer &middot; UCLA Cognitive Science &middot; Behavioral Observation
          </p>
        </div>

        <div className="flex-shrink-0">
          <div className="relative h-72 w-56 rounded-lg bg-neutral-100 overflow-hidden sm:h-96 sm:w-72">
            <Image
              src="/images/jinsoo-profile.png"
              alt="Jinsoo Kim"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </div>

      {/* Bus Observation Scene */}
      <div className="border-t border-neutral-200 pt-12 pb-4">
        <p
          className="text-[11px] tracking-[0.2em] uppercase text-[#999] mb-8"
          style={{ fontFamily: 'var(--font-mono), monospace' }}
        >
          Click a passenger to observe
        </p>

        <div
          ref={containerRef}
          className="relative w-full cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Bus illustration */}
          <Image
            src="/images/bus-observation.png"
            alt="Jinsoo observing passengers on a Korean bus"
            width={1456}
            height={816}
            className="w-full h-auto"
            unoptimized
            priority
          />

          {/* Clickable hotspots with proximity scaling */}
          {SECTIONS.map((section) => {
            const scale = scales[section.id] || 1
            return (
              <button
                key={section.id}
                onClick={() => handleClick(section.id)}
                className="absolute group"
                style={{
                  left: section.hotspot.left,
                  top: section.hotspot.top,
                  width: section.hotspot.width,
                  height: section.hotspot.height,
                  transform: `scale(${scale})`,
                  transformOrigin: 'center bottom',
                  transition: 'transform 0.15s ease-out',
                  zIndex: scale > 1.01 ? 10 : 1,
                }}
                aria-label={`Observe: ${section.label}`}
              >
                {/* Hover overlay */}
                <div className={`
                  absolute inset-0 flex items-center justify-center rounded-xl
                  transition-all duration-300
                  ${activeSection === section.id
                    ? 'bg-black/5 ring-2 ring-[#111]/20'
                    : 'bg-transparent group-hover:bg-black/[0.03] group-hover:ring-1 group-hover:ring-[#111]/10'
                  }
                `}>
                  {activeSection !== section.id && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round">
                        <circle cx="11" cy="11" r="7" />
                        <path d="M16 16 L21 21" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Label */}
                <span
                  className={`
                    absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap
                    text-[10px] tracking-[0.1em] uppercase transition-all duration-300
                    ${activeSection === section.id
                      ? 'opacity-100 text-[#111]'
                      : scale > 1.03
                        ? 'opacity-100 text-[#777]'
                        : 'opacity-0 group-hover:opacity-100 text-[#777]'
                    }
                  `}
                  style={{ fontFamily: 'var(--font-mono), monospace' }}
                >
                  {section.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Expanded Content */}
      <div ref={contentRef}>
        {activeSection && (
          <div
            className="mt-12 mb-8"
            style={{ animation: 'lensReveal 0.5s ease-out forwards' }}
          >
            <div className="relative mx-auto max-w-[640px]">
              {/* Magnifying glass icon + connecting line */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-[1.5px] border-[#111] flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round">
                      <circle cx="11" cy="11" r="7" />
                      <path d="M16 16 L21 21" />
                    </svg>
                  </div>
                  <div className="absolute top-full left-1/2 w-[1px] h-5 bg-[#ddd] -translate-x-1/2" />
                </div>
              </div>

              {/* Content card */}
              <div className="border border-neutral-200 rounded-2xl bg-[#fafafa] p-8 sm:p-10">
                <p
                  className="text-[10px] tracking-[0.2em] uppercase text-[#999] mb-2"
                  style={{ fontFamily: 'var(--font-mono), monospace' }}
                >
                  Observation
                </p>
                <h2 className="text-[22px] font-semibold text-[#111] mb-6">
                  {SECTIONS.find(s => s.id === activeSection)?.label}
                </h2>

                {activeSection === 'background' && (
                  <div className="space-y-4">
                    <p className="text-[15px] text-[#555] leading-[1.7]">
                      Before I ever heard the term &ldquo;user research,&rdquo; I was already doing it. As a <strong className="text-[#111]">baseball analytics recorder</strong>, I tracked behavioral patterns of 20+ athletes, noting what made some improve while others stalled. In a <strong className="text-[#111]">nursing home</strong>, I learned to communicate with residents who couldn&rsquo;t speak, reading their habits and emotional cues to understand what they needed.
                    </p>
                    <p className="text-[15px] text-[#555] leading-[1.7]">
                      These experiences taught me that understanding people isn&rsquo;t about asking them what they want. It&rsquo;s about <strong className="text-[#111]">watching what they do</strong>. That curiosity led me to cognitive science at UCLA, where I study perception, decision-making, and human behavior, and apply it to <strong className="text-[#111]">product design</strong>.
                    </p>
                  </div>
                )}

                {activeSection === 'philosophy' && (
                  <div className="space-y-4">
                    <p className="text-[15px] text-[#555] leading-[1.7]">
                      I believe the best products are the ones that <strong className="text-[#111]">feel invisible</strong>. If a user has to think about how to use something, the design has already failed. My background in cognitive science shaped this: I prioritize <strong className="text-[#111]">reducing cognitive load</strong> and designing for how people actually process information.
                    </p>
                    <p className="text-[15px] text-[#555] leading-[1.7]">
                      I care about the small moments. The micro-interaction that makes you smile. The feedback that tells you &ldquo;it&rsquo;s okay to slip&rdquo; instead of &ldquo;you failed.&rdquo; <strong className="text-[#111]">Behavior first. Pixels second.</strong>
                    </p>
                  </div>
                )}

                {activeSection === 'love' && (
                  <div className="space-y-4">
                    <p className="text-[15px] text-[#555] leading-[1.7]">
                      I love <strong className="text-[#111]">watching people</strong>. On the subway, on the bus, in a coffee shop. How someone reaches for their phone when they&rsquo;re bored. How a stranger&rsquo;s face shifts when they read a text. The micro-expressions people make when they&rsquo;re confused by a door handle. I&rsquo;ve always been this way. It&rsquo;s not something I learned in school. It&rsquo;s just how I see the world. That habit of <strong className="text-[#111]">observing behavior, emotion, and expression</strong> in everyday life is what makes me want to design products that truly fit people.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Education + Skills + Contact */}
      <div className="border-t border-neutral-200 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#767676] mb-2">Education</p>
            <p className="text-[14px] text-[#111]">UCLA — B.S. Cognitive Science</p>
            <p className="text-[13px] text-[#767676]">Sep 2025 - Present</p>
            <p className="text-[14px] text-[#111] mt-2">Berkeley City College</p>
            <p className="text-[13px] text-[#767676]">2021 - 2023</p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#767676] mb-2">Skills</p>
            <p className="text-[14px] text-[#111]">User Research, Wireframing, Prototyping, Behavioral Analysis</p>
            <p className="text-[13px] text-[#767676] mt-1">Figma, Miro, HTML/CSS</p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#767676] mb-2">Contact</p>
            <a href="mailto:jinsoo991207@ucla.edu" className="text-[14px] text-[#111] underline underline-offset-2">
              jinsoo991207@ucla.edu
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
