'use client'

import { Card } from '@/components/ui/card';
import React from 'react';
import { Label } from '@/components/ui/label';

interface LoveGalleryCustomizerProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
    layout: 'carousel' | 'grid';
    setLayout: React.Dispatch<React.SetStateAction<'carousel' | 'grid'>>;
}

const LoveGalleryCustomizer: React.FC<LoveGalleryCustomizerProps> = ({
  theme,
  setTheme,
    layout,
    setLayout
}) => {
  return (
    <Card className="mb-6 mt-4 p-4 ">
      <h2 className="text-xl mb-2 font-semibold">Customize</h2>

      {/* Theme Selection */}
      <div className="mb-4">
        <Label className="mr-2 font-medium">Theme:</Label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      {/* Layout Selection */}
       <div className="mb-4">
            <Label className="mr-2 font-medium">Layout:</Label>
            <select
            value={layout}
            onChange={(e) => setLayout(e.target.value as 'carousel' | 'grid')}
            className="p-2 border rounded"
            >
             <option value="grid">Grid</option>
            <option value="carousel">Carousel</option>
            
            </select>
        </div>

    </Card>
  );
};

export default LoveGalleryCustomizer;
