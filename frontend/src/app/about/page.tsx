"use client";

import { useSiteSettings } from "@/context/SiteSettingsContext";
import { Users, Star, Phone, Mail, MapPin, Award, Heart, Globe, Target, Eye } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const { settings } = useSiteSettings();
  const about = settings.aboutUs;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* ── Hero & Banner Section ── */}
      <section className="relative pt-[68px] bg-slate-950 overflow-hidden">
        <div className="relative h-[380px] sm:h-[440px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={
              about.bannerImage?.url ||
              "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1920&q=80"
            }
            alt="About Us Banner"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-950/60 to-transparent" />

          <div className="absolute inset-0 flex items-center">
            <div className="max-w-[1200px] mx-auto w-full px-6 lg:px-8 text-center sm:text-left">
              <span className="inline-block px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
                Crafting Unforgettable Journeys
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight max-w-2xl drop-shadow-2xl">
                {about.title || "About Travel2Dubai"}
              </h1>
              <p className="text-slate-300 text-base sm:text-lg mt-3 max-w-xl font-medium">
                {about.subtitle || "Crafting exceptional journeys and seamless travel experiences since 2018."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Statistics ── */}
      <section className="bg-slate-800/80 border-y border-slate-700/60 py-10">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {(about.stats && about.stats.length > 0
              ? about.stats
              : [
                  { label: "Happy Travelers", value: "50,000+" },
                  { label: "Tour Packages", value: "250+" },
                  { label: "Visas Approved", value: "99.8%" },
                  { label: "Destination Experts", value: "15+" },
                ]
            ).map((st, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-900/50 border border-slate-700/50 shadow-sm">
                <p className="text-3xl sm:text-4xl font-extrabold text-amber-400">{st.value}</p>
                <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">{st.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Company Story & Content ── */}
      <section className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              Our Journey &amp; Commitment to Excellence
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed whitespace-pre-line">
              {about.content ||
                "At Travel2Dubai, we specialize in curating bespoke travel packages, luxury desert safaris, corporate tours, and fast-track visa processing for Dubai and global destinations. Our dedicated team of travel experts ensures every detail of your trip is tailored to perfection."}
            </p>

            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {about.mission && (
                <div className="p-5 rounded-2xl bg-slate-800 border border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <Target className="w-5 h-5" /> Mission
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{about.mission}</p>
                </div>
              )}
              {about.vision && (
                <div className="p-5 rounded-2xl bg-slate-800 border border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 text-sky-400 font-bold">
                    <Eye className="w-5 h-5" /> Vision
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{about.vision}</p>
                </div>
              )}
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700/80 h-[380px] sm:h-[460px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                about.bannerImage?.url ||
                "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80"
              }
              alt="Dubai Tourism"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
