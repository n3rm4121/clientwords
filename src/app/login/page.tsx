import Link from 'next/link'
import Image from 'next/image'
import LoginButton from './components/LoginButton'
import { Metadata } from 'next'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
export const metadata: Metadata = {
  title: "Login"
}

export default async function LoginPage() {
  const session = await auth();
  if (session) {
    redirect('/dashboard');
  }
  return (
    <div className='bg-gray-900'>
      <div className="w-full min-h-screen bg-gray-900 flex flex-col justify-center items-center p-8">
        <Link href="/" className="absolute top-5 left-5 flex-shrink-0">
          <Image src='/newbrand1.png' width={200} height={200} alt='ClientWords' />
        </Link>
        <div className="w-full pt-12 max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2 text-white">
              Welcome to ClientWords
            </h1>
            <p className="text-xl text-gray-400">
              Sign in to manage your testimonials
            </p>
          </div>
          <LoginButton />
          <div className="mt-8 text-center md:text-left text-sm text-gray-500">
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
