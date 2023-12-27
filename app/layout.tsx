import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Database Test',
  description: 'A watch list of movies and shows',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
