import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { getProjectBySlug, projects } from '@/content/projects'
import { SolutionContent } from './SolutionContent'
import { VennDiagram } from './VennDiagram'
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
    const mp = cs.mainPoints ?? {}
    return (
      <article className="mx-auto max-w-5xl px-6 py-20 sm:py-28 text-[#0a0a0a]">
        <Link
          href="/"
          className="text-xs uppercase tracking-[0.2em] text-neutral-600 mb-16 inline-block hover:text-[#0a0a0a]"
        >
          ← Back
        </Link>

        <header className="mb-24">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#0a0a0a] leading-[1.05]">
            {project.name}
          </h1>
          {cs.subtitle && (
            <p className="mt-6 text-xl sm:text-2xl md:text-3xl font-light text-neutral-600 max-w-2xl leading-snug">
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
          <section className="mb-28 pt-16">
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#767676] mb-10">
              &mdash; Why I built this
            </p>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-x-16 gap-y-8">
              <div className="md:pt-1">
                <span className="text-[11px] uppercase tracking-[0.08em] text-[#767676] border border-[#e5e5e5] rounded-[4px] px-[10px] py-[3px] inline-block">
                  Personal Context
                </span>
              </div>
              <div className="space-y-6">
                {cs.originStory.map((para, i) => (
                  <p key={i} className="text-[17px] font-light text-[#0a0a0a] leading-[1.7]">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── 2. What I Found (Primary Research) ── */}
        {cs.primaryResearch && (
          <section className="mb-28 pt-16">
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#767676] mb-10">
              &mdash; {cs.primaryResearch.label ?? 'What I Found'}
            </p>
            {cs.primaryResearch.intro && (
              <p className="text-[17px] font-light text-[#767676] max-w-2xl mb-12 leading-[1.7]">
                {cs.primaryResearch.intro}
              </p>
            )}

            {/* Participant table */}
            <div className="overflow-x-auto">
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

            {/* Competitive Analysis */}
            {cs.competitiveAnalysis && (
              <div className="mt-20">
                <span className="text-[11px] uppercase tracking-[0.08em] text-[#767676] border border-[#e5e5e5] rounded-[4px] px-[10px] py-[3px] inline-block mb-6">
                  Competitive Analysis
                </span>
                <p className="text-[17px] font-light text-[#767676] max-w-2xl mb-10 leading-[1.7]">
                  {cs.competitiveAnalysis.intro}
                </p>

                {/* STEP 1 — Pattern callout cards */}
                {(() => {
                  const rows = cs.competitiveAnalysis.rows
                  const numComp = cs.competitiveAnalysis.competitors.length
                  const behaviorGap = rows.find(r => r.feature === 'Behavior change')
                  const dailyGap = rows.find(r => r.feature === 'Daily signal')
                  const communityGap = rows.find(r => r.feature === 'Community')
                  const countMissing = (row: typeof rows[0] | undefined) =>
                    row ? row.cells.filter(c => !c.has).length : 0
                  const cards = [
                    { num: `${countMissing(behaviorGap)} / ${numComp}`, label: 'competitors lack a behavior change engine' },
                    { num: `${countMissing(dailyGap)} / ${numComp}`, label: 'have no daily longevity signal' },
                    { num: `${countMissing(communityGap)} / ${numComp}`, label: 'offer no community or accountability' },
                  ]
                  return (
                    <div className="grid grid-cols-3 gap-3 mb-12">
                      {cards.map((card, i) => (
                        <div key={i} className="border border-[#e8e8e4] bg-white rounded-lg p-6">
                          <p className="font-[family-name:var(--font-garamond)] text-[36px] text-[#111] leading-none mb-2">{card.num}</p>
                          <p className="font-[family-name:var(--font-dm-sans)] text-[14px] text-[#767676] leading-[1.5]">{card.label}</p>
                        </div>
                      ))}
                    </div>
                  )
                })()}

                {/* STEP 2 — Table (unchanged) */}
                <div className="overflow-x-auto -mx-4 px-4">
                  <table className="w-full border-collapse min-w-[640px]">
                    <thead>
                      <tr className="border-b border-[#e8e8e4]">
                        <th className="text-[10px] font-medium uppercase tracking-[0.1em] text-[#767676] text-left pb-4 pr-4 w-[120px]">
                          Feature
                        </th>
                        {cs.competitiveAnalysis.competitors.map((name) => (
                          <th key={name} className="text-[10px] font-medium uppercase tracking-[0.1em] text-[#767676] text-left pb-4 pr-4">
                            {name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {cs.competitiveAnalysis.rows.map((row) => (
                        <tr key={row.feature} className="border-b border-[#e8e8e4] align-top">
                          <td className="py-4 pr-4 text-[15px] font-medium text-[#111]">
                            {row.feature}
                          </td>
                          {row.cells.map((cell, ci) => (
                            <td key={ci} className="py-4 pr-4">
                              <span className={`text-[14px] font-medium ${cell.has ? 'text-[#2d6a4f]' : 'text-[#767676]'}`}>
                                {cell.has ? '\u2713' : '\u2717'}
                              </span>
                              <span className="ml-2 text-[14px] font-light text-[#333] leading-[1.5]">
                                {cell.text}
                              </span>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Conclusion */}
                <div className="mt-10 border-l-2 border-[#111] pl-6 max-w-2xl">
                  <p className="font-[family-name:var(--font-garamond)] italic text-[18px] text-neutral-700 leading-[1.75]">
                    {cs.competitiveAnalysis.closing}
                  </p>
                </div>

                {/* Sources */}
                {cs.competitiveAnalysis.sources && cs.competitiveAnalysis.sources.length > 0 && (
                  <div className="mt-8 flex flex-wrap gap-2 items-center">
                    <span className="text-[11px] uppercase tracking-[0.08em] text-[#767676] border border-[#e5e5e5] rounded-[4px] px-[10px] py-[3px] inline-block mr-1">Sources</span>
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
              </div>
            )}

            {/* Emotional journey map */}
            {cs.primaryResearch.journeyMap && (
              <JourneyMapDiagram journeyMap={cs.primaryResearch.journeyMap} />
            )}

            {/* Venn diagram — emerging themes */}
            {cs.primaryResearch.venn && (
              <div className="mt-16">
                <span className="text-[11px] uppercase tracking-[0.08em] text-[#767676] border border-[#e5e5e5] rounded-[4px] px-[10px] py-[3px] inline-block mb-10">
                  Emerging themes
                </span>
                <p className="text-[15px] text-neutral-400 mb-6 font-light">
                  Where the pain points overlap across participants
                </p>
                <VennDiagram venn={cs.primaryResearch.venn} />
              </div>
            )}
          </section>
        )}

        {/* ── 3. HMW Question ── */}
        {cs.hmwQuestion && (
          <section className="mb-28 py-16 px-10 sm:px-16 rounded-3xl bg-[#F5F3EF] hover:bg-[#EFECE6] transition-colors duration-300">
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#767676] mb-10">
              &mdash; How Might We
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-light text-[#0a0a0a] leading-snug max-w-2xl">
              {cs.hmwQuestion}
            </p>
          </section>
        )}

        {/* ── 3b. Concept Validation (User Research) ── */}
        <section className="mb-16 pt-16">
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#767676] mb-10">
            &mdash; Concept Validation
          </p>

          <div className="mb-12 space-y-4">
            <p>
              <span className="text-[17px] leading-[1.7] text-[#767676]">Before finalizing any design decisions, I tested the core concept with 5 participants via a structured survey.</span>{' '}
              <span className="text-[20px] font-medium leading-[1.8] text-[#111]">I shared a single screenshot of the Aika Age screen and asked five questions about comprehension, direction, and retention intent.</span>
            </p>
          </div>

          {/* Survey questions */}
          <div className="mb-12">
            <span className="text-[11px] uppercase tracking-[0.08em] text-[#767676] border border-[#e5e5e5] rounded-[4px] px-[10px] py-[3px] inline-block mb-6">
              Survey Questions
            </span>
            <div className="space-y-2 max-w-2xl">
              <div className="flex gap-3">
                <span className="text-[15px] font-medium text-[#767676] w-7 flex-shrink-0">Q1</span>
                <p className="text-[16px] text-[#555] leading-[1.6]">Did you immediately understand what <strong className="font-semibold text-[#333]">30.6</strong> means?</p>
              </div>
              <div className="flex gap-3">
                <span className="text-[15px] font-medium text-[#767676] w-7 flex-shrink-0">Q2</span>
                <p className="text-[16px] text-[#555] leading-[1.6]">If this number <strong className="font-semibold text-[#333]">goes up</strong>, is that good or bad?</p>
              </div>
              <div className="flex gap-3">
                <span className="text-[15px] font-medium text-[#767676] w-7 flex-shrink-0">Q3</span>
                <p className="text-[16px] text-[#555] leading-[1.6]">Would you use this app <strong className="font-semibold text-[#333]">daily</strong>?</p>
              </div>
              <div className="flex gap-3">
                <span className="text-[15px] font-medium text-[#767676] w-7 flex-shrink-0">Q4</span>
                <p className="text-[16px] text-[#555] leading-[1.6]">What do you think happens when you <strong className="font-semibold text-[#333]">miss a day</strong>?</p>
              </div>
              <div className="flex gap-3">
                <span className="text-[15px] font-medium text-[#767676] w-7 flex-shrink-0">Q5</span>
                <p className="text-[16px] text-[#555] leading-[1.6]">Describe your <strong className="font-semibold text-[#333]">first impression</strong> in one sentence.</p>
              </div>
            </div>
          </div>

          {/* Stat blocks */}
          <div className="grid grid-cols-3 gap-3 mb-12">
            <div className="border border-[#e8e8e4] bg-white rounded-lg p-6">
              <p className="font-[family-name:var(--font-garamond)] text-[36px] text-[#111] leading-none mb-2">3 / 5</p>
              <p className="font-[family-name:var(--font-dm-sans)] text-[14px] text-[#767676] leading-[1.5]">understood the concept <strong className="font-medium text-[#666]">on first view</strong></p>
            </div>
            <div className="border border-[#e8e8e4] bg-white rounded-lg p-6">
              <p className="font-[family-name:var(--font-garamond)] text-[36px] text-[#E85555] leading-none mb-2">5 / 5</p>
              <p className="font-[family-name:var(--font-dm-sans)] text-[14px] text-[#767676] leading-[1.5]">got the <strong className="font-medium text-[#666]">number direction wrong</strong></p>
            </div>
            <div className="border border-[#e8e8e4] bg-white rounded-lg p-6">
              <p className="font-[family-name:var(--font-garamond)] text-[36px] text-[#111] leading-none mb-2">2 / 5</p>
              <p className="font-[family-name:var(--font-dm-sans)] text-[14px] text-[#767676] leading-[1.5]">would use the app <strong className="font-medium text-[#666]">daily</strong></p>
            </div>
          </div>

          {/* Participant responses — DM screenshots */}
          <div className="mb-12">
            <span className="text-[11px] uppercase tracking-[0.08em] text-[#767676] border border-[#e5e5e5] rounded-[4px] px-[10px] py-[3px] inline-block mb-6">
              Participant Responses
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="bg-[#F5F3EF] rounded-2xl p-6 mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/aika/survey-p4.png" alt="Participant 4 survey response via Instagram DM" className="rounded-xl w-full" />
                </div>
                <p className="text-[14px] text-[#555] mb-3">Participant 4</p>
                <div className="space-y-2">
                  <p className="text-[15px] text-[#555] leading-[1.5]">
                    <span className="text-[#767676]">Q2.</span> &ldquo;I thought <strong className="font-medium text-[#333]">lower meant healthier</strong>, like a biological age.&rdquo;
                  </p>
                  <p className="text-[15px] text-[#555] leading-[1.5]">
                    <span className="text-[#767676]">Q4.</span> &ldquo;If I skip a day, I&apos;d assume the <strong className="font-medium text-[#333]">estimated age goes up</strong>.&rdquo;
                  </p>
                  <p className="text-[15px] text-[#555] leading-[1.5]">
                    <span className="text-[#767676]">Q5.</span> &ldquo;Visualize mathematical formulas so users can <strong className="font-medium text-[#333]">understand intuitively</strong>.&rdquo;
                  </p>
                </div>
              </div>
              <div>
                <div className="bg-[#F5F3EF] rounded-2xl p-6 mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/aika/survey-p2.png" alt="Participant 2 survey response via Instagram DM" className="rounded-xl w-full" />
                </div>
                <p className="text-[14px] text-[#555]">Participant 2 (English responses)</p>
              </div>
            </div>
          </div>

          {/* Key finding + Design decision */}
          <div className="rounded-2xl bg-[#F5F3EF] px-8 py-8 md:px-10 md:py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border-l-2 border-neutral-300 pl-6">
                <p className="text-[11px] uppercase tracking-[0.08em] text-[#767676] mb-3">Key Finding</p>
                <p className="text-[16px] font-medium text-[#0a0a0a] leading-[1.6]">
                  <strong className="font-semibold">100% of participants</strong> interpreted Aika Age as <strong className="font-semibold">lower = healthier</strong>. The opposite of the intended direction.
                </p>
              </div>
              <div className="border-l-2 border-[#111] pl-6">
                <p className="text-[11px] uppercase tracking-[0.08em] text-[#767676] mb-3">Design Decision</p>
                <p className="text-[16px] text-[#555] leading-[1.6]">
                  Make <strong className="font-medium text-[#333]">&lsquo;younger = better&rsquo;</strong> explicit in the UI through <strong className="font-medium text-[#333]">directional language and visual cues</strong>.
                </p>
              </div>
            </div>
            <p className="text-[15px] text-[#767676] mt-6">
              This finding shaped three research directions below.
            </p>
          </div>
        </section>

        {/* Transition — reduce gap between Concept Validation and Secondary Research */}

        {/* ── 4. What the Research Says (Secondary Research) ── */}
        {cs.secondaryResearch && (
          <section className="mb-28 pt-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#767676] mb-10">
              &mdash; {cs.secondaryResearch.label ?? 'What the Research Says'}
            </p>
            {cs.secondaryResearch.intro && (
              <p className="text-[17px] font-light text-[#767676] max-w-2xl mb-12 leading-[1.7]">
                {cs.secondaryResearch.intro}
              </p>
            )}
            <div className="max-w-2xl space-y-0">
              {cs.secondaryResearch.items.map((item, i) => (
                <div key={i} className="py-10 border-t border-neutral-100">
                  <span className="text-[11px] uppercase tracking-[0.08em] text-[#767676] border border-[#e5e5e5] rounded-[4px] px-[10px] py-[3px] inline-block mb-10">{item.theme}</span>
                  <h4 className="text-[22px] font-light text-[#0a0a0a] mb-4 leading-snug">{item.title}</h4>
                  {/* Inline chart diagram */}
                  <div className="mb-6">
                    <ResearchViz theme={item.theme} />
                  </div>

                  {/* Evidence quote + source badges */}
                  {item.citationQuote && (
                    <div className="pl-4 border-l-2 border-neutral-200">
                      <span className="text-[11px] uppercase tracking-[0.08em] text-[#767676] border border-[#e5e5e5] rounded-[4px] px-[10px] py-[3px] inline-block mb-10">Evidence</span>
                      <blockquote className="italic text-[16px] text-neutral-600 leading-[1.5] mb-4">
                        &ldquo;{item.citationQuote}&rdquo;
                      </blockquote>
                      {item.sources && item.sources.length > 0 && (
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className="text-[11px] uppercase tracking-[0.08em] text-[#767676] border border-[#e5e5e5] rounded-[4px] px-[10px] py-[3px] inline-block mr-1">Source</span>
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

        {/* ── 4b. Ideation — Early Sketches ── */}
        <section className="mb-28 pt-16">
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#767676] mb-10">
            &mdash; Ideation
          </p>
          <div className="mb-12 space-y-4">
            <p>
              <span className="text-[17px] leading-[1.7] text-[#767676]">Before opening Figma, I needed to figure out a fundamental question:</span>{' '}
              <span className="text-[20px] font-medium leading-[1.8] text-[#111]">how should a single health metric live on a screen that also needs to drive daily action?</span>
            </p>
            <p>
              <span className="text-[17px] leading-[1.7] text-[#767676]">I sketched three directions on paper, each prioritizing a different aspect of the data.</span>{' '}
              <span className="text-[20px] font-medium leading-[1.8] text-[#111]">The goal was to find a layout where the Aika Age score feels immediately legible without burying the habits that feed into it.</span>
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/aika/sketch-exploration.png"
                alt="Three wireframe sketches exploring different approaches to displaying Aika Age: card grid, circular gauge, and number with line graph"
                className="w-full rounded-lg"
              />
              <p className="text-[15px] text-[#888] leading-[1.6] mt-3">
                Explored three directions: card grid, circular gauge, and number with trend line. Version C was selected for communicating both current state and trajectory.
              </p>
            </div>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/aika/sketch-detail.png"
                alt="Detailed wireframe sketch of the selected home screen direction with annotations explaining each UI component"
                className="w-full rounded-lg"
              />
              <p className="text-[15px] text-[#888] leading-[1.6] mt-3">
                Detailed wireframe of the selected direction, mapping out the Aika Age display, activity-based line graph, and habit customization sections.
              </p>
            </div>
          </div>
        </section>

        {/* ── 5. Solution / Features ── */}
        <section className="mb-28">
          <div className="py-16 px-10 sm:px-16 rounded-3xl bg-[#F5F3EF] mb-20">
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#767676] mb-10">
              &mdash; Solution
            </p>
            {mp.solution && (
              <p className="text-xl sm:text-2xl md:text-3xl font-light text-[#0a0a0a] max-w-2xl leading-snug">
                {mp.solution}
              </p>
            )}
          </div>
          <div className="text-[#0a0a0a]">
            <SolutionContent project={project} cs={cs} />
          </div>
        </section>

        {/* ── 5b. Retrospective ── */}
        {cs.retrospective && (
          <section className="mb-28 py-16 px-10 sm:px-16 rounded-3xl bg-[#F5F3EF]">
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#767676] mb-10">
              &mdash; Retrospective
            </p>
            <p className="font-[family-name:var(--font-garamond)] text-[24px] sm:text-[28px] font-light text-[#0a0a0a] leading-[1.5] max-w-3xl">
              {cs.retrospective}
            </p>
          </section>
        )}

        {/* ── 6. Results ── */}
        <section className="mb-24 pt-16">
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#767676] mb-10">
            &mdash; Results
          </p>
          {mp.results && (
            <p className="text-xl sm:text-2xl font-light text-[#0a0a0a] max-w-2xl mb-12">
              {mp.results}
            </p>
          )}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
            {cs.results.map((item, i) => (
              <li key={i} className="text-[20px] leading-[1.5] text-neutral-700">
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* ── 7. What I Learned ── */}
        <section className="pb-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#767676] mb-10">
            &mdash; What I learned
          </p>
          {mp.learned && (
            <p className="text-xl sm:text-2xl font-light text-[#0a0a0a] max-w-2xl mb-10">
              {mp.learned}
            </p>
          )}
          <ul className="space-y-4 text-[20px] leading-[1.5] text-neutral-700 max-w-2xl">
            {cs.learned.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <ReferencePanel />
      </article>
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
