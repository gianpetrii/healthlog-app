'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  FileText, 
  Search, 
  Filter, 
  Plus, 
  Download,
  Share,
  MoreVertical,
  Calendar,
  Building
} from 'lucide-react'
import Link from 'next/link'
import { DashboardLayout } from '@/components/dashboard/layout'
import { formatDate } from '@/lib/utils'

export default function MedicalRecords() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Mock data - in a real app, this would come from your database
  const medicalRecords = [
    {
      id: '1',
      title: 'Complete Blood Count (CBC)',
      type: 'Lab Result',
      category: 'lab',
      date: '2024-01-15',
      provider: 'City Medical Center',
      description: 'Routine blood work including white blood cell count, red blood cell count, and platelet count.',
      fileType: 'PDF',
      size: '2.1 MB',
      tags: ['blood test', 'routine', 'annual physical']
    },
    {
      id: '2',
      title: 'Chest X-Ray',
      type: 'Imaging',
      category: 'imaging',
      date: '2024-01-10',
      provider: 'Radiology Associates',
      description: 'Chest X-ray ordered due to persistent cough. Results show clear lungs.',
      fileType: 'DICOM',
      size: '15.3 MB',
      tags: ['chest', 'x-ray', 'respiratory']
    },
    {
      id: '3',
      title: 'Annual Physical Examination',
      type: 'Doctor Note',
      category: 'notes',
      date: '2024-01-05',
      provider: 'Dr. Smith Family Practice',
      description: 'Comprehensive annual physical examination with review of systems.',
      fileType: 'PDF',
      size: '1.8 MB',
      tags: ['annual', 'physical', 'checkup']
    },
    {
      id: '4',
      title: 'Lipid Panel',
      type: 'Lab Result',
      category: 'lab',
      date: '2023-12-20',
      provider: 'City Medical Center',
      description: 'Cholesterol and triglyceride levels assessment.',
      fileType: 'PDF',
      size: '1.2 MB',
      tags: ['cholesterol', 'lipids', 'cardiovascular']
    },
    {
      id: '5',
      title: 'Prescription - Lisinopril',
      type: 'Prescription',
      category: 'prescriptions',
      date: '2023-12-15',
      provider: 'Dr. Smith Family Practice',
      description: 'Blood pressure medication prescription and instructions.',
      fileType: 'PDF',
      size: '0.8 MB',
      tags: ['prescription', 'blood pressure', 'lisinopril']
    }
  ]

  const categories = [
    { value: 'all', label: 'All Records' },
    { value: 'lab', label: 'Lab Results' },
    { value: 'imaging', label: 'Imaging' },
    { value: 'notes', label: 'Doctor Notes' },
    { value: 'prescriptions', label: 'Prescriptions' },
    { value: 'reports', label: 'Reports' }
  ]

  // Filter records based on search term and category
  const filteredRecords = medicalRecords.filter(record => {
    const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || record.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const getRecordIcon = (type: string) => {
    switch (type) {
      case 'Lab Result':
        return <FileText className="h-5 w-5 text-blue-600" />
      case 'Imaging':
        return <FileText className="h-5 w-5 text-purple-600" />
      case 'Doctor Note':
        return <FileText className="h-5 w-5 text-green-600" />
      case 'Prescription':
        return <FileText className="h-5 w-5 text-orange-600" />
      default:
        return <FileText className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Medical Records</h1>
            <p className="text-gray-600 mt-2">
              Manage your health documents and medical history
            </p>
          </div>
          <Link href="/records/new">
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Record</span>
            </Button>
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search records, providers, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Records Grid */}
        <div className="grid gap-6">
          {filteredRecords.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <FileText className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No records found</h3>
                <p className="text-gray-600 text-center max-w-md">
                  {searchTerm || selectedCategory !== 'all' 
                    ? "Try adjusting your search or filter criteria."
                    : "Get started by uploading your first medical document."
                  }
                </p>
                {!searchTerm && selectedCategory === 'all' && (
                  <Link href="/records/new" className="mt-4">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Record
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredRecords.map((record) => (
              <Card key={record.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getRecordIcon(record.type)}
                      <div className="flex-1">
                        <CardTitle className="text-lg">{record.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {record.description}
                        </CardDescription>
                        <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(record.date)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Building className="h-4 w-4" />
                            <span>{record.provider}</span>
                          </div>
                          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                            {record.type}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {record.tags.map((tag, index) => (
                            <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{record.fileType} • {record.size}</span>
                    <Link href={`/records/${record.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Summary */}
        {filteredRecords.length > 0 && (
          <div className="text-center text-sm text-gray-600">
            Showing {filteredRecords.length} of {medicalRecords.length} records
          </div>
        )}
      </div>
    </DashboardLayout>
  )
} 