import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Navbar } from "@/components/Navbar";
import { Button, buttonVariants } from "@/components/ui/button";
import { FaBriefcase, FaChartLine, FaClone, FaCode, FaEnvelope, FaFacebookF, FaGraduationCap, FaHotel, FaLaptopCode, FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaRocket, FaStore, FaTwitter, FaUserMd } from "react-icons/fa";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ArrowRight, CircleCheckBig, Mail } from "lucide-react";
import AwesomePricingSection from "./login/components/PricingCard";
import Image from "next/image";
import { SlideInFromRight } from "@/components/FramerMotionAnimations";

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


export default function LandingPage() {

  return (
    <div className="">
      <Navbar />
      <MaxWidthWrapper>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20">

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Turn Your Client&apos;s Words into Powerful{" "}
                <span className="relative inline-block">
                  <span className="absolute inset-0 bg-yellow-400 rounded-lg" />
                  <span className="relative">Social Proof.</span>
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-xl text-muted-foreground">
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
                href="/dashboard"
                className="mt-10 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
              >
                Get Started for Free <ArrowRight />
              </Link>
            </div>
          </div>
        </section>
      </MaxWidthWrapper>

      {/* Features Section */}
      <section id="features" className="py-20">
        <MaxWidthWrapper>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold sm:text-5xl mb-4">
              Why ClientWords?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              With ClientWords, you can effortlessly collect, manage, and showcase authentic client testimonials in your own website by embedding a single line of code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {perks.map((perk, index) => (
              <Card key={index} className=" p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,165,0,0.5)] relative overflow-hidden">
                <div className="flex flex-col items-center text-center">
                  <div className=" p-3 rounded-full mb-4">
                    <perk.icon className="text-4xl text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{perk.name}</h3>
                  <p className="text-muted-foreground">{perk.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Process Section */}
      <section id="how-it-works" className="py-20">
        <MaxWidthWrapper>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold sm:text-5xl mb-4">
              How it Works?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Collect and showcase authentic testimonials in four easy steps:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className=" p-6 shadow-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,165,0,0.5)] relative overflow-hidden">
              <div className="text-3xl font-bold text-yellow-500 mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Create Your Form</h3>
              <p className="text-muted-foreground">Design a custom testimonial form tailored to your business needs.</p>
            </Card>

            <Card className=" p-6  shadow-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,165,0,0.5)] relative overflow-hidden">
              <div className="text-3xl font-bold text-yellow-500 mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Share the Link</h3>
              <p className="text-muted-foreground">Send the unique form link to your clients via email or any channel.</p>
            </Card>

            <Card className=" p-6  shadow-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,165,0,0.5)] relative overflow-hidden">
              <div className="text-3xl font-bold text-yellow-500 mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Receive Testimonials</h3>
              <p className="text-muted-foreground">Collect and review client's testimonials in your dashboard.</p>
            </Card>

            <Card className=" p-6  shadow-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,165,0,0.5)] relative overflow-hidden">
              <div className="text-3xl font-bold text-yellow-500 mb-4">4</div>
              <h3 className="text-xl font-semibold mb-2">Showcase Testimonials</h3>
              <p className="text-muted-foreground">Embed the love gallery on your website to boost credibility.</p>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/dashboard"
              className="inline-block px-10 py-4 rounded-full font-semibold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:bg-orange-600 hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-transparent hover:border-white"
            >
              Start Collecting Testimonials
            </Link>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-20 ">
        <MaxWidthWrapper>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold sm:text-5xl mb-4">
              ClientWords for Every Business
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover how businesses across various industries leverage ClientWords to boost credibility and conversions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,165,0,0.5)] relative overflow-hidden">
              <div className="flex items-center mb-4">
                <FaStore className="text-3xl text-yellow-500 mr-3" />
                <h3 className="text-2xl font-semibold">E-commerce</h3>
              </div>
              <p className="text-muted-foreground">
                Showcase product reviews to increase trust and drive more sales. Display customer experiences to highlight product quality and satisfaction.
              </p>
            </Card>

            <Card className="p-6 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,165,0,0.5)] relative overflow-hidden">
              <div className="flex items-center mb-4">
                <FaBriefcase className="text-3xl text-yellow-500 mr-3" />
                <h3 className="text-2xl font-semibold">B2B Services</h3>
              </div>
              <p className="text-muted-foreground">
                Highlight client success stories and testimonials to demonstrate expertise and build credibility with potential clients in your industry.
              </p>
            </Card>

            <Card className="p-6 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,165,0,0.5)] relative overflow-hidden">
              <div className="flex items-center mb-4">
                <FaGraduationCap className="text-3xl text-yellow-500 mr-3" />
                <h3 className="text-2xl font-semibold">Education</h3>
              </div>
              <p className="text-muted-foreground">
                Feature student and parent testimonials to showcase the quality of your educational programs and attract more enrollments.
              </p>
            </Card>

            <Card className="p-6 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,165,0,0.5)] relative overflow-hidden">
              <div className="flex items-center mb-4">
                <FaHotel className="text-3xl text-yellow-500 mr-3" />
                <h3 className="text-2xl font-semibold">Hospitality</h3>
              </div>
              <p className="text-muted-foreground">
                Display guest reviews to highlight your excellent service and amenities, encouraging more bookings for your hotel or restaurant.
              </p>
            </Card>

            <Card className="p-6 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,165,0,0.5)] relative overflow-hidden">
              <div className="flex items-center mb-4">
                <FaLaptopCode className="text-3xl text-yellow-500 mr-3" />
                <h3 className="text-2xl font-semibold">SaaS</h3>
              </div>
              <p className="text-muted-foreground">
                Showcase user testimonials to demonstrate the value of your software, highlighting key features and benefits that drive user adoption.
              </p>
            </Card>

            <Card className="p-6 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,165,0,0.5)] relative overflow-hidden">
              <div className="flex items-center mb-4">
                <FaUserMd className="text-3xl text-yellow-500 mr-3" />
                <h3 className="text-2xl font-semibold">Healthcare</h3>
              </div>
              <p className="text-muted-foreground">
                Share patient testimonials to build trust in your healthcare services, emphasizing quality care and positive outcomes.
              </p>
            </Card>
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
      <AwesomePricingSection />

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white p-8 md:p-16 m-5 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl">
        <div className="relative z-10 text-center space-y-6">
          <h2 className="text-4xl md:text-5xl text-center font-extrabold tracking-tight mb-4">
            Ready to <span className="text-yellow-400">Boost Your Conversions?</span>
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

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-24 h-24 md:w-40 md:h-40 bg-yellow-400 opacity-30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 md:w-56 md:h-56 bg-orange-500 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-10 w-20 h-20 md:w-32 md:h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
      </section>


      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-12">
        <MaxWidthWrapper>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <Link href="/" className="flex-shrink-0">
                <Image src='/brand.png' width={200} height={200} alt='ClientWords' />
              </Link>
              {/* <p className="text-muted-foreground">Transforming customer testimonials into powerful social proof.</p> */}
              <div className="text-muted-foreground"><Mail className="inline mr-2" />support@clientwords.com</div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Product</h4>
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