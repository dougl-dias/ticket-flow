import type { Metadata } from 'next'

import { Noto_Sans } from 'next/font/google'

import { cn } from '@/lib/utils'

import { AuthProvider } from '@/providers/auth-provider'

import '@/styles/globals.css'

const notoSans = Noto_Sans({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'TicketFlow Support',
  description: 'Sistema de tickets e suporte para acompanhar chamados, prioridades e atendimento.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='pt-br' className={cn('dark font-sans', notoSans.variable)}>
      <body className='flex min-h-full flex-col'>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
