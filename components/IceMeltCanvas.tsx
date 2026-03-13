'use client'

import { useEffect, useRef, useCallback } from 'react'

/* ── 물줄기 ─────────────────────────────────────────────────────────────── */
interface Stream {
  points: { x: number; y: number }[]
  speed: number
  width: number
  opacity: number
  wobbleFreq: number
  wobbleAmp: number
  phase: number
  active: boolean
}

/* ── 코스틱 (빛 굴절 패턴) ──────────────────────────────────────────────── */
interface Caustic {
  x: number
  y: number
  radiusX: number
  radiusY: number
  rotation: number
  rotSpeed: number
  driftX: number
  driftY: number
  opacity: number
  pulseSpeed: number
  pulsePhase: number
}

/* ── 메인 캔버스 ────────────────────────────────────────────────────────── */
export default function IceMeltCanvas({
  width,
  height,
}: {
  width: number
  height: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamsRef = useRef<Stream[]>([])
  const causticsRef = useRef<Caustic[]>([])
  const startTimeRef = useRef(0)

  const getIceBounds = useCallback(() => ({
    left: width * 0.08,
    right: width * 0.92,
    top: height * 0.05,
    bottom: height * 0.75,
  }), [width, height])

  /* ── 물줄기 생성 ────────────────────────────────────────────────────── */
  const createStream = useCallback((): Stream => {
    const ice = getIceBounds()
    const startX = ice.left + Math.random() * (ice.right - ice.left)
    return {
      points: [{ x: startX, y: ice.top + Math.random() * 30 }],
      speed: 0.6 + Math.random() * 0.8,
      width: 2 + Math.random() * 3.5,
      opacity: 0,
      wobbleFreq: 0.015 + Math.random() * 0.025,
      wobbleAmp: 5 + Math.random() * 15,
      phase: Math.random() * Math.PI * 2,
      active: true,
    }
  }, [getIceBounds])

  /* ── 코스틱 생성 ────────────────────────────────────────────────────── */
  const createCaustic = useCallback((): Caustic => {
    const ice = getIceBounds()
    return {
      x: ice.left + Math.random() * (ice.right - ice.left),
      y: ice.top + Math.random() * (ice.bottom - ice.top),
      radiusX: 30 + Math.random() * 60,
      radiusY: 15 + Math.random() * 35,
      rotation: Math.random() * Math.PI,
      rotSpeed: (Math.random() - 0.5) * 0.005,
      driftX: (Math.random() - 0.5) * 0.2,
      driftY: 0.03 + Math.random() * 0.1,
      opacity: 0,
      pulseSpeed: 0.008 + Math.random() * 0.015,
      pulsePhase: Math.random() * Math.PI * 2,
    }
  }, [getIceBounds])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = width
    canvas.height = height
    startTimeRef.current = performance.now()
    streamsRef.current = []
    causticsRef.current = []

    let animId: number

    const animate = (now: number) => {
      const elapsed = (now - startTimeRef.current) / 1000
      ctx.clearRect(0, 0, width, height)

      const ice = getIceBounds()

      /* ── 타이밍: 1초부터 바로 시작 ──────────────────────────────── */
      const phase = elapsed < 1 ? 0 : elapsed < 3 ? 1 : 2
      const intensity = phase === 0 ? 0 : phase === 1 ? (elapsed - 1) / 2 : 1

      /* ── 얼음 내부 클리핑 ──────────────────────────────────────── */
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(ice.left, ice.top)
      ctx.lineTo(ice.right, ice.top)
      ctx.lineTo(ice.right, ice.bottom)
      ctx.lineTo(ice.left, ice.bottom)
      ctx.closePath()
      ctx.clip()

      /* ── 코스틱 스폰 ───────────────────────────────────────────── */
      const maxCaustics = phase === 0 ? 0 : phase === 1 ? 5 : 12
      if (causticsRef.current.length < maxCaustics && Math.random() < 0.03 * intensity) {
        causticsRef.current.push(createCaustic())
      }

      /* ── 코스틱 렌더 ───────────────────────────────────────────── */
      causticsRef.current = causticsRef.current.filter((c) => {
        const targetOpacity = 0.18 + Math.sin(c.pulsePhase) * 0.08
        c.opacity += (targetOpacity - c.opacity) * 0.03
        c.pulsePhase += c.pulseSpeed

        c.x += c.driftX
        c.y += c.driftY
        c.rotation += c.rotSpeed

        if (c.y > ice.bottom + 20 || c.x < ice.left - 40 || c.x > ice.right + 40) {
          return false
        }

        ctx.save()
        ctx.translate(c.x, c.y)
        ctx.rotate(c.rotation)

        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, c.radiusX)
        grad.addColorStop(0, `rgba(210, 235, 255, ${c.opacity * intensity})`)
        grad.addColorStop(0.3, `rgba(195, 225, 250, ${c.opacity * 0.6 * intensity})`)
        grad.addColorStop(0.7, `rgba(185, 215, 245, ${c.opacity * 0.2 * intensity})`)
        grad.addColorStop(1, 'rgba(185, 215, 245, 0)')

        ctx.beginPath()
        ctx.ellipse(0, 0, c.radiusX, c.radiusY, 0, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        /* 코스틱 밝은 중심 */
        ctx.beginPath()
        ctx.ellipse(0, 0, c.radiusX * 0.4, c.radiusY * 0.3, 0, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${c.opacity * 0.6 * intensity})`
        ctx.fill()

        ctx.restore()
        return true
      })

      /* ── 물줄기 스폰 ──────────────────────────────────────────── */
      const maxStreams = phase === 0 ? 0 : phase === 1 ? 5 : 10
      if (
        streamsRef.current.filter((s) => s.active).length < maxStreams &&
        Math.random() < 0.02 * intensity
      ) {
        streamsRef.current.push(createStream())
      }

      /* ── 물줄기 렌더 ──────────────────────────────────────────── */
      streamsRef.current = streamsRef.current.filter((stream) => {
        if (!stream.active) return false

        if (stream.opacity < 0.7) stream.opacity += 0.01

        const last = stream.points[stream.points.length - 1]
        if (last.y < ice.bottom) {
          stream.phase += stream.wobbleFreq
          const newX = last.x + Math.sin(stream.phase) * stream.wobbleAmp * 0.15
          const clampedX = Math.max(ice.left + 5, Math.min(ice.right - 5, newX))
          stream.points.push({
            x: clampedX,
            y: last.y + stream.speed,
          })
        } else {
          stream.opacity -= 0.005
          if (stream.opacity <= 0) {
            stream.active = false
            return false
          }
        }

        if (stream.points.length > 300) stream.points.shift()
        if (stream.points.length < 2) return true

        /* 메인 물줄기 */
        ctx.beginPath()
        ctx.moveTo(stream.points[0].x, stream.points[0].y)

        for (let i = 1; i < stream.points.length - 1; i++) {
          const curr = stream.points[i]
          const next = stream.points[i + 1]
          const cpX = (curr.x + next.x) / 2
          const cpY = (curr.y + next.y) / 2
          ctx.quadraticCurveTo(curr.x, curr.y, cpX, cpY)
        }

        const lastPt = stream.points[stream.points.length - 1]
        ctx.lineTo(lastPt.x, lastPt.y)

        const grad = ctx.createLinearGradient(0, stream.points[0].y, 0, lastPt.y)
        grad.addColorStop(0, `rgba(185, 215, 240, 0)`)
        grad.addColorStop(0.2, `rgba(185, 215, 240, ${stream.opacity * 0.5 * intensity})`)
        grad.addColorStop(1, `rgba(175, 210, 235, ${stream.opacity * 0.8 * intensity})`)

        ctx.strokeStyle = grad
        ctx.lineWidth = stream.width
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.stroke()

        /* 하이라이트 */
        ctx.beginPath()
        ctx.moveTo(stream.points[0].x - 0.8, stream.points[0].y)
        for (let i = 1; i < stream.points.length - 1; i++) {
          const curr = stream.points[i]
          const next = stream.points[i + 1]
          ctx.quadraticCurveTo(curr.x - 0.8, curr.y, (curr.x + next.x) / 2 - 0.8, (curr.y + next.y) / 2)
        }
        ctx.strokeStyle = `rgba(255, 255, 255, ${stream.opacity * 0.4 * intensity})`
        ctx.lineWidth = stream.width * 0.5
        ctx.stroke()

        return true
      })

      ctx.restore()
      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animId)
  }, [width, height, getIceBounds, createStream, createCaustic])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
    />
  )
}
