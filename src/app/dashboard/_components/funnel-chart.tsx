import { Card, CardContent, CardHeader } from '@/components/ui/card'

import { cn } from '@/lib/utils'

const stages = [
  { label: 'Recebidos', count: 218, value: '100%', pct: 100, color: 'bg-indigo-500' },
  { label: 'Triagem', count: 142, value: '65%', pct: 65, color: 'bg-sky-500' },
  { label: 'Atendimento', count: 87, value: '40%', pct: 40, color: 'bg-purple-500' },
  { label: 'Aguardando', count: 48, value: '22%', pct: 22, color: 'bg-amber-500' },
  { label: 'Resolvidos', count: 24, value: '11%', pct: 11, color: 'bg-emerald-500' },
]

export function FunnelChart() {
  return (
    <Card>
      <CardHeader>
        <h2 className='text-sm font-semibold'>Fluxo de Atendimento</h2>
        <p className='text-muted-foreground text-xs'>Resolução geral</p>
      </CardHeader>

      <CardContent>
        <div className='flex flex-col gap-5'>
          {stages.map((stage) => (
            <div key={stage.label} className='flex flex-col gap-1'>
              <div className='flex items-center justify-between gap-3'>
                <div className='flex min-w-0 items-center gap-2'>
                  <span className='w-24 shrink-0 text-xs font-medium'>{stage.label}</span>
                  <span className='text-muted-foreground text-[11px]'>{stage.count} tickets</span>
                </div>

                <span className='shrink-0 text-xs font-semibold'>{stage.value}</span>
              </div>

              <div className='bg-secondary h-2 overflow-hidden rounded-full'>
                <div
                  className={cn('h-full rounded-full transition-all', stage.color)}
                  style={{ width: `${stage.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
