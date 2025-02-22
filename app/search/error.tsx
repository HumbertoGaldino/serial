'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Athiti } from "next/font/google"

const athiti = Athiti({
  subsets: ["latin"],
  weight: ["400", "700"],
})

export default function SearchError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className={`${athiti.className} min-h-screen bg-slate-950 text-white px-8 py-6 flex items-center justify-center`}>
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Algo deu errado!</h2>
        <p className="text-gray-400 mb-6">
          {error.message || 'Ocorreu um erro ao buscar os resultados.'}
        </p>
        <div className="space-x-4">
          <button
            onClick={reset}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            Tentar novamente
          </button>
          <Link
            href="/"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  )
}