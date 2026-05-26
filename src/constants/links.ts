import type { ElementType } from 'react'
import {
  BarChart2,
  CheckSquare,
  GitBranch,
  LayoutDashboard,
  Settings,
  Ticket,
  Users,
  UsersRound
} from 'lucide-react'

export type NavPage =
  | 'Dashboard'
  | 'Customers'
  | 'Deals'
  | 'Pipeline'
  | 'Tasks'
  | 'Team'
  | 'Reports'
  | 'Settings'

export type NavItem = {
  icon: ElementType
  label: NavPage
  title: string
  description: string
  badge?: string
  href: string
  section: 'Atendimento' | 'Gestão'
}

export const navItems: NavItem[] = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    title: 'Visão geral',
    description: 'Resumo operacional do suporte',
    href: '/dashboard',
    section: 'Atendimento'
  },
  {
    icon: Users,
    label: 'Customers',
    title: 'Solicitantes',
    description: '1.247 usuários cadastrados',
    badge: '1.2k',
    href: '/customers',
    section: 'Atendimento'
  },
  {
    icon: Ticket,
    label: 'Deals',
    title: 'Tickets',
    description: '24 chamados ativos - 7 criticos em aberto',
    badge: '24',
    href: '/tickets',
    section: 'Atendimento'
  },
  {
    icon: GitBranch,
    label: 'Pipeline',
    title: 'Quadro',
    description: '9 tickets em andamento',
    href: '/pipeline',
    section: 'Atendimento'
  },
  {
    icon: CheckSquare,
    label: 'Tasks',
    title: 'Tarefas',
    description: '8 acoes pendentes',
    badge: '8',
    href: '/tasks',
    section: 'Atendimento'
  },
  {
    icon: UsersRound,
    label: 'Team',
    title: 'Equipe',
    description: '12 atendentes ativos',
    href: '/teams',
    section: 'Atendimento'
  },
  {
    icon: BarChart2,
    label: 'Reports',
    title: 'Relatórios',
    description: 'Indicadores de suporte - Maio 2026',
    href: '/reports',
    section: 'Gestão'
  },
  {
    icon: Settings,
    label: 'Settings',
    title: 'Configurações',
    description: 'Conta, equipe e workspace',
    href: '/settings',
    section: 'Gestão'
  }
]

export function getNavItemByPathname(pathname: string) {
  return navItems.find((item) => item.href === pathname) ?? navItems[0]
}

export function getNavItemsBySection(section: NavItem['section']) {
  return navItems.filter((item) => item.section === section)
}
