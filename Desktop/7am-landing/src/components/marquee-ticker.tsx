"use client";

interface MarqueeTickerProps {
  items?: string[];
  speed?: number;
  /** true = white bg with black text (inverted), false = black bg with white text */
  invert?: boolean;
}

const DEFAULT_ITEMS = [
  "7AM COMMUNITY",
  "RUN EARLY. LIVE BETTER.",
  "KAUNAS · VILNIUS",
  "RYTAS KEIČIA GYVENIMĄ",
  "SVEIKA GYVENSENA",
  "EARLY RISERS CLUB",
  "BE THE BEST VERSION",
  "START AT 7AM",
];

export function MarqueeTicker({
  items = DEFAULT_ITEMS,
  speed = 35,
  invert = false,
}: MarqueeTickerProps) {
  // 4× repeat guarantees seamless fill at any viewport width
  const track = [...items, ...items, ...items, ...items];

  const bg   = invert ? "#FFFFFF" : "#000000";
  const fg   = invert ? "#000000" : "#FFFFFF";
  const sep  = invert ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.25)";
  const bdr  = invert ? "1px solid rgba(0,0,0,0.1)" : "none";

  return (
    <div
      aria-hidden="true"
      style={{
        width: "100%",
        overflow: "hidden",
        background: bg,
        borderTop: bdr,
        borderBottom: bdr,
        paddingTop: "0.6875rem",
        paddingBottom: "0.6875rem",
      }}
    >
      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          width: "max-content",
          willChange: "transform",
          animation: `ticker ${speed}s linear infinite`,
        }}
      >
        {track.map((item, i) => (
          <span
            key={i}
            style={{
              color: fg,
              fontSize: "0.6875rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              paddingRight: "3rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "3rem",
            }}
          >
            {item}
            <span style={{ color: sep, fontSize: "0.5rem" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
