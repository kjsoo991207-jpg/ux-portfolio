export default function Hero3D() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center"
      style={{ background: '#fff' }}
      aria-label="Hero"
    >
      <div className="flex flex-col items-center select-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: 'clamp(700px, 95vw, 1400px)',
            height: 'auto',
          }}
          draggable={false}
        >
          <source src="/images/hero-name.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Slogan - bottom right with vertical line */}
      <div
        className="absolute bottom-12 right-8 sm:bottom-16 sm:right-16 flex items-start gap-3"
      >
        <div className="w-[1px] h-10 bg-[#ccc] mt-[2px]" />
        <div>
          <p
            className="font-serif text-[15px] sm:text-[17px] text-[#666] leading-snug"
          >
            I don&apos;t ask users what they want. I watch what they do.
          </p>
          <a
            href="/about"
            className="text-[13px] text-[#999] underline underline-offset-2 hover:text-[#111] transition-colors mt-1.5 inline-block"
            style={{ fontFamily: 'var(--font-mono), monospace' }}
          >
            More about me &rarr;
          </a>
        </div>
      </div>
    </section>
  )
}
