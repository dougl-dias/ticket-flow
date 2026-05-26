'use client'

import { usePathname, useRouter } from 'next/navigation'

import { signOut, useSession } from 'next-auth/react'

import { Headphones, LogOut, Search, X } from 'lucide-react'

import { Avatar, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'

import { getNavItemsBySection } from '@/constants/links'

import { cn } from '@/lib/utils'

type SidebarProps = {
  className?: string
  onClose?: () => void
  onNavigate?: () => void
}

export function Sidebar({ className, onClose, onNavigate }: SidebarProps) {
  const session = useSession()

  const router = useRouter()
  const pathname = usePathname()

  const navigateTo = (href: string) => {
    router.push(href)
    onNavigate?.()
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  return (
    <aside
      className={cn(
        'bg-sidebar border-sidebar-border flex h-screen w-60 min-w-60 shrink-0 flex-col border-r select-none',
        className
      )}
    >
      <div className='border-sidebar-border flex h-14 shrink-0 items-center gap-2.5 border-b px-4'>
        <div className='bg-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-[6px]'>
          <Headphones className='text-primary-foreground h-3.5 w-3.5' strokeWidth={2.5} />
        </div>

        <div className='flex min-w-0 flex-col'>
          <span className='text-foreground text-[13px] leading-tight font-semibold tracking-tight'>
            TicketFlow
          </span>
          <span className='text-muted-foreground text-[10px] leading-tight'>Suporte</span>
        </div>

        {onClose && (
          <button
            type='button'
            aria-label='Fechar menu lateral'
            className='text-muted-foreground hover:bg-sidebar-accent ml-auto rounded-md p-1.5 transition-colors'
            onClick={onClose}
          >
            <X className='h-4 w-4' />
          </button>
        )}
      </div>

      <div className='px-3 pt-3 pb-1'>
        <button className='bg-sidebar-accent border-sidebar-border text-muted-foreground hover: hover:border-border flex h-8 w-full items-center gap-2 rounded-md border px-2.5 text-[12px] transition-all hover:cursor-pointer'>
          <Search className='h-3.5 w-3.5 shrink-0' />

          <span className='flex-1 text-left'>Buscar tickets...</span>

          <kbd className='bg-background/40 border-sidebar-border rounded border px-1 py-0.5 font-mono text-[10px]'>
            Ctrl + K
          </kbd>
        </button>
      </div>

      <nav className='flex flex-1 flex-col gap-0.5 px-2 pt-2'>
        <p className='text-muted-foreground/60 px-2.5 pt-1 pb-1 text-[10px] font-semibold tracking-widest uppercase'>
          Atendimento
        </p>

        {getNavItemsBySection('Atendimento').map((item) => {
          const isActive = pathname === item.href

          return (
            <button
              key={item.label}
              onClick={() => navigateTo(item.href)}
              className={cn(
                'flex w-full items-center gap-2.5 rounded-[6px] px-2.5 py-2 text-left text-[13px] transition-all',
                isActive
                  ? 'bg-sidebar-accent font-medium'
                  : 'text-muted-foreground hover:bg-sidebar-accent/60 hover:'
              )}
            >
              <item.icon
                className={cn(
                  'h-4 w-4 shrink-0 transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground/70'
                )}
                strokeWidth={2}
              />

              <span className='text-foreground flex-1'>{item.title}</span>

              {item.badge && (
                <span
                  className={cn(
                    'min-w-4 rounded-full px-1.5 py-0 text-center text-[10px] leading-4 font-medium',
                    isActive ? 'bg-primary/20 text-primary' : 'bg-sidebar-accent text-muted-foreground'
                  )}
                >
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}

        <p className='text-muted-foreground/60 px-2.5 pt-3 pb-1 text-[10px] font-semibold tracking-widest uppercase'>
          Gestão
        </p>

        {getNavItemsBySection('Gestão').map((item) => {
          const isActive = pathname === item.href

          return (
            <button
              key={item.label}
              onClick={() => navigateTo(item.href)}
              className={cn(
                'flex w-full items-center gap-2.5 rounded-[6px] px-2.5 py-2 text-left text-[13px] transition-all',
                isActive
                  ? 'bg-sidebar-accent font-medium'
                  : 'text-muted-foreground hover:bg-sidebar-accent/60 hover:'
              )}
            >
              <item.icon
                className={cn(
                  'h-4 w-4 shrink-0 transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground/70'
                )}
                strokeWidth={2}
              />
              <span className='flex-1'>{item.title}</span>
            </button>
          )
        })}
      </nav>

      <div className='border-sidebar-border flex items-center gap-2.5 border-t px-3 py-3'>
        <Avatar className='h-7 w-7 shrink-0'>
          <AvatarFallback className='bg-primary text-primary-foreground text-[10px] font-bold'>
            DD
          </AvatarFallback>
        </Avatar>

        {session.data?.user && (
          <div className='flex min-w-0 flex-1 flex-col'>
            <span className='text-foreground truncate text-[12px] leading-tight font-semibold'>
              {session.data.user.name ?? ''}
            </span>
            <span className='text-muted-foreground truncate text-[10px] leading-tight'>
              {session.data.user.email ?? ''}
            </span>
          </div>
        )}

        <Button variant={'ghost'} size={'icon-lg'} onClick={handleLogout}>
          <LogOut className='h-3.5 w-3.5' />
        </Button>
      </div>
    </aside>
  )
}
