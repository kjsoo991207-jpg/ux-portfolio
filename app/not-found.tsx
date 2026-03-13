import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24 text-center">
      <h1 className="text-2xl font-semibold text-[#000000]">Page not found</h1>
      <p className="mt-2 text-[#000000]">The page you’re looking for doesn’t exist.</p>
      <Link
        href="/"
        className="mt-6 inline-block text-sm font-medium text-[#000000]"
      >
        ← Back to Work
      </Link>
    </div>
  )
}
