import type { CaseStudyContent, ProcessSection } from '@/content/projects'
import type { Project } from '@/content/projects'

// ─── iPhone device frame ─────────────────────────────────────────────────────
const phoneSections = new Set(['01', '02', '05', '07', '08', '09'])

function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex justify-center">
      <div className="relative flex-shrink-0" style={{ width: 340 }}>
        {/* Screenshot behind frame */}
        <div className="absolute overflow-hidden" style={{ top: '1.5%', left: '4%', right: '4%', bottom: '1.5%', borderRadius: '28px', zIndex: 1 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="w-full h-full object-cover object-top" />
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
    </div>
  )
}

// ─── Active sections (excluding 04) ─────────────────────────────────────────
const activeSections = ['01', '02', '03', '04', '05', '06', '07', '08', '09']

// ─── Mockup images ───────────────────────────────────────────────────────────
const mockupImages: Record<string, string> = {
  '01': '/images/aika/aika-home-annotated.jpeg',
  '02': '/images/aika/aika-daily.png',
  '05': '/images/aika/aika-reinforcement.png',
  '06': '/images/aika/aika-logging.png',
  '07': '/images/aika/aika-coach.png',
  '08': '/images/aika/aika-streak.png',
  '09': '/images/aika/aika-community.png',
}

// ─── Sub-features per section ────────────────────────────────────────────────
const subFeatures: Record<string, { heading: string; desc: string }[]> = {
  '02': [
    { heading: 'Slip, Not Fail', desc: 'Every failure indicator rewritten as a slip. Language designed to support recovery, not enforce compliance.' },
    { heading: 'Wins First', desc: 'Daily view leads with what you did right before surfacing anything that fell short.' },
    { heading: 'Recovery-Centered', desc: 'Designed for the day after a miss, the moment most people quit for good.' },
  ],
  '03': [
    { heading: 'Philosophy Match', desc: 'Content filtered through the scientific worldview you already trust.' },
    { heading: 'Adaptive Recommendations', desc: 'Habit library, coaching tone, and suggestions all adjust to your selected mode.' },
    { heading: 'Same Science, Different Lens', desc: 'The underlying content stays the same. Only the delivery changes.' },
  ],
  '05': [
    { heading: '66-Day Reinforcement', desc: 'Habits follow a research-backed automaticity timeline with a defined finish line.' },
    { heading: 'Graduation System', desc: 'Habits move to background once they become automatic behavior. No more endless tracking.' },
    { heading: 'Shrinking Dashboard', desc: 'Your active queue gets shorter over time, not longer.' },
  ],
  '06': [
    { heading: 'Snap', desc: 'Take a photo or scan a barcode to log supplements instantly.' },
    { heading: 'Talk', desc: 'Voice input for hands-free logging on the go.' },
    { heading: 'Type', desc: 'Quick text entry when that is the fastest route.' },
  ],
  '07': [
    { heading: 'Context-First Responses', desc: 'Coach ingests today\'s logged data before generating any guidance.' },
    { heading: 'No Data, No Guess', desc: 'If the data is not there, the Coach stays silent rather than defaulting to generic advice.' },
    { heading: 'Trust Through Relevance', desc: 'Perceived fit between response and personal context determines whether advice is followed.' },
  ],
  '08': [
    { heading: 'Growth Stages', desc: 'Named stages like Baby Seed and Sprout Scout that reflect identity, not a count.' },
    { heading: 'Survives Missed Days', desc: 'Stages advance on consistency, not perfection. A single skip does not reset anything.' },
    { heading: 'Identity Over Number', desc: 'You are something growing, not a number that can shatter.' },
  ],
  '09': [
    { heading: 'Habit Clubs', desc: 'Join others working on the same habit. Share progress and stay visible to people who notice when you go quiet.' },
    { heading: 'Weekly Challenges', desc: 'Expert-led structured challenges with defined timelines, check-ins, and milestone goals.' },
    { heading: 'Trust Signals', desc: 'Verification badges surface consistent, reliable members so accountability comes from people you can trust.' },
  ],
}

// ─── Longevity Mode cards (section 03) ───────────────────────────────────────
const longevityCards = [
  {
    emoji: '\u{1F6E1}\uFE0F',
    title: 'Traditional',
    subtitle: 'Stick with what\'s proven',
    body: 'Only suggests routines backed by decades of research and long-term human studies.',
  },
  {
    emoji: '\u2696\uFE0F',
    title: 'Standard',
    subtitle: 'Science-backed, widely accepted',
    body: 'Mainstream health guidance grounded in current research. Evidence-based and more flexible.',
  },
  {
    emoji: '\u{1F9EC}',
    title: 'Biohacker',
    subtitle: 'For early-adopters',
    body: 'Latest longevity tech, emerging research, and protocols from figures like Bryan Johnson.',
  },
]

// ─── Before / After for section 06 ───────────────────────────────────────────
const loggingBeforeAfter = {
  before: '5 manual entries a day, every day',
  after: 'Snap / Talk / Type, done in under 3 seconds',
}

