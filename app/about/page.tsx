'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, useCallback } from 'react'

interface Observation {
  id: string
  text: string
  triggered: boolean
}

export default function AboutPage() {
  const [observations, setObservations] = useState<Observation[]>([
    { id: 'time', text: '', triggered: false },
    { id: 'photo', text: 'You looked at the photo first. Most people do.', triggered: false },
    { id: 'background', text: "You want the backstory. That tells me you think before you judge.", triggered: false },
    { id: 'philosophy', text: "This is where I lose the skimmers. You're still here.", triggered: false },
    { id: 'love', text: "You made it to the personal stuff. Not everyone does.", triggered: false },
    { id: 'bottom', text: "You read everything. That says more about you than about me.", triggered: false },
  ])

  const photoRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const philosophyRef = useRef<HTMLDivElement>(null)
  const loveRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const trigger = useCallback((id: string, text?: string) => {
    setObservations(prev => {
      const obs = prev.find(o => o.id === id)
      if (!obs || obs.triggered) return prev
      return prev.map(o =>
        o.id === id ? { ...o, triggered: true, ...(text ? { text } : {}) } : o
      )
    })
  }, [])

  // Time-based observation
  useEffect(() => {
    const timer = setTimeout(() => {
      trigger('time', "You've been here 5 seconds. Most recruiters skim. I notice the ones who don't.")
    }, 5000)
    return () => clearTimeout(timer)
  }, [trigger])

  // Photo hover
  useEffect(() => {
    const el = photoRef.current
    if (!el) return
    const handler = () => trigger('photo')
    el.addEventListener('mouseenter', handler)
    el.addEventListener('touchstart', handler, { passive: true })
    return () => {
      el.removeEventListener('mouseenter', handler)
      el.removeEventListener('touchstart', handler)
    }
  }, [trigger])

  // Scroll-based observations
  useEffect(() => {
    const refs = [
      { ref: backgroundRef, id: 'background' },
      { ref: philosophyRef, id: 'philosophy' },
      { ref: loveRef, id: 'love' },
      { ref: bottomRef, id: 'bottom' },
    ]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const match = refs.find(r => r.ref.current === entry.target)
            if (match) trigger(match.id)
          }
        })
      },
      { threshold: 0.4 }
    )

    refs.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current)
    })

    return () => observer.disconnect()
  }, [trigger])

  const getObs = (id: string) => observations.find(o => o.id === id)

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      {/* Header */}
      <div className="relative flex flex-col gap-12 lg:flex-row lg:gap-16 mb-20">
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

          {/* Time observation */}
          <ObservationNote obs={getObs('time')} className="mt-8" />
        </div>

        <div className="flex-shrink-0 relative" ref={photoRef}>
          <div className="relative h-72 w-56 rounded-lg bg-neutral-100 overflow-hidden sm:h-96 sm:w-72">
            <Image
              src="/images/jinsoo-profile.png"
              alt="Jinsoo Kim"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          {/* Photo observation */}
          <ObservationNote obs={getObs('photo')} className="mt-3" />
        </div>
      </div>

      {/* Background */}
      <div className="relative border-t border-neutral-200 py-12" ref={backgroundRef}>
        <div className="flex flex-col lg:flex-row lg:gap-16">
          <div className="flex-1">
            <h2 className="text-[18px] font-semibold text-[#111] mb-6">Background</h2>
            <div className="max-w-[560px] space-y-4">
              <p className="text-[15px] text-[#555] leading-[1.7]">
                Before I ever heard the term &ldquo;user research,&rdquo; I was already doing it. As a <strong className="text-[#111]">baseball analytics recorder</strong>, I tracked behavioral patterns of 20+ athletes, noting what made some improve while others stalled. In a <strong className="text-[#111]">nursing home</strong>, I learned to communicate with residents who couldn&rsquo;t speak, reading their habits and emotional cues to understand what they needed.
              </p>
              <p className="text-[15px] text-[#555] leading-[1.7]">
                These experiences taught me that understanding people isn&rsquo;t about asking them what they want. It&rsquo;s about <strong className="text-[#111]">watching what they do</strong>. That curiosity led me to cognitive science at UCLA, where I study perception, decision-making, and human behavior, and apply it to <strong className="text-[#111]">product design</strong>.
              </p>
            </div>
          </div>
          <div className="lg:w-[220px] flex-shrink-0 mt-4 lg:mt-0 lg:pt-10">
            <ObservationNote obs={getObs('background')} />
          </div>
        </div>
      </div>

      {/* Design Philosophy */}
      <div className="relative border-t border-neutral-200 py-12" ref={philosophyRef}>
        <div className="flex flex-col lg:flex-row lg:gap-16">
          <div className="flex-1">
            <h2 className="text-[18px] font-semibold text-[#111] mb-6">Design Philosophy</h2>
            <div className="max-w-[560px] space-y-4">
              <p className="text-[15px] text-[#555] leading-[1.7]">
                I believe the best products are the ones that <strong className="text-[#111]">feel invisible</strong>. If a user has to think about how to use something, the design has already failed. My background in cognitive science shaped this: I prioritize <strong className="text-[#111]">reducing cognitive load</strong> and designing for how people actually process information.
              </p>
              <p className="text-[15px] text-[#555] leading-[1.7]">
                I care about the small moments. The micro-interaction that makes you smile. The feedback that tells you &ldquo;it&rsquo;s okay to slip&rdquo; instead of &ldquo;you failed.&rdquo; <strong className="text-[#111]">Behavior first. Pixels second.</strong>
              </p>
            </div>
          </div>
          <div className="lg:w-[220px] flex-shrink-0 mt-4 lg:mt-0 lg:pt-10">
            <ObservationNote obs={getObs('philosophy')} />
          </div>
        </div>
      </div>

      {/* Things I Love */}
      <div className="relative border-t border-neutral-200 py-12" ref={loveRef}>
        <div className="flex flex-col lg:flex-row lg:gap-16">
          <div className="flex-1">
            <h2 className="text-[18px] font-semibold text-[#111] mb-6">Things I Love</h2>
            <div className="max-w-[560px]">
              <p className="text-[15px] text-[#555] leading-[1.7]">
                I love <strong className="text-[#111]">watching people</strong>. On the subway, on the bus, in a coffee shop. How someone reaches for their phone when they&rsquo;re bored. How a stranger&rsquo;s face shifts when they read a text. The micro-expressions people make when they&rsquo;re confused by a door handle. I&rsquo;ve always been this way. It&rsquo;s not something I learned in school. It&rsquo;s just how I see the world. That habit of <strong className="text-[#111]">observing behavior, emotion, and expression</strong> in everyday life is what makes me want to design products that truly fit people.
              </p>
            </div>
          </div>
          <div className="lg:w-[220px] flex-shrink-0 mt-4 lg:mt-0 lg:pt-10">
            <ObservationNote obs={getObs('love')} />
          </div>
        </div>
      </div>

      {/* Education + Skills + Contact */}
      <div className="border-t border-neutral-200 py-12" ref={bottomRef}>
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

        {/* Bottom observation */}
        <ObservationNote obs={getObs('bottom')} className="mt-8" />
      </div>
    </div>
  )
}

function ObservationNote({ obs, className = '' }: { obs?: Observation; className?: string }) {
  if (!obs || !obs.triggered) return null

  return (
    <div
      className={className}
      style={{ animation: 'fadeSlideIn 0.6s ease-out forwards' }}
    >
      <div className="border border-neutral-200 rounded-lg bg-[#fafafa] px-4 py-3 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-[#111] animate-pulse" />
          <span
            className="text-[10px] uppercase tracking-[0.15em] text-[#999]"
            style={{ fontFamily: 'var(--font-mono), monospace' }}
          >
            Observing...
          </span>
        </div>
        <TypingText text={obs.text} />
      </div>
    </div>
  )
}

function TypingText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, 25)
    return () => clearInterval(interval)
  }, [text])

  return (
    <p
      className="text-[13px] text-[#555] leading-[1.6]"
      style={{ fontFamily: 'var(--font-mono), monospace' }}
    >
      {displayed}
      {!done && <span className="inline-block w-[2px] h-[14px] bg-[#111] ml-[1px] animate-pulse align-text-bottom" />}
    </p>
  )
}
