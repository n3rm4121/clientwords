import React, { useState } from 'react';
import LoveGalleryCustomizer from './LoveGalleryCustomizer';
import { EmbedCodeGenerator } from './EmbedCodeGenerator';
import { usePathname } from 'next/navigation';
import RealTimePreview from './RealTimeLoveGallery';

const LoveGallery = () =>{
  const pathname = usePathname();
  
  const spaceId = pathname.split("/")[4]
  const [theme, setTheme] = useState<string>('light');
  const [layout, setLayout] = useState<'carousel' | 'grid'>('grid');

  // const businessId = spaceId; // Assuming businessId is the same as spaceId for simplicity

  return (
    <div className='flex flex-col'>
      {/* Customizer */}
      <LoveGalleryCustomizer
        theme={theme}
        setTheme={setTheme}
        layout={layout}
        setLayout={setLayout}
        
      />

      {/* Preview Section */}
      <div className=" my-6 border rounded-lg overflow-hidden">
        <h2 className="text-xl mb-4  font-semibold">Preview</h2>
        <RealTimePreview spaceId={spaceId} theme={theme} layout={layout} />
        
      </div>

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
