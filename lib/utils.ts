import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import CryptoJS from 'crypto-js'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Encryption utilities for HIPAA compliance
const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'default-key-change-in-production'

export function encryptData(data: string): string {
  return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString()
}

export function decryptData(encryptedData: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY)
  return bytes.toString(CryptoJS.enc.Utf8)
}

// Date formatting utilities
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Medical record validation
export function validateMedicalRecord(record: any): boolean {
  const requiredFields = ['title', 'date', 'type', 'content']
  return requiredFields.every(field => record[field] && record[field].toString().trim() !== '')
}

// File type validation for medical documents
export function isValidMedicalFile(file: File): boolean {
  const allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/tiff',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
  return allowedTypes.includes(file.type) && file.size <= 10 * 1024 * 1024 // 10MB limit
}

// Generate secure sharing token
export function generateShareToken(): string {
  return CryptoJS.lib.WordArray.random(32).toString()
}

// Audit log utility
export function createAuditLog(action: string, resourceId: string, userId: string, details?: any) {
  return {
    action,
    resourceId,
    userId,
    timestamp: new Date().toISOString(),
    details: details || {},
    ipAddress: 'client-side', // This would be filled server-side in production
  }
} 