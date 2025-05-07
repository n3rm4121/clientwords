import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import { FaBriefcase, FaChartLine, FaClone, FaCode, FaEnvelope, FaGraduationCap, FaHotel, FaLaptopCode, FaRocket, FaStore, FaUserMd } from "react-icons/fa";
import Link from "next/link";
import { Mail } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import PricingSection from "@/components/pricing/PricingSection";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Process from "@/components/Process";
import CTA from "@/components/CTA";
import UseCasesSection from "@/components/UseCases";
import DemoTestimonials from "@/components/DemoTestimonials";

const perks = [
  {
    name: 'Easy Integration',
    description: 'Easily integrate with your website using a single line of code.',
    icon: FaCode
  },
  {
    name: 'Boost Conversions',
    description: 'Leverage social proof to build credibility and drive your business growth.',
    icon: FaRocket
  },
  {
    name: 'Effortless Collection',
    description: 'Collect authentic testimonials from your customers with ease.',
    icon: FaClone
  }
];

const process = [
  {
    name: 'Create Your Form',
    description: 'Design a custom testimonial form tailored to your business needs.',
    icon: FaCode
  },
  {
    name: 'Share the Link',
    description: 'Send the unique form link to your clients via email or any channel.',
    icon: FaEnvelope
  },
  {
    name: 'Receive Testimonials',
    description: 'Collect and review client\'s testimonials in your dashboard.',
    icon: FaBriefcase
  },
  {
    name: 'Showcase Testimonials',
    description: 'Embed the love gallery on your website to boost credibility.',
    icon: FaChartLine
  }
]

const useCases = [
  {
    name: 'E-commerce',
    description: 'Showcase product reviews to increase trust and drive more sales. Display customer experiences to highlight product quality and satisfaction.',
    icon: FaStore
  },
  {
    name: 'B2B Services',
    description: 'Highlight client success stories and testimonials to demonstrate expertise and build credibility with potential clients in your industry.',
    icon: FaBriefcase
  },
  {
    name: 'Education',
    description: 'Feature student and parent testimonials to showcase the quality of your educational programs and attract more enrollments.',
    icon: FaGraduationCap
  },
  {
    name: 'Hospitality',
    description: 'Display guest reviews to highlight your excellent service and amenities, encouraging more bookings for your hotel or restaurant.',
    icon: FaHotel
  },
  {
    name: 'SaaS',
    description: 'Showcase user testimonials to demonstrate the value of your software, highlighting key features and benefits that drive user adoption.',
    icon: FaLaptopCode
  },
  {
    name: 'Healthcare',
    description: 'Share patient testimonials to build trust in your healthcare services, emphasizing quality care and positive outcomes.',
    icon: FaUserMd
  }
]


export default function LandingPage() {

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Navbar />
      <Hero />
      <Features />
      <Process />
      <DemoTestimonials />
      <UseCasesSection />
      <PricingSection />
      <CTA />
      <Separator className="bg-gray-700" />
      <footer className="bg-gray-900 py-12">
        <MaxWidthWrapper>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-between mb-8">
            <div>
              <Link href="/" className="flex-shrink-0">
                <Image src='/newbrand1.png' width={200} height={200} alt='ClientWords' />
              </Link>
              <div className="ml-12">
                <Link href="mailto:hello@clientwords.com" className="text-indigo-400">
                  <Mail className="inline w-5 h-5 mr-2" />
                </Link>
                <Link href="https://github.com/n3rm4121/clientwords" target="_blank" className="text-indigo-400">
                  <GitHubLogoIcon className="inline w-5 h-5" />
                </Link>
              </div>
            </div>


            <div>
              <h4 className="font-bold text-lg mb-4">Links</h4>
              <ul className="space-y-2">
                <li><Link href="#features" className="hover:text-blue-400 transition-colors duration-200">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-blue-400 transition-colors duration-200">Pricing</Link></li>
                <li><Link href="#use-cases" className="hover:text-blue-400 transition-colors duration-200">Use Cases</Link></li>
                <li><Link href="#how-it-works" className="hover:text-blue-400 transition-colors duration-200">How it works</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="hover:text-blue-400 transition-colors duration-200">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-blue-400 transition-colors duration-200">Terms of Service</Link></li>
                <li><Link href="/refund-policy" className="hover:text-blue-400 transition-colors duration-200">Refund Policy</Link></li>
              </ul>
            </div>

          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} ClientWords. All rights reserved.</p>
          </div>
        </MaxWidthWrapper>
      </footer>
    </div>
  );
}