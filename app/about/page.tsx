'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type SectionId = 'background' | 'philosophy' | 'love' | null

const SECTIONS = [
  {
    id: 'background' as const,
    label: 'Background',
    bubble: { left: '43%', top: '8%' },
    hotspot: { left: '36%', top: '10%', width: '22%', height: '80%' },
  },
  {
    id: 'philosophy' as const,
    label: 'Design\nPhilosophy',
    labelShort: 'Design Philosophy',
    bubble: { left: '63%', top: '6%' },
    hotspot: { left: '58%', top: '12%', width: '18%', height: '78%' },
  },
  {
    id: 'love' as const,
    label: 'Things\nI Love',
    labelShort: 'Things I Love',
    bubble: { left: '84%', top: '8%' },
    hotspot: { left: '76%', top: '10%', width: '20%', height: '80%' },
  },
]

function CloudBubble({ label, isActive, onClick, style }: {
  label: string
  isActive: boolean
  onClick: () => void
  style: React.CSSProperties
}) {
  const lines = label.split('\n')

  return (
    <button
      onClick={onClick}
      className="absolute group"
      style={{ ...style, zIndex: 20, transform: 'translateX(-50%)' }}
      aria-label={label.replace('\n', ' ')}
    >
      <div className="relative">
        {/* Cloud shape */}
        <svg
          viewBox="0 0 180 100"
          className="w-[120px] sm:w-[150px] h-auto transition-all duration-300"
          style={{ filter: isActive ? 'none' : undefined }}
        >
          {/* Cloud path */}
          <path
            d="M30,70 C10,70 5,55 15,45 C5,35 15,15 35,20 C40,5 65,0 80,10 C95,0 120,0 135,15 C155,10 175,25 165,45 C175,55 170,70 150,70 Z"
            fill={isActive ? '#111' : 'white'}
            stroke={isActive ? '#111' : '#999'}
            strokeWidth={isActive ? 0 : 1.5}
            className="transition-all duration-300 group-hover:stroke-[#111]"
          />
          {/* Label text */}
          <text
            x="90"
            y={lines.length > 1 ? '36' : '44'}
            textAnchor="middle"
            fill={isActive ? 'white' : '#555'}
            fontSize="13"
            fontFamily="var(--font-mono), monospace"
            letterSpacing="0.05em"
            className="transition-all duration-300 group-hover:fill-[#111] uppercase"
          >
            {lines.map((line, i) => (
              <tspan key={i} x="90" dy={i === 0 ? 0 : 16}>{line}</tspan>
            ))}
          </text>
        </svg>

        {/* Thought trail dots */}
        <div className="flex flex-col items-center gap-[5px] mt-[3px]">
          <div className={`w-[16px] h-[16px] rounded-full border-[1.5px] transition-all duration-300 ${isActive ? 'bg-[#111] border-[#111]' : 'bg-white border-[#999] group-hover:border-[#111]'}`} />
          <div className={`w-[10px] h-[10px] rounded-full border-[1.5px] transition-all duration-300 ${isActive ? 'bg-[#111] border-[#111]' : 'bg-white border-[#999] group-hover:border-[#111]'}`} />
        </div>
      </div>
    </button>
  )
}

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState<SectionId>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleClick = (id: SectionId) => {
    setActiveSection(prev => prev === id ? null : id)
  }

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
          Click a thought to observe
        </p>

        <div className="relative w-full">
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

          {/* Cloud thought bubbles above each person */}
          {SECTIONS.map((section) => (
            <CloudBubble
              key={section.id}
              label={section.label}
              isActive={activeSection === section.id}
              onClick={() => handleClick(section.id)}
              style={{
                left: section.bubble.left,
                top: section.bubble.top,
              }}
            />
          ))}
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
