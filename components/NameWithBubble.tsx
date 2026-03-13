'use client'

// Organic blob — fully opaque, static (no mouse interaction)
const BlobSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 120" className={className} aria-hidden>
    <defs>
      <linearGradient id="blobGloss" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="50%" stopColor="#fafafa" />
        <stop offset="100%" stopColor="#f5f5f5" />
      </linearGradient>
      <filter id="blobShadow" x="-40%" y="-40%" width="180%" height="180%">
        <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#000" floodOpacity="0.1" />
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.06" />
      </filter>
    </defs>
    <path
      d="M50,58 C38,42 52,22 72,28 C88,32 100,18 118,32 C138,48 142,78 128,92 C112,108 78,108 58,92 C42,78 50,58 50,58 Z"
      fill="url(#blobGloss)"
      filter="url(#blobShadow)"
    />
  </svg>
)

export default function NameWithBubble() {
  return (
    <div className="relative block w-full select-none py-4">
      {/* 1. 이름 — 배경에 깔린 레이어 */}
      <div className="relative z-0 text-4xl font-semibold tracking-tight text-[#000000] sm:text-5xl md:text-6xl lg:text-7xl">
        Jinsoo Kim
      </div>

      {/* 2. 블롭 — 고정 위치, 호버/마우스 없음 */}
      <div className="pointer-events-none absolute inset-0 z-10" aria-hidden>
        <div className="absolute left-1/2 top-1/2 h-24 w-40 -translate-x-1/2 -translate-y-1/2 sm:h-28 sm:w-48">
          <BlobSvg className="h-full w-full object-contain opacity-100" />
        </div>
      </div>
    </div>
  )
}
