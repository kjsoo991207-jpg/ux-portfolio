'use client'

import { useEffect, useRef, useState } from 'react'

const stickyFeatures = [
  {
    number: '02',
    title: 'Gentle Feedback',
    subtitle: 'Slip, not fail',
    mockup: '/images/aika/aika-daily.png',
    context: 'Every health app punished failure the same way: red marks, reset streaks. <strong>I rewrote every failure indicator as a recoverable slip, surfaced wins first, and stripped all punitive copy.</strong>',
    bullets: [
      { heading: 'Slip, Not Fail', desc: 'Every failure indicator rewritten as a <strong>recoverable slip</strong>, not a permanent mark.' },
      { heading: 'Wins First', desc: 'The daily view leads with <strong>accomplishments</strong> before surfacing anything that fell short.' },
      { heading: 'Recovery-Centered', desc: 'All punitive copy stripped, replaced with <strong>language that invites return</strong>.' },
    ],
  },
  {
    number: '04',
    title: 'Tailored Habits',
    subtitle: 'Your shelf, not everyone\'s',
    mockup: '/images/aika/aika-add-habit-mockup.jpeg',
    context: 'Showing everyone the same fifty habits meant ignoring the person. <strong>Participants froze. No signal about where to start.</strong> I redesigned the habit library as a personalized shelf with <strong>impact scores</strong>.',
    bullets: [
      { heading: '"For You" Shelf', desc: 'Habits ranked by <strong>age, mode, and behavior patterns</strong>. No more scrolling through fifty options.' },
      { heading: 'Impact Scores', desc: 'Each habit shows its <strong>+0.X effect on Aika Age</strong>, turning abstract choices into clear priorities.' },
      { heading: 'Reduced Choice', desc: 'Only <strong>relevant habits surface first</strong>. The rest are available, not pushed.' },
    ],
  },
  {
    number: '05',
    title: 'From Tracking to Autopilot',
    subtitle: 'A finish line, not a treadmill',
    mockup: '/images/aika/aika-reinforcement-mockup.jpeg',
    context: 'Health apps weren\'t designed with an ending. Every habit stayed active forever. <strong>Automaticity averages 66 days. I designed habits to graduate off the dashboard once they become automatic behavior.</strong>',
    bullets: [
      { heading: '66-Day Reinforcement', desc: 'Habits follow a <strong>research-backed automaticity timeline</strong> with a defined finish line.' },
      { heading: 'Graduation System', desc: 'Habits move to background once they become <strong>automatic behavior</strong>. No more endless tracking.' },
      { heading: 'Shrinking Dashboard', desc: 'Your active queue gets <strong>shorter over time</strong>, not longer.' },
    ],
  },
  {
    number: '06',
    title: 'Logging',
    subtitle: 'Snap / Talk / Type',
    mockup: '/images/aika/hero-logging.jpeg',
    context: 'The most common reason people stopped logging wasn\'t bad features. <strong>The input itself was too much effort. Five manual entries a day isn\'t a habit. It\'s a job.</strong>',
    bullets: [
      { heading: 'Snap', desc: 'Take a photo or <strong>scan a barcode</strong> to log supplements instantly.' },
      { heading: 'Talk', desc: '<strong>Voice input</strong> for hands-free logging on the go.' },
      { heading: 'Type', desc: 'Quick text entry when that\'s the <strong>fastest route</strong>.' },
    ],
  },
  {
    number: '07',
    title: 'Coach',
    subtitle: 'Context-aware, not generic',
    mockup: '/images/aika/aika-coach-mockup.jpeg',
    context: 'Existing AI health assistants gave technically accurate answers. But they had no idea what the user had done that morning. <strong>Trust isn\'t determined by accuracy. It\'s determined by perceived fit between response and personal context.</strong>',
    bullets: [
      { heading: 'Context-First Responses', desc: 'Coach ingests <strong>today\'s logged data</strong> before generating any guidance.' },
      { heading: 'No Data, No Guess', desc: 'If the data isn\'t there, the Coach <strong>stays silent</strong>. Generic advice actively erodes trust.' },
      { heading: 'Trust Through Relevance', desc: '<strong>Perceived fit</strong> between response and context determines whether advice is followed.' },
    ],
  },
  {
    number: '08',
    title: 'Growth Stages',
    subtitle: 'Identity over numbers',
    mockup: '/images/aika/aika-streak-mockup.jpeg',
    context: 'Changing the language helped. But the number was still there. <strong>A streak counter says nothing about who you\'re becoming. When it hits zero, a setback registers twice as intensely as an equivalent gain.</strong>',
    bullets: [
      { heading: 'Growth Stages', desc: 'Named stages like <strong>Baby Seed and Sprout Scout</strong> that reflect identity, not a count.' },
      { heading: 'Survives Missed Days', desc: 'Stages advance on <strong>consistency, not perfection</strong>. A single skip doesn\'t reset anything.' },
      { heading: 'Identity Over Number', desc: 'You\'re <strong>something growing</strong>, not a number that can shatter.' },
    ],
  },
  {
    number: '09',
    title: 'Community',
    subtitle: 'Built-in accountability',
    mockup: '/images/aika/aika-community-mockup.jpeg',
    context: 'Every design decision had assumed people would build habits alone. <strong>But structured accountability consistently outperforms self-monitoring. It\'s one of the strongest predictors of long-term adherence.</strong>',
    bullets: [
      { heading: 'Habit Clubs', desc: 'Join others working on the <strong>same habit</strong>. Shared progress, shared accountability.' },
      { heading: 'Weekly Challenges', desc: '<strong>Time-bound goals</strong> that create natural rhythms of participation.' },
      { heading: 'Trust Signals', desc: 'Verification badges so accountability comes from <strong>people you can trust</strong>.' },
    ],
  },
]

