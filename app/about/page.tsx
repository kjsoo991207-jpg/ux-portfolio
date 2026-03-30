'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type SectionId = 'background' | 'philosophy' | 'love' | null

const SECTIONS = [
  {
    id: 'background' as const,
    label: 'Background',
    labelShort: 'Background',
    bulb: { left: '38%', top: '48%', rotate: 20 },
    zoom: { x: 19, y: 30, scale: 3 },
  },
  {
    id: 'philosophy' as const,
    label: 'Design\nPhilosophy',
    labelShort: 'Design Philosophy',
    bulb: { left: '48%', top: '43%', rotate: 0 },
    zoom: { x: 48, y: 28, scale: 2.8 },
  },
  {
    id: 'love' as const,
    label: 'Things\nI Love',
    labelShort: 'Things I Love',
    bulb: { left: '58%', top: '48%', rotate: -20 },
    zoom: { x: 77, y: 32, scale: 3.2 },
  },
]


export default function AboutPage() {
  const [activeSection, setActiveSection] = useState<SectionId>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const handleClick = (id: SectionId) => {
    const next = activeSection === id ? null : id
    setActiveSection(next)
    if (next && sectionRef.current) {
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }

  return (
    <div className="mx-auto max-w-7xl">
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      {/* Header */}
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16 mb-16">
        <div className="flex-1">
          <h1 className="text-4xl font-bold tracking-tight text-white mb-6">
            Jinsoo Kim
          </h1>
          <p className="text-[15px] text-neutral-400 leading-[1.75] max-w-[480px] mb-5">
            Hi, I&rsquo;m Jinsoo. I study cognitive science at UCLA and design products grounded in how people actually think and behave. I got into design not through pixels, but through watching people, and I haven&rsquo;t stopped since.
          </p>
          <p className="text-[13px] text-neutral-500 leading-relaxed max-w-[500px]">
            Product Designer &middot; UCLA Cognitive Science &middot; Behavioral Observation
          </p>
        </div>

        <div className="flex-shrink-0">
          <div className="relative h-72 w-56 rounded-lg bg-neutral-900 overflow-hidden sm:h-96 sm:w-72">
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
      <div className="border-t border-white/10 pt-12 pb-4" ref={sectionRef}>
        {!activeSection && (
          <p className="font-serif text-[22px] sm:text-[28px] text-neutral-300 leading-snug mb-10">
            Tap a lightbulb to peek inside my head.
          </p>
        )}

        {/* Desk image + overlay card container */}
        <div
          className="relative w-full"
          style={{
            cursor: activeSection ? 'pointer' : 'default',
          }}
          onClick={() => { if (activeSection) setActiveSection(null) }}
        >
          <div
            className="transition-all duration-1000 ease-in-out"
            style={{
              opacity: activeSection ? 0.15 : 1,
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

            {/* Lightbulb emojis */}
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => handleClick(section.id)}
                className="absolute transition-all duration-300 group"
                style={{
                  left: section.bulb.left,
                  top: section.bulb.top,
                  transform: `translateX(-50%) rotate(${section.bulb.rotate}deg)`,
                  zIndex: 20,
                  animation: activeSection ? 'none' : 'bulbFloat 3s ease-in-out infinite',
                }}
                aria-label={section.labelShort || section.label.replace('\n', ' ')}
              >
                <span
                  className={`text-[40px] sm:text-[52px] block transition-all duration-300 select-none ${
                    activeSection === section.id
                      ? 'scale-125 drop-shadow-[0_0_10px_rgba(255,220,100,0.7)]'
                      : 'group-hover:scale-115 group-hover:drop-shadow-[0_0_8px_rgba(255,220,100,0.5)]'
                  }`}
                  style={{
                    transform: `rotate(${-section.bulb.rotate}deg)`,
                  }}
                >
                  💡
                </span>
              </button>
            ))}
          </div>

          {/* Content card */}
          {activeSection && (
          <div
            className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer"
            style={{ animation: 'slideUp 0.8s ease-out forwards' }}
            onClick={() => setActiveSection(null)}
          >
            <div className="relative mx-auto max-w-[640px]">
              <div
                className="relative border border-white/10 rounded-2xl bg-[#111] p-8 sm:p-10 cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Back button */}
                <button
                  onClick={() => setActiveSection(null)}
                  className="absolute top-4 right-4 flex items-center gap-1.5 text-[11px] tracking-[0.1em] uppercase text-neutral-500 hover:text-emerald-400 transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-mono), monospace' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5" />
                    <path d="M12 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>

                <p
                  className="text-[10px] tracking-[0.2em] uppercase text-emerald-400 mb-2"
                  style={{ fontFamily: 'var(--font-mono), monospace' }}
                >
                  Observation
                </p>
                <h2 className="text-[22px] font-semibold text-white mb-6">
                  {SECTIONS.find(s => s.id === activeSection)?.labelShort || SECTIONS.find(s => s.id === activeSection)?.label}
                </h2>

                {activeSection === 'background' && (
                  <div className="space-y-4">
                    <p className="text-[15px] text-neutral-400 leading-[1.7]">
                      Before I ever heard the term &ldquo;user research,&rdquo; I was already doing it. As a <strong className="text-white">baseball analytics recorder</strong>, I tracked behavioral patterns of 20+ athletes, noting what made some improve while others stalled. In a <strong className="text-white">nursing home</strong>, I learned to communicate with residents who couldn&rsquo;t speak, reading their habits and emotional cues to understand what they needed.
                    </p>
                    <p className="text-[15px] text-neutral-400 leading-[1.7]">
                      These experiences taught me that understanding people isn&rsquo;t about asking them what they want. It&rsquo;s about <strong className="text-white">watching what they do</strong>. That curiosity led me to cognitive science at UCLA, where I study perception, decision-making, and human behavior, and apply it to <strong className="text-white">product design</strong>.
                    </p>
                  </div>
                )}

                {activeSection === 'philosophy' && (
                  <div className="space-y-4">
                    <p className="text-[15px] text-neutral-400 leading-[1.7]">
                      I believe the best products are the ones that <strong className="text-white">feel invisible</strong>. If a user has to think about how to use something, the design has already failed. My background in cognitive science shaped this: I prioritize <strong className="text-white">reducing cognitive load</strong> and designing for how people actually process information.
                    </p>
                    <p className="text-[15px] text-neutral-400 leading-[1.7]">
                      I care about the small moments. The micro-interaction that makes you smile. The feedback that tells you &ldquo;it&rsquo;s okay to slip&rdquo; instead of &ldquo;you failed.&rdquo; <strong className="text-white">Behavior first. Pixels second.</strong>
                    </p>
                  </div>
                )}

                {activeSection === 'love' && (
                  <div className="space-y-4">
                    <p className="text-[15px] text-neutral-400 leading-[1.7]">
                      I love <strong className="text-white">watching people</strong>. On the subway, on the bus, in a coffee shop. How someone reaches for their phone when they&rsquo;re bored. How a stranger&rsquo;s face shifts when they read a text. The micro-expressions people make when they&rsquo;re confused by a door handle. I&rsquo;ve always been this way. It&rsquo;s not something I learned in school. It&rsquo;s just how I see the world. That habit of <strong className="text-white">observing behavior, emotion, and expression</strong> in everyday life is what makes me want to design products that truly fit people.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        </div>
      </div>

      {/* Education + Skills + Contact */}
      <div className="border-t border-white/10 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-500 mb-2">Education</p>
            <p className="text-[14px] text-neutral-200">UCLA — B.S. Cognitive Science</p>
            <p className="text-[13px] text-neutral-500">Sep 2025 - Present</p>
            <p className="text-[14px] text-neutral-200 mt-2">Berkeley City College</p>
            <p className="text-[13px] text-neutral-500">2021 - 2023</p>

            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-500 mb-2 mt-6">Service</p>
            <p className="text-[14px] text-neutral-200">ROK Army — Squad Leader</p>
            <p className="text-[13px] text-neutral-500">Oct 2023 - Apr 2025</p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-500 mb-2">Skills</p>
            <p className="text-[14px] text-neutral-200">User Research, Usability Testing, Wireframing, Prototyping, Interaction Design, Information Architecture, Data Visualization</p>
            <p className="text-[13px] text-neutral-500 mt-2">Figma, Miro, FigJam, Adobe XD, Maze, HTML/CSS, Notion</p>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-500 mb-2 mt-6">Methods</p>
            <p className="text-[14px] text-neutral-200">Behavioral Observation, Cognitive Load Analysis, Competitive Audit, Journey Mapping, Persona Development</p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-500 mb-2">Contact</p>
            <a href="mailto:jinsoo991207@ucla.edu" className="text-[14px] text-emerald-400 underline underline-offset-2 block hover:text-emerald-300 transition-colors">
              jinsoo991207@ucla.edu
            </a>
            <a href="https://www.linkedin.com/in/jinsoo-kim-2715553b9" target="_blank" rel="noopener noreferrer" className="text-[14px] text-emerald-400 underline underline-offset-2 block mt-1 hover:text-emerald-300 transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
