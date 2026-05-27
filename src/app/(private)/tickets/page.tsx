import { KpiCards } from './_components/kpi-cards'
import { TicketsTable } from './_components/tickets-table'

export default function TicketsPage() {
  return (
    <div className='flex min-w-0 flex-col gap-4 sm:gap-6'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <div className='min-w-0'>
          <h1 className='text-[16px] font-semibold tracking-tight'>Tickets</h1>
          <p className='text-muted-foreground mt-0.5 text-xs'>24 chamados ativos · 7 criticos em aberto</p>
        </div>
      </div>

      <div className='flex flex-col gap-5'>
        <KpiCards />

        <TicketsTable />
      </div>
    </div>
  )
}
