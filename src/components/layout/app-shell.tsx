'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'

import { Sidebar } from '@/components/layout/sidebar'
import { TopNavbar } from '@/components/layout/top-navbar'
import { cn } from '@/lib/utils'

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  if (pathname === '/login') {
    return children
  }

  function handleSidebarToggle() {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      setIsDesktopSidebarOpen((open) => !open)
      return
    }

    setIsMobileSidebarOpen((open) => !open)
  }

  return (
    <div className='bg-background flex h-screen w-full overflow-hidden'>
      <div
        className={cn(
          'hidden shrink-0 overflow-hidden transition-[width] duration-300 ease-out lg:block',
          isDesktopSidebarOpen ? 'w-60' : 'w-0'
        )}
      >
        <Sidebar />
      </div>

      <div
        className={cn(
          'fixed inset-0 z-50 transition-opacity duration-200 ease-out lg:hidden',
          isMobileSidebarOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <button
          type='button'
          aria-label='Fechar menu lateral'
          className='bg-background/80 absolute inset-0 backdrop-blur-sm'
          onClick={() => setIsMobileSidebarOpen(false)}
        />

        <Sidebar
          className={cn(
            'relative h-dvh shadow-xl transition-transform duration-300 ease-out',
            isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          )}
          onClose={() => setIsMobileSidebarOpen(false)}
          onNavigate={() => setIsMobileSidebarOpen(false)}
        />
      </div>

      <div className='flex min-w-0 flex-1 flex-col overflow-hidden'>
        <TopNavbar onSidebarToggle={handleSidebarToggle} />

        <div className='flex min-h-0 flex-1 overflow-hidden'>
          <main className='min-w-0 flex-1 overflow-y-auto p-4 sm:p-6'>{children}</main>
        </div>
      </div>
    </div>
  )
}
