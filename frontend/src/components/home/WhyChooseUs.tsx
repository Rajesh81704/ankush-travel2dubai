"use client";

import { memo } from "react";

const features = [
  {
    icon: "✨",
    title: "Best Price Guarantee",
    description: "We ensure you get the best price on all our packages. No hidden fees.",
    bgGradient: "from-blue-50 to-blue-100/50",
    accent: "border-blue-200",
    textAccent: "text-blue-600",
  },
  {
    icon: "☎️",
    title: "24/7 Customer Support",
    description: "Our travel experts are always here to help you, day or night.",
    bgGradient: "from-amber-50 to-amber-100/50",
    accent: "border-amber-200",
    textAccent: "text-amber-600",
  },
  {
    icon: "🔒",
    title: "Safe & Secure Booking",
    description: "Your booking is protected with industry-standard encryption.",
    bgGradient: "from-green-50 to-green-100/50",
    accent: "border-green-200",
    textAccent: "text-green-600",
  },
  {
    icon: "🎯",
    title: "Flexible Packages",
    description: "Fully customizable trips tailored to your schedule and budget.",
    bgGradient: "from-purple-50 to-purple-100/50",
    accent: "border-purple-200",
    textAccent: "text-purple-600",
  },
  {
    icon: "⭐",
    title: "Trusted by Thousands",
    description: "50,000+ happy travelers have booked their dream trips with us.",
    bgGradient: "from-rose-50 to-rose-100/50",
    accent: "border-rose-200",
    textAccent: "text-rose-600",
  },
];

const FeatureCard = memo(({ icon, title, description, bgGradient, accent, textAccent }: typeof features[0]) => (
  <div
    className={`relative group bg-gradient-to-br ${bgGradient} rounded-[24px] p-6 flex flex-col items-center text-center hover:shadow-premium-hover border-2 ${accent} transition-all duration-200 hover-lift-premium overflow-hidden`}
  >
    {/* Backdrop glow effect */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-[24px]" />
    </div>

    {/* Content */}
    <div className="relative z-10">
      <div className="text-4xl mb-4 group-hover:animate-bounce transition-all duration-200">
        {icon}
      </div>
      <h3 className={`font-bold ${textAccent} text-[14px] mb-2.5 leading-snug heading-premium`}>{title}</h3>
      <p className="text-[13px] text-slate-300 leading-relaxed">{description}</p>
    </div>

    {/* Bottom accent bar */}
    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${accent === 'border-blue-200' ? 'from-blue-400 to-blue-300' : accent === 'border-amber-200' ? 'from-amber-400 to-amber-300' : accent === 'border-green-200' ? 'from-green-400 to-green-300' : accent === 'border-purple-200' ? 'from-purple-400 to-purple-300' : 'from-rose-400 to-rose-300'} opacity-0 group-hover:opacity-100 transition-opacity duration-200`} />
  </div>
));

FeatureCard.displayName = "FeatureCard";

export const WhyChooseUs = memo(() => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label-premium mb-3">✨ Why Book With Us</p>
          <h2 className="heading-premium text-[32px] sm:text-[40px] text-gradient-premium mb-2">
            Travel With Confidence & Luxury
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Experience travel planning reimagined. Premium service. Exceptional value.
          </p>
          <div className="flex gap-2 justify-center mt-4">
            <div className="w-12 h-1 bg-gradient-to-r from-[#2563EB] to-[#F59E0B] rounded-full" />
            <div className="w-12 h-1 bg-gradient-to-r from-[#F59E0B] to-[#7C3AED] rounded-full" />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
});

WhyChooseUs.displayName = "WhyChooseUs";
