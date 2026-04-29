'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function BookingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Book an Appointment</h1>
        <p className="text-gray-600 max-w-2xl">
          Therapist scheduling is being set up for your campus. In the meantime, you can
          start an anonymous support session or explore self-help resources.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/consult">Start Anonymous Session</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/resources">Browse Resources</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
