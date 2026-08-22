import { Clock, Heart, MapPin, Star, Building2, Plane, UtensilsCrossed, Camera, Car, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PackageData } from "@/components/packages/types";

interface PackageCardProps {
  pkg: PackageData;
  handlePackageClick: () => void;
}

export const PackageCard = ({ pkg, handlePackageClick }: PackageCardProps) => {
  const discountedPrice = pkg.discount
    ? Math.round(pkg.price * (1 - pkg.discount / 100))
    : pkg.price;

  const category = pkg.category || pkg.features?.[0] || "";

  return (
    <div
      className="group bg-slate-800/90 rounded-2xl overflow-hidden border border-slate-700/80 shadow-lg hover:shadow-2xl hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col"
      onClick={handlePackageClick}
    >
      {/* Cover Image */}
      <div className="relative h-56 overflow-hidden shrink-0">
        <Image
          fill
          src={
            pkg.images[0]?.url ||
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80"
          }
          alt={pkg.title}
          className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

        {/* Category badge */}
        {category && (
          <div className="absolute top-3 left-3">
            <span className="bg-slate-900/80 backdrop-blur-md text-amber-400 border border-amber-500/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              {category}
            </span>
          </div>
        )}

        {/* Discount badge */}
        {pkg.discount > 0 && (
          <div className="absolute top-3 right-12">
            <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
              {pkg.discount}% OFF
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          className="absolute top-3 right-3 w-8 h-8 bg-slate-900/70 hover:bg-slate-800 backdrop-blur-md text-slate-300 hover:text-rose-400 rounded-full flex items-center justify-center border border-white/10 transition-all duration-200 hover:scale-110"
          onClick={(e) => e.stopPropagation()}
          aria-label="Save to wishlist"
        >
          <Heart className="h-3.5 w-3.5 text-slate-300 hover:text-rose-400 transition-colors" />
        </button>

        {/* Duration badge — bottom left */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full border border-white/10 shadow-sm">
          <Clock className="h-3.5 w-3.5 text-amber-400" />
          {pkg.duration.day}D / {pkg.duration.night}N
        </div>

        {/* Rating — bottom right */}
        {pkg.reviews && pkg.reviews.length > 0 && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full border border-white/10">
            <Star className="h-3 w-3 fill-[#F59E0B] text-[#F59E0B]" />
            {pkg.reviews.length}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Location */}
        <div className="flex items-center gap-1.5 text-amber-400 text-[11.5px] font-semibold mb-1.5">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-amber-400" />
          <span className="truncate">{pkg.location.destination}, {pkg.location.state}</span>
        </div>

        {/* Title */}
        <h3 className="font-extrabold text-white text-[15.5px] leading-snug line-clamp-2 mb-2.5 group-hover:text-amber-300 transition-colors">
          {pkg.title}
        </h3>

        {/* Sleek Inclusions Strip (Vector Lucide Icons) */}
        <div className="flex items-center gap-3 py-2 px-3 mb-3 bg-slate-900/70 backdrop-blur-md rounded-xl border border-slate-700/60 text-[11px] text-slate-300 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 text-slate-200 shrink-0" title="Hotel included">
            <Building2 className="h-3.5 w-3.5 text-amber-400" />
            <span className="font-medium text-[11px]">Hotel</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-slate-600 shrink-0" />
          <div className="flex items-center gap-1.5 text-slate-200 shrink-0" title="Flight included">
            <Plane className="h-3.5 w-3.5 text-sky-400" />
            <span className="font-medium text-[11px]">Flight</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-slate-600 shrink-0" />
          <div className="flex items-center gap-1.5 text-slate-200 shrink-0" title="Meals included">
            <UtensilsCrossed className="h-3.5 w-3.5 text-emerald-400" />
            <span className="font-medium text-[11px]">Meals</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-slate-600 shrink-0" />
          <div className="flex items-center gap-1.5 text-slate-200 shrink-0" title="Sightseeing included">
            <Camera className="h-3.5 w-3.5 text-purple-400" />
            <span className="font-medium text-[11px]">Tours</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-slate-600 shrink-0" />
          <div className="flex items-center gap-1.5 text-slate-200 shrink-0" title="Transfers included">
            <Car className="h-3.5 w-3.5 text-orange-400" />
            <span className="font-medium text-[11px]">Transfer</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-[12.5px] text-slate-400 line-clamp-2 leading-relaxed mb-4 break-words">
          {pkg.description}
        </p>

        {/* Price + CTA */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-700/80 mt-auto">
          <div className="min-w-0 flex-1">
            {pkg.discount > 0 && pkg.price > 0 && (
              <p className="text-[11px] text-slate-500 line-through leading-none mb-0.5 truncate">
                ₹{pkg.price.toLocaleString("en-IN")}
              </p>
            )}
            <div className="flex items-baseline gap-1 flex-wrap">
              <span className="text-[19px] font-black text-white truncate">
                {discountedPrice > 0 ? `₹${discountedPrice.toLocaleString("en-IN")}` : "Contact Us"}
              </span>
              {discountedPrice > 0 && (
                <span className="text-[11px] text-slate-400 font-normal shrink-0">/ person</span>
              )}
            </div>
          </div>

          <Link
            href={`/packages/${pkg._id}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-[12.5px] font-bold px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-px shrink-0"
          >
            View Details
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
