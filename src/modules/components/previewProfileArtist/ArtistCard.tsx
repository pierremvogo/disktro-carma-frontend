import { Star, Image } from "lucide-react";

interface ArtistCardProps {
  name: string;
  genres: string[];
  subscribers: number;
  imageUrl?: string;
  hasSubscription: boolean;
  onViewProfile: () => void;
}

export function ArtistCard({
  name,
  genres,
  subscribers,
  imageUrl,
  hasSubscription,
  onViewProfile,
}: ArtistCardProps) {
  return (
    <div className="bg-[#5a2772]/50 backdrop-blur-sm rounded-2xl p-6 border border-[#7a3f91]/30 hover:border-[#7a3f91]/60 transition-all">
      <div className="flex flex-col items-center mb-4">
        <div className="w-32 h-32 rounded-full bg-[#4a1f5c] flex items-center justify-center mb-6 border-4 border-[#7a3f91]/30">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-[#6b2d82] rounded-lg flex items-center justify-center">
              <Image className="w-6 h-6 text-[#9f7fb5]" />
            </div>
          )}
        </div>

        <h3 className="text-white text-lg font-medium mb-2">{name}</h3>
        <button
          onClick={onViewProfile}
          className="text-[#a35d3f] hover:text-[#b86d4f] text-sm mb-2 transition-colors"
        >
          View artist profile
        </button>
        <p className="text-gray-300 text-sm text-center mb-2">
          {genres.join(", ")}
        </p>
        <p className="text-gray-400 text-xs">{subscribers} subscribers</p>
      </div>

      <button
        className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
          hasSubscription
            ? "bg-[#7a3f91] hover:bg-[#8a4fa1] text-white"
            : "bg-[#6b2d82]/60 text-gray-300"
        }`}
      >
        <Star
          className={`w-4 h-4 ${hasSubscription ? "fill-white" : "fill-none"}`}
        />
        {hasSubscription ? "Subscribe" : "Subscription coming soon"}
      </button>
    </div>
  );
}
