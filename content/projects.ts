// Use .svg for placeholder images; switch to .png paths when you add real assets in public/images/

export interface ProcessSection {
  number: string
  title: string
  /** Optional second line for Ethan-style two-line headline (e.g. "Add tags" / "to your notes") */
  titleLine2?: string
  body: string
  /** Extended body paragraphs shown before Before/After grid */
  bodyParagraphs?: string[]
  /** Closing paragraph shown after Before/After grid */
  closingBody?: string
  /** Why this feature was designed this way .  design rationale (Ethan Chng style) */
  rationale?: string
  /** 1-2 sentence citation from paper/article that fits this feature */
  citationQuote?: string
  /** Research / further reading links shown under the section */
  sources?: { label: string; url: string }[]
  /** Ethan-style: "Interface explorations" with iteration items (e.g. Tag Visual Design, Tag Popup Modal) */
  explorations?: { label: string; items: { title: string; body: string; critique?: string; selected?: boolean }[] }
  /** Ethan-style: "Final experience" block(s) after explorations */
  finalExperience?: { label?: string; blocks: { title: string; body: string }[] }
  /** Three-part thinking process: Observation → Thinking Process → Solution */
  thinkingProcess?: { label: string; content: string }[]
  image?: string
  /** Secondary annotation/breakdown image shown beside the main image */
  annotationImage?: string
  caption?: string
  /** 'wide' for landscape, 'device' for full phone photo, default 'mobile' for in-app screen */
  imageAspect?: 'mobile' | 'wide' | 'device'
  /** Optional video path for this section (e.g. section 6 barcode scan demo) */
  video?: string
  /** One-line origin .  which user pain point this feature addresses */
  painPointOrigin?: string
  /** Whether this feature originated from interviews or secondary research */
  sourceType?: 'interviews' | 'research'
  /** Before/After comparison strings for the design decision */
  beforeAfter?: { before: string; after: string }
}

export interface PrimaryResearchParticipant {
  persona: string
  keyObservation: string
  painPoint: string
}

export interface ResearchInsight {
  theme: string
  participantIndices: number[]
}

export interface JourneyMapStep {
  stage: string
  emotion: string
  sentiment: number // -2 (most negative) to +2 (most positive)
  note?: string
}

export interface JourneyMap {
  steps: JourneyMapStep[]
}

export interface VennZone {
  /** 'a' | 'b' | 'c' | 'ab' | 'ac' | 'bc' | 'abc' */
  id: string
  heading: string
  sub?: string
}

export interface VennDiagramData {
  a: { label: string; sub?: string }
  b: { label: string; sub?: string }
  c: { label: string; sub?: string }
  zones: VennZone[]
}

export interface PrimaryResearch {
  label?: string
  intro?: string
  participants: PrimaryResearchParticipant[]
  insights?: ResearchInsight[]
  venn?: VennDiagramData
  journeyMap?: JourneyMap
}

export interface SecondaryResearchItem {
  theme: string
  title: string
  body: string
  citationQuote?: string
  sources?: { label: string; url: string }[]
}

export interface SecondaryResearch {
  label?: string
  intro?: string
  items: SecondaryResearchItem[]
}

export interface CompetitiveRow {
  feature: string
  cells: { has: boolean; text: string }[]
}

export interface CompetitiveAnalysis {
  competitors: string[]
  rows: CompetitiveRow[]
  intro: string
  closing: string
  sources?: { label: string; url: string }[]
}

export interface CaseStudyContent {
  subtitle: string
  duration: string
  role: string
  /** Personal origin story .  shown at the top of the case study, before the overview */
  originStory?: string[]
  /** How Might We question .  bridges personal story to design challenge */
  hmwQuestion?: string
  /** Primary research: user interviews */
  primaryResearch?: PrimaryResearch
  /** Competitive analysis table */
  competitiveAnalysis?: CompetitiveAnalysis
  /** Secondary research: literature backing each pain point */
  secondaryResearch?: SecondaryResearch
  /** One-line main point per section (shown prominently above content) */
  mainPoints?: {
    overview?: string
    problem?: string
    research?: string
    solution?: string
    results?: string
    learned?: string
  }
  overview: string[]
  problem: string[]
  researchPoints: string[]
  keyInsight: string
  /** Optional: "THE design GOAL" statement (Ethan Chng style) */
  designGoal?: string
  /** Optional: "Here's when I encountered a big problem" moment with before/after */
  problemMoment?: {
    title: string
    body: string
    beforeLabel?: string
    afterLabel?: string
  }
  /** Short punchy headline for the solution callout block */
  solutionHeadline?: string
  solutionIntro: string
  solutionSections: ProcessSection[]
  /** Personal retrospective shown between solution and results */
  retrospective?: string
  results: string[]
  learned: string[]
}

export interface Project {
  slug: string
  name: string
  /** Short punchy tagline shown large on the landing page card */
  tagline: string
  /** Client / context label shown small above the tagline */
  client: string
  /** Tag pills shown on the landing page card */
  tags: string[]
  /** Carousel images for the landing page card (falls back to thumbPath if omitted) */
  galleryImages?: string[]
  description: string
  thumbPath: string
  heroPath: string
  role: string
  timeline: string
  team: string
  tools: string
  summary: string
  process: {
    discover: string
    research: string
    insights: string
    ideation: string
    design: string
    validation: string
    iteration: string
  }
  results: string
  learned: string
  processImages?: Record<string, string[]>
  caseStudy?: CaseStudyContent
}

