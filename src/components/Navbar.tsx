import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { FaArrowRight } from 'react-icons/fa';
import { MaxWidthWrapper } from './MaxWidthWrapper';
export function Navbar() {

  const links = [
    {
      name: 'Features',
      href: '#features'
    },
    {
      name: 'Pricing',
      href: '#pricing'
    }
  ]
  return (

    <nav className="bg-white border-b border-gray-200 px-2.5 sticky inset-x-0 top-0 z-50 w-full">
      <MaxWidthWrapper>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold">TestiBoost</span>
            </Link>
            
          </div>
          <div>
          <div className="hidden sm:ml-6 sm:flex  sm:space-x-8">  

              {links.map((link, index) => (
                <Link key={index} href={link.href} className="text-gray-900 hover:text-gray-700  px-3 py-2 rounded-md text-sm font-medium">
                  {link.name}
                </Link>
              ))}
             
            </div>
          </div>
          <div>
            <Link href="/auth/login"
             className={buttonVariants({variant:'ghost'})}
             >
              Login
              <FaArrowRight className='ml-3' />
            </Link>
            
            
          </div>
        </div>
      </div>
      </MaxWidthWrapper>
    </nav>
    
  );
}
