import { Card, CardContent } from '@/components/ui/card'

import { cn } from '@/lib/utils'

import { tickets } from './data'

export function KpiCards() {
  const critical = tickets.filter((t) => t.priority === 'Crítica').length
  const open = tickets.filter((t) => !['Resolved', 'Closed'].includes(t.status)).length
  const avgSla = Math.round(tickets.reduce((a, t) => a + t.sla, 0) / tickets.length)

  const kpis = [
    {
      label: 'Total de Tickets',
      value: tickets.length.toString(),
      sub: 'na fila atual'
    },
    {
      label: 'Críticos',
      value: critical.toString(),
      sub: critical > 1 ? 'precisam de atenção' : 'precisa de atenção',
      highlight: true
    },
    {
      label: 'Em Aberto',
      value: open.toString(),
      sub: 'aguardando resolução'
    },
    {
      label: 'SLA Médio',
      value: `${avgSla}%`,
      sub: 'cumprimento atual'
    }
  ]

  return (
    <div className='grid grid-cols-4 gap-3'>
      {kpis.map((s) => (
        <Card key={s.label}>
          <CardContent>
            <h3 className='text-muted-foreground mb-1 text-xs font-medium'>{s.label}</h3>

            <p
              className={cn(
                'text-2xl font-semibold tracking-tight',
                s.highlight ? 'text-[oklch(0.55_0.22_25)]' : 'text-foreground'
              )}
            >
              {s.value}
            </p>

            <p className='text-muted-foreground mt-1 text-xs'>{s.sub}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
