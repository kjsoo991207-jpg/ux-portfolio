import type { JourneyMap } from '@/content/projects'

// Sentiment → Y coordinate (viewBox height 260, y range 40–180)
function sentimentY(s: number): number {
  // +2 → y=40, 0 → y=110, -2 → y=180
  return 110 - s * 35
}

export function JourneyMapDiagram({ journeyMap }: { journeyMap: JourneyMap }) {
  const steps = journeyMap.steps
  const n = steps.length

  // X positions: spread evenly from 80 to 680
  const xs = steps.map((_, i) => 80 + (i * (680 - 80)) / (n - 1))
  const ys = steps.map((s) => sentimentY(s.sentiment))

  // Build polyline points string
  const points = xs.map((x, i) => `${x},${ys[i]}`).join(' ')

  return (
    <div className="mt-14">
      <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#767676] mb-10">
        Emotional journey — Participants 01 &amp; 02
      </p>
      <p className="text-sm text-neutral-400 mb-6 font-light">
        From first download to abandonment
      </p>
      <svg
        viewBox="0 0 760 270"
        className="w-full"
        aria-label="Emotional journey map from app download to abandonment"
      >
        {/* Neutral baseline */}
        <line x1="60" y1="110" x2="720" y2="110" stroke="#e5e5e5" strokeWidth="1" strokeDasharray="4 4" />
        <text x="50" y="114" textAnchor="end" fontSize="9" fill="#d4d4d4" fontFamily="system-ui,sans-serif">0</text>

        {/* Y axis labels */}
        <text x="50" y="44" textAnchor="end" fontSize="8" fill="#a3a3a3" fontFamily="system-ui,sans-serif">Motivated</text>
        <text x="50" y="184" textAnchor="end" fontSize="8" fill="#a3a3a3" fontFamily="system-ui,sans-serif">Defeated</text>

        {/* Journey line */}
        <polyline
          points={points}
          fill="none"
          stroke="#0a0a0a"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Dots and labels */}
        {steps.map((step, i) => {
          const x = xs[i]
          const y = ys[i]
          const isBelow = step.sentiment >= 0
          const emotionY = isBelow ? y - 14 : y + 22
          const stageY = 230

          return (
            <g key={i}>
              {/* Dot */}
              <circle
                cx={x}
                cy={y}
                r={4}
                fill={step.sentiment < 0 ? '#0a0a0a' : '#ffffff'}
                stroke="#0a0a0a"
                strokeWidth="1.5"
              />

              {/* Emotion label */}
              <text
                x={x}
                y={emotionY}
                textAnchor="middle"
                fontSize="9"
                fontWeight="500"
                fill="#0a0a0a"
                fontFamily="system-ui,sans-serif"
              >
                {step.emotion}
              </text>

              {/* Note (small, below emotion) */}
              {step.note && (
                <text
                  x={x}
                  y={emotionY + (isBelow ? -12 : 12)}
                  textAnchor="middle"
                  fontSize="8"
                  fill="#a3a3a3"
                  fontFamily="system-ui,sans-serif"
                >
                  {step.note}
                </text>
              )}

              {/* Stage label at bottom */}
              <text
                x={x}
                y={stageY}
                textAnchor="middle"
                fontSize="9"
                fill="#737373"
                fontFamily="system-ui,sans-serif"
                letterSpacing="0.05em"
              >
                {step.stage}
              </text>

              {/* Tick mark at stage label */}
              <line x1={x} y1="210" x2={x} y2="215" stroke="#e5e5e5" strokeWidth="1" />
            </g>
          )
        })}

        {/* X axis line */}
        <line x1="60" y1="210" x2="720" y2="210" stroke="#e5e5e5" strokeWidth="1" />
      </svg>
    </div>
  )
}
