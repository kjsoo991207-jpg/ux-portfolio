'use client'

import { useRef, useEffect } from 'react'

const TAU = Math.PI * 2
const SEED_COUNT = 24
const CENTER_R = 6
const STEM_H = 180
const SEED_LEN_MIN = 28
const SEED_LEN_MAX = 42

interface SeedData {
  angle: number
  len: number
  curve: number
  bulbR: number
  phase: number
}

function buildSeeds(): SeedData[] {
  const seeds: SeedData[] = []
  for (let i = 0; i < SEED_COUNT; i++) {
    const base = (i / SEED_COUNT) * TAU
    const jitter = (Math.random() - 0.5) * 0.12
    seeds.push({
      angle: base + jitter,
      len: SEED_LEN_MIN + Math.random() * (SEED_LEN_MAX - SEED_LEN_MIN),
      curve: (Math.random() - 0.5) * 0.15,
      bulbR: 1.0 + Math.random() * 0.6,
      phase: Math.random() * TAU,
    })
  }
  return seeds
}

export default function DandelionTest() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const W = 400
    const H = 500
    canvas.width = W * dpr
    canvas.height = H * dpr
    canvas.style.width = W + 'px'
    canvas.style.height = H + 'px'
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const seeds = buildSeeds()
    const cx = W / 2
    const headY = H / 2 - 40

    let raf = 0

    function draw(now: number) {
      if (!ctx) return
      const t = now * 0.001

      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = '#f5f1e8'
      ctx.fillRect(0, 0, W, H)

      // Gentle global sway
      const sway = Math.sin(t * 0.6) * 1.8

      ctx.save()
      ctx.translate(cx + sway * 0.3, 0)

      // ── Stem ──
      ctx.beginPath()
      ctx.moveTo(0, H)
      // Slight curve in stem
      ctx.quadraticCurveTo(
        sway * 1.2,
        H * 0.65,
        sway * 0.5,
        headY + CENTER_R
      )
      ctx.strokeStyle = '#7a9a5a'
      ctx.lineWidth = 2.2
      ctx.lineCap = 'round'
      ctx.stroke()

      // Move to head center
      ctx.save()
      ctx.translate(sway * 0.5, headY)

      // Breathing scale
      const breath = 1 + Math.sin(t * 0.8) * 0.02

      ctx.scale(breath, breath)

      // ── Seeds ──
      for (const s of seeds) {
        const wobble = Math.sin(t * 1.2 + s.phase) * 0.03
        const a = s.angle + wobble + sway * 0.008

        ctx.save()
        ctx.rotate(a)

        // Hair line from center outward
        const cp1x = s.len * 0.4
        const cp1y = -s.curve * s.len
        const endX = s.len
        const endY = 0

        ctx.beginPath()
        ctx.moveTo(CENTER_R * 0.8, 0)
        ctx.quadraticCurveTo(cp1x, cp1y, endX, endY)
        ctx.strokeStyle = 'rgba(235,230,220,0.7)'
        ctx.lineWidth = 0.35
        ctx.stroke()

        // Tiny teardrop bulb at tip
        ctx.beginPath()
        ctx.ellipse(endX, endY, s.bulbR, s.bulbR * 1.4, a * 0.3, 0, TAU)
        ctx.fillStyle = 'rgba(250,248,242,0.9)'
        ctx.fill()

        // Micro-filaments from the bulb tip (3-5 tiny hairs)
        const filCount = 3 + Math.floor(Math.random() * 100) % 3
        for (let f = 0; f < filCount; f++) {
          const fa = ((f / filCount) - 0.5) * 1.2
          const fl = 3 + Math.random() * 3
          ctx.beginPath()
          ctx.moveTo(endX + s.bulbR * 0.5, endY)
          ctx.lineTo(
            endX + s.bulbR + Math.cos(fa) * fl,
            endY + Math.sin(fa) * fl
          )
          ctx.strokeStyle = 'rgba(240,236,226,0.5)'
          ctx.lineWidth = 0.2
          ctx.stroke()

          // Dot at filament tip
          ctx.beginPath()
          ctx.arc(
            endX + s.bulbR + Math.cos(fa) * fl,
            endY + Math.sin(fa) * fl,
            0.3,
            0,
            TAU
          )
          ctx.fillStyle = 'rgba(245,242,234,0.6)'
          ctx.fill()
        }

        ctx.restore()
      }

      // ── Center bulb ──
      // Shadow
      const cg = ctx.createRadialGradient(0, 0, 0, 0, 0, CENTER_R * 1.4)
      cg.addColorStop(0, 'rgba(140,130,110,0.25)')
      cg.addColorStop(1, 'rgba(140,130,110,0)')
      ctx.beginPath()
      ctx.arc(0, 2, CENTER_R * 1.4, 0, TAU)
      ctx.fillStyle = cg
      ctx.fill()

      // Main bulb
      const bg = ctx.createRadialGradient(
        -CENTER_R * 0.3,
        -CENTER_R * 0.3,
        0,
        0,
        0,
        CENTER_R
      )
      bg.addColorStop(0, '#e8e2d4')
      bg.addColorStop(0.6, '#d5ccb8')
      bg.addColorStop(1, '#c2b89e')
      ctx.beginPath()
      ctx.arc(0, 0, CENTER_R, 0, TAU)
      ctx.fillStyle = bg
      ctx.fill()

      // Highlight on bulb
      ctx.beginPath()
      ctx.arc(-CENTER_R * 0.25, -CENTER_R * 0.25, CENTER_R * 0.4, 0, TAU)
      ctx.fillStyle = 'rgba(255,255,255,0.35)'
      ctx.fill()

      ctx.restore() // head translate
      ctx.restore() // sway translate

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: '#f5f1e8' }}
    >
      <canvas ref={canvasRef} />
    </div>
  )
}
