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
            filter: 'contrast(1.8) brightness(1.05)',
          }}
          draggable={false}
        >
          <source src="/images/hero-name.mp4" type="video/mp4" />
        </video>

        {/* 역할 + 슬로건 */}
        <p
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '10px',
            color: '#aaa',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginTop: '16px',
          }}
        >
          Product Designer
        </p>
        <p
          className="font-serif"
          style={{
            fontSize: '15px',
            fontStyle: 'italic',
            color: '#ccc',
            letterSpacing: '0.02em',
            marginTop: '8px',
          }}
        >
          Behavior first. Pixels second.
        </p>
      </div>
    </section>
  )
}
