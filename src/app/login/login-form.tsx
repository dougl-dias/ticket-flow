'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react'

import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'

import { signIn } from 'next-auth/react'

const loginSchema = z.object({
  email: z.string().trim().email('Informe um email valido.'),
  password: z.string().min(1, 'Informe sua senha.')
})

interface LoginActionProps {
  email: string
  password: string
}

type LoginActionState = {
  error: string | null
}

function loginAction({ email, password }: LoginActionProps): LoginActionState {
  const parsed = loginSchema.safeParse({ email, password })

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? 'Confira os dados informados.'
    }
  }

  return { error: null }
}

export function LoginForm() {
  const router = useRouter()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    setLoginError(null)
    setIsSubmitting(true)

    try {
      const validate = loginAction({ email, password })

      if (validate.error) throw new Error(validate.error)

      const normalizedEmail = email.trim().toLowerCase()

      const result = await signIn('credentials', {
        email: normalizedEmail,
        password,
        redirect: false,
        callbackUrl: '/dashboard'
      })

      if (!result?.ok) throw new Error('Email ou senha inválidos.')

      router.push('/dashboard')
      router.refresh()
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : 'Não foi possível fazer login.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldSet>
        {loginError && (
          <FieldError className='border-destructive/25 bg-destructive/10 rounded-md border px-3 py-2 text-center text-xs'>
            {loginError}
          </FieldError>
        )}

        <Field>
          <FieldLabel htmlFor='email'>Email</FieldLabel>

          <Input
            id='email'
            name='email'
            type='email'
            autoComplete='email'
            placeholder='email@exemple.com'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor='password'>Senha</FieldLabel>

          <InputGroup>
            <InputGroupInput
              id='password'
              name='password'
              type={showPassword ? 'text' : 'password'}
              autoComplete='current-password'
              placeholder='Digite sua senha'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <InputGroupAddon align='inline-end'>
              <InputGroupButton
                type='button'
                size='icon-sm'
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                aria-pressed={showPassword}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>

          <div>
            <a
              href='#'
              className='text-muted-foreground hover:text-foreground ml-auto text-xs underline-offset-4 hover:underline'
            >
              Esqueci minha senha
            </a>
          </div>
        </Field>

        <Field>
          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className='h-3.5 w-3.5 animate-spin' /> : 'Entrar'}
          </Button>
        </Field>
      </FieldSet>
    </form>
  )
}
