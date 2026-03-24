export default function Hero3D() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center"
      style={{ background: '#fff' }}
      aria-label="Hero"
    >
      <div className="flex flex-col items-center select-none">
        {/* 물결 반사 영상 */}
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

        {/* 역할 + 슬로건 */}
        <p
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '12px',
            color: '#999',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginTop: '-20px',
          }}
        >
          Product Designer
        </p>
        <p
          className="font-serif"
          style={{
            fontSize: '18px',
            fontStyle: 'italic',
            color: '#888',
            letterSpacing: '0.02em',
            marginTop: '12px',
          }}
        >
          I don&apos;t ask users what they want. I watch what they do.
        </p>
      </div>
    </section>
  )
}
