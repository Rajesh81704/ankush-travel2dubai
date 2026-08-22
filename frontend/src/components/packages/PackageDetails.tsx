"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, MapPin, Plane, Building2, Star, Camera } from "lucide-react";
import type { FlightOption, HotelOption, ItineraryDay, SightseeingOption } from "./types";
import ReviewSection from "./ReviewSection";

interface PackageDetailsProps {
  description: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  rating: number;
  reviews: number;
  packageId: string;
  flights?: FlightOption[];
  hotels?: HotelOption[];
  sightseeings?: SightseeingOption[];
}

/* ─── Star Rating ────────────────────────────────────────────── */
function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < count ? "fill-[#F59E0B] text-[#F59E0B]" : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

/* ─── Hotels Section ─────────────────────────────────────────── */
function HotelsSection({ hotels }: { hotels: HotelOption[] }) {
  // Build unique location tabs from hotels
  const locations = Array.from(
    new Map(
      hotels.map((h) => [
        h.location,
        { location: h.location, nights: h.nights },
      ])
    ).values()
  );

  const [activeLocation, setActiveLocation] = useState("all");

  const filtered =
    activeLocation === "all"
      ? hotels
      : hotels.filter((h) => h.location === activeLocation);

  return (
    <div>
      {/* Section header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#EFF6FF] flex items-center justify-center shrink-0">
            <Building2 className="w-4.5 h-4.5 text-[#2563EB]" />
          </div>
          <h3 className="text-[18px] font-bold text-[#111827]">
            Accommodations & Hotels ({hotels.length})
          </h3>
        </div>
      </div>

      {/* Location filter tabs */}
      {locations.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-5">
          <button
            onClick={() => setActiveLocation("all")}
            className={`px-4 py-2 rounded-full text-[13px] font-semibold border transition-all ${
              activeLocation === "all"
                ? "bg-[#B91C1C] text-white border-[#B91C1C]"
                : "bg-white text-[#374151] border-[#D1D5DB] hover:border-[#B91C1C] hover:text-[#B91C1C]"
            }`}
          >
            All Hotels ({hotels.length})
          </button>
          {locations.map((loc) => (
            <button
              key={loc.location}
              onClick={() => setActiveLocation(loc.location)}
              className={`px-4 py-2 rounded-full text-[13px] font-semibold border transition-all ${
                activeLocation === loc.location
                  ? "bg-[#B91C1C] text-white border-[#B91C1C]"
                  : "bg-white text-[#374151] border-[#D1D5DB] hover:border-[#B91C1C] hover:text-[#B91C1C]"
              }`}
            >
              {loc.location} ({loc.nights}N)
            </button>
          ))}
        </div>
      )}

      {/* Hotel cards */}
      <div className="space-y-4">
        {filtered.map((hotel, i) => (
          <HotelCard key={hotel._id ?? i} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}

function HotelCard({ hotel }: { hotel: HotelOption }) {
  const [expanded, setExpanded] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  // Support both single image and multiple images
  const images = hotel.images && hotel.images.length > 0 
    ? hotel.images 
    : hotel.image ? [hotel.image] : [];

  const currentImage = images[imageIndex];

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-[14px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="flex gap-0">
        {/* Left: image carousel */}
        <div className="w-[160px] sm:w-[200px] shrink-0 relative">
          {currentImage?.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={currentImage.url}
              alt={hotel.hotelName}
              className="w-full h-full object-cover min-h-[130px]"
            />
          ) : (
            <div className="w-full h-full min-h-[130px] bg-[#F3F4F6] flex items-center justify-center">
              <Building2 className="w-10 h-10 text-[#D1D5DB]" />
            </div>
          )}
          
          {/* Image carousel dots */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImageIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === imageIndex ? "bg-white w-3" : "bg-white/60"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right: content */}
        <div className="flex-1 p-4 flex flex-col justify-between gap-3">
          <div>
            <p className="text-[15px] font-bold text-[#111827] leading-snug">
              {hotel.hotelName}{" "}
              <span className="font-normal italic text-[#6B7280] text-[13px]">
                or similar
              </span>
            </p>

            <div className="flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" />
              <span className="text-[12px] text-[#6B7280]">{hotel.location}</span>
            </div>

            {hotel.starRating != null && (
              <div className="mt-1.5">
                <StarRating count={hotel.starRating} />
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-[11px] font-medium text-[#374151] bg-[#F8FAFC] border border-[#E5E7EB] rounded-full px-2.5 py-1">
                {hotel.nights} {hotel.nights === 1 ? "Night" : "Nights"}
              </span>
              <span className="text-[11px] font-medium text-[#374151] bg-[#F8FAFC] border border-[#E5E7EB] rounded-full px-2.5 py-1">
                {hotel.roomType}
              </span>
              {images.length > 1 && (
                <span className="text-[11px] font-medium text-[#374151] bg-[#F8FAFC] border border-[#E5E7EB] rounded-full px-2.5 py-1">
                  {images.length} photos
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => setExpanded((v) => !v)}
            className="self-start bg-[#B91C1C] hover:bg-[#991B1B] text-white text-[13px] font-bold px-5 py-2 rounded-[8px] transition-colors"
          >
            {expanded ? "Hide Details" : "View Details"}
          </button>
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-[#E5E7EB] px-5 py-4 bg-[#FAFAFA] space-y-3">
          {/* Image gallery for all images */}
          {images.length > 1 && (
            <div>
              <p className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wide mb-2">
                Hotel Photos ({imageIndex + 1} of {images.length})
              </p>
              <div className="grid grid-cols-3 gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImageIndex(i)}
                    className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                      i === imageIndex ? "border-[#B91C1C]" : "border-[#E5E7EB] hover:border-[#B91C1C]"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.url}
                      alt=""
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {hotel.description && (
            <p className="text-[13px] text-[#374151] leading-relaxed">{hotel.description}</p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[12px]">
            {hotel.checkInDate && (
              <div className="bg-white border border-[#E5E7EB] rounded-[8px] p-2">
                <p className="text-[10px] text-[#9CA3AF] font-medium uppercase tracking-wide mb-0.5">
                  Check-in
                </p>
                <p className="font-semibold text-[#111827]">{hotel.checkInDate}</p>
              </div>
            )}
            {hotel.checkOutDate && (
              <div className="bg-white border border-[#E5E7EB] rounded-[8px] p-2">
                <p className="text-[10px] text-[#9CA3AF] font-medium uppercase tracking-wide mb-0.5">
                  Check-out
                </p>
                <p className="font-semibold text-[#111827]">{hotel.checkOutDate}</p>
              </div>
            )}
            <div className="bg-white border border-[#E5E7EB] rounded-[8px] p-2">
              <p className="text-[10px] text-[#9CA3AF] font-medium uppercase tracking-wide mb-0.5">
                Price/Night
              </p>
              <p className="font-semibold text-[#111827]">
                ₹{hotel.price.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          {hotel.amenities && hotel.amenities.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wide mb-2">
                Amenities
              </p>
              <div className="flex flex-wrap gap-2">
                {hotel.amenities.map((a, j) => (
                  <span
                    key={j}
                    className="text-[12px] text-[#374151] bg-white border border-[#E5E7EB] rounded-full px-3 py-1"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Flights Section ────────────────────────────────────────── */
function FlightsSection({ flights }: { flights: FlightOption[] }) {
  const [activeType, setActiveType] = useState<"main" | "internal">("main");

  const mainFlights = flights.filter((f) => f.type === "main");
  const internalFlights = flights.filter((f) => f.type === "internal");
  const hasMain = mainFlights.length > 0;
  const hasInternal = internalFlights.length > 0;

  // Auto-select first available type
  const effectiveType =
    activeType === "main" && !hasMain && hasInternal
      ? "internal"
      : activeType === "internal" && !hasInternal && hasMain
      ? "main"
      : activeType;

  const displayed = effectiveType === "main" ? mainFlights : internalFlights;

  return (
    <div>
      {/* Section header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-full bg-[#EFF6FF] flex items-center justify-center shrink-0">
          <Plane className="w-4.5 h-4.5 text-[#2563EB]" />
        </div>
        <h3 className="text-[18px] font-bold text-[#111827]">Flights</h3>
      </div>

      {/* Type toggle tabs */}
      {hasMain && hasInternal && (
        <div className="flex gap-2 mb-5">
          {(["main", "internal"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-5 py-2 rounded-full text-[13px] font-semibold border transition-all ${
                effectiveType === type
                  ? "bg-[#B91C1C] text-white border-[#B91C1C]"
                  : "bg-white text-[#374151] border-[#D1D5DB] hover:border-[#B91C1C] hover:text-[#B91C1C]"
              }`}
            >
              {type === "main" ? "Main Flight" : "Internal Flight"}
            </button>
          ))}
        </div>
      )}

      {/* Flight cards — group into Onwards / Return pairs */}
      <FlightList flights={displayed} />
    </div>
  );
}

function FlightList({ flights }: { flights: FlightOption[] }) {
  // Simple heuristic: if 2 flights exist, first = Onwards, second = Return
  const labels =
    flights.length === 2 ? ["Onwards", "Return"] : flights.map((_, i) => `Flight ${i + 1}`);

  return (
    <div className="space-y-4">
      {flights.map((flight, i) => (
        <div key={flight._id ?? i}>
          <p className="text-[13px] font-semibold text-[#374151] mb-2">{labels[i]}</p>
          <FlightCard flight={flight} />
        </div>
      ))}
    </div>
  );
}

/* ─── Sightseeings Section ──────────────────────────────────── */
function SightseeingsSection({ sightseeings }: { sightseeings: SightseeingOption[] }) {
  return (
    <div>
      {/* Section header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-full bg-[#FEF3C7] flex items-center justify-center shrink-0">
          <Camera className="w-4.5 h-4.5 text-[#F59E0B]" />
        </div>
        <h3 className="text-[18px] font-bold text-[#111827]">Sightseeings</h3>
      </div>

      {/* Sightseeing cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sightseeings.map((sight, i) => (
          <SightseeingCard key={sight._id ?? i} sightseeing={sight} />
        ))}
      </div>
    </div>
  );
}

function SightseeingCard({ sightseeing }: { sightseeing: SightseeingOption }) {
  const [imageIndex, setImageIndex] = useState(0);
  const images = sightseeing.images ?? [];
  const currentImage = images[imageIndex];

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-[14px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image section */}
      {images.length > 0 ? (
        <div className="relative w-full h-48 bg-[#F3F4F6]">
          {currentImage?.url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={currentImage.url}
              alt={sightseeing.name}
              className="w-full h-full object-cover"
            />
          )}

          {/* Image carousel dots */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImageIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === imageIndex ? "bg-white w-3" : "bg-white/60"
                  }`}
                  title={`Image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-48 bg-[#F3F4F6] flex items-center justify-center">
          <Camera className="w-12 h-12 text-[#D1D5DB]" />
        </div>
      )}

      {/* Content section */}
      <div className="p-4">
        <h4 className="text-[15px] font-bold text-[#111827] mb-1.5">{sightseeing.name}</h4>

        {sightseeing.location && (
          <div className="flex items-center gap-1.5 mb-2">
            <MapPin className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" />
            <span className="text-[12px] text-[#6B7280]">{sightseeing.location}</span>
          </div>
        )}

        {sightseeing.description && (
          <p className="text-[13px] text-[#6B7280] leading-relaxed mb-3 line-clamp-2">
            {sightseeing.description}
          </p>
        )}

        {sightseeing.duration && (
          <div className="inline-block text-[11px] font-medium text-[#374151] bg-[#F8FAFC] border border-[#E5E7EB] rounded-full px-3 py-1">
            ⏱️ {sightseeing.duration}
          </div>
        )}

        {images.length > 1 && (
          <div className="mt-3 pt-3 border-t border-[#E5E7EB]">
            <p className="text-[11px] text-[#9CA3AF] font-medium mb-2">
              {imageIndex + 1} of {images.length} photos
            </p>
            <div className="grid grid-cols-4 gap-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImageIndex(i)}
                  className={`relative overflow-hidden rounded border-2 transition-all ${
                    i === imageIndex ? "border-[#F59E0B]" : "border-[#E5E7EB] hover:border-[#F59E0B]"
                  }`}
                  title={`Image ${i + 1}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt=""
                    className="w-full h-12 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FlightCard({ flight }: { flight: FlightOption }) {
  const classLabel: Record<string, string> = {
    economy: "Economy",
    business: "Business",
    first: "First Class",
  };

  return (
    <div className="bg-[#1a3560] rounded-[14px] overflow-hidden text-white">
      <div className="flex items-stretch">
        {/* Left: departure + route + arrival */}
        <div className="flex-1 p-4 sm:p-5 flex items-center gap-2 sm:gap-4 min-w-0">
          {/* Departure */}
          <div className="min-w-[95px] sm:min-w-[110px]">
            <p className="text-[20px] sm:text-[22px] font-extrabold text-[#38BDF8] leading-none">
              {flight.departureTime}
              <span className="text-[12px] font-semibold text-[#94A3B8] ml-1">
                ({flight.departureAirport.match(/\(([^)]+)\)/)?.[1] ?? flight.departureAirport.slice(0, 3).toUpperCase()})
              </span>
            </p>
            <p className="text-[11px] text-[#CBD5E1] mt-1 leading-snug">
              {flight.departureCity}
              {flight.departureAirport && ` - ${flight.departureAirport}`}
            </p>
            <p className="text-[11px] text-[#94A3B8] mt-1">{flight.departureDate}</p>
          </div>

          {/* Dotted route line */}
          <div className="flex-1 flex items-center gap-1 min-w-[40px]">
            <div className="w-2 h-2 rounded-full bg-white shrink-0" />
            <div
              className="flex-1 border-t-2 border-dashed border-[#475569]"
              style={{ borderSpacing: "6px" }}
            />
            <div className="w-2 h-2 rounded-full bg-white shrink-0" />
          </div>

          {/* Arrival */}
          <div className="min-w-[95px] sm:min-w-[110px] text-right">
            <p className="text-[20px] sm:text-[22px] font-extrabold text-[#38BDF8] leading-none">
              {flight.arrivalTime}
              <span className="text-[12px] font-semibold text-[#94A3B8] ml-1">
                ({flight.arrivalAirport.match(/\(([^)]+)\)/)?.[1] ?? flight.arrivalAirport.slice(0, 3).toUpperCase()})
              </span>
            </p>
            <p className="text-[11px] text-[#CBD5E1] mt-1 leading-snug">
              {flight.arrivalCity}
              {flight.arrivalAirport && ` - ${flight.arrivalAirport}`}
            </p>
            <p className="text-[11px] text-[#94A3B8] mt-1">{flight.arrivalDate}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px bg-[#2d4a7a] self-stretch" />

        {/* Right: airline info */}
        <div className="w-[130px] sm:w-[160px] shrink-0 p-4 sm:p-5 flex flex-col justify-center gap-2">
          {flight.image?.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={flight.image.url}
              alt={flight.airline}
              className="h-7 w-auto object-contain max-w-[80px]"
            />
          ) : (
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded bg-[#2d4a7a] flex items-center justify-center">
                <Plane className="w-3.5 h-3.5 text-[#38BDF8]" />
              </div>
            </div>
          )}
          <div>
            <p className="text-[13px] font-bold text-white leading-tight">{flight.airline}</p>
            <p className="text-[12px] text-[#94A3B8]">{flight.flightNumber}</p>
            <p className="text-[11px] text-[#94A3B8] mt-1">
              Class{" "}
              <span className="text-white font-semibold">
                {classLabel[flight.class] ?? flight.class}
              </span>
            </p>
          </div>
        </div>

        {/* Plane icon corner */}
        <div className="pr-4 pt-4 shrink-0 self-start">
          <Plane className="w-4 h-4 text-[#475569] rotate-0" />
        </div>
      </div>

      {/* Duration bar */}
      <div className="bg-[#152a4e] px-5 py-2 flex items-center gap-2 text-[11px] text-[#94A3B8]">
        <span className="font-medium text-[#CBD5E1]">Duration:</span>
        <span>{flight.duration}</span>
        {flight.description && (
          <>
            <span className="text-[#2d4a7a]">•</span>
            <span className="truncate">{flight.description}</span>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */
export function PackageDetails({
  description,
  highlights,
  itinerary,
  inclusions,
  exclusions,
  packageId,
  flights = [],
  hotels = [],
  sightseeings = [],
}: PackageDetailsProps) {
  const hasFlights = flights.length > 0;
  const hasHotels = hotels.length > 0;
  const hasSightseeings = sightseeings.length > 0;

  const tabs = [
    { value: "overview", label: "Overview" },
    { value: "itinerary", label: "Itinerary" },
    { value: "inclusions", label: "Inclusions" },
    ...(hasFlights ? [{ value: "flights", label: "Flights" }] : []),
    ...(hasHotels ? [{ value: "hotels", label: "Hotels" }] : []),
    ...(hasSightseeings ? [{ value: "sightseeings", label: "Sightseeings" }] : []),
    { value: "reviews", label: "Reviews" },
  ];

  return (
    <div className="bg-white rounded-[20px] border border-[#E5E7EB] shadow-[0_10px_30px_rgba(0,0,0,0.07)] overflow-hidden">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full bg-[#F8FAFC] rounded-none border-b border-[#E5E7EB] h-auto p-0 overflow-x-auto flex">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex-1 py-3.5 rounded-none text-[13px] font-medium text-[#6B7280] capitalize border-b-2 border-transparent data-[state=active]:border-[#2563EB] data-[state=active]:text-[#2563EB] data-[state=active]:bg-white data-[state=active]:shadow-none transition-all whitespace-nowrap px-4"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ── Overview ── */}
        <TabsContent value="overview" className="p-6 space-y-6">
          <div>
            <h3 className="text-[16px] font-bold text-[#111827] mb-3">About This Package</h3>
            <p className="text-[14px] text-[#374151] leading-relaxed">{description}</p>
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-[#111827] mb-3">Highlights</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {highlights.map((highlight, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-[12px] px-3.5 py-2.5"
                >
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#2563EB]" />
                  </div>
                  <span className="text-[13px] text-[#374151] font-medium">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>

        {/* ── Itinerary ── */}
        <TabsContent value="itinerary" className="p-6">
          <h3 className="text-[16px] font-bold text-[#111827] mb-5 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#F59E0B]" />
            Day-by-Day Itinerary & Sightseeings
          </h3>
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-[#E5E7EB]" />
            <div className="space-y-5">
              {itinerary.map((day, i) => {
                // Find matching sightseeings for this day's title or description
                const matchedSightseeings = sightseeings.filter((s) =>
                  s.name && (
                    day.title?.toLowerCase().includes(s.name.toLowerCase()) ||
                    day.description?.toLowerCase().includes(s.name.toLowerCase())
                  )
                );

                return (
                  <div key={i} className="relative ml-12">
                    <div className="absolute -left-[2.1rem] top-1 w-8 h-8 bg-[#2563EB] rounded-full flex items-center justify-center shadow-sm shrink-0">
                      <span className="text-white font-bold text-[11px]">{day.day}</span>
                    </div>
                    <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-[14px] p-5 hover:shadow-md transition-all">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <h4 className="font-bold text-[#111827] text-[15px]">{day.title}</h4>
                        {day.city && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
                            📍 {day.city}
                          </span>
                        )}
                      </div>

                      <p className="text-[13.5px] text-[#4B5563] leading-relaxed mb-3">{day.description}</p>

                      {/* Hotel info for this day */}
                      {day.hotelName && (
                        <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center gap-2 text-xs font-semibold text-slate-700">
                          <Building2 className="w-4 h-4 text-amber-500" />
                          <span>Hotel Option: <span className="text-blue-600 font-bold">{day.hotelName}</span></span>
                        </div>
                      )}

                      {/* Matched Sightseeing Photos */}
                      {matchedSightseeings.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-slate-200/80">
                          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                            <Camera className="w-3.5 h-3.5 text-amber-500" /> Sightseeing Highlights:
                          </p>
                          <div className="flex flex-wrap gap-3">
                            {matchedSightseeings.map((s, idx) => (
                              <div key={idx} className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl p-1.5 shadow-xs">
                                {s.images?.[0]?.url && (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img src={s.images[0].url} alt={s.name} className="w-12 h-12 object-cover rounded-lg" />
                                )}
                                <div className="pr-2">
                                  <p className="text-xs font-bold text-slate-800">{s.name}</p>
                                  {s.duration && <p className="text-[10px] text-slate-500">⏱️ {s.duration}</p>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </TabsContent>

        {/* ── Inclusions ── */}
        <TabsContent value="inclusions" className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
              <h3 className="text-[15px] font-bold text-[#16A34A] mb-3 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                </div>
                Inclusions
              </h3>
              <ul className="space-y-2">
                {inclusions.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 bg-green-50 border border-green-100 rounded-[10px] px-3 py-2.5"
                  >
                    <Check className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                    <span className="text-[13px] text-[#374151]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-[#DC2626] mb-3 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                  <X className="w-3.5 h-3.5 text-[#DC2626]" />
                </div>
                Exclusions
              </h3>
              <ul className="space-y-2">
                {exclusions.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 bg-red-50 border border-red-100 rounded-[10px] px-3 py-2.5"
                  >
                    <X className="w-3.5 h-3.5 text-[#DC2626] shrink-0 mt-0.5" />
                    <span className="text-[13px] text-[#374151]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </TabsContent>

        {/* ── Flights ── */}
        {hasFlights && (
          <TabsContent value="flights" className="p-6">
            <FlightsSection flights={flights} />
          </TabsContent>
        )}

        {/* ── Hotels ── */}
        {hasHotels && (
          <TabsContent value="hotels" className="p-6">
            <HotelsSection hotels={hotels} />
          </TabsContent>
        )}

        {/* ── Sightseeings ── */}
        {hasSightseeings && (
          <TabsContent value="sightseeings" className="p-6">
            <SightseeingsSection sightseeings={sightseeings} />
          </TabsContent>
        )}

        {/* ── Reviews ── */}
        <TabsContent value="reviews" className="p-6">
          <ReviewSection packageId={packageId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
