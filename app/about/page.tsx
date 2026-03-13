import Image from 'next/image'
import { Timeline } from '@/components/ui/timeline'

const timelineData = [
  {
    title: '2021',
    content: (
      <div>
        <p className="text-neutral-800 text-xs md:text-sm font-normal mb-4">
          Enrolled at Berkeley City College — Cognitive Science
        </p>
        <p className="text-neutral-600 text-xs md:text-sm leading-relaxed mb-6">
          Started exploring how the mind works: perception, memory, decision-making.
          The intersection of psychology and technology started pulling me toward
          human-computer interaction. Maintained a 4.0 GPA throughout.
        </p>
        <div className="flex flex-wrap gap-2">
          {['Cognitive Science', 'Psychology', 'Berkeley City College', '4.0 GPA'].map(tag => (
            <span key={tag} className="text-xs bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full border border-neutral-200">
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: '2022',
    content: (
      <div>
        <p className="text-neutral-800 text-xs md:text-sm font-normal mb-4">
          Discovered UX — First steps in Figma & design thinking
        </p>
        <p className="text-neutral-600 text-xs md:text-sm leading-relaxed mb-6">
          Realized that designing systems that fit how people actually reason was
          the problem I wanted to spend my career on. Started learning Figma, Miro,
          and the fundamentals of user research. Built first wireframes and low-fi
          prototypes for course projects.
        </p>
        <div className="flex flex-wrap gap-2">
          {['Figma', 'Miro', 'Wireframing', 'User Research', 'HCI'].map(tag => (
            <span key={tag} className="text-xs bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full border border-neutral-200">
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: '2023',
    content: (
      <div>
        <p className="text-neutral-800 text-xs md:text-sm font-normal mb-4">
          Transferred to UCLA — then military service (Republic of Korea)
        </p>
        <p className="text-neutral-600 text-xs md:text-sm leading-relaxed mb-6">
          Accepted to UCLA Cognitive Science as a transfer student — a goal I&apos;d
          been working toward since BCC. Shortly after, fulfilled mandatory military
          service in the Republic of Korea. Used the time to deepen understanding
          of behavioral psychology and continue learning product design independently.
        </p>
        <div className="flex flex-wrap gap-2">
          {['UCLA', 'Transfer Admit', 'Military Service', 'Self-study', 'Product Design'].map(tag => (
            <span key={tag} className="text-xs bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full border border-neutral-200">
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: '2025',
    content: (
      <div>
        <p className="text-neutral-800 text-xs md:text-sm font-normal mb-4">
          Returned to UCLA · AIKA — First End-to-End Case Study
        </p>
        <p className="text-neutral-600 text-xs md:text-sm leading-relaxed mb-4">
          Returned to UCLA in Fall 2025 as a third-year. Immediately got to work
          on AIKA — a 6-week end-to-end UX project designing an AI-powered longevity
          coach. Applied behavioral science, cognitive load theory, and user research
          to design a product that supports long-term habit formation without guilt
          or overwhelm.
        </p>
        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 mb-6">
          <p className="text-xs font-medium text-neutral-700 mb-2">AIKA — Key Design Decisions</p>
          <ul className="space-y-1.5">
            {[
              'One metric (Aika Age) to reduce cognitive overwhelm',
              'Behavior feedback reframed from punishment → support',
              'Snap / Talk / Type logging to minimize friction',
              'Streak system that doesn\'t reset — identity-based progress',
            ].map(item => (
              <li key={item} className="flex items-start gap-2 text-xs text-neutral-600">
                <span className="text-neutral-400 mt-0.5">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-2">
          {['UCLA', 'AIKA Project', 'Behavioral Design', 'Figma', '6 Weeks', 'End-to-End'].map(tag => (
            <span key={tag} className="text-xs bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full border border-neutral-200">
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'Now',
    content: (
      <div>
        <p className="text-neutral-800 text-xs md:text-sm font-normal mb-4">
          Building practice — open to internships &amp; collaborations
        </p>
        <p className="text-neutral-600 text-xs md:text-sm leading-relaxed mb-6">
          Continuing to build my design practice through coursework and self-directed
          projects at UCLA. Actively looking for internship opportunities and
          collaborations where I can learn from real users and real products.
          Interested in healthtech, ed-tech, and anything where cognitive science
          meets interface design.
        </p>
        <div className="bg-neutral-900 rounded-lg p-4 mb-6">
          <p className="text-xs font-medium text-white mb-3">Currently focused on</p>
          <ul className="space-y-2">
            {[
              'UX research methods & usability testing',
              'Design systems & component thinking',
              'Prototyping with Figma (hi-fi & interactive)',
              'Understanding behavioral science in product design',
            ].map(item => (
              <li key={item} className="flex items-start gap-2 text-xs text-neutral-400">
                <span className="text-neutral-600 mt-0.5">→</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <a
          href="mailto:kjsoo991207@gmail.com"
          className="inline-flex items-center gap-2 bg-[#111] text-white text-xs font-light px-4 py-2.5 hover:bg-neutral-800 transition-colors"
        >
          Get in touch ↗
        </a>
      </div>
    ),
  },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <h1 className="text-4xl font-semibold tracking-tight text-[#000000] mb-12">
        About
      </h1>

      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16 mb-24">
        <div className="flex-1 max-w-reading">
          <section>
            <h2 className="text-lg font-medium text-[#000000] mb-4">Bio</h2>
            <p className="text-[#000000] leading-relaxed">
              I&apos;m Jinsoo Kim — Korean by nationality, currently a third-year at UCLA (Cognitive Science). I&apos;ve always been drawn to observing people and wondering how they think. That curiosity shapes the way I look at the world and led me to explore human–computer interaction: how we can design systems that fit how people actually reason and behave.
            </p>
            <p className="mt-4 text-[#000000] leading-relaxed">
              I don&apos;t have prior industry experience yet. I&apos;m building my practice through coursework and projects and am open to collaborations, internships, and opportunities to learn from real users and products.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-lg font-medium text-[#000000] mb-4">Education</h2>
            <ul className="text-[#000000] leading-relaxed space-y-2">
              <li><strong className="text-[#000000]">UCLA</strong> — Third year, Cognitive Science (from Fall 2025)</li>
              <li><strong className="text-[#000000]">Berkeley City College</strong> — Jan 2021 – Spring 2023; 4.0 GPA; transferred to UCLA</li>
              <li>Leave of absence from UCLA (2023–2025) for military service in the Republic of Korea; returned Fall 2025.</li>
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="text-lg font-medium text-[#000000] mb-4">Skills &amp; Tools</h2>
            <p className="text-[#000000] leading-relaxed">
              UX research, user flows, wireframing, prototyping, visual design, design systems. Figma, Miro, and related tools. Eager to grow in research and product design.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-lg font-medium text-[#000000] mb-4">Contact</h2>
            <p className="text-[#000000] leading-relaxed">
              <a href="mailto:kjsoo991207@gmail.com" className="underline decoration-[#000000] underline-offset-2 hover:decoration-[#000000]">kjsoo991207@gmail.com</a>
            </p>
          </section>
        </div>

        <div className="flex-shrink-0">
          <div className="relative h-48 w-48 rounded-lg bg-neutral-100 overflow-hidden sm:h-64 sm:w-64">
            <Image
              src="/images/placeholder-1.svg"
              alt="Photo placeholder"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <p className="mt-2 text-sm text-[#000000]">Optional photo placeholder</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="border-t border-neutral-100 pt-16">
        <h2 className="text-2xl font-semibold tracking-tight text-[#000000] mb-2">
          Journey
        </h2>
        <p className="text-neutral-500 text-sm mb-0">
          From cognitive science to UX design — the path so far.
        </p>
        <Timeline data={timelineData} />
      </div>
    </div>
  )
}
