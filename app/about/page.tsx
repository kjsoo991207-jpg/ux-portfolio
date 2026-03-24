'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, useCallback } from 'react'

type SectionId = 'background' | 'philosophy' | 'love' | null

const PEOPLE = [
  {
    id: 'background' as const,
    label: 'Background',
    description: 'The path that led me here',
  },
  {
    id: 'philosophy' as const,
    label: 'Design Philosophy',
    description: 'How I think about design',
  },
  {
    id: 'love' as const,
    label: 'Things I Love',
    description: 'What drives my curiosity',
  },
]

function PersonSilhouette({ index, isActive, onClick }: { index: number; isActive: boolean; onClick: () => void }) {
  // Three different silhouette poses
  const silhouettes = [
    // Person 1: standing straight, slight head tilt
    <svg key="p1" viewBox="0 0 80 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="40" cy="28" r="14" fill={isActive ? '#111' : '#ccc'} className="transition-colors duration-500" />
      <path d="M24 56 C24 44 56 44 56 56 L56 100 C56 104 52 108 48 108 L32 108 C28 108 24 104 24 100 Z" fill={isActive ? '#111' : '#ccc'} className="transition-colors duration-500" />
      <rect x="28" y="108" width="8" height="36" rx="4" fill={isActive ? '#111' : '#ccc'} className="transition-colors duration-500" />
      <rect x="44" y="108" width="8" height="36" rx="4" fill={isActive ? '#111' : '#ccc'} className="transition-colors duration-500" />
      <rect x="14" y="58" width="8" height="30" rx="4" fill={isActive ? '#111' : '#ccc'} className="transition-colors duration-500" transform="rotate(-8 18 58)" />
      <rect x="58" y="58" width="8" height="30" rx="4" fill={isActive ? '#111' : '#ccc'} className="transition-colors duration-500" transform="rotate(8 62 58)" />
    </svg>,
    // Person 2: walking pose
    <svg key="p2" viewBox="0 0 80 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="42" cy="28" r="14" fill={isActive ? '#111' : '#ccc'} className="transition-colors duration-500" />
      <path d="M26 56 C26 44 58 44 58 56 L56 100 C56 104 52 108 48 108 L32 108 C28 108 26 104 26 100 Z" fill={isActive ? '#111' : '#ccc'} className="transition-colors duration-500" />
      <rect x="26" y="108" width="8" height="36" rx="4" fill={isActive ? '#111' : '#ccc'} className="transition-colors duration-500" transform="rotate(10 30 108)" />
      <rect x="46" y="108" width="8" height="36" rx="4" fill={isActive ? '#111' : '#ccc'} className="transition-colors duration-500" transform="rotate(-10 50 108)" />
      <rect x="16" y="56" width="8" height="32" rx="4" fill={isActive ? '#111' : '#ccc'} className="transition-colors duration-500" transform="rotate(-15 20 56)" />
      <rect x="56" y="60" width="8" height="28" rx="4" fill={isActive ? '#111' : '#ccc'} className="transition-colors duration-500" transform="rotate(12 60 60)" />
    </svg>,
    // Person 3: relaxed, one hand on hip
    <svg key="p3" viewBox="0 0 80 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="38" cy="28" r="14" fill={isActive ? '#111' : '#ccc'} className="transition-colors duration-500" />
      <path d="M22 56 C22 44 54 44 54 56 L54 100 C54 104 50 108 46 108 L30 108 C26 108 22 104 22 100 Z" fill={isActive ? '#111' : '#ccc'} className="transition-colors duration-500" />
      <rect x="26" y="108" width="8" height="36" rx="4" fill={isActive ? '#111' : '#ccc'} className="transition-colors duration-500" />
      <rect x="42" y="108" width="8" height="36" rx="4" fill={isActive ? '#111' : '#ccc'} className="transition-colors duration-500" transform="rotate(5 46 108)" />
      <rect x="12" y="56" width="8" height="30" rx="4" fill={isActive ? '#111' : '#ccc'} className="transition-colors duration-500" transform="rotate(-12 16 56)" />
      <path d="M54 60 Q68 72 58 90" stroke={isActive ? '#111' : '#ccc'} strokeWidth="8" strokeLinecap="round" fill="none" className="transition-colors duration-500" />
    </svg>,
  ]

  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center gap-3 cursor-pointer transition-transform duration-300 hover:scale-105"
    >
      <div className="relative">
        <div className="w-20 h-36 sm:w-24 sm:h-40">
          {silhouettes[index]}
        </div>
        {/* Magnifying glass hint on hover */}
        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M16 16 L21 21" />
            </svg>
          </div>
        )}
      </div>
      <span
        className="text-[11px] tracking-[0.12em] uppercase transition-colors duration-300"
        style={{ fontFamily: 'var(--font-mono), monospace', color: isActive ? '#111' : '#999' }}
      >
        {PEOPLE[index].label}
      </span>
    </button>
  )
}

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState<SectionId>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleClick = (id: SectionId) => {
    setActiveSection(prev => prev === id ? null : id)
  }

  // Scroll to content when opened
  useEffect(() => {
    if (activeSection && contentRef.current) {
      setTimeout(() => {
        contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 100)
    }
  }, [activeSection])

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      {/* Header */}
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16 mb-20">
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

      {/* Three People - Observation Targets */}
      <div className="border-t border-neutral-200 pt-16 pb-8">
        <p
          className="text-center text-[11px] tracking-[0.2em] uppercase text-[#999] mb-12"
          style={{ fontFamily: 'var(--font-mono), monospace' }}
        >
          Click to observe
        </p>

        <div className="flex justify-center items-end gap-12 sm:gap-20">
          {PEOPLE.map((person, i) => (
            <PersonSilhouette
              key={person.id}
              index={i}
              isActive={activeSection === person.id}
              onClick={() => handleClick(person.id)}
            />
          ))}
        </div>
      </div>

      {/* Expanded Content - Magnifying Glass Reveal */}
      <div ref={contentRef}>
        {activeSection && (
          <div
            className="mt-8 mb-8"
            style={{ animation: 'lensReveal 0.5s ease-out forwards' }}
          >
            {/* Lens frame */}
            <div className="relative mx-auto max-w-[640px]">
              {/* Circle top decoration */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-2 border-[#111] flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round">
                      <circle cx="11" cy="11" r="7" />
                      <path d="M16 16 L21 21" />
                    </svg>
                  </div>
                  {/* Connecting line */}
                  <div className="absolute top-full left-1/2 w-[1px] h-6 bg-[#ddd] -translate-x-1/2" />
                </div>
              </div>

              {/* Content card */}
              <div className="border border-neutral-200 rounded-2xl bg-[#fafafa] p-8 sm:p-10">
                <h2 className="text-[20px] font-semibold text-[#111] mb-2">
                  {PEOPLE.find(p => p.id === activeSection)?.label}
                </h2>
                <p className="text-[12px] text-[#999] mb-6" style={{ fontFamily: 'var(--font-mono), monospace' }}>
                  {PEOPLE.find(p => p.id === activeSection)?.description}
                </p>

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
