import './globals.css'
import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: '戦国日本地図 | Sengoku Japan Map',
  description: 'Modern Japan map entry point for bilingual Sengoku region information.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
