'use client'

import Link from 'next/link'

const STATS = [
  { value: '12', label: '비언어적 행위 분류' },
  { value: '3', label: '개입 레이어' },
  { value: '~30', label: '명 관찰' },
]

const TAGS = ['Elderly Care', 'Behavioral Design', 'UX Research', 'Mobile App']

export default function SilentCuesShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-10 items-center py-10 md:py-16">
      {/* Left: text */}
      <div className="flex flex-col items-start">
        <p className="font-mono text-[13px] font-bold tracking-[0.3em] text-amber-400 uppercase mb-4">
          SilentCues
        </p>
        <h2 className="font-serif text-[32px] md:text-[36px] font-bold text-white leading-[1.2] tracking-tight">
          말할 수 없는 사람들의<br />목소리를 듣는 도구
        </h2>

        {/* Impact stats */}
        <div className="flex gap-6 mt-6 mb-5">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="text-[24px] font-bold text-amber-400 leading-none">{stat.value}</p>
              <p className="text-[10px] text-neutral-500 mt-1 leading-tight max-w-[80px]">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap mt-3">
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="text-[11px] text-neutral-400 border border-neutral-700 rounded-full px-3 py-1.5 bg-transparent inline-block m-1 ml-0"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="pt-8">
          <Link
            href="/work/silentcues"
            className="inline-block bg-amber-500 text-black text-sm font-medium px-6 py-3 rounded-lg hover:bg-amber-400 transition-colors"
          >
            View Work &rarr;
          </Link>
        </div>
      </div>

      {/* Right: 3 phone placeholders */}
      <div className="flex justify-center md:justify-end gap-3">
        {['입소자 목록', '빠른 기록', '인수인계 카드'].map((label) => (
          <div
            key={label}
            className="relative rounded-[24px] overflow-hidden flex items-center justify-center"
            style={{
              width: 'clamp(90px, 16vw, 160px)',
              aspectRatio: '9/19',
              background: '#1a1714',
              border: '1px solid rgba(212,168,83,0.15)',
            }}
          >
            <div className="text-center px-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(212,168,83,0.3)"
                strokeWidth="1.2"
                className="mx-auto mb-1.5"
              >
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              <p className="text-[8px] font-mono text-neutral-600 leading-tight">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