// ─── Color hierarchy paragraphs per section ──────────────────────────────────
const colorParagraphs: Record<string, { text: string; isKey: boolean }[][]> = {
  '03': [
    [
      { text: 'People don\u2019t just have different habits. They have different relationships with health itself.', isKey: false },
      { text: 'The same recommendation meant something completely different depending on who was receiving it. If the delivery didn\u2019t match the person\u2019s beliefs, even good content yielded zero behavioral uptake.', isKey: false },
    ],
    [
      { text: 'I introduced three selectable philosophy modes: Traditional, Standard, and Biohacker.', isKey: true },
      { text: 'The content doesn\u2019t change. What changes is the lens it\u2019s delivered through.', isKey: false },
    ],
  ],
  '05': [
    [
      { text: 'The list of things to check never got shorter. It kept growing. Opening the app stopped feeling like progress and started feeling like obligation.', isKey: false },
      { text: 'Health apps weren\u2019t designed with an ending. Every behavior stayed active forever.', isKey: true },
    ],
    [
      { text: 'Automaticity averages 66 days. I designed habits to graduate off the dashboard once they become automatic behavior.', isKey: true },
      { text: 'Your active queue gets shorter over time, not longer. A defined finish line, not an endless treadmill.', isKey: false },
    ],
  ],
  '06': [
    [
      { text: 'The most common reason people stopped logging wasn\u2019t bad features or confusing design.', isKey: false },
      { text: 'The input itself was too much effort. Five manual entries a day isn\u2019t a habit. It\u2019s a job.', isKey: true },
    ],
    [
      { text: 'I replaced text input with three parallel modes: Snap (photo or barcode), Talk (voice input), and Type (quick text).', isKey: true },
      { text: 'The fastest route is always within a single tap.', isKey: false },
    ],
  ],
  '07': [
    [
      { text: 'Existing AI health assistants gave technically accurate answers. But they had no idea what the user had done that morning.', isKey: false },
      { text: 'Trust in AI coaching isn\u2019t determined by accuracy. It\u2019s determined by perceived fit between response and personal context.', isKey: true },
    ],
    [
      { text: 'I built the Coach to ingest that session\u2019s logged data first, then output guidance only when tied to those inputs.', isKey: true },
      { text: 'If the data isn\u2019t there, the Coach doesn\u2019t guess. Generic advice actively erodes trust.', isKey: false },
    ],
  ],
  '08': [
    [
      { text: 'Changing the language helped. But the number was still there.', isKey: false },
      { text: 'A streak counter says nothing about who you\u2019re becoming. And when it hits zero, a setback registers twice as intensely as an equivalent gain.', isKey: true },
    ],
    [
      { text: 'I replaced the numeric streak with named growth stages: Baby Seed, Sprout Scout, Leafy Rookie.', isKey: true },
      { text: 'They advance on consistency, not perfection, and survive any single skip. You\u2019re not a number that can shatter. You\u2019re something that\u2019s growing.', isKey: false },
    ],
  ],
  '09': [
    [
      { text: 'Every design decision had assumed people would build habits alone.', isKey: false },
      { text: 'But structured accountability consistently outperforms self-monitoring. It\u2019s one of the strongest predictors of long-term adherence.', isKey: true },
    ],
    [
      { text: 'I designed Aika Circles as the social layer.', isKey: true },
      { text: 'Habit Clubs for group accountability. Weekly challenges for natural rhythms. Verification badges so trust is built into the system.', isKey: false },
    ],
  ],
}

function ColorHierarchyBlock({ paragraphs }: { paragraphs: { text: string; isKey: boolean }[][] }) {
  return (
    <div className="mt-6 space-y-4 max-w-[700px]">
      {paragraphs.map((segs, i) => (
        <p key={i}>
          <span className={segs[0].isKey ? 'text-[15px] font-bold leading-[1.7] text-[#111]' : 'text-[15px] leading-[1.7] text-[#767676]'}>{segs[0].text}</span>
          {segs[1] && <>{' '}<span className={segs[1].isKey ? 'text-[15px] font-bold leading-[1.7] text-[#111]' : 'text-[15px] leading-[1.7] text-[#767676]'}>{segs[1].text}</span></>}
        </p>
      ))}
    </div>
  )
}

