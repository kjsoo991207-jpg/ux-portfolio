'use client'

import { useEffect, useRef } from 'react'
import { animate, useMotionValue } from 'framer-motion'

const SIZE = 360
const CX = SIZE / 2
const CY = SIZE / 2

// Convert clock angle (0° = 12 o'clock, clockwise) → SVG x, y
function toXY(angleDeg: number, r: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return {
    x: CX + Math.cos(rad) * r,
    y: CY + Math.sin(rad) * r,
  }
}

// Pre-computed initial positions (both hands start at 180° = 6 o'clock)
const I_MIN_TIP  = toXY(180, 115)   // minute tip
const I_MIN_TAIL = toXY(0,   15)    // minute counterweight
const I_MIN_TEXT = toXY(180, 133)   // JINSOO label

const I_HR_TIP   = toXY(180, 77)    // hour tip
const I_HR_TAIL  = toXY(0,   13)    // hour counterweight
const I_HR_TEXT  = toXY(180, 94)    // KIM label

export function GlassClock() {
  // SVG element refs for direct DOM updates (no React re-renders per frame)
  const minTipRef  = useRef<SVGLineElement>(null)
  const minTailRef = useRef<SVGLineElement>(null)
  const minTextRef = useRef<SVGTextElement>(null)
  const hrTipRef   = useRef<SVGLineElement>(null)
  const hrTailRef  = useRef<SVGLineElement>(null)
  const hrTextRef  = useRef<SVGTextElement>(null)

  const minAngle = useMotionValue(180)
  const hrAngle  = useMotionValue(180)

  useEffect(() => {
    function applyMin(a: number) {
      const tip  = toXY(a,       115)
      const tail = toXY(a + 180, 15)
      const text = toXY(a,       133)
      minTipRef.current?.setAttribute('x2', `${tip.x}`)
      minTipRef.current?.setAttribute('y2', `${tip.y}`)
      minTailRef.current?.setAttribute('x2', `${tail.x}`)
      minTailRef.current?.setAttribute('y2', `${tail.y}`)
      minTextRef.current?.setAttribute('x', `${text.x}`)
      minTextRef.current?.setAttribute('y', `${text.y}`)
    }

    function applyHr(a: number) {
      const tip  = toXY(a,       77)
      const tail = toXY(a + 180, 13)
      const text = toXY(a,       94)
      hrTipRef.current?.setAttribute('x2', `${tip.x}`)
      hrTipRef.current?.setAttribute('y2', `${tip.y}`)
      hrTailRef.current?.setAttribute('x2', `${tail.x}`)
      hrTailRef.current?.setAttribute('y2', `${tail.y}`)
      hrTextRef.current?.setAttribute('x', `${text.x}`)
      hrTextRef.current?.setAttribute('y', `${text.y}`)
    }

    // Seed initial DOM positions
    applyMin(180)
    applyHr(180)

    // Subscribe motion values → DOM
    const u1 = minAngle.on('change', applyMin)
    const u2 = hrAngle.on('change', applyHr)

    // ── Animation ──
    // Minute (JINSOO): sweeps 300° forward in 4s, snaps back in 1s
    const c1 = animate(minAngle, [180, 480, 180], {
      duration: 5,
      repeat: Infinity,
      times: [0, 0.8, 1],
      ease: ['linear', [0.9, 0, 0.1, 1]],
    })

    // Hour (KIM): sweeps 25° forward (1/12 scale), snaps back
    const c2 = animate(hrAngle, [180, 205, 180], {
      duration: 5,
      repeat: Infinity,
      times: [0, 0.8, 1],
      ease: ['linear', [0.9, 0, 0.1, 1]],
    })

    return () => { u1(); u2(); c1.stop(); c2.stop() }
  }, [minAngle, hrAngle])

  // 60 tick marks — 12 larger hour marks + 48 small minute marks
  const marks = Array.from({ length: 60 }, (_, i) => {
    const isHour = i % 5 === 0
    const a = ((i * 6 - 90) * Math.PI) / 180
    return {
      x1: CX + Math.cos(a) * (isHour ? 146 : 155),
      y1: CY + Math.sin(a) * (isHour ? 146 : 155),
      x2: CX + Math.cos(a) * 163,
      y2: CY + Math.sin(a) * 163,
      isHour,
    }
  })

  // 12 numbers
  const nums = Array.from({ length: 12 }, (_, i) => {
    const a = ((i * 30 - 90) * Math.PI) / 180
    return { n: i === 0 ? 12 : i, x: CX + Math.cos(a) * 120, y: CY + Math.sin(a) * 120 }
  })

  return (
    <div
      className="relative"
      style={{ width: SIZE, height: SIZE, borderRadius: '50%' }}
    >
      {/* ── Glass face ── */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at 34% 28%, rgba(255,255,255,0.58) 0%, rgba(255,255,255,0.22) 42%, rgba(245,245,250,0.06) 100%)',
          boxShadow: [
            '0 24px 72px rgba(0,0,0,0.11)',
            '0 4px 16px rgba(0,0,0,0.06)',
            '0 0 0 0.5px rgba(0,0,0,0.06)',
            'inset 0 2px 8px rgba(255,255,255,0.95)',
            'inset 0 -2px 6px rgba(0,0,0,0.04)',
          ].join(', '),
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      />

      {/* ── Top-left glossy sheen ── */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            'linear-gradient(148deg, rgba(255,255,255,0.52) 0%, rgba(255,255,255,0.1) 36%, transparent 54%)',
          filter: 'blur(4px)',
          opacity: 0.8,
        }}
      />

      {/* ── SVG layer ── */}
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="absolute inset-0"
      >
        {/* Outer rings */}
        <circle cx={CX} cy={CY} r={167} fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="1.2" />
        <circle cx={CX} cy={CY} r={165} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />

        {/* Tick marks */}
        {marks.map((m, i) => (
          <line
            key={i}
            x1={m.x1} y1={m.y1} x2={m.x2} y2={m.y2}
            stroke={m.isHour ? 'rgba(40,40,40,0.62)' : 'rgba(80,80,80,0.26)'}
            strokeWidth={m.isHour ? 2.2 : 0.7}
            strokeLinecap="round"
          />
        ))}

        {/* Hour numbers */}
        {nums.map(({ n, x, y }) => (
          <text
            key={n} x={x} y={y}
            textAnchor="middle" dominantBaseline="central"
            fontSize="12" fontWeight="300"
            fontFamily="Inter, system-ui, sans-serif"
            fill="rgba(40,40,40,0.68)"
          >
            {n}
          </text>
        ))}

        {/* ── Hour hand — KIM (thicker) ── */}
        <line
          ref={hrTailRef}
          x1={CX} y1={CY}
          x2={I_HR_TAIL.x} y2={I_HR_TAIL.y}
          stroke="rgba(30,30,30,0.85)" strokeWidth="2.5" strokeLinecap="round"
        />
        <line
          ref={hrTipRef}
          x1={CX} y1={CY}
          x2={I_HR_TIP.x} y2={I_HR_TIP.y}
          stroke="rgba(30,30,30,0.85)" strokeWidth="2.5" strokeLinecap="round"
        />
        <text
          ref={hrTextRef}
          x={I_HR_TEXT.x} y={I_HR_TEXT.y}
          textAnchor="middle" dominantBaseline="central"
          fontSize="11" fontWeight="500"
          letterSpacing="0.18em"
          fontFamily="Inter, system-ui, sans-serif"
          fill="rgba(25,25,25,0.9)"
        >
          KIM
        </text>

        {/* ── Minute hand — JINSOO (thinner) ── */}
        <line
          ref={minTailRef}
          x1={CX} y1={CY}
          x2={I_MIN_TAIL.x} y2={I_MIN_TAIL.y}
          stroke="rgba(30,30,30,0.58)" strokeWidth="1.2" strokeLinecap="round"
        />
        <line
          ref={minTipRef}
          x1={CX} y1={CY}
          x2={I_MIN_TIP.x} y2={I_MIN_TIP.y}
          stroke="rgba(30,30,30,0.58)" strokeWidth="1.2" strokeLinecap="round"
        />
        <text
          ref={minTextRef}
          x={I_MIN_TEXT.x} y={I_MIN_TEXT.y}
          textAnchor="middle" dominantBaseline="central"
          fontSize="11" fontWeight="300"
          letterSpacing="0.18em"
          fontFamily="Inter, system-ui, sans-serif"
          fill="rgba(25,25,25,0.72)"
        >
          JINSOO
        </text>

        {/* Center pivot */}
        <circle cx={CX} cy={CY} r="5.5" fill="rgba(25,25,25,0.88)" />
        <circle cx={CX} cy={CY} r="2.2" fill="rgba(255,255,255,0.55)" />
      </svg>
    </div>
  )
}

export default GlassClock
