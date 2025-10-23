'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const NDA_STORAGE_KEY = 'wheelstreet_nda_accepted'

export default function NDAAcceptance() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasAgreed, setHasAgreed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if NDA was already accepted
    const ndaAccepted = localStorage.getItem(NDA_STORAGE_KEY)
    if (ndaAccepted === 'true') {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
    setIsLoading(false)
  }, [])

  const handleAccept = () => {
    if (!hasAgreed) return

    // Save to localStorage
    localStorage.setItem(NDA_STORAGE_KEY, 'true')
    localStorage.setItem('wheelstreet_nda_date', new Date().toISOString())
    setIsOpen(false)
  }

  if (isLoading) {
    return null // Don't show anything while loading
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 md:p-10"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="mb-4 text-5xl">🔒</div>
              <h2 className="text-3xl font-bold mb-3">Konfidencialus turinys</h2>
              <p className="text-black/70 leading-relaxed">
                Šis investuotorams skirtas portalas turi konfidencialią informaciją apie WheelStreet
                verslo planą, finansines prognozes ir strategiją.
              </p>
            </div>

            {/* NDA Terms */}
            <div className="bg-black/5 rounded-xl p-6 mb-6 max-h-60 overflow-y-auto">
              <h3 className="font-bold mb-3 text-lg">Konfidencialumo susitarimas (NDA)</h3>
              <div className="text-sm text-black/70 space-y-3 leading-relaxed">
                <p>
                  <strong>1. Konfidenciali informacija:</strong> Visa šiame portale pateikta informacija,
                  įskaitant finansines prognozes, verslo planus, partnerių duomenis ir strategiją yra
                  griežtai konfidenciali.
                </p>
                <p>
                  <strong>2. Naudojimo apribojimai:</strong> Šią informaciją galite naudoti tik
                  asmeniniam investavimo sprendimo priėmimui. Draudžiama dalintis, kopijuoti ar
                  perduoti tretiesiems asmenims.
                </p>
                <p>
                  <strong>3. Saugojimo pareiga:</strong> Įsipareigojate saugoti gautą informaciją ir
                  neatskleisti jos jokiems tretiesiems asmenims, įskaitant konkurentus, žiniasklaidą
                  ar kitas šalis.
                </p>
                <p>
                  <strong>4. Galiojimas:</strong> Šis konfidencialumo įsipareigojimas galioja 5 metus
                  nuo šios sutikimo datos arba iki WheelStreet viešo IPO, priklausomai nuo to, kas
                  įvyksta anksčiau.
                </p>
                <p>
                  <strong>5. Pasekmės:</strong> Konfidencialumo pažeidimas gali turėti teisinių
                  pasekmių ir finansinių nuostolių atlyginimo reikalavimą.
                </p>
              </div>
            </div>

            {/* Checkbox Agreement */}
            <div className="mb-6">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={hasAgreed}
                  onChange={(e) => setHasAgreed(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-2 border-black/20 checked:bg-black checked:border-black focus:ring-2 focus:ring-black/20 cursor-pointer"
                />
                <span className="text-sm text-black/80 leading-relaxed group-hover:text-black transition-colors">
                  Aš perskačiau ir sutinku su <strong>Konfidencialumo susitarimu (NDA)</strong>.
                  Įsipareigoju nesiskleisti gautos informacijos ir naudoti ją tik investavimo
                  sprendimo priėmimui.
                </span>
              </label>
            </div>

            {/* Accept Button */}
            <button
              onClick={handleAccept}
              disabled={!hasAgreed}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 ${
                hasAgreed
                  ? 'bg-black text-white hover:bg-black/90 shadow-lg hover:shadow-xl hover:scale-[1.02]'
                  : 'bg-black/10 text-black/40 cursor-not-allowed'
              }`}
            >
              {hasAgreed ? 'Sutinku ir tęsiu ✓' : 'Pažymėkite sutikimą'}
            </button>

            {/* Footer Note */}
            <div className="mt-6 text-center text-xs text-black/40 border-t border-black/10 pt-4">
              Sutikimo data bus išsaugota jūsų naršyklėje
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
