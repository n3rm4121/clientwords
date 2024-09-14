// 'use client' is not used here as it's a server component.

import Link from 'next/link'
import Image from 'next/image'
import LoginButton from './components/LoginButton' // Client component for sign-in logic
import { Metadata } from 'next'
export const metadata:Metadata = {
  title: "Login"
}

export default function LoginPage() {

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col md:flex-row">
        {/* Left side: Sign-in */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
          {/* <Link href="/" className="absolute top-5 left-5 flex-shrink-0">
            <Image src='/brand.png' width={200} height={200} alt='ClientWords' />
          </Link> */}
          <div className="w-full pt-12 max-w-md space-y-8">
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">
                Welcome to <span className="text-yellow-400">ClientWords</span>
              </h1>
              <p className="text-xl text-gray-400">
                Sign in to manage your testimonials
              </p>
            </div>
            <LoginButton /> {/* Client-side sign-in logic */}
            <div className="mt-8 text-center md:text-left text-sm text-gray-500">
              By continuing, you agree to ClientWords&apos;s{' '} 
              <Link href="/terms" className="text-yellow-400 hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-yellow-400 hover:underline">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Right side: Call to action and theme */}
        <div className="w-full md:w-1/2 bg-yellow-700 flex flex-col justify-center items-center p-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to <span className="text-yellow-400">boost</span> your credibility?
          </h2>
          <p className="text-xl mb-8 max-w-md">
            Elevate your brand with authentic customer voices. Collect, manage, and showcase testimonials with ease.
          </p>
        </div>
      </div>
    </>
  )
}
