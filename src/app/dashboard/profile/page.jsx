'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetch('/api/users/me')
        const data = await response.json()
        if (data.user) {
          setUser(data.user)
        } else {
          router.push('/login')
        }
      } catch (error) {
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [router])

  const handleLogout = async () => {
    try {
      await fetch('/api/users/logout', { method: 'POST' })
    } finally {
      router.push('/login')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading profile...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">My Profile</h1>
          <div className="space-y-2 text-sm text-gray-700">
            <div><span className="font-medium">Name:</span> {user?.name || 'Student'}</div>
            <div><span className="font-medium">Email:</span> {user?.email || 'Not available'}</div>
            <div><span className="font-medium">Role:</span> {user?.role || 'student'}</div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => router.push('/dashboard')}>Back to Dashboard</Button>
            <Button variant="outline" onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
