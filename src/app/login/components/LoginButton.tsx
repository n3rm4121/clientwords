'use client'

import { useEffect, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { Button } from '@/components/ui/button'

export default function LoginButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleProviderSignIn = async (provider: 'google' | 'github') => {
    setIsLoading(true)
    try {
      await signIn(provider, { callbackUrl: '/dashboard' })
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-8 space-y-4">
      <Button
        variant="outline"
        className="w-full py-6 text-lg font-semibold bg-gray-800 hover:bg-gray-700 text-white border-gray-700 transition-colors"
        onClick={() => handleProviderSignIn('google')}
        disabled={isLoading}
      >
        <FcGoogle className="mr-2 h-6 w-6" />
        Continue with Google
      </Button>
      <Button
        variant="outline"
        className="w-full py-6 text-lg font-semibold bg-gray-800 hover:bg-gray-700 text-white border-gray-700 transition-colors"
        onClick={() => handleProviderSignIn('github')}
        disabled={isLoading}
      >
        <FaGithub className="mr-2 h-6 w-6" />
        Continue with GitHub
      </Button>

      {isLoading && (
        <div className="text-center text-sm text-gray-400">
          Signing you in...
        </div>
      )}
    </div>
  )
}
