'use client'

import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, FileText, Users, Calendar, Pill, Activity } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const { user } = useAuth()

  if (user) {
    // Redirect authenticated users to dashboard
    return (
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome back to HealthLog
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your secure medical records are ready to access
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="text-lg px-8 py-3">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Activity className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">HealthLog</span>
          </div>
          <div className="space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Your Health, <span className="text-green-600">Centralized</span> & <span className="text-blue-600">Secure</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Securely store, manage, and share your medical records with authorized healthcare providers. 
          HIPAA-compliant platform designed for your privacy and convenience.
        </p>
        <div className="space-x-4">
          <Link href="/auth/register">
            <Button size="lg" className="text-lg px-8 py-3">
              Start Your Health Journey
            </Button>
          </Link>
          <Link href="/demo">
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              View Demo
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Comprehensive Health Management Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <FileText className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Medical Records</CardTitle>
              <CardDescription>
                Store lab results, imaging reports, doctor notes, and all medical documents securely
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Shield className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>HIPAA Compliance</CardTitle>
              <CardDescription>
                Bank-level encryption and security measures to protect your sensitive health data
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-10 w-10 text-purple-600 mb-2" />
              <CardTitle>Controlled Sharing</CardTitle>
              <CardDescription>
                Grant secure access to family members, caregivers, and healthcare professionals
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Calendar className="h-10 w-10 text-red-600 mb-2" />
              <CardTitle>Appointment Scheduling</CardTitle>
              <CardDescription>
                Manage healthcare appointments and receive reminders for upcoming visits
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Pill className="h-10 w-10 text-orange-600 mb-2" />
              <CardTitle>Medication Tracking</CardTitle>
              <CardDescription>
                Track medications, dosages, and receive reminders for prescription refills
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Activity className="h-10 w-10 text-teal-600 mb-2" />
              <CardTitle>Symptom Checker</CardTitle>
              <CardDescription>
                Log symptoms and track health patterns with our intelligent symptom tracker
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Security Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Privacy is Our Priority
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We employ industry-leading security measures to ensure your health data remains private and secure.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">End-to-End Encryption</h3>
              <p className="text-gray-600">Your data is encrypted before it leaves your device</p>
            </div>
            <div>
              <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">HIPAA Compliant</h3>
              <p className="text-gray-600">Meets all healthcare data protection requirements</p>
            </div>
            <div>
              <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Access Controls</h3>
              <p className="text-gray-600">You control who can access your health information</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Activity className="h-6 w-6" />
              <span className="text-xl font-bold">HealthLog</span>
            </div>
            <p className="text-gray-400 mb-4">
              Secure, comprehensive health record management for everyone
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <a href="/privacy" className="hover:text-white">Privacy Policy</a>
              <a href="/terms" className="hover:text-white">Terms of Service</a>
              <a href="/contact" className="hover:text-white">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
} 