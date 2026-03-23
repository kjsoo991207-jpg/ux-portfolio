import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <h1 className="text-4xl font-semibold tracking-tight text-[#000000] mb-12">
        About
      </h1>

      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
        <div className="flex-1">
          <p className="text-[15px] text-[#111] leading-relaxed">
            I&apos;m Jinsoo Kim, a third-year Cognitive Science student at UCLA. I&apos;ve always been drawn to observing people and understanding how they think. That curiosity led me to product design: creating systems that fit how people actually reason and behave.
          </p>
          <p className="mt-4 text-[15px] text-[#111] leading-relaxed">
            My background spans behavioral analysis in athletics, leadership in the Korean military, and field observation in construction. Each experience taught me something different about understanding people. Now I apply those skills to design.
          </p>

          <div className="mt-12 space-y-6">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#767676] mb-1">Education</p>
              <p className="text-[14px] text-[#111]">UCLA — Cognitive Science, Third Year</p>
              <p className="text-[13px] text-[#767676]">Berkeley City College — Transfer Program</p>
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#767676] mb-1">Skills</p>
              <p className="text-[14px] text-[#111]">User Research, Wireframing, Prototyping, Behavioral Analysis</p>
              <p className="text-[13px] text-[#767676]">Figma, Miro, HTML/CSS</p>
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#767676] mb-1">Contact</p>
              <a href="mailto:jinsoo991207@ucla.edu" className="text-[14px] text-[#111] underline underline-offset-2">
                jinsoo991207@ucla.edu
              </a>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0">
          <div className="relative h-72 w-56 rounded-lg bg-neutral-100 overflow-hidden sm:h-96 sm:w-72">
            <Image
              src="/images/jinsoo-profile.png"
              alt="Jinsoo Kim"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </div>
    </div>
  )
}
