"use client";

import Image from "next/image";
import type { PackageData } from "./types";
import { Star, Check, X, Plane, Building2, Camera, ShieldCheck, MapPin, Calendar, Clock, Tag } from "lucide-react";

interface PackageBrochureProps {
  packageData: PackageData;
}

export default function PackageBrochure({ packageData }: PackageBrochureProps) {
  const finalPrice = Math.round(
    packageData.price * (1 - (packageData.discount || 0) / 100)
  );

  const avgRating = packageData.rating && packageData.rating > 0 ? packageData.rating : 4.8;

  return (
    <div className="hidden print:block text-slate-900 bg-white p-6 max-w-[210mm] mx-auto font-sans">
      {/* ── 1. HEADER BRANDING ─────────────────────────────────────── */}
      <div className="border-b-2 border-slate-900 pb-5 mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="TripToo Travels Logo"
              className="h-12 w-auto object-contain"
            />
            <div>
              <p className="text-[10px] font-bold text-amber-600 tracking-widest uppercase">
                Official Tour Package Brochure
              </p>
            </div>
          </div>
        </div>

        <div className="text-right text-[11px] text-slate-600 space-y-0.5">
          <p className="font-bold text-slate-900">TripToo Travels Pvt Ltd</p>
          <p>📞 Phone: +91 8767656900</p>
          <p>✉️ Email: info@triptootravels.com</p>
          <p>🌐 Web: www.triptootravels.com</p>
        </div>
      </div>

      {/* ── 2. PACKAGE BANNER & KEY DETAILS ──────────────────────── */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 mb-6 relative overflow-hidden shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 max-w-[70%]">
            <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-amber-500/30">
              <MapPin className="w-3 h-3" /> {packageData.location.city}, {packageData.location.state}, {packageData.location.destination}
            </div>
            <h2 className="text-2xl font-black text-white leading-tight">
              {packageData.title}
            </h2>
            <div className="flex items-center gap-4 text-xs text-slate-300 pt-1">
              <span className="flex items-center gap-1 font-semibold">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                {packageData.duration.day} Days / {packageData.duration.night} Nights
              </span>
              <span className="flex items-center gap-1 font-bold text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {avgRating.toFixed(1)} / 5.0 Average Rating
              </span>
            </div>
          </div>

          <div className="text-right bg-slate-800/80 border border-slate-700 p-4 rounded-xl shrink-0">
            <div className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-1">
              Package Tariff
            </div>
            {packageData.discount > 0 && (
              <div className="text-xs text-slate-400 line-through">
                ₹{packageData.price?.toLocaleString("en-IN")}
              </div>
            )}
            <div className="text-2xl font-black text-white">
              ₹{finalPrice.toLocaleString("en-IN")}
            </div>
            <div className="text-[10px] text-slate-400 font-medium">Per Person</div>
            {packageData.discount > 0 && (
              <div className="mt-1 inline-block bg-emerald-500/20 text-emerald-300 text-[9px] font-bold px-2 py-0.5 rounded-md border border-emerald-500/30">
                Save {packageData.discount}% OFF
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── 3. OVERVIEW & HIGHLIGHTS ───────────────────────────────── */}
      <div className="mb-6 space-y-4 avoid-break">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2 uppercase tracking-wide flex items-center gap-2">
          <Tag className="w-4 h-4 text-amber-500" /> Package Overview & Highlights
        </h3>
        <p className="text-xs text-slate-700 leading-relaxed font-normal">
          {packageData.description}
        </p>

        {packageData.highlights && packageData.highlights.length > 0 && (
          <div className="bg-amber-50/50 border border-amber-200/60 rounded-xl p-4">
            <h4 className="text-xs font-bold text-slate-900 mb-2 uppercase tracking-wider">
              Key Package Highlights:
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-800">
              {packageData.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-500 font-bold shrink-0">✓</span>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── 4. ALL PACKAGE IMAGES ──────────────────────────────────── */}
      {packageData.images && packageData.images.length > 0 && (
        <div className="mb-6 avoid-break">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2 mb-3 uppercase tracking-wide flex items-center gap-2">
            <Camera className="w-4 h-4 text-amber-500" /> Destination & Package Gallery
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {packageData.images.map((img, idx) => (
              <div key={idx} className="h-28 rounded-xl overflow-hidden border border-slate-200 relative bg-slate-100">
                <img
                  src={img.url}
                  alt={`${packageData.title} Image ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 5. FLIGHT DETAILS (If available) ───────────────────────── */}
      {packageData.flights && packageData.flights.length > 0 && (
        <div className="mb-6 avoid-break">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2 mb-3 uppercase tracking-wide flex items-center gap-2">
            <Plane className="w-4 h-4 text-amber-500" /> Flight & Travel Details
          </h3>
          <div className="space-y-3">
            {packageData.flights.map((flight, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <span className="bg-amber-100 text-amber-800 text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                      {flight.type} Flight
                    </span>
                    <span>{flight.airline} ({flight.flightNumber})</span>
                  </div>
                  <span className="font-semibold text-slate-600 uppercase">
                    Class: {flight.class}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-slate-700 pt-1">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Departure</p>
                    <p className="font-bold text-slate-900">{flight.departureCity} ({flight.departureAirport})</p>
                    <p className="text-[11px]">{flight.departureDate} at {flight.departureTime}</p>
                  </div>
                  <div className="text-center self-center">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Duration</p>
                    <p className="font-bold text-amber-600">✈ {flight.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Arrival</p>
                    <p className="font-bold text-slate-900">{flight.arrivalCity} ({flight.arrivalAirport})</p>
                    <p className="text-[11px]">{flight.arrivalDate} at {flight.arrivalTime}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 6. HOTEL DETAILS WITH IMAGES ──────────────────────────── */}
      {packageData.hotels && packageData.hotels.length > 0 && (
        <div className="mb-6 avoid-break">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2 mb-3 uppercase tracking-wide flex items-center gap-2">
            <Building2 className="w-4 h-4 text-amber-500" /> Accommodations & Hotel Details
          </h3>
          <div className="space-y-4">
            {packageData.hotels.map((hotel, idx) => {
              const hotelImgs = hotel.images && hotel.images.length > 0
                ? hotel.images
                : hotel.image ? [hotel.image] : [];

              return (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-sm">{hotel.hotelName}</h4>
                        <div className="flex text-amber-400">
                          {Array.from({ length: hotel.starRating || 3 }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-500 text-[11px]">📍 Location: {hotel.location} • {hotel.nights} Nights Stay</p>
                    </div>
                    <div className="text-right">
                      <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded text-[10px]">
                        Room: {hotel.roomType}
                      </span>
                    </div>
                  </div>

                  {hotel.description && (
                    <p className="text-slate-600 text-[11px]">{hotel.description}</p>
                  )}

                  {/* Hotel Images */}
                  {hotelImgs.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 pt-1">
                      {hotelImgs.map((img, iIdx) => (
                        <div key={iIdx} className="h-20 rounded-lg overflow-hidden border border-slate-200 relative bg-slate-200">
                          <img
                            src={img.url}
                            alt={`${hotel.hotelName} photo ${iIdx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {hotel.amenities && hotel.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {hotel.amenities.map((amenity, aIdx) => (
                        <span key={aIdx} className="bg-white border border-slate-200 text-slate-700 text-[10px] px-2 py-0.5 rounded-md font-medium">
                          ✓ {amenity}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── 7. SIGHTSEEING DETAILS WITH IMAGES ──────────────────────── */}
      {packageData.sightseeings && packageData.sightseeings.length > 0 && (
        <div className="mb-6 avoid-break">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2 mb-3 uppercase tracking-wide flex items-center gap-2">
            <Camera className="w-4 h-4 text-amber-500" /> Sightseeing & Excursions
          </h3>
          <div className="space-y-4">
            {packageData.sightseeings.map((sightseeing, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm">📍 {sightseeing.name}</h4>
                  {sightseeing.duration && (
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Duration: {sightseeing.duration}
                    </span>
                  )}
                </div>
                {sightseeing.description && (
                  <p className="text-slate-600 text-[11px] leading-relaxed">{sightseeing.description}</p>
                )}

                {/* Sightseeing Images */}
                {sightseeing.images && sightseeing.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 pt-2">
                    {sightseeing.images.map((img, iIdx) => (
                      <div key={iIdx} className="h-20 rounded-lg overflow-hidden border border-slate-200 bg-slate-200">
                        <img
                          src={img.url}
                          alt={`${sightseeing.name} photo ${iIdx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 8. DAY-BY-DAY ITINERARY ────────────────────────────────── */}
      {packageData.itinerary && packageData.itinerary.length > 0 && (
        <div className="mb-6 avoid-break">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2 mb-3 uppercase tracking-wide flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500" /> Detailed Day-by-Day Itinerary
          </h3>
          <div className="space-y-3">
            {packageData.itinerary.map((day, idx) => (
              <div key={idx} className="border-l-2 border-amber-500 pl-4 py-1 text-xs space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded">
                    Day {day.day || idx + 1}
                  </span>
                  <h4 className="font-bold text-slate-900 text-xs">{day.title}</h4>
                  {day.city && (
                    <span className="text-[10px] text-slate-500 font-medium">({day.city})</span>
                  )}
                </div>
                <p className="text-slate-600 leading-relaxed">{day.description}</p>
                {day.hotelName && (
                  <p className="text-[10px] font-bold text-slate-700">🏨 Overnight Stay: {day.hotelName}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 9. INCLUSIONS & EXCLUSIONS ─────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 mb-6 avoid-break">
        <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 text-xs">
          <h4 className="font-bold text-emerald-900 border-b border-emerald-200 pb-1.5 mb-2 uppercase tracking-wide flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600" /> What's Included
          </h4>
          <ul className="space-y-1.5 text-emerald-950">
            {packageData.inclusions.map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-rose-50/60 border border-rose-200 rounded-xl p-4 text-xs">
          <h4 className="font-bold text-rose-900 border-b border-rose-200 pb-1.5 mb-2 uppercase tracking-wide flex items-center gap-1.5">
            <X className="w-4 h-4 text-rose-600" /> What's Excluded
          </h4>
          <ul className="space-y-1.5 text-rose-950">
            {packageData.exclusions.map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-rose-600 font-bold shrink-0">✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── 10. OFFICIAL BANKING & BOOKING FOOTER ──────────────────── */}
      <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 text-xs space-y-3 avoid-break">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase tracking-wider text-[10px]">
            <ShieldCheck className="w-4 h-4" /> Official Direct Booking & Account Information
          </div>
          <span className="text-[10px] text-slate-400">TRIPTOO TRAVELS PRIVATE LIMITED</span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-[11px]">
          <div>
            <p className="text-slate-400 text-[10px]">Bank Name & Account:</p>
            <p className="font-bold text-white">ICICI Bank • Account No: <span className="text-amber-400 font-mono">924020012345678</span></p>
            <p className="text-slate-400 text-[10px] mt-1">IFSC Code: <span className="text-emerald-400 font-mono font-bold">ICIC0000123</span> (Vasai East Branch)</p>
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-[10px]">Support & Confirmations:</p>
            <p className="font-bold text-white">📞 +91 8767656900</p>
            <p className="text-slate-400 text-[10px]">💬 WhatsApp: +1 8046504477</p>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800 text-[9px] text-center text-slate-400">
          Generated automatically by TripToo Travels System • All rights reserved • Prices & Availability subject to confirmation.
        </div>
      </div>
    </div>
  );
}
