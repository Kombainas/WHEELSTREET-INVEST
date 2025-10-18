export default function GridBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(0, 0, 0, 0.03) 49px, rgba(0, 0, 0, 0.03) 50px),
          repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(0, 0, 0, 0.03) 49px, rgba(0, 0, 0, 0.03) 50px)
        `,
      }}
    />
  )
}
