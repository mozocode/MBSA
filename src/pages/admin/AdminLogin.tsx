import { zodResolver } from '@hookform/resolvers/zod'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { auth } from '../../lib/firebase'

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type LoginValues = z.infer<typeof schema>

export function AdminLogin() {
  const navigate = useNavigate()
  const [authError, setAuthError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async ({ email, password }: LoginValues) => {
    setAuthError(null)
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password)
      const token = await cred.user.getIdTokenResult(true)
      if (!token.claims.admin) {
        await signOut(auth)
        setAuthError('Access denied — not an admin account')
        return
      }
      navigate('/admin/dashboard')
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/MBSA-logo-vector.svg" alt="MBSA Gators" className="h-16 mx-auto mb-4" />
          <h1 className="font-display font-bold text-3xl text-white uppercase">Admin Login</h1>
          <p className="text-white/60 mt-2 text-sm">Monroeville Baseball & Softball Association</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-sm shadow-xl p-8 space-y-5"
          noValidate
        >
          {authError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-sm">
              {authError}
            </div>
          )}

          <div>
            <label htmlFor="admin-email" className="block text-sm font-semibold text-navy mb-1.5">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="email"
              className="w-full px-4 py-2.5 border border-navy/20 rounded-sm focus:ring-2 focus:ring-gold focus:border-transparent"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="admin-password" className="block text-sm font-semibold text-navy mb-1.5">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              className="w-full px-4 py-2.5 border border-navy/20 rounded-sm focus:ring-2 focus:ring-gold focus:border-transparent"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gold text-navy font-display font-bold uppercase tracking-wide rounded-sm hover:bg-gold-light transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="text-center mt-6">
          <a href="/" className="text-white/60 hover:text-gold text-sm transition-colors">
            ← Back to website
          </a>
        </p>
      </div>
    </div>
  )
}
