import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/content/projects'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/work/${project.slug}`} className="block">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <span className="text-sm text-[#000000] tabular-nums">
          {project.timeline}
        </span>
        <h2 className="text-lg font-medium text-[#000000] sm:text-xl">
          {project.name}
        </h2>
      </div>
      <p className="mt-2 max-w-2xl text-[#000000] leading-relaxed">
        {project.description}
      </p>
      <span className="mt-2 inline-block text-sm text-[#000000]">
        View case study ↗
      </span>
      <div className="mt-6 relative aspect-video w-full max-w-xl overflow-hidden rounded-lg bg-neutral-100">
        <Image
          src={project.thumbPath}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 576px"
          unoptimized={project.thumbPath.endsWith('.svg')}
        />
      </div>
    </Link>
  )
}
