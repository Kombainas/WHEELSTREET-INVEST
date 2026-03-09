"use client";

interface MarqueeTickerProps {
  /** Items to repeat in the ticker */
  items?: string[];
  /** Speed in seconds for one full pass — lower = faster */
  speed?: number;
  /** Black bg (default) or inverted white bg */
  invert?: boolean;
}

const DEFAULT_ITEMS = [
  "7AM COMMUNITY",
  "KAUNAS · VILNIUS",
  "RYTAS KEIČIA GYVENIMĄ",
  "EARLY RISERS",
  "SVEIKA GYVENSENA",
  "BE THE BEST VERSION",
];

export function MarqueeTicker({
  items = DEFAULT_ITEMS,
  speed = 30,
  invert = false,
}: MarqueeTickerProps) {
  // Duplicate the list so there's always content filling the screen
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div
      className={`w-full overflow-hidden py-3 border-y ${
        invert
          ? "bg-background border-black/10 text-foreground"
          : "bg-foreground border-foreground text-background"
      }`}
      aria-hidden="true"
    >
      <div
        className="flex whitespace-nowrap will-change-transform"
        style={{ animation: `ticker ${speed}s linear infinite` }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="text-[11px] font-medium tracking-[0.18em] uppercase pr-12"
          >
            {item}
            <span className="ml-12 opacity-40">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
