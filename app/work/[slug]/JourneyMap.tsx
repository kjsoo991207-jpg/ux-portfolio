import type { JourneyMap } from '@/content/projects'

function sentimentY(s: number): number {
  return 160 - s * 55
}

const quoteTexts: Record<number, string> = {
  2: '"What does this number mean?"',
  3: '"I already ruined my streak"',
  5: '"I just deleted the app"',
}

export function JourneyMapDiagram({ journeyMap }: { journeyMap: JourneyMap }) {
  const steps = journeyMap.steps
  const n = steps.length

  const xs = steps.map((_, i) => 80 + (i * (640 - 80)) / (n - 1))
  const ys = steps.map((s) => sentimentY(s.sentiment))

  const breakIdx = steps.findIndex((s) => s.sentiment < 0)

  function buildPath(startIdx: number, endIdx: number): string {
    const pts = []
    for (let i = startIdx; i <= endIdx; i++) {
      pts.push({ x: xs[i], y: ys[i] })
    }
    if (pts.length < 2) return ''
    let d = `M ${pts[0].x},${pts[0].y}`
    for (let i = 0; i < pts.length - 1; i++) {
      const cx = (pts[i].x + pts[i + 1].x) / 2
      d += ` C ${cx},${pts[i].y} ${cx},${pts[i + 1].y} ${pts[i + 1].x},${pts[i + 1].y}`
    }
    return d
  }

  // Build area paths (line + close to bottom)
  function buildAreaPath(startIdx: number, endIdx: number, bottomY: number): string {
    const pts = []
    for (let i = startIdx; i <= endIdx; i++) {
      pts.push({ x: xs[i], y: ys[i] })
    }
    if (pts.length < 2) return ''
    let d = `M ${pts[0].x},${pts[0].y}`
    for (let i = 0; i < pts.length - 1; i++) {
      const cx = (pts[i].x + pts[i + 1].x) / 2
      d += ` C ${cx},${pts[i].y} ${cx},${pts[i + 1].y} ${pts[i + 1].x},${pts[i + 1].y}`
    }
    d += ` L ${pts[pts.length - 1].x},${300} L ${pts[0].x},${300} Z`
    return d
  }

  const positivePath = buildPath(0, breakIdx)
  const negativePath = buildPath(breakIdx, n - 1)
  const positiveArea = buildAreaPath(0, breakIdx, 200)
  const negativeArea = buildAreaPath(breakIdx, n - 1, 200)

  return (
    <div className="mt-14">
      <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-400 mb-10">
        Emotional journey — Participants 01 &amp; 02
      </p>
      <p className="text-sm text-neutral-400 mb-6 font-light">
        From first download to abandonment
      </p>
      <svg
        viewBox="0 0 720 360"
        className="w-full"
        aria-label="Emotional journey map from app download to abandonment"
      >
        <defs>
          <linearGradient id="blue-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="coral-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E85555" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#E85555" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Neutral baseline */}
        <line x1="60" y1="160" x2="680" y2="160" stroke="#e5e5e5" strokeWidth="1" strokeDasharray="4 4" />

        {/* Y axis labels */}
        <text x="50" y="54" textAnchor="end" fontSize="8" fill="#34d399" fontFamily="system-ui,sans-serif" fontWeight="500">Motivated</text>
        <text x="50" y="274" textAnchor="end" fontSize="8" fill="#E85555" fontFamily="system-ui,sans-serif" fontWeight="500">Defeated</text>

        {/* Area fills */}
        <path d={positiveArea} fill="url(#blue-fade)" />
        <path d={negativeArea} fill="url(#coral-fade)" />

        {/* Lines */}
        <path d={positivePath} fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
        <path d={negativePath} fill="none" stroke="#E85555" strokeWidth="2.5" strokeLinecap="round" />

        {/* Dots, labels, quotes */}
        {steps.map((step, i) => {
          const x = xs[i]
          const y = ys[i]
          const isPositive = step.sentiment >= 0
          const dotColor = isPositive ? '#34d399' : '#E85555'
          const quote = quoteTexts[i]
          const stageY = 330

          return (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r={5}
                fill={isPositive ? '#fff' : dotColor}
                stroke={dotColor}
                strokeWidth="2"
              />
              <text
                x={x}
                y={isPositive ? y - 14 : y + 20}
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fill={dotColor}
                fontFamily="system-ui,sans-serif"
              >
                {step.emotion}
              </text>
              {quote && (
                <text
                  x={x}
                  y={isPositive ? y - 26 : y + 32}
                  textAnchor="middle"
                  fontSize="8"
                  fill="#999"
                  fontFamily="system-ui,sans-serif"
                  fontStyle="italic"
                >
                  {quote}
                </text>
              )}
              <text
                x={x}
                y={stageY}
                textAnchor="middle"
                fontSize="8"
                fill="#737373"
                fontFamily="system-ui,sans-serif"
              >
                {step.stage}
              </text>
              <line x1={x} y1="310" x2={x} y2="315" stroke="#e5e5e5" strokeWidth="1" />
            </g>
          )
        })}

        <line x1="60" y1="310" x2="680" y2="310" stroke="#e5e5e5" strokeWidth="1" />
      </svg>
    </div>
  )
}
