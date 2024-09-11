import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Terms of Service",
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gray-50">
      <div className="w-full max-w-4xl space-y-10 py-10 bg-white shadow-lg rounded-lg p-8">
      <h1 className="text-4xl text-center font-extrabold text-gray-800 mb-6">
          ClientWord's Terms of Service
        </h1>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-yellow-600">1. Acceptance of Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            By accessing or using ClientWords, you agree to be bound by these Terms of Service. If you do not agree to
            these terms, please do not use our service.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-yellow-600">2. Description of Service</h2>
          <p className="text-gray-700 leading-relaxed">
            ClientWords provides a platform for businesses to collect, manage, and showcase customer testimonials. We do not guarantee the accuracy, completeness, or reliability of the content submitted by users.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-yellow-600">3. User Responsibilities</h2>
          <p className="text-gray-700 leading-relaxed">
            You are responsible for maintaining the confidentiality of your account information and for all activities
            that occur under your account. You agree to use the service in compliance with all applicable laws and
            regulations.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-yellow-600">4. Content Ownership</h2>
          <p className="text-gray-700 leading-relaxed">
            You retain all ownership rights to the content you submit to ClientWords. We shall not use, reproduce, or modify your content without your permission.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-yellow-600">5. Limitation of Liability</h2>
          <p className="text-gray-700 leading-relaxed">
            ClientWords shall not be liable for any indirect, incidental, special, consequential, or punitive damages
            resulting from your use of or inability to use the service.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-yellow-600">6. Changes to Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right to modify these Terms of Service at any time. We will notify users of any significant
            changes via email or through the service.
          </p>
        </section>

        <div className="mt-12 text-center">
          <p className="mb-6 text-gray-600">Last updated: 09-04-2024</p>
          <Button className="bg-yellow-600 text-white hover:bg-yellow-500 py-3 px-6 rounded-lg">
            <Link href="/" className="no-underline text-white">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
