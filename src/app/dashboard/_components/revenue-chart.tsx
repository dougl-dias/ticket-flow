'use client'

import { useState } from 'react'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

import { cn } from '@/lib/utils'

const data = [
  { month: 'Jan', resolvidos: 180, meta: 200 },
  { month: 'Fev', resolvidos: 220, meta: 200 },
  { month: 'Mar', resolvidos: 195, meta: 210 },
  { month: 'Abr', resolvidos: 260, meta: 220 },
  { month: 'Mai', resolvidos: 240, meta: 230 },
  { month: 'Jun', resolvidos: 310, meta: 250 },
  { month: 'Jul', resolvidos: 285, meta: 260 },
  { month: 'Ago', resolvidos: 340, meta: 270 },
  { month: 'Set', resolvidos: 380, meta: 290 },
  { month: 'Out', resolvidos: 420, meta: 300 },
  { month: 'Nov', resolvidos: 390, meta: 320 },
  { month: 'Dez', resolvidos: 460, meta: 350 },
]

type Period = '12M' | '6M' | '3M' | '1M'

const periods: Period[] = ['12M', '6M', '3M', '1M']

const chartConfig = {
  resolvidos: {
    label: 'Resolvidos',
    color: 'var(--chart-1)',
  },
  meta: {
    label: 'Meta',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig

export function RevenueChart() {
  const [period, setPeriod] = useState<Period>('12M')

  const filters = {
    '12M': data,
    '6M': data.slice(6),
    '3M': data.slice(9),
    '1M': data.slice(11),
  }

  const filtered = filters[period]

  return (
    <Card>
      <CardHeader className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex flex-col gap-0.5'>
          <h2 className='text-sm font-semibold'>Tickets Resolvidos</h2>
          <p className='text-muted-foreground text-xs'>Resolvidos vs. meta operacional</p>
        </div>

        <div className='bg-secondary flex w-fit items-center gap-0.5 rounded-md p-0.5'>
          {periods.map((p) => (
            <button
              key={p}
              type='button'
              onClick={() => setPeriod(p)}
              className={cn(
                'rounded px-2.5 py-1 text-xs font-medium transition-all',
                period === p
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className='flex flex-col gap-2'>
        <div className='h-56 sm:h-52'>
          <ChartContainer config={chartConfig} className='aspect-auto h-full w-full'>
            <BarChart
              accessibilityLayer
              data={filtered}
              margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
            >
              <CartesianGrid vertical={false} strokeDasharray='3 3' />

              <XAxis dataKey='month' tickLine={false} tickMargin={8} axisLine={false} />

              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `${value}`}
              />

              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator='dashed' />} />

              <Bar dataKey='resolvidos' fill='var(--color-resolvidos)' radius={4} maxBarSize={24} />
              <Bar dataKey='meta' fill='var(--color-meta)' radius={4} maxBarSize={24} />
            </BarChart>
          </ChartContainer>
        </div>

        <div className='flex items-center justify-center gap-3'>
          <div className='flex items-center gap-1.5'>
            <span className='bg-chart-1 h-2.5 w-2.5 rounded-sm' />
            <span className='text-muted-foreground text-[11px]'>Resolvidos</span>
          </div>

          <div className='flex items-center gap-1.5'>
            <span className='bg-chart-2 h-2.5 w-2.5 rounded-sm' />
            <span className='text-muted-foreground text-[11px]'>Meta</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
