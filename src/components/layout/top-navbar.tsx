'use client'

import { usePathname } from 'next/navigation'

import { Bell, ChevronRight, PanelLeft, Plus, SlidersHorizontal } from 'lucide-react'

import { Avatar, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'

import { getNavItemByPathname } from '@/lib/links'

type TopNavbarProps = {
  onSidebarToggle?: () => void
}

export function TopNavbar({ onSidebarToggle }: TopNavbarProps) {
  const pathname = usePathname()
  const meta = getNavItemByPathname(pathname)

  return (
    <header className='border-border bg-background flex h-14 shrink-0 items-center gap-3 border-b px-5'>
      <div className='flex items-center gap-1.5 text-sm'>
        <Button
          type='button'
          variant='ghost'
          size='icon'
          className='mr-1 h-8 w-8'
          onClick={onSidebarToggle}
          aria-label='Abrir ou fechar menu lateral'
        >
          <PanelLeft className='h-4 w-4' />
        </Button>

        <span className='text-muted-foreground text-[13px]'>TicketFlow</span>

        <ChevronRight className='text-muted-foreground/50 h-3 w-3' />

        <span className='text-foreground text-[13px] font-semibold'>{meta.title}</span>
      </div>

      <div className='bg-border mx-1 h-4 w-px' />

      <span className='text-muted-foreground hidden text-[12px] md:block'>{meta.description}</span>

      <div className='flex-1' />

      <Button variant={'outline'}>
        <SlidersHorizontal className='h-3.5 w-3.5' />
        <span className='hidden sm:inline'>Filtrar</span>
      </Button>

      <Button>
        <Plus className='h-3.5 w-3.5' />
        <span>Novo ticket</span>
      </Button>

      <div className='bg-border h-4 w-px' />

      <Button variant={'outline'} size={'icon'} className='relative'>
        <Bell className='h-4 w-4' />
        <span className='bg-primary absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full' />
      </Button>

      <Avatar className='h-7 w-7 cursor-pointer'>
        <AvatarFallback className='bg-primary text-primary-foreground text-[10px] font-bold'></AvatarFallback>
      </Avatar>
    </header>
  )
}
