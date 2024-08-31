'use client'

import { Button } from "@/components/ui/button";
import { CircleCheck, Copy, MessageCircle } from "lucide-react";
import { useState } from "react";


export function EmptyState({ uniqueLink }: { uniqueLink: string }) {

    const copyToClipboard = async () => {
        try {
          await navigator.clipboard.writeText(uniqueLink)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } catch (err) {
          console.error('Failed to copy text: ', err)
        }
      }
  
      
    const [copied, setCopied] = useState(false)
    return (
      <div className="flex flex-col items-center justify-center p-8 rounded-lg">
        <div className="p-4 mb-6">
          <MessageCircle className="text-5xl text-indigo-500" />
        </div>
        <h2 className="text-2xl font-bold mb-3">No testimonials yet</h2>
        <p className="text-center tracking-tight mb-6 text-muted-foreground max-w-md">
          Your testimonial gallery is waiting to be filled with customer love. Share your public testimonial page and start collecting amazing feedback!
        </p>
        <div className='flex gap-4 w-min text-center justify-center border rounded-lg p-2'>
          <div 
            id='uniqueLink'
            className="w-full p-5 border-2 border-gray-300 rounded-lg bg-gray-900 text-gray-200 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
          >
            {uniqueLink}
          </div>
          <Button
            onClick={copyToClipboard}
            className={`rounded-md focus:outline-none transition-colors duration-200 ${copied ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {copied ? (
              <CircleCheck className="w-4 h-4 text-white" />
            ) : (
              <Copy className="w-4 h-4 text-white" />
            )}
            <span className="ml-2 text-white">{copied ? 'Copied!' : 'Copy'}</span>
          </Button>
        </div>
      </div>
    )
  }