import { Search } from 'lucide-react';

const navItems = [
  { label: 'Discover', active: false },
  { label: 'Artists', active: true },
  { label: 'My Music', active: false },
  { label: "Editor's Playlists", active: false },
  { label: 'Dashboard', active: false },
];

export function Navigation() {
  return (
    <div className="bg-[#5a2772] px-8 py-6">
      <div className="flex items-center justify-between">
        <nav className="flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`text-base pb-2 border-b-2 transition-colors ${
                item.active
                  ? 'text-white border-white'
                  : 'text-gray-300 border-transparent hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        
        <div className="relative w-[420px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search music, artists..."
            className="w-full pl-12 pr-4 py-2.5 rounded-lg bg-white text-gray-700 placeholder:text-gray-400 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
