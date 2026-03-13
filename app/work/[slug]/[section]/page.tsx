import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getProjectBySlug, projects } from '@/content/projects'
import { CaseStudyNav, SECTIONS, type SectionId } from '../CaseStudyNav'
import { SolutionContent } from '../SolutionContent'

export function generateStaticParams() {
  const params: { slug: string; section: string }[] = []
  for (const p of projects) {
    if (p.caseStudy) {
      for (const s of SECTIONS) {
        params.push({ slug: p.slug, section: s.id })
      }
    }
  }
  return params
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ slug: string; section: string }>
}) {
  const { slug, section } = await params
  const project = getProjectBySlug(slug)
  if (!project?.caseStudy) notFound()

  const cs = project.caseStudy
  const validSections = SECTIONS.map((s) => s.id)
  if (!validSections.includes(section as SectionId)) notFound()

  const sectionId = section as SectionId
  const sectionLabel = SECTIONS.find((s) => s.id === sectionId)?.label ?? sectionId

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <Link
        href="/"
        className="text-sm font-medium text-[#000000] mb-6 inline-block"
      >
        ← Back to Work
      </Link>

      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-[#000000] sm:text-3xl">
          {project.name}
          {cs.subtitle && (
            <span className="block mt-1 text-lg font-normal text-[#000000]">
              {cs.subtitle}
            </span>
          )}
        </h1>
        <p className="mt-2 text-sm text-[#000000]">
          {cs.duration} · {cs.role}
        </p>
      </header>

      <CaseStudyNav slug={slug} currentSection={sectionId} />

      <section>
        <h2 className="text-sm font-medium uppercase tracking-wider text-[#000000] mb-6">
          {sectionLabel}
        </h2>

        {sectionId === 'overview' && (
          <>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-neutral-100 mb-10">
              <Image
                src={project.heroPath}
                alt={`${project.name} — hero`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 896px"
                unoptimized={project.heroPath.endsWith('.svg')}
              />
            </div>
            <div className="space-y-6 text-[#000000] leading-relaxed">
              {cs.overview.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </>
        )}

        {sectionId === 'problem' && (
          <ul className="space-y-6 text-[#000000] leading-relaxed list-none">
            {cs.problem.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}

        {sectionId === 'research' && (
          <>
            <ol className="space-y-4 text-[#000000] leading-relaxed list-decimal list-inside">
              {cs.researchPoints.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ol>
            <div className="mt-10 rounded-lg border border-neutral-200 bg-neutral-50 px-5 py-5">
              <p className="text-sm font-medium text-[#000000] mb-1">Key Insight</p>
              <p className="text-[#000000] leading-relaxed">{cs.keyInsight}</p>
            </div>
          </>
        )}

        {sectionId === 'solution' && <SolutionContent project={project} cs={cs} />}

        {sectionId === 'results' && (
          <ul className="space-y-4 text-[#000000] leading-relaxed list-disc list-inside">
            {cs.results.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}

        {sectionId === 'learned' && (
          <ul className="space-y-4 text-[#000000] leading-relaxed list-disc list-inside">
            {cs.learned.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
      </section>
    </article>
  )
}