// ─── iMessage mockup (section 01 only) ───────────────────────────────────────
function IMessageMockup() {
  return (
    <div className="max-w-[300px]">
      <div
        className="relative rounded-[48px] overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 50%, #151515 100%)',
          padding: 10,
          boxShadow: '0 12px 40px rgba(0,0,0,0.18), 0 0 0 0.5px rgba(255,255,255,0.06)',
        }}
      >
        {/* Titanium edge */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[48px]"
          style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 30%)' }}
        />

        {/* Screen */}
        <div className="relative rounded-[38px] overflow-hidden bg-white">
          {/* Dynamic Island */}
          <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[80px] h-[22px] bg-black rounded-full z-10" />

          {/* Status bar */}
          <div className="flex items-end justify-between px-5 pt-[10px] pb-1">
            <span className="text-[11px] font-semibold text-black tracking-[-0.2px]">9:41</span>
            <div className="w-[80px]" />
            <div className="flex items-center gap-1">
              <svg width="15" height="11" viewBox="0 0 15 11" fill="#000">
                <rect x="0" y="7" width="2.4" height="4" rx="0.6" />
                <rect x="3.1" y="5" width="2.4" height="6" rx="0.6" />
                <rect x="6.2" y="3" width="2.4" height="8" rx="0.6" />
                <rect x="9.3" y="1" width="2.4" height="10" rx="0.6" opacity="0.38" />
              </svg>
              <svg width="14" height="11" viewBox="0 0 14 11" fill="#000">
                <path d="M7 8.5a1.2 1.2 0 1 1 0 2.4A1.2 1.2 0 0 1 7 8.5z" />
                <path d="M3.2 5.8a5.4 5.4 0 0 1 7.6 0" stroke="#000" strokeWidth="1.3" fill="none" strokeLinecap="round" />
              </svg>
              <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
                <rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="#000" strokeOpacity="0.38" />
                <rect x="19" y="3.5" width="2.5" height="4" rx="1.2" fill="#000" fillOpacity="0.38" />
                <rect x="1.5" y="1.5" width="13" height="8" rx="1.5" fill="#000" />
              </svg>
            </div>
          </div>

          {/* iMessage nav bar */}
          <div className="text-center pt-2 pb-2.5 border-b border-[#e5e5ea]">
            <p className="text-[10px] text-[#8e8e93]">iMessage</p>
            <p className="text-[14px] font-semibold text-[#111]">Health Trackers</p>
            <p className="text-[10px] text-[#8e8e93]">4 people</p>
          </div>

          {/* Messages */}
          <div className="px-3 py-4 space-y-2.5" style={{ minHeight: 320 }}>
            <p className="text-[9px] text-[#8e8e93] text-center mb-3">Today 2:41 PM</p>

            {/* Incoming 1 */}
            <div className="flex items-end gap-1.5">
              <div className="w-5 h-5 rounded-full bg-[#c7c7cc] flex items-center justify-center flex-shrink-0">
                <span className="text-[8px] font-semibold text-white">S</span>
              </div>
              <div className="bg-[#e9e9eb] rounded-[18px] rounded-bl-[4px] px-3 py-2 max-w-[210px]">
                <p className="text-[12px] leading-[1.4] text-[#111]">
                  I track everything - steps, HRV, sleep, supplements. But I have no idea if I{'\u2019'}m actually getting healthier.
                </p>
              </div>
            </div>

            {/* Outgoing 1 */}
            <div className="flex justify-end">
              <div className="bg-[#007AFF] rounded-[18px] rounded-br-[4px] px-3 py-2 max-w-[210px]">
                <p className="text-[12px] leading-[1.4] text-white">
                  Right? Too many numbers. I don{'\u2019'}t even know which one actually matters {'\u{1F629}'}
                </p>
              </div>
            </div>

            {/* Incoming 2 */}
            <div className="flex items-end gap-1.5">
              <div className="w-5 h-5 rounded-full bg-[#FF9500] flex items-center justify-center flex-shrink-0">
                <span className="text-[8px] font-semibold text-white">M</span>
              </div>
              <div className="bg-[#e9e9eb] rounded-[18px] rounded-bl-[4px] px-3 py-2 max-w-[210px]">
                <p className="text-[12px] leading-[1.4] text-[#111]">
                  I just deleted the app. Opening it every day felt like looking at all my failures on a wall.
                </p>
              </div>
            </div>

            {/* Outgoing 2 */}
            <div className="flex justify-end">
              <div className="bg-[#007AFF] rounded-[18px] rounded-br-[4px] px-3 py-2 max-w-[210px]">
                <p className="text-[12px] leading-[1.4] text-white">
                  Same. I missed one day and my streak reset. Never opened it again {'\u{1F480}'}
                </p>
              </div>
            </div>
          </div>

          {/* Input bar */}
          <div className="flex items-center gap-2 px-3 py-2 border-t border-[#e5e5ea]">
            <div className="flex-1 bg-[#f2f2f7] rounded-full px-3 py-1.5">
              <span className="text-[12px] text-[#8e8e93]">iMessage</span>
            </div>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="9" stroke="#007AFF" strokeWidth="1.5" />
              <path d="M10 6v8M6 10h8" stroke="#007AFF" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Home indicator */}
          <div className="flex justify-center py-2">
            <div className="w-[90px] h-[4px] bg-black/20 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Shared components ───────────────────────────────────────────────────────
function SectionHeader({ sec, color }: { sec: ProcessSection; color?: string }) {
  return (
    <div className="mb-8">
      <span className="text-[15px] block mb-2" style={{ color: color || '#767676' }}>{sec.number}.</span>
      <h3 className="text-[36px] font-bold text-[#111] leading-[1.1]">{sec.title}</h3>
      {sec.titleLine2 && (
        <p className="text-[15px] text-[#888] mt-2">{sec.titleLine2}</p>
      )}
    </div>
  )
}

