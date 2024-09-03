import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { FaArrowRight } from 'react-icons/fa';
import { MaxWidthWrapper } from './MaxWidthWrapper';
import ModeToggle from './toggleThemeBtn';

export function Navbar() {

  const links = [
    {
      name: 'Features',
      href: '#features'
    },
    // {
    //   name: 'Pricing',
    //   href: '#pricing'
    // }
  ]
  return (
    <div className='flex items-center justify-center top-0 md:sticky'>
    <nav className="mt-4 border rounded-full backdrop-filter backdrop-blur-lg border-gray-400 px-2.5 sticky  top-0 z-50">
      <MaxWidthWrapper>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex justify-center gap-4  items-center h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold">TestiBoost</span>
            </Link>
            
          </div>
          <div>
          <div className="sm:ml-6 sm:flex hidden  sm:space-x-8">  

              {links.map((link, index) => (
                <Link key={index} href={link.href} className=" hover:text-gray-700   px-3 py-2 rounded-md text-sm font-medium">
                  {link.name}
                </Link>
              ))}
             
            </div>
          </div>
          <div className='flex items-center gap-2 justify-center'>
          
            <Link href="/login"
             className={buttonVariants({variant:'secondary'})}
             >
              Login
              {/* <FaArrowRight className='ml-3' /> */}
            </Link>
          
            <ModeToggle />
            
          </div>
        </div>
      </div>
      </MaxWidthWrapper>
    </nav>
    </div>
  );
}
