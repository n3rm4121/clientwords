'use client'

import React, { useState } from 'react';
import LoveGalleryCustomizer from './LoveGalleryCustomizer';
import { EmbedCodeGenerator } from './EmbedCodeGenerator';
import { usePathname } from 'next/navigation';
import RealTimePreview from './RealTimeLoveGallery';

const LoveGallery = () => {
  const pathname = usePathname();

  const spaceId = pathname.split("/")[4]
  const [theme, setTheme] = useState<string>('light');
  const [layout, setLayout] = useState<'carousel' | 'grid'>('grid');

  return (
    <div className='flex flex-col gap-4'>

      <LoveGalleryCustomizer
        theme={theme}
        setTheme={setTheme}
        layout={layout}
        setLayout={setLayout}

      />

      <RealTimePreview spaceId={spaceId} theme={theme} layout={layout} />

      <EmbedCodeGenerator
        spaceId={spaceId}
        theme={theme}
        layout={layout}
      />
    </div>
  );
};

export default LoveGallery;
