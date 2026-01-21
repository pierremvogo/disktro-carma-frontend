// app/pricing/page.tsx

"use client";

import { CheckCircle2 } from "lucide-react";
import Header from "../layouts/header";
import Footer from "../layouts/footer";

const pricingOptions = [
  {
    name: "Single Release",
    price: "€9.99",
    description: "Distribue 1 single sur toutes les plateformes majeures.",
    features: ["1 morceau", "Spotify, Apple Music, etc.", "ISRC inclus"],
  },
  {
    name: "Album Release",
    price: "€29.99",
    description: "Distribue un album complet (jusqu'à 12 morceaux).",
    features: ["12 morceaux", "Tous les stores", "Statistiques avancées"],
  },
  {
    name: "Unlimited Plan",
    price: "€19.99 / an",
    description: "Sorties illimitées + 100% des royalties.",
    features: [
      "Sorties illimitées",
      "Support prioritaire",
      "YouTube Content ID",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="min-h-screen bg-gray-100 py-10 px-4">
          <h1 className="text-3xl font-bold text-center mb-10 text-[#1F89A5]">
            Nos Tarifs
          </h1>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingOptions.map((plan, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold text-[#1A4C61] mb-2">
                  {plan.name}
                </h2>
                <p className="text-2xl font-bold text-[#1F89A5] mb-4">
                  {plan.price}
                </p>
                <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                <ul className="mb-4 space-y-2">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center text-sm text-gray-700"
                    >
                      <CheckCircle2 size={16} className="text-[#1F89A5] mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full cursor-pointer bg-[#1F89A5] text-white text-sm py-2 px-4 rounded hover:bg-[#1A4C61] transition">
                  Choisir ce plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
