"use client";

import { Check, Music, Headphones, Crown, Building2 } from "lucide-react";

export default function SubscriptionPage() {
  const plans = [
    {
      id: 1,
      name: "Fan Free",
      icon: Headphones,
      price: "$0",
      period: "/month",
      description: "Perfect for discovering new music and artists.",
      buttonText: "Start Free",
      popular: false,
      features: [
        "Unlimited music streaming",
        "Create playlists",
        "Follow artists",
        "Community access",
        "Standard audio quality",
        "Ads included",
      ],
    },
    {
      id: 2,
      name: "Fan Premium",
      icon: Crown,
      price: "$9.99",
      period: "/month",
      description: "The ultimate experience for music lovers.",
      buttonText: "Get Premium",
      popular: true,
      features: [
        "Everything in Free",
        "Ad-free listening",
        "Offline downloads",
        "High-quality audio",
        "Exclusive content",
        "Early access releases",
      ],
    },
    {
      id: 3,
      name: "Artist Pro",
      icon: Music,
      price: "$19.99",
      period: "/month",
      description: "Grow your audience and monetize your music.",
      buttonText: "Become Pro",
      popular: false,
      features: [
        "Unlimited uploads",
        "Artist verification",
        "Advanced analytics",
        "Royalty reports",
        "Release scheduling",
        "Priority support",
      ],
    },
    {
      id: 4,
      name: "Label / Enterprise",
      icon: Building2,
      price: "Custom",
      period: "",
      description: "For labels, managers, and large music organizations.",
      buttonText: "Contact Sales",
      popular: false,
      features: [
        "Multiple artists management",
        "Revenue management",
        "Team collaboration",
        "Advanced reporting",
        "API access",
        "Dedicated account manager",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(147,51,234,0.25),transparent_40%)]" />

        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
              🎵 Music Subscription Plans
            </span>

            <h1 className="mt-8 text-5xl md:text-7xl font-bold text-white">
              Choose Your
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Music Journey
              </span>
            </h1>

            <p className="mt-8 text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
              Whether you're a passionate fan discovering new sounds or an
              artist building a global audience, we have the perfect plan for
              you.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-6 pb-24">
        <div className="grid gap-8 lg:grid-cols-4">
          {plans.map((plan) => {
            const Icon = plan.icon;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl border backdrop-blur-xl p-8 transition-all duration-300 hover:-translate-y-2 ${
                  plan.popular
                    ? "border-purple-500 bg-purple-500/10 shadow-[0_0_50px_rgba(168,85,247,0.25)]"
                    : "border-white/10 bg-white/5"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-xs font-semibold text-white">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                    <Icon className="h-7 w-7 text-purple-400" />
                  </div>

                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>

                  <p className="mt-2 text-sm text-slate-400">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-8">
                  <span className="text-5xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-slate-400">{plan.period}</span>
                </div>

                <button
                  className={`w-full rounded-xl py-3 font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {plan.buttonText}
                </button>

                <div className="mt-8 border-t border-white/10 pt-8">
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-slate-300"
                      >
                        <Check className="mt-0.5 h-5 w-5 text-green-400 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comparison Section */}
      <section className="container mx-auto px-6 pb-24">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
          <div className="p-8 border-b border-white/10">
            <h2 className="text-3xl font-bold text-white text-center">
              Compare Plans
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-6 text-left text-white">Features</th>
                  <th className="p-6 text-center text-white">Fan Free</th>
                  <th className="p-6 text-center text-white">Fan Premium</th>
                  <th className="p-6 text-center text-white">Artist Pro</th>
                  <th className="p-6 text-center text-white">Enterprise</th>
                </tr>
              </thead>

              <tbody className="text-slate-300">
                {[
                  ["Music Streaming", "✓", "✓", "✓", "✓"],
                  ["No Ads", "✕", "✓", "✓", "✓"],
                  ["Offline Listening", "✕", "✓", "✓", "✓"],
                  ["Upload Music", "✕", "✕", "✓", "✓"],
                  ["Analytics", "✕", "✕", "✓", "✓"],
                  ["Royalty Reports", "✕", "✕", "✓", "✓"],
                  ["API Access", "✕", "✕", "✕", "✓"],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-white/5">
                    {row.map((cell, index) => (
                      <td
                        key={index}
                        className={`p-6 ${
                          index === 0 ? "font-medium" : "text-center"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-4xl font-bold text-white mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "Can I cancel my subscription anytime?",
                a: "Yes, you can upgrade, downgrade, or cancel your subscription at any time.",
              },
              {
                q: "Do artists keep ownership of their music?",
                a: "Absolutely. Artists retain full ownership and control over their content.",
              },
              {
                q: "How are royalties calculated?",
                a: "Royalties are calculated based on streams, subscriptions, and platform revenue sharing.",
              },
              {
                q: "Can I switch plans later?",
                a: "Yes. You can move between plans whenever your needs change.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="text-lg font-semibold text-white">{item.q}</h3>

                <p className="mt-3 text-slate-400">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
