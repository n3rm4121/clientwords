import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4">
      <div className="w-full max-w-4xl space-y-8 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          <span className="text-indigo-400">Client Words</span> Terms of Service
        </h1>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-indigo-400">1. Acceptance of Terms</h2>
          <p>
            By accessing or using testiBoost, you agree to be bound by these Terms of Service. If you do not agree to
            these terms, please do not use our service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-indigo-400">2. Description of Service</h2>
          <p>
            testiBoost provides a platform for businesses to collect, manage, and showcase customer testimonials. We
            reserve the right to modify or discontinue the service at any time without notice.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-indigo-400">3. User Responsibilities</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account information and for all activities
            that occur under your account. You agree to use the service in compliance with all applicable laws and
            regulations.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-indigo-400">4. Content Ownership</h2>
          <p>
            You retain all ownership rights to the content you submit to testiBoost. By submitting content, you grant
            testiBoost a worldwide, non-exclusive, royalty-free license to use, reproduce, and display the content in
            connection with the service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-indigo-400">5. Limitation of Liability</h2>
          <p>
            testiBoost shall not be liable for any indirect, incidental, special, consequential, or punitive damages
            resulting from your use of or inability to use the service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-indigo-400">6. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms of Service at any time. We will notify users of any significant
            changes via email or through the service.
          </p>
        </section>

        <div className="mt-12 text-center">
          <p className="mb-4">Last updated: 09-04-2024</p>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}