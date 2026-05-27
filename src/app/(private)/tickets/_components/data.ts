type TicketPriority = 'Baixa' | 'Média' | 'Alta' | 'Crítica'
export type TicketStatus = 'New' | 'Triage' | 'InProgress' | 'Waiting' | 'Resolved' | 'Closed'

export interface Ticket {
  id: string
  title: string
  requester: string
  category: string
  initials: string
  color: string
  status: TicketStatus
  priority: TicketPriority
  sla: number
  assignee: string
  assigneeInitials: string
  assigneeColor: string
  createdAt: string
}

export const tickets: Ticket[] = [
  {
    id: 'TK-1048',
    title: 'Falha no webhook de pagamento',
    requester: 'Beatriz Rocha',
    category: 'Integracao',
    initials: 'BR',
    color: 'bg-[oklch(0.55_0.22_25)]',
    status: 'InProgress',
    priority: 'Crítica',
    sla: 92,
    assignee: 'Ana Martins',
    assigneeInitials: 'AM',
    assigneeColor: 'bg-primary',
    createdAt: 'Hoje'
  },
  {
    id: 'TK-1047',
    title: 'Erro ao acessar painel',
    requester: 'Carlos Lima',
    category: 'Login',
    initials: 'CL',
    color: 'bg-[oklch(0.62_0.21_264)]',
    status: 'New',
    priority: 'Alta',
    sla: 35,
    assignee: 'Beatriz Rocha',
    assigneeInitials: 'BR',
    assigneeColor: 'bg-[oklch(0.72_0.18_84)]',
    createdAt: 'Hoje'
  },
  {
    id: 'TK-1042',
    title: 'Boleto nao gerado',
    requester: 'Mariana Costa',
    category: 'Financeiro',
    initials: 'MC',
    color: 'bg-[oklch(0.68_0.16_162)]',
    status: 'Triage',
    priority: 'Média',
    sla: 48,
    assignee: 'Carlos Lima',
    assigneeInitials: 'CL',
    assigneeColor: 'bg-[oklch(0.68_0.16_162)]',
    createdAt: 'Ontem'
  },
  {
    id: 'TK-1039',
    title: 'Integracao API instavel',
    requester: 'Pedro Alves',
    category: 'API',
    initials: 'PA',
    color: 'bg-[oklch(0.72_0.18_84)]',
    status: 'Waiting',
    priority: 'Alta',
    sla: 76,
    assignee: 'Rafael Mendes',
    assigneeInitials: 'RM',
    assigneeColor: 'bg-[oklch(0.66_0.19_300)]',
    createdAt: '2d atras'
  },
  {
    id: 'TK-1031',
    title: 'Permissao de usuario',
    requester: 'Ana Souza',
    category: 'Conta',
    initials: 'AS',
    color: 'bg-[oklch(0.66_0.19_300)]',
    status: 'InProgress',
    priority: 'Média',
    sla: 58,
    assignee: 'Ana Martins',
    assigneeInitials: 'AM',
    assigneeColor: 'bg-primary',
    createdAt: '3d atras'
  },
  {
    id: 'TK-1022',
    title: 'Relatorio nao exporta',
    requester: 'Joao Ferreira',
    category: 'Relatorios',
    initials: 'JF',
    color: 'bg-[oklch(0.64_0.22_25)]',
    status: 'Resolved',
    priority: 'Baixa',
    sla: 100,
    assignee: 'Carlos Lima',
    assigneeInitials: 'CL',
    assigneeColor: 'bg-[oklch(0.68_0.16_162)]',
    createdAt: '4d atras'
  }
]
