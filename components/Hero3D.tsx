export default function Hero3D() {
  return (
    <section
      className="relative min-h-screen flex items-center"
      style={{ background: '#ffffff' }}
      aria-label="Hero"
    >
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* 좌측: 텍스트 콘텐츠 */}
        <div className="order-2 md:order-1 flex flex-col gap-6">
          {/* 역할 태그 */}
          <p
            className="tracking-widest uppercase"
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '11px',
              color: '#999',
              letterSpacing: '0.15em',
            }}
          >
            Product Designer
          </p>

          {/* 구분선 */}
          <div
            style={{
              width: '48px',
              height: '1px',
              background: '#d4d4d4',
            }}
          />

          {/* 슬로건 */}
          <p
            style={{
              fontFamily: 'var(--font-dm-sans), "DM Sans", sans-serif',
              fontSize: 'clamp(18px, 2.2vw, 28px)',
              color: '#999',
              letterSpacing: '0.04em',
            }}
          >
            Most design is noise. I make signal.
          </p>

        </div>

        {/* 우측: 얼음 이미지 */}
        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative">
            <img
              src="/images/%20final%20ice.png"
              alt="JINSOO KIM frozen in ice"
              className="select-none"
              style={{
                height: 'clamp(250px, 50vh, 500px)',
                objectFit: 'contain',
              }}
              draggable={false}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                boxShadow: 'inset 0 0 60px 40px #ffffff',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
