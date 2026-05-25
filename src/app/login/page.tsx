import { Headphones } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { LoginForm } from './login-form'

export default function LoginPage() {
  return (
    <main className='bg-background text-foreground flex min-h-screen items-center justify-center px-4'>
      <section className='w-full max-w-96'>
        <div className='mb-8 flex flex-col items-center gap-3 text-center'>
          <div className='bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-[8px]'>
            <Headphones className='h-5 w-5' />
          </div>

          <div>
            <h1 className='text-xl font-semibold tracking-tight'>TicketFlow</h1>
            <p className='text-muted-foreground mt-1 text-[13px]'>Acesse seu painel de suporte</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Faça o login</CardTitle>
          </CardHeader>

          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>

        <Card className='mx-auto mt-5'>
          <CardContent className='text-muted-foreground'>
            <p>email: douglas@ticketflow.com</p>
            <p>senha: admin1234</p>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
