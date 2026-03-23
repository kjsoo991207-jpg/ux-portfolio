import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { getProjectBySlug, projects } from '@/content/projects'
import { SolutionContent } from './SolutionContent'
// VennDiagram replaced with convergence cards
import { JourneyMapDiagram } from './JourneyMap'
import { ResearchViz } from './ResearchViz'

const ReferencePanel = dynamic(() => import('./ReferencePanel'), { ssr: false })

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

// ─── Source badge (secondary research) ────────────────────────────────────────
function parseBadge(label: string): string {
  const match = label.match(/\(([^)]+)\)\s*$/)
  return match ? match[1] : label
}

function SourceBadge({ label, url }: { label: string; url: string }) {
  const badge = parseBadge(label)
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600 hover:border-neutral-400 hover:text-[#0a0a0a] transition-colors"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 flex-shrink-0" />
      {badge}
    </a>
  )
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const cs = project.caseStudy

  if (cs) {
    return (
      <div className="mx-auto max-w-7xl border-l border-r border-neutral-200">
      <article className="mx-auto max-w-5xl px-6 py-20 sm:py-28 text-[#0a0a0a]">

        {/* ── Hero: Product Showcase ── */}
        <section className="mb-24 py-20">
          <div className="flex items-end justify-center gap-4 sm:gap-10">
            {/* Left phone - Daily */}
            <div className="relative" style={{ width: 'clamp(140px, 25vw, 260px)' }}>
              <div className="absolute overflow-hidden" style={{ top: '1.5%', left: '4%', right: '4%', bottom: '1.5%', borderRadius: '28px', zIndex: 1 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/aika/aika-daily.png" alt="Aika daily insights and wins" className="w-full h-full object-cover object-top" />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/iphone-17-frame.png" alt="" className="w-full h-auto block select-none relative z-[2]" draggable={false} />
            </div>

            {/* Center phone - Video prototype */}
            <div className="relative" style={{ width: 'clamp(140px, 25vw, 260px)' }}>
              <div className="absolute overflow-hidden" style={{ top: '1.5%', left: '4%', right: '4%', bottom: '1.5%', borderRadius: '28px', zIndex: 1 }}>
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
              <img src="/images/iphone-17-frame.png" alt="" className="w-full h-auto block select-none relative z-[2]" draggable={false} />
            </div>

            {/* Right phone - Add Habit */}
            <div className="relative" style={{ width: 'clamp(140px, 25vw, 260px)' }}>
              <div className="absolute overflow-hidden" style={{ top: '1.5%', left: '4%', right: '4%', bottom: '1.5%', borderRadius: '28px', zIndex: 1 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/aika/aika-add-habit.png" alt="Aika add habit with Nourish and Move categories" className="w-full h-full object-cover object-top" />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/iphone-17-frame.png" alt="" className="w-full h-auto block select-none relative z-[2]" draggable={false} />
            </div>
          </div>
        </section>

        <header className="mb-24">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0a0a0a] leading-[1.05]">
            {project.name}
          </h1>
          {cs.subtitle && (
            <p className="mt-6 text-xl sm:text-2xl md:text-3xl font-light text-neutral-600 max-w-[700px] leading-snug">
              {cs.subtitle}
            </p>
          )}
          <dl className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-4 text-sm">
            <div>
              <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#767676]">Timeline</dt>
              <dd className="mt-1 font-medium">{cs.duration}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#767676]">Team</dt>
              <dd className="mt-1">{project.team}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#767676]">Tools</dt>
              <dd className="mt-1">{project.tools}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#767676]">Role</dt>
              <dd className="mt-1">{cs.role}</dd>
            </div>
          </dl>
        </header>

        {/* ── 1. Origin Story ── */}
        {cs.originStory && cs.originStory.length > 0 && (
          <section className="mb-52 pt-28 border-t border-[#e8e8e4] max-w-[800px] mx-auto">
            <p className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#3478F6] mb-4">
              Why I Built This
            </p>
            <h2 className="text-[28px] sm:text-[34px] font-bold text-[#111] leading-[1.15] mb-12">
              A Question That Wouldn&rsquo;t Go Away
            </h2>
            <div className="space-y-6 max-w-[700px]">
              {cs.originStory.map((para, i) => (
                <p key={i} className="text-[15px] text-[#767676] leading-[1.7]">
                  {para}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* ── 2. What I Found (Primary Research) ── */}
        {cs.primaryResearch && (
          <section className="mb-52 pt-28 max-w-[800px] mx-auto border-t border-[#e8e8e4]">
            <p className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#3478F6] mb-4">
              {cs.primaryResearch.label ?? 'Discovery'}
            </p>
            <h2 className="text-[28px] sm:text-[34px] font-bold text-[#111] leading-[1.15] mb-12">
              Why People Give Up on Health Tools
            </h2>
            {/* Concept Survey */}
            <div className="mb-16">
              <span className="inline-flex items-center gap-2 text-[13px] font-bold text-[#111] mb-6"><span className="w-[3px] h-[16px] bg-[#3478F6] rounded-full inline-block"></span>Concept Survey</span>
              <p className="text-[15px] text-[#767676] max-w-[700px] mb-8 leading-[1.7]">
                Before I could understand why people give up, I needed to know what they were giving up on. I ran a short concept survey with five people to find out: do they even think about their long-term health? And do words like longevity and healthspan mean anything to them?
              </p>
              <div className="space-y-2 max-w-[700px]">
                <div className="flex gap-3">
                  <span className="text-[15px] font-medium text-[#767676] w-7 flex-shrink-0">Q1</span>
                  <p className="text-[15px] text-[#767676] leading-[1.7]">In one sentence, what does <span className="font-bold text-[#111]">longevity</span> mean to you?</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-[15px] font-medium text-[#767676] w-7 flex-shrink-0">Q2</span>
                  <p className="text-[15px] text-[#767676] leading-[1.7]">Do you know the difference between <span className="font-bold text-[#111]">lifespan</span> and <span className="font-bold text-[#111]">healthspan</span>?</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-[15px] font-medium text-[#767676] w-7 flex-shrink-0">Q3</span>
                  <p className="text-[15px] text-[#767676] leading-[1.7]">On a scale of 1-5, how much do you think about your <span className="font-bold text-[#111]">long-term health</span> on a daily basis?</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-[15px] font-medium text-[#767676] w-7 flex-shrink-0">Q4</span>
                  <p className="text-[15px] text-[#767676] leading-[1.7]">Do you currently do anything to actively <span className="font-bold text-[#111]">improve your long-term health</span>? If so, what?</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-[15px] font-medium text-[#767676] w-7 flex-shrink-0">Q5</span>
                  <p className="text-[15px] text-[#767676] leading-[1.7]">What is the biggest <span className="font-bold text-[#111]">barrier</span> that prevents you from being more consistent with healthy habits?</p>
                </div>
              </div>

              {/* Stat blocks */}
              <div className="grid grid-cols-3 gap-3 mt-10 mb-12">
                <div className="border border-[#e8e8e4] bg-white rounded-lg p-6">
                  <p className="font-bold text-[36px] tracking-tight text-[#3478F6] leading-none mb-2">4<span className="text-[20px] text-neutral-300 font-light"> / 5</span></p>
                  <p className="text-[13px] text-[#767676] leading-[1.5]">have heard of <span className="font-bold text-[#111]">longevity</span></p>
                </div>
                <div className="border border-[#e8e8e4] bg-white rounded-lg p-6">
                  <p className="font-bold text-[36px] tracking-tight text-[#3478F6] leading-none mb-2">4<span className="text-[20px] text-neutral-300 font-light"> / 5</span></p>
                  <p className="text-[13px] text-[#767676] leading-[1.5]">can explain <span className="font-bold text-[#111]">lifespan vs healthspan</span></p>
                </div>
                <div className="border border-[#e8e8e4] bg-white rounded-lg p-6">
                  <p className="font-bold text-[36px] tracking-tight text-[#3478F6] leading-none mb-2">5<span className="text-[20px] text-neutral-300 font-light"> / 5</span></p>
                  <p className="text-[13px] text-[#767676] leading-[1.5]">actively doing something for <span className="font-bold text-[#111]">their health</span></p>
                </div>
              </div>

              {/* Participant responses - screenshot grid */}
              <div className="mb-12">
                <span className="inline-flex items-center gap-2 text-[13px] font-bold text-[#111] mb-6"><span className="w-[3px] h-[16px] bg-[#3478F6] rounded-full inline-block"></span>Participant Responses</span>
                <div className="flex gap-8 justify-center">
                  {[
                    { src: '/images/aika/survey-3.png', alt: 'Participant survey response via Instagram DM', crop: '6%' },
                    { src: '/images/aika/survey-2.png', alt: 'Participant survey response via Instagram DM', crop: '6%' },
                    { src: '/images/aika/survey-4.png', alt: 'Participant survey response via Instagram DM', crop: '6%' },
                  ].map((item, i) => (
                    <div key={i} className="relative" style={{ width: 260 }}>
                      {/* Screenshot positioned inside frame area */}
                      <div
                        className="absolute overflow-hidden"
                        style={{
                          top: '1.5%',
                          left: '4%',
                          right: '4%',
                          bottom: '1.5%',
                          borderRadius: '24px',
                          zIndex: 1,
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="w-full h-full object-cover"
                          style={{ objectPosition: `center ${item.crop}` }}
                        />
                      </div>
                      {/* Frame on top */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/iphone-17-frame.png"
                        alt=""
                        className="w-full h-auto block select-none relative z-[2]"
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>
                <p className="text-[13px] text-[#999] mt-4">Survey conducted via Instagram DM with 5 participants</p>
              </div>

            </div>

            {/* Survey → Interview transition + participant selection */}
            <p className="text-[15px] text-[#767676] max-w-[700px] mt-16 mb-12 leading-[1.7]">
              The survey gave me labels: <span className="font-bold text-[#111]">alcohol, stress, work</span>. I knew what pulled people off track. But I didn&rsquo;t know what that moment actually looked like. When does someone go from <span className="font-bold text-[#111]">&ldquo;I&rsquo;m doing great&rdquo;</span> to <span className="font-bold text-[#111]">&ldquo;I give up&rdquo;</span>? And why do some people recover while others don&rsquo;t?
            </p>
            <span className="inline-flex items-center gap-2 text-[13px] font-bold text-[#111] mb-6"><span className="w-[3px] h-[16px] bg-[#3478F6] rounded-full inline-block"></span>In-Depth Interviews</span>
            <p className="text-[15px] text-[#767676] max-w-[700px] mb-12 leading-[1.7]">
              To find out, I recruited three more participants for longer interviews, deliberately choosing people whose lives looked nothing alike: a college student still figuring out fitness, a professional bodybuilder who lives and breathes health, and a homemaker in her 50s who tracks nothing digitally but shows up to her wellness community every week.
            </p>

            {/* Participant table - desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-base border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#767676] text-left pb-4 pr-6 w-10">#</th>
                    <th className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#767676] text-left pb-4 pr-8 min-w-[140px]">Participant</th>
                    <th className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#767676] text-left pb-4 pr-8">Key observation</th>
                    <th className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#767676] text-left pb-4 min-w-[180px]">Pain point</th>
                  </tr>
                </thead>
                <tbody>
                  {cs.primaryResearch.participants.map((participant, i) => (
                    <tr key={i} className="border-b border-neutral-100 align-top">
                      <td className="py-5 pr-6 text-neutral-400 tabular-nums text-xs">
                        {String(i + 1).padStart(2, '0')}
                      </td>
                      <td className="py-5 pr-8 font-medium text-[#0a0a0a] leading-[1.5] text-[15px]">
                        {participant.persona}
                      </td>
                      <td className="py-5 pr-8 text-neutral-600 leading-[1.5]">
                        {participant.keyObservation}
                      </td>
                      <td className="py-5">
                        <span className="block pl-3 border-l-2 border-neutral-300 text-[15px] text-neutral-600 leading-[1.5]">
                          {participant.painPoint}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Participant cards - mobile */}
            <div className="md:hidden space-y-4">
              {cs.primaryResearch.participants.map((participant, i) => (
                <div key={i} className="border border-[#e8e8e4] rounded-lg p-4">
                  <p className="text-[11px] text-[#999] mb-1">{String(i + 1).padStart(2, '0')}</p>
                  <p className="text-[15px] font-bold text-[#111] mb-2">{participant.persona}</p>
                  <p className="text-[13px] text-[#767676] leading-[1.5] mb-2">{participant.keyObservation}</p>
                  <span className="block pl-3 border-l-2 border-neutral-300 text-[13px] text-neutral-600 leading-[1.5]">
                    {participant.painPoint}
                  </span>
                </div>
              ))}
            </div>

            {/* Emotional journey map */}
            {cs.primaryResearch.journeyMap && (
              <div className="mt-20">
                <span className="inline-flex items-center gap-2 text-[13px] font-bold text-[#111] mb-6"><span className="w-[3px] h-[16px] bg-[#3478F6] rounded-full inline-block"></span>
                  Emotional Journey
                </span>
                <p className="text-[15px] text-[#767676] max-w-[700px] mb-10 leading-[1.7]">
                  Each interview told a different story, but one pattern kept showing up: there was always a <span className="font-bold text-[#111]">specific moment</span> where everything started to fall apart. I wanted to know if that moment happened at the same point for all three.
                </p>
                <JourneyMapDiagram journeyMap={cs.primaryResearch.journeyMap} />
              </div>
            )}

            {/* Emerging themes — convergence cards */}
            {cs.primaryResearch.venn && (
              <div className="mt-16">
                <span className="inline-flex items-center gap-2 text-[13px] font-bold text-[#111] mb-10"><span className="w-[3px] h-[16px] bg-[#3478F6] rounded-full inline-block"></span>
                  Emerging themes
                </span>
                <p className="text-[15px] text-[#767676] max-w-[700px] mb-10 leading-[1.7]">
                  The journey map showed when people quit. I needed to understand why. When I laid the three interviews side by side, their pain points started overlapping.
                </p>

                {/* 3 problem cards */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="border-t-[3px] border-[#3478F6] bg-[#F8FAFF] rounded-lg p-5">
                    <p className="text-[13px] font-bold text-[#3478F6] uppercase tracking-wide mb-2">Overwhelm</p>
                    <p className="text-[14px] font-semibold text-[#111] mb-1">Too much data</p>
                    <p className="text-[12px] text-[#999] leading-[1.5]">Unreadable metrics across multiple dashboards</p>
                    <p className="text-[11px] text-[#bbb] mt-3">P1 · P2</p>
                  </div>
                  <div className="border-t-[3px] border-[#E85555] bg-[#FFF8F8] rounded-lg p-5">
                    <p className="text-[13px] font-bold text-[#E85555] uppercase tracking-wide mb-2">Guilt Loop</p>
                    <p className="text-[14px] font-semibold text-[#111] mb-1">Streak breaks</p>
                    <p className="text-[12px] text-[#999] leading-[1.5]">One missed day resets everything. Users avoid the app entirely.</p>
                    <p className="text-[11px] text-[#bbb] mt-3">P1 · P2</p>
                  </div>
                  <div className="border-t-[3px] border-[#D4A853] bg-[#FFFCF5] rounded-lg p-5">
                    <p className="text-[13px] font-bold text-[#D4A853] uppercase tracking-wide mb-2">Social Gap</p>
                    <p className="text-[14px] font-semibold text-[#111] mb-1">Doing it alone</p>
                    <p className="text-[12px] text-[#999] leading-[1.5]">No community, no accountability. No one notices when you quit.</p>
                    <p className="text-[11px] text-[#bbb] mt-3">P3</p>
                  </div>
                </div>

                {/* Convergence bar */}
                <div className="relative">
                  {/* Connecting lines */}
                  <div className="flex justify-center gap-0">
                    <div className="flex-1 flex justify-center">
                      <div className="w-[1px] h-6 bg-[#ddd]" />
                    </div>
                    <div className="flex-1 flex justify-center">
                      <div className="w-[1px] h-6 bg-[#ddd]" />
                    </div>
                    <div className="flex-1 flex justify-center">
                      <div className="w-[1px] h-6 bg-[#ddd]" />
                    </div>
                  </div>
                  {/* Result bar */}
                  <div className="bg-[#111] rounded-lg px-6 py-4 text-center">
                    <p className="text-[14px] font-bold text-white">They all quit.</p>
                    <p className="text-[12px] text-[#999] mt-1">No tool connects daily action to long-term health</p>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* ── 2b. Competitive Analysis (separate main section) ── */}
        {cs.competitiveAnalysis && (
          <section className="mb-52 pt-28 border-t border-[#e8e8e4] max-w-[800px] mx-auto">
            <p className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#3478F6] mb-4">
              Competitive Analysis
            </p>
            <h2 className="text-[28px] sm:text-[34px] font-bold text-[#111] leading-[1.15] mb-12">
              Is Anyone Solving This?
            </h2>
            <div className="max-w-[700px] mb-12 space-y-6">
              <p className="text-[15px] text-[#767676] leading-[1.7]">
                My participants didn&rsquo;t just dislike their health apps. They <span className="font-bold text-[#111]">gave up on their health goals</span> because of them. I wanted to know: is anyone in the longevity space actually solving for <span className="font-bold text-[#111]">overwhelm, guilt, and isolation</span>? Or is the entire category built this way?
              </p>
              <p className="text-[15px] text-[#767676] leading-[1.7]">
                I looked at the four most prominent apps in the longevity space: <span className="font-bold text-[#111]">WHOOP, Longevity.ai, Humanity, and Rejuve.AI</span>. And I measured them against the <span className="font-bold text-[#111]">three reasons my participants quit</span>: overwhelm, guilt, and isolation.
              </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[#e8e8e4]">
                    <th className="text-[8px] sm:text-[10px] font-medium uppercase tracking-[0.1em] text-[#767676] text-left pb-4 pr-2 sm:pr-4">
                      Feature
                    </th>
                    {cs.competitiveAnalysis.competitors.map((name) => (
                      <th key={name} className="text-[7px] sm:text-[10px] font-medium uppercase tracking-[0.1em] text-[#767676] text-center pb-4 pr-1 sm:pr-4">
                        {name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cs.competitiveAnalysis.rows.map((row) => (
                    <tr key={row.feature} className="border-b border-[#e8e8e4] align-top">
                      <td className="py-3 sm:py-4 pr-2 sm:pr-4 text-[12px] sm:text-[15px] font-medium text-[#111]">
                        {row.feature}
                      </td>
                      {row.cells.map((cell, ci) => (
                        <td key={ci} className="py-3 sm:py-4 pr-1 sm:pr-4 text-center">
                          <span className={`inline-block w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${cell.has ? 'bg-[#111]' : 'border-2 border-[#ddd]'}`} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-12 text-[15px] text-[#767676] max-w-[700px] leading-[1.7]">
              No one was connecting daily choices to long-term health. Every app tracked something, but none of them answered the question my participants were actually asking: <span className="font-bold text-[#111]">does what I do today matter for how long I live well?</span>
            </p>

            {/* Sources */}
            {cs.competitiveAnalysis.sources && cs.competitiveAnalysis.sources.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2 items-center">
                <span className="inline-flex items-center gap-2 text-[13px] font-bold text-[#111] mr-2"><span className="w-[3px] h-[16px] bg-[#3478F6] rounded-full inline-block"></span>Sources</span>
                {cs.competitiveAnalysis.sources.map((src, i) => (
                  <a
                    key={i}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600 hover:border-neutral-400 hover:text-[#0a0a0a] transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 flex-shrink-0" />
                    {src.label}
                  </a>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ── 3. HMW Question ── */}
        {cs.hmwQuestion && (
          <section className="mb-52 py-28 max-w-[800px] mx-auto">
            <p className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#3478F6] mb-8">
              How Might We
            </p>
            <p className="text-3xl sm:text-4xl md:text-[42px] font-light text-[#0a0a0a] leading-[1.3]">
              {cs.hmwQuestion}
            </p>
          </section>
        )}

        {/* Transition — reduce gap between Concept Validation and Secondary Research */}

        {/* ── 4. What the Research Says (Secondary Research) ── */}
        {cs.secondaryResearch && (
          <section className="mb-52 pt-28 max-w-[800px] mx-auto border-t border-[#e8e8e4]">
            <p className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#3478F6] mb-4">
              {cs.secondaryResearch.label ?? 'Secondary Research'}
            </p>
            <h2 className="text-[28px] sm:text-[34px] font-bold text-[#111] leading-[1.15] mb-12">
              The Science Behind the Problems
            </h2>
            {cs.secondaryResearch.intro && (
              <p className="text-[15px] font-light text-[#767676] max-w-[700px] mb-12 leading-[1.7]"
                dangerouslySetInnerHTML={{ __html: cs.secondaryResearch.intro.replace(/\*\*(.*?)\*\*/g, '<span class="font-bold text-[#111]">$1</span>') }}
              />
            )}
            <div className="max-w-[700px] space-y-0">
              {cs.secondaryResearch.items.map((item, i) => (
                <div key={i} className="py-10 border-t border-neutral-100">
                  <span className="inline-flex items-center gap-2 text-[13px] font-bold text-[#111] mb-10"><span className="w-[3px] h-[16px] bg-[#3478F6] rounded-full inline-block"></span>{item.theme}</span>
                  <h4 className="text-[22px] font-bold text-[#0a0a0a] mb-4 leading-snug">{item.title}</h4>
                  {/* Inline chart diagram */}
                  <div className="mb-6">
                    <ResearchViz theme={item.theme} />
                  </div>

                  {/* Evidence quote + source badges */}
                  {item.citationQuote && (
                    <div className="pl-4 border-l-2 border-neutral-200">
                      <span className="inline-flex items-center gap-2 text-[13px] font-bold text-[#111] mb-10"><span className="w-[3px] h-[16px] bg-[#3478F6] rounded-full inline-block"></span>Evidence</span>
                      <blockquote className="italic text-[15px] text-[#767676] leading-[1.7] mb-4">
                        &ldquo;{item.citationQuote}&rdquo;
                      </blockquote>
                      {item.sources && item.sources.length > 0 && (
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className="inline-flex items-center gap-2 text-[13px] font-bold text-[#111] mr-2"><span className="w-[3px] h-[16px] bg-[#3478F6] rounded-full inline-block"></span>Source</span>
                          {item.sources.map((src, j) => (
                            <SourceBadge key={j} label={src.label} url={src.url} />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── 4b. Ideation — From Problems to Product ── */}
        <section className="mb-52 pt-28 border-t border-[#e8e8e4] max-w-[800px] mx-auto">
          <p className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#3478F6] mb-4">
            Ideation
          </p>
          <h2 className="text-[28px] sm:text-[34px] font-bold text-[#111] leading-[1.15] mb-12">
            From Three Problems to One Product
          </h2>
          <div className="mb-12 space-y-6 max-w-[700px]">
            <p className="text-[15px] leading-[1.7] text-[#767676]">
              The research gave me three clear problems: <span className="font-bold text-[#111]">overwhelm, guilt, and isolation</span>. But a problem isn&rsquo;t a product. I needed to figure out how to solve each one, and whether those solutions could live together.
            </p>
            <p className="text-[15px] leading-[1.7] text-[#767676]">
              I started sketching. Not screens, but <span className="font-bold text-[#111]">approaches</span>. For each problem, I explored three directions, rejected the ones that repeated the same mistakes, and kept the ones that felt different.
            </p>
          </div>

          {/* Sketches: text left + image right */}
          <div className="space-y-16 mt-16">
            {/* Overwhelm */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-flex items-center gap-2 text-[13px] font-bold text-[#111] mb-4"><span className="w-[3px] h-[16px] bg-[#3478F6] rounded-full inline-block"></span>Solving Overwhelm</span>
                <p className="text-[15px] text-[#767676] leading-[1.7]">
                  I tried removing metrics entirely, condensing them into a weekly summary, and collapsing everything into a single score. Only the single score actually reduced cognitive load. <span className="font-bold text-[#111]">Users don&rsquo;t want to analyze. They want to know if they&rsquo;re on track.</span>
                </p>
              </div>
              <div className="relative pt-3">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[20px] bg-[#D4A853]/40 rounded-sm rotate-[0deg] z-10" />
                <div className="rounded-xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/aika/ideation-1-overwhelm.jpeg" alt="Sketch exploring approaches to solving overwhelm" className="w-full h-auto block" />
                </div>
              </div>
            </div>

            {/* Guilt */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-flex items-center gap-2 text-[13px] font-bold text-[#111] mb-4"><span className="w-[3px] h-[16px] bg-[#3478F6] rounded-full inline-block"></span>Solving Guilt</span>
                <p className="text-[15px] text-[#767676] leading-[1.7]">
                  Removing streaks left no progress indicator. Forgiving one day still felt like counting. Growth stages reframed the question: <span className="font-bold text-[#111]">&ldquo;how far along am I?&rdquo; not &ldquo;did I fail today?&rdquo;</span> A miss slows growth. It doesn&rsquo;t reset it.
                </p>
              </div>
              <div className="relative" style={{ paddingBottom: '50px' }}>
                {/* Page 1 - X marks (behind, upper-right) */}
                <div className="relative pt-3" style={{ zIndex: 0 }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[20px] bg-[#D4A853]/40 rounded-sm rotate-[2deg] z-10" />
                  <div className="rounded-xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/aika/ideation-2a-guilt.jpeg" alt="Sketch exploring approaches A and B for solving guilt" className="w-full h-auto block" />
                  </div>
                </div>
                {/* Page 2 - C solution (front, overlapping bottom-right) */}
                <div className="absolute z-[2] w-[72%]" style={{ bottom: '0', right: '-30px' }}>
                  <div className="relative pt-3">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[20px] bg-[#D4A853]/40 rounded-sm -rotate-[1deg] z-10" />
                    <div className="rounded-xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/aika/ideation-2b-guilt.jpeg" alt="Sketch showing approach C - growth stages" className="w-full h-auto block" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Isolation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-flex items-center gap-2 text-[13px] font-bold text-[#111] mb-4"><span className="w-[3px] h-[16px] bg-[#3478F6] rounded-full inline-block"></span>Solving Isolation</span>
                <p className="text-[15px] text-[#767676] leading-[1.7]">
                  A social feed became comparison, not support. A 1:1 partner could quit, leaving you alone again. Small group challenges gave structure, shared goals, and natural accountability. <span className="font-bold text-[#111]">Isolation isn&rsquo;t fixed by adding people. It&rsquo;s fixed by the right structure.</span>
                </p>
              </div>
              <div className="relative" style={{ paddingBottom: '50px' }}>
                {/* Page 1 - X marks (behind, upper-right) */}
                <div className="relative pt-3" style={{ zIndex: 0 }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[20px] bg-[#D4A853]/40 rounded-sm -rotate-[1deg] z-10" />
                  <div className="rounded-xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/aika/ideation-3a-isolation.jpeg" alt="Sketch exploring approaches A and B for solving isolation" className="w-full h-auto block" />
                  </div>
                </div>
                {/* Page 2 - C solution (front, overlapping bottom-right) */}
                <div className="absolute z-[2] w-[72%]" style={{ bottom: '0', right: '-30px' }}>
                  <div className="relative pt-3">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[20px] bg-[#D4A853]/40 rounded-sm rotate-[1deg] z-10" />
                    <div className="rounded-xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/aika/ideation-3b-isolation.jpeg" alt="Sketch showing approach C - small group challenges" className="w-full h-auto block" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Connecting the dots */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-flex items-center gap-2 text-[13px] font-bold text-[#111] mb-4"><span className="w-[3px] h-[16px] bg-[#3478F6] rounded-full inline-block"></span>Connecting the Dots</span>
                <p className="text-[15px] text-[#767676] leading-[1.7]">
                  Three problems. Three surviving ideas: <span className="font-bold text-[#111]">one score, growth stages, group challenges</span>. When I laid them side by side, they weren&rsquo;t three separate features. They were one product. That&rsquo;s when Aika came together.
                </p>
              </div>
              <div className="relative pt-3">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[20px] bg-[#D4A853]/40 rounded-sm rotate-[1deg] z-10" />
                <div className="rounded-xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/aika/ideation-4-connecting.jpeg" alt="Sketch connecting three solutions into Aika" className="w-full h-auto block" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. Solution / Features ── */}
        <section className="mb-52 pt-28 max-w-[800px] mx-auto border-t border-[#e8e8e4]">
          <p className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#3478F6] mb-4">
            Solution
          </p>
          <h2 className="text-[28px] sm:text-[34px] font-bold text-[#111] leading-[1.15] mb-6">
            One Score, Easy Logging, Gentle Feedback
          </h2>
          <div className="text-[#0a0a0a]">
            <SolutionContent project={project} cs={cs} />
          </div>

        </section>

        {/* ── 5b. Retrospective ── */}
        {cs.retrospective && (
          <section className="mb-52 py-20 px-10 sm:px-16 rounded-3xl bg-[#F5F3EF] max-w-[800px] mx-auto">
            <p className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#3478F6] mb-6">
              Retrospective
            </p>
            <div className="space-y-6 max-w-[700px]">
              {cs.retrospective.split('\n\n').map((para, i) => (
                <p key={i} className="text-[15px] text-[#767676] leading-[1.7]"
                  dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#111]">$1</strong>') }}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── 6. Results ── */}
        <section className="mb-52 pt-28 border-t border-[#e8e8e4] max-w-[800px] mx-auto">
          <p className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#3478F6] mb-4">
            Results
          </p>
          <h2 className="text-[28px] sm:text-[34px] font-bold text-[#111] leading-[1.15] mb-12">
            How I Would Measure Success
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[700px]">
            {cs.results.map((item, i) => (
              <li key={i} className="text-[15px] leading-[1.7] text-[#767676]"
                dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#111]">$1</strong>') }}
              />
            ))}
          </ul>
        </section>

        {/* ── 7. What I Learned ── */}
        <section className="pb-8 pt-20 border-t border-[#e8e8e4] max-w-[800px] mx-auto">
          <p className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#3478F6] mb-4">
            What I Learned
          </p>
          <h2 className="text-[28px] sm:text-[34px] font-bold text-[#111] leading-[1.15] mb-12">
            Reflections
          </h2>
          <ul className="space-y-4 text-[15px] leading-[1.7] text-[#767676] max-w-[700px]">
            {cs.learned.map((item, i) => (
              <li key={i}
                dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#111]">$1</strong>') }}
              />
            ))}
          </ul>
        </section>

      </article>
      </div>
    )
  }

  /* Generic project layout (no caseStudy) */
  return (
    <article className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <Link
        href="/"
        className="text-xs uppercase tracking-[0.2em] text-neutral-600 mb-10 inline-block hover:text-[#0a0a0a]"
      >
        ← Back
      </Link>

      <header className="mb-16">
        <h1 className="text-4xl font-light tracking-tight text-[#0a0a0a] sm:text-5xl">
          {project.name}
        </h1>
        <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-lg bg-neutral-100">
          <Image
            src={project.heroPath}
            alt={`${project.name} hero`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 896px"
            unoptimized={project.heroPath.endsWith('.svg')}
          />
        </div>
      </header>

      <section className="mb-16">
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#767676] mb-10">At a glance</p>
        <div className="grid gap-6 sm:grid-cols-2 text-sm">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#767676]">Role</p>
            <p className="mt-1">{project.role}</p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#767676]">Timeline</p>
            <p className="mt-1">{project.timeline}</p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#767676]">Team</p>
            <p className="mt-1">{project.team}</p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#767676]">Tools</p>
            <p className="mt-1">{project.tools}</p>
          </div>
        </div>
        <p className="mt-8 text-[#0a0a0a] leading-[1.5]">{project.summary}</p>
      </section>

      <section className="mb-16">
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#767676] mb-10">Results</p>
        <p className="text-[#0a0a0a] leading-[1.5]">{project.results}</p>
      </section>

      <section>
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#767676] mb-10">What I learned</p>
        <p className="text-[#0a0a0a] leading-[1.5]">{project.learned}</p>
      </section>
    </article>
  )
}
