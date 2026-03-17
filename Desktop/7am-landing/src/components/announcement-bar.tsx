"use client";

// 2 copies = seamless loop: -50% translates exactly 1 copy width
// kismas.com: normal case, • separator, ~13px, no letter-spacing
const SEGMENTS = [
  "Prisijunk prie 7AM bendruomenės",
  "Keisk savo rytus, keisk savo gyvenimą",
  "15 000+ narių visame pasaulyje",
  "Pradėk nemokamą 14 dienų bandymą",
  "Join 7AM Community",
  "Transform your mornings, transform your life",
];

const SEP = <span style={{ margin: "0 1.5rem", opacity: 0.4 }}>•</span>;

function Strip() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", flexShrink: 0 }}>
      {SEGMENTS.map((s, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
          {s}
          {SEP}
        </span>
      ))}
    </span>
  );
}

export function AnnouncementBar() {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] bg-black overflow-hidden"
      style={{ height: "44px" }}
      aria-hidden="true"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          whiteSpace: "nowrap",
          width: "max-content",
          willChange: "transform",
          animation: "ticker 28s linear infinite",
          color: "#FFFFFF",
          fontSize: "0.8125rem",
          fontWeight: 400,
          letterSpacing: "0em",
        }}
      >
        <Strip />
        <Strip />
      </div>
    </div>
  );
}
