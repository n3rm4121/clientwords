import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { Metadata } from 'next'
import { MoveLeftIcon } from 'lucide-react'

export const metadata: Metadata = {
  title: "Terms of Service",
}

const sections = [
  {
    title: "Acceptance of Terms",
    content: "By accessing or using ClientWords, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.",
  },
  {
    title: "Description of Service",
    content: "ClientWords provides a platform for businesses to collect, manage, and showcase customer testimonials. We do not guarantee the accuracy, completeness, or reliability of the content submitted by users.",
  },
  {
    title: "User Responsibilities",
    content: "You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to use the service in compliance with all applicable laws and regulations.",
  },
  {
    title: "Content Ownership",
    content: "You retain all ownership rights to the content you submit to ClientWords. We shall not use, reproduce, or modify your content without your permission.",
  },
  {
    title: "Limitation of Liability",
    content: "ClientWords shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.",
  },
  {
    title: "Changes to Terms",
    content: "We reserve the right to modify these Terms of Service at any time. We will notify users of any significant changes via email or through the service.",
  },
]

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-[#212121] text-gray-50">
      <div className="w-full max-w-2xl space-y-10 py-10 p-8">
        <Link href='/' className={buttonVariants()}>
          <MoveLeftIcon className="h-6 w-6 mr-2" />
          Back
        </Link>
        <h1 className="text-4xl text-center font-extrabold text-gray-200 mb-6">
          Terms of Service
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
