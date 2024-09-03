import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Navbar } from "@/components/Navbar";
import { Button, buttonVariants } from "@/components/ui/button";
import { FaChartLine, FaClone, FaCode, FaFacebookF, FaLinkedinIn, FaRocket, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";


const perks = [
  {
    name: 'Easy Integration',
    description: 'Easily integrate with your website or app using a single line of code.',
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

]

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <MaxWidthWrapper>

        {/* Hero Section */}
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Turn Your Customer's<span className="text-red-600"> Love</span> {' '}
            into Powerful  <span className="text-blue-600">Social Proof.</span>
          </h1>

          <p className="mt-6 max-w-prose text-lg text-muted-foreground tracking-tight">
            Easily collect, curate, and showcase authentic customer testimonials to skyrocket trust and conversions.
          </p>

          <div className="flex items-center justify-center py-6">
            <span>✅ No coding required</span>
            <span className='ml-3'>✅ Easy Integration</span>
          </div>


          <Link
            href="/dashboard"
            className="border-gray-500 border  font-semibold py-3 px-8 rounded-full  hover:shadow-teal-400/70 hover:shadow-lg transition-all duration-300"
          >
            It's free. Sign up now 🚀
          </Link>





        </div>


      </MaxWidthWrapper>

      {/* Features Section */}
      <section id="features" className=" border-t">
        <MaxWidthWrapper>
          <div className="py-20 mx-auto text-center flex flex-col items-center ">
            <h2 className="text-4xl tracking-tight font-bold sm:text-6xl">
              Why TestiBoost?
            </h2>

            <p className="mt-6 max-w-prose text-lg text-muted-foreground tracking-tight">
              TestiBoost is a powerful social proof platform that helps you collect and showcase authentic customer testimonials to skyrocket trust and conversions.
            </p>

            <div className="grid grid-cols-1 gap-y-12 mt-16 sm:grid-cols-2  lg:gap-x-8 lg:grid-cols-3">
              {perks.map((perk, index) => (
                <div key={index} className="flex flex-col items-center justify-center ">
                  <perk.icon className="text-4xl text-blue-600" />
                  <h3 className="text-2xl font-bold mt-4">{perk.name}</h3>
                  <p className="mt-2 text-muted-foreground">{perk.description}</p>
                </div>
              ))}
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* TODO: CTA Section */}

      {/* Pricing Section */}

      {/* <section id="pricing" className="py-24">
        <MaxWidthWrapper className="mb-8 text-center max-w-5xl">
          <div className="mx-auto mb-10 sm:max-w-xl">
            <h2 className="text-4xl tracking-tight font-bold sm:text-6xl mb-10">
              Pricing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">

             
              <div className="shadow-xl border border-blue-500 rounded-lg transform transition-transform    hover:shadow-2xl">
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-blue-700">Starter</h3>
                  <p className="text-5xl font-bold mb-6">
                    $0<span className="text-lg font-normal">/month</span>
                  </p>
                  <ul className="text-left space-y-4 mb-8">
                    <li className="flex items-center">
                      <FaChartLine className="text-green-500 mr-3" /> Collect up to 10 testimonials
                    </li>
                    <li className="flex items-center">
                      <FaChartLine className="text-green-500 mr-3" /> Basic customization
                    </li>
                    <li className="flex items-center">
                      <FaChartLine className="text-green-500 mr-3" /> Email support
                    </li>
                  </ul>
                  <Link href="/auth/signup" className={`${buttonVariants({ size: 'lg' })} block w-full text-center`}>
                    Get Started
                  </Link>
                </div>
              </div>

             
              <div className="bg-gradient-to-b from-blue-600 to-teal-500 text-white shadow-xl rounded-lg transform transition-transform hover:shadow-2xl border-2 border-blue-700">
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Pro</h3>
                  <p className="text-5xl font-bold mb-6">
                    $29<span className="text-lg font-normal">/month</span>
                  </p>
                  <ul className="text-left space-y-4 mb-8">
                    <li className="flex items-center">
                      <FaChartLine className="text-yellow-400 mr-3" /> Unlimited testimonials
                    </li>
                    <li className="flex items-center">
                      <FaChartLine className="text-yellow-400 mr-3" /> Advanced customization
                    </li>
                    <li className="flex items-center">
                      <FaChartLine className="text-yellow-400 mr-3" /> Priority support
                    </li>
                    <li className="flex items-center">
                      <FaChartLine className="text-yellow-400 mr-3" /> Detailed analytics
                    </li>
                  </ul>
                  <Link href="/auth/signup" className={`${buttonVariants({ size: 'lg' })} block w-full text-center text-white border-white`}>
                    Upgrade Now
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </MaxWidthWrapper>
      </section> */}


      {/* Beta Signup Section */}
      <section id="login" className="py-24">
        <MaxWidthWrapper className="mb-8 text-center max-w-5xl">
          <div className="mx-auto mb-10 sm:max-w-xl">
            <h2 className="text-4xl tracking-tight font-bold sm:text-6xl mb-10">
              Join Our Beta Program
            </h2>
            <p className="mt-6 max-w-prose text-lg text-muted-foreground tracking-tight mb-8">
              Be among the first to experience TestiBoost and help shape its future. Sign up now for early access and exclusive benefits.
            </p>
            <Link href="/login" className={`${buttonVariants({ size: 'lg' })} block w-full text-center`}>
              Sign Up for Beta Access
            </Link>
          </div>
        </MaxWidthWrapper>
      </section>



      {/* Footer Section */}


      <footer className="p-8 bg-slate-950 text-white">
        <MaxWidthWrapper>
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h4 className="font-bold text-lg mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="hover:text-blue-400">Features</Link></li>
                  <li><Link href="#" className="hover:text-blue-400">Pricing</Link></li>
                  <li><Link href="#" className="hover:text-blue-400">Use Cases</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="hover:text-blue-400">About Us</Link></li>
                  <li><Link href="#" className="hover:text-blue-400">Careers</Link></li>
                  <li><Link href="#" className="hover:text-blue-400">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="hover:text-blue-400">Privacy Policy</Link></li>
                  <li><Link href="#" className="hover:text-blue-400">Terms of Service</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <Link href="#" className="text-blue-400 hover:text-blue-500"><FaFacebookF /></Link>
                  <Link href="#" className="text-blue-400 hover:text-blue-500"><FaTwitter /></Link>
                  <Link href="#" className="text-blue-400 hover:text-blue-500"><FaLinkedinIn /></Link>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
              <p>&copy; {new Date().getFullYear()} TestiBoost. All rights reserved.</p>
            </div>
          </div>
        </MaxWidthWrapper>
      </footer>

    </>

  );
}
