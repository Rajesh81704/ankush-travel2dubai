import { Hero } from "@/components/home/Hero";
import { FeaturedPackages } from "@/components/home/FeaturedPackages";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Triptoo Travels - Explore Your Dream Destinations | Travel Packages",
  description:
    "Discover curated travel packages across India and world. Book your next adventure with Triptoo Travels. Best deals on tours, hotels, and flights. Plan your dream vacation today!",
  keywords: ["travel packages", "tour deals", "vacation", "adventure", "travel agencies", "dubai visa"],
  openGraph: {
    title: "Triptoo Travels - Book Your Dream Vacation",
    description: "Curated travel packages and experiences tailored for you",
    type: "website",
  },
};

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <Hero />

      {/* ── Homepage Visa Highlight Section ── */}
      <section className="max-w-[1320px] mx-auto px-6 lg:px-16 py-12">
        <div className="bg-gradient-to-r from-blue-900/90 via-slate-900 to-slate-900 border border-slate-700/80 rounded-3xl p-8 lg:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Global Visa Assistance
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Planning International Travel? <span className="text-amber-400 italic">Get Express Visa Support</span>
            </h2>
            <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
              Fast-track Tourist &amp; Business Visas for Dubai (24h), Singapore, Thailand, Schengen Europe, UK, and USA.
            </p>
          </div>

          <Link
            href="/visa"
            className="px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-2xl text-sm flex items-center gap-2 shadow-lg hover:shadow-amber-500/20 transition-all duration-200 shrink-0"
          >
            Apply For Visa <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <FeaturedPackages />
      <WhyChooseUs />
      <Testimonials />
    </div>
  );
}
