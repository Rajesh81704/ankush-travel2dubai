import { Button } from "@/components/ui/button";
import { Clock, Heart, MapPin, Phone, Share2, Star } from "lucide-react";

interface PackageHeaderProps {
  title: string;
  location: string;
  duration: string;
  rating: number;
  reviews: number;
  features: string[];
  discount: string;
}

export function PackageHeader({
  title,
  location,
  duration,
  rating,
  reviews,
  features,
  discount,
}: PackageHeaderProps) {
  return (
    <div className="bg-white rounded-[20px] p-5 sm:p-7 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-[#E5E7EB]">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
        <div className="flex-1 min-w-0">
          {/* Breadcrumb-style location */}
          <div className="flex items-center gap-1.5 text-[12px] text-[#9CA3AF] mb-3">
            <MapPin className="h-3.5 w-3.5 text-[#F59E0B] shrink-0" />
            <span className="font-medium text-[#374151]">{location}</span>
          </div>

          {/* Title */}
          <h1 className="text-[22px] sm:text-[28px] lg:text-[32px] font-extrabold text-[#111827] leading-tight mb-4">
            {title}
          </h1>

          {/* Meta chips */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5 bg-[#F8FAFC] border border-[#E5E7EB] px-3 py-1.5 rounded-full text-[13px]">
              <MapPin className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
              <span className="font-medium text-[#374151] truncate">{location}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#F8FAFC] border border-[#E5E7EB] px-3 py-1.5 rounded-full text-[13px]">
              <Clock className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
              <span className="font-medium text-[#374151]">{duration}</span>
            </div>
            {rating > 0 && (
              <div className="flex items-center gap-1.5 bg-[#FFFBEB] border border-[#FDE68A] px-3 py-1.5 rounded-full text-[13px]">
                <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B] shrink-0" />
                <span className="font-bold text-[#92400E]">{rating}</span>
                <span className="text-[#B45309]">({reviews} reviews)</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="outline"
            size="icon"
            className="w-10 h-10 rounded-full border-[#E5E7EB] hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all duration-200"
            aria-label="Add to wishlist"
          >
            <Heart className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="w-10 h-10 rounded-full border-[#E5E7EB] hover:bg-blue-50 hover:border-blue-200 hover:text-[#2563EB] transition-all duration-200"
            aria-label="Share"
          >
            <Share2 className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="w-10 h-10 rounded-full border-[#E5E7EB] hover:bg-green-50 hover:border-green-200 hover:text-[#22C55E] transition-all duration-200"
            aria-label="Call"
          >
            <Phone className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Feature badges */}
      <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-[#E5E7EB]">
        {features.map((feature, index) => (
          <span
            key={index}
            className="text-[12px] font-semibold px-3 py-1.5 bg-blue-50 text-[#2563EB] border border-[#DBEAFE] rounded-full"
          >
            {feature}
          </span>
        ))}
        <span className="text-[12px] font-bold px-3 py-1.5 bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] rounded-full">
          🏷️ {discount}
        </span>
      </div>
    </div>
  );
}