export function StickyPhoneSolution() {
  const [activeIdx, setActiveIdx] = useState(0)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(entry.target as HTMLDivElement)
            if (idx !== -1) setActiveIdx(idx)
          }
        })
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    )

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative">
      {/* Desktop: sticky phone layout */}
      <div className="hidden md:grid grid-cols-[340px_1fr] gap-16">
        {/* Sticky phone */}
        <div className="relative">
          <div className="sticky top-32" style={{ height: 'fit-content' }}>
            <div className="relative" style={{ width: 300 }}>
              <div
                className="absolute overflow-hidden transition-opacity duration-500"
                style={{ top: '1.5%', left: '4%', right: '4%', bottom: '1.5%', borderRadius: '28px', zIndex: 1 }}
              >
                {stickyFeatures.map((f, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={f.number}
                    src={f.mockup}
                    alt={f.title}
                    className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ${i === activeIdx ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))}
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/iphone-17-frame.png"
                alt=""
                className="w-full h-auto block select-none relative z-[2]"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* Scrollable feature descriptions */}
        <div className="space-y-40">
          {stickyFeatures.map((f, i) => (
            <div
              key={f.number}
              ref={(el) => { sectionRefs.current[i] = el }}
              className="min-h-[60vh] flex flex-col justify-center"
            >
              <span className="text-[15px] block mb-2 text-emerald-400">{f.number}.</span>
              <h3 className="text-[36px] font-bold text-white leading-[1.1]">{f.title}</h3>
              <p className="text-[15px] text-[#888] mt-2">{f.subtitle}</p>
              <p
                className="mt-8 text-[15px] leading-[1.7] text-neutral-400 max-w-[500px]"
                dangerouslySetInnerHTML={{ __html: f.context }}
              />
              <div className="space-y-5 mt-8">
                {f.bullets.map((b, j) => (
                  <div key={j}>
                    <p className="text-[14px] font-semibold text-white">{b.heading}</p>
                    <p
                      className="text-[13px] text-neutral-400 leading-[1.7] mt-1"
                      dangerouslySetInnerHTML={{ __html: b.desc }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: stacked layout */}
      <div className="md:hidden space-y-24">
        {stickyFeatures.map((f) => (
          <div key={f.number}>
            <span className="text-[15px] block mb-2 text-emerald-400">{f.number}.</span>
            <h3 className="text-[28px] font-bold text-white leading-[1.1]">{f.title}</h3>
            <p className="text-[15px] text-[#888] mt-2">{f.subtitle}</p>
            <p
              className="mt-6 text-[15px] leading-[1.7] text-neutral-400"
              dangerouslySetInnerHTML={{ __html: f.context }}
            />
            <div className="flex justify-center my-8">
              <div className="relative" style={{ width: 260 }}>
                <div className="absolute overflow-hidden" style={{ top: '1.5%', left: '4%', right: '4%', bottom: '1.5%', borderRadius: '28px', zIndex: 1 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.mockup} alt={f.title} className="w-full h-full object-cover object-top" />
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/iphone-17-frame.png" alt="" className="w-full h-auto block select-none relative z-[2]" draggable={false} />
              </div>
            </div>
            <div className="space-y-5">
              {f.bullets.map((b, j) => (
                <div key={j}>
                  <p className="text-[14px] font-semibold text-white">{b.heading}</p>
                  <p
                    className="text-[13px] text-neutral-400 leading-[1.7] mt-1"
                    dangerouslySetInnerHTML={{ __html: b.desc }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
