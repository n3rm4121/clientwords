import Link from 'next/link'
import Image from 'next/image'
import LoginButton from './components/LoginButton'
import { Metadata } from 'next'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: "Login - ClientWords"
}

export default async function LoginPage() {
  const session = await auth();
  if (session) {
    redirect('/dashboard');
  }
  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden'>
      <div className="relative min-h-screen flex flex-col justify-center items-center p-8">
        {/* Background Elements */}
        <div className="fixed inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="fixed -top-24 -right-24 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
        <div className="fixed -bottom-24 -left-24 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />

        {/* Back to Home */}
        <Link
          href="/"
          className="absolute top-8 left-8 flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Logo */}
        <Link href="/" className="absolute top-8 left-1/2 -translate-x-1/2 flex-shrink-0">
          <Image src='/newbrand1.png' width={200} height={200} alt='ClientWords' />
        </Link>

        {/* Main Content */}
        <div className="relative w-full max-w-md space-y-8 bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
          <div className="text-center">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Welcome Back!</span>
            </span>
            <h1 className="text-3xl font-bold mb-2 text-white">
              Sign in to ClientWords
            </h1>
            <p className="text-lg text-gray-400">
              Access your dashboard and manage your testimonials
            </p>
          </div>

          <div className="space-y-6">
            <LoginButton />
          </div>

          <div className="text-center text-sm text-gray-500">
            By continuing, you agree to ClientWords&apos;s{' '}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
