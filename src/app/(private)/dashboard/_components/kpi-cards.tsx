'use client'

import { Area, CartesianGrid, ComposedChart, Line, XAxis } from 'recharts'

import { TrendingUp, TrendingDown, Clock3, Inbox, CircleAlert, CheckCircle2 } from 'lucide-react'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'

import { cn } from '@/lib/utils'

const sparkData = [
  [4, 7, 5, 9, 6, 10, 8, 12, 9, 14],
  [10, 8, 11, 7, 9, 12, 8, 6, 9, 11],
  [3, 5, 4, 7, 6, 8, 7, 9, 8, 11],
  [8, 9, 7, 10, 11, 9, 12, 13, 11, 14]
].map((d) => d.map((v, i) => ({ x: i, v })))

const chartConfig = {
  v: {
    label: 'Valor'
  }
} satisfies ChartConfig

const kpis = [
  {
    id: 'open-tickets',
    title: 'Tickets Abertos',
    value: '142',
    change: '+7',
    up: true,
    sub: 'novos esta semana',
    icon: Inbox,
    color: 'text-sky-500',
    chartColor: 'oklch(68.5% 0.169 237.323)',
    data: sparkData[0]
  },
  {
    id: 'critical-tickets',
    title: 'Críticos',
    value: '18',
    change: '-3',
    up: false,
    sub: 'vs. ontem',
    icon: CircleAlert,
    color: 'text-red-500',
    chartColor: 'oklch(63.7% 0.237 25.331)',
    data: sparkData[1]
  },
  {
    id: 'resolved-tickets',
    title: 'Resolvidos',
    value: '87',
    change: '+23,5%',
    up: true,
    sub: 'vs. mes anterior',
    icon: CheckCircle2,
    color: 'text-emerald-500',
    chartColor: 'oklch(69.6% 0.17 162.48)',
    data: sparkData[2]
  },
  {
    id: 'average-response-time',
    title: 'Tempo Médio',
    value: '2h 14m',
    change: '-18m',
    up: false,
    sub: 'primeira resposta',
    icon: Clock3,
    color: 'text-amber-500',
    chartColor: 'oklch(76.9% 0.188 70.08)',
    data: sparkData[3]
  }
]

export function KpiCards() {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      {kpis.map((kpi) => (
        <Card key={kpi.id}>
          <CardHeader>
            <div className='flex items-start justify-between'>
              <div className='flex flex-col gap-0.5'>
                <h2 className='text-muted-foreground text-xs font-medium'>{kpi.title}</h2>
                <p className='text-2xl font-semibold tracking-tight'>{kpi.value}</p>
              </div>

              <div className={cn('bg-secondary rounded-md p-1.5', kpi.color)}>
                <kpi.icon className='h-4 w-4' strokeWidth={1.8} />
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className='h-12'>
              <ChartContainer config={chartConfig} className='aspect-auto h-full w-full'>
                <ComposedChart
                  accessibilityLayer
                  data={kpi.data}
                  margin={{ top: 6, right: 8, left: 8, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id={`${kpi.id}`} x1='0' y1='0' x2='0' y2='1'>
                      <stop offset='0%' stopColor={kpi.chartColor} stopOpacity={0.25} />
                      <stop offset='100%' stopColor={kpi.chartColor} stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid vertical={false} strokeDasharray='3 3' />

                  <XAxis dataKey='x' hide />

                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey='v' />} />

                  <Area
                    dataKey='v'
                    type='natural'
                    stroke='none'
                    fill={`url(#${kpi.id})`}
                    fillOpacity={1}
                    dot={false}
                    activeDot={false}
                    isAnimationActive={false}
                    tooltipType='none'
                  />

                  <Line
                    dataKey='v'
                    type='natural'
                    stroke={kpi.chartColor}
                    strokeWidth={2}
                    dot={{
                      fill: kpi.chartColor,
                      stroke: kpi.chartColor,
                      strokeWidth: 2,
                      r: 2
                    }}
                  />
                </ComposedChart>
              </ChartContainer>
            </div>
          </CardContent>

          <CardFooter className='p-2'>
            <div className={cn('flex items-center gap-1.5', kpi.up ? 'text-emerald-500' : 'text-red-500')}>
              {kpi.up ? <TrendingUp className='h-3.5 w-3.5' /> : <TrendingDown className='h-3.5 w-3.5' />}

              <span className='text-xs font-medium'>{kpi.change}</span>
              <span className='text-muted-foreground text-xs'>{kpi.sub}</span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
