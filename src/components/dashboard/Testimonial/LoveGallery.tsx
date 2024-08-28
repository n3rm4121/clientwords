// src/app/spaces/[spacename]/[spaceid]/LoveGallery.tsx

import React, { useState } from 'react';
import LoveGalleryCustomizer from './LoveGalleryCustomizer';
import { EmbedCodeGenerator } from './EmbedCodeGenerator';
import { usePathname } from 'next/navigation';

const LoveGallery = () =>{
  const pathname = usePathname();
  
  const spaceId = pathname.split("/")[4]
  const [theme, setTheme] = useState<string>('light');
  const [layout, setLayout] = useState<'carousel' | 'grid'>('grid');

  // const businessId = spaceId; // Assuming businessId is the same as spaceId for simplicity

  return (
    <div>
      {/* Customizer */}
      <LoveGalleryCustomizer
        theme={theme}
        setTheme={setTheme}
        layout={layout}
        setLayout={setLayout}
        
      />

      {/* Preview Section */}
      <div className="my-6 border rounded-lg overflow-hidden">
        <h2 className="text-xl text-center font-semibold">Preview</h2>
        {/* src={`/embed/${spaceId}?theme=${theme}&showLikeButton=${showLikeButton}`} */}
        <iframe
          src={`/embed/${spaceId}?theme=${theme}&layout=${layout}`}
          width="100%"
          height="500px"
        ></iframe>
        
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
