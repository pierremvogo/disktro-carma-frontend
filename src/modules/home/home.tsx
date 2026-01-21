"use client";

import { useState } from "react";
import Header from "../layouts/header";
import Footer from "../layouts/footer";

export default function Home() {
  const [mood, setMood] = useState("");
  const [playlistVisible, setPlaylistVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [songSuggestion, setSongSuggestion] = useState("");

  const handleMoodSubmit = () => {
    if (mood) setPlaylistVisible(true);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 p-6 font-sans">
          {/* Welcome Message */}
          <div className="bg-white/60 backdrop-blur-md shadow-md rounded-3xl p-8 text-center mb-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-[#1F89A5]">
              🌌 Welcome to Cosmic
            </h1>
            <p className="text-lg mt-2 text-gray-700">
              Welcome to your new favourite streaming platform. <br />{" "}
              <em>Start Small, Grow Useful</em>
            </p>
          </div>
          {/* Cloud Sections with 2 columns + 1 full width below */}
          <div className="flex flex-col items-center gap-6 mb-12 max-w-6xl mx-auto px-4">
            {/* Row with two columns */}
            <div className="flex flex-col md:flex-row w-full gap-6">
              {/* Our Mission */}
              <div className="flex-1 bg-white/60 backdrop-blur-lg shadow-xl px-8 py-6 text-center border border-purple-100 rounded-tl-3xl rounded-br-3xl">
                <h2 className="text-2xl font-semibold text-[#1F89A5] mb-3">
                  ☁️ Our Mission
                </h2>
                <p className="text-gray-800 text-lg font-medium">
                  At Cosmic, our mission is to reshape the way we consume music
                  by making it more ethical, artist-friendly, and
                  community-driven.
                  <br />
                  We believe that small actions by listeners can have a huge
                  impact on the industry.
                </p>
              </div>

              {/* Our Skeleton */}
              <div className="flex-1 bg-white/60 backdrop-blur-lg shadow-xl px-8 py-6 text-center border border-purple-100 rounded-tr-3xl rounded-bl-3xl">
                <h2 className="text-2xl font-semibold text-[#1F89A5] mb-3">
                  ☁️ Our Skeleton
                </h2>
                <p className="text-gray-800 text-lg font-medium">
                  Cosmic is built by a small collective of passionate
                  developers, artists, and activists.
                  <br />
                  We are bootstrapped, independent, and driven by purpose over
                  profit. Every feature we build reflects our values.
                </p>
              </div>
            </div>

            {/* Full-width CSR section below */}
            <div className="w-full bg-white/60 backdrop-blur-lg shadow-xl rounded-3xl px-8 py-6 text-center border border-purple-100">
              <h2 className="text-2xl font-semibold text-[#1F89A5] mb-3">
                ☁️ CSR: We Stand With Women in Sport
              </h2>
              <p className="text-gray-800 text-lg font-medium">
                Cosmic proudly supports women athletes. Our CSR initiative
                amplifies voices in women's sports and collaborates with
                grassroots campaigns to fight inequality.
                <br />
                We believe in fairness, visibility, and representation — on the
                field and in your playlists.
              </p>
            </div>
          </div>

          {/* Message 1: Vision */}
          <div className="bg-white/50 backdrop-blur-md shadow-md rounded-3xl p-6 mb-8 max-w-3xl mx-auto text-center">
            <p className="text-gray-800 text-lg font-medium">
              We strive for artist well-being, create awareness & educate on the
              power of the consumer.
              <br />
              <strong>Inclusivity is key 🫶</strong>
            </p>
          </div>

          {/* Message 2: Playlist Feature */}
          <div className="bg-white/50 backdrop-blur-md shadow-md rounded-3xl p-6 mb-8 max-w-3xl mx-auto text-center">
            <p className="text-gray-800 text-lg font-medium">
              We are making our first baby steps with Cosmic.
              <br />
              Start by streaming a playlist tailored to your mood.
              <br />
              If you know these artists — you’re a true niche music fan! 🎧
            </p>
          </div>

          {/* Quiz: Mood Selection */}
          <div className="bg-white/60 backdrop-blur-md shadow-md rounded-3xl p-6 mb-8 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold text-[#1F89A5] mb-4">
              🧠 What is your mood like today?
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {["Happy", "Sad", "Dancing", "Melancholic", "Need to Cry"].map(
                (option) => (
                  <button
                    key={option}
                    onClick={() => setMood(option)}
                    className={`px-4 py-2 rounded-full cursor-pointer text-white font-semibold ${
                      mood === option
                        ? "bg-[#1A4C61]"
                        : "bg-[#1F89A5] hover:bg-[#1A4C61]"
                    } transition`}
                  >
                    {option}
                  </button>
                )
              )}
            </div>
            <button
              onClick={handleMoodSubmit}
              className="mt-6 cursor-pointer bg-[#1F89A5] hover:bg-[#1A4C61] text-white px-6 py-2 rounded-full font-semibold transition"
            >
              Generate Playlist
            </button>
          </div>

          {/* Playlist */}
          {playlistVisible && (
            <div className="bg-white/60 backdrop-blur-md shadow-md rounded-3xl p-6 mb-8 max-w-3xl mx-auto text-center">
              <h3 className="text-xl font-semibold text-[#1F89A5] mb-2">
                🎶 Enjoy your curated playlist!
              </h3>
              <p className="text-gray-700">
                Handpicked songs just for your <strong>{mood}</strong> mood 💫
              </p>
              <ul className="mt-4 space-y-2 text-left text-gray-600 font-medium">
                <li>• Track 1 - Niche Artist A</li>
                <li>• Track 2 - Niche Artist B</li>
                <li>• Track 3 - Niche Artist C</li>
              </ul>
            </div>
          )}

          {/* Feedback Section */}
          <div className="bg-white/60 backdrop-blur-md shadow-md rounded-3xl p-8 max-w-3xl mx-auto text-center mt-12">
            <h4 className="text-2xl font-semibold text-[#1F89A5] mb-4">
              💌 Want to suggest a song?
            </h4>

            <p className="text-gray-700 mb-6 max-w-xl mx-auto text-base">
              Leave your email & song suggestion — we’ll try to add it, or
              recommend something similar just for you ❤️
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                // handle form submit here
              }}
              className="flex flex-col gap-4 items-center"
            >
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full max-w-md p-3 border border-purple-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                required
              />

              <input
                type="text"
                placeholder="Song you’d like to add"
                value={songSuggestion}
                onChange={(e) => setSongSuggestion(e.target.value)}
                className="w-full max-w-md p-3 border border-purple-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                required
              />

              <button
                type="submit"
                className="cursor-pointer bg-[#1F89A5] text-white font-semibold px-6 py-2 rounded-full hover:bg-[#1A4C61] transition w-full max-w-xs"
              >
                Submit
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
