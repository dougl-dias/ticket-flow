import { FunnelChart } from './_components/funnel-chart'
import { KpiCards } from './_components/kpi-cards'
import { RequestersTable } from './_components/requesters-table'
import { RevenueChart } from './_components/revenue-chart'

export default function DashboardPage() {
  return (
    <div className='flex min-w-0 flex-col gap-4 sm:gap-6'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <div className='min-w-0'>
          <h1 className='text-[16px] font-semibold tracking-tight'>Visão Geral do Suporte</h1>
          <p className='text-muted-foreground mt-0.5 text-xs'>Maio 2026</p>
        </div>
      </div>

      <KpiCards />

      <div className='grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-3'>
        <div className='min-w-0 xl:col-span-2'>
          <RevenueChart />
        </div>

        <div className='min-w-0 xl:col-span-1'>
          <FunnelChart />
        </div>
      </div>

      <RequestersTable />
    </div>
  )
}
