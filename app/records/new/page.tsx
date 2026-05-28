'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Upload, 
  FileText, 
  X, 
  Calendar,
  Building,
  Tag
} from 'lucide-react'
import { DashboardLayout } from '@/components/dashboard/layout'
import { useToast } from '@/components/ui/use-toast'
import { isValidMedicalFile } from '@/lib/utils'

export default function NewMedicalRecord() {
  const [files, setFiles] = useState<File[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    title: '',
    type: 'lab',
    provider: '',
    date: '',
    description: '',
    tags: ''
  })

  const recordTypes = [
    { value: 'lab', label: 'Lab Results' },
    { value: 'imaging', label: 'Imaging (X-Ray, MRI, CT)' },
    { value: 'notes', label: 'Doctor Notes' },
    { value: 'prescriptions', label: 'Prescriptions' },
    { value: 'reports', label: 'Medical Reports' },
    { value: 'other', label: 'Other' }
  ]

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFiles(droppedFiles)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    handleFiles(selectedFiles)
  }

  const handleFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter(file => {
      if (!isValidMedicalFile(file)) {
        toast({
          title: 'Invalid file',
          description: `${file.name} is not a supported file type or is too large.`,
          variant: 'destructive'
        })
        return false
      }
      return true
    })

    setFiles(prev => [...prev, ...validFiles])
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (files.length === 0) {
      toast({
        title: 'No files selected',
        description: 'Please upload at least one medical document.',
        variant: 'destructive'
      })
      return
    }

    setUploading(true)

    try {
      // Here you would upload files to Firebase Storage and save metadata to Firestore
      // For now, we'll simulate the upload process
      
      // Simulate file upload delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast({
        title: 'Record uploaded successfully!',
        description: 'Your medical record has been securely stored.',
      })
      
      router.push('/records')
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: 'There was an error uploading your medical record. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setUploading(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add Medical Record</h1>
          <p className="text-gray-600 mt-2">
            Upload and organize your medical documents securely
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* File Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Documents</CardTitle>
              <CardDescription>
                Upload medical documents such as lab results, imaging reports, or doctor notes.
                Supported formats: PDF, JPEG, PNG, TIFF, DOC, DOCX (Max 10MB each)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Drag and drop files here, or click to select
                </p>
                <p className="text-gray-600 mb-4">
                  You can upload multiple files at once
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.tiff,.doc,.docx,.txt"
                  onChange={handleFileInput}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button type="button" variant="outline" className="cursor-pointer">
                    Select Files
                  </Button>
                </label>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h4 className="font-medium text-gray-900">Selected Files:</h4>
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium text-sm">{file.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Record Information */}
          <Card>
            <CardHeader>
              <CardTitle>Record Information</CardTitle>
              <CardDescription>
                Provide details about your medical record for better organization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Record Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Blood Test Results"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Record Type *</Label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    {recordTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="provider">Healthcare Provider *</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="provider"
                      name="provider"
                      placeholder="e.g., City Medical Center"
                      value={formData.provider}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Date of Service *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Provide additional details about this medical record..."
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="tags"
                    name="tags"
                    placeholder="e.g., routine, annual, blood work (separate with commas)"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Tags help you organize and find your records more easily
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => router.back()}
              disabled={uploading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={uploading}>
              {uploading ? 'Uploading...' : 'Save Record'}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
} 