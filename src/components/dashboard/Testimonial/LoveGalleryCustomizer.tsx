import React from 'react';

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
    <div className="mb-6 p-4 border rounded-lg  ">
      <h2 className="text-xl font-semibold mb-4">Customize Your Love Gallery</h2>

      {/* Theme Selection */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Theme:</label>
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
            <label className="mr-2 font-medium">Layout:</label>
            <select
            value={layout}
            onChange={(e) => setLayout(e.target.value as 'carousel' | 'grid')}
            className="p-2 border rounded"
            >
             <option value="grid">Grid</option>
            <option value="carousel">Carousel</option>
            
            </select>
        </div>

    </div>
  );
};

export default LoveGalleryCustomizer;
