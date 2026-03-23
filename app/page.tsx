import Link from 'next/link'
import Image from 'next/image'
import { projects } from '@/content/projects'
import dynamic from 'next/dynamic'

const Hero3D = dynamic(() => import('@/components/Hero3D'), { ssr: false })
const AikaShowcase = dynamic(() => import('@/components/AikaShowcase'), { ssr: false })

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto border-l border-r border-neutral-200">
      <Hero3D />

      {/* ── Work section ──────────────────────────────────────────────── */}
      <main id="work">
        {projects.map((project) => (
          <article key={project.slug} className="border-t border-neutral-200">

            {/* ── Aika: full two-column card ── */}
            {project.galleryImages ? (
              <div className="max-w-5xl mx-auto px-6 md:px-10 py-10 md:py-12">
                <AikaShowcase galleryImages={project.galleryImages} name={project.name} />
              </div>
            ) : (
              /* ── Other projects: default layout ── */
              <div className="max-w-5xl mx-auto px-6 md:px-10 py-10 md:py-12 grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-8 md:gap-12 items-center">
                <div className="flex flex-col items-start">
                  <p className="font-mono text-[10px] tracking-[0.3em] text-neutral-400 uppercase mb-3">
                    {project.client}
                  </p>
                  <h2 className="text-[1.5rem] md:text-[1.875rem] font-bold text-[#111] leading-tight tracking-tight mb-5">
                    {project.tagline}
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] text-neutral-600 border border-neutral-300 rounded-full px-3 py-1 leading-none"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/work/${project.slug}`}
                    className="bg-[#111] text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-neutral-800 transition-colors"
                  >
                    View Work
                  </Link>
                </div>

                <div className="relative w-full h-64 md:h-72 overflow-hidden rounded-xl bg-neutral-50">
                  <Image
                    src={project.thumbPath}
                    alt={project.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 600px"
                    unoptimized={project.thumbPath.endsWith('.svg')}
                  />
                </div>
              </div>
            )}

          </article>
        ))}
        <div className="border-t border-neutral-200" />
      </main>
    </div>
  )
}
