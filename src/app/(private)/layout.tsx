import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { authOptions } from '@/lib/auth'

export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session) redirect('/login')

  return <DashboardLayout>{children}</DashboardLayout>
}
