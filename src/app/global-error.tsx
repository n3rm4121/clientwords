'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertOctagon } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col items-center text-center">
              <AlertOctagon className="w-16 h-16 text-red-600 mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Critical Error</h1>
              <p className="text-gray-600 mb-6">
                We're sorry, but a critical error has occurred. Our team has been notified and is working on resolving the issue.
              </p>
              <div className="space-y-4 w-full">
                <Button 
                  onClick={reset}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Try to recover
                </Button>
                <Button 
                  onClick={() => window.location.href = '/'}
                  variant="outline"
                  className="w-full border border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Return to homepage
                </Button>
              </div>
            </div>
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Error Details:</h2>
                <p className="text-gray-600 break-words">{error.message}</p>
                {error.stack && (
                  <pre className="mt-2 text-sm text-gray-500 overflow-x-auto">
                    {error.stack}
                  </pre>
                )}
              </div>
            )}
          </Card>
        </div>
      </body>
    </html>
  )
}   