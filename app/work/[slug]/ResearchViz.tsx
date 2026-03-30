// Circular progress ring visualizations

function Ring({ value, color, size = 100 }: { value: number; color: string; size?: number }) {
  const strokeWidth = 6
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="flex-shrink-0">
      {/* Background ring */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#e8e8e4"
        strokeWidth={strokeWidth}
      />
      {/* Progress ring */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      {/* Center text */}
      <text
        x={size / 2}
        y={size / 2 + 1}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="22"
        fontWeight="700"
        fill="#34d399"
        fontFamily="system-ui,sans-serif"
      >
        {value}%
      </text>
    </svg>
  )
}

function EngagementDropChart() {
  return (
    <div className="mt-10">
      <div className="flex items-center gap-3 sm:gap-6">
        <Ring value={82} color="#34d399" size={80} />
        <span className="text-[18px] text-neutral-300 font-light">→</span>
        <Ring value={24} color="#E85555" size={80} />
      </div>
      <p className="text-[13px] text-neutral-500 font-light leading-relaxed mt-4 max-w-[320px]">
        Engagement <span className="font-bold text-white">drops sharply</span> when tracking <span className="font-bold text-white">8+ metrics</span>
      </p>
    </div>
  )
}

function StreakAbandonmentChart() {
  return (
    <div className="mt-10">
      <div className="flex items-center gap-3 sm:gap-6">
        <Ring value={68} color="#E85555" size={80} />
        <span className="text-[14px] text-neutral-400 font-light">vs</span>
        <Ring value={18} color="#34d399" size={80} />
      </div>
      <p className="text-[13px] text-neutral-500 font-light leading-relaxed mt-4 max-w-[320px]">
        <span className="font-bold text-white">Quit rate</span> after missing one day: <span className="font-bold text-red-400">streak counter</span> vs <span className="font-bold text-emerald-400">flexible tracking</span>
      </p>
    </div>
  )
}

function SocialAdherenceChart() {
  return (
    <div className="mt-10">
      <div className="flex items-center gap-3 sm:gap-6">
        <Ring value={31} color="#b0b0b0" size={80} />
        <span className="text-[14px] text-neutral-400 font-light">vs</span>
        <Ring value={67} color="#34d399" size={80} />
      </div>
      <p className="text-[13px] text-neutral-500 font-light leading-relaxed mt-4 max-w-[320px]">
        <span className="font-bold text-white">90-day adherence</span>: <span className="font-bold text-neutral-400">solo</span> vs <span className="font-bold text-emerald-400">social accountability</span>
      </p>
    </div>
  )
}

export function ResearchViz({ theme }: { theme: string }) {
  if (theme === 'Information Overload') return <EngagementDropChart />
  if (theme === 'Streak Punishment') return <StreakAbandonmentChart />
  if (theme === 'Community & Accountability') return <SocialAdherenceChart />
  return null
}
