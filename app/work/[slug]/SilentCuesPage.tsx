'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import type { Project } from '@/content/projects'

/* ── Tokens ─────────────────────────────────────────────────────────────── */
const C = {
  bg: '#ffffff',
  warm: '#F5F0EB',
  cream: '#FAF8F5',
  text: '#0a0a0a',
  sub: '#555555',
  dim: '#999999',
  accent: '#D4A853',
  border: '#e8e8e4',
  blue: '#5B8DEF',
  green: '#4CAF82',
  gray: '#9E9E9E',
}

/* ── Scroll Reveal ──────────────────────────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          ;(e.target as HTMLElement).style.opacity = '1'
          ;(e.target as HTMLElement).style.transform = 'translateY(0)'
          obs.unobserve(e.target)
        }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    )
    el.querySelectorAll('.rv').forEach((n) => obs.observe(n))
    return () => obs.disconnect()
  }, [])
  return ref
}

const rv: React.CSSProperties = {
  opacity: 0,
  transform: 'translateY(28px)',
  transition: 'opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1)',
}

/* ── Placeholder (fallback) ─────────────────────────────────────────────── */
function Placeholder({ label, aspect = '16/9' }: { label: string; aspect?: string }) {
  return (
    <div
      className="rounded-2xl flex items-center justify-center"
      style={{ aspectRatio: aspect, background: C.cream, border: `2px dashed ${C.border}` }}
    >
      <div className="text-center px-6">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={C.border} strokeWidth="1.2" className="mx-auto mb-2">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
        <p className="font-mono text-[11px]" style={{ color: C.dim }}>{label}</p>
      </div>
    </div>
  )
}

/* ── iPhone 17 Frame (uses actual frame PNG) ──────────────────────────── */
function IPhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex-shrink-0" style={{ width: 280 }}>
      {/* Screen content */}
      <div
        className="absolute overflow-hidden"
        style={{ top: '1.5%', left: '4%', right: '4%', bottom: '1.5%', borderRadius: 28, zIndex: 1 }}
      >
        <div style={{ width: '100%', height: '100%', overflow: 'auto', WebkitOverflowScrolling: 'touch' }}>
          {children}
        </div>
      </div>
      {/* Frame overlay */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/iphone-17-frame.png"
        alt=""
        className="w-full h-auto block select-none relative z-[2]"
        draggable={false}
      />
    </div>
  )
}

/* ── Scaled iPhone wrapper for grids ──────────────────────────────────── */
function ScaledPhone({ children, displayWidth = 240 }: { children: React.ReactNode; displayWidth?: number }) {
  const scale = displayWidth / 280
  return (
    <div style={{ width: displayWidth, overflow: 'visible', margin: '0 auto' }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: 280 }}>
        {children}
      </div>
    </div>
  )
}

/* ── iOS 17 Status Bar ─────────────────────────────────────────────────── */
function IOSStatusBar({ light = false }: { light?: boolean }) {
  const col = light ? '#fff' : '#0a0a0a'
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '17px 32px 0', height: 54, position: 'relative', zIndex: 40,
    }}>
      <span style={{ fontSize: 16, fontWeight: 600, color: col, letterSpacing: '0.01em', fontVariantNumeric: 'tabular-nums' }}>9:41</span>
      <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
        {/* Cellular - iOS 17 style */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill={col}>
          <rect x="0" y="8" width="3" height="4" rx="0.8" />
          <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.8" />
          <rect x="9" y="3" width="3" height="9" rx="0.8" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.8" />
        </svg>
        {/* WiFi - iOS 17 exact */}
        <svg width="15" height="12" viewBox="0 0 15 12" fill={col}>
          <path d="M7.5 10.8a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z" />
          <path d="M4.8 8.1a3.8 3.8 0 015.4 0" fill="none" stroke={col} strokeWidth="1.3" strokeLinecap="round" />
          <path d="M2.5 5.8a7 7 0 0110 0" fill="none" stroke={col} strokeWidth="1.3" strokeLinecap="round" />
          <path d="M0.3 3.5a10.2 10.2 0 0114.4 0" fill="none" stroke={col} strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        {/* Battery - iOS 17 exact */}
        <svg width="27" height="13" viewBox="0 0 27 13">
          <rect x="0.5" y="0.5" width="22" height="12" rx="3.5" fill="none" stroke={col} strokeWidth="1" opacity="0.35"/>
          <rect x="2" y="2" width="17" height="9" rx="2" fill={col} />
          <path d="M24 4.5a2 2 0 010 4" fill={col} opacity="0.4"/>
        </svg>
      </div>
    </div>
  )
}

