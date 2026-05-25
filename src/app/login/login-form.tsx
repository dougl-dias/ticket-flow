'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

import { EyeOffIcon, EyeIcon, Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { FieldSet, FieldError, Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from '@/components/ui/input-group'

import { fakeLogin } from '@/lib/login-fake'

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
      const user = await fakeLogin({ email, password })

      if (!user) throw new Error('Email ou senha inválidos.')

      setLoginError(null)

      router.push('/dashboard')
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
            type='email'
            autoComplete='email'
            placeholder='email@exemple.com'
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </Field>

        <Field className='max-w-sm'>
          <FieldLabel htmlFor='password'>Senha</FieldLabel>

          <InputGroup>
            <InputGroupInput
              id='password'
              type={showPassword ? 'text' : 'password'}
              autoComplete='current-password'
              placeholder='Digite sua senha'
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <InputGroupAddon align='inline-end'>
              <InputGroupButton
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
            {isSubmitting && <Loader2 className='h-3.5 w-3.5 animate-spin' />}
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </Button>
        </Field>
      </FieldSet>
    </form>
  )
}
