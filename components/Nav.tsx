'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-neutral-100/80">
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between px-6 md:px-10 h-14"
        aria-label="Main"
      >
        <Link
          href="/"
          className="font-serif text-sm text-[#111] tracking-tight hover:opacity-60 transition-opacity"
          aria-label="Jinsoo Kim – Home"
        >
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
    </header>
  )
}
