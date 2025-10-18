import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        {/* Lost car emoji */}
        <div className="text-8xl mb-8 animate-bounce">
          🚗
        </div>

        {/* 404 Error */}
        <div className="mb-6">
          <span className="text-8xl font-bold text-black/10">404</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Puslapis neprastas
        </h1>

        {/* Description */}
        <p className="text-lg text-black/70 mb-8">
          Atrodo, kad šis puslapis išvažiavo pas klientą ir dar negrįžo.
          Galbūt jis jau parduotas per 24 valandas?
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-black text-white font-medium text-lg hover:bg-white hover:text-black border border-black transition-colors"
          >
            Grįžti į pradžią
          </Link>
          <Link
            href="/deck"
            className="inline-block px-8 py-4 bg-white text-black font-medium text-lg hover:bg-black hover:text-white border border-black transition-colors"
          >
            Peržiūrėti planą
          </Link>
        </div>

        {/* Fun fact */}
        <div className="mt-12 pt-8 border-t border-black/10">
          <p className="text-sm text-black/40">
            💡 Fun fact: Mūsų vidutinis atsiskaitymo greitis yra 24h - greičiausias rinkoje!
          </p>
        </div>
      </div>
    </main>
  )
}
