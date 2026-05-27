'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { DataTable, type DataTableColumnDef } from '@/components/data-table'

import { cn } from '@/lib/utils'

import { Ticket, tickets, TicketStatus } from './data'

const statusConfig: Record<TicketStatus, { label: string; color: string; bg: string }> = {
  New: {
    label: 'Novo',
    color: 'text-indigo-500',
    bg: 'bg-indigo-500/20'
  },
  Triage: {
    label: 'Triagem',
    color: 'text-sky-500',
    bg: 'bg-sky-500/20'
  },
  InProgress: {
    label: 'Em atendimento',
    color: 'text-purple-500',
    bg: 'bg-purple-500/20'
  },
  Waiting: {
    label: 'Aguardando',
    color: 'text-amber-500',
    bg: 'bg-amber-500/20'
  },
  Resolved: {
    label: 'Resolvido',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/20'
  },
  Closed: {
    label: 'Fechado',
    color: 'text-muted-foreground',
    bg: 'bg-secondary'
  }
}

const tableColumns: DataTableColumnDef<Ticket>[] = [
  {
    accessorKey: 'ticket',
    header: 'Ticket',
    cell: ({ row }) => (
      <div className='flex items-center gap-2.5'>
        <Avatar className='h-7 w-7 shrink-0'>
          <AvatarFallback className='text-[10px] font-bold text-white'>
            {row.original.requester
              .split(' ')
              .map((part) => part[0])
              .join('')
              .slice(0, 2)}
          </AvatarFallback>
        </Avatar>

        <div className='flex flex-col'>
          <span className='leading-tight font-medium'>{row.original.title}</span>
          <span className='text-muted-foreground text-xs'>{row.original.id}</span>
        </div>
      </div>
    )
  },
  {
    accessorKey: 'requester',
    header: 'Solicitante',
    cell: ({ row }) => (
      <div className='flex flex-col'>
        <span className='leading-tight font-medium'>{row.original.requester}</span>
      </div>
    )
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StatusBadge status={row.original.status} />
  },
  {
    accessorKey: 'priority',
    header: 'Prioridade',
    cell: ({ row }) => <span className='font-semibold'>{row.original.priority}</span>
  },
  {
    accessorKey: 'sla',
    header: 'SLA',
    cell: ({ row }) => <span className='font-semibold'>{row.original.sla}</span>
  },
  {
    accessorKey: 'assignee',
    header: 'Responsável',
    cell: ({ row }) => <span className='font-semibold'>{row.original.assignee}</span>
  },
  {
    accessorKey: 'createdAt',
    header: 'Criado',
    cell: ({ row }) => <span className='text-muted-foreground text-xs'>{row.original.createdAt}</span>
  }
]

export function TicketsTable() {
  return (
    <DataTable
      columns={tableColumns}
      data={tickets}
      filters={[
        {
          columnId: 'status',
          label: 'Todos os status',
          options: [
            { label: 'Novo', value: 'New' },
            { label: 'Triagem', value: 'Triage' },
            { label: 'Em atendimento', value: 'InProgress' },
            { label: 'Aguardando', value: 'Waiting' },
            { label: 'Resolvidos', value: 'Resolved' },
            { label: 'Fechados', value: 'Closed' }
          ]
        }
      ]}
      getRowId={(row) => row.id}
      searchPlaceholder='Pesquisar tickets...'
      searchableColumnIds={['title', 'id', 'requester']}
    />
  )
}

function StatusBadge({ status }: { status: Ticket['status'] }) {
  const currentStatus = statusConfig[status]

  return (
    <Badge className={cn('rounded-sm', currentStatus.color, currentStatus.bg)}>{currentStatus.label}</Badge>
  )
}
