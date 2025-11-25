'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LogIn, AlertCircle } from 'lucide-react'
import { validateUser, setAuthState } from '@/lib/auth'
import { useAuth } from '@/providers/auth-provider'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { user } = useAuth()

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push(`/${user.role}`)
    }
  }, [user, router])

  if (user) {
    return null
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Validate credentials
    const validUser = validateUser(email, password)

    if (validUser) {
      setAuthState(validUser)
      router.push(`/${validUser.role}`)
    } else {
      setError('Invalid email or password')
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg border border-border shadow-lg p-6 sm:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-lg mb-4">
              <LogIn className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">Welcome Back</h1>
            <p className="text-muted-foreground text-xs sm:text-sm mt-2">Sign in to your PFE Platform account</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/50 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-destructive" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <Input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300">
              <p className="font-semibold mb-1">Demo Credentials:</p>
              <p>Student: student@example.com / password123</p>
              <p>Teacher: teacher@example.com / password123</p>
              <p>Coordinator: coordinator@example.com / password123</p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">or</span>
              </div>
            </div>

            <Link href="/auth/register">
              <Button variant="outline" className="w-full">
                Create Account
              </Button>
            </Link>
          </form>

          <p className="text-center text-xs sm:text-sm text-muted-foreground mt-6">
            <Link href="#" className="text-primary hover:underline">
              Forgot password?
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4 sm:mt-6">
          Protected by enterprise security
        </p>
      </div>
    </div>
  )
}
