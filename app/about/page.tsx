import InteractivePortrait from '@/components/InteractivePortrait'

export default function AboutPage() {
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
          <InteractivePortrait />
        </div>
      </div>

      {/* Background */}
      <div className="border-t border-neutral-200 py-12">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-[18px] font-semibold text-[#111]">Background</h2>
        </div>
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
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-[18px] font-semibold text-[#111]">Design Philosophy</h2>
        </div>
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
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-[18px] font-semibold text-[#111]">Things I Love</h2>
        </div>
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
