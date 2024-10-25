'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertTriangle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col items-center text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h1>
          <p className="text-gray-600 mb-6">
            We apologize for the inconvenience. An unexpected error has occurred.
          </p>
          <div className="space-y-4 w-full">
            <Button
              onClick={reset}
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Try again
            </Button>
            <Button
              onClick={() => window.location.href = '/'}
              variant="outline"
              className="w-full border border-primary text-primary hover:bg-primary hover:text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Go back to homepage
            </Button>
          </div>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Error Details:</h2>
            <p className="text-gray-600 break-words">{error.message}</p>
          </div>
        )}
      </Card>
    </div>
  )
}