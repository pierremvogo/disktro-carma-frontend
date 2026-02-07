import { User, LogOut } from 'lucide-react';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-[#4a1f5c]">
      <div className="flex items-center gap-4">
        <button className="w-10 h-10 rounded-full bg-[#6b2d82] flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </button>
        <button className="text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 className="text-white text-xl">Bokk music with everybody</h1>
      </div>
      
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          className="text-white hover:bg-[#6b2d82] flex items-center gap-2"
        >
          <User className="w-4 h-4" />
          Profile
        </Button>
        <Button 
          className="bg-[#a35d3f] hover:bg-[#8a4d34] text-white flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}
