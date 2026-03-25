const CONTACT_EMAIL = 'jinsoo991207@ucla.edu'
const RESUME_URL = '/resume/jinsoo-kim-cv.html'
const LINKEDIN_URL = 'https://www.linkedin.com/in/jinsoo-kim-2715553b9'

export default function Footer() {
  return (
    <footer className="bg-white mt-auto">
      <div className="mx-auto max-w-7xl border-l border-r border-t border-neutral-200">
        <div className="mx-auto max-w-5xl px-6 py-12">
        <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-6">
          Contact
        </p>
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-sm text-[#0a0a0a] hover:underline"
          >
            Mail
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#0a0a0a] hover:underline"
          >
            LinkedIn
          </a>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#0a0a0a] hover:underline"
          >
            Resume
          </a>
        </div>
        </div>
      </div>
    </footer>
  )
}
