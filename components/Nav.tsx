'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const RESUME_URL = '/resume/jinsoo-kim-cv.pdf'

const navLinks = [
  { href: '/', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: RESUME_URL, label: 'CV', external: true },
]

export default function Nav() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const isWork = pathname?.startsWith('/work')
  const isAbout = pathname === '/about'

  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      if (currentY < 10) {
        setVisible(true)
      } else if (currentY > lastScrollY.current) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm transition-transform duration-300"
      style={{ transform: visible ? 'translateY(0)' : 'translateY(-100%)' }}
    >
      <div className="mx-auto max-w-7xl border-l border-r border-b border-neutral-200">
        <nav
          className="mx-auto flex max-w-5xl items-center justify-between px-6 md:px-10 h-14"
          aria-label="Main"
        >
          <Link
            href="/"
            className="font-serif text-sm text-[#111] tracking-tight hover:opacity-60 transition-opacity"
            aria-label="Jinsoo Kim – Home"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" className="inline-block mr-2 -mt-0.5">
              <rect x="5.5" y="2" width="1.8" height="10.5" fill="currentColor"/>
              <rect x="4" y="2" width="4.8" height="1" fill="currentColor"/>
              <path d="M5.5,12.5 Q5.5,14.5 3.5,14.5 Q2,14.5 2,13 Q2,12 3,12" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
              <polygon points="7.3,8 12,2.5 13.5,2.5 13.5,3.5 7.3,9" fill="currentColor"/>
              <polygon points="7.3,9 13,14.5 14,14.5 14,13.5 7.3,8" fill="currentColor"/>
              <rect x="12" y="13.5" width="2.5" height="1" fill="currentColor"/>
            </svg>
            Jinsoo Kim
          </Link>

          <ul className="flex items-center gap-8">
            {navLinks.map(({ href, label, external }) => {
              const isActive =
                (label === 'Work' && (isHome || isWork)) ||
                (label === 'About' && isAbout)
              return (
                <li key={href}>
                  {external ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`font-mono text-[10px] uppercase tracking-[0.25em] transition-colors ${
                        isActive ? 'text-[#111]' : 'text-neutral-400 hover:text-neutral-700'
                      }`}
                    >
                      {label}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className={`font-mono text-[10px] uppercase tracking-[0.25em] transition-colors ${
                        isActive ? 'text-[#111]' : 'text-neutral-400 hover:text-neutral-700'
                      }`}
                    >
                      {label}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
