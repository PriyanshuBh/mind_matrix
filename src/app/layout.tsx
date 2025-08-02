import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './provider/theme-provider'
import ThemeSwitch from './components/theme-switch'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MindMatrix | Pattern Decoder Game',
  description: 'A puzzle game where players decode hidden patterns from flashing visual signals',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      
      <body className={inter.className}>
      <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
        {children}
      <ThemeSwitch />
      </ThemeProvider>
      </body>
     
    </html>
  )
}