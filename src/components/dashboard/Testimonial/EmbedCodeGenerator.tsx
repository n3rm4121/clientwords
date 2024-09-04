// components/embedcodegenerator.tsx
'use client'
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircledIcon, CopyIcon } from '@radix-ui/react-icons';
interface EmbedCodeGeneratorProps {
  spaceId: string;
  theme: string;
  layout: 'carousel' | 'grid';
}

export const EmbedCodeGenerator: React.FC<EmbedCodeGeneratorProps> = ({
  spaceId,
  theme,
  layout,
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(iframeCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };


  // const iframeSrc = `/embed/${spaceId}?theme=${theme}&showLikeButton=${showLikeButton}
  const iframeSrc = `${process.env.NEXT_PUBLIC_APP_URL}/embed/${spaceId}?theme=${theme}&layout=${layout}`;
//   const embedUrl = `${process.env.NEXT_PUBLIC_APP_URL}/embed/${spaceId}`;

  const iframeCode = `<iframe src="${iframeSrc}"style="border: 0; width: 100%; height: 300px; overflow: hidden;"
  frameborder="0"
  scrolling="no"
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"></iframe>`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-6 p-6 border rounded-lg shadow-lg"
    >
      <h2 className="text-xl font-semibold">Embed Code</h2>
      <div className="relative">
        <textarea
          readOnly
          value={iframeCode}
          className="w-full p-5 border-2 border-gray-300 rounded-lg bg-gray-900 text-gray-200 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
          rows={4}
        />

        <Button
          onClick={copyToClipboard}
          className={`absolute top-2 right-2 px-3 py-1 rounded-md focus:outline-none transition-colors duration-200 ${copied ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
            }`}
        >
          {copied ? (
            <CheckCircledIcon className="w-4 h-4 text-white" />
          ) : (
            <CopyIcon className="w-4 h-4 text-white" />
          )}
          <span className="ml-2 text-white">{copied ? 'Copied!' : 'Copy'}</span>
        </Button>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-3 text-sm text-gray-600 dark:text-gray-400"
      >
        Copy the code above to embed the Love Gallery on your website.
      </motion.p>
    </motion.div>
  );
};

