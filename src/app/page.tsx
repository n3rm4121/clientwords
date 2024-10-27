import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Navbar } from "@/components/Navbar";
import { FaBriefcase, FaChartLine, FaClone, FaCode, FaEnvelope, FaGraduationCap, FaHotel, FaLaptopCode, FaRocket, FaStore, FaUserMd } from "react-icons/fa";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ArrowRight, CircleCheckBig, Mail } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import PricingSection from "@/components/pricing/PricingSection";

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
    <div className="bg-[#212121] text-gray-100">
      <Navbar />

      <MaxWidthWrapper>
        {/* Hero Section */}

        <section className="relative overflow-hidden py-10">

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">

              <h1 className="max-w-4xl text-4xl text-gray-200 font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Turn Your Client&apos;s Words into Powerful{" "}

                <span className="relative inline-block">
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg opacity-50" />
                  <span className="relative">Social Proof.</span>
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-xl text-gray-400 ">
                Easily collect, curate, and showcase authentic client testimonials to skyrocket trust and conversions.
              </p>
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
                <div className="flex items-center rounded-lg p-4 shadow-sm">
                  <CircleCheckBig className="mr-3 h-6 w-6 text-green-500" />
                  <span className="text-lg font-medium">No coding required</span>
                </div>
                <div className="flex items-center rounded-lg p-4 shadow-sm">
                  <CircleCheckBig className="mr-3 h-6 w-6 text-green-500" />
                  <span className="text-lg font-medium">Easy Integration</span>
                </div>

              </div>
              <Link
                href="/login"
                className="mt-10 inline-flex items-center justify-center  px-10 py-4  rounded-full font-semibold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:bg-orange-600 hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-transparent hover:border-white"
              >
                Get Started for Free <ArrowRight />
              </Link>
            </div>
          </div>
        </section>
      </MaxWidthWrapper>

      {/* Features Section */}
      <section id="features" className="py-10 relative">
        <MaxWidthWrapper>
          <div className="text-center tracking-tighter mb-16">
            <h2 className="relative text-4xl text-gray-200 font-bold sm:text-5xl mb-4">
              <span className="relative z-10">Why ClientWords?</span>
              {/* Decorative underline */}
              <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-24 h-1 bg-gradient-to-r from-teal-400 to-blue-600 rounded-full"></span>

              {/* Background shape */}

            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              With ClientWords, you can effortlessly collect, manage, and showcase authentic client testimonials in your own website by embedding a single line of code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {perks.map((perk, index) => (
              <Card key={index} className=" p-8 rounded-xl shadow-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,165,0,0.5)] relative overflow-hidden">
                <div className="flex flex-col items-center text-center">
                  <div className=" p-3 rounded-full mb-4">
                    <perk.icon className="text-4xl text-primary" />
                  </div>
                  <h3 className="text-2xl text-gray-200 font-bold mb-2">{perk.name}</h3>
                  <p className="text-gray-400">{perk.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>


      {/* Process Section */}
      <section id="how-it-works" className="py-10 relative">
        <MaxWidthWrapper>
          <div className="text-center mb-16">
            <h2 className="relative text-4xl text-gray-200 tracking-tighter font-bold sm:text-5xl mb-4">
              <span className="relative z-10">How it Works?</span>
              {/* Decorative underline */}
              <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-24 h-1 bg-gradient-to-r from-teal-400 to-blue-600 rounded-full"></span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Collect and showcase authentic testimonials in four easy steps:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <Card key={index} className=" p-6  shadow-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,165,0,0.5)] relative overflow-hidden">
                <div className="text-3xl font-bold text-yellow-500 mb-4">{index + 1}</div>
                <h3 className="text-xl text-gray-200 font-semibold mb-2">{step.name}</h3>
                <p className="text-gray-400">{step.description}</p>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/login"
              className="inline-block px-10 py-4 rounded-full font-semibold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:bg-orange-600 hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-transparent hover:border-white"
            >
              Start Collecting Testimonials
            </Link>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-10 relative">
        <MaxWidthWrapper>
          <div className="text-center mb-16">
            <h2 className="relative text-4xl text-gray-200 font-bold sm:text-5xl mb-4">
              <span className="relative tracking-tighter z-10">ClientWords for you.</span>
              {/* Decorative underline */}
              <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-24 h-1 bg-gradient-to-r from-teal-400 to-blue-600 rounded-full"></span>

            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {useCases.map((useCase, index) => (
              <Card key={index} className="p-6 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,165,0,0.5)] relative overflow-hidden">
                <div className="flex items-center mb-4">
                  <useCase.icon className="text-3xl text-yellow-500 mr-3" />
                  <h3 className="text-2xl font-semibold text-gray-200">{useCase.name}</h3>
                </div>
                <p className="text-gray-400">
                  {useCase.description}
                </p>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/login"
              className="inline-block px-10 py-4  rounded-full font-semibold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:bg-orange-600 hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-transparent hover:border-white"
            >
              Get Started Today
            </Link>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* CTA Section */}
      <section className=" bg-black text-white md:p-16 overflow-hidden pb-4 pt-4">
        <div className="relative z-10 text-center space-y-6">
          <h2 className="text-4xl md:text-5xl text-center font-extrabold tracking-tight mb-4">
            Ready to <span className="text-primary">Boost Your Conversions?</span>
          </h2>
          <p className="text-md md:text-xl max-w-md md:max-w-3xl mx-auto mb-8">
            Discover how <span className="text-yellow-300 font-bold">ClientWords</span> can transform your customer testimonials into powerful social proof.
          </p>
          <Link
            href="/login"
            className="inline-block px-6 py-3 md:px-10 md:py-4 rounded-full font-semibold text-lg bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:bg-orange-600 hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-transparent hover:border-white"
          >
            Let's Get Started! 🚀
          </Link>
        </div>
      </section>


      {/* Footer Section */}
      <Separator className="bg-gray-700" />
      <footer className="bg-black py-12">
        <MaxWidthWrapper>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-between mb-8">
            <div>
              <Link href="/" className="flex-shrink-0">
                <Image src='/newbrand1.png' width={200} height={200} alt='ClientWords' />
              </Link>
              <div className="ml-12">
                <a href="mailto:hello@clientwords.com" className="text-indigo-400 hover:underline">
                  <Mail className="mr-2 inline h-5 w-5 " />
                </a>
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