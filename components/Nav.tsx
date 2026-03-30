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
  const [scrolled, setScrolled] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 50)
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/95 backdrop-blur-sm border-b border-white/5'
          : 'bg-transparent'
      }`}
      style={{ transform: visible ? 'translateY(0)' : 'translateY(-100%)' }}
    >
      <div className="mx-auto max-w-7xl">
        <nav
          className="mx-auto flex items-center justify-between px-6 md:px-10 h-14"
          aria-label="Main"
        >
          <Link
            href="/"
            className="font-serif text-sm text-white tracking-tight hover:opacity-60 transition-opacity"
            aria-label="Jinsoo Kim – Home"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="22" height="22" className="block">
              <text x="50" y="72" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="72" fontWeight="400" fill="currentColor" letterSpacing="-8">JK</text>
            </svg>
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
                        isActive ? 'text-white' : 'text-neutral-500 hover:text-emerald-400'
                      }`}
                    >
                      {label}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className={`font-mono text-[10px] uppercase tracking-[0.25em] transition-colors ${
                        isActive ? 'text-white' : 'text-neutral-500 hover:text-emerald-400'
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
