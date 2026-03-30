'use client'

import { useState } from 'react'

export default function ReferencePanel() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Panel */}
      {open && (
        <div className="absolute bottom-14 right-0 w-[320px] max-h-[480px] overflow-y-auto bg-[#111] border border-[#e0e0e0] rounded-xl shadow-lg p-5 mb-2">
          {/* Header */}
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-neutral-400 mb-4">
            Reference: junhyungpark.com
          </p>

          {/* Typography hierarchy */}
          <div className="space-y-4 mb-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.06em] text-neutral-400 mb-1">Section Label</p>
              <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-neutral-400">
                &mdash; Why I built this
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.06em] text-neutral-400 mb-1">Sub Tag</p>
              <span className="text-[11px] uppercase tracking-[0.08em] text-neutral-400 border border-[#e5e5e5] rounded-[4px] px-[10px] py-[3px] inline-block">
                Personal Context
              </span>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.06em] text-neutral-400 mb-1">Section Number + Title</p>
              <p>
                <span className="text-[16px] text-neutral-400">01.</span>{' '}
                <span className="text-[20px] font-semibold text-white">Section Title</span>
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.06em] text-neutral-400 mb-1">Subtitle</p>
              <p className="text-[16px] text-neutral-400">Subtitle text here</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.06em] text-neutral-400 mb-1">Insight Line</p>
              <p className="text-[11px] uppercase tracking-[0.06em] text-neutral-400">
                ↳ From pain point origin
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.06em] text-neutral-400 mb-1">Body</p>
              <p className="text-[15px] leading-[1.8] text-[#444]">
                15px, line-height 1.8, #444
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 my-4" />

          {/* Checklist */}
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-neutral-400 mb-3">
            Aika Checklist
          </p>
          <ul className="space-y-2 text-[13px] text-[#444]">
            <li className="flex items-start gap-2">
              <span className="text-[#2d6a4f] flex-shrink-0">&#10003;</span>
              <span>Neutral section labels (#767676)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2d6a4f] flex-shrink-0">&#10003;</span>
              <span>Pill sub-tags (border, rounded)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2d6a4f] flex-shrink-0">&#10003;</span>
              <span>Number + title hierarchy</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2d6a4f] flex-shrink-0">&#10003;</span>
              <span>Single-column layout</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2d6a4f] flex-shrink-0">&#10003;</span>
              <span>Full-width image containers</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2d6a4f] flex-shrink-0">&#10003;</span>
              <span>Section spacing (140px)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2d6a4f] flex-shrink-0">&#10003;</span>
              <span>Body text: 15px / 1.8 / #444</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2d6a4f] flex-shrink-0">&#10003;</span>
              <span>Insight lines (↳ prefix)</span>
            </li>
          </ul>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-[#111] text-white text-[11px] font-medium tracking-[0.04em] flex items-center justify-center hover:bg-[#333] transition-colors shadow-md"
        aria-label="Toggle reference panel"
      >
        REF
      </button>
    </div>
  )
}
