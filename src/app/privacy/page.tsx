import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Privacy Policy",
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gray-50">
      <div className="w-full max-w-4xl space-y-10 py-10 bg-white shadow-lg rounded-lg p-8">
      <h1 className="text-4xl text-center font-extrabold text-gray-800 mb-6">
          ClientWord's Privacy Policy
        </h1>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-yellow-600">1. Information We Collect</h2>
          <p className="text-gray-700 leading-relaxed">
            We collect information you provide directly to us, such as when you create an account, submit testimonials,
            or contact us for support. This may include your name, email address, and any other information you choose
            to provide.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-yellow-600">2. How We Use Your Information</h2>
          <p className="text-gray-700 leading-relaxed">
            We use the information we collect to provide, maintain, and improve our services, to communicate with you,
            and to comply with legal obligations. We may also use your information to send you updates about our
            services or promotional materials.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-yellow-600">3. Information Sharing and Disclosure</h2>
          <p className="text-gray-700 leading-relaxed">
            We do not sell your personal information. We may share your information with third-party service providers
            who perform services on our behalf, such as hosting or analytics. We may also disclose your information if
            required by law or to protect our rights or the rights of others.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-yellow-600">4. Data Security</h2>
          <p className="text-gray-700 leading-relaxed">
            We take reasonable measures to help protect your personal information from loss, theft, misuse, and
            unauthorized access. However, no security system is impenetrable, and we cannot guarantee the security of
            our systems 100%.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-yellow-600">5. Your Rights and Choices</h2>
          <p className="text-gray-700 leading-relaxed">
            You may update, correct, or delete your account information at any time by logging into your account. You
            may also contact us to request access to, correction of, or deletion of personal information we have about
            you.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-yellow-600">6. Changes to This Policy</h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last updated" date.
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