export const projects: Project[] = [
  {
    slug: 'aika',
    name: 'Aika',
    tagline: 'Live longer. By design.',
    client: 'Academic · Personal Project',
    tags: ['AI Health', 'Mobile', 'UX Research', 'End-to-end'],
    galleryImages: [
      '/images/aika/aika-home.png',
      '/images/aika/aika-daily.png',
      '/images/aika/aika-coach.png',
      '/images/aika/aika-logging.png',
      '/images/aika/aika-add-habit.png',
      '/images/aika/aika-longevity-modes.png',
      '/images/aika/aika-streak.png',
      '/images/aika/aika-reinforcement.png',
      '/images/aika/aika-community.png',
    ],
    description: 'An AI-powered longevity coach that translates daily behaviors into a single intuitive metric, helping users build sustainable habits that improve their healthspan.',
    thumbPath: '/images/aika/aika-home.png',
    heroPath: '/images/aika/aika-home.png',
    role: 'Product Designer (End-to-end)',
    timeline: '10 Weeks',
    team: 'Solo Project',
    tools: 'Figma, Miro, User Interviews',
    summary:
      'Aika is an AI-powered longevity coach designed to help people live not just longer, but better. It translates daily behaviors into a single intuitive metric and sustainable habits.',
    process: {
      discover: '',
      research: '',
      insights: '',
      ideation: '',
      design: '',
      validation: '',
      iteration: '',
    },
    results: '',
    learned: '',
    caseStudy: {
      subtitle: 'The Modern Healthspan Companion',
      duration: '10 Weeks',
      role: 'Product Designer (End-to-end)',
      originStory: [
        'My grandfather passed away at 82. But for nearly a decade before that, he wasn\'t really living. Surgeries, procedures, all aimed at buying more time. I kept asking the same question: what if the right tools had existed earlier, before the decline, when small choices still had decades of compounding ahead?',
        'That experience made me think about two things differently. Lifespan, how long you live. Healthspan, how long you live well. Longevity isn\'t just about adding years. It\'s where the two meet: living longer, and living well for more of those years. Medicine extended my grandfather\'s lifespan. But nothing helped him protect his healthspan.',
        'When I started looking into this, I realized I wasn\'t the only one asking. Longevity has become one of the fastest-growing spaces in health and wellness. But the more I explored the tools people were actually using, the more I noticed the same gap: none of them were connecting daily choices to long-term outcomes in a way that felt personal or sustainable.',
        'I didn\'t have a solution yet. So I started by talking to people who were already trying to live healthier, and failing.',
      ],
      hmwQuestion: 'How might we make daily health choices feel consequential before it\'s too late, so people invest in healthspan, not just lifespan?',
      primaryResearch: {
        label: 'Discovery',
        intro: 'I wanted to understand why people give up on health tools, not just which ones they use. I spoke with three people at different life stages: a former PE student still invested in fitness, a professional bodybuilder and personal trainer, and a homemaker in her 50s active in a local wellness community but unfamiliar with digital tools. If a longevity product was going to work, it had to make sense for all of them.',
        participants: [
          {
            persona: 'College student · 20s',
            keyObservation: 'Felt overwhelmed by the volume of health metrics across multiple apps. Visible failure markers (empty streak gaps) triggered avoidance rather than re-engagement.',
            painPoint: 'Information overload and visible failure markers drove avoidance.',
          },
          {
            persona: 'Personal trainer · 20s',
            keyObservation: 'Found health metrics uninterpretable. Too many numbers with no clear hierarchy or meaning. Disengagement built gradually into full abandonment.',
            painPoint: 'Unreadable data and accumulated guilt led to app deletion.',
          },
          {
            persona: 'Full-time homemaker · 50s',
            keyObservation: 'Perceived digital health tools as inaccessible for her age group. Had already built her own offline longevity community as a workaround.',
            painPoint: 'Apps felt inaccessible. Community naturally filled the gap offline.',
          },
        ],
        insights: [
          { theme: 'Information overload', participantIndices: [0, 1] },
          { theme: 'Streak / guilt loop', participantIndices: [0, 1] },
          { theme: 'Community need', participantIndices: [2] },
        ],
        venn: {
          a: { label: 'Overwhelm', sub: 'too much data · unreadable metrics' },
          b: { label: 'Guilt loop', sub: 'streak breaks · app avoidance' },
          c: { label: 'Social gap', sub: 'isolation · no digital community' },
          zones: [
            { id: 'ab', heading: '01 · 02', sub: 'College student · Personal trainer' },
            { id: 'c',  heading: '03', sub: 'Homemaker' },
            { id: 'abc', heading: 'Apps fail people', sub: 'No tool connects daily action to long-term health' },
          ],
        },
        journeyMap: {
          steps: [
            { stage: 'Download', emotion: 'Motivated', sentiment: 2 },
            { stage: 'First week', emotion: 'Hopeful', sentiment: 1 },
            { stage: 'Overwhelm', emotion: 'Confused', sentiment: 0, note: 'Too many metrics' },
            { stage: 'Missed a day', emotion: 'Guilty', sentiment: -1, note: 'Streak broke' },
            { stage: 'Avoidance', emotion: 'Ashamed', sentiment: -2, note: 'Opened app less' },
            { stage: 'Abandon', emotion: 'Defeated', sentiment: -2, note: 'Deleted or stopped' },
          ],
        },
      },
      competitiveAnalysis: {
        competitors: ['WHOOP', 'Longevity.ai', 'Humanity', 'Rejuve.AI'],
        intro: 'All three participants ended up in the same place: they stopped using their health apps. But the reasons were different. Overwhelm, guilt, isolation. That raised a question I hadn\'t considered: was this a people problem, or were the apps themselves designed this way?',
        rows: [
          {
            feature: 'Longevity focus',
            cells: [
              { has: false, text: 'Performance-first; longevity is secondary' },
              { has: true, text: 'AI-driven biological age estimation' },
              { has: true, text: 'Biological age tracking validated in Nature Aging' },
              { has: true, text: 'Decentralized longevity research network' },
            ],
          },
          {
            feature: 'Behavior change',
            cells: [
              { has: false, text: 'No habit formation guidance' },
              { has: false, text: 'Tracking exists but no coaching' },
              { has: false, text: 'Limited guidance on what to change' },
              { has: false, text: 'No habit engine or scaffolding' },
            ],
          },
          {
            feature: 'Daily signal',
            cells: [
              { has: true, text: 'Daily scores, but athletic-framed' },
              { has: true, text: 'Daily wellness and meal feedback' },
              { has: true, text: 'Score updates, but link to actions is opaque' },
              { has: false, text: 'Not designed for daily feedback' },
            ],
          },
          {
            feature: 'Personalization',
            cells: [
              { has: true, text: 'Biometric-driven, no coaching' },
              { has: true, text: 'AI nutritionist adapts to data' },
              { has: false, text: 'Limited individual adaptation' },
              { has: true, text: 'AI insights from biomarker data' },
            ],
          },
          {
            feature: 'Community',
            cells: [
              { has: true, text: 'Social features, but competition-focused' },
              { has: false, text: 'No social features' },
              { has: false, text: 'No peer accountability' },
              { has: true, text: 'Community exists, but research-focused' },
            ],
          },
          {
            feature: 'Integrated experience',
            cells: [
              { has: false, text: 'Requires $239+ hardware' },
              { has: false, text: 'No unifying metric' },
              { has: false, text: 'No pathway from data to action' },
              { has: false, text: 'Research-focused, not daily action' },
            ],
          },
        ],
        closing: 'Every competitor solves one piece. A score, a supplement stack, a content feed. None of them connect what you do today to a longer arc that feels personally meaningful. That gap became the question I needed to answer.',
        sources: [
          { label: 'WHOOP 5.0 Healthspan', url: 'https://www.whoop.com/us/en/thelocker/whoop-body-healthspan/' },
          { label: 'WHOOP MG (BusinessWire)', url: 'https://www.businesswire.com/news/home/20250108270498/en/WHOOP-Launches-WHOOP-MG' },
          { label: 'Longevity.ai', url: 'https://longevity-ai.com/' },
          { label: 'Humanity Health', url: 'https://humanity.health/' },
          { label: 'Humanity (TechCrunch)', url: 'https://techcrunch.com/2024/05/07/humanity-health-app/' },
          { label: 'Rejuve.AI', url: 'https://rejuve.ai/' },
          { label: 'Rejuve.AI (Lifespan.io)', url: 'https://www.lifespan.io/topic/rejuve-ai/' },
        ],
      },
      secondaryResearch: {
        label: 'What the Research Says',
        intro: 'The question was clear. But **designing from intuition alone would mean guessing**. I went to the research to find out what actually works when people try to **change their health behavior**, and what **makes them stop**.',
        items: [
          {
            theme: 'Information Overload',
            title: 'More data, less engagement',
            body: 'High metric counts in mHealth apps reliably drive disengagement, not because users don\'t care, but because the cognitive cost of tracking competing numbers becomes too high. The pattern is structural: more dashboards, less return. Collapsing metrics into a single composite score preserves behavioral signal without the overwhelm.',
            citationQuote: 'Self-reporting through mHealth applications can be overwhelming and causes disengagement; high numbers of surveys were identified as a feature that decreases engagement with mHealth apps.',
            sources: [
              { label: 'Cognitive load & self-reporting burden in mHealth (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10785949/' },
            ],
          },
          {
            theme: 'Streak Punishment',
            title: 'Losing a streak feels like total failure',
            body: 'Loss aversion means the pain of a broken streak registers twice as strongly as an equivalent gain. The "what-the-hell effect" then takes over: one slip makes the whole day feel ruined, so people stop entirely. Research confirms this is the primary mechanism behind streak-driven app abandonment. Growth stages that don\'t reset break this cycle. Progress is preserved even when life interrupts.',
            citationQuote: 'People who tracked habits through streaks were significantly more likely to abandon their habits completely after missing a single day than those who tracked progress differently.',
            sources: [
              { label: 'Why most habit streaks fail (Moore Momentum)', url: 'https://mooremomentum.com/blog/why-most-habit-streaks-fail-and-how-to-build-ones-that-dont/' },
              { label: 'Habit streak motivation: when it helps, when it hurts (Cohorty)', url: 'https://blog.cohorty.app/habit-streak-motivation-when-it-helps-when-it-hurts-psychology-data/' },
            ],
          },
          {
            theme: 'Community & Accountability',
            title: 'Habits stick better with others',
            body: 'Research consistently finds that social accountability is one of the strongest predictors of long-term habit adherence: people maintain behaviors far more reliably when observed by or committed to a group. Yet most health apps treat the experience as purely individual. The absence of built-in social scaffolding is a consistent gap across the category.',
            citationQuote: 'Habits stick better with others; social accountability and shared progress are associated with higher adherence and long-term behavior maintenance.',
            sources: [
              { label: 'Social support & health behavior adherence (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4540293/' },
            ],
          },
        ],
      },
      mainPoints: {
        overview: 'One metric. Adaptive habits. No more dashboards.',
        problem: 'Too many tools, too much friction, too much guilt.',
        research: 'Simplify and support. Don\'t punish.',
        solution: 'One score, easy logging, gentle feedback.',
        results: 'One system. Less overwhelm. Habits that stick.',
        learned: 'Clarity and support beat more data.',
      },
      overview: [
        'Aika helps people live not just longer, but better.',
        'One number instead of many. Daily habits that actually stick. The design leans on research: less clutter (cognitive load), easier logging (adherence), and no punishment for missed days.',
      ],
      problem: [
        'People live longer, but don\'t feel better. The tools we use often add to the problem.',
        'Taking supplements regularly is hard. Studies show forgetting is the #1 reason people skip (~68% in some groups). Manual logging is tedious, so people stop.',
        'Too many apps, too little connection. Hundreds of thousands of health apps exist; switching between them causes fatigue. Longevity became a pile of hacks (supplements, wearables, Reddit) with no single place that ties it together.',
        'Many apps punish you for missing a day. When a streak breaks, a lot of users quit for good. Guilt makes consistency harder.',
      ],
      researchPoints: [
        'Too many numbers -> people tune out. One clear metric keeps people engaged.',
        'Streaks backfire: when they break, users often quit. Simpler tracking often wins.',
        'One story beats many tools. A single metric reduces the burden.',
        'Logging is where people drop off. Scan, voice, or type. Less typing, better adherence.',
        'Habits become automatic over time (~59-66 days in studies). Design for that: reinforce, then let the habit run on its own.',
      ],
      keyInsight:
        'One number. Support, not blame. Less friction to log.',
      designGoal:
        'To give people one place for healthspan: one number they can trust, habits that adapt to their life, and feedback that supports instead of shaming, so that staying healthy feels sustainable, not like a second job.',
      problemMoment: {
        title: 'Streak reset made people quit for good',
        body: "At first I assumed streak counters would motivate users. But research on loss aversion showed the opposite: when a streak breaks, the \"reset to zero\" feels like total failure, and many people abandon the habit entirely. So I stopped treating the streak number as the goal. I shifted to growth stages (Baby Seed -> Sprout Scout -> Leafy Rookie) that don't reset on a missed day, and reframed language from \"failed\" to \"slips.\" The aim was to keep people coming back instead of punishing them for being human.",
        beforeLabel: 'Before: streak resets to zero -> users quit',
        afterLabel: "After: identity-based stages that don't reset",
      },
      solutionHeadline: 'One score, easy logging, gentle feedback.',
      solutionIntro:
        'A single number that doesn\'t compete for attention. Habits that take seconds to track. Encouragement over guilt. Progress that survives a missed day.',
      solutionSections: [
        {
          number: '01',
          title: 'Aika Age',
          titleLine2: 'One number, less overwhelm',
          body: 'I mapped all logged behaviors onto a single biological-age score, Aika Age, so attention is never divided across competing numbers.',
          painPointOrigin: 'Too many metrics, no way to know if you\'re actually doing well. Tracking everything meant understanding nothing.',
          sourceType: 'interviews',
          beforeAfter: {
            before: 'Steps · Sleep · Heart rate · Supplements, all separate dashboards',
            after: 'One Aika Age score. Everything reflected in a single number',
          },
          rationale: 'Research shows display density is inversely correlated with return rate. Fewer indicators, higher retention.',
          thinkingProcess: [
            {
              label: 'Observation',
              content: 'When I started researching longevity, I searched for every metric that could affect healthspan, and the list never stopped growing. Steps, sleep, HRV, NMN intake, fasting windows, LDL, VO2 max. The more I looked, the more I realized: there was no shortage of things to track. The problem was something else entirely.',
            },
            {
              label: 'Thinking Process',
              content: 'If there are this many metrics, how is anyone supposed to know if they\'re actually doing well? You can\'t hold fifty numbers in your head and arrive at a conclusion. I realized that showing people more data wasn\'t the answer. It was the problem. What people needed wasn\'t a complete picture. They needed a single, legible signal: am I moving in the right direction today, or not?',
            },
            {
              label: 'Solution',
              content: 'That\'s what led me to Aika Age. Instead of displaying every metric separately, I collapsed them into one number: your biological age, recalculated daily based on what you actually did. A simple line graph that goes up or down. No interpretation needed. You can see at a glance whether today moved you forward.',
            },
          ],
          annotationImage: '/images/aika/aika-home-annotated.jpeg',
        },
        {
          number: '02',
          title: 'Gentle feedback',
          titleLine2: 'not punishment',
          body: '',
          painPointOrigin: 'Red marks and "missed" labels generated guilt in participants. They launched the app less frequently after any skipped entry.',
          sourceType: 'interviews',
          bodyParagraphs: [
            'When I looked at the most-used habit tracking apps \u2014 Habitica, MyFitnessPal, Apple Health \u2014 one pattern was everywhere: missed days were marked in red. A broken streak reset to zero. The interface made failure impossible to ignore.',
            'Research on drop-off patterns shows the critical moment isn\u2019t the first week. It\u2019s the day after a missed entry. People don\u2019t quit because the app is hard to use. They quit because opening it feels like walking into a room where their failures are displayed on the wall.',
            'That\u2019s when I realized the problem wasn\u2019t motivation \u2014 it was the feedback language itself. These apps were designed around compliance, not recovery. There was no way to slip and continue.',
          ],
          beforeAfter: {
            before: '\u2717 Failed \u00b7 3 days missed \u2014 feedback as judgment',
            after: 'A slip. You\u2019re still growing \u2014 feedback as coaching',
          },
          closingBody: 'I rewrote every failure indicator as \u2018slip,\u2019 surfaced accomplishments by default, and stripped all punitive copy from the interface. The daily view leads with Wins \u2014 what you did right \u2014 before surfacing anything that fell short.',
          image: '/images/aika/aika-daily.png',
          caption: 'Daily view: Insights (Aika Age change), Wins, and Nourish habit cards with contributors.',
        },
        {
          number: '03',
          title: 'Longevity Modes',
          titleLine2: 'Personalized philosophy, not one-size-fits-all',
          body: '',
          painPointOrigin: 'A single protocol alienated users whose scientific worldview didn\u2019t match the app\u2019s fixed assumption.',
          sourceType: 'research',
          bodyParagraphs: [
            'During interviews, one thing became clear quickly: people didn\u2019t just have different habits \u2014 they had different relationships with health itself. Some wanted only what was proven and safe, decades of research behind it before they\u2019d consider it. Others were already following cutting-edge protocols and wanted to push further. The same recommendation meant something completely different depending on who was receiving it.',
            'Rather than forcing everyone through the same entry point, I introduced three selectable philosophy modes \u2014 Traditional, Standard, Biohacker. Each one filters the habit library, coaching tone, and recommendations to match the worldview the user already trusts. The content doesn\u2019t change. What changes is the lens it\u2019s delivered through.',
          ],
          closingBody: 'Cho et al. (2021): perceived source credibility fully mediates the path from personalization to adoption. Where trust is absent, even well-aligned content yields zero behavioral uptake.',
          sources: [
            { label: 'Trust, personalization & adoption of smart healthcare (ScienceDirect)', url: 'https://www.sciencedirect.com/science/article/abs/pii/S0747563221003496' },
          ],
          image: '/images/aika/aika-longevity-modes.png',
          caption: 'Longevity Modes: Traditional (proven methods), Standard (science-backed), Biohacker (early-adopters & emerging research).',
          imageAspect: 'wide',
        },
        {
          number: '04',
          title: 'Tailored Habits',
          titleLine2: 'Auto-Adaptive Habit Lab',
          body: '',
          painPointOrigin: 'Faced with 50+ undifferentiated habits and no indication of order, users froze and picked nothing.',
          sourceType: 'research',
          bodyParagraphs: [
            'During interviews, I spoke with three people at completely different life stages \u2014 a college student in her 20s, a personal trainer in his 20s, and a homemaker in her 50s. Their daily routines, energy levels, body composition, and how their bodies responded to supplements and exercise were all fundamentally different. That\u2019s when I realized the assumption underneath most health apps \u2014 that the same starting point makes sense for everyone \u2014 was the core problem. Age, lifestyle, and individual physiology aren\u2019t minor variables. They determine whether a habit even has a chance of sticking.',
            'Giving everyone the same fifty habits in the same order meant the app was ignoring the person in front of it. And when I showed an undifferentiated habit list during interviews, participants didn\u2019t scroll through to find something that fit. They froze. No signal about where to start, no reason to believe any habit was meant for them \u2014 paralysis, not action.',
            'That realization drove the design. If the same habits couldn\u2019t work for everyone, the system itself had to adapt to the person \u2014 not the other way around. I redesigned the habit library as a personalized \u2018For you\u2019 shelf, where age, lifestyle mode, and logged behavior patterns determine what appears first. Every recommendation has a reason to be there.',
          ],
          closingBody: 'Iyengar & Lepper (2000): 6-item display \u2192 30% conversion; 24-item \u2192 3%. Attaching a quantifiable outcome to each entry reverses the inertia that unranked lists structurally produce.',
          image: '/images/aika/aika-add-habit.png',
          caption: 'Add Habit: Nourish and Move categories with impact on Aika Age (+0.X) and \u201cFor you\u201d / \u201cNew!\u201d labels.',
        },
        {
          number: '05',
          title: 'From Tracking to Autopilot',
          titleLine2: 'Habits graduate off the dashboard',
          body: '',
          painPointOrigin: 'Health apps framed every entry as an unending fixed obligation. The active queue grew longer, never shorter.',
          sourceType: 'research',
          bodyParagraphs: [
            'During interviews, all three participants described the same pattern. They started strong \u2014 opening the app daily, logging consistently. But over time, the list of things they had to check never got shorter. It kept growing. At some point, opening the app stopped feeling like progress and started feeling like obligation. The burden never lifted.',
            'That raised a question I hadn\u2019t seen any app answer: what happens when a habit is done? When someone has been taking NMN every morning for three months without thinking about it \u2014 why is the app still asking them to log it? Health apps weren\u2019t designed with an ending. Every behavior stayed active forever, regardless of whether it still needed attention.',
            'The research confirmed what the interviews suggested. Automaticity averages 66 days \u2014 after that, the behavior runs on its own. The gain curve is front-loaded: the first four weeks are where consistency matters most. After that, continued tracking adds friction without adding value.',
          ],
          beforeAfter: {
            before: 'Track every day, forever \u2014 the burden never lifts',
            after: 'Reinforce until automatic, then move the habit to the background',
          },
          closingBody: 'Lally et al. (2010): the average time to form a habit was 66 days, with a wide range (18\u2013254 days). Early repetitions produced the largest increases in automaticity; consistency matters more than perfection.',
          sources: [
            { label: 'How long does it take to form a habit? (UCL)', url: 'https://www.ucl.ac.uk/news/2009/aug/how-long-does-it-take-form-habit' },
            { label: 'Lally et al., habit formation (University of Surrey)', url: 'https://www.surrey.ac.uk/news/does-it-really-take-66-days-form-habit-we-asked-expert-dr-pippa-lally' },
          ],
          image: '/images/aika/aika-reinforcement.png',
          caption: 'Habit detail: Reinforcement phase with James Clear model, progress to automatic behavior, and log calendar (green = done, red = slips).',
        },
        {
          number: '06',
          title: 'Remove Logging Friction',
          titleLine2: 'Snap, Talk, Type',
          body: '',
          painPointOrigin: 'Entering every dose and activity by hand was so tedious that participants dropped the routine rather than complete the form.',
          sourceType: 'interviews',
          bodyParagraphs: [
            'When I looked into why people abandon health apps, the answer wasn\u2019t what I expected. It wasn\u2019t that the features were wrong or the design was confusing. The most common reason people stopped logging was simpler than that: the input itself was too much effort.',
            'Not once \u2014 but every single day.',
            'Across mHealth research, self-reporting burden is consistently identified as the primary driver of drop-off \u2014 not motivation, not forgetting. When logging feels like a chore, people stop opening the app entirely.',
            'The math was simple: if someone has to log three supplements, a meal, and a workout every day \u2014 that\u2019s potentially five separate manual entries. That\u2019s not a habit. That\u2019s a job. The only way to make daily logging sustainable was to make it faster than the resistance to do it.',
            'I replaced the text-input path with three parallel modes \u2014 Snap, Talk, Type \u2014 so the fastest route is always within a single tap.',
          ],
          closingBody: 'Among the many reasons people give for not adhering to medications, forgetfulness is the most common. Reducing the burden of self-report and manual entry supports sustained adherence.',
          sources: [
            { label: 'Memory strategies & medication adherence (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3788075/' },
            { label: 'Barriers to medication adherence & digital health (JMIR)', url: 'https://humanfactors.jmir.org/2021/4/e30786/' },
          ],
          image: '/images/aika/aika-logging.png',
          caption: 'Snap: take photo or scan barcode to log supplements (e.g. product identified and add in one tap).',
          imageAspect: 'device',
          video: '/videos/aika-scan-demo.mp4',
        },
        {
          number: '07',
          title: 'Aika Coach',
          titleLine2: 'Context-aware guidance, not generic advice',
          body: '',
          painPointOrigin: 'Generic recommendations bore no trace of what the user had done that morning. People ignored them entirely.',
          sourceType: 'research',
          bodyParagraphs: [
            'When I started designing the Coach, I looked at how existing AI health assistants worked. The pattern was consistent: ask a question, get an answer. The answers were technically accurate. But they had no idea what the user had done that morning \u2014 what they\u2019d taken, how long they\u2019d fasted, how much water they\u2019d had. So the advice was always the same. \u2018Drink more water. Exercise regularly.\u2019 Accurate. Useless.',
            'That raised a question: what actually makes health advice feel trustworthy? I assumed it was accuracy \u2014 cite the right studies, give the right numbers. But the research pointed somewhere else entirely. Trust in AI health coaching isn\u2019t determined by factual correctness. The answer was simpler \u2014 and more human \u2014 than I expected.',
            'I built the Coach to ingest that session\u2019s logged data first \u2014 NMN intake, hydration, fasting window \u2014 and output guidance only when each prompt can be directly tied to those inputs. If the data isn\u2019t there, the Coach doesn\u2019t guess. Generic advice isn\u2019t just unhelpful. It actively erodes trust.',
          ],
          closingBody: 'Cho et al. (2024): among all measured variables, personalization and carefulness show the strongest correlation with trust and adoption in AI health applications. Perceived fit between response and context \u2014 not factual accuracy \u2014 determines uptake.',
          sources: [
            { label: 'Personalization, carefulness & trust in AI health advice (ScienceDirect)', url: 'https://ideas.repec.org/a/eee/teinso/v79y2024ics0160791x24002744.html' },
          ],
          image: '/images/aika/aika-coach.png',
          caption: 'Aika Coach: personalized, context-aware advice based on logs (e.g. NMN, hydration, fasting) with clinical references and follow-up.',
        },
        {
          number: '08',
          title: 'Streaks that don\u2019t reset',
          titleLine2: 'Identity over a number',
          body: '',
          painPointOrigin: 'Each overlooked day erased all accumulated progress. Most people who reached that point never came back.',
          sourceType: 'interviews',
          bodyParagraphs: [
            'Changing the language helped. But the number was still there. And when it hit zero, none of the words mattered.',
            'The real problem wasn\u2019t how failure felt. It was what people thought they were building toward. A streak counter tells you how many days in a row you did something. It says nothing about who you\u2019re becoming.',
            'And numbers, it turns out, are very easy to lose.',
            'And loss aversion research is clear: a setback registers roughly twice as intensely as an equivalent gain. The moment a 7-day streak hits zero, it doesn\u2019t feel like starting over \u2014 it feels like everything was taken away. Most people don\u2019t restart. They leave.',
            'What I needed wasn\u2019t a more forgiving counter. I needed to replace the counter entirely \u2014 with something that couldn\u2019t be reset, because it wasn\u2019t measuring days. It was measuring growth. Not \u2018how long have you kept this up\u2019 but \u2018who are you becoming through this practice.\u2019',
            'I replaced the numeric streak with named growth stages \u2014 Baby Seed, Sprout Scout, Leafy Rookie \u2014 that advance on consistency, not perfection, and survive any single skipped session. The stages communicate identity and direction. You\u2019re not a number that can shatter. You\u2019re something that\u2019s growing.',
          ],
          beforeAfter: {
            before: '7-day streak \u2192 missed one day \u2192 back to zero \u2192 quit entirely',
            after: 'Baby Seed \u2192 Sprout Scout. Growth stages that survive a missed day',
          },
          closingBody: 'Loss aversion: a setback registers ~2\u00d7 as intensely as an equivalent gain. Identity-based framing shifts the goal from perfection to consistency \u2014 from a number that can shatter to a self that is growing.',
          image: '/images/aika/aika-streak.png',
          caption: 'Streak progression: Baby Seed \u2192 Sprout Scout \u2192 Leafy Rookie with identity-based milestones.',
        },
        {
          number: '09',
          title: 'Aika Circles',
          titleLine2: 'Community Layer',
          body: '',
          painPointOrigin: 'From participant interview — a homemaker who built her own offline accountability group',
          sourceType: 'interviews',
          bodyParagraphs: [
            'One participant stood out. A homemaker in her 50s who had tried every tracking app and abandoned each one within weeks. But she hadn\u2019t given up on her health goals. She\u2019d done something else entirely: she\u2019d organized a small group of neighbors who met weekly to check in on each other\u2019s habits.',
            'She didn\u2019t need a better tracker. She needed people.',
            'That interview changed how I thought about the problem. Every design decision I\u2019d made assumed people would build habits alone \u2014 but this participant had already answered a question I hadn\u2019t thought to ask: why?',
            'Solo tracking puts the entire burden of motivation on the individual. But the mHealth literature is clear: structured accountability partnerships consistently outperform self-monitoring across age groups, behavior types, and population demographics. The effect isn\u2019t marginal \u2014 it\u2019s one of the strongest predictors of long-term adherence.',
            'I designed Aika Circles as the social layer of the product. Topic-based communities for shared interests. Habit Clubs for structured group accountability. Weekly challenges that create natural rhythms of participation. Verification badges so progress is visible and trust is built into the system. The connective tissue isn\u2019t bolted on \u2014 it\u2019s embedded in the product itself.',
          ],
          closingBody: 'Structured accountability partnerships significantly outperform solo self-monitoring in sustaining health behavior change, across population type, age bracket, and target behavior.',
          sources: [
            { label: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/' },
            { label: 'JMIR mHealth', url: 'https://mhealth.jmir.org/' },
          ],
          image: '/images/aika/aika-community.png',
          caption: 'Discover: Aika Community, trending threads, Habit Clubs, and Weekly Challenges with expert-led content.',
        },
      ],
      retrospective: 'Building Aika taught me that the hardest design problems aren\u2019t about interfaces. They\u2019re about **understanding why people give up**. Every feature in this project started with a moment where someone stopped trying, and the question I kept asking was: what would have kept them going?\n\nWhat surprised me most was how much the **research changed my direction**. I started thinking about dashboards and metrics. I ended up designing growth stages and community challenges. **The final product looks nothing like my first sketch**, and that\u2019s the point.\n\nIf I had more time, I would run **usability tests** with the Figma prototype to validate whether the Aika Age concept is as intuitive as the survey suggested. I\u2019d also explore **onboarding**: how do you explain a biological age score to someone who\u2019s never seen one?',
      results: [
        '**30-day retention rate.** Are users still opening the app after the novelty wears off?',
        '**Average logging time under 5 seconds.** Snap, Talk, Type needs to be faster than the resistance to log.',
        '**Habit graduation rate at 66 days.** The reinforcement system should produce automatic behavior, not endless tracking.',
        '**Weekly challenge participation.** Community features only work if people show up consistently.',
        '**Streak survival rate after a missed day.** Growth stages should prevent the abandonment spike that streak counters cause.',
        '**Aika Age comprehension on first view.** If users can\'t read the number instantly, the core metric fails.',
      ],
      learned: [
        '**Clarity beats more data.** One number wins.',
        '**Support beats punishment.** Identity beats a streak counter.',
        '**Less friction beats more features.** Scan, voice, gentle feedback.',
        '**Don\'t make the number the goal.** When a streak breaks, many quit.',
        '**Context-aware AI** and habit timelines (~66 days) should drive the product.',
      ],
    },
  },
  {
    slug: 'silentcues',
    name: 'SilentCues',
    tagline: '12 nonverbal acts. 3 layers of intervention. One tool to hear what they can\'t say.',
    client: 'Academic · Personal Project',
    tags: ['Elderly Care', 'Behavioral Design', 'UX Research', 'Mobile App'],
    description: 'A caregiver app that translates nonverbal behavioral cues from elderly residents into actionable emotional insights, reducing response time and improving quality of care in long-term care facilities.',
    thumbPath: '/images/silentcues/thumb.svg',
    heroPath: '/images/silentcues/thumb.svg',
    role: 'UX Researcher & Designer',
    timeline: 'Nov 2025',
    team: 'Solo Project',
    tools: 'Figma, Miro, Behavioral Observation',
    summary: 'Drawing from three years of firsthand nursing home experience and my grandfather\'s hospitalization, I designed a caregiver tool that maps 12 nonverbal behavioral cues to emotional states across three layers of intervention: Detect, Prevent, and Restore.',
    process: {
      discover: 'Reflected on 3 years of personal nursing home experience observing ~30 non-verbal elderly residents, and my grandfather\'s hospitalization.',
      research: 'Conducted structured behavioral observation, documenting 12 nonverbal cues organized into 4 categories (Autonomy, Protection, Connection, Withdrawal) and mapping them to emotional states.',
      insights: 'Caregivers missed critical emotional signals because they lacked a structured framework. Existing tools cover medical/logistics but none address emotional, behavioral, or identity dimensions.',
      ideation: 'Explored signal taxonomy systems, 3-layer intervention model (Detect, Prevent, Restore), and confinement cycle analysis.',
      design: 'Created a three-layer system: cue detection and logging, pattern-based prevention, and identity restoration features.',
      validation: 'Scenario-based testing with 5 caregivers showed estimated 30% reduction in response time. Further validation in progress.',
      iteration: 'Refined cue categories and 12-act taxonomy based on literature review (Goffman, Kitwood, Ulrich, Magai) and caregiver feedback.',
    },
    results: 'Scenario-based testing (n=5) showed an estimated 30% reduction in caregiver response time.',
    learned: 'The most powerful design insights come from lived experience, not just interviews. The most critical signals are the ones patients are actively trying not to send.',
    caseStudy: {
      subtitle: 'Designing a nonverbal communication bridge between elderly residents and their caregivers.',
      duration: 'Nov 2025 (4 weeks)',
      role: 'UX Researcher & Designer',
      originStory: [
        'My grandfather insisted on walking the corridor even when he could barely stand. He sat near the window for hours, always facing outside. He pretended not to be in pain when doctors did rounds. He wanted to be discharged. These were not random behaviors. They were acts of a person fighting to remain a person inside a system that had already decided he was a patient.',
        'After his hospitalization, I spent three years in and around a nursing home. Not as a caregiver or a researcher. Just as someone who kept showing up. Over time, I observed roughly 30 residents. I saw the same patterns repeat: residents insisted on corridor walks through the two connected buildings, back and forth, every day. When visitors came, residents appeared energetic at first, but fatigue showed as time passed. The performance had a shelf life.',
        'I started writing these patterns down. Not because anyone asked me to, but because I realized I was the only one noticing. The nurses were overworked. The system was not built to capture what could not be spoken. When I got to UCLA and started studying cognitive science, I finally had a name for what I had been doing: behavioral observation. And I knew exactly what I wanted to design.',
      ],
      hmwQuestion: 'How might we help caregivers understand what non-verbal elderly residents are feeling, before it becomes a crisis?',
      primaryResearch: {
        label: 'Discovery',
        participants: [
          {
            persona: 'Nurse, 8 years in elderly care',
            keyObservation: 'Relies on routine checks, not behavioral reading. Misses emotional shifts between rounds.',
            painPoint: '"By the time I notice something\'s wrong, it\'s already been hours."',
          },
          {
            persona: 'Nursing aide, 2 years experience',
            keyObservation: 'Notices behavioral changes but lacks confidence to act on intuition.',
            painPoint: '"I feel like something is off, but I don\'t know how to explain it to the team."',
          },
          {
            persona: 'Family caregiver, caring for parent',
            keyObservation: 'Knows the person deeply but can\'t transfer that knowledge to professional staff.',
            painPoint: '"I know what my mom\'s face means, but the night shift doesn\'t."',
          },
        ],
        journeyMap: {
          steps: [
            { stage: 'Resident shows subtle cue', emotion: 'Unnoticed', sentiment: 0, note: 'Blanket gripping, gaze shift, finger tapping' },
            { stage: 'Caregiver on routine round', emotion: 'Focused on tasks', sentiment: 0, note: 'Checking vitals, medications' },
            { stage: 'Cue escalates', emotion: 'Discomfort builds', sentiment: -1, note: 'Resident becomes agitated or withdrawn' },
            { stage: 'Caregiver notices change', emotion: 'Concern', sentiment: -1, note: '"Something seems off today"' },
            { stage: 'Response attempt', emotion: 'Guessing', sentiment: -2, note: 'Trial and error without context' },
            { stage: 'Resolution (delayed)', emotion: 'Relief but guilt', sentiment: 1, note: '"I wish I caught it earlier"' },
          ],
        },
        venn: {
          a: { label: 'Missed Signals', sub: 'Cues go unnoticed between rounds' },
          b: { label: 'No Shared Language', sub: 'Intuition can\'t be transferred' },
          c: { label: 'Delayed Response', sub: 'Hours pass before action' },
          zones: [
            { id: 'a', heading: 'Observation Gap', sub: 'Caregivers lack tools to read behavior' },
            { id: 'b', heading: 'Knowledge Silo', sub: 'Personal insight stays personal' },
            { id: 'c', heading: 'Time Cost', sub: 'Slow response harms resident wellbeing' },
            { id: 'abc', heading: 'Core Problem', sub: 'No system connects cues to care' },
          ],
        },
      },
      competitiveAnalysis: {
        competitors: ['CareNote', 'Birdie', 'Honor', 'CareZone', 'Medisafe', 'CarePredict'],
        intro: 'I looked at six of the most prominent tools in elder care technology. Every one covers medical and logistical dimensions. None touch the emotional, behavioral, or identity dimensions of care.',
        rows: [
          {
            feature: 'Medical charting',
            cells: [
              { has: true, text: 'Core feature' },
              { has: true, text: 'Visit-based' },
              { has: false, text: 'Not a care tool' },
              { has: true, text: 'Medication lists' },
              { has: true, text: 'Pill tracking' },
              { has: true, text: 'Activity logs' },
            ],
          },
          {
            feature: 'Nonverbal cue recognition',
            cells: [
              { has: false, text: 'Not addressed' },
              { has: false, text: 'Not addressed' },
              { has: false, text: 'Not addressed' },
              { has: false, text: 'Not addressed' },
              { has: false, text: 'Not addressed' },
              { has: false, text: 'Not addressed' },
            ],
          },
          {
            feature: 'Emotional state mapping',
            cells: [
              { has: false, text: 'Not addressed' },
              { has: false, text: 'Not addressed' },
              { has: false, text: 'Not addressed' },
              { has: false, text: 'Not addressed' },
              { has: false, text: 'Not addressed' },
              { has: false, text: 'Not addressed' },
            ],
          },
          {
            feature: 'Identity preservation',
            cells: [
              { has: false, text: 'Not addressed' },
              { has: false, text: 'Not addressed' },
              { has: false, text: 'Not addressed' },
              { has: false, text: 'Not addressed' },
              { has: false, text: 'Not addressed' },
              { has: false, text: 'Not addressed' },
            ],
          },
          {
            feature: 'Environmental intervention',
            cells: [
              { has: false, text: 'Not addressed' },
              { has: false, text: 'Not addressed' },
              { has: false, text: 'Not addressed' },
              { has: false, text: 'Not addressed' },
              { has: false, text: 'Not addressed' },
              { has: false, text: 'Not addressed' },
            ],
          },
        ],
        closing: 'Every tool asks: is the patient medically stable? No tool asks: is the person emotionally present?',
      },
      secondaryResearch: {
        label: 'The Science',
        intro: 'Every design decision in SilentCues is grounded in published research. These are not assumptions. They are **documented realities**.',
        items: [
          {
            theme: 'Total Institutions',
            title: 'Mortification of self in institutional settings',
            body: 'Institutions systematically strip identity through admission procedures, uniform treatment, and removal of personal possessions. The self is dismantled not by cruelty, but by routine.',
            citationQuote: 'The recruit comes with a presenting culture derived from a home world, a way of life and a round of activities taken for granted until the point of admission to the institution.',
            sources: [
              { label: 'Goffman, E. (1961). Asylums.', url: 'https://en.wikipedia.org/wiki/Asylums_(book)' },
            ],
          },
          {
            theme: 'Environmental Design',
            title: 'Window view study: environment as medicine',
            body: 'Patients recovering from surgery who had a window view of trees spent 7.96 days in the hospital vs 8.70 days for those facing a brick wall. Environment is not decoration. It is medicine.',
            citationQuote: 'Patients with the tree view had shorter postoperative hospital stays, received fewer negative evaluative comments in nurses\' notes, and took fewer potent analgesics.',
            sources: [
              { label: 'Ulrich, R. (1984). View through a window. Science.', url: 'https://pubmed.ncbi.nlm.nih.gov/6143402/' },
            ],
          },
          {
            theme: 'Emotional Reading Accuracy',
            title: 'Caregivers only 40-50% accurate reading emotions',
            body: 'Professional caregivers correctly identified the emotional states of nonverbal elderly patients less than half the time. The gap is not about effort. It is about the absence of a shared framework.',
            citationQuote: 'Nursing aides were able to correctly identify the emotional states of cognitively impaired residents only 40-50% of the time.',
            sources: [
              { label: 'Magai, C. et al. (1996). Emotional communication in dementia.', url: 'https://pubmed.ncbi.nlm.nih.gov/' },
            ],
          },
          {
            theme: 'Person-Centered Care',
            title: '"Problem behavior" as response to environment',
            body: 'What gets labeled as agitation, aggression, or non-compliance is often a rational response to an irrational situation. The behavior is not the problem. The environment is.',
            citationQuote: 'Much of what is labelled as problem behaviour in dementia can be understood as attempts to communicate unmet needs.',
            sources: [
              { label: 'Kitwood, T. (1997). Dementia Reconsidered.', url: 'https://en.wikipedia.org/wiki/Tom_Kitwood' },
            ],
          },
          {
            theme: 'Environmental Intervention',
            title: '50% reduction in psychotropic drugs, 25% reduction in mortality',
            body: 'Facilities that introduced pets, plants, and children into nursing homes saw dramatic reductions in medication use and death rates. The intervention was not medical. It was human.',
            sources: [
              { label: 'The Eden Alternative', url: 'https://www.edenalt.org/' },
            ],
          },
          {
            theme: 'Caregiver Wellbeing',
            title: '85% of long-term care workers experience compassion fatigue',
            body: 'Caregivers are not indifferent. They are depleted. The system burns through the people it depends on, then blames them for not caring enough.',
            sources: [
              { label: 'Compassion fatigue in long-term care', url: 'https://pubmed.ncbi.nlm.nih.gov/' },
            ],
          },
        ],
      },
      overview: [
        'SilentCues is a caregiver-facing mobile tool that provides a structured framework for logging, interpreting, and sharing nonverbal behavioral observations of elderly residents who cannot communicate verbally.',
        'The app maps 12 documented behavioral cues organized into 4 categories (Autonomy, Protection, Connection, Withdrawal) to emotional states, enabling faster and more accurate caregiver response through three layers of intervention: Detect, Prevent, and Restore.',
      ],
      problem: [
        'Elderly residents who cannot speak rely entirely on caregivers to interpret their needs. But most care systems are built around verbal communication and scheduled check-ins.',
        'Nonverbal cues like corridor walking, window gazing, pain suppression, or turning away carry meaning, but without a shared framework, these signals get lost between shift changes, staff rotations, and busy schedules.',
        'The problem is not a single failure. It is a self-reinforcing confinement cycle: person enters, environment strips identity, surrounded by patients only, cannot leave, psychological deterioration, physical symptoms, longer stay, repeat.',
      ],
      researchPoints: [
        'Structured observation of 12 nonverbal behavioral cues across ~30 elderly residents over 3 years',
        'Interviews with 3 caregivers (nurse, aide, family member) to understand observation gaps',
        'Literature review grounded in Goffman (1961), Ulrich (1984), Magai (1996), Kitwood (1997), and Eden Alternative research',
        'Competitive analysis of 6 elder care tools (CareNote, Birdie, Honor, CareZone, Medisafe, CarePredict) revealing complete absence of emotional/behavioral dimensions',
      ],
      keyInsight: 'These are not signals to detect. They are acts of resistance. Each one is a person saying: I am still here.',
      solutionHeadline: 'Three Layers of Intervention',
      solutionIntro: 'Most care tools operate at one level: documentation. SilentCues works at three. Each layer goes deeper, from recognizing what is happening to preventing what might happen to restoring what has been lost.',
      solutionSections: [
        {
          number: '01',
          title: 'Cue Taxonomy',
          body: '12 nonverbal behavioral cues organized into 4 categories (Autonomy, Protection, Connection, Withdrawal). Each cue includes a visual reference, observation context, and meaning interpretation. Caregivers match what they see to a structured signal.',
          beforeAfter: {
            before: '"She seems upset but I don\'t know why"',
            after: 'Blanket gripping + gaze aversion = anxiety (Category: Protection, logged and shared with team)',
          },
        },
        {
          number: '02',
          title: 'Quick Log',
          body: 'One-tap logging that takes under 10 seconds. Select the resident, tap the observed cue, add optional context. No typing required for the core action. Designed for caregivers who have 30 seconds between tasks, not 5 minutes.',
          beforeAfter: {
            before: 'Mental notes forgotten by end of shift',
            after: 'Structured log in 10 seconds, persists across shifts',
          },
        },
        {
          number: '03',
          title: 'Shift Handoff Card',
          body: 'An auto-generated summary for shift changes. Shows the last 8 hours of logged cues, any alerts triggered, and recommended watch items. The incoming caregiver starts informed, not blind.',
          beforeAfter: {
            before: '"Anything I should know?" "Not really"',
            after: 'Handoff card: 3 anxiety cues logged, pain indicator at 2pm, watch for evening agitation',
          },
        },
        {
          number: '04',
          title: 'Pattern Insight',
          body: 'Visual timeline showing behavioral patterns over days and weeks. Surfaces recurring cues, escalation patterns, and time-of-day correlations.',
          beforeAfter: {
            before: '"She\'s been off lately" (no data)',
            after: 'Anxiety cues increased 3x this week, peaking at 2-4pm',
          },
        },
        {
          number: '05',
          title: 'Environment Suggestion',
          body: 'When patterns point to environmental triggers, the system suggests changes: lighting, noise, room arrangement, visit timing.',
          beforeAfter: {
            before: 'Resident agitated every evening. No one connects it to the fluorescent lights.',
            after: 'System flags evening agitation pattern. Suggests dimming lights after 6pm.',
          },
        },
        {
          number: '06',
          title: 'Trigger Map',
          body: 'Maps which events, times, or people correlate with behavioral changes. Makes invisible patterns visible.',
          beforeAfter: {
            before: 'Trial and error. Same triggers, same crises, every week.',
            after: 'Map shows: agitation spikes after group meals. Adjust seating.',
          },
        },
        {
          number: '07',
          title: 'Life Profile',
          body: 'A living document of who this person is. Favorite music, career history, family names, habits from home. Filled by family, updated by staff.',
          beforeAfter: {
            before: 'Caregiver knows Room 204. Does not know the retired teacher who loved jazz.',
            after: 'Life Profile: Margaret, taught high school English, plays Coltrane every morning.',
          },
        },
        {
          number: '08',
          title: 'Outside Bridge',
          body: 'Structured ways to connect residents with life beyond the facility. Video calls scheduled around good hours. Photo slideshows. Letters from grandchildren.',
          beforeAfter: {
            before: 'Family visits once a week. No connection in between.',
            after: 'Granddaughter sends a voice message every Tuesday. Staff plays it during her calm window.',
          },
        },
        {
          number: '09',
          title: 'Daily Anchor',
          body: 'One small daily routine that belongs to the resident, not the institution. A cup of tea at their chosen time. A walk in their preferred direction. Agency over one thing.',
          beforeAfter: {
            before: 'Every moment scheduled by the facility. No choices that belong to the resident.',
            after: 'Margaret chooses her morning tea time. Staff protects that 15-minute window.',
          },
        },
      ],
      retrospective: 'This project is the most personal one I have done. It did not start with a design brief or a class assignment. It started with **sitting next to someone who could not tell me they were in pain**.\n\nThe hardest part was not the design. It was translating something I understood intuitively into a system that **someone else could use**. That is what I learned most from this project: **the gap between noticing and communicating is where design lives**.\n\nThe 12 Acts taxonomy changed how I think about nonverbal behavior. These are not symptoms to be diagnosed. They are **acts of resistance by people who have been stripped of every other form of agency**. Corridor walking is not wandering. Window gazing is not disorientation. Pain suppression is not stoicism. Each behavior is a person insisting: I am still here.\n\nIf I had more time, I would want to test this with actual nursing home staff over a 2-week period, not just scenario-based sessions. The real question is not whether the taxonomy is accurate. It is whether caregivers **trust it enough to change their behavior**.',
      results: [
        '**12 nonverbal cues** organized into 4 categories (Autonomy, Protection, Connection, Withdrawal) through 3 years of behavioral observation',
        '**3-layer intervention model** (Detect, Prevent, Restore) addressing the full confinement cycle, not just documentation',
        '**Estimated 30% reduction** in caregiver response time during scenario-based testing (n=5)',
        '**Shift handoff comprehension** improved: incoming caregivers reported feeling "significantly more prepared"',
        '**Cue logging time** under 10 seconds per entry, fitting into existing workflow gaps',
        '**Competitive gap identified**: 6 major tools analyzed, none addressing emotional or identity dimensions of care',
      ],
      learned: [
        '**Lived experience is research.** Three years in nursing homes gave me data no survey could replicate.',
        '**Taxonomy must be learnable.** 12 cues across 4 categories is the limit before cognitive overload.',
        '**Trust is the real design challenge.** A tool is only useful if caregivers believe it.',
        '**Handoffs are design moments.** The shift change is where information dies or lives.',
        '**Gentle alerts beat alarms.** Nudges get checked. Alarms get silenced.',
        '**Identity is not a feature. It is the foundation.** The Restore layer matters more than the Detect layer.',
      ],
    },
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
