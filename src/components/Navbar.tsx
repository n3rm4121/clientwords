'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { MaxWidthWrapper } from './MaxWidthWrapper';
import ModeToggle from './toggleThemeBtn';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { useTheme } from 'next-themes';

export function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);

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

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > scrollY) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
    setScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY, handleScroll]);

  return (
    <div className={`flex z-50 items-center justify-center top-0 md:sticky transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
      <nav className="mt-4 border rounded-full backdrop-filter backdrop-blur-lg border-gray-400 px-2.5 sticky top-0 z-50">
        <MaxWidthWrapper>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="flex justify-center gap-4 items-center h-16">
              <div className="relative inline-flex items-center">
                <Link href="/" className="flex-shrink-0">
                  <Image 
                  src='/brand.png' width={200} height={200} alt='ClientWords' />
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
                <Link href="/login" className={buttonVariants({ variant: 'secondary' })}>
                  Login
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
