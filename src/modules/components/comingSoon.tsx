"use client";

import { ArrowLeft, Clock, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SubscriptionComingSoon() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 flex items-center justify-center px-4 py-8">
      <div className="relative max-w-2xl w-full">
        {/* Glow Effect */}
        <div className="absolute -top-10 -left-10 h-40 w-40 bg-purple-500/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -right-10 h-40 w-40 bg-pink-500/30 rounded-full blur-3xl" />

        <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-8">
            <Sparkles size={16} />
            New Feature
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 animate-ping bg-white/20 rounded-full" />
              <div className="relative h-24 w-24 rounded-full bg-white/15 flex items-center justify-center border border-white/20">
                <Clock size={40} className="text-white" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Coming Soon
          </h1>

          {/* Description */}
          <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-10">
            We're working hard to bring you an amazing subscription experience.
            This feature will be available very soon with exclusive benefits,
            premium content, and much more.
          </p>

          {/* Progress Bar */}
          <div className="mb-10">
            <div className="flex justify-between text-white/70 text-sm mb-2">
              <span>Development Progress</span>
              <span>85%</span>
            </div>

            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-[85%] bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-gray-900 font-semibold hover:scale-105 transition-transform"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>

            <button
              className="px-6 py-3 rounded-xl border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-all"
              disabled
            >
              Available Soon
            </button>
          </div>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-white/10">
            <p className="text-white/50 text-sm">
              Thank you for your patience. Great things are on the way 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