/* ── iOS Home Indicator ────────────────────────────────────────────────── */
function IOSHomeIndicator({ light = false }: { light?: boolean }) {
  return (
    <div style={{ display:'flex', justifyContent:'center', paddingBottom: 8, paddingTop: 10 }}>
      <div style={{ width: 134, height: 5, borderRadius: 3, background: light ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.15)' }} />
    </div>
  )
}

/* ── iOS Back Button ───────────────────────────────────────────────────── */
function IOSBack({ label, light = false, onClick }: { label: string; light?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 4,
        background: 'none', border: 'none', cursor: 'pointer',
        fontSize: 17, fontWeight: 400, color: light ? '#fff' : C.accent,
        padding: '8px 28px 0',
      }}
    >
      <svg width="12" height="20" viewBox="0 0 12 20" fill="none" stroke={light ? '#fff' : C.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2L2 10L10 18" />
      </svg>
      {label}
    </button>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   Interactive Phone Mockups
   ══════════════════════════════════════════════════════════════════════════ */

/* ── SVG Icons ─────────────────────────────────────────────────────────── */
const Icon = {
  window: (c = '#D4A853', s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18"/><path d="M9 3v6"/></svg>,
  music: (c = '#D4A853', s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3" fill={c} opacity="0.2" stroke={c}/><circle cx="18" cy="16" r="3" fill={c} opacity="0.2" stroke={c}/></svg>,
  sun: (c = '#D4A853', s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="4" fill={c} opacity="0.15"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>,
  mail: (c = '#D4A853', s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="3" fill={c} opacity="0.1"/><path d="M22 7l-10 6L2 7"/></svg>,
  heart: (c = '#D4A853', s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c} opacity="0.9" stroke="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>,
  leaf: (c = '#6BAF7B', s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M17 8C8 10 5.9 16.17 3.82 21.34"/><path d="M20.59 5.41a15.3 15.3 0 01-6.76 12.76A12 12 0 013.82 21.34" fill={c} opacity="0.1"/><path d="M2 2l1.82 19.34"/></svg>,
  play: (c = '#fff', s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M8 5.14v13.72a1 1 0 001.5.86l11.06-6.86a1 1 0 000-1.72L9.5 4.28A1 1 0 008 5.14z"/></svg>,
  chevron: (c = '#D4A853', s = 10) => <svg width={s} height={s*1.6} viewBox="0 0 10 16" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2L2 8l6 6"/></svg>,
  mic: (c = '#D4A853', s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M12 1.5a3 3 0 00-3 3v6a3 3 0 006 0v-6a3 3 0 00-3-3z"/><path d="M19 10.5v0a7 7 0 01-14 0"/><path d="M12 17.5v4M8 21.5h8"/></svg>,
  camera: (c = '#D4A853', s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11z"/><circle cx="12" cy="13" r="4"/></svg>,
  image: (c = '#D4A853', s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>,
  wave: (c = '#5A9FD0', s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M2 6c.6.5 1.2 1 2.5 1C6 7 7 6 8.5 6S11 7 12 7s2.5-1 4-1 2 1 3.5 1 1.9-.5 2.5-1"/><path d="M2 12c.6.5 1.2 1 2.5 1 1.5 0 2.5-1 4-1s2.5 1 3.5 1 2.5-1 4-1 2 1 3.5 1 1.9-.5 2.5-1"/><path d="M2 18c.6.5 1.2 1 2.5 1 1.5 0 2.5-1 4-1s2.5 1 3.5 1 2.5-1 4-1 2 1 3.5 1 1.9-.5 2.5-1"/></svg>,
  mountain: (c = '#6BAF7B', s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3l-7 18h22L16 10l-4 7-4-14z" fill={c} opacity="0.1"/></svg>,
  home: (c = '#D4A853', s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5l9-7 9 7v11a1 1 0 01-1 1H4a1 1 0 01-1-1v-11z"/><path d="M9 21.5V12h6v9.5"/></svg>,
  person: (c = '#D4A853', s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  sunrise: (c = '#D4A853', s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M17 18a5 5 0 00-10 0"/><path d="M12 2v7M4.22 10.22l1.42 1.42M1 18h2M21 18h2M18.36 11.64l1.42-1.42"/><path d="M23 22H1M8 6l4-4 4 4"/></svg>,
  food: (c = '#D4A853', s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><path d="M6 1v3M10 1v3M14 1v3"/></svg>,
  chat: (c = '#D4A853', s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  bell: (c = '#D4A853', s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  flower: (c = '#D4A853', s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="3" fill={c} opacity="0.2"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>,
  edit: (c = '#6B5D4F', s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  check: (c = '#4CAF82', s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>,
  lightbulb: (c = '#D4A853', s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M9 18h6M10 22h4"/><path d="M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z" fill={c} opacity="0.1"/></svg>,
}

/* ══════════════════════════════════════════════════════════════════════════
   NEW CONCEPT: Single Chat Interface with Context Shifts
   ══════════════════════════════════════════════════════════════════════════ */

/* ── Chat Bubble ──────────────────────────────────────────────────────── */
function Bubble({ from, children, delay = 0 }: { from: 'ai' | 'user'; children: React.ReactNode; delay?: number }) {
  const isAI = from === 'ai'
  return (
    <div style={{
      display: 'flex', justifyContent: isAI ? 'flex-start' : 'flex-end',
      padding: '3px 20px',
    }}>
      <div style={{
        maxWidth: '78%',
        padding: '12px 16px',
        borderRadius: isAI ? '4px 18px 18px 18px' : '18px 4px 18px 18px',
        background: isAI ? 'rgba(255,255,255,0.85)' : 'rgba(212,168,83,0.18)',
        backdropFilter: 'blur(12px)',
        fontSize: 15, lineHeight: 1.55, color: '#2D2418',
        boxShadow: isAI ? '0 1px 4px rgba(0,0,0,0.04)' : 'none',
      }}>
        {children}
      </div>
    </div>
  )
}

/* ── Category Pills ───────────────────────────────────────────────────── */
function CategoryBar({ selected, onBg = false }: { selected?: string; onBg?: boolean }) {
  const cats = [
    { id: 'mountain', label: '산', icon: Icon.leaf('#6BAF7B', 14) },
    { id: 'sea', label: '바다', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5A9FD0" strokeWidth="2" strokeLinecap="round"><path d="M2 12c1.5-1.5 3-2 4.5 0s3 1.5 4.5 0 3-2 4.5 0 3 1.5 4.5 0"/></svg> },
    { id: 'home', label: '고향', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B8923A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5L12 3l9 7.5V21H3z" fill="#B8923A" opacity="0.1"/></svg> },
    { id: 'family', label: '가족', icon: Icon.heart('#D4A853', 14) },
    { id: 'music', label: '음악', icon: Icon.music('#9B7EC8', 14) },
    { id: 'garden', label: '정원', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6BAF7B" strokeWidth="2" strokeLinecap="round"><path d="M12 22V8M8 12c-3 0-4-3-4-5s2-4 4-4c1 0 2 .5 4 2 2-1.5 3-2 4-2 2 0 4 2 4 4s-1 5-4 5" fill="#6BAF7B" opacity="0.1"/></svg> },
  ]
  return (
    <div style={{
      display: 'flex', gap: 8, padding: '0 20px',
      overflowX: 'auto', WebkitOverflowScrolling: 'touch',
    }}>
      {cats.map((cat) => {
        const isSelected = selected === cat.id
        return (
          <div key={cat.id} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 14px', borderRadius: 20, flexShrink: 0,
            background: isSelected
              ? 'rgba(212,168,83,0.2)'
              : onBg ? 'rgba(255,255,255,0.25)' : 'rgba(245,240,235,0.8)',
            backdropFilter: onBg ? 'blur(12px)' : 'none',
            border: isSelected ? '1.5px solid rgba(212,168,83,0.4)' : '1px solid transparent',
            cursor: 'pointer',
          }}>
            {cat.icon}
            <span style={{
              fontSize: 13, fontWeight: isSelected ? 700 : 500,
              color: onBg ? '#fff' : '#2D2418',
            }}>{cat.label}</span>
          </div>
        )
      })}
    </div>
  )
}

/* ── Chat Input Bar ───────────────────────────────────────────────────── */
function ChatInput({ onBg = false }: { onBg?: boolean }) {
  return (
    <div style={{ padding: '8px 20px 6px' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        background: onBg ? 'rgba(255,255,255,0.2)' : 'rgba(245,240,235,0.9)',
        backdropFilter: 'blur(12px)',
        borderRadius: 24, padding: '10px 14px',
        border: onBg ? '1px solid rgba(255,255,255,0.15)' : '1px solid #E8E2D8',
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={onBg ? 'rgba(255,255,255,0.5)' : '#A89880'} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><circle cx="9" cy="10" r="0.5" fill={onBg ? 'rgba(255,255,255,0.5)' : '#A89880'}/><circle cx="15" cy="10" r="0.5" fill={onBg ? 'rgba(255,255,255,0.5)' : '#A89880'}/></svg>
        <span style={{ flex: 1, fontSize: 14, color: onBg ? 'rgba(255,255,255,0.45)' : '#A89880' }}>이야기해보세요...</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={onBg ? 'rgba(255,255,255,0.5)' : '#A89880'} strokeWidth="1.8" strokeLinecap="round"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><path d="M12 19v4"/></svg>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   PROTOTYPE FLOW — auto-playing demo showing how the app works
   ══════════════════════════════════════════════════════════════════════════ */
function PrototypeFlow() {
  const [step, setStep] = useState(0)
  const [paused, setPaused] = useState(false)

  const flow = [
    { screen: 'elderHome', label: '홈', desc: '앱을 열면 자연 배경과 가족 사진. 수연이가 메시지를 보냈다.', arrow: '알림을 누르면 →' },
    { screen: 'elderChat', label: '대화', desc: 'AI가 수연이의 음성 메시지를 들려주고, 회상 대화가 시작된다.', arrow: '"바다 소리 들어볼까요?" →' },
    { screen: 'elderImmersion', label: '몰입', desc: '배경이 바다로 바뀌고, 파도 소리가 들린다. 대화는 계속된다.', arrow: '어르신 플로우 완료' },
    { screen: 'familyHome', label: '가족 홈', desc: '가족은 할머니의 상태를 확인하고, 사진이나 음성을 보낼 수 있다.', arrow: '"사진 + 추억 한마디" →' },
    { screen: 'familySend', label: '보내기', desc: '사진에 캡션을 달아 보내면, 할머니 앱에서 회상 트리거가 된다.', arrow: '' },
  ]

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % flow.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [paused, flow.length])

  const current = flow[step]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
      {/* Flow label */}
      <div style={{
        display: 'flex', gap: 4, marginBottom: 24,
      }}>
        {flow.map((f, i) => (
          <button
            key={i}
            onClick={() => { setStep(i); setPaused(true) }}
            style={{
              width: i === step ? 32 : 8, height: 8, borderRadius: 4, border: 'none',
              background: i === step ? C.accent : C.border,
              transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>

      {/* Phone */}
      <div
        style={{ position: 'relative', cursor: 'pointer' }}
        onClick={() => setPaused(!paused)}
      >
        <IPhoneFrame>
          <div style={{
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}>
            {current.screen === 'elderHome' && <ElderHome />}
            {current.screen === 'elderChat' && <ElderChat />}
            {current.screen === 'elderImmersion' && <ElderImmersion />}
            {current.screen === 'familyHome' && <FamilyHome />}
            {current.screen === 'familySend' && <FamilySend />}
          </div>
        </IPhoneFrame>

        {/* Tap indicator overlay */}
        {current.arrow && !paused && (
          <div style={{
            position: 'absolute', bottom: -8, left: '50%', transform: 'translateX(-50%)',
            background: C.accent, color: '#fff', fontSize: 11, fontWeight: 600,
            padding: '6px 14px', borderRadius: 12, whiteSpace: 'nowrap',
            boxShadow: '0 2px 8px rgba(212,168,83,0.3)',
            animation: 'fadeInUp 0.3s ease',
          }}>
            {current.arrow}
          </div>
        )}
      </div>

      {/* Description */}
      <div style={{ textAlign: 'center', marginTop: 28, maxWidth: 400 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, color: '#fff',
            background: step < 3 ? C.accent : '#6BAF7B',
            padding: '3px 10px', borderRadius: 8,
          }}>{step < 3 ? '어르신용' : '가족용'}</span>
          <span style={{ fontSize: 16, fontWeight: 700, color: C.text }}>{current.label}</span>
        </div>
        <p style={{ fontSize: 14, color: C.sub, lineHeight: 1.6 }}>{current.desc}</p>
      </div>

      {/* Play/Pause indicator */}
      <button
        onClick={() => setPaused(!paused)}
        style={{
          marginTop: 16, background: 'none', border: `1px solid ${C.border}`,
          borderRadius: 20, padding: '6px 16px', cursor: 'pointer',
          fontSize: 12, color: C.dim,
        }}
      >
        {paused ? '▶ 재생' : '⏸ 일시정지'} · {step + 1} / {flow.length}
      </button>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   INTERACTIVE PROTOTYPE (kept for potential use)
   ══════════════════════════════════════════════════════════════════════════ */
function InteractivePrototype() {
  const [screen, setScreen] = useState<'home' | 'chat' | 'immersion' | 'familyHome' | 'familySend'>('home')
  const [transitioning, setTransitioning] = useState(false)

  const go = useCallback((to: typeof screen) => {
    setTransitioning(true)
    setTimeout(() => {
      setScreen(to)
      setTransitioning(false)
    }, 250)
  }, [])

  const screens: Record<string, { label: string; desc: string }> = {
    home: { label: '홈', desc: '자연 배경 + 가족 사진 + 메시지 알림' },
    chat: { label: '대화', desc: 'AI 회상 대화 + 음성 메시지' },
    immersion: { label: '몰입', desc: '자연 배경 전환 + 대화' },
    familyHome: { label: '가족 홈', desc: '상태 확인 + 보내기' },
    familySend: { label: '보내기', desc: '사진 + 캡션 + 음성' },
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
      {/* Navigation pills */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        {Object.entries(screens).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => go(key as typeof screen)}
            style={{
              padding: '8px 18px', borderRadius: 20, border: 'none', cursor: 'pointer',
              fontSize: 13, fontWeight: screen === key ? 700 : 500,
              background: screen === key ? C.accent : C.warm,
              color: screen === key ? '#fff' : C.sub,
              transition: 'all 0.2s',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Phone with screen */}
      <div style={{ position: 'relative' }}>
        <IPhoneFrame>
          <div style={{
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? 'scale(0.96)' : 'scale(1)',
            transition: 'opacity 0.25s ease, transform 0.25s ease',
          }}>
            {screen === 'home' && <ElderHomeInteractive onNotifClick={() => go('chat')} />}
            {screen === 'chat' && <ElderChatInteractive onBack={() => go('home')} onImmerse={() => go('immersion')} />}
            {screen === 'immersion' && <ElderImmersionInteractive onBack={() => go('chat')} />}
            {screen === 'familyHome' && <FamilyHomeInteractive onSend={() => go('familySend')} />}
            {screen === 'familySend' && <FamilySendInteractive onBack={() => go('familyHome')} />}
          </div>
        </IPhoneFrame>
      </div>

      {/* Current screen description */}
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{screens[screen].label}</p>
        <p style={{ fontSize: 13, color: C.dim, marginTop: 4 }}>{screens[screen].desc}</p>
      </div>
    </div>
  )
}

/* ── Interactive Elder Home ────────────────────────────────────────────── */
function ElderHomeInteractive({ onNotifClick }: { onNotifClick: () => void }) {
  return (
    <div style={{
      minHeight: '100%', display: 'flex', flexDirection: 'column',
      background: 'linear-gradient(180deg, #7EB5D6 0%, #A8CBE0 25%, #C8D8D0 50%, #E8DCC8 75%, #F5F0EB 100%)',
    }}>
      <IOSStatusBar light />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 28px' }}>
        <div style={{ position: 'absolute', top: 60, left: 28, display: 'flex', alignItems: 'center', gap: 6 }}>
          {Icon.sun('rgba(255,255,255,0.6)', 14)}
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>3월 29일 토요일 · 맑음</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <div style={{
            width: 140, height: 140, borderRadius: '50%',
            background: 'linear-gradient(145deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))',
            backdropFilter: 'blur(20px)', border: '3px solid rgba(255,255,255,0.4)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{Icon.person('rgba(255,255,255,0.6)', 56)}</div>
        </div>
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <div style={{ fontSize: 26, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', textShadow: '0 1px 8px rgba(0,0,0,0.08)' }}>영숙 할머니,</div>
          <div style={{ fontSize: 22, fontWeight: 300, color: 'rgba(255,255,255,0.85)', marginTop: 4 }}>좋은 아침이에요.</div>
        </div>
      </div>

      <div style={{ padding: '20px 24px 8px' }}>
        <div
          onClick={onNotifClick}
          style={{
            background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)',
            borderRadius: 22, padding: '18px 20px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
            transition: 'transform 0.15s, box-shadow 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 32px rgba(0,0,0,0.1)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)' }}
        >
          <div style={{
            width: 48, height: 48, borderRadius: 16,
            background: 'linear-gradient(135deg, #FBF5E8, #F0DFB8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>{Icon.mic('#D4A853', 22)}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#2D2418' }}>수연이가 메시지를 보냈어요</div>
            <div style={{ fontSize: 13, color: '#A89880', marginTop: 2 }}>음성 메시지 · 1분 12초</div>
          </div>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" stroke="#D4A853" strokeWidth="2" strokeLinecap="round"><path d="M1 1l6 6-6 6"/></svg>
        </div>
      </div>
      <IOSHomeIndicator light />
    </div>
  )
}

/* ── Interactive Elder Chat ────────────────────────────────────────────── */
function ElderChatInteractive({ onBack, onImmerse }: { onBack: () => void; onImmerse: () => void }) {
  return (
    <div style={{ background: '#FAF8F5', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <IOSStatusBar />
      <div style={{ padding: '58px 0 0' }}>
        <div onClick={onBack} style={{ cursor: 'pointer' }}><IOSBack label="홈" /></div>
        <div style={{ textAlign: 'center', marginTop: -20 }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: '#2D2418' }}>수연이의 메시지</span>
        </div>
      </div>

      <div style={{ flex: 1, padding: '16px 0 8px', display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'flex-end' }}>
        {/* Voice card */}
        <div style={{ padding: '2px 20px' }}>
          <div style={{
            background: '#fff', borderRadius: 20, padding: '16px',
            boxShadow: '0 2px 12px rgba(45,36,24,0.04)', border: '1px solid rgba(232,226,216,0.6)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #FBF5E8, #F0DFB8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {Icon.heart('#D4A853', 13)}
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#2D2418' }}>손녀 수연</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'linear-gradient(135deg, #D4A853, #B8923A)',
                boxShadow: '0 2px 8px rgba(212,168,83,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>{Icon.play('#fff', 12)}</div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1.5, height: 26 }}>
                {[10,18,26,14,22,30,18,26,12,20,28,16,24,12,18,26,14,22,10,16,24,18,12,20].map((h, i) => (
                  <div key={i} style={{ width: 2.5, height: h * 0.65, borderRadius: 1.5, background: i < 9 ? '#D4A853' : '#E8E2D8', flexShrink: 0 }} />
                ))}
              </div>
              <span style={{ fontSize: 11, color: '#A89880', flexShrink: 0 }}>1:12</span>
            </div>
          </div>
        </div>

        <Bubble from="ai">&quot;할머니, 함덕 해변 사진 봤어요! 할머니가 젊었을 때 진짜 예뻤어요.&quot;</Bubble>
        <Bubble from="user">함덕 해변... 할아버지랑 갔었는데.</Bubble>
        <Bubble from="ai">할아버지랑요? 그때 어떠셨어요?</Bubble>
        <Bubble from="user">결혼하고 첫 여행이었어. 비가 왔었는데도 좋았어.</Bubble>

        {/* Clickable AI bubble */}
        <div style={{ padding: '3px 20px' }}>
          <div
            onClick={onImmerse}
            style={{
              maxWidth: '78%', padding: '12px 16px',
              borderRadius: '4px 18px 18px 18px',
              background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)',
              fontSize: 15, lineHeight: 1.55, color: '#2D2418',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              cursor: 'pointer', transition: 'transform 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)' }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = '' }}
          >
            비 오는 함덕 해변... 그 기억 소중하네요.<br/>
            <span style={{ color: C.accent, fontWeight: 600 }}>바다 소리 들어볼까요?</span>
          </div>
        </div>
      </div>

      <ChatInput />
      <IOSHomeIndicator />
    </div>
  )
}

/* ── Interactive Elder Immersion ───────────────────────────────────────── */
function ElderImmersionInteractive({ onBack }: { onBack: () => void }) {
  return (
    <div style={{
      background: 'linear-gradient(180deg, #4A8FC0 0%, #6AAFE0 25%, #8EC8E8 50%, #B8D4E0 80%, #D4C8B0 100%)',
      minHeight: '100%', display: 'flex', flexDirection: 'column',
    }}>
      <IOSStatusBar light />
      <div style={{ padding: '58px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div onClick={onBack} style={{ cursor: 'pointer' }}><IOSBack label="돌아가기" light /></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', borderRadius: 14, padding: '6px 12px' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 010 7.07"/></svg>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>파도 소리</span>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 0 8px', gap: 8 }}>
        <Bubble from="ai">함덕 해변의 파도 소리예요. 눈 감고 들어보세요.</Bubble>
        <Bubble from="user">파도 소리 좋다...</Bubble>
        <Bubble from="ai">할머니, 여기서 뭐가 제일 기억나세요?</Bubble>
      </div>

      <ChatInput onBg />
      <IOSHomeIndicator light />
    </div>
  )
}

/* ── Interactive Family Home ───────────────────────────────────────────── */
function FamilyHomeInteractive({ onSend }: { onSend: () => void }) {
  return (
    <div style={{ background: '#FAF8F5', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <IOSStatusBar />
      <div style={{ padding: '58px 24px 0' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#D4A853', letterSpacing: '0.06em' }}>SILENTCUES</span>
        <span style={{ fontSize: 13, color: '#A89880', marginLeft: 8 }}>가족</span>
      </div>

      <div style={{
        margin: '20px 20px 0', borderRadius: 24, padding: '24px',
        background: 'linear-gradient(145deg, #FBF5E8, #F5EDD8)',
        border: '1px solid rgba(212,168,83,0.2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'linear-gradient(145deg, #F0DFB8, #E8D5A8)', border: '2px solid #D4A853',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, fontWeight: 700, color: '#B8923A',
          }}>영숙</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#2D2418' }}>영숙 할머니</div>
            <div style={{ fontSize: 13, color: '#A89880', marginTop: 2 }}>마지막 활동: 오전 9:30</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 20px 0', fontSize: 13, fontWeight: 600, color: '#A89880' }}>할머니에게 보내기</div>
      <div style={{ padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { icon: Icon.mic('#D4A853', 20), title: '음성 메시지' },
          { icon: Icon.camera('#D4A853', 20), title: '사진 + 추억 한마디' },
          { icon: Icon.image('#D4A853', 20), title: '배경 사진 바꾸기' },
        ].map((opt) => (
          <div
            key={opt.title}
            onClick={opt.title === '사진 + 추억 한마디' ? onSend : undefined}
            style={{
              background: '#fff', borderRadius: 18, padding: '16px 18px',
              boxShadow: '0 1px 8px rgba(45,36,24,0.04)',
              display: 'flex', alignItems: 'center', gap: 14,
              cursor: opt.title === '사진 + 추억 한마디' ? 'pointer' : 'default',
              transition: 'transform 0.15s',
            }}
            onMouseEnter={(e) => { if (opt.title === '사진 + 추억 한마디') e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = '' }}
          >
            <div style={{ width: 44, height: 44, borderRadius: 14, background: '#FBF5E8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{opt.icon}</div>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#2D2418', flex: 1 }}>{opt.title}</span>
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" stroke="#D4A853" strokeWidth="2" strokeLinecap="round"><path d="M1 1l5 5-5 5"/></svg>
          </div>
        ))}
      </div>

      <div style={{
        margin: '16px 20px 0', background: '#fff', borderRadius: 18, padding: '16px 18px',
        border: '1px solid rgba(232,226,216,0.5)',
      }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#A89880', marginBottom: 8 }}>최근 대화에서</div>
        <div style={{ fontSize: 14, color: '#6B5D4F', lineHeight: 1.6, fontStyle: 'italic' }}>&ldquo;결혼하고 첫 여행이었어. 비가 왔었는데도 좋았어.&rdquo;</div>
        <div style={{ fontSize: 11, color: '#A89880', marginTop: 6 }}>오늘 오전 10:15 · 함덕 해변 이야기</div>
      </div>

      <IOSHomeIndicator />
    </div>
  )
}

/* ── Interactive Family Send ───────────────────────────────────────────── */
function FamilySendInteractive({ onBack }: { onBack: () => void }) {
  return (
    <div style={{ background: '#FAF8F5', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <IOSStatusBar />
      <div style={{ padding: '58px 24px 0', display: 'flex', alignItems: 'center' }}>
        <div onClick={onBack} style={{ cursor: 'pointer' }}><IOSBack label="돌아가기" /></div>
        <span style={{ fontSize: 15, fontWeight: 600, color: '#2D2418', marginLeft: 60 }}>사진 보내기</span>
      </div>

      <div style={{
        margin: '20px 20px 0', borderRadius: 24, height: 200,
        background: 'linear-gradient(135deg, #B8D4E8, #8FBAD8)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{Icon.wave('#fff', 48)}</div>

      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#A89880', marginBottom: 8 }}>추억 한마디</div>
        <div style={{ background: '#fff', borderRadius: 16, padding: '16px', border: '1px solid #E8E2D8' }}>
          <div style={{ fontSize: 15, color: '#2D2418', lineHeight: 1.6 }}>할머니, 함덕 해변 갔을 때 기억나요? 할머니가 회 사주셨잖아요</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
          {Icon.lightbulb('#D4A853', 14)}
          <span style={{ fontSize: 11, color: '#A89880' }}>구체적인 추억을 담으면 회상 치료에 도움이 돼요.</span>
        </div>
      </div>

      <div style={{ padding: '0 20px', marginTop: 'auto', marginBottom: 20 }}>
        <div style={{
          background: 'linear-gradient(135deg, #D4A853, #B8923A)',
          borderRadius: 16, padding: '16px', textAlign: 'center',
          boxShadow: '0 4px 16px rgba(212,168,83,0.3)', cursor: 'pointer',
        }}>
          <span style={{ fontSize: 17, fontWeight: 700, color: '#fff' }}>할머니에게 보내기</span>
        </div>
      </div>
      <IOSHomeIndicator />
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   STATIC SCREENS (used in solution section mockups)
   ══════════════════════════════════════════════════════════════════════════ */

/* ── ELDER 1: Home — 1st person VR stroller walk + Suyeon character ────── */
function ElderHome() {
  return (
    <div style={{
      minHeight: '100%', display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background: 1st person street view - warm morning neighborhood */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, #8CBAD8 0%, #A8C8D8 15%, #B8C8C0 30%, #C8CCC0 45%, #D0C8B0 60%, #C8B898 75%, #B0A080 90%, #988868 100%)',
      }}>
        {/* Street/path indication */}
        <div style={{
          position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: 300, height: 320,
          background: 'linear-gradient(180deg, #C0B898 0%, #B8A880 40%, #A89870 100%)',
          clipPath: 'polygon(35% 0%, 65% 0%, 90% 100%, 10% 100%)',
        }} />
        {/* Left trees/greenery */}
        <div style={{
          position: 'absolute', left: 0, bottom: 180, width: 120, height: 300,
          background: 'linear-gradient(135deg, #7A9A6A, #6A8A5A)',
          borderRadius: '0 60px 0 0', opacity: 0.7,
        }} />
        {/* Right trees/greenery */}
        <div style={{
          position: 'absolute', right: 0, bottom: 180, width: 100, height: 280,
          background: 'linear-gradient(225deg, #7A9A6A, #6A8A5A)',
          borderRadius: '60px 0 0 0', opacity: 0.7,
        }} />
        {/* Distant houses/buildings */}
        <div style={{
          position: 'absolute', left: 20, top: '35%', width: 60, height: 40,
          background: '#D0C0A0', borderRadius: 4, opacity: 0.5,
        }} />
        <div style={{
          position: 'absolute', right: 30, top: '33%', width: 50, height: 50,
          background: '#C8B890', borderRadius: 4, opacity: 0.5,
        }} />
      </div>

      {/* Status bar */}
      <IOSStatusBar light />

      {/* Time + weather - top left subtle */}
      <div style={{ position: 'relative', zIndex: 2, padding: '58px 28px 0', display: 'flex', alignItems: 'center', gap: 6 }}>
        {Icon.sun('rgba(255,255,255,0.6)', 14)}
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>3월 29일 토요일 · 맑음</span>
      </div>

      {/* Main content area */}
      <div style={{ flex: 1, position: 'relative', zIndex: 2 }} />

      {/* Stroller + Suyeon - bottom center, 1st person perspective */}
      <div style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Suyeon character looking back at grandma */}
        <div style={{
          width: 100, height: 100, borderRadius: '50%',
          background: 'linear-gradient(145deg, #FFE8C8, #F0D8B0)',
          border: '3px solid rgba(255,255,255,0.6)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: -10,
        }}>
          {/* Baby face placeholder */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: '#B8923A', fontWeight: 700, letterSpacing: '0.05em' }}>수연</div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#2D2418' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#2D2418' }} />
            </div>
            <div style={{ width: 8, height: 4, borderRadius: '0 0 4px 4px', background: '#E8A088', margin: '6px auto 0' }} />
          </div>
        </div>

        {/* Stroller handle bar - 1st person */}
        <div style={{
          width: 200, height: 8, borderRadius: 4,
          background: 'linear-gradient(90deg, #888, #999, #888)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }} />
        {/* Stroller frame */}
        <div style={{
          width: 160, height: 60,
          borderTop: '3px solid #888',
          borderLeft: '3px solid #888',
          borderRight: '3px solid #888',
          borderRadius: '12px 12px 0 0',
          marginTop: -4,
        }} />

        {/* AI speech bubble - above stroller */}
        <div style={{
          position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(16px)',
          borderRadius: 18, padding: '10px 16px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          maxWidth: 260, textAlign: 'center',
        }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#2D2418', lineHeight: 1.4 }}>할머니, 오늘 날씨 좋다!</div>
        </div>
      </div>

      {/* Voice message notification - auto play indicator */}
      <div style={{ position: 'relative', zIndex: 4, padding: '12px 24px 8px' }}>
        <div style={{
          background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(20px)',
          borderRadius: 22, padding: '14px 18px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          {/* Playing animation dots */}
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: 'linear-gradient(135deg, #FBF5E8, #F0DFB8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <div style={{ display: 'flex', gap: 3, alignItems: 'center', height: 20 }}>
              {[10, 16, 12, 18, 8].map((h, i) => (
                <div key={i} style={{ width: 3, height: h, borderRadius: 1.5, background: '#D4A853' }} />
              ))}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#2D2418' }}>수연이 음성 메시지 재생 중</div>
            <div style={{ fontSize: 12, color: '#A89880', marginTop: 1 }}>0:23 / 1:12</div>
          </div>
        </div>
      </div>

      {/* Tap to speak hint */}
      <div style={{ position: 'relative', zIndex: 4, textAlign: 'center', padding: '4px 0 4px' }}>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>화면을 누르면 말할 수 있어요</span>
      </div>

      <IOSHomeIndicator light />
    </div>
  )
}

/* ── ELDER 2: Reminiscence Chat — AI-guided memory conversation ───────── */
function ElderChat() {
  return (
    <div style={{
      background: '#FAF8F5',
      minHeight: '100%', display: 'flex', flexDirection: 'column',
    }}>
      <IOSStatusBar />
      {/* Minimal top bar */}
      <div style={{ padding: '58px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <IOSBack label="홈" />
        <span style={{ fontSize: 14, fontWeight: 600, color: '#2D2418' }}>수연이의 메시지</span>
        <div style={{ width: 50 }} />
      </div>

      {/* Chat */}
      <div style={{ flex: 1, padding: '24px 0 8px', display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'flex-end' }}>
        {/* Voice message card */}
        <div style={{ padding: '2px 20px' }}>
          <div style={{
            background: '#fff', borderRadius: 20, padding: '16px',
            boxShadow: '0 2px 12px rgba(45,36,24,0.04)',
            border: '1px solid rgba(232,226,216,0.6)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #FBF5E8, #F0DFB8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {Icon.heart('#D4A853', 13)}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#2D2418' }}>손녀 수연</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'linear-gradient(135deg, #D4A853, #B8923A)',
                boxShadow: '0 2px 8px rgba(212,168,83,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>{Icon.play('#fff', 12)}</div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1.5, height: 26 }}>
                {[10,18,26,14,22,30,18,26,12,20,28,16,24,12,18,26,14,22,10,16,24,18,12,20].map((h, i) => (
                  <div key={i} style={{ width: 2.5, height: h * 0.65, borderRadius: 1.5, background: i < 9 ? '#D4A853' : '#E8E2D8', flexShrink: 0 }} />
                ))}
              </div>
              <span style={{ fontSize: 11, color: '#A89880', flexShrink: 0 }}>1:12</span>
            </div>
          </div>
        </div>

        <Bubble from="ai">
          &ldquo;할머니, 할머니 함덕 해변 사진 봤어요!<br/>할머니가 젊었을 때 진짜 예뻤어요.&rdquo;
        </Bubble>
        <Bubble from="user">
          함덕 해변... 할아버지랑 갔었는데.
        </Bubble>
        <Bubble from="ai">
          할아버지랑요? 그때 어떠셨어요?
        </Bubble>
        <Bubble from="user">
          결혼하고 첫 여행이었어. 비가 왔었는데도 좋았어.
        </Bubble>
        <Bubble from="ai">
          비 오는 함덕 해변에서의 첫 여행...<br/>할머니의 소중한 기억이네요.<br/>수연이한테 이 이야기 들려줄까요?
        </Bubble>
      </div>

      <ChatInput />
      <IOSHomeIndicator />
    </div>
  )
}

/* ── ELDER 3: Immersion — Nature background during conversation ───────── */
function ElderImmersion() {
  return (
    <div style={{
      background: 'linear-gradient(180deg, #4A8FC0 0%, #6AAFE0 25%, #8EC8E8 50%, #B8D4E0 80%, #D4C8B0 100%)',
      minHeight: '100%', display: 'flex', flexDirection: 'column',
    }}>
      <IOSStatusBar light />
      <div style={{ padding: '58px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <IOSBack label="돌아가기" light />
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', borderRadius: 14, padding: '6px 12px' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 010 7.07"/></svg>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>파도 소리</span>
        </div>
      </div>

      {/* Spacious — mostly nature */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 0 8px', gap: 8 }}>
        <Bubble from="ai">
          함덕 해변의 파도 소리예요.<br/>눈 감고 들어보세요.
        </Bubble>
        <Bubble from="user">
          파도 소리 좋다...
        </Bubble>
        <Bubble from="ai">
          할머니, 여기서 뭐가 제일 기억나세요?
        </Bubble>
      </div>

      <ChatInput onBg />
      <IOSHomeIndicator light />
    </div>
  )
}

/* ── FAMILY 1: Home — Elder status + send options ─────────────────────── */
function FamilyHome() {
  return (
    <div style={{
      background: '#FAF8F5',
      minHeight: '100%', display: 'flex', flexDirection: 'column',
    }}>
      <IOSStatusBar />
      <div style={{ padding: '58px 24px 0' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#D4A853', letterSpacing: '0.06em' }}>SILENTCUES</span>
        <span style={{ fontSize: 13, color: '#A89880', marginLeft: 8 }}>가족</span>
      </div>

      {/* Elder status card */}
      <div style={{
        margin: '20px 20px 0', borderRadius: 24, padding: '24px',
        background: 'linear-gradient(145deg, #FBF5E8, #F5EDD8)',
        border: '1px solid rgba(212,168,83,0.2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'linear-gradient(145deg, #F0DFB8, #E8D5A8)',
            border: '2px solid #D4A853',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, fontWeight: 700, color: '#B8923A',
          }}>영숙</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#2D2418' }}>영숙 할머니</div>
            <div style={{ fontSize: 13, color: '#A89880', marginTop: 2 }}>마지막 활동: 오전 9:30</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.7)', borderRadius: 14, padding: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: '#A89880' }}>오늘 기분</div>
            <div style={{ fontSize: 20, marginTop: 4 }}>😊</div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.7)', borderRadius: 14, padding: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: '#A89880' }}>대화</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#2D2418', marginTop: 4 }}>3회</div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.7)', borderRadius: 14, padding: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: '#A89880' }}>메시지</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#6BAF7B', marginTop: 4 }}>읽음</div>
          </div>
        </div>
      </div>

      {/* Send options */}
      <div style={{ padding: '20px 20px 0', fontSize: 13, fontWeight: 600, color: '#A89880', letterSpacing: '0.04em' }}>할머니에게 보내기</div>
      <div style={{ padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="1.8" strokeLinecap="round"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/></svg>, title: '음성 메시지', desc: '할머니가 가장 좋아하는 방식' },
          { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>, title: '사진 + 추억 한마디', desc: '회상 트리거가 되는 사진' },
          { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="3"/><path d="M8 21h8M12 17v4"/></svg>, title: '배경 사진 바꾸기', desc: '할머니 홈 화면 배경' },
        ].map((opt) => (
          <div key={opt.title} style={{
            background: '#fff', borderRadius: 18, padding: '16px 18px',
            boxShadow: '0 1px 8px rgba(45,36,24,0.04), 0 0 0 1px rgba(232,226,216,0.4)',
            display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
          }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: '#FBF5E8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {opt.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#2D2418' }}>{opt.title}</div>
              <div style={{ fontSize: 12, color: '#A89880', marginTop: 2 }}>{opt.desc}</div>
            </div>
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" stroke="#D4A853" strokeWidth="2" strokeLinecap="round"><path d="M1 1l5 5-5 5"/></svg>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div style={{ padding: '16px 20px 0', fontSize: 13, fontWeight: 600, color: '#A89880', letterSpacing: '0.04em' }}>최근 대화에서</div>
      <div style={{
        margin: '10px 20px 0', background: '#fff', borderRadius: 18, padding: '16px 18px',
        boxShadow: '0 1px 6px rgba(45,36,24,0.03)',
        border: '1px solid rgba(232,226,216,0.5)',
      }}>
        <div style={{ fontSize: 14, color: '#6B5D4F', lineHeight: 1.6 }}>
          &ldquo;결혼하고 첫 여행이었어. 비가 왔었는데도 좋았어.&rdquo;
        </div>
        <div style={{ fontSize: 11, color: '#A89880', marginTop: 8 }}>오늘 오전 10:15 · 함덕 해변 이야기</div>
      </div>

      <IOSHomeIndicator />
    </div>
  )
}

/* ── FAMILY 2: Send Photo + Caption (Reminiscence Trigger) ────────────── */
function FamilySend() {
  return (
    <div style={{
      background: '#FAF8F5',
      minHeight: '100%', display: 'flex', flexDirection: 'column',
    }}>
      <IOSStatusBar />
      <div style={{ padding: '58px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IOSBack label="돌아가기" />
        <span style={{ fontSize: 15, fontWeight: 600, color: '#2D2418' }}>사진 보내기</span>
        <div style={{ width: 50 }} />
      </div>

      {/* Photo preview */}
      <div style={{
        margin: '20px 20px 0', borderRadius: 24, overflow: 'hidden',
        background: 'linear-gradient(135deg, #E8DCC8, #D4C4A8)',
        height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icon.wave('#5A9FD0', 56)}</div>
        <div style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', borderRadius: 12, padding: '6px 12px', fontSize: 11, fontWeight: 600, color: '#2D2418' }}>사진 변경</div>
      </div>

      {/* Caption input */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#A89880', marginBottom: 8, letterSpacing: '0.04em' }}>추억 한마디</div>
        <div style={{
          background: '#fff', borderRadius: 16, padding: '16px',
          border: '1px solid #E8E2D8', minHeight: 80,
        }}>
          <div style={{ fontSize: 15, color: '#2D2418', lineHeight: 1.6 }}>
            할머니, 우리 함덕 해변 갔을 때 기억나요? 할머니가 회 사주셨잖아요
          </div>
        </div>
        <div style={{ fontSize: 11, color: '#A89880', marginTop: 6, lineHeight: 1.5 }}>
          구체적인 추억을 담으면 할머니의 회상 치료에 도움이 돼요.
        </div>
      </div>

      {/* Voice recording option */}
      <div style={{
        margin: '16px 20px 0', background: '#FBF5E8', borderRadius: 16, padding: '14px 18px',
        display: 'flex', alignItems: 'center', gap: 12, border: '1px solid rgba(212,168,83,0.15)',
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="1.8" strokeLinecap="round"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/></svg>
        <span style={{ fontSize: 14, color: '#6B5D4F' }}>음성 메시지도 함께 녹음하기</span>
      </div>

      {/* Set as background */}
      <div style={{
        margin: '10px 20px 0', background: '#fff', borderRadius: 16, padding: '14px 18px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        border: '1px solid #E8E2D8',
      }}>
        <span style={{ fontSize: 14, color: '#6B5D4F' }}>할머니 홈 배경으로 설정</span>
        <div style={{ width: 44, height: 26, borderRadius: 13, background: '#D4A853', padding: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: 22, height: 22, borderRadius: 11, background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.15)' }} />
        </div>
      </div>

      {/* Send button */}
      <div style={{ padding: '20px 20px', marginTop: 'auto' }}>
        <div style={{
          background: 'linear-gradient(135deg, #D4A853, #B8923A)',
          borderRadius: 16, padding: '16px', textAlign: 'center',
          boxShadow: '0 4px 16px rgba(212,168,83,0.3)',
          cursor: 'pointer',
        }}>
          <span style={{ fontSize: 17, fontWeight: 700, color: '#fff' }}>할머니에게 보내기</span>
        </div>
      </div>

      <IOSHomeIndicator />
    </div>
  )
}

/* ── Keep old PhoneHome for backward compat (redirects to ChatDefault) ── */
function PhoneHome() {
  return (
    <div style={{ background: '#FAF8F5', minHeight: '100%', paddingBottom: 20 }}>
      <IOSStatusBar />
      {/* Greeting gradient */}
      <div style={{ background: 'linear-gradient(180deg, #FBF5E8 0%, #FAF8F5 100%)', padding: '10px 24px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: 'linear-gradient(145deg, #F0DFB8, #E8D5A8)',
            border: '2px solid #D4A853',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 17, fontWeight: 700, color: '#B8923A',
            boxShadow: '0 2px 8px rgba(212,168,83,0.2)',
          }}>영숙</div>
          <span style={{ fontSize: 13, color: '#A89880', letterSpacing: '0.02em' }}>204호 · 82세</span>
        </div>
        <div style={{ fontSize: 30, fontWeight: 700, color: '#2D2418', letterSpacing: '-0.03em', lineHeight: 1.15 }}>영숙 할머니,</div>
        <div style={{ fontSize: 24, fontWeight: 300, color: '#6B5D4F', marginTop: 4, letterSpacing: '-0.01em' }}>좋은 아침이에요.</div>
        <div style={{ fontSize: 14, color: '#A89880', marginTop: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#D4A853" stroke="none"><circle cx="12" cy="12" r="5"/><path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke="#D4A853" strokeWidth="2" strokeLinecap="round"/></svg>
          <span>3월 29일 토요일 · 맑음 14°</span>
        </div>
      </div>

      {/* Family notification */}
      <div style={{
        margin: '16px 20px 0', background: '#fff', borderRadius: 20, padding: '18px 20px',
        boxShadow: '0 2px 16px rgba(45,36,24,0.06), 0 0 0 1px rgba(232,226,216,0.5)',
        display: 'flex', gap: 14, alignItems: 'center', position: 'relative',
      }}>
        <div style={{ position: 'absolute', top: 14, right: 14, width: 8, height: 8, borderRadius: '50%', background: '#E85D5D', boxShadow: '0 0 6px rgba(232,93,93,0.4)' }} />
        <div style={{ width: 46, height: 46, borderRadius: 15, background: 'linear-gradient(135deg, #FBF5E8, #F5EDD8)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {Icon.mail('#D4A853', 22)}
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#2D2418' }}>손녀 수연이가 보냈어요</div>
          <div style={{ fontSize: 12, color: '#A89880', marginTop: 3 }}>음성 메시지 · 오늘 오전 8:30</div>
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ display: 'flex', gap: 10, padding: '18px 20px 0' }}>
        {[
          { icon: Icon.window('#B8923A', 22), label: '바깥 구경', desc: '오늘의 풍경' },
          { icon: Icon.music('#B8923A', 22), label: '내 음악', desc: '좋아하는 노래' },
          { icon: Icon.sun('#B8923A', 22), label: '나의 하루', desc: '오늘 일정' },
        ].map((a) => (
          <div key={a.label} style={{
            flex: 1, background: '#fff', borderRadius: 18, padding: '16px 14px',
            boxShadow: '0 2px 12px rgba(45,36,24,0.05), 0 0 0 1px rgba(232,226,216,0.4)',
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 13, background: 'linear-gradient(135deg, #FBF5E8, #F5EDD8)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>{a.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#2D2418' }}>{a.label}</div>
            <div style={{ fontSize: 10, color: '#A89880', marginTop: 3 }}>{a.desc}</div>
          </div>
        ))}
      </div>

      {/* Today's anchor */}
      <div style={{
        margin: '16px 20px 0', borderRadius: 18, padding: '18px',
        background: 'linear-gradient(135deg, #F5F0EB, #F0EAE2)',
        border: '1px solid #E8E2D8',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {Icon.leaf('#6BAF7B', 14)}
          <span style={{ fontSize: 11, color: '#A89880', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>오늘의 루틴</span>
        </div>
        <div style={{ fontSize: 17, fontWeight: 700, color: '#2D2418', marginTop: 8 }}>오전 10시 — 정원 산책</div>
        <div style={{ fontSize: 13, color: '#6B5D4F', marginTop: 4, lineHeight: 1.5 }}>30분 뒤에 시작해요. 오늘 날씨가 좋아요.</div>
      </div>

      {/* Feeling check */}
      <div style={{
        margin: '16px 20px 0', background: '#fff', borderRadius: 18, padding: '16px 18px',
        boxShadow: '0 1px 8px rgba(45,36,24,0.04), 0 0 0 1px rgba(232,226,216,0.4)',
      }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#2D2418', marginBottom: 14 }}>오늘 기분이 어떠세요?</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { emoji: '😊', bg: 'linear-gradient(135deg, #FBF5E8, #F5EDD8)' },
            { emoji: '😐', bg: 'linear-gradient(135deg, #F0EDE8, #E8E5E0)' },
            { emoji: '😔', bg: 'linear-gradient(135deg, #E8ECF0, #DDE3E8)' },
            { emoji: '😤', bg: 'linear-gradient(135deg, #F0E8E8, #E8DDD8)' },
            { emoji: '😴', bg: 'linear-gradient(135deg, #EDE8F0, #E4DDE8)' },
          ].map((e) => (
            <div key={e.emoji} style={{ flex: 1, height: 44, background: e.bg, borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{e.emoji}</div>
          ))}
        </div>
      </div>

      <IOSHomeIndicator />
    </div>
  )
}

/* ── Window Selection Screen ──────────────────────────────────────────── */
function PhoneWindow() {
  const windows = [
    { title: '우리 동네', desc: '서울 강남구 · 실시간', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6B5D4F" strokeWidth="1.5"><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18"/><path d="M8 6V4M16 6V4" strokeLinecap="round"/></svg>, bg: 'linear-gradient(145deg, #E8D5A8 0%, #D4BC88 50%, #C8A868 100%)' },
    { title: '바다', desc: '제주 함덕 해변 · 실시간', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4A7A9B" strokeWidth="1.5" strokeLinecap="round"><path d="M2 12c1.5-1.5 3-2 4.5 0s3 1.5 4.5 0 3-2 4.5 0 3 1.5 4.5 0"/><path d="M2 16c1.5-1.5 3-2 4.5 0s3 1.5 4.5 0 3-2 4.5 0 3 1.5 4.5 0" opacity="0.5"/></svg>, bg: 'linear-gradient(145deg, #B8D4E8 0%, #8FBAD8 50%, #6AA0C8 100%)' },
    { title: '숲', desc: '설악산 소나무 숲', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5A8A5E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l-7 10h4l-3 8h12l-3-8h4L12 3z" fill="#5A8A5E" opacity="0.1"/></svg>, bg: 'linear-gradient(145deg, #C4DDB8 0%, #A8C898 50%, #8AB878 100%)' },
    { title: '놀이터', desc: '아이들이 뛰어노는 풍경', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B6B4F" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="8" r="5" fill="#8B6B4F" opacity="0.1"/><path d="M5 21l3-8M19 21l-3-8M9 13h6"/></svg>, bg: 'linear-gradient(145deg, #E8D0B8 0%, #D4B898 50%, #C4A880 100%)' },
  ]
  return (
    <div style={{ background: '#FAF8F5', minHeight: '100%', paddingBottom: 20 }}>
      <IOSStatusBar />
      <IOSBack label="홈" />
      <div style={{ padding: '8px 28px 0', fontSize: 28, fontWeight: 700, color: '#2D2418', letterSpacing: '-0.03em' }}>바깥 구경</div>
      <div style={{ padding: '6px 28px 0', fontSize: 17, color: '#6B5D4F' }}>오늘은 어디를 보고 싶으세요?</div>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {windows.map((w) => (
          <div key={w.title} style={{
            background: w.bg, borderRadius: 22, padding: '20px 22px', minHeight: 100,
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.25)',
          }}>
            <div>{w.icon}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 12 }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#2D2418' }}>{w.title}</div>
                <div style={{ fontSize: 12, color: 'rgba(45,36,24,0.6)', marginTop: 2 }}>{w.desc}</div>
              </div>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(12px)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{Icon.play('#2D2418', 14)}</div>
            </div>
          </div>
        ))}
      </div>
      <IOSHomeIndicator />
    </div>
  )
}

/* ── Music Selection Screen ────────────────────────────────────────────── */
function PhoneQuickLog() {
  return (
    <div style={{ background: '#FAF8F5', minHeight: '100%', paddingBottom: 20 }}>
      <IOSStatusBar />
      <IOSBack label="나의 하루" />
      <div style={{ padding: '8px 28px 0', fontSize: 28, fontWeight: 700, color: '#2D2418', letterSpacing: '-0.03em' }}>오늘 뭘 들을까요?</div>
      <div style={{ padding: '6px 28px 0', fontSize: 15, color: '#A89880' }}>영숙 할머니가 좋아하는 것들</div>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { title: '봄날은 간다', artist: '백설희', tag: '즐겨 듣는', bar: 'linear-gradient(180deg, #E8D5A8, #D4BC88)' },
          { title: '고향의 봄', artist: '동요', tag: '추억의 노래', bar: 'linear-gradient(180deg, #C4DDB8, #A8C898)' },
          { title: '빗소리', artist: '자연의 소리', tag: '잠들 때', bar: 'linear-gradient(180deg, #B8D4E8, #8FBAD8)' },
          { title: 'KBS 뉴스', artist: '라디오', tag: '아침 루틴', bar: 'linear-gradient(180deg, #E8D0B8, #D4B898)' },
          { title: '비발디 사계', artist: '클래식', tag: '산책할 때', bar: 'linear-gradient(180deg, #D8C4E8, #C4A8D8)' },
        ].map((m) => (
          <div key={m.title} style={{
            background: '#fff', borderRadius: 18, padding: '14px 16px',
            boxShadow: '0 1px 8px rgba(45,36,24,0.04), 0 0 0 1px rgba(232,226,216,0.4)',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{ width: 4, height: 36, borderRadius: 2, background: m.bar, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#2D2418', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.title}</div>
              <div style={{ fontSize: 12, color: '#6B5D4F', marginTop: 2 }}>{m.artist}</div>
            </div>
            <div style={{
              fontSize: 10, color: '#6B5D4F', background: 'linear-gradient(135deg, #FAF8F5, #F0EDE8)',
              borderRadius: 8, padding: '4px 8px', fontWeight: 600, flexShrink: 0,
              border: '1px solid #E8E2D8',
            }}>{m.tag}</div>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'linear-gradient(135deg, #FBF5E8, #F5EDD8)',
              boxShadow: '0 1px 4px rgba(212,168,83,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>{Icon.play('#D4A853', 11)}</div>
          </div>
        ))}
      </div>
      <IOSHomeIndicator />
    </div>
  )
}

/* ── Taxonomy Card Screen ─────────────────────────────────────────────── */
function PhoneTaxonomy() {
  const cats = [
    { label: '자율성', color: '#D4A853', bg: '#FBF5E8', acts: ['복도 산책', '창가 응시', '거부'] },
    { label: '보호', color: '#5B8DEF', bg: '#EBF1FD', acts: ['Masking', 'Performing', '통증 억제'] },
    { label: '연결', color: '#4CAF82', bg: '#E8F5EE', acts: ['손 뻗기', '비언어 발성', '간병인 반응'] },
    { label: '포기', color: '#9E9E9E', bg: '#F0F0F0', acts: ['정지', '눈감기', '고개 돌리기'] },
  ]
  return (
    <div style={{ background: '#FAF8F5', minHeight: '100%', paddingBottom: 20 }}>
      <IOSStatusBar />
      <div style={{ padding: '60px 20px 0' }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#A89880', textTransform: 'uppercase', letterSpacing: '0.1em' }}>행위 택소노미</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: '#2D2418', marginTop: 6, letterSpacing: '-0.02em' }}>12가지 비언어 행위</div>
        <div style={{ fontSize: 14, color: '#6B5D4F', marginTop: 6 }}>4개 카테고리로 분류된 관찰 프레임워크</div>
      </div>
      <div style={{ padding: '16px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {cats.map((cat) => (
          <div key={cat.label} style={{ background: '#fff', borderRadius: 16, padding: '14px 16px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: cat.color }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#2D2418' }}>{cat.label}의 행위</span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {cat.acts.map((a) => (
                <div key={a} style={{ flex: 1, background: cat.bg, borderRadius: 10, padding: '10px 8px', textAlign: 'center' }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: cat.color }}>{a}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <IOSHomeIndicator />
    </div>
  )
}

/* ── Mood Check Screen ────────────────────────────────────────────────── */
function PhoneMoodCheck() {
  return (
    <div style={{ background: '#FAF8F5', minHeight: '100%', paddingBottom: 20 }}>
      <IOSStatusBar />
      <IOSBack label="홈" />
      <div style={{ padding: '8px 28px 0', fontSize: 26, fontWeight: 700, color: '#2D2418', letterSpacing: '-0.02em', lineHeight: 1.3 }}>영숙 할머니,</div>
      <div style={{ padding: '4px 28px 0', fontSize: 26, fontWeight: 700, color: '#2D2418', letterSpacing: '-0.02em', lineHeight: 1.3 }}>지금 기분이 어떠세요?</div>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { emoji: '😊', label: '좋아요', bg: '#FBF5E8' },
          { emoji: '😐', label: '그냥 그래요', bg: '#F0EDE8' },
          { emoji: '😔', label: '좀 슬퍼요', bg: '#E8ECF0' },
          { emoji: '😤', label: '답답해요', bg: '#F0E8E8' },
          { emoji: '😴', label: '피곤해요', bg: '#EDE8F0' },
        ].map((m) => (
          <div key={m.label} style={{
            background: m.bg, borderRadius: 18, padding: '16px 20px',
            display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer',
          }}>
            <span style={{ fontSize: 28 }}>{m.emoji}</span>
            <span style={{ fontSize: 18, fontWeight: 700, color: '#2D2418' }}>{m.label}</span>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', fontSize: 15, color: '#A89880', marginTop: 4 }}>지금은 넘어갈게요</div>
      <IOSHomeIndicator />
    </div>
  )
}

/* ── Walk Timer Screen ────────────────────────────────────────────────── */
function PhoneWalkTimer() {
  return (
    <div style={{ background: '#EDF5EF', minHeight: '100%', paddingBottom: 20, display: 'flex', flexDirection: 'column' }}>
      <IOSStatusBar />
      <IOSBack label="나의 하루" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 28px', marginTop: -40 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Icon.leaf('#6BAF7B', 56)}</div>
        <div style={{ fontSize: 28, fontWeight: 700, color: '#2D2418', marginTop: 12, letterSpacing: '-0.02em' }}>정원 산책 중</div>
        <div style={{ fontSize: 15, color: '#6B5D4F', marginTop: 6 }}>천천히 걸어보세요.</div>
        <div style={{
          width: 160, height: 160, borderRadius: '50%',
          background: 'rgba(255,255,255,0.6)', border: '3px solid #6BAF7B',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          marginTop: 24,
        }}>
          <div style={{ fontSize: 40, fontWeight: 700, color: '#2D2418', letterSpacing: '-0.04em' }}>12:35</div>
          <div style={{ fontSize: 12, color: '#6B5D4F', marginTop: 2 }}>분 째 걷고 있어요</div>
        </div>
        <div style={{ display: 'flex', gap: 32, marginTop: 24 }}>
          {[{ v: '847', l: '걸음' }, { v: '0.4', l: 'km' }, { v: '68', l: '심박수' }].map((s) => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#6BAF7B' }}>{s.v}</div>
              <div style={{ fontSize: 11, color: '#A89880', marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{
          marginTop: 20, background: '#fff', borderRadius: 16, padding: '12px 20px',
          display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        }}>
          <span>{Icon.music('#6B5D4F', 16)}</span>
          <span style={{ fontSize: 14, color: '#6B5D4F' }}>비발디 사계 · 산책할 때</span>
        </div>
      </div>
      <div style={{ padding: '0 20px 10px' }}>
        <div style={{ background: '#6BAF7B', borderRadius: 16, padding: '16px', textAlign: 'center' }}>
          <span style={{ fontSize: 17, fontWeight: 700, color: '#fff' }}>산책 마치기</span>
        </div>
      </div>
      <IOSHomeIndicator />
    </div>
  )
}

/* ── Family Gallery Screen ────────────────────────────────────────────── */
function PhoneFamilyGallery() {
  return (
    <div style={{ background: '#FAF8F5', minHeight: '100%', paddingBottom: 20 }}>
      <IOSStatusBar />
      <IOSBack label="홈" />
      <div style={{ padding: '8px 28px 0', fontSize: 28, fontWeight: 700, color: '#2D2418', letterSpacing: '-0.03em' }}>가족이 보내준 것들</div>
      <div style={{ margin: '20px 20px 0', background: '#FBF5E8', borderRadius: 22, padding: '20px' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#D4A853' }}>손녀 수연</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#2D2418', marginTop: 6, lineHeight: 1.4 }}>&ldquo;할머니, 오늘 학교에서요...&rdquo;</div>
        <div style={{ fontSize: 13, color: '#A89880', marginTop: 6 }}>오늘 오전 8:30 · 1분 12초</div>
        <div style={{
          marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 8,
          background: '#D4A853', borderRadius: 20, padding: '10px 20px',
        }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>▶  듣기</span>
        </div>
      </div>
      {[
        { from: '아들 진호', desc: '가족 저녁 식사 · 어제', icon: 'food', bg: '#F0EAE0' },
        { from: '딸 미영', desc: '봄꽃이 폈어요 · 3월 27일', icon: 'flower', bg: '#F0E6E0' },
      ].map((p) => (
        <div key={p.from} style={{ margin: '12px 20px 0', background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <div style={{ height: 120, background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{({food:Icon.food,flower:Icon.flower} as any)[p.icon]?.('#A89880', 40)}</div>
          <div style={{ padding: '14px 18px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#2D2418' }}>{p.from}</div>
            <div style={{ fontSize: 12, color: '#A89880', marginTop: 3 }}>{p.desc}</div>
          </div>
        </div>
      ))}
      <IOSHomeIndicator />
    </div>
  )
}

/* ── My Day Timeline Screen ───────────────────────────────────────────── */
function PhoneMyDay() {
  const items = [
    { time: '오전 7:00', title: '기상 · 아침 인사', icon: 'sunrise', done: true },
    { time: '오전 8:00', title: '아침 식사', icon: 'food', done: true },
    { time: '오전 9:30', title: '손녀 메시지 듣기', icon: 'mail', done: true },
    { time: '오전 10:00', title: '정원 산책', icon: 'leaf', done: false, current: true },
    { time: '오전 11:00', title: '내가 고른 음악 시간', icon: 'music', done: false },
    { time: '오후 12:00', title: '점심 식사', icon: 'food', done: false },
    { time: '오후 2:00', title: '바깥 구경', icon: '🪟', done: false },
  ]
  return (
    <div style={{ background: '#FAF8F5', minHeight: '100%', paddingBottom: 20 }}>
      <IOSStatusBar />
      <IOSBack label="홈" />
      <div style={{ padding: '8px 28px 0', fontSize: 28, fontWeight: 700, color: '#2D2418', letterSpacing: '-0.03em' }}>나의 하루</div>
      <div style={{ padding: '6px 28px 0', fontSize: 17, color: '#6B5D4F' }}>오늘 하고 싶은 걸 골라보세요.</div>
      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {items.map((item) => (
          <div key={item.title} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
            borderRadius: 14,
            background: item.current ? '#FBF5E8' : 'transparent',
            boxShadow: item.current ? '0 2px 8px rgba(212,168,83,0.1)' : 'none',
          }}>
            <span style={{ fontSize: 12, color: item.done ? '#A89880' : '#6B5D4F', width: 64, flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>{item.time}</span>
            <span>{({sunrise:Icon.sunrise,food:Icon.food,mail:Icon.mail,leaf:Icon.leaf,music:Icon.music,window:Icon.window} as any)[item.icon]?.(item.done ? '#A89880' : '#D4A853', 18)}</span>
            <span style={{ fontSize: 15, fontWeight: item.current ? 700 : 500, color: item.done ? '#A89880' : '#2D2418', flex: 1 }}>{item.title}</span>
            {item.done && <span style={{ fontSize: 14, color: '#4CAF82' }}>✓</span>}
            {item.current && <span style={{ fontSize: 11, fontWeight: 600, color: '#D4A853' }}>지금</span>}
          </div>
        ))}
      </div>
      <div style={{ margin: '8px 20px 0', border: '1px solid #E8E2D8', borderRadius: 14, padding: '14px', textAlign: 'center' }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: '#6B5D4F' }}>일정 바꾸기</span>
      </div>
      <IOSHomeIndicator />
    </div>
  )
}

/* ── 12 Acts Data ───────────────────────────────────────────────────────── */
interface Act { name: string; observation: string; meaning: string }
interface ActCategory { label: string; color: string; bgTint: string; acts: Act[] }

const TAXONOMY: ActCategory[] = [
  {
    label: '자율성의 행위',
    color: C.accent,
    bgTint: 'rgba(212,168,83,0.07)',
    acts: [
      { name: '복도 산책', observation: '할아버지는 링거 팩을 달고 내 부축을 받으며 복도를 걸으셨다. 요양원에서도 H자 건물의 유리 통로를 매일 걷는 어르신이 30명 넘었다. 다른 장소, 같은 행동.', meaning: '갈 곳이 복도뿐이어도, 걷는 건 내가 선택한 행위다. 운동이 아니라 자율성의 선언이다.' },
      { name: '창가 응시', observation: '강남 병원 창밖으로 차들, 사람들, 공사 현장이 보였다. 걷는 시간의 절반 이상을 창가에 앉아 보셨다. 요양원에서는 놀이터가 보이는 통로에 휠체어를 세우고 계시던 할머니가 있었다.', meaning: '안쪽의 휠체어와 밖의 뛰어노는 아이들. 창문은 갇힌 공간과 빼앗긴 세상 사이의 경계다.' },
      { name: '거부', observation: '아빠한테 전해 들었다. "집에 가고 싶다. 답답하다. 그냥 집에 가자." 나한테 직접 말씀하신 적은 없다.', meaning: '"집에 가자"는 장소의 요청이 아니라 자율성의 요청이다.' },
    ],
  },
  {
    label: '보호의 행위',
    color: C.blue,
    bgTint: 'rgba(91,141,239,0.06)',
    acts: [
      { name: '의사 앞 Masking', observation: '의사가 오면 누워 계시다가 갑자기 앉으셨다. 환하게 웃으시면서 "괜찮아졌습니다, 선생님." 자기보다 어린 의사한테 존댓말을 쓰시면서 더 깍듯하게. 의사가 나가면 바로 눈을 감으셨다.', meaning: '괜찮은 척은 생존 전략이다. 약한 모습을 보이면 퇴원 시점의 통제권을 잃는다.' },
      { name: '방문자 앞 Performing', observation: '내가 오면 유독 반가워하셨다. 막둥이의 막둥이니까. 다른 가족이 와도 반가워하셨지만, 시간이 지나면 지친 모습이 드러났다.', meaning: '아픈 사람이 되어서도 가족을 걱정시키지 않으려는 것. 연기의 비용을 자신이 흡수한다.' },
      { name: '통증 억제', observation: '아플 때 침대 프레임을 꽉 잡으셨지만 간호사를 부르지 않으셨다. 누군가 지나가기를 기다리셨다.', meaning: '통증을 참는 것은 강인함이 아니다. 아프다고 말해도 달라지는 게 없다는 학습된 이해다.' },
    ],
  },
  {
    label: '연결의 행위',
    color: C.green,
    bgTint: 'rgba(76,175,130,0.06)',
    acts: [
      { name: '손 뻗기', observation: '지나가는 간병인에게 손을 뻗는 어르신들이 있었다. 잡으려는 게 아니라 닿으려는 것.', meaning: '도움 요청이 아니라 존재 확인 요청이다. 나 여기 있어. 나를 봐.' },
      { name: '비언어 발성', observation: '말 못하시는 분들이 대부분이었다. 뭔가를 원하실 때 입을 다문 채 소리를 지르셨다.', meaning: '소리는 가장 마지막에 닫히는 소통 채널이다.' },
      { name: '특정 간병인에 반응', observation: '특정 직원 한두 명에게만 반응하는 어르신들이 있었다. 그 사람을 눈으로 따라가고, 나머지는 무시했다.', meaning: '바뀌는 얼굴들 속에서 한 사람에게 유대를 느끼는 것은 신뢰의 행위다.' },
    ],
  },
  {
    label: '포기의 행위',
    color: C.gray,
    bgTint: 'rgba(158,158,158,0.06)',
    acts: [
      { name: '정지', observation: '어떤 어르신들은 완전히 멈추었다. 자는 것도 아니고 쉬는 것도 아닌. 눈은 떠 있고, 몸은 있지만, 사람은 없는 상태.', meaning: '저항, 보호, 연결이 모두 소진되면 몸은 남지만 자아는 물러난다.' },
      { name: '눈감기', observation: '대화 중에 눈을 감는 것. 피로가 아니라 과부하. 또는 참여하지 않겠다는 선택.', meaning: '다인실에서 닫을 수 있는 유일한 문이다.' },
      { name: '고개 돌리기', observation: '간병인과 상호작용 중에 몸이나 고개를 돌리는 것. 느리고 의도적인 회전.', meaning: '혼란이 아니다. 명확한 메시지다: 지금은 이걸 원하지 않는다.' },
    ],
  },
]

/* ── Cycle Data ──────────────────────────────────────────────────────────── */
const CYCLE = [
  '시설에 입원',
  '환경이 정체성을 지움',
  '환자만 보이는 환경',
  '나갈 수 없음',
  '심리적 무너짐',
  '신체 증상 나타남',
  '입원 기간 연장',
]

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Component
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function SilentCuesPage({ project }: { project: Project }) {
  const cs = project.caseStudy!
  const containerRef = useReveal()
  const [expandedAct, setExpandedAct] = useState<string | null>(null)
  const toggleAct = useCallback((n: string) => setExpandedAct((p) => (p === n ? null : n)), [])

  return (
    <div ref={containerRef} style={{ color: C.text }}>

      {/* ═══════════════════════════════════════════════════════════════════
         HERO — 제품 먼저. 감정 바로 따라옴. (Angelisa + Adrian)
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="pt-10 pb-0">
        {/* 프로젝트 정보 */}
        <div className="max-w-[680px] mx-auto px-6 rv" style={rv}>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">SilentCues</h1>
          <p className="text-[18px] sm:text-[20px] font-serif leading-[1.5]" style={{ color: C.sub }}>
            말할 수 없는 사람들의 목소리를 듣는 도구
          </p>
          <dl className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-4 text-sm">
            {([['Timeline', cs.duration], ['Team', project.team], ['Tools', project.tools], ['Role', cs.role]] as const).map(([l, v]) => (
              <div key={l}>
                <dt className="text-[10px] font-mono uppercase tracking-[0.15em] mb-1" style={{ color: C.dim }}>{l}</dt>
                <dd className="text-[14px]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* 앱 목업 3개 */}
        <div className="rv max-w-5xl mx-auto px-6 mt-20" style={rv}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, alignItems: 'flex-start' }}>
            {[
              { content: <ElderHome />, y: 16 },
              { content: <ElderChat />, y: 0 },
              { content: <FamilyHome />, y: 32 },
            ].map((phone, i) => (
              <div key={i} style={{ transform: `translateY(${phone.y}px)` }}>
                <IPhoneFrame>{phone.content}</IPhoneFrame>
              </div>
            ))}
          </div>
        </div>

        {/* 인용문 — 제품 바로 아래. 감정이 따라옴 */}
        <div className="rv max-w-[560px] mx-auto px-6 text-center py-20" style={rv}>
          <p className="font-serif text-[22px] sm:text-[28px] md:text-[34px] leading-[1.5] tracking-tight" style={{ color: C.sub }}>
            &ldquo;집에 가고 싶다.<br />
            답답하다.<br />
            그냥 집에 가자.&rdquo;
          </p>
          <p className="mt-8 text-[13px]" style={{ color: C.dim }}>
            2025년 1월, 강남의 한 병원에서
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6"><div className="h-px" style={{ background: C.border }} /></div>

      {/* ═══════════════════════════════════════════════════════════════════
         STORY 1: 할아버지 — 좁은 시야. (text 680px, image 1024px)
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 sm:py-36">
        <div className="max-w-[680px] mx-auto px-6 space-y-6">
          <p className="rv text-[15px] leading-[1.9]" style={{ ...rv, color: C.sub }}>
            2025년 1월, 할아버지가 갑작스럽게 쓰러지셨다. 담도암 판정. 치사율이 두 번째로 높은 암이었다. 처음 병원에 갔을 때, 보호자 1명만 출입이 가능해서 할아버지가 직접 1층까지 내려오셨다. 예전에 봤던 살집 있고 덩치 크셨던 모습과는 달랐다. 살이 빠져 계셨다.
          </p>

          <div className="rv" style={rv}>
            <p className="text-[15px] leading-[1.9]" style={{ color: C.sub }}>
              할아버지는 되게 강하신 분이었다. 강하시면서도 차가우셨다. 처음에 말씀하셨다.
            </p>
          </div>

          <blockquote className="rv py-6" style={rv}>
            <p className="text-[22px] sm:text-[26px] font-serif leading-[1.5] tracking-tight">
              &ldquo;내가 너희들을 다 키웠는데, 암 따위한테 지겠냐.&rdquo;
            </p>
          </blockquote>

          <p className="rv text-[15px] leading-[1.9]" style={{ ...rv, color: C.sub }}>
            그게 할아버지였다. 근데 항암치료가 시작되면서 체중이 급격히 줄었고, 혈색이 사라졌고, 체력이 떨어졌다. 나는 옆에서 그걸 지켜봤다.
          </p>

          <p className="rv text-[15px] leading-[1.9]" style={{ ...rv, color: C.sub }}>
            할아버지를 부축하면서 복도를 걸었다. 큰 링거 팩을 달고 계셨고, 창가에 도착하면 벽을 짚고 앉으셨다. &ldquo;쉬다가 가자.&rdquo; 강남 한복판 병원이었다. 창밖으로 차들, 오가는 사람들, 공사 현장, 아파트들이 보였다. 할아버지는 걷는 시간의 절반 이상을 그 창가에 앉아 바깥을 보셨다.
          </p>

          <p className="rv text-[15px] leading-[1.9]" style={{ ...rv, color: C.sub }}>
            의사가 순찰을 오면 할아버지가 바뀌셨다. 누워 계시다가 갑자기 앉으시고, 환하게 웃으시면서 &ldquo;괜찮아졌습니다, 선생님.&rdquo; 자기보다 나이 어린 의사한테 존댓말을 쓰시면서 더 깍듯하게. 의사가 나가면 바로 다시 눈을 감으시거나 누우셨다. 빨리 퇴원하시려고.
          </p>

          <p className="rv text-[15px] leading-[1.9]" style={{ ...rv, color: C.sub }}>
            한 번도 &ldquo;내 새끼&rdquo; 하신 적 없는 분이, 내 옆에서 아들 걱정을 하셨다. &ldquo;너의 아빠 힘들 거다.&rdquo; 안 하시던 말씀을 하셨다. 나는 그때 느꼈다. 할아버지도 준비를 하고 계시구나.
          </p>

          <p className="rv text-[15px] leading-[1.9]" style={{ ...rv, color: C.sub }}>
            할아버지는 그해 돌아가셨다. 내 인생에서 가까운 사람을 보내는 건 처음이었다. 할아버지는 나한테 언제까지나 살아 계실 것 같은, 불멸의 존재 같은 사람이었다.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
         STORY 2: 요양원 — 시야가 넓어짐. (image: 풀너비)
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 sm:py-36" style={{ background: C.cream }}>
        <div className="max-w-[680px] mx-auto px-6 space-y-6">
          <div className="rv" style={rv}>
            <p className="text-[18px] font-bold tracking-tight mb-6">그보다 몇 년 전, 요양원.</p>
            <p className="text-[15px] leading-[1.9]" style={{ color: C.sub }}>
              중학교 1학년 때 봉사활동으로 시작했다. 솔직히 처음에는 봉사 시간을 채우기 위해서였다. 집에서 가깝기도 했고, 새로운 경험을 할 수 있을 것 같았다. 매달 한두 번씩 가서 어르신들 식사를 돕거나 청소를 하거나 산책을 함께 했다. 약 3년간, 30명이 넘는 어르신을 봤다.
            </p>
          </div>

          <p className="rv text-[15px] leading-[1.9]" style={{ ...rv, color: C.sub }}>
            건물은 영어 알파벳 H처럼 생겼다. 두 건물을 잇는 유리 통로가 있었다. 어르신들은 그 복도를 매일 걸으셨다. 몇 년 뒤 할아버지가 병원 복도를 걸으시는 걸 보면서, 그때의 어르신들이 떠올랐다. 같은 행동이었다.
          </p>
        </div>

        <div className="max-w-[680px] mx-auto px-6 mt-16 space-y-6">
          <p className="rv text-[15px] leading-[1.9]" style={{ ...rv, color: C.sub }}>
            가장 기억에 남는 분은 휠체어를 타고 연결 통로에 앉아 밖을 바라보시던 할머니다. 건너편에 놀이터가 있었다. 자신의 상황과 정반대인 아이들을 바라보고 계셨다.
          </p>

          <p className="rv text-[15px] leading-[1.9]" style={{ ...rv, color: C.sub }}>
            말 못하시는 분들이 대부분이었다. 뭔가를 원하실 때 입을 다문 채 소리를 지르셨다. 나는 조심스럽게 다가갔지만, 직원들은 거칠었다. 매일 하는 일이니까. 그때는 그게 왜 마음이 안 좋은지 설명할 수 없었다.
          </p>

          <blockquote className="rv py-6" style={rv}>
            <p className="text-[20px] sm:text-[24px] font-serif leading-[1.5] tracking-tight">
              지금은 안다. 공감 피로라는 이름이 있다는 걸.
            </p>
          </blockquote>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
         WHY — 전환점. 고요.
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 sm:py-36">
        <div className="max-w-[680px] mx-auto px-6">
          <div className="rv" style={rv}>
            <p className="text-[18px] font-bold tracking-tight mb-6">왜 이 프로젝트를 하는가.</p>
            <p className="text-[15px] leading-[1.9]" style={{ color: C.sub }}>
              나는 같은 감정을 반복하는 게 싫다. 좋은 건 반복하면 좋겠지만, 나쁜 건 절대 반복하지 않으려고 노력한다. 할아버지를 보내면서 느꼈던 감정을, 외할머니한테, 외할아버지한테, 살아 계신 친할머니한테, 그리고 먼 훗날 부모님한테 반복하고 싶지 않다.
            </p>
          </div>
          <p className="rv text-[15px] leading-[1.9] mt-6" style={{ ...rv, color: C.sub }}>
            이건 우리 가족만의 문제가 아니다. 전 세계가 피할 수 없는 상황이다.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6"><div className="h-px" style={{ background: C.border }} /></div>

      {/* ═══════════════════════════════════════════════════════════════════
         PATTERN — 시야가 열림. 12 Acts 인터랙티브 카드. (max-w-5xl)
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 sm:py-36">
        <div className="max-w-[680px] mx-auto px-6">
          <div className="rv" style={rv}>
            <h2 className="text-[28px] sm:text-[36px] font-bold leading-[1.15] tracking-tight mb-8">
              이 행동들은 왜 반복되었을까?
            </h2>
            <p className="text-[15px] leading-[1.9]" style={{ color: C.sub }}>
              할아버지가 복도를 걸으시는 걸 봤을 때, 이상하다고 느끼지 않았다. 할아버지의 습관이려니 했다. 그런데 요양원에서 같은 행동을 하는 분이 한 명, 두 명, 열 명... 30명이 넘었다.
            </p>
          </div>

          <blockquote className="rv py-8" style={rv}>
            <p className="text-[20px] sm:text-[24px] font-serif leading-[1.5] tracking-tight">
              그때 깨달았다. 이건 습관이 아니라 뭔가 다른 거다.
            </p>
          </blockquote>

          <p className="rv text-[15px] leading-[1.9]" style={{ ...rv, color: C.sub }}>
            이름도 없이, 프레임워크도 없이, 그냥 봤던 걸 기억했다. 나중에 돌아보니 패턴이 있었다. 이 행동들은 감지해야 할 &ldquo;신호&rdquo;가 아니었다. 환경에 맞서는 행위였다.
          </p>
        </div>

        {/* 12 Acts — 인터랙티브 카드 (Pratibha) */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="space-y-14">
            {TAXONOMY.map((cat) => (
              <div key={cat.label} className="rv" style={rv}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: cat.color }} />
                  <h3 className="text-[16px] font-bold tracking-tight">{cat.label}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {cat.acts.map((act) => {
                    const open = expandedAct === act.name
                    return (
                      <button
                        key={act.name}
                        onClick={() => toggleAct(act.name)}
                        className="text-left rounded-xl p-5 transition-all duration-300 cursor-pointer group"
                        style={{
                          background: open ? cat.bgTint : C.cream,
                          border: `1px solid ${open ? cat.color : C.border}`,
                          boxShadow: open ? `0 4px 20px ${cat.color}15` : 'none',
                        }}
                      >
                        <p className="text-[14px] font-bold mb-2 tracking-tight">{act.name}</p>
                        <p className="text-[12.5px] leading-[1.65] mb-3" style={{ color: C.sub }}>{act.observation}</p>
                        {open && (
                          <div className="pt-3 mt-3" style={{ borderTop: `1px solid ${C.border}` }}>
                            <p className="text-[10px] font-mono uppercase tracking-[0.2em] mb-1.5" style={{ color: cat.color }}>의미</p>
                            <p className="text-[12.5px] font-serif italic leading-[1.65]">{act.meaning}</p>
                          </div>
                        )}
                        <p className="text-[10px] font-mono mt-2 group-hover:opacity-100 opacity-50 transition-opacity" style={{ color: cat.color }}>
                          {open ? '접기' : '의미 보기 +'}
                        </p>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* 인사이트 콜아웃 */}
          <div className="rv mt-16 rounded-xl p-8 sm:p-10" style={{ ...rv, background: C.warm, border: `1px solid ${C.border}` }}>
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] mb-4" style={{ color: C.accent }}>핵심 인사이트</p>
            <p className="text-[20px] sm:text-[24px] font-serif leading-[1.5]">
              &ldquo;이것들은 감지해야 할 신호가 아니다. 저항의 행위다. 하나하나가 한 사람의 말이다: 나는 아직 여기 있다.&rdquo;
            </p>
          </div>

          {/* 대화형 인터페이스 */}
          <div className="rv mt-16 flex flex-col items-center text-center" style={rv}>
            <IPhoneFrame><ElderHome /></IPhoneFrame>
            <p className="mt-8 text-[14px] font-serif" style={{ color: C.sub }}>
              창가에 앉아 바깥을 보는 경험을 앱이 재현한다.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6"><div className="h-px" style={{ background: C.border }} /></div>

      {/* ═══════════════════════════════════════════════════════════════════
         GAP — 질문형 (Olivia)
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 sm:py-36">
        <div className="max-w-[680px] mx-auto px-6 rv" style={rv}>
          <h2 className="text-[28px] sm:text-[36px] font-bold leading-[1.15] tracking-tight mb-10">
            기존 도구는 무엇을 보고 있는가?
          </h2>
          <div className="space-y-3 text-[18px] sm:text-[22px] leading-[1.6]">
            <p>6개의 간병 앱을 분석했다.</p>
            <p>의료 데이터를 다루는 도구: <strong>6개.</strong></p>
            <p>감정을 보는 도구: <strong>0개.</strong></p>
          </div>
          {/* 미니 시각화 */}
          <div className="mt-12 space-y-3">
            {[
              { name: 'CareNote', has: 2 },
              { name: 'Birdie', has: 2 },
              { name: 'Honor', has: 2 },
              { name: 'CareZone', has: 1 },
              { name: 'Medisafe', has: 1 },
              { name: 'CarePredict', has: 2 },
            ].map((app) => (
              <div key={app.name} className="flex items-center gap-3">
                <span className="text-[13px] w-[100px] flex-shrink-0" style={{ color: C.dim }}>{app.name}</span>
                <div className="flex gap-1.5">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <span
                      key={i}
                      className="w-3 h-3 rounded-full"
                      style={{
                        background: i < app.has ? C.text : 'transparent',
                        border: i < app.has ? 'none' : `1.5px solid ${C.border}`,
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
            <div className="flex items-center gap-4 mt-4 text-[11px] font-mono" style={{ color: C.dim }}>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: C.text }} /> 다루는 영역</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ border: `1.5px solid ${C.border}` }} /> 비언어 / 감정 / 정체성 / 환경</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6"><div className="h-px" style={{ background: C.border }} /></div>

      {/* ═══════════════════════════════════════════════════════════════════
         CYCLE — 수평 흐름도 (독자적 프레임워크)
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 sm:py-36">
        <div className="max-w-[680px] mx-auto px-6">
          <div className="rv" style={rv}>
            <h2 className="text-[28px] sm:text-[36px] font-bold leading-[1.15] tracking-tight mb-6">
              갇힘은 어떻게 반복되는가?
            </h2>
            <p className="text-[15px] leading-[1.9] mb-16" style={{ color: C.sub }}>
              문제는 단일 실패가 아니다. 각 단계가 다음 단계를 만드는 자기강화 순환이다.
            </p>
          </div>
        </div>

        {/* 세로 타임라인 */}
        <div className="rv max-w-[800px] mx-auto px-6 mb-16" style={rv}>
          <div className="relative pl-10">
            {/* 세로 연결선 */}
            <div className="absolute left-[14px] top-2 bottom-2 w-px" style={{ background: C.border }} />

            {CYCLE.map((step, i) => {
              const progress = i / (CYCLE.length - 1)
              const hue = 40 - progress * 35
              return (
                <div key={i} className="relative pb-8 last:pb-0">
                  {/* 도트 */}
                  <div
                    className="absolute left-[-24px] top-[6px] w-[18px] h-[18px] rounded-full flex items-center justify-center"
                    style={{ background: `hsl(${hue}, 45%, 95%)`, border: `2px solid hsl(${hue}, 40%, 70%)` }}
                  >
                    <span className="text-[8px] font-mono font-bold" style={{ color: `hsl(${hue}, 45%, 45%)` }}>
                      {i + 1}
                    </span>
                  </div>
                  {/* 텍스트 */}
                  <p className="text-[15px] font-bold leading-tight">{step}</p>
                </div>
              )
            })}

            {/* 루프 */}
            <div className="relative pt-4">
              <div
                className="absolute left-[-24px] top-[10px] w-[18px] h-[18px] rounded-full flex items-center justify-center"
                style={{ background: C.warm, border: `2px solid ${C.accent}` }}
              >
                <span className="text-[10px]" style={{ color: C.accent }}>↩</span>
              </div>
              <p className="text-[13px] font-mono" style={{ color: C.dim }}>퇴원 또는 사망까지 반복</p>
            </div>
          </div>
        </div>

        <div className="max-w-[680px] mx-auto px-6">
          <p className="rv text-[15px] font-medium text-center" style={{ ...rv, color: C.accent }}>
            SilentCues는 하나가 아닌 모든 단계에 개입한다.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6"><div className="h-px" style={{ background: C.border }} /></div>

      {/* ═══════════════════════════════════════════════════════════════════
         SCIENCE — 질문형 (Olivia)
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 sm:py-36">
        <div className="max-w-[680px] mx-auto px-6">
          <h2 className="rv text-[28px] sm:text-[36px] font-bold leading-[1.15] tracking-tight mb-10" style={rv}>
            직감이 아니라 과학이 증명하는가?
          </h2>
          <div className="space-y-10">
            {[
              { who: 'Goffman, 1961', what: '시설은 루틴을 통해 체계적으로 정체성을 벗긴다.' },
              { who: 'Ulrich, 1984', what: '창문 밖 나무가 보이는 환자는 벽을 본 환자보다 하루 덜 입원했다.' },
              { who: 'Magai et al., 1996', what: '전문 간병인의 비언어 감정 인식 정확도는 40~50%.' },
              { who: 'Kitwood, 1997', what: '초조, 공격성으로 분류되는 행동은 비인간적 환경에 대한 합리적 반응이다.' },
              { who: 'Eden Alternative', what: '식물, 동물, 아이를 도입한 요양원에서 향정신성 약물이 50% 줄었다.' },
              { who: '업계 데이터', what: '장기 돌봄 종사자의 85%가 공감 피로를 경험한다.' },
            ].map((c, i) => (
              <div key={i} className="rv" style={rv}>
                <p className="text-[12px] font-mono mb-2" style={{ color: C.accent }}>{c.who}</p>
                <p className="text-[15px] leading-[1.8]" style={{ color: C.sub }}>{c.what}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6"><div className="h-px" style={{ background: C.border }} /></div>

      {/* ═══════════════════════════════════════════════════════════════════
         SOLUTION — 열림. 해방. (text 680px → mockups max-w-5xl~풀너비)
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 sm:py-36">
        <div className="max-w-[680px] mx-auto px-6">
          <h2 className="rv text-[28px] sm:text-[36px] font-bold leading-[1.15] tracking-tight mb-6" style={rv}>
            그래서 이걸 만들기로 했다
          </h2>
          <p className="rv text-[15px] leading-[1.9]" style={{ ...rv, color: C.sub }}>
            이 행동들이 존재하는 이유는 환경이 강제하기 때문이다. 해결책은 행동을 감지하는 것이 아니라, 이 행동들이 필요 없게 만드는 것이다.
          </p>
          <p className="rv text-[15px] leading-[1.9] mt-4" style={{ ...rv, color: C.sub }}>
            SilentCues는 두 개의 앱이다. 어르신이 보는 앱과, 가족이 보내는 앱. 복잡한 건 가족 쪽에. 어르신은 아무것도 배울 필요 없다.
          </p>
        </div>

        <div className="max-w-[680px] mx-auto px-6 mt-16 space-y-20">
          {/* ── 1: 정체성 유지 ── */}
          <div className="rv" style={rv}>
            <p className="text-[12px] font-mono uppercase tracking-[0.2em] mb-4" style={{ color: C.accent }}>01: 정체성 유지</p>
            <p className="text-[20px] sm:text-[24px] font-bold leading-[1.3] tracking-tight mb-4">204호 환자가 아니라, 영숙 할머니.</p>
            <p className="text-[15px] leading-[1.9] mb-8" style={{ color: C.sub }}>
              Goffman(1961)은 시설이 소지품 제거, 표준화된 환경으로 정체성을 체계적으로 벗긴다고 했다. SilentCues 홈 화면은 이것의 반대다. 앱을 열면 가족 사진이 있고, 시간에 따라 바뀌는 자연이 있다. Ulrich(1984)의 연구에서 창밖에 나무가 보이는 환자는 1일 빨리 퇴원했다. 이 앱이 디지털 창문이 된다.
            </p>
            <div className="space-y-3 mb-8">
              {['가족 사진 홈 화면 — 가족이 보낸 사진이 배경이 된다. 어르신은 아무것도 안 해도 된다.', '시간별 자연 배경 — 아침엔 파란 하늘, 저녁엔 노을. 갇힌 공간에서도 하루가 흐른다.', '선택지는 하나 — 메시지가 오면 알림 하나. Hick\'s Law: 선택지가 적을수록 부담이 없다.'].map((f, i) => (
                <div key={i} className="rounded-xl p-5" style={{ background: C.cream, border: `1px solid ${C.border}` }}>
                  <p className="text-[14px] leading-[1.7]">{f}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <IPhoneFrame><ElderHome /></IPhoneFrame>
            </div>
          </div>

          {/* ── 2: 가족 연결 ── */}
          <div className="rv" style={rv}>
            <p className="text-[12px] font-mono uppercase tracking-[0.2em] mb-4" style={{ color: C.accent }}>02: 가족 연결</p>
            <p className="text-[20px] sm:text-[24px] font-bold leading-[1.3] tracking-tight mb-4">혼자가 아니라는 증거.</p>
            <p className="text-[15px] leading-[1.9] mb-8" style={{ color: C.sub }}>
              Holt-Lunstad(2010)의 메타분석: 사회적 고립의 사망 위험은 하루 담배 15개비와 동일하다. Seltzer(2012): 사랑하는 사람의 목소리를 들으면 옥시토신이 올라가고 코르티솔이 떨어진다. 같은 내용을 텍스트로 받으면 효과가 없다. 그래서 SilentCues는 음성 메시지를 1순위로 둔다.
            </p>
            <div className="space-y-3 mb-8">
              {['음성 메시지 우선 — 손녀의 목소리가 텍스트보다 수십 배 강력하다.', '회상 트리거 — 가족이 사진과 함께 "함덕 해변 갔을 때 기억나요?" 캡션을 보낸다. 이것이 구조화된 긍정적 회상 치료가 된다. (Bohlmeijer, 2003: 효과 d=0.84, 약물 치료급)', 'AI가 이어받는다 — "그때 누구랑 가셨어요?" 통합적 회상으로 유도하고, 후회 방향은 부드럽게 전환한다.'].map((f, i) => (
                <div key={i} className="rounded-xl p-5" style={{ background: C.cream, border: `1px solid ${C.border}` }}>
                  <p className="text-[14px] leading-[1.7]">{f}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <IPhoneFrame><ElderChat /></IPhoneFrame>
            </div>
          </div>

          {/* ── 3: 해방감 ── */}
          <div className="rv rounded-2xl p-8 sm:p-10" style={{ ...rv, background: C.warm, border: `1px solid ${C.border}` }}>
            <p className="text-[12px] font-mono uppercase tracking-[0.2em] mb-4" style={{ color: C.accent }}>03: 해방감</p>
            <p className="text-[20px] sm:text-[24px] font-bold leading-[1.3] tracking-tight mb-4">갇혀 있어도, 세상은 사라지지 않았다.</p>
            <p className="text-[15px] leading-[1.9] mb-8" style={{ color: C.sub }}>
              할아버지는 걷는 시간의 절반 이상을 창가에 앉아 바깥을 보셨다. 대화 속에서 장소를 이야기하면, 배경이 바뀐다. 바다를 이야기하면 파도 소리가 들린다. 산을 이야기하면 새 소리가 들린다. Alvarsson(2010): 자연 소리는 스트레스 회복 속도를 높인다. 이것은 기능이 아니라, 환경 개입이다.
            </p>
            <div className="space-y-3 mb-8">
              {['대화 속 몰입 — 별도 화면이 아니라, 대화의 맥락이 환경을 바꾼다.', '자연 소리 — 파도, 새, 바람, 빗소리. 선택이 아니라 대화에서 자연스럽게.', 'Langer & Rodin(1976) — 선택권만으로 사망률이 절반. 어르신이 "바다가 보고 싶어"라고 말하는 것 자체가 자율성의 행사다.'].map((f, i) => (
                <div key={i} className="rounded-xl p-5" style={{ background: '#fff', border: `1px solid ${C.border}` }}>
                  <p className="text-[14px] leading-[1.7]">{f}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <IPhoneFrame><ElderImmersion /></IPhoneFrame>
            </div>
          </div>

          {/* ── 4: 가족용 앱 ── */}
          <div className="rv" style={rv}>
            <p className="text-[12px] font-mono uppercase tracking-[0.2em] mb-4" style={{ color: C.accent }}>04: 가족의 역할</p>
            <p className="text-[20px] sm:text-[24px] font-bold leading-[1.3] tracking-tight mb-4">복잡한 건 가족 쪽에. 어르신은 제로 셋업.</p>
            <p className="text-[15px] leading-[1.9] mb-8" style={{ color: C.sub }}>
              KOMP(노르웨이)가 증명했다: 어르신에게 기술을 가르치지 않아도 된다. 가족이 사진을 보내면 어르신 화면에 자동으로 나타난다. Peek et al.(2014): 노인 기술 채택의 최대 예측 변수는 가족의 추천이다. 가족용 앱은 사진 보내기, 음성 녹음, 배경 설정, 그리고 할머니의 회상 기록 보기를 할 수 있다.
            </p>
            <div className="flex justify-center gap-5">
              <IPhoneFrame><FamilyHome /></IPhoneFrame>
              <IPhoneFrame><FamilySend /></IPhoneFrame>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6"><div className="h-px" style={{ background: C.border }} /></div>

      {/* ═══════════════════════════════════════════════════════════════════
         BUSINESS — 이 디자인이 현실에서 작동하는 방법
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 sm:py-36" style={{ background: C.cream }}>
        <div className="max-w-[680px] mx-auto px-6">
          <div className="rv" style={rv}>
            <h2 className="text-[28px] sm:text-[36px] font-bold leading-[1.15] tracking-tight mb-6">
              이건 현실에서 가능한가?
            </h2>
            <p className="text-[15px] leading-[1.9]" style={{ color: C.sub }}>
              이미 가능하다는 것이 증명되어 있다.
            </p>
          </div>

          {/* 이미 작동하는 선례 */}
          <div className="rv mt-16" style={rv}>
            <p className="text-[12px] font-mono uppercase tracking-[0.2em] mb-6" style={{ color: C.accent }}>이미 작동하고 있는 선례</p>
            <div className="space-y-4">
              {[
                ['효돌이', '한국 지자체가 대량 구매해서 독거노인에게 배포. 개당 30~50만원.'],
                ['CLOVA CareCall', 'NAVER. 128개 지자체, 30,000명 사용. 90%가 위안받았다고 응답.'],
                ['ElliQ', '뉴욕주 정부가 800대 구매. 외로움 95% 감소 보고.'],
                ['KOMP', '노르웨이. 버튼 1개짜리 화면. 가족이 사진을 보내면 자동 표시.'],
              ].map(([name, desc], i) => (
                <div key={i} className="rounded-xl p-5" style={{ background: '#fff', border: `1px solid ${C.border}` }}>
                  <p className="text-[15px] font-bold mb-1">{name}</p>
                  <p className="text-[13px] leading-[1.6]" style={{ color: C.sub }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 비용 절감 근거 */}
          <div className="rv mt-16" style={rv}>
            <p className="text-[12px] font-mono uppercase tracking-[0.2em] mb-6" style={{ color: C.accent }}>비약물적 개입의 경제성</p>
            <div className="space-y-4">
              {[
                ['향정신성 약물 비용', '입소자당 연 $500~2,000. Eden Alternative: 환경 개입만으로 약물 50% 감소.'],
                ['Music & Memory 프로그램', '개인화된 음악으로 입소자당 연 $3,300~4,000 절감. 위스콘신 요양원 실증.'],
                ['간병인 이직 비용', '이직률 50~75%. 1명당 $3,500~5,000. 공감 피로가 핵심 원인.'],
              ].map(([title, desc], i) => (
                <div key={i} className="rv" style={rv}>
                  <p className="text-[15px] font-bold mb-1">{title}</p>
                  <p className="text-[14px] leading-[1.7]" style={{ color: C.sub }}>{desc}</p>
                </div>
              ))}
            </div>
            <div className="rv mt-10 rounded-xl p-8" style={{ ...rv, background: '#fff', border: `1px solid ${C.border}` }}>
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] mb-3" style={{ color: C.accent }}>핵심 수치</p>
              <p className="text-[20px] sm:text-[24px] font-bold leading-[1.4] tracking-tight">
                비약물적 개입은 입소자당 연 $1,000~4,000의 비용을 절감한다.
              </p>
              <p className="text-[14px] mt-3 leading-[1.6]" style={{ color: C.sub }}>
                SilentCues는 이 개입을 디지털화한다.
              </p>
            </div>
          </div>

          {/* 시장 */}
          <div className="rv mt-16" style={rv}>
            <p className="text-[12px] font-mono uppercase tracking-[0.2em] mb-6" style={{ color: C.accent }}>시장</p>
            <p className="text-[15px] leading-[1.9] mb-6" style={{ color: C.sub }}>
              한국은 2025년 초고령사회에 진입했다. 65세 이상 인구 20% 초과. 독거노인 190만 명, 2030년에는 300만 명이 된다.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                ['5,900개', '한국 요양시설'],
                ['21만 명', '시설 입소자'],
                ['228개', '지자체 (잠재 구매자)'],
                ['12~13조원', '장기요양보험 연간 예산'],
              ].map(([val, label], i) => (
                <div key={i} className="rounded-xl p-5 text-center" style={{ background: '#fff', border: `1px solid ${C.border}` }}>
                  <p className="text-[24px] font-bold tracking-tight" style={{ color: C.accent }}>{val}</p>
                  <p className="text-[13px] mt-1" style={{ color: C.sub }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 비즈니스 모델 */}
          <div className="rv mt-16" style={rv}>
            <p className="text-[12px] font-mono uppercase tracking-[0.2em] mb-6" style={{ color: C.accent }}>비즈니스 모델</p>
            <p className="text-[15px] leading-[1.9] mb-6" style={{ color: C.sub }}>
              효돌이와 CLOVA CareCall이 이미 걸어간 길을 따른다.
            </p>
            <div className="space-y-4">
              {[
                ['B2G (1차 채널)', '지자체가 구매하여 독거노인/시설에 배포. 한국에서 가장 현실적인 경로. 228개 지자체 중 5~15곳과 파일럿 진행이 첫 목표.'],
                ['B2B (2차 채널)', '요양시설에 SaaS로 제공. 입소자당 월 3~10만원. 시설의 평가 점수 향상과 가족 만족도 상승이 구매 동기.'],
                ['가족 무료', '가족용 앱은 무료. 가족의 참여가 높아야 어르신 정서가 안정되고, 그것이 시설의 약물 비용을 줄인다.'],
              ].map(([title, desc], i) => (
                <div key={i} className="rounded-xl p-5" style={{ background: '#fff', border: `1px solid ${C.border}` }}>
                  <p className="text-[15px] font-bold mb-2">{title}</p>
                  <p className="text-[13px] leading-[1.65]" style={{ color: C.sub }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6"><div className="h-px" style={{ background: C.border }} /></div>

      {/* ═══════════════════════════════════════════════════════════════════
         VALIDATION
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 sm:py-36">
        <div className="max-w-[680px] mx-auto px-6">
          <div className="rv" style={rv}>
            <h2 className="text-[28px] sm:text-[36px] font-bold leading-[1.15] tracking-tight mb-6">
              어떻게 검증할 것인가?
            </h2>
            <p className="text-[15px] leading-[1.9] mb-10" style={{ color: C.sub }}>
              다음 단계는 실제 어르신, 가족, 간병인과 함께하는 구조화된 검증이다.
            </p>
            <div className="space-y-3">
              {[
                ['개념 검증', '5명의 간병 경험자와 3명의 가족이 프로토타입을 평가. 음성 메시지의 정서적 효과를 측정.'],
                ['파일럿 배포', '1개 요양시설에서 4주간 시범 운영. 어르신의 앱 사용 패턴, 가족 참여 빈도, 간병인 피드백 수집.'],
                ['성과 측정', '향정신성 약물 처방 변화, 가족 면회/연락 빈도, 어르신 정서 상태(GDS-15) 비교.'],
              ].map(([t, d], i) => (
                <div key={i} className="rounded-xl p-5" style={{ background: C.cream, border: `1px solid ${C.border}` }}>
                  <p className="text-[15px] font-bold mb-1">{t}</p>
                  <p className="text-[13px] leading-[1.6]" style={{ color: C.sub }}>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
         CLOSING — 히어로와 대칭. 근데 이번엔 결심.
         ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="min-h-[60vh] flex items-center justify-center px-6"
        style={{ background: C.warm }}
      >
        <div className="rv max-w-[560px] text-center" style={rv}>
          <p className="font-serif text-[22px] sm:text-[28px] md:text-[34px] leading-[1.55] tracking-tight">
            같은 감정을 반복하고 싶지 않다.<br /><br />
            이건 우리 가족만의 문제가 아니다.<br />
            전 세계가 피할 수 없는 상황이다.<br /><br />
            그래서 이 앱을 진짜 만들고 싶다.
          </p>
        </div>
      </section>

    </div>
  )
}
