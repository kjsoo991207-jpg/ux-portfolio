'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function AboutPage() {
  const portraitRef = useRef<HTMLDivElement>(null)
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (!portraitRef.current) return
      const rect = portraitRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height * 0.32

      const dx = e.clientX - centerX
      const dy = e.clientY - centerY
      const angle = Math.atan2(dy, dx)
      const dist = Math.sqrt(dx * dx + dy * dy)
      const move = Math.min(dist / 100, 1) * 3

      setPupilOffset({
        x: Math.cos(angle) * move,
        y: Math.sin(angle) * move,
      })
    }

    function handleMouseLeave() {
      setPupilOffset({ x: 0, y: 0 })
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      {/* Header */}
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16 mb-20">
        <div className="flex-1">
          <h1 className="text-4xl font-bold tracking-tight text-[#111] mb-4">
            Jinsoo Kim
          </h1>
          <p className="text-[15px] text-[#767676] leading-relaxed max-w-[500px]">
            UCLA Cognitive Science student with a B.S. in progress. I design products by observing how people actually behave, not how we assume they do.
          </p>
        </div>

        <div className="flex-shrink-0">
          <div ref={portraitRef} className="relative h-72 w-56 rounded-lg bg-white overflow-hidden sm:h-96 sm:w-72">
            <Image
              src="/images/jinsoo-noeyes.png"
              alt="Jinsoo Kim"
              fill
              className="object-cover"
              unoptimized
            />
            {/* Left eye pupil */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 16,
                height: 16,
                backgroundColor: '#222',
                top: '30%',
                left: '38%',
                transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`,
                transition: 'transform 0.08s ease-out',
              }}
            />
            {/* Right eye pupil */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 16,
                height: 16,
                backgroundColor: '#222',
                top: '30%',
                left: '56%',
                transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`,
                transition: 'transform 0.08s ease-out',
              }}
            />
          </div>
        </div>
      </div>

      {/* Background */}
      <div className="border-t border-neutral-200 py-12">
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

      {/* Design Philosophy */}
      <div className="border-t border-neutral-200 py-12">
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

      {/* Things I Love */}
      <div className="border-t border-neutral-200 py-12">
        <h2 className="text-[18px] font-semibold text-[#111] mb-6">Things I Love</h2>
        <div className="max-w-[560px]">
          <p className="text-[15px] text-[#555] leading-[1.7]">
            I love <strong className="text-[#111]">watching people</strong>. On the subway, on the bus, in a coffee shop. How someone reaches for their phone when they&rsquo;re bored. How a stranger&rsquo;s face shifts when they read a text. The micro-expressions people make when they&rsquo;re confused by a door handle. I&rsquo;ve always been this way. It&rsquo;s not something I learned in school. It&rsquo;s just how I see the world. That habit of <strong className="text-[#111]">observing behavior, emotion, and expression</strong> in everyday life is what makes me want to design products that truly fit people.
          </p>
        </div>
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
