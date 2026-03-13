import Link from 'next/link'

export const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem' },
  { id: 'research', label: 'Research & Insights' },
  { id: 'solution', label: 'Solution' },
  { id: 'results', label: 'Results' },
  { id: 'learned', label: 'What I Learned' },
] as const

export type SectionId = (typeof SECTIONS)[number]['id']

export function CaseStudyNav({
  slug,
  currentSection,
}: {
  slug: string
  currentSection: SectionId
}) {
  const currentIndex = SECTIONS.findIndex((s) => s.id === currentSection)
  const prev = currentIndex > 0 ? SECTIONS[currentIndex - 1] : null
  const next = currentIndex < SECTIONS.length - 1 && currentIndex >= 0 ? SECTIONS[currentIndex + 1] : null

  return (
    <nav className="border-b border-neutral-200 pb-6 mb-10" aria-label="Case study sections">
      <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <Link
              href={`/work/${slug}/${s.id}`}
              className={
                s.id === currentSection
                  ? 'font-medium text-[#000000]'
                  : 'text-[#000000] hover:text-[#000000]'
              }
            >
              {s.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-between text-sm">
        {prev ? (
          <Link
            href={`/work/${slug}/${prev.id}`}
            className="text-[#000000] hover:text-[#000000]"
          >
            ← {prev.label}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/work/${slug}/${next.id}`}
            className="text-[#000000] hover:text-[#000000] ml-auto"
          >
            {next.label} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </nav>
  )
}
