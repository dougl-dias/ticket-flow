'use client'

import { CheckCircle, LoaderCircle } from 'lucide-react'

import { DataTable, type DataTableColumnDef } from '@/components/data-table'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { type Requester } from '@/lib/data'
import { cn } from '@/lib/utils'

const customerColumns: DataTableColumnDef<Requester>[] = [
  {
    accessorKey: 'name',
    header: 'Solicitante',
    cell: ({ row }) => (
      <div className='flex items-center gap-2.5'>
        <Avatar className='h-7 w-7 shrink-0'>
          <AvatarFallback className='text-[10px] font-bold text-white'>
            {row.original.name
              .split(' ')
              .map((part) => part[0])
              .join('')
              .slice(0, 2)}
          </AvatarFallback>
        </Avatar>

        <div className='flex flex-col'>
          <span className='leading-tight font-medium'>{row.original.name}</span>
          <span className='text-muted-foreground text-xs'>{row.original.email}</span>
        </div>
      </div>
    )
  },
  {
    accessorKey: 'company',
    header: 'Empresa',
    cell: ({ row }) => (
      <div className='flex flex-col'>
        <span className='leading-tight font-medium'>{row.original.company}</span>
        <span className='text-muted-foreground text-xs'>{row.original.plan}</span>
      </div>
    )
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StatusBadge status={row.original.status} />
  },
  {
    accessorKey: 'openTickets',
    header: 'Tickets abertos',
    cell: ({ row }) => <span className='font-semibold'>{row.original.openTickets}</span>
  },
  {
    accessorKey: 'lastContact',
    header: 'Ultimo contato',
    cell: ({ row }) => <span className='text-muted-foreground text-xs'>{row.original.lastContact}</span>
  }
]

function StatusBadge({ status }: { status: Requester['status'] }) {
  const isDone = status === 'Done'
  const Icon = isDone ? CheckCircle : LoaderCircle

  return (
    <Badge variant='secondary'>
      <Icon data-icon='inline-start' className={cn(isDone ? 'text-emerald-500' : 'text-muted-foreground')} />
      {status}
    </Badge>
  )
}

export function CustomersTable({ data }: { data: Requester[] }) {
  return (
    <DataTable
      actions={[
        { label: 'Visualizar' },
        { label: 'WhatsApp' },
        { label: 'Enviar E-mail' },
        { label: 'Delete', variant: 'destructive', separatorBefore: true }
      ]}
      columns={customerColumns}
      data={data}
      enableSelection
      filters={[
        {
          columnId: 'status',
          label: 'Todos os status',
          options: [
            { label: 'Concluido', value: 'Done' },
            { label: 'Em andamento', value: 'In progress' }
          ]
        }
      ]}
      getRowId={(row) => row.id}
      searchPlaceholder='Pesquisar solicitantes...'
      searchableColumnIds={['name', 'email', 'company', 'status']}
    />
  )
}
