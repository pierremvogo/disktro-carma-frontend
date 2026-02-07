import { SkipBack, Play, SkipForward, List, Volume2, Heart } from 'lucide-react';
import { Slider } from './ui/slider';

export function MusicPlayer() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#2d0e3d] border-t border-[#4a1f5c] px-8 py-4">
      <div className="flex items-center justify-between gap-8">
        {/* Current Track Info */}
        <div className="flex items-center gap-4 w-64">
          <div className="w-14 h-14 rounded-lg bg-[#4a1f5c] overflow-hidden flex-shrink-0">
            <img 
              src="figma:asset/f0361cc805337c20edf5896c17b4ad6475b79563.png" 
              alt="Album art"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-white font-medium">GFHG</p>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="flex items-center gap-6">
            <button className="text-gray-300 hover:text-white transition-colors">
              <SkipBack className="w-6 h-6" fill="currentColor" />
            </button>
            
            <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform">
              <Play className="w-6 h-6 text-[#2d0e3d] ml-1" fill="currentColor" />
            </button>
            
            <button className="text-gray-300 hover:text-white transition-colors">
              <SkipForward className="w-6 h-6" fill="currentColor" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full max-w-2xl flex items-center gap-3">
            <span className="text-gray-400 text-xs w-10 text-right">0:00</span>
            <div className="flex-1 relative">
              <Slider 
                defaultValue={[15]} 
                max={100} 
                step={1}
                className="w-full"
              />
            </div>
            <span className="text-gray-400 text-xs w-10">3:54</span>
          </div>
        </div>

        {/* Additional Controls */}
        <div className="flex items-center gap-4 w-64 justify-end">
          <button className="text-gray-300 hover:text-white transition-colors">
            <List className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            <button className="text-gray-300 hover:text-white transition-colors">
              <Volume2 className="w-5 h-5" />
            </button>
            <div className="w-24">
              <Slider 
                defaultValue={[70]} 
                max={100} 
                step={1}
                className="w-full"
              />
            </div>
          </div>
          
          <button className="text-gray-300 hover:text-white transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
