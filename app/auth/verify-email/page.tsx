'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, Mail, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

export default function VerifyEmail() {
  const [isResending, setIsResending] = useState(false)
  const { user, signOut } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // If user is already verified, redirect to dashboard
    if (user?.emailVerified) {
      router.push('/dashboard')
    }
  }, [user, router])

  const handleResendVerification = async () => {
    if (!user) return
    
    setIsResending(true)
    try {
      // In a real app, you would call Firebase's sendEmailVerification
      // await sendEmailVerification(user)
      
      toast({
        title: 'Verification email sent!',
        description: 'Please check your email for the verification link.',
      })
    } catch (error: any) {
      toast({
        title: 'Failed to send email',
        description: error.message || 'Please try again later.',
        variant: 'destructive',
      })
    } finally {
      setIsResending(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/auth/login')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Activity className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">HealthLog</span>
          </div>
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-2xl">Verify your email</CardTitle>
          <CardDescription>
            We've sent a verification link to:
            <br />
            <strong>{user?.email}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600">
              Please click the verification link in your email to activate your account. 
              This helps us ensure the security of your health information.
            </p>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-amber-800">
                <strong>Important:</strong> Check your spam folder if you don't see the email within a few minutes.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleResendVerification} 
              variant="outline" 
              className="w-full"
              disabled={isResending}
            >
              {isResending ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Resend verification email
                </>
              )}
            </Button>

            <Button onClick={handleSignOut} variant="ghost" className="w-full">
              Sign out and try different email
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Having trouble? Contact{' '}
              <a href="mailto:support@healthlog.app" className="text-green-600 hover:underline">
                support@healthlog.app
              </a>
            </p>
          </div>

          <div className="text-center">
            <Link href="/auth/login" className="text-sm text-green-600 hover:underline">
              ← Back to sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 