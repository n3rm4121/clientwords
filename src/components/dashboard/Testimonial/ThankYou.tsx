import { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import Link from 'next/link';
import { MaxWidthWrapper } from '@/components/MaxWidthWrapper';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

export function Thankyou({ userName, companyName, companyURL }: { userName: string, companyName: string, companyURL: string }) {

  useEffect(() => {
    confetti({
      particleCount: 300,
      spread: 100,
      origin: { y: 0.6, x: 0.5 },
      colors: ['#bb0000', '#ffffff'],
    });
  }, []);

  return (

     <MaxWidthWrapper className='bg-gradient-to-r from-blue-500 to-purple-500'>
    
            {/* Fixed Header */}
            <div className="fixed p-6 top-0 left-0 w-full z-10 ">
        <div className="relative inline-flex items-center">
                <Link href="/" className="flex-shrink-0">
                  <Image src='/lastremovebg.png' width={200} height={200} alt='ClientWords' />
                </Link>
                <Badge variant={'secondary'} className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                  Beta
                </Badge>
              </div>
        </div>
    
    
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-white bg-opacity-80 rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
        >
          <svg className="w-28 h-28 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </motion.div>
        
        <motion.h1 
          className="text-4xl font-bold mt-8 mb-4 text-gray-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Thank You, {userName}!
        </motion.h1>
        
        <motion.p 
          className="text-gray-700 mb-10 leading-relaxed tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Your testimonial has been successfully submitted. <br /> We appreciate your valuable feedback!
        </motion.p>
        
        <motion.button
          className="rounded-3xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 px-6 hover:shadow-lg transition duration-300 ease-in-out transform  outline-dashed"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open(companyURL, '_blank')}

        >
          Visit {companyName}
        </motion.button>
      </motion.div>
    </div>
    </MaxWidthWrapper>
  );
}
