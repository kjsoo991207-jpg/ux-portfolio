import type { VennDiagramData } from '@/content/projects'

// Circle geometry (r=200):
// A: cx=285, cy=330  B: cx=515, cy=330  C: cx=400, cy=490
// Zone centers verified geometrically:
const ZONE_POS: Record<string, { x: number; y: number }> = {
  a:   { x: 195, y: 318 },
  b:   { x: 605, y: 318 },
  c:   { x: 400, y: 590 },
  ab:  { x: 400, y: 200 },
  ac:  { x: 265, y: 455 },
  bc:  { x: 535, y: 455 },
  abc: { x: 400, y: 395 },
}

export function VennDiagram({ venn }: { venn: VennDiagramData }) {
  return (
    <svg
      viewBox="0 0 800 740"
      className="w-full"
      aria-label="Pain point overlap diagram"
    >
      {/* Center highlight (abc intersection) */}
      <defs>
        <clipPath id="clip-ab">
          <circle cx="285" cy="330" r="200" />
        </clipPath>
        <clipPath id="clip-abc">
          <circle cx="400" cy="490" r="200" />
        </clipPath>
      </defs>
      {/* Three overlapping circles — very faint */}
      <circle cx="285" cy="330" r="200" fill="#e8e8e4" fillOpacity="0.5" stroke="#ddd" strokeWidth="1" />
      <circle cx="515" cy="330" r="200" fill="#e8e8e4" fillOpacity="0.5" stroke="#ddd" strokeWidth="1" />
      <circle cx="400" cy="490" r="200" fill="#e8e8e4" fillOpacity="0.5" stroke="#ddd" strokeWidth="1" />

      {/* ABC intersection highlight — strong green */}
      <g clipPath="url(#clip-ab)">
        <g clipPath="url(#clip-abc)">
          <circle cx="515" cy="330" r="200" fill="#D4A853" fillOpacity="0.35" />
        </g>
      </g>

      {/* Circle A label — upper left */}
      <text x="195" y="88" textAnchor="middle" fontSize="13" letterSpacing="0.14em" fill="#fff" fontFamily="system-ui,sans-serif" fontWeight="500">
        {venn.a.label.toUpperCase()}
      </text>
      {venn.a.sub && (
        <text x="195" y="108" textAnchor="middle" fontSize="11" fill="#a3a3a3" fontFamily="system-ui,sans-serif">
          {venn.a.sub}
        </text>
      )}

      {/* Circle B label — upper right */}
      <text x="605" y="88" textAnchor="middle" fontSize="13" letterSpacing="0.14em" fill="#fff" fontFamily="system-ui,sans-serif" fontWeight="500">
        {venn.b.label.toUpperCase()}
      </text>
      {venn.b.sub && (
        <text x="605" y="108" textAnchor="middle" fontSize="11" fill="#a3a3a3" fontFamily="system-ui,sans-serif">
          {venn.b.sub}
        </text>
      )}

      {/* Circle C label — bottom */}
      <text x="400" y="714" textAnchor="middle" fontSize="13" letterSpacing="0.14em" fill="#fff" fontFamily="system-ui,sans-serif" fontWeight="500">
        {venn.c.label.toUpperCase()}
      </text>
      {venn.c.sub && (
        <text x="400" y="732" textAnchor="middle" fontSize="11" fill="#a3a3a3" fontFamily="system-ui,sans-serif">
          {venn.c.sub}
        </text>
      )}

      {/* Zone contents */}
      {venn.zones.map((zone) => {
        const pos = ZONE_POS[zone.id]
        if (!pos) return null
        const isCenter = zone.id === 'abc'
        return (
          <g key={zone.id}>
            <text
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              fontSize={isCenter ? '14' : '18'}
              fontWeight={isCenter ? '700' : '500'}
              fill={isCenter ? '#D4A853' : '#fff'}
              fontFamily="system-ui,sans-serif"
            >
              {zone.heading}
            </text>
            {zone.sub && (
              <text
                x={pos.x}
                y={pos.y + 20}
                textAnchor="middle"
                fontSize="11"
                fill={isCenter ? '#D4A853' : '#737373'}
                fontFamily="system-ui,sans-serif"
              >
                {zone.sub}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