function SubFeatureList({ features }: { features: { heading: string; desc: string }[] }) {
  return (
    <div className="space-y-6 mt-8">
      {features.map((f, i) => (
        <div key={i}>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-[3px] h-[16px] bg-[#3478F6] rounded-full flex-shrink-0" />
            <p className="text-[14px] font-semibold text-[#111]">{f.heading}</p>
          </div>
          <p className="text-[13px] text-[#767676] leading-[1.7] ml-[11px]">{f.desc}</p>
        </div>
      ))}
    </div>
  )
}

function BeforeAfterCard({ before, after }: { before: string; after: string }) {
  return (
    <div className="grid grid-cols-[1fr_1px_1fr] bg-[#f7f7f7] rounded-lg overflow-hidden mb-6">
      <div className="py-5 px-5">
        <p className="text-[10px] uppercase tracking-[0.1em] text-[#767676] mb-2">Before</p>
        <p className="text-[15px] text-[#767676] line-through">{before}</p>
      </div>
      <div className="bg-[#e5e5e5]" />
      <div className="py-5 px-5">
        <p className="text-[10px] uppercase tracking-[0.1em] text-[#111] mb-2">After</p>
        <p className="text-[15px] text-[#111] font-medium">{after}</p>
      </div>
    </div>
  )
}

// ─── Data visualizations ─────────────────────────────────────────────────

function AbandonmentChart() {
  return (
    <div className="mt-10 max-w-[520px]">
      <p className="text-[15px] font-medium text-[#111] mb-6">Abandonment after missing one day</p>
      <div className="space-y-5">
        <div>
          <div className="flex justify-between mb-1.5">
            <span className="text-[15px] text-[#555]">Streak counter apps</span>
            <span className="text-[15px] font-medium text-[#111]">68%</span>
          </div>
          <div className="h-[6px] bg-[#f0f0f0] rounded-full overflow-hidden">
            <div className="h-full bg-[#111] rounded-full" style={{ width: '68%' }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1.5">
            <span className="text-[15px] text-[#555]">Flexible tracking</span>
            <span className="text-[13px] font-medium text-[#767676]">18%</span>
          </div>
          <div className="h-[6px] bg-[#f0f0f0] rounded-full overflow-hidden">
            <div className="h-full bg-[#ccc] rounded-full" style={{ width: '18%' }} />
          </div>
        </div>
      </div>
      <p className="text-[11px] text-[#bbb] mt-5">Moore Momentum · Cohorty</p>
    </div>
  )
}

function AutomaticityCurve() {
  return (
    <div className="mt-10 max-w-[560px]">
      <p className="text-[15px] font-medium text-[#111] mb-5">Habit automaticity over time</p>
      <svg viewBox="0 0 500 230" className="w-full" aria-label="S-curve showing habit automaticity increasing over 12 weeks">
        {/* Axes */}
        <line x1="60" y1="30" x2="60" y2="180" stroke="#e5e5e5" strokeWidth="1" />
        <line x1="60" y1="180" x2="470" y2="180" stroke="#e5e5e5" strokeWidth="1" />

        {/* Y axis labels */}
        <text x="52" y="38" textAnchor="end" fontSize="9" fill="#767676" fontFamily="system-ui, sans-serif">High</text>
        <text x="52" y="183" textAnchor="end" fontSize="9" fill="#767676" fontFamily="system-ui, sans-serif">Low</text>
        <text x="15" y="110" textAnchor="middle" fontSize="8" fill="#bbb" fontFamily="system-ui, sans-serif" transform="rotate(-90, 15, 110)">Automaticity</text>

        {/* Horizontal grid lines */}
        <line x1="60" y1="105" x2="470" y2="105" stroke="#f0f0f0" strokeWidth="1" strokeDasharray="3 4" />

        {/* X axis tick marks */}
        <line x1="80" y1="180" x2="80" y2="185" stroke="#ddd" strokeWidth="1" />
        <line x1="200" y1="180" x2="200" y2="185" stroke="#ddd" strokeWidth="1" />
        <line x1="340" y1="180" x2="340" y2="185" stroke="#ddd" strokeWidth="1" />
        <line x1="460" y1="180" x2="460" y2="185" stroke="#ddd" strokeWidth="1" />

        {/* X axis labels */}
        <text x="80" y="200" textAnchor="middle" fontSize="9" fill="#767676" fontFamily="system-ui, sans-serif">Week 1</text>
        <text x="200" y="200" textAnchor="middle" fontSize="9" fill="#767676" fontFamily="system-ui, sans-serif">Week 4</text>
        <text x="340" y="200" textAnchor="middle" fontSize="9" fill="#767676" fontFamily="system-ui, sans-serif">Week 8</text>
        <text x="460" y="200" textAnchor="middle" fontSize="9" fill="#767676" fontFamily="system-ui, sans-serif">Week 12</text>
        <text x="270" y="225" textAnchor="middle" fontSize="8" fill="#bbb" fontFamily="system-ui, sans-serif">(66 days)</text>

        {/* S-curve */}
        <path
          d="M 80 170 C 130 168, 180 160, 220 130 C 260 100, 300 50, 340 42 C 380 34, 430 32, 460 30"
          fill="none"
          stroke="#111"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Curve endpoint dots */}
        <circle cx="80" cy="170" r="3" fill="#fff" stroke="#111" strokeWidth="1.5" />
        <circle cx="460" cy="30" r="3" fill="#111" stroke="#111" strokeWidth="1.5" />

        {/* Dotted vertical line at ~week 9 */}
        <line x1="390" y1="36" x2="390" y2="180" stroke="#767676" strokeWidth="1" strokeDasharray="4 3" />

        {/* Annotation arrow + text */}
        <text fontSize="8" fill="#888" fontFamily="system-ui, sans-serif">
          <tspan x="398" y="95">Automaticity reached</tspan>
          <tspan x="398" y="107">habit graduates off dashboard</tspan>
        </text>
      </svg>
      <p className="text-[11px] text-[#bbb] mt-2">Lally et al. (2010) · UCL</p>
    </div>
  )
}

function AdherenceChart() {
  return (
    <div className="mt-10 max-w-[520px]">
      <p className="text-[15px] font-medium text-[#111] mb-6">Habit adherence at 90 days</p>
      <div className="space-y-5">
        <div>
          <div className="flex justify-between mb-1.5">
            <span className="text-[15px] text-[#555]">Solo tracking</span>
            <span className="text-[13px] font-medium text-[#767676]">31%</span>
          </div>
          <div className="h-[6px] bg-[#f0f0f0] rounded-full overflow-hidden">
            <div className="h-full bg-[#ccc] rounded-full" style={{ width: '31%' }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1.5">
            <span className="text-[15px] text-[#555]">With social accountability</span>
            <span className="text-[15px] font-medium text-[#111]">67%</span>
          </div>
          <div className="h-[6px] bg-[#f0f0f0] rounded-full overflow-hidden">
            <div className="h-full bg-[#111] rounded-full" style={{ width: '67%' }} />
          </div>
        </div>
      </div>
      <p className="text-[11px] text-[#bbb] mt-5">JMIR mHealth</p>
    </div>
  )
}

// ─── Design iteration (section 08) ──────────────────────────────────────────

function StreakIterationCard() {
  return (
    <div className="mt-10 mb-4">
      <p className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#111] mb-6"><span className="w-[3px] h-[16px] bg-[#3478F6] rounded-full inline-block"></span>Design iteration</p>
      <div className="grid grid-cols-[1fr_auto_1fr] gap-0 items-stretch">
        {/* Before */}
        <div className="bg-[#f7f7f7] rounded-l-lg p-6">
          <p className="text-[10px] uppercase tracking-[0.1em] text-[#767676] mb-4">Before</p>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {[1,2,3,4,5,6,7].map(d => (
                  <div key={d} className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center">
                    <span className="text-[8px] text-white font-medium">{d}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[15px] font-medium text-[#111] mt-3">Day 7</p>
            <div className="flex items-center gap-2 mt-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="#cc0000" strokeWidth="1.5" strokeLinecap="round" transform="rotate(45 8 8)" /></svg>
              <span className="text-[14px] text-[#cc0000]">Miss one day</span>
            </div>
            <div className="flex gap-1 mt-2">
              {[1,2,3,4,5,6,7].map(d => (
                <div key={d} className={`w-6 h-6 rounded-full ${d === 1 ? 'bg-[#ddd]' : 'border border-[#ddd]'} flex items-center justify-center`}>
                  <span className="text-[8px] text-[#767676] font-medium">{d === 1 ? '0' : ''}</span>
                </div>
              ))}
            </div>
            <p className="text-[13px] text-[#767676] line-through mt-2">Day 0</p>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex items-center px-4 bg-[#f7f7f7]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="#767676" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* After */}
        <div className="bg-[#f0f0e8] rounded-r-lg p-6">
          <p className="text-[10px] uppercase tracking-[0.1em] text-[#111] mb-4">After</p>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[20px]">{'\u{1F331}'}</span>
              <div>
                <p className="text-[15px] font-medium text-[#111]">Sprout Scout</p>
                <p className="text-[11px] text-[#888]">Week 2 of consistency</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="#cc0000" strokeWidth="1.5" strokeLinecap="round" transform="rotate(45 8 8)" /></svg>
              <span className="text-[14px] text-[#888]">Miss one day</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[20px]">{'\u{1F331}'}</span>
              <div>
                <p className="text-[15px] font-medium text-[#111]">Still Sprout Scout</p>
                <p className="text-[11px] text-[#3478F6]">Stage survives a single skip</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Section accent colors ──────────────────────────────────────────────────
const sectionColors: Record<string, string> = {
  '01': '#3478F6',
  '02': '#3478F6',
  '03': '#3478F6',
  '05': '#3478F6',
  '06': '#3478F6',
  '07': '#3478F6',
  '08': '#3478F6',
  '09': '#3478F6',
}

// ─── Main export ─────────────────────────────────────────────────────────────
export function SolutionContent({
  project,
  cs,
}: {
  project: Project
  cs: CaseStudyContent
}) {
  void project

  const sections = cs.solutionSections.filter((sec) =>
    activeSections.includes(sec.number),
  )

  return (
    <div>
      <p className="text-[15px] leading-[1.7] text-[#767676] max-w-[700px] -mt-4 pb-16">
        {cs.solutionIntro}
      </p>
      <div className="border-b border-[#e8e8e4] mb-20" />

      {sections.map((sec, idx) => {
        const features = subFeatures[sec.number]
        const img = mockupImages[sec.number]
        const accentColor = sectionColors[sec.number] || '#3478F6'

        // ── Aika Age (01): Problem → Thinking → Solution ──────────
        if (sec.number === '01') {
          return (
            <section key={sec.number} className={`max-w-[800px] mx-auto ${idx > 0 ? 'mt-[160px]' : ''}`}>
              {/* Section header */}
              <div className="mb-12">
                <span className="text-[15px] block mb-2" style={{ color: '#3478F6' }}>01.</span>
                <h3 className="text-[36px] font-bold text-[#111] leading-[1.1]">Aika Age</h3>
                <p className="text-[15px] text-[#888] mt-2">One number, less overwhelm</p>
              </div>

              {/* Context paragraphs */}
              <div className="mb-12 max-w-[700px]">
                <p className="text-[15px] leading-[1.7] text-[#767676]">
                  Fifty metrics. No clarity. <span className="font-bold text-[#111]">Aika Age collapses them all into one number: your biological age, recalculated daily.</span> One line graph. One answer: am I moving forward, or not?
                </p>
              </div>

              {/* Annotated image */}
              <div className="mt-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/aika/aika-age-annotated.jpeg" alt="Aika Age screen with annotations explaining each component" className="w-full h-auto rounded-xl" />
              </div>
            </section>
          )
        }

        // ── Gentle Feedback (02): color hierarchy + solution card ───
        if (sec.number === '02') {
          return (
            <section
              key={sec.number}
              className={`max-w-[800px] mx-auto ${idx > 0 ? 'mt-[160px]' : ''}`}
            >
              {/* Context */}
              <div className="mb-12 max-w-[700px]">
                <SectionHeader sec={sec} color={accentColor} />
                <p className="mt-6 text-[15px] leading-[1.7] text-[#767676]">
                  Every health app punished failure the same way: red marks, reset streaks. <span className="font-bold text-[#111]">I rewrote every failure indicator as &lsquo;slip,&rsquo; surfaced wins first, and stripped all punitive copy.</span>
                </p>
              </div>

              {/* Phone left + bullets right */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                {img && <PhoneFrame src={img} alt={sec.title} />}
                <div className="space-y-5 flex flex-col justify-center">
                  <div>
                    <p className="text-[14px] font-semibold text-[#111]">Slip, Not Fail</p>
                    <p className="text-[13px] text-[#767676] leading-[1.7] mt-1">Every failure indicator rewritten as a <span className="font-bold text-[#111]">recoverable slip</span>, not a permanent mark.</p>
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#111]">Wins First</p>
                    <p className="text-[13px] text-[#767676] leading-[1.7] mt-1">The daily view leads with <span className="font-bold text-[#111]">accomplishments</span> before surfacing anything that fell short.</p>
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#111]">Recovery-Centered</p>
                    <p className="text-[13px] text-[#767676] leading-[1.7] mt-1">All punitive copy stripped, replaced with <span className="font-bold text-[#111]">language that invites return</span>.</p>
                  </div>
                </div>
              </div>
            </section>
          )
        }

        // ── Tailored Habits (04): context + mockup left + bullets right ────────
        if (sec.number === '04') {
          return (
            <section
              key={sec.number}
              className={`max-w-[800px] mx-auto ${idx > 0 ? 'mt-[160px]' : ''}`}
            >
              <div className="mb-12 max-w-[700px]">
                <SectionHeader sec={sec} color={accentColor} />
                <p className="mt-6 text-[15px] leading-[1.7] text-[#767676]">
                  Showing everyone the same fifty habits meant ignoring the person. <span className="font-bold text-[#111]">Participants froze. No signal about where to start.</span> Research backs this: 6 options convert at 30%, 24 options drop to 3%. I redesigned the habit library as a personalized shelf with <span className="font-bold text-[#111]">impact scores</span> showing exactly how each habit affects your Aika Age.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                <div className="space-y-5 flex flex-col justify-center md:order-1">
                  <div>
                    <p className="text-[14px] font-semibold text-[#111]">&ldquo;For You&rdquo; Shelf</p>
                    <p className="text-[13px] text-[#767676] leading-[1.7] mt-1">Habits ranked by <span className="font-bold text-[#111]">age, mode, and behavior patterns</span>. No more scrolling through fifty options.</p>
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#111]">Impact Scores</p>
                    <p className="text-[13px] text-[#767676] leading-[1.7] mt-1">Each habit shows its <span className="font-bold text-[#111]">+0.X effect on Aika Age</span>, turning abstract choices into clear priorities.</p>
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#111]">Reduced Choice</p>
                    <p className="text-[13px] text-[#767676] leading-[1.7] mt-1">Only <span className="font-bold text-[#111]">relevant habits surface first</span>. The rest are available, not pushed.</p>
                  </div>
                </div>
                <div className="md:order-2"><PhoneFrame src="/images/aika/aika-add-habit-mockup.jpeg" alt="Add Habit screen with personalized For You recommendations" /></div>
              </div>
            </section>
          )
        }

        // ── Community (09): context + mockup + bullets ────────
        if (sec.number === '09') {
          return (
            <section
              key={sec.number}
              className={`max-w-[800px] mx-auto ${idx > 0 ? 'mt-[160px]' : ''}`}
            >
              <div className="mb-12 max-w-[700px]">
                <SectionHeader sec={sec} color={accentColor} />
                <p className="mt-6 text-[15px] leading-[1.7] text-[#767676]">
                  Every design decision had assumed people would build habits alone. <span className="font-bold text-[#111]">But structured accountability consistently outperforms self-monitoring. It&rsquo;s one of the strongest predictors of long-term adherence.</span>
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                <PhoneFrame src="/images/aika/aika-community-mockup.jpeg" alt="Aika community features" />
                <div className="space-y-5 flex flex-col justify-center">
                  <div>
                    <p className="text-[14px] font-semibold text-[#111]">Habit Clubs</p>
                    <p className="text-[13px] text-[#767676] leading-[1.7] mt-1">Join others working on the <span className="font-bold text-[#111]">same habit</span>. Shared progress, shared accountability.</p>
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#111]">Weekly Challenges</p>
                    <p className="text-[13px] text-[#767676] leading-[1.7] mt-1"><span className="font-bold text-[#111]">Time-bound goals</span> that create natural rhythms of participation.</p>
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#111]">Trust Signals</p>
                    <p className="text-[13px] text-[#767676] leading-[1.7] mt-1">Verification badges so accountability comes from <span className="font-bold text-[#111]">people you can trust</span>.</p>
                  </div>
                </div>
              </div>
            </section>
          )
        }

        // ── Streak / Growth Stages (08): context + mockup + bullets ────────
        if (sec.number === '08') {
          return (
            <section
              key={sec.number}
              className={`max-w-[800px] mx-auto ${idx > 0 ? 'mt-[160px]' : ''}`}
            >
              <div className="mb-12 max-w-[700px]">
                <SectionHeader sec={sec} color={accentColor} />
                <p className="mt-6 text-[15px] leading-[1.7] text-[#767676]">
                  Changing the language helped. But the number was still there. <span className="font-bold text-[#111]">A streak counter says nothing about who you&rsquo;re becoming. And when it hits zero, a setback registers twice as intensely as an equivalent gain.</span>
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                <div className="space-y-5 flex flex-col justify-center md:order-1">
                  <div>
                    <p className="text-[14px] font-semibold text-[#111]">Growth Stages</p>
                    <p className="text-[13px] text-[#767676] leading-[1.7] mt-1">Named stages like <span className="font-bold text-[#111]">Baby Seed and Sprout Scout</span> that reflect identity, not a count.</p>
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#111]">Survives Missed Days</p>
                    <p className="text-[13px] text-[#767676] leading-[1.7] mt-1">Stages advance on <span className="font-bold text-[#111]">consistency, not perfection</span>. A single skip doesn&rsquo;t reset anything.</p>
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#111]">Identity Over Number</p>
                    <p className="text-[13px] text-[#767676] leading-[1.7] mt-1">You&rsquo;re <span className="font-bold text-[#111]">something growing</span>, not a number that can shatter.</p>
                  </div>
                </div>
                <div className="md:order-2"><PhoneFrame src="/images/aika/aika-streak-mockup.jpeg" alt="Aika growth stages - Baby Seed, Sprout Scout, Leafy Rookie" /></div>
              </div>
            </section>
          )
        }

        // ── Coach (07): context + mockup + bullets ────────
        if (sec.number === '07') {
          return (
            <section
              key={sec.number}
              className={`max-w-[800px] mx-auto ${idx > 0 ? 'mt-[160px]' : ''}`}
            >
              <div className="mb-12 max-w-[700px]">
                <SectionHeader sec={sec} color={accentColor} />
                <p className="mt-6 text-[15px] leading-[1.7] text-[#767676]">
                  Existing AI health assistants gave technically accurate answers. But they had no idea what the user had done that morning. <span className="font-bold text-[#111]">Trust in AI coaching isn&rsquo;t determined by accuracy. It&rsquo;s determined by perceived fit between response and personal context.</span>
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                <PhoneFrame src="/images/aika/aika-coach-mockup.jpeg" alt="Aika Coach providing context-aware health guidance" />
                <div className="space-y-5 flex flex-col justify-center">
                  <div>
                    <p className="text-[14px] font-semibold text-[#111]">Context-First Responses</p>
                    <p className="text-[13px] text-[#767676] leading-[1.7] mt-1">Coach ingests <span className="font-bold text-[#111]">today&rsquo;s logged data</span> before generating any guidance.</p>
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#111]">No Data, No Guess</p>
                    <p className="text-[13px] text-[#767676] leading-[1.7] mt-1">If the data isn&rsquo;t there, the Coach <span className="font-bold text-[#111]">stays silent</span>. Generic advice actively erodes trust.</p>
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#111]">Trust Through Relevance</p>
                    <p className="text-[13px] text-[#767676] leading-[1.7] mt-1"><span className="font-bold text-[#111]">Perceived fit</span> between response and context determines whether advice is followed.</p>
                  </div>
                </div>
              </div>
            </section>
          )
        }

        // ── Logging (06): context + mockup + bullets ────────
        if (sec.number === '06') {
          return (
            <section
              key={sec.number}
              className={`max-w-[800px] mx-auto ${idx > 0 ? 'mt-[160px]' : ''}`}
            >
              <div className="mb-12 max-w-[700px]">
                <SectionHeader sec={sec} color={accentColor} />
                <p className="mt-6 text-[15px] leading-[1.7] text-[#767676]">
                  The most common reason people stopped logging wasn&rsquo;t bad features or confusing design. <span className="font-bold text-[#111]">The input itself was too much effort. Five manual entries a day isn&rsquo;t a habit. It&rsquo;s a job.</span>
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                <div className="space-y-5 flex flex-col justify-center md:order-1">
                  <div>
                    <p className="text-[14px] font-semibold text-[#111]">Snap</p>
                    <p className="text-[13px] text-[#767676] leading-[1.7] mt-1">Take a photo or <span className="font-bold text-[#111]">scan a barcode</span> to log supplements instantly.</p>
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#111]">Talk</p>
                    <p className="text-[13px] text-[#767676] leading-[1.7] mt-1"><span className="font-bold text-[#111]">Voice input</span> for hands-free logging on the go.</p>
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#111]">Type</p>
                    <p className="text-[13px] text-[#767676] leading-[1.7] mt-1">Quick text entry when that&rsquo;s the <span className="font-bold text-[#111]">fastest route</span>.</p>
                  </div>
                </div>
                <div className="md:order-2"><PhoneFrame src="/images/aika/hero-logging.jpeg" alt="Aika camera logging - snap a photo or scan a barcode" /></div>
              </div>
            </section>
          )
        }

        // ── From Tracking to Autopilot (05): context + mockup + bullets ────────
        if (sec.number === '05') {
          return (
            <section
              key={sec.number}
              className={`max-w-[800px] mx-auto ${idx > 0 ? 'mt-[160px]' : ''}`}
            >
              <div className="mb-12 max-w-[700px]">
                <SectionHeader sec={sec} color={accentColor} />
                <p className="mt-6 text-[15px] leading-[1.7] text-[#767676]">
                  Health apps weren&rsquo;t designed with an ending. Every habit stayed active forever. <span className="font-bold text-[#111]">Automaticity averages 66 days. I designed habits to graduate off the dashboard once they become automatic behavior.</span> Your queue gets shorter over time, not longer.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                <PhoneFrame src="/images/aika/aika-reinforcement-mockup.jpeg" alt="Take NMN habit detail showing reinforcement phase and graduation timeline" />
                <div className="space-y-5 flex flex-col justify-center">
                  <div>
                    <p className="text-[14px] font-semibold text-[#111]">66-Day Reinforcement</p>
                    <p className="text-[13px] text-[#767676] leading-[1.7] mt-1">Habits follow a <span className="font-bold text-[#111]">research-backed automaticity timeline</span> with a defined finish line.</p>
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#111]">Graduation System</p>
                    <p className="text-[13px] text-[#767676] leading-[1.7] mt-1">Habits move to background once they become <span className="font-bold text-[#111]">automatic behavior</span>. No more endless tracking.</p>
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#111]">Shrinking Dashboard</p>
                    <p className="text-[13px] text-[#767676] leading-[1.7] mt-1">Your active queue gets <span className="font-bold text-[#111]">shorter over time</span>, not longer. A finish line, not a treadmill.</p>
                  </div>
                </div>
              </div>
            </section>
          )
        }

        // ── Longevity Modes (03): context + annotated image ────────
        if (sec.number === '03') {
          return (
            <section
              key={sec.number}
              className={`max-w-[800px] mx-auto ${idx > 0 ? 'mt-[160px]' : ''}`}
            >
              <div className="mb-12 max-w-[700px]">
                <SectionHeader sec={sec} color={accentColor} />
                {colorParagraphs['03'] && (
                  <ColorHierarchyBlock paragraphs={colorParagraphs['03']} />
                )}
              </div>
              <div className="mt-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/aika/longevity-modes-annotated.png" alt="Three longevity modes: Traditional, Standard, and Biohacker" className="w-full h-auto rounded-xl" />
              </div>
            </section>
          )
        }

        // ── Unified: header + color hierarchy + solution card ────────
        return (
          <section
            key={sec.number}
            className={`max-w-[800px] mx-auto ${idx > 0 ? 'mt-[160px]' : ''}`}
          >
            {/* Header + color hierarchy paragraphs */}
            <div className="mb-12">
              <SectionHeader sec={sec} color={accentColor} />
              {colorParagraphs[sec.number] && (sec.number === '05' || sec.number === '08' || sec.number === '09') ? (
                <>
                  <ColorHierarchyBlock paragraphs={colorParagraphs[sec.number].slice(0, 2)} />
                  {sec.number === '05' && <AutomaticityCurve />}
                  {sec.number === '08' && <StreakIterationCard />}
                  {sec.number === '09' && <AdherenceChart />}
                  <ColorHierarchyBlock paragraphs={colorParagraphs[sec.number].slice(2)} />
                </>
              ) : (
                colorParagraphs[sec.number] && (
                  <ColorHierarchyBlock paragraphs={colorParagraphs[sec.number]} />
                )
              )}
            </div>

            {/* Section 03: Longevity mode cards */}
            {sec.number === '03' && (
              <div className="grid grid-cols-3 gap-4 mb-12">
                {longevityCards.map((card) => (
                  <div
                    key={card.title}
                    className="bg-[#fafafa] border border-[#ebebeb] rounded-xl p-5 text-center"
                  >
                    <span className="text-[28px] block mb-3">{card.emoji}</span>
                    <p className="text-[15px] font-semibold text-[#111]">{card.title}</p>
                    <p className="text-[14px] text-[#888] mt-1">{card.subtitle}</p>
                    <p className="text-[15px] text-[#666] leading-[1.6] mt-3">{card.body}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Solution card (2-column) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center justify-center">
              <div className="space-y-5 flex flex-col justify-center">
                {features?.map((f, i) => (
                  <div key={i}>
                    <p className="text-[14px] font-semibold text-[#111]">{f.heading}</p>
                    <p className="text-[13px] text-[#767676] leading-[1.7] mt-1">{f.desc}</p>
                  </div>
                ))}
              </div>
              <div>
                {sec.number === '06' && (
                  <BeforeAfterCard
                    before={loggingBeforeAfter.before}
                    after={loggingBeforeAfter.after}
                  />
                )}
                {img && phoneSections.has(sec.number) ? (
                  <PhoneFrame src={img} alt={sec.title} />
                ) : img ? (
                  <div className="rounded-xl overflow-hidden w-fit max-w-full mx-auto">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={sec.title} className="h-[70vh] w-auto max-w-full object-contain block" />
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}
