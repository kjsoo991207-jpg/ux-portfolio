// Inline SVG visualizations for each secondary research theme.
// Uses representative directional data — not exact study figures.

function EngagementDropChart() {
  // Information Overload: fewer metrics → higher engagement
  const bars = [
    { label: '1–3 metrics', value: 82, note: 'high engagement' },
    { label: '4–7 metrics', value: 51, note: 'moderate' },
    { label: '8+ metrics', value: 24, note: 'drops off' },
  ]
  const maxVal = 100
  const barW = 52
  const gap = 36
  const chartH = 100
  const startX = 60

  return (
    <svg viewBox="0 0 340 160" className="w-full max-w-xs" aria-label="Engagement drops as metric count increases">
      {/* Y axis label */}
      <text x="8" y="18" fontSize="8" fill="#a3a3a3" fontFamily="system-ui,sans-serif">Engagement</text>

      {bars.map((bar, i) => {
        const x = startX + i * (barW + gap)
        const barH = (bar.value / maxVal) * chartH
        const barY = 20 + (chartH - barH)
        const isLast = i === bars.length - 1
        return (
          <g key={i}>
            <rect
              x={x}
              y={barY}
              width={barW}
              height={barH}
              fill={isLast ? '#0a0a0a' : '#d4d4d4'}
              rx="2"
            />
            {/* Percentage label */}
            <text x={x + barW / 2} y={barY - 6} textAnchor="middle" fontSize="10" fontWeight="500" fill={isLast ? '#0a0a0a' : '#737373'} fontFamily="system-ui,sans-serif">
              {bar.value}%
            </text>
            {/* X axis label */}
            <text x={x + barW / 2} y={138} textAnchor="middle" fontSize="8.5" fill="#737373" fontFamily="system-ui,sans-serif">
              {bar.label}
            </text>
            <text x={x + barW / 2} y={150} textAnchor="middle" fontSize="7.5" fill="#a3a3a3" fontFamily="system-ui,sans-serif">
              {bar.note}
            </text>
          </g>
        )
      })}

      {/* Baseline */}
      <line x1="48" y1="120" x2="310" y2="120" stroke="#e5e5e5" strokeWidth="1" />
      {/* Trend arrow */}
      <text x="300" y="60" fontSize="18" fill="#e5e5e5" fontFamily="system-ui,sans-serif">↘</text>
    </svg>
  )
}

function StreakAbandonmentChart() {
  // Streak Punishment: streak counter → much higher abandonment after a miss
  const pairs = [
    { label: 'Streak\ncounter', abandon: 68, color: '#0a0a0a' },
    { label: 'Flexible\ntracking', abandon: 18, color: '#d4d4d4' },
  ]
  const maxVal = 100
  const barW = 70
  const chartH = 100
  const startX = 60

  return (
    <svg viewBox="0 0 300 170" className="w-full max-w-xs" aria-label="Streak counters lead to higher abandonment after missing a day">
      <text x="8" y="18" fontSize="8" fill="#a3a3a3" fontFamily="system-ui,sans-serif">Abandoned after 1 miss</text>

      {pairs.map((bar, i) => {
        const x = startX + i * (barW + 70)
        const barH = (bar.abandon / maxVal) * chartH
        const barY = 20 + (chartH - barH)
        return (
          <g key={i}>
            <rect x={x} y={barY} width={barW} height={barH} fill={bar.color} rx="2" />
            <text x={x + barW / 2} y={barY - 6} textAnchor="middle" fontSize="12" fontWeight="500" fill={bar.color === '#0a0a0a' ? '#0a0a0a' : '#737373'} fontFamily="system-ui,sans-serif">
              {bar.abandon}%
            </text>
            {bar.label.split('\n').map((line, li) => (
              <text key={li} x={x + barW / 2} y={138 + li * 13} textAnchor="middle" fontSize="9" fill="#737373" fontFamily="system-ui,sans-serif">
                {line}
              </text>
            ))}
          </g>
        )
      })}

      <line x1="48" y1="120" x2="270" y2="120" stroke="#e5e5e5" strokeWidth="1" />

      {/* Comparison arrow */}
      <text x="148" y="80" textAnchor="middle" fontSize="11" fill="#d4d4d4" fontFamily="system-ui,sans-serif">3.8×</text>
      <line x1="138" y1="70" x2="118" y2="70" stroke="#e5e5e5" strokeWidth="1" markerEnd="url(#arr)" />
    </svg>
  )
}

function SocialAdherenceChart() {
  // Community: social accountability → higher 90-day adherence
  const bars = [
    { label: 'Solo\ntracking', value: 31, color: '#d4d4d4' },
    { label: 'With social\naccountability', value: 67, color: '#0a0a0a' },
  ]
  const maxVal = 100
  const barW = 70
  const chartH = 100
  const startX = 60

  return (
    <svg viewBox="0 0 300 170" className="w-full max-w-xs" aria-label="Social accountability improves 90-day habit adherence">
      <text x="8" y="18" fontSize="8" fill="#a3a3a3" fontFamily="system-ui,sans-serif">Adherence at 90 days</text>

      {bars.map((bar, i) => {
        const x = startX + i * (barW + 70)
        const barH = (bar.value / maxVal) * chartH
        const barY = 20 + (chartH - barH)
        return (
          <g key={i}>
            <rect x={x} y={barY} width={barW} height={barH} fill={bar.color} rx="2" />
            <text x={x + barW / 2} y={barY - 6} textAnchor="middle" fontSize="12" fontWeight="500" fill={bar.color === '#0a0a0a' ? '#0a0a0a' : '#737373'} fontFamily="system-ui,sans-serif">
              {bar.value}%
            </text>
            {bar.label.split('\n').map((line, li) => (
              <text key={li} x={x + barW / 2} y={138 + li * 13} textAnchor="middle" fontSize="9" fill="#737373" fontFamily="system-ui,sans-serif">
                {line}
              </text>
            ))}
          </g>
        )
      })}

      <line x1="48" y1="120" x2="270" y2="120" stroke="#e5e5e5" strokeWidth="1" />

      {/* Up arrow */}
      <text x="148" y="72" textAnchor="middle" fontSize="11" fill="#d4d4d4" fontFamily="system-ui,sans-serif">+2×</text>
    </svg>
  )
}

export function ResearchViz({ theme }: { theme: string }) {
  if (theme === 'Information Overload') return <EngagementDropChart />
  if (theme === 'Streak Punishment') return <StreakAbandonmentChart />
  if (theme === 'Community & Accountability') return <SocialAdherenceChart />
  return null
}
