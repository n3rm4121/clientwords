'use client'

import { useEffect, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const session = useSession();
 useEffect(() => {
  if(session.data){
    window.location.href = '/dashboard'
  }
 },[session])
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
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col md:flex-row">
      {/* Left side: Sign-in */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2">
              Welcome to <span className="text-indigo-400">testiBoost</span>
            </h1>
            <p className="text-xl text-gray-400">
              Sign in to manage your testimonials
            </p>
          </div>

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
          </div>

          {isLoading && (
            <div className="text-center text-sm text-gray-400">
              Signing you in...
            </div>
          )}

          <div className="mt-8 text-center md:text-left text-sm text-gray-500">
            By continuing, you agree to ClientWords&apos;s{' '} 
            <Link href="/terms" className="text-indigo-400 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-indigo-400 hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Right side: Call to action and theme */}
      <div className="w-full md:w-1/2 bg-indigo-900 flex flex-col justify-center items-center p-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to <span className="text-indigo-400">boost</span> your credibility?
        </h2>
        <p className="text-xl mb-8 max-w-md">
          Elevate your brand with authentic customer voices. Collect, manage, and showcase testimonials with ease.
        </p>
        {/* <div className="space-y-4 max-w-md">
          <div className="flex items-center">
            <svg className="h-6 w-6 mr-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Easily collect testimonials from satisfied customers</span>
          </div>
          <div className="flex items-center">
            <svg className="h-6 w-6 mr-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Showcase testimonials with beautiful, customizable designs</span>
          </div>
          <div className="flex items-center">
            <svg className="h-6 w-6 mr-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Boost conversions and build trust with social proof</span>
          </div>
        </div> */}
      </div>
    </div>
  )
}