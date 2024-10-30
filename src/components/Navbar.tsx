import Link from 'next/link';
import { MaxWidthWrapper } from './MaxWidthWrapper';
import Image from 'next/image';
import { MoveUpRight } from 'lucide-react';

export function Navbar() {

  const links = [
    {
      name: 'Features',
      href: '#features'
    },
    {
      name: 'How it works',
      href: '#how-it-works'
    },
    {
      name: 'Use Cases',
      href: '#use-cases'
    },
    {
      name: 'Pricing',
      href: '#pricing'
    }
  ];

  return (
    <div className={`flex z-50 items-center justify-center top-0 md:sticky transition-transform duration-300 translate-y-0`}>
      <nav className="mt-4 border rounded-full backdrop-filter backdrop-blur-lg border-yellow-500 px-2.5 sticky top-0 z-50">
        <MaxWidthWrapper>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="flex justify-center gap-4 items-center h-16">
              <div className="relative inline-flex items-center">
                <Link href="/" className="flex-shrink-0">
                  <Image
                    src='/newbrand1.png' width={200} height={200} alt='ClientWords' />
                </Link>
              </div>
              <div>
                <div className="lg:ml-6 lg:flex  hidden mr-6">
                  {links.map((link, index) => (
                    <Link key={index} href={link.href} className="hover:text-muted-foreground  px-3 py-2 rounded-md text-sm font-medium">
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className='flex items-center gap-2 justify-center'>
                <Link
                  href="https://github.com/n3rm4121/clientwords"
                  target='_blank'
                  className="relative  text-white inline-flex items-center justify-center px-4 py-2  bg-white bg-opacity-20 border border-gray-200 rounded-full backdrop-blur-lg shadow-md transition-transform transform hover:scale-105 hover:bg-opacity-30"
                >
                  <span className="font-bold">Github</span>
                  <MoveUpRight className="inline w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </nav>
    </div>
  );
}
