import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Busca - Serial',
  description: 'Busque por filmes e séries na Serial',
}

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}