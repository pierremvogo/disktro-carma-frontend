"use client";
import React, { useState } from "react";
import { Play, Pause, Volume2, Maximize2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ScreenEmbed() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="w-full h-full bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 flex flex-col">
      {/* Main Content Area */}
      <div className="flex-1 relative bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 flex items-center justify-center p-8">
        <div className="text-center text-white space-y-4">
          <div className="space-y-2">
            <h2 className="text-4xl drop-shadow-lg">Your Content Here</h2>
            <p className="text-lg opacity-90 drop-shadow">
              This screen is embedded within your artistic frame
            </p>
          </div>

          {/* Sample Content Card */}
          <div className="mt-8 bg-white/10 backdrop-blur-md rounded-xl p-6 max-w-md mx-auto border border-white/20">
            <div className="aspect-video bg-black/20 backdrop-blur-sm rounded-lg mb-4 flex items-center justify-center overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"
                alt="Abstract art"
                className="w-full h-full object-cover rounded-lg opacity-80"
              />
            </div>
            <p className="text-sm opacity-80 drop-shadow">
              Add any content: videos, images, apps, or interactive elements
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
