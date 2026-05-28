'use client'

import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  FileText, 
  Calendar, 
  Pill, 
  Activity, 
  Plus, 
  Users,
  Shield,
  Download,
  Clock,
  TrendingUp
} from 'lucide-react'
import Link from 'next/link'
import { DashboardLayout } from '@/components/dashboard/layout'

export default function Dashboard() {
  const { userProfile } = useAuth()

  // Mock data - in a real app, this would come from your database
  const recentRecords = [
    {
      id: '1',
      type: 'Lab Result',
      title: 'Blood Test - Complete Metabolic Panel',
      date: '2024-01-15',
      provider: 'City Medical Center'
    },
    {
      id: '2',
      type: 'Imaging',
      title: 'Chest X-Ray',
      date: '2024-01-10',
      provider: 'Radiology Associates'
    },
    {
      id: '3',
      type: 'Doctor Note',
      title: 'Annual Physical Exam',
      date: '2024-01-05',
      provider: 'Dr. Smith Family Practice'
    }
  ]

  const upcomingAppointments = [
    {
      id: '1',
      title: 'Cardiologist Consultation',
      date: '2024-01-25',
      time: '10:00 AM',
      provider: 'Heart Health Specialists'
    },
    {
      id: '2',
      title: 'Dental Cleaning',
      date: '2024-01-30',
      time: '2:00 PM',
      provider: 'Bright Smile Dentistry'
    }
  ]

  const currentMedications = [
    {
      id: '1',
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      nextDose: '8:00 AM tomorrow'
    },
    {
      id: '2',
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      nextDose: '6:00 PM today'
    }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {userProfile?.displayName || 'User'}!
            </h1>
            <p className="text-gray-600 mt-2">
              Here's an overview of your health information
            </p>
          </div>
          <div className="flex space-x-4">
            <Link href="/records/new">
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Record</span>
              </Button>
            </Link>
            <Link href="/export">
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export Data</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Records</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                +3 from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                Upcoming this month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Medications</CardTitle>
              <Pill className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                Active prescriptions
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Shared Access</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                Authorized users
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Records */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Recent Medical Records</span>
              </CardTitle>
              <CardDescription>
                Your latest health documents and test results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRecords.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-sm">{record.title}</h4>
                      <p className="text-xs text-gray-600">{record.provider}</p>
                      <p className="text-xs text-gray-500">{record.date}</p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      {record.type}
                    </span>
                  </div>
                ))}
                <Link href="/records">
                  <Button variant="outline" className="w-full">
                    View All Records
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Upcoming Appointments</span>
              </CardTitle>
              <CardDescription>
                Your scheduled healthcare visits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-sm">{appointment.title}</h4>
                      <p className="text-xs text-gray-600">{appointment.provider}</p>
                      <p className="text-xs text-gray-500 flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{appointment.date} at {appointment.time}</span>
                      </p>
                    </div>
                  </div>
                ))}
                <Link href="/appointments">
                  <Button variant="outline" className="w-full">
                    Manage Appointments
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Current Medications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Pill className="h-5 w-5" />
                <span>Current Medications</span>
              </CardTitle>
              <CardDescription>
                Your active prescriptions and medication schedule
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentMedications.map((medication) => (
                  <div key={medication.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-sm">{medication.name}</h4>
                      <p className="text-xs text-gray-600">{medication.dosage} - {medication.frequency}</p>
                      <p className="text-xs text-gray-500">Next: {medication.nextDose}</p>
                    </div>
                  </div>
                ))}
                <Link href="/medications">
                  <Button variant="outline" className="w-full">
                    Manage Medications
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Quick Actions</span>
              </CardTitle>
              <CardDescription>
                Common tasks and health tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/symptoms">
                  <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center space-y-2">
                    <TrendingUp className="h-6 w-6" />
                    <span className="text-sm">Log Symptoms</span>
                  </Button>
                </Link>
                <Link href="/sharing">
                  <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center space-y-2">
                    <Users className="h-6 w-6" />
                    <span className="text-sm">Share Access</span>
                  </Button>
                </Link>
                <Link href="/export">
                  <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center space-y-2">
                    <Download className="h-6 w-6" />
                    <span className="text-sm">Export Data</span>
                  </Button>
                </Link>
                <Link href="/security">
                  <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center space-y-2">
                    <Shield className="h-6 w-6" />
                    <span className="text-sm">Security</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
} 