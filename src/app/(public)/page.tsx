import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'

export default async function PublicPage() {
  const session = await getServerSession(authOptions)

  if (session) redirect('/dashboard')

  redirect('/login')
}
