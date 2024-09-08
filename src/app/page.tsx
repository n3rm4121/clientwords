import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { FaBriefcase, FaChartLine, FaClone, FaCode, FaEnvelope, FaFacebookF, FaGraduationCap, FaHotel, FaLaptopCode, FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaRocket, FaStore, FaTwitter, FaUserMd } from "react-icons/fa";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Demo } from "@/components/demo";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-4xl">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl mb-6">
            Turn Your Client&apos;s Words into Powerful <span className="inline-block z-10 bg-yellow-400 px-2 rounded-md shadow-lg">Social Proof.</span>
             {/*<span className="text-red-600 animate-pulse">❤️</span> {' '} */}
           
          </h1>

          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
            Easily collect, curate, and showcase authentic client testimonials to skyrocket trust and conversions.
          </p>

          <div className="flex items-center justify-center py-8 space-x-4 text-lg font-medium">
            <span className="flex items-center"><FaRocket className="text-green-500 mr-2" /> No coding required</span>
            <span className="flex items-center"><FaCode className="text-blue-500 mr-2" /> Easy Integration</span>
          </div>

          <Link
            href="/dashboard"
             className="px-8 py-4 rounded-full font-semibold bg-gradient-to-r  from-yellow-400 to-orange-500 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Get Started for Free
          </Link>


          {/* <Demo /> */}
        </div>
      </MaxWidthWrapper>

      {/* Features Section */}
      <section id="features" className="py-20">
        <MaxWidthWrapper>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold sm:text-5xl mb-4">
              Why ClientWords?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              ClientWords is a powerful social proof platform that helps you collect and showcase authentic customer testimonials to skyrocket trust and conversions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {perks.map((perk, index) => (
              <Card key={index} className=" p-8 rounded-xl shadow-lg">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-4">
                    <perk.icon className="text-4xl text-blue-600" />
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
      <Card className=" p-6 shadow-md">
        <div className="text-3xl font-bold text-yellow-500 mb-4">1</div>
        <h3 className="text-xl font-semibold mb-2">Create Your Form</h3>
        <p className="text-muted-foreground">Design a custom testimonial form tailored to your business needs.</p>
      </Card>

      <Card className=" p-6  shadow-md">
        <div className="text-3xl font-bold text-yellow-500 mb-4">2</div>
        <h3 className="text-xl font-semibold mb-2">Share the Link</h3>
        <p className="text-muted-foreground">Send the unique form link to your clients via email or any channel.</p>
      </Card>

      <Card className=" p-6  shadow-md">
        <div className="text-3xl font-bold text-yellow-500 mb-4">3</div>
        <h3 className="text-xl font-semibold mb-2">Receive Testimonials</h3>
        <p className="text-muted-foreground">Collect and review client feedback in your dashboard.</p>
      </Card>

      <Card className=" p-6  shadow-md">
        <div className="text-3xl font-bold text-yellow-500 mb-4">4</div>
        <h3 className="text-xl font-semibold mb-2">Showcase Testimonials</h3>
        <p className="text-muted-foreground">Embed the love gallery on your website to boost credibility.</p>
      </Card>
    </div>

    <div className="mt-16 text-center">
      <Link
        href="/dashboard"
        className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500  font-semibold rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-300"
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
      <Card className="p-6">
        <div className="flex items-center mb-4">
          <FaStore className="text-3xl text-yellow-500 mr-3" />
          <h3 className="text-2xl font-semibold">E-commerce</h3>
        </div>
        <p className="text-muted-foreground">
          Showcase product reviews to increase trust and drive more sales. Display customer experiences to highlight product quality and satisfaction.
        </p>
      </Card>

      <Card className="p-6">
        <div className="flex items-center mb-4">
          <FaBriefcase className="text-3xl text-yellow-500 mr-3" />
          <h3 className="text-2xl font-semibold">B2B Services</h3>
        </div>
        <p className="text-muted-foreground">
          Highlight client success stories and testimonials to demonstrate expertise and build credibility with potential clients in your industry.
        </p>
      </Card>

      <Card className="p-6">
        <div className="flex items-center mb-4">
          <FaGraduationCap className="text-3xl text-yellow-500 mr-3" />
          <h3 className="text-2xl font-semibold">Education</h3>
        </div>
        <p className="text-muted-foreground">
          Feature student and parent testimonials to showcase the quality of your educational programs and attract more enrollments.
        </p>
      </Card>

      <Card className="p-6">
        <div className="flex items-center mb-4">
          <FaHotel className="text-3xl text-yellow-500 mr-3" />
          <h3 className="text-2xl font-semibold">Hospitality</h3>
        </div>
        <p className="text-muted-foreground">
          Display guest reviews to highlight your excellent service and amenities, encouraging more bookings for your hotel or restaurant.
        </p>
      </Card>

      <Card className="p-6">
        <div className="flex items-center mb-4">
          <FaLaptopCode className="text-3xl text-yellow-500 mr-3" />
          <h3 className="text-2xl font-semibold">SaaS</h3>
        </div>
        <p className="text-muted-foreground">
          Showcase user testimonials to demonstrate the value of your software, highlighting key features and benefits that drive user adoption.
        </p>
      </Card>

      <Card className="p-6">
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
        href="/signup"
        className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 font-semibold rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-300"
      >
        Get Started Today
      </Link>
    </div>
  </MaxWidthWrapper>
</section>

      {/* CTA Section */}
      <section className="py-20 bg-yellow-700">
        <MaxWidthWrapper>
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Boost Your Conversions?</h2>
            <p className="text-xl mb-8">Discover how ClientWords can transform your customer testimonials into powerful social proof.</p>

            <Link
              href="/signup"
              className="px-8 py-4 rounded-full font-semibold bg-gradient-to-r border border-white  from-yellow-400 to-orange-500 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Lets Get Started!🚀
            </Link>
          </div>
        </MaxWidthWrapper>
      </section>

{/* Contact Us Section */}
<section id="contact-us" className="py-20">
  <MaxWidthWrapper>
  <div className="text-center mb-16">
    <h2 className="text-4xl font-bold sm:text-5xl mb-4">
      Get in Touch
    </h2>
    <p className="text-xl text-muted-foreground mx-auto">
      Have questions or need assistance? We're here to help!
    </p>
  </div>
  <div className="flex items-center justify-center">
    <div className="w-full max-w-screen-sm">
      <form className="space-y-4">
        <Input type="text" placeholder="Your Name" required />
        <Input type="email" placeholder="Your Email" required />
        <Input type="text" placeholder="Subject" required />
        <Textarea placeholder="Your Message" required className="h-32" />
        <Button type="submit" className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          Send Message
        </Button>
      </form>
    </div>
  </div>
  </MaxWidthWrapper>
</section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-12">
        <MaxWidthWrapper>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="#features" className="hover:text-blue-400 transition-colors duration-200">Features</Link></li>
                {/* <li><Link href="#" className="hover:text-blue-400 transition-colors duration-200">Pricing</Link></li> */}
                <li><Link href="#use-cases" className="hover:text-blue-400 transition-colors duration-200">Use Cases</Link></li>
                <li><Link href="#how-it-works" className="hover:text-blue-400 transition-colors duration-200">How it works</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-blue-400 transition-colors duration-200">About Us</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition-colors duration-200">Careers</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition-colors duration-200">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="hover:text-blue-400 transition-colors duration-200">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-blue-400 transition-colors duration-200">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200"><FaFacebookF size={24} /></Link>
                <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200"><FaTwitter size={24} /></Link>
                <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200"><FaLinkedinIn size={24} /></Link>
              </div>
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