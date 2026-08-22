"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PackageCard } from "../cards/package";
import api from "@/lib/api";
import { PackageData } from "../packages";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight, ChevronRight, MapPin, Send, Clock } from "lucide-react";

interface FeaturedDestination {
  name: string;
  destination: string;
  rating: number;
  packages: number;
  image: string;
}

export const FeaturedPackages = () => {
  const [packageData, setPackageData] = useState<PackageData[]>([]);
  const [featuredDestinations, setFeaturedDestinations] = useState<FeaturedDestination[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<{ success: boolean; packages: PackageData[] }>("/packages");
        if (response.data.success && response.data.packages) {
          setPackageData(response.data.packages);
          
          // Generate featured destinations from packages
          const destinationMap = new Map<string, { count: number; image: string; rating: number }>();
          
          response.data.packages.forEach((pkg) => {
            const dest = pkg.location.destination;
            if (!destinationMap.has(dest)) {
              destinationMap.set(dest, {
                count: 0,
                image: pkg.images[0]?.url || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
                rating: pkg.rating || 4.5,
              });
            }
            const destData = destinationMap.get(dest)!;
            destData.count += 1;
            if (pkg.rating) {
              destData.rating = (destData.rating + pkg.rating) / 2; // Average rating
            }
          });
          
          // Convert to featured destinations array
          const featured: FeaturedDestination[] = Array.from(destinationMap.entries())
            .map(([destination, data]) => ({
              name: destination,
              destination: destination,
              rating: parseFloat(data.rating.toFixed(1)),
              packages: data.count,
              image: data.image,
            }))
            .sort((a, b) => b.packages - a.packages)
            .slice(0, 6); // Show top 6 destinations
          
          setFeaturedDestinations(featured);
        }
      } catch {
        // Silently fail - this is non-critical data
        setPackageData([]);
        setFeaturedDestinations([]);
      }
    };
    fetchData();
  }, []);

  const handlePackageClick = (id: string) => router.push(`/packages/${id}`);

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          SECTION 1 — Popular Destinations
      ══════════════════════════════════════════════════════ */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-white via-gray-50 to-white">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8">

          {/* Header */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="section-label-premium mb-3">🌍 Popular Destinations</p>
              <h2 className="heading-premium text-[32px] sm:text-[40px] text-gradient-premium mb-3">
                Where Do You Want to Go?
              </h2>
              <p className="text-slate-300 text-base mb-4">Discover our most sought-after destinations around the world</p>
              <div className="flex gap-2">
                <div className="w-12 h-1 bg-gradient-to-r from-[#2563EB] to-[#F59E0B] rounded-full" />
                <div className="w-8 h-1 bg-gradient-to-r from-[#F59E0B] to-[#7C3AED] rounded-full" />
              </div>
            </div>
            <Link
              href="/packages"
              className="hidden sm:flex items-center gap-2 text-[14px] font-semibold bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white px-5 py-2.5 rounded-full hover:shadow-premium-hover transition-all hover-lift-premium"
            >
              View all
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Destination Cards — horizontal landscape grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {featuredDestinations.map((dest, i) => (
              <Link
                key={dest.name}
                href={`/packages?state=${encodeURIComponent(dest.destination)}`}
                className="group relative rounded-[16px] overflow-hidden block"
                style={{ aspectRatio: "4/5" }}
              >
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  priority={i < 3}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />

                {/* Rating */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-slate-700/90 backdrop-blur-sm text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm text-[#111827]">
                  <Star className="h-2.5 w-2.5 fill-[#F59E0B] text-[#F59E0B]" />
                  {dest.rating}
                </div>

                {/* Name + count */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="font-bold text-white text-[14px] leading-tight">{dest.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin className="h-2.5 w-2.5 text-white/60" />
                    <p className="text-[11px] text-white/70">{dest.packages} packages</p>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#2563EB]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-slate-700 text-[#2563EB] text-[11px] font-bold px-3 py-1.5 rounded-full shadow-md">
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — Featured Packages
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8">

          {/* Header */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[11px] font-extrabold text-[#2563EB] uppercase tracking-widest mb-2">
                Our Packages
              </p>
              <h2 className="text-[28px] sm:text-[32px] font-extrabold text-[#111827] leading-tight">
                Featured Travel Packages
              </h2>
              <div className="w-12 h-1 bg-[#F59E0B] rounded-full mt-2.5" />
            </div>
            <Link
              href="/packages"
              className="hidden sm:flex items-center gap-1.5 text-[13px] font-semibold text-[#2563EB] border border-[#DBEAFE] hover:border-[#2563EB] hover:bg-blue-50 rounded-full px-4 py-2 transition-all duration-200"
            >
              View All
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Package grid — always visible, shows skeletons while loading */}
          {packageData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {packageData.slice(0, 8).map((pkg) => (
                <PackageCard
                  key={pkg._id}
                  pkg={pkg}
                  handlePackageClick={() => handlePackageClick(pkg._id)}
                />
              ))}
            </div>
          ) : (
            /* Skeleton placeholders while API loads */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-slate-700 rounded-[20px] overflow-hidden border border-slate-600 animate-pulse">
                  <div className="h-52 bg-slate-600" />
                  <div className="p-4 space-y-3">
                    <div className="h-3 bg-[#F3F4F6] rounded w-2/3" />
                    <div className="h-4 bg-[#F3F4F6] rounded w-full" />
                    <div className="h-3 bg-[#F3F4F6] rounded w-1/2" />
                    <div className="flex justify-between items-end pt-2 border-t border-[#F3F4F6]">
                      <div className="h-5 bg-[#F3F4F6] rounded w-1/3" />
                      <div className="h-8 bg-[#F3F4F6] rounded w-1/4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {packageData.length > 0 && (
            <div className="text-center mt-10">
              <Link
                href="/packages"
                className="inline-flex items-center gap-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold px-10 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 text-[15px]"
              >
                View All Packages
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — Trending Packages (horizontal scroll)
      ══════════════════════════════════════════════════════ */}
      {packageData.length > 0 && (
        <section className="py-16 bg-slate-800">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-8">

            {/* Header */}
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-[11px] font-extrabold text-[#EF4444] uppercase tracking-widest">
                    Trending Now
                  </p>
                  <span className="flex items-center gap-1 bg-[#7F1D1D] text-[#FCA5A5] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#DC2626]">
                    🔥 Hot
                  </span>
                </div>
                <h2 className="text-[28px] sm:text-[32px] font-extrabold text-slate-100 leading-tight">
                  Trending Packages
                </h2>
                <div className="w-12 h-1 bg-[#EF4444] rounded-full mt-2.5" />
              </div>
              <Link
                href="/packages"
                className="hidden sm:flex items-center gap-1.5 text-[13px] font-semibold text-[#2563EB] border border-blue-900/50 hover:border-[#2563EB] hover:bg-blue-900/20 rounded-full px-4 py-2 transition-all duration-200"
              >
                View All
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Horizontal scroll row */}
            <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2">
              {packageData.slice(0, 10).map((pkg, i) => {
                const discountedPrice = pkg.discount
                  ? Math.round(pkg.price * (1 - pkg.discount / 100))
                  : pkg.price;

                return (
                  <div
                    key={pkg._id}
                    onClick={() => handlePackageClick(pkg._id)}
                    className="group shrink-0 w-[260px] bg-slate-700 rounded-[18px] overflow-hidden border border-slate-600 shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  >
                    {/* Image */}
                    <div className="relative h-[160px] overflow-hidden">
                      <Image
                        src={pkg.images[0]?.url || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80"}
                        alt={pkg.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="260px"
                        priority={i < 4}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

                      {/* Rank badge */}
                      <div className="absolute top-2.5 left-2.5 w-7 h-7 bg-[#EF4444] rounded-full flex items-center justify-center shadow-md">
                        <span className="text-white text-[11px] font-extrabold">#{i + 1}</span>
                      </div>

                      {/* Discount */}
                      {pkg.discount > 0 && (
                        <div className="absolute top-2.5 right-2.5 bg-[#22C55E] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
                          {pkg.discount}% OFF
                        </div>
                      )}

                      {/* Location on image */}
                      <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-white/80" />
                        <span className="text-white text-[11px] font-medium truncate max-w-[180px]">
                          {pkg.location.destination}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-3.5">
                      <h3 className="font-bold text-slate-100 text-[13px] leading-snug mb-2 line-clamp-2">
                        {pkg.title}
                      </h3>

                      {/* Duration + meals */}
                      <div className="flex items-center gap-2 text-[11px] text-slate-300 mb-3">
                        <span className="flex items-center gap-1 text-slate-300">
                          <Clock className="h-3 w-3 text-amber-400" />
                          {pkg.duration.day}D / {pkg.duration.night}N
                        </span>
                        {pkg.inclusions?.includes("Breakfast") && (
                          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                            Breakfast
                          </span>
                        )}
                      </div>

                      {/* Price row */}
                      <div className="flex items-center justify-between pt-2.5 border-t border-slate-600">
                        <div>
                          {pkg.discount > 0 && (
                            <span className="text-[11px] text-slate-400 line-through block leading-none mb-0.5">
                              ₹{pkg.price.toLocaleString("en-IN")}
                            </span>
                          )}
                          <span className="text-[16px] font-extrabold text-white leading-none">
                            ₹{discountedPrice.toLocaleString("en-IN")}
                          </span>
                          <span className="text-[10px] text-slate-400 ml-0.5">/person</span>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); handlePackageClick(pkg._id); }}
                          className="text-[11px] font-bold text-[#2563EB] hover:text-white hover:bg-[#2563EB] border border-[#DBEAFE] hover:border-[#2563EB] px-3 py-1.5 rounded-full transition-all duration-200"
                        >
                          Book →
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scroll hint on mobile */}
            <p className="text-center text-[11px] text-[#9CA3AF] mt-3 sm:hidden">
              ← Scroll to see more →
            </p>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — Newsletter CTA Banner
      ══════════════════════════════════════════════════════ */}
      <section className="relative py-0 overflow-hidden">
        <div className="relative h-[280px] sm:h-[320px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Travel newsletter"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 60%" }}
          />
          <div className="absolute inset-0 bg-[#2563EB]/80" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-[1320px] mx-auto w-full px-6 lg:px-8">
              <div className="max-w-[580px]">
                <p className="text-blue-200 text-[11px] font-extrabold uppercase tracking-widest mb-2">
                  Stay Updated
                </p>
                <h2 className="text-white font-extrabold text-[26px] sm:text-[32px] leading-tight mb-2">
                  Get Exclusive Travel Deals
                </h2>
                <p className="text-blue-100 text-[14px] mb-6 leading-relaxed">
                  Subscribe and be the first to know about our best offers, new destinations, and travel tips.
                </p>
                <form className="flex gap-2.5 max-w-[440px]" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 min-w-0 px-4 py-3 rounded-[12px] bg-slate-700/15 border border-white/25 text-white placeholder-blue-200/70 text-[14px] focus:outline-none focus:border-white/60 focus:bg-slate-700/20 transition-all"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold px-5 py-3 rounded-[12px] text-[14px] transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shadow-md"
                  >
                    <Send className="h-4 w-4" />
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
