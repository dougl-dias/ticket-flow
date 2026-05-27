'use client'

import { CheckCircle, LoaderCircle } from 'lucide-react'

import { DataTable, type DataTableColumnDef } from '@/components/data-table'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type RequesterStatus = 'Done' | 'In progress'

interface Requester {
  id: string
  name: string
  email: string
  company: string
  plan: string
  lastTicket: string
  openTickets: number
  status: RequesterStatus
  lastContact: string
}

const requesters: Requester[] = [
  {
    id: '1',
    name: 'Carlos Lima',
    email: 'carlos@nubank.com.br',
    company: 'NuBank',
    plan: 'Enterprise',
    lastTicket: 'Erro ao acessar painel',
    openTickets: 3,
    status: 'Done',
    lastContact: 'Hoje'
  },
  {
    id: '2',
    name: 'Mariana Costa',
    email: 'm.costa@ifood.com.br',
    company: 'iFood',
    plan: 'Business',
    lastTicket: 'Boleto nao gerado',
    openTickets: 1,
    status: 'In progress',
    lastContact: 'Ontem'
  },
  {
    id: '3',
    name: 'Pedro Alves',
    email: 'pedro.alves@magazineluiza.com',
    company: 'Magazine Luíza',
    plan: 'Enterprise',
    lastTicket: 'Integração API instável',
    openTickets: 2,
    status: 'Done',
    lastContact: '2d atrás'
  },
  {
    id: '4',
    name: 'Ana Souza',
    email: 'ana.souza@mercadolivre.com',
    company: 'Mercado Livre',
    plan: 'Business',
    lastTicket: 'Divergência no cadastro',
    openTickets: 1,
    status: 'Done',
    lastContact: '3d atrás'
  },
  {
    id: '5',
    name: 'Rafael Mendes',
    email: 'rafael@totvs.com',
    company: 'Totvs',
    plan: 'Starter',
    lastTicket: 'Permissão de usuário',
    openTickets: 0,
    status: 'Done',
    lastContact: '1sem atrás'
  }
]

const tableColumns: DataTableColumnDef<Requester>[] = [
  {
    accessorKey: 'name',
    header: 'Solicitantes',
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
    accessorKey: 'lastTicket',
    header: 'Último Ticket',
    cell: ({ row }) => <span className='font-semibold'>{row.original.lastTicket}</span>
  },
  {
    accessorKey: 'openTickets',
    header: 'Abertos',
    cell: ({ row }) => <span className='font-semibold'>{row.original.openTickets}</span>
  },
  {
    accessorKey: 'lastContact',
    header: 'Último Contato',
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

export function RequestersTable() {
  return (
    <DataTable
      actions={[
        { label: 'Visualizar' },
        { label: 'WhatsApp' },
        { label: 'Enviar E-mail' },
        { label: 'Delete', variant: 'destructive', separatorBefore: true }
      ]}
      columns={tableColumns}
      data={requesters}
      filters={[
        {
          columnId: 'status',
          label: 'Todos os status',
          options: [
            { label: 'Concluído', value: 'Done' },
            { label: 'Em andamento', value: 'In progress' }
          ]
        }
      ]}
      getRowId={(row) => row.id}
      searchPlaceholder='Pesquisar solicitantes...'
      searchableColumnIds={['name', 'company', 'status', 'lastTicket']}
    />
  )
}
