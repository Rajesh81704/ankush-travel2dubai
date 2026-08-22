"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { ArrowRight, MapPin, Calendar, Users, Search, Star, Shield, Clock } from "lucide-react";

export const Hero = () => {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination.trim()) params.set("search", destination.trim());
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    params.set("adults", String(adults));
    params.set("children", String(children));
    router.push(`/packages?${params.toString()}`);
  }, [destination, checkIn, checkOut, adults, children, router]);

  return (
    <section className="relative">
      {/* ── Full-screen Hero Image ── */}
      <div className="relative h-[88vh] min-h-[620px] max-h-[860px] overflow-hidden pt-[68px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/bg-image/image.png"
          alt="Travel destination"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 35%" }}
        />

        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/50" />

        {/* ── Hero Content ── */}
        <div className="absolute inset-0 flex flex-col justify-center pt-[68px] pb-20">
          <div className="max-w-[1320px] mx-auto w-full px-6 lg:px-16">
            <div className="max-w-[600px]">


              <h1
                className="font-extrabold text-white leading-[1.1] tracking-tight drop-shadow-2xl mb-4 heading-premium"
                style={{ fontSize: "clamp(2.2rem, 4.8vw, 3.5rem)" }}
              >
                Explore The World <br />
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent italic" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)" }}>
                  With Legendary Live Journeys
                </span>
              </h1>

              <p className="text-white/85 text-[15px] sm:text-[17px] leading-relaxed font-normal mb-7 max-w-[480px]">
                Handcrafted premium holiday packages, flight reservations, luxury stays, and fast-track global visa services.
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-8">
                <Link
                  href="/packages"
                  className="inline-flex items-center gap-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold px-7 py-3 rounded-full shadow-[0_8px_24px_rgba(245,158,11,0.4)] hover:shadow-[0_12px_32px_rgba(245,158,11,0.5)] transition-all duration-300 hover:-translate-y-0.5 text-[14px]"
                >
                  Explore Packages
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-slate-700/12 hover:bg-slate-700/20 text-white font-semibold px-6 py-3 rounded-full border border-white/30 backdrop-blur-sm transition-all duration-300 text-[14px]"
                >
                  Talk to Expert
                </Link>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {[
                  { icon: Shield, text: "Best Price Guarantee" },
                  { icon: Star, text: "4.8★ Rated" },
                  { icon: Clock, text: "24/7 Support" },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-1.5 bg-slate-700/10 backdrop-blur-sm border border-white/15 text-white/80 text-[11px] font-medium px-3 py-1.5 rounded-full"
                  >
                    <Icon className="h-3 w-3 text-[#F59E0B]" />
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/75 to-transparent">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-16 pb-8 pt-10">
            <div className="flex flex-wrap gap-6 sm:gap-10">
              {[
                { value: "500+", label: "Packages" },
                { value: "50K+", label: "Happy Travelers" },
                { value: "100+", label: "Destinations" },
                { value: "15+", label: "Years Experience" },
              ].map((s) => (
                <div key={s.label} className="flex items-baseline gap-1.5">
                  <div className="text-white font-extrabold text-[20px] leading-none">{s.value}</div>
                  <div className="text-white/55 text-[12px] font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Floating Search Bar ── */}
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 mt-[-28px] relative z-20 pb-10">
        <form
          onSubmit={handleSearch}
          className="bg-slate-700 rounded-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.16)] px-3 sm:px-4 py-4 border border-slate-600"
        >
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0">

            {/* Destination input */}
            <div className="flex items-center gap-2.5 flex-1 sm:px-3 py-1 min-w-0">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <MapPin className="h-[15px] w-[15px] text-[#2563EB]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider leading-none mb-0.5">Where to?</p>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Search destinations, packages..."
                  className="w-full text-[13px] text-[#374151] font-medium placeholder-[#9CA3AF] outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="hidden sm:block w-px h-8 bg-[#F3F4F6] shrink-0" />

            {/* Check In */}
            <div className="flex items-center gap-2.5 flex-1 sm:px-3 py-1">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Calendar className="h-[15px] w-[15px] text-[#2563EB]" />
              </div>
              <div className="flex-1">
                <p className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider leading-none mb-0.5">Check In</p>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full text-[13px] text-[#374151] font-medium outline-none bg-transparent cursor-pointer"
                />
              </div>
            </div>

            <div className="hidden sm:block w-px h-8 bg-[#F3F4F6] shrink-0" />

            {/* Check Out */}
            <div className="flex items-center gap-2.5 flex-1 sm:px-3 py-1">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Calendar className="h-[15px] w-[15px] text-[#2563EB]" />
              </div>
              <div className="flex-1">
                <p className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider leading-none mb-0.5">Check Out</p>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn}
                  className="w-full text-[13px] text-[#374151] font-medium outline-none bg-transparent cursor-pointer"
                />
              </div>
            </div>

            <div className="hidden sm:block w-px h-8 bg-[#F3F4F6] shrink-0" />

            {/* Travelers */}
            <div className="flex items-center gap-2.5 flex-1 sm:px-3 py-1">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Users className="h-[15px] w-[15px] text-[#2563EB]" />
              </div>
              <div className="flex-1">
                <p className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider leading-none mb-0.5">Travelers</p>
                <div className="flex items-center gap-2">
                  {/* Adults */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setAdults((a) => Math.max(1, a - 1))}
                      className="w-5 h-5 rounded-full bg-slate-600 hover:bg-slate-500 text-slate-300 text-[12px] font-bold flex items-center justify-center transition-colors"
                    >−</button>
                    <span className="text-[13px] text-[#374151] font-medium w-4 text-center">{adults}</span>
                    <button
                      type="button"
                      onClick={() => setAdults((a) => a + 1)}
                      className="w-5 h-5 rounded-full bg-slate-600 hover:bg-slate-500 text-slate-300 text-[12px] font-bold flex items-center justify-center transition-colors"
                    >+</button>
                    <span className="text-[11px] text-[#9CA3AF]">Adults</span>
                  </div>
                  <span className="text-[#D1D5DB]">·</span>
                  {/* Children */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setChildren((c) => Math.max(0, c - 1))}
                      className="w-5 h-5 rounded-full bg-slate-600 hover:bg-slate-500 text-slate-300 text-[12px] font-bold flex items-center justify-center transition-colors"
                    >−</button>
                    <span className="text-[13px] text-[#374151] font-medium w-4 text-center">{children}</span>
                    <button
                      type="button"
                      onClick={() => setChildren((c) => c + 1)}
                      className="w-5 h-5 rounded-full bg-slate-600 hover:bg-slate-500 text-slate-300 text-[12px] font-bold flex items-center justify-center transition-colors"
                    >+</button>
                    <span className="text-[11px] text-[#9CA3AF]">Kids</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="sm:ml-2.5 shrink-0">
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold px-6 py-2.5 rounded-[11px] text-[13px] shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 w-full sm:w-auto whitespace-nowrap"
              >
                <Search className="h-3.5 w-3.5" />
                Search Packages
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
