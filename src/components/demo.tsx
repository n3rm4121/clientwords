'use client'

import { Button } from "./ui/button"
import { useState } from "react";

 
 export const Demo = () => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    return (
 
 <div className="mt-16 relative w-full max-w-3xl aspect-video rounded-xl overflow-hidden shadow-2xl">
            {/* <Image
              src="/placeholder.svg?height=480&width=854"
              alt="TestiBoost Demo"
              layout="fill"
              objectFit="cover"
              className={`transition-opacity duration-300 ${isVideoPlaying ? 'opacity-0' : 'opacity-100'}`}
            /> */}
            <div className={`absolute inset-0 flex items-center justify-center ${isVideoPlaying ? 'hidden' : ''}`}>
              <Button
                onClick={() => setIsVideoPlaying(true)}
                className="text-2xl bg-white text-blue-600 hover:bg-blue-100 transition-colors duration-300"
              >
                ▶ Watch Demo
              </Button>
            </div>
            {isVideoPlaying && (
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="ClientWords Demo Video"
              
              ></iframe>
            )}
          </div> 

 )}