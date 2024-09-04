'use client'

import React, { useState } from 'react';
import LoveGalleryCustomizer from './LoveGalleryCustomizer';
import { EmbedCodeGenerator } from './EmbedCodeGenerator';
import { usePathname } from 'next/navigation';
import RealTimePreview from './RealTimeLoveGallery';
import { Card } from '@/components/ui/card';

const LoveGallery = () =>{
  const pathname = usePathname();
  
  const spaceId = pathname.split("/")[4]
  const [theme, setTheme] = useState<string>('light');
  const [layout, setLayout] = useState<'carousel' | 'grid'>('grid');

  return (
    <div className='flex flex-col gap-4'>
      {/* Customizer */}
      <LoveGalleryCustomizer
        theme={theme}
        setTheme={setTheme}
        layout={layout}
        setLayout={setLayout}
        
      />

      {/* Preview Section */}
  
        <RealTimePreview spaceId={spaceId} theme={theme} layout={layout} />
        
     

      {/* Embed Code Generator */}
      <EmbedCodeGenerator
        spaceId={spaceId}
        theme={theme}
        layout={layout}
      />
    </div>
  );
};

export default LoveGallery;
