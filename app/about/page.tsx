'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type SectionId = 'background' | 'philosophy' | 'love' | null

const SECTIONS = [
  {
    id: 'background' as const,
    label: 'Background',
    labelShort: 'Background',
    // Left macbook screen
    screen: { left: '7%', top: '14%', width: '24%', height: '34%' },
    zoom: { x: 20, y: 40 },
    person: { left: '3%', top: '15%', width: '30%', height: '75%' },
  },
  {
    id: 'philosophy' as const,
    label: 'Design\nPhilosophy',
    labelShort: 'Design Philosophy',
    // Center monitor screen
    screen: { left: '32%', top: '6%', width: '32%', height: '44%' },
    zoom: { x: 50, y: 40 },
    person: { left: '33%', top: '15%', width: '34%', height: '75%' },
  },
  {
    id: 'love' as const,
    label: 'Things\nI Love',
    labelShort: 'Things I Love',
    // Right iPad screen
    screen: { left: '67%', top: '22%', width: '22%', height: '32%' },
    zoom: { x: 80, y: 40 },
    person: { left: '67%', top: '15%', width: '30%', height: '75%' },
  },
]

function ScreenGlow({ label, isActive, onClick, screen }: {
  label: string
  isActive: boolean
  onClick: () => void
  screen: { left: string; top: string; width: string; height: string }
}) {
  return (
    <button
      onClick={onClick}
      className="absolute group"
      style={{
        left: screen.left,
        top: screen.top,
        width: screen.width,
        height: screen.height,
        zIndex: 20,
      }}
      aria-label={label.replace('\n', ' ')}
    >
      {/* Glow overlay */}
      <div
        className={`absolute inset-0 rounded-sm transition-all duration-500 ${
          isActive
            ? 'opacity-0'
            : 'opacity-100 group-hover:opacity-90'
        }`}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(200,220,255,0.45) 0%, rgba(180,210,255,0.15) 60%, transparent 100%)',
          boxShadow: '0 0 20px 8px rgba(180,210,255,0.25), inset 0 0 15px rgba(200,220,255,0.2)',
          animation: isActive ? 'none' : 'screenPulse 3s ease-in-out infinite',
        }}
      />
      {/* Label on hover */}
      <span
        className={`absolute left-1/2 -translate-x-1/2 -bottom-5 sm:-bottom-6 text-[9px] sm:text-[11px] tracking-[0.08em] uppercase whitespace-nowrap transition-all duration-300 ${
          isActive ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
        } text-[#555]`}
        style={{ fontFamily: 'var(--font-mono), monospace' }}
      >
        {label.replace('\n', ' ')}
      </span>
    </button>
  )
}

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState<SectionId>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const handleClick = (id: SectionId) => {
    const next = activeSection === id ? null : id
    setActiveSection(next)
    // Scroll to top of the bus section when opening
    if (next && sectionRef.current) {
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      {/* Header */}
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16 mb-16">
        <div className="flex-1">
          <h1 className="text-4xl font-bold tracking-tight text-[#111] mb-6">
            Jinsoo Kim
          </h1>
          <p className="text-[22px] sm:text-[26px] text-[#333] leading-snug max-w-[500px] mb-6" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', letterSpacing: '-0.04em' }}>
            I design products that just feel right.
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
      <div className="border-t border-neutral-200 pt-12 pb-4" ref={sectionRef}>
        {!activeSection && (
          <p className="font-serif text-[22px] sm:text-[28px] text-[#333] leading-snug mb-10">
            This is where I design. Pick a screen.
          </p>
        )}

        {/* Bus image - zooms into person when clicked */}
        <div
          className="relative w-full overflow-hidden transition-all duration-700 ease-in-out"
          style={{
            maxHeight: activeSection ? '180px' : '2000px',
            cursor: activeSection ? 'pointer' : 'default',
          }}
          onClick={() => { if (activeSection) setActiveSection(null) }}
        >
          <div
            className="transition-all duration-700 ease-in-out"
            style={activeSection ? {
              transform: `scale(2.5) translate(${50 - (SECTIONS.find(s => s.id === activeSection)?.zoom.x ?? 50)}%, ${50 - (SECTIONS.find(s => s.id === activeSection)?.zoom.y ?? 50)}%)`,
              opacity: 0.3,
              filter: 'blur(2px)',
            } : {
              transform: 'scale(1) translate(0%, 0%)',
              opacity: 1,
              filter: 'blur(0px)',
            }}
          >
            <Image
              src="/images/desk-observation.png"
              alt="Jinsoo working at his desk with three devices"
              width={1456}
              height={816}
              className="w-full h-auto"
              unoptimized
              priority
            />

            {/* Screen glow overlays */}
            {SECTIONS.map((section) => (
              <ScreenGlow
                key={section.id}
                label={section.label}
                isActive={activeSection === section.id}
                onClick={() => handleClick(section.id)}
                screen={section.screen}
              />
            ))}

            {/* Invisible clickable hotspots over each person */}
            {SECTIONS.map((section) => (
              <button
                key={`person-${section.id}`}
                onClick={() => handleClick(section.id)}
                className="absolute cursor-pointer hover:bg-black/[0.03] transition-colors duration-200 rounded-lg"
                style={{
                  left: section.person.left,
                  top: section.person.top,
                  width: section.person.width,
                  height: section.person.height,
                  zIndex: 10,
                }}
                aria-label={`Observe: ${section.label.replace('\n', ' ')}`}
              />
            ))}
          </div>
        </div>

        {/* Content - replaces the bus image space */}
        {activeSection && (
          <div
            className="mt-4 cursor-pointer"
            style={{ animation: 'lensReveal 0.4s ease-out forwards' }}
            onClick={() => setActiveSection(null)}
          >
            <div className="relative mx-auto max-w-[640px]">
              <div
                className="relative border border-neutral-200 rounded-2xl bg-[#fafafa] p-8 sm:p-10 cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Back button */}
                <button
                  onClick={() => setActiveSection(null)}
                  className="absolute top-4 right-4 flex items-center gap-1.5 text-[11px] tracking-[0.1em] uppercase text-[#999] hover:text-[#111] transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-mono), monospace' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5" />
                    <path d="M12 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>

                <p
                  className="text-[10px] tracking-[0.2em] uppercase text-[#999] mb-2"
                  style={{ fontFamily: 'var(--font-mono), monospace' }}
                >
                  Observation
                </p>
                <h2 className="text-[22px] font-semibold text-[#111] mb-6">
                  {SECTIONS.find(s => s.id === activeSection)?.labelShort || SECTIONS.find(s => s.id === activeSection)?.label}
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

            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#767676] mb-2 mt-6">Service</p>
            <p className="text-[14px] text-[#111]">ROK Army — Squad Leader</p>
            <p className="text-[13px] text-[#767676]">Oct 2023 - Apr 2025</p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#767676] mb-2">Skills</p>
            <p className="text-[14px] text-[#111]">User Research, Wireframing, Prototyping, Behavioral Analysis</p>
            <p className="text-[13px] text-[#767676] mt-1">Figma, Miro, HTML/CSS</p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#767676] mb-2">Contact</p>
            <a href="mailto:jinsoo991207@ucla.edu" className="text-[14px] text-[#111] underline underline-offset-2 block">
              jinsoo991207@ucla.edu
            </a>
            <a href="https://www.linkedin.com/in/jinsoo-kim-2715553b9" target="_blank" rel="noopener noreferrer" className="text-[14px] text-[#111] underline underline-offset-2 block mt-1">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
