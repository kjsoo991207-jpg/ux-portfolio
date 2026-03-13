'use client'

import Link from 'next/link'
import IPhoneMockup from './IPhoneMockup'

const FRAME = 10
const RADIUS = 44
const DI_W = 70
const DI_H = 18

const TAGS = ['Case Study', 'Longevity Health', 'AI Coaching', 'Habit Design', 'Product Design / Research']

/* ── Static Aika Coach phone ───────────────────────────────────────── */
function CoachPhone() {
  const W = 260
  const H = 520

  return (
    <div style={{ width: W, height: H }} className="relative flex-shrink-0">
      {/* Body */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius: RADIUS,
          background: 'linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 50%, #151515 100%)',
          boxShadow: '-16px 20px 48px rgba(0,0,0,0.15), 0 0 0 0.5px rgba(255,255,255,0.06)',
        }}
      />
      {/* Top sheen */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: 0,
          borderRadius: RADIUS,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 30%)',
        }}
      />
      {/* Screen */}
      <div
        className="absolute overflow-hidden flex flex-col"
        style={{
          left: FRAME, right: FRAME, top: FRAME, bottom: FRAME,
          borderRadius: RADIUS - 6,
          background: '#f5f7fa',
        }}
      >
        {/* Top bar */}
        <div style={{ background: '#fff', flexShrink: 0 }}>
          <div
            className="absolute left-1/2 -translate-x-1/2 bg-black z-20"
            style={{ top: FRAME + 8, width: DI_W, height: DI_H, borderRadius: 20 }}
          />
          <div
            className="flex items-end justify-between"
            style={{ height: 42, paddingLeft: 18, paddingRight: 18, paddingBottom: 5 }}
          >
            <span style={{ fontSize: 11, fontWeight: 600, color: '#000', letterSpacing: '-0.2px' }}>9:41</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <svg width="15" height="11" viewBox="0 0 15 11" fill="#000">
                <rect x="0" y="7" width="2.4" height="4" rx="0.6" />
                <rect x="3.1" y="5" width="2.4" height="6" rx="0.6" />
                <rect x="6.2" y="3" width="2.4" height="8" rx="0.6" />
                <rect x="9.3" y="1" width="2.4" height="10" rx="0.6" opacity="0.38" />
                <rect x="12.4" y="0" width="2.2" height="11" rx="0.6" opacity="0.38" />
              </svg>
              <svg width="14" height="11" viewBox="0 0 14 11" fill="#000">
                <path d="M7 8.5a1.2 1.2 0 1 1 0 2.4A1.2 1.2 0 0 1 7 8.5z" />
                <path d="M3.2 5.8a5.4 5.4 0 0 1 7.6 0" stroke="#000" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                <path d="M0.5 3.2a9.2 9.2 0 0 1 13 0" stroke="#000" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.5" />
              </svg>
              <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
                <rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="#000" strokeOpacity="0.38" />
                <rect x="19" y="3.5" width="2.5" height="4" rx="1.2" fill="#000" fillOpacity="0.38" />
                <rect x="1.5" y="1.5" width="13" height="8" rx="1.5" fill="#000" />
              </svg>
            </div>
          </div>
          <div className="flex items-center justify-between" style={{ padding: '8px 16px 10px' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 4L6 10L12 16" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>Aika Coach</span>
            <div style={{ width: 20 }} />
          </div>
        </div>

        {/* Conversation */}
        <div className="flex-1 overflow-hidden" style={{ padding: 16 }}>
          {/* User message */}
          <div className="flex justify-end" style={{ marginBottom: 16 }}>
            <div>
              <div style={{ background: '#f0f0f0', borderRadius: '18px 18px 4px 18px', padding: '12px 16px', maxWidth: 200 }}>
                <p style={{ fontSize: 13, color: '#333', lineHeight: 1.5, margin: 0 }}>
                  I&apos;ve been feeling dizzy since I bumped up my NMN to 1000mg. Is this normal?
                </p>
              </div>
              <p style={{ fontSize: 10, color: '#767676', marginTop: 4, textAlign: 'right' }}>9 seconds ago</p>
            </div>
          </div>
          {/* Aika response */}
          <div className="flex justify-start">
            <div>
              <div style={{ background: '#fff', border: '1px solid #e8e8e4', borderRadius: '18px 18px 18px 4px', padding: '12px 16px', maxWidth: 210 }}>
                <div style={{ marginBottom: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1L9.8 5.8L15 6.2L11.2 9.6L12.4 15L8 12.2L3.6 15L4.8 9.6L1 6.2L6.2 5.8L8 1Z" fill="#4A90D9" />
                  </svg>
                </div>
                <p style={{ fontSize: 12, color: '#333', lineHeight: 1.5, margin: 0 }}>Based on your recent logs:</p>
                <ul style={{ fontSize: 12, color: '#333', lineHeight: 1.6, margin: '6px 0 0', paddingLeft: 14, listStyle: 'disc' }}>
                  <li>NMN increased <span style={{ color: '#e07b4f', fontWeight: 500 }}>500mg → 1000mg</span></li>
                  <li>Hydration lower than average</li>
                  <li>Fasting window extended to 16+ hrs</li>
                </ul>
                <p style={{ fontSize: 12, color: '#333', lineHeight: 1.5, marginTop: 8 }}>
                  These factors may be lowering your blood pressure.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ background: '#fff', borderTop: '1px solid #e8e8e4', padding: '10px 14px', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1, background: '#f5f5f5', borderRadius: 20, padding: '8px 14px', fontSize: 12, color: '#767676' }}>
            Ask a follow-up...
          </div>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
            <rect x="7" y="2" width="6" height="10" rx="3" stroke="#767676" strokeWidth="1.2" />
            <path d="M4 9a6 6 0 0 0 12 0" stroke="#767676" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="10" y1="15" x2="10" y2="18" stroke="#767676" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Home indicator */}
        <div style={{ background: '#fff', flexShrink: 0, display: 'flex', justifyContent: 'center', paddingBottom: 6, paddingTop: 2 }}>
          <div style={{ width: 72, height: 4, background: 'rgba(0,0,0,0.18)', borderRadius: 999 }} />
        </div>
      </div>
    </div>
  )
}

