'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false })

export default function Hero() {
  return (
    <section className="h-screen flex overflow-hidden bg-[#F8F6F2]" aria-label="Hero">

      {/* ── Left: editorial text panel ─────────────────────────────────────── */}
      <div className="relative flex flex-1 flex-col justify-between py-14 px-10 md:px-14 xl:px-20 min-w-0">

        {/* Top: label */}
        <motion.p
          className="font-mono text-[10px] tracking-[0.35em] text-neutral-400 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          UX Designer · Cognitive Science · UCLA
        </motion.p>

        {/* Centre: main content */}
        <div>
          <motion.h1
            className="font-serif font-light text-[#111] tracking-[-0.025em] leading-[0.9] mb-8"
            style={{ fontSize: 'clamp(58px, 7.5vw, 100px)' }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.4, 0, 0.2, 1] }}
          >
            Jinsoo<br />Kim
          </motion.h1>

          {/* Thin divider */}
          <motion.div
            className="w-10 h-px bg-neutral-300 mb-7"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.32, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformOrigin: 'left' }}
          />

          <motion.p
            className="text-[15px] font-light text-neutral-500 leading-relaxed max-w-[300px] mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            I design for healthier, better lives —<br />not just longer ones.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.52 }}
          >
            <a
              href="#work"
              className="inline-flex items-center gap-2 bg-[#111] text-white font-mono text-[10px] tracking-[0.2em] uppercase px-6 py-3.5 hover:bg-neutral-800 transition-colors"
            >
              View Work ↓
            </a>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-neutral-300 text-neutral-600 font-mono text-[10px] tracking-[0.2em] uppercase px-6 py-3.5 hover:border-neutral-500 hover:text-neutral-900 transition-colors"
            >
              About Me →
            </Link>
          </motion.div>
        </div>

        {/* Bottom: meta */}
        <motion.div
          className="flex flex-wrap items-center gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.72 }}
        >
          <span className="font-mono text-[9px] tracking-[0.3em] text-neutral-400 uppercase">
            Los Angeles, CA
          </span>
          <span className="w-4 h-px bg-neutral-300" />
          <span className="font-mono text-[9px] tracking-[0.3em] text-neutral-400 uppercase">
            Open to internships
          </span>
        </motion.div>
      </div>

      {/* ── Right: WebGL shader panel ────────────────────────────────────────── */}
      <motion.div
        className="hidden md:block relative w-[42%] lg:w-[46%] shrink-0 m-5 rounded-[20px] overflow-hidden bg-[#0A0807]"
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, delay: 0.08, ease: [0.4, 0, 0.2, 1] }}
        aria-hidden
      >
        <HeroScene />

        {/* Subtle bottom caption */}
        <div className="absolute bottom-5 left-6 right-6 flex justify-between items-end pointer-events-none">
          <span className="font-mono text-[9px] tracking-[0.25em] text-white/25 uppercase">
            GLSL · Domain-warped FBM
          </span>
          <span className="font-mono text-[9px] tracking-[0.25em] text-white/20 uppercase">
            Live
          </span>
        </div>
      </motion.div>

    </section>
  )
}
