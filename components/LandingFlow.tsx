'use client'

import { motion } from 'framer-motion'

const up = (delay = 0) => ({
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
})

const fade = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  },
})

export default function LandingFlow() {
  return (
    <>
      {/* ══════════════════════════════════════════
          SECTION 1 — JINSOO KIM  (white)
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-between px-6 md:px-14 pt-20 pb-14 overflow-hidden bg-white border-t border-neutral-100">

        {/* Top label */}
        <motion.p
          className="text-[10px] tracking-[0.35em] text-neutral-400 uppercase"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }}
          variants={fade(0)}
        >
          UX Designer — Cognitive Science · UCLA
        </motion.p>

        {/* Giant name */}
        <div className="flex flex-col -mt-4">
          {/* JINSOO — sized to fill viewport width */}
          <div className="overflow-hidden">
            <motion.h1
              className="font-sans font-extralight text-[#111] leading-[0.86] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(64px, 14.8vw, 300px)' }}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={up(0)}
            >
              JINSOO
            </motion.h1>
          </div>

          {/* KIM — larger to fill same width (fewer chars) */}
          <div className="overflow-hidden">
            <motion.h1
              className="font-sans font-extralight text-[#111] leading-[0.86] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(64px, 28vw, 560px)' }}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={up(0.08)}
            >
              KIM
            </motion.h1>
          </div>
        </div>

        {/* Bottom meta row */}
        <motion.div
          className="flex flex-wrap items-center gap-6 mt-10"
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fade(0.3)}
        >
          <span className="text-sm font-light text-neutral-400">Human–Computer Interaction</span>
          <span className="w-6 h-px bg-neutral-300" />
          <span className="text-sm font-light text-neutral-400">Research &amp; Product Design</span>
          <span className="w-6 h-px bg-neutral-300" />
          <span className="text-sm font-light text-neutral-400">Los Angeles, CA</span>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — AIKA  (dark)
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-between px-6 md:px-14 pt-20 pb-14 overflow-hidden bg-[#0d0d0d]">

        {/* Top label + number */}
        <motion.div
          className="flex items-center justify-between"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }}
          variants={fade(0)}
        >
          <p className="text-[10px] tracking-[0.35em] text-neutral-600 uppercase">
            01 — Featured Project
          </p>
          <p className="text-[10px] tracking-[0.35em] text-neutral-600 uppercase">
            Health · Behavioral Design
          </p>
        </motion.div>

        {/* Giant project name */}
        <div className="flex flex-col -mt-4">
          <div className="overflow-hidden">
            <motion.h2
              className="font-sans font-extralight text-white leading-[0.86] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(64px, 21.5vw, 420px)' }}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={up(0)}
            >
              AIKA
            </motion.h2>
          </div>

          {/* Tagline below the name */}
          <div className="overflow-hidden mt-2">
            <motion.p
              className="font-sans font-extralight text-neutral-600 leading-[0.9] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(28px, 4.5vw, 88px)' }}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={up(0.1)}
            >
              A Health Companion App
            </motion.p>
          </div>
        </div>

        {/* Bottom: description + meta */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10"
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fade(0.25)}
        >
          {/* Description */}
          <p className="text-base font-light text-neutral-500 leading-relaxed max-w-md">
            Designed to help users build sustainable wellness habits through
            behavioral science and cognitive design — making health feel human.
          </p>

          {/* Meta grid */}
          <div className="grid grid-cols-3 gap-6 self-end">
            {[
              { label: 'Category', value: 'UX Research' },
              { label: 'Focus', value: 'Habit Design' },
              { label: 'Year', value: '2025' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[10px] tracking-[0.25em] text-neutral-700 uppercase mb-2">{label}</p>
                <p className="text-sm font-light text-neutral-400">{value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Decorative rule */}
        <motion.div
          className="absolute bottom-0 left-6 right-6 h-px bg-neutral-900"
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.2 }}
        />
      </section>
    </>
  )
}