/* ── Full Aika card ────────────────────────────────────────────────── */
interface AikaShowcaseProps {
  galleryImages: string[]
  name: string
}

export default function AikaShowcase({ galleryImages, name }: AikaShowcaseProps) {
  return (
    <div
      style={{
        background: '#f5f5f3',
        borderRadius: 16,
        padding: 60,
        minHeight: 500,
      }}
      className="grid grid-cols-1 md:grid-cols-[35fr_65fr] gap-10 items-stretch"
    >
      {/* ── Left column: text ── */}
      <div className="flex flex-col justify-between">
        <div>
          <p style={{ fontSize: 12, fontWeight: 500, color: '#767676', letterSpacing: '0.08em', marginBottom: 16 }}>
            Aika
          </p>
          <h2 className="font-garamond" style={{ fontSize: 36, fontWeight: 400, color: '#111', lineHeight: 1.2 }}>
            Live longer.<br />By design.
          </h2>
          <div className="flex flex-wrap" style={{ marginTop: 32 }}>
            {TAGS.map((tag) => (
              <span
                key={tag}
                style={{
                  border: '1px solid #d0d0cc',
                  borderRadius: 999,
                  padding: '6px 14px',
                  fontSize: 12,
                  color: '#555',
                  background: '#fff',
                  display: 'inline-block',
                  margin: '4px 4px 4px 0',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div style={{ paddingTop: 40 }}>
          <Link
            href="/work/aika"
            style={{
              display: 'inline-block',
              background: '#111',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: 4,
              fontSize: 14,
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            View Work →
          </Link>
        </div>
      </div>

      {/* ── Right column: phones ── */}
      <div className="relative flex items-end justify-center" style={{ minHeight: 460 }}>
        {/* Left phone — Coach, behind */}
        <div
          className="flex-shrink-0"
          style={{
            zIndex: 1,
            transform: 'perspective(1000px) rotateY(6deg) rotateX(2deg)',
          }}
        >
          <CoachPhone />
        </div>

        {/* Right phone — carousel, in front */}
        <div
          className="hidden md:block flex-shrink-0"
          style={{
            position: 'relative',
            zIndex: 2,
            transform: 'perspective(1000px) rotateY(-4deg) rotateX(2deg) translateY(-30px) translateX(20px)',
            marginLeft: -40,
          }}
        >
          <IPhoneMockup images={galleryImages} alt={name} width={220} height={440} />
        </div>
      </div>
    </div>
  )
}
