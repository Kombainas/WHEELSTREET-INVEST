export default function FinalCTA() {
  const bookingUrl = process.env.NEXT_PUBLIC_BOOK_URL || '#'

  return (
    <section className="final-cta" aria-labelledby="final-cta-heading">
      <div className="final-cta-content">
        <h2 id="final-cta-heading" className="text-3xl md:text-4xl font-bold mb-4">
          Domina investicija į Wheelstreet?
        </h2>
        <p className="text-lg md:text-xl text-black/60 mb-8 max-w-2xl mx-auto">
          Susisiekime ir aptarkime investavimo sąlygas.
        </p>
        <div className="final-cta-buttons">
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            aria-label="Suplanuoti skambutį su Wheelstreet komanda"
          >
            Suplanuoti skambutį
          </a>
          <a
            href="/files/financial-model.xlsx"
            download
            className="btn btn-secondary"
            aria-label="Atsisiųsti Wheelstreet finansinį modelį Excel formatu"
          >
            Atsisiųsti finansinį modelį
          </a>
        </div>
      </div>
    </section>
  )
}
