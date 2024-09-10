import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <div className="w-full max-w-4xl space-y-8 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          <span className="text-yellow-600">ClientWord's</span> Privacy Policy
        </h1>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you create an account, submit testimonials,
            or contact us for support. This may include your name, email address, and any other information you choose
            to provide.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
          <p>
            We use the information we collect to provide, maintain, and improve our services, to communicate with you,
            and to comply with legal obligations. We may also use your information to send you updates about our
            services or promotional materials.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. Information Sharing and Disclosure</h2>
          <p>
            We do not sell your personal information. We may share your information with third-party service providers
            who perform services on our behalf, such as hosting or analytics. We may also disclose your information if
            required by law or to protect our rights or the rights of others.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">4. Data Security</h2>
          <p>
            We take reasonable measures to help protect your personal information from loss, theft, misuse, and
            unauthorized access. However, no security system is impenetrable, and we cannot guarantee the security of
            our systems 100%.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">5. Your Rights and Choices</h2>
          <p>
            You may update, correct, or delete your account information at any time by logging into your account. You
            may also contact us to request access to, correction of, or deletion of personal information we have about
            you.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">6. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the &quot;Last updated&quot; date.
          </p>
        </section>

        <div className="mt-12 text-center">
            {/* TODO: */}
          <p className="mb-4">Last updated: 09-04-2024</p>
          <Button>
            <Link href="/">Return to Home</Link>
            </Button>
         
        </div>
      </div>
    </div>
  )
}