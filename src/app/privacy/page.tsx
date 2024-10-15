import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { Metadata } from 'next'
import { MoveLeftIcon } from 'lucide-react'

export const metadata: Metadata = {
  title: "Privacy Policy",
}

const sections = [
  {
    title: "Information We Collect",
    content: "We collect information you provide directly to us, such as when you create an account, submit testimonials, or contact us for support. This may include your name, email address, and any other information you choose to provide.",
  },
  {
    title: "How We Use Your Information",
    content: "We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to comply with legal obligations. We may also use your information to send you updates about our services or promotional materials.",
  },
  {
    title: "Information Sharing and Disclosure",
    content: "We do not sell your personal information. We may share your information with third-party service providers who perform services on our behalf, such as hosting or analytics. We may also disclose your information if required by law or to protect our rights or the rights of others.",
  },
  {
    title: "Data Security",
    content: "We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access. However, no security system is impenetrable, and we cannot guarantee the security of our systems 100%.",
  },
  {
    title: "Your Rights and Choices",
    content: "You may update, correct, or delete your account information at any time by logging into your account. You may also contact us to request access to, correction of, or deletion of personal information we have about you.",
  },
  {
    title: "Changes to This Policy",
    content: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last updated' date.",
  },
]

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-[#212121] text-gray-50">
      <div className="w-full max-w-2xl space-y-10 py-10 p-8">
        <Link href='/' className={buttonVariants()}>
          <MoveLeftIcon className="h-6 w-6 mr-2" />
          Back
        </Link>
        <h1 className="text-4xl text-center font-extrabold text-gray-200">
          Privacy Policy
        </h1>

        {sections.map((section, index) => (
          <section key={index} className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-200">{section.title}</h2>
            <p className="text-gray-400 leading-relaxed">{section.content}</p>
          </section>
        ))}

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
