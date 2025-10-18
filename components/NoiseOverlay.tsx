export default function NoiseOverlay() {
  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none opacity-[0.06]"
      style={{
        backgroundImage: 'url(/noise.png)',
        backgroundRepeat: 'repeat',
      }}
    />
  )
}
