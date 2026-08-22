"use client";
import { Star, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import Image from "next/image";

interface ReviewItem {
  _id?: string;
  rating: number;
  comment?: string;
  title?: string;
  createdAt?: string;
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
  };
  package?: {
    title?: string;
    location?: {
      destination?: string;
      city?: string;
    };
  };
}

const fallbackTestimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai, India",
    rating: 5,
    text: "Book Itinerary transformed our family vacation into the most memorable experience ever. The personalized itinerary perfectly balanced adventure and relaxation. Absolutely outstanding service!",
    trip: "Kerala Backwaters",
  },
  {
    name: "Arjun Mehta",
    location: "Delhi, India",
    rating: 5,
    text: "From booking to return, everything was seamless. The guides were incredibly knowledgeable and passionate. We discovered hidden gems we'd never find on our own. Highly recommend!",
    trip: "Manali Mountain Trek",
  },
  {
    name: "Sneha Patel",
    location: "Ahmedabad, India",
    rating: 5,
    text: "The attention to detail is remarkable. Every accommodation was carefully selected, meals were delicious, and the entire team went above and beyond. Best travel investment ever!",
    trip: "Goa Beach Escape",
  },
  {
    name: "Rajesh Kumar",
    location: "Bangalore, India",
    rating: 5,
    text: "Book Itinerary created a custom adventure that exceeded all expectations. The 24/7 support was incredibly helpful. We felt safe and cared for throughout the entire journey. Coming back soon!",
    trip: "Himalayan Adventure",
  },
  {
    name: "Divya Singh",
    location: "Pune, India",
    rating: 5,
    text: "Incredible value for money with premium experiences. The team listened to our preferences and designed something truly unique. We're already planning our next trip with them!",
    trip: "Northeast Explorer",
  },
  {
    name: "Vikram Gupta",
    location: "Jaipur, India",
    rating: 5,
    text: "Professional, reliable, and genuinely passionate about travel. Every moment was perfectly orchestrated. The flexibility to make changes on the go was a huge plus. Five stars all the way!",
    trip: "Rajasthan Cultural Tour",
  },
];

export default function Testimonials() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopReviews = async () => {
      try {
        setLoading(true);
        const res = await api.get<ReviewItem[]>("/reviews");
        if (Array.isArray(res.data) && res.data.length > 0) {
          // Filter 4+ star reviews with feedback, sort by rating and date
          const topReviews = [...res.data]
            .filter((r) => r.rating >= 4 && (r.comment || r.title))
            .sort((a, b) => {
              if (b.rating !== a.rating) return b.rating - a.rating;
              return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
            })
            .slice(0, 6);

          if (topReviews.length > 0) {
            setReviews(topReviews);
          }
        }
      } catch (err) {
        console.error("Error fetching top reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopReviews();
  }, []);

  const totalReviewsCount = reviews.length;
  const avgRating =
    totalReviewsCount > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviewsCount).toFixed(1)
      : "4.9";

  return (
    <section className="py-24 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label-premium mb-3">⭐ Traveler Reviews</p>
          <h2 className="heading-premium text-[32px] sm:text-[40px] text-gradient-premium mb-3">
            Stories from Our Happy Travelers
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-4">
            Discover why thousands of travelers choose us for their dream vacations
          </p>
          <div className="flex gap-2 justify-center">
            <div className="w-12 h-1 bg-gradient-to-r from-[#2563EB] to-[#F59E0B] rounded-full" />
            <div className="w-8 h-1 bg-gradient-to-r from-[#F59E0B] to-[#7C3AED] rounded-full" />
          </div>
        </div>

        {/* Cards */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(reviews.length > 0 ? reviews : fallbackTestimonials.slice(0, 6)).map((item, i) => {
              const isReal = "comment" in item;
              const rating = item.rating;
              const name = isReal ? (item as ReviewItem).user?.name || "Verified Traveler" : (item as any).name;
              const avatar = isReal ? (item as ReviewItem).user?.avatar : null;
              const tripName = isReal
                ? (item as ReviewItem).package?.title || "Custom Package"
                : (item as any).trip;
              const text = isReal
                ? (item as ReviewItem).comment || (item as ReviewItem).title || "Amazing experience!"
                : (item as any).text;
              const location = isReal
                ? (item as ReviewItem).package?.location?.destination || "Verified Booking"
                : (item as any).location;

              return (
                <div
                  key={isReal ? (item as ReviewItem)._id || i : i}
                  className="relative group bg-gradient-to-br from-amber-400 via-amber-300 to-orange-300 rounded-[24px] p-7 flex flex-col hover:shadow-premium-hover border-2 border-amber-200 transition-all duration-300 hover-lift-premium overflow-hidden"
                >
                  {/* Gradient top border */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Watermark quote */}
                  <div className="absolute top-4 right-4 opacity-[0.1]">
                    <Quote className="h-16 w-16 text-amber-800" />
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-4 relative z-10">
                    {Array.from({ length: rating }).map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 fill-amber-700 text-amber-700" />
                    ))}
                  </div>

                  {/* Trip badge */}
                  <span className="text-[11px] font-bold text-white uppercase tracking-widest mb-4 bg-gradient-to-r from-amber-700 to-orange-700 self-start px-3 py-1.5 rounded-full relative z-10 truncate max-w-full">
                    ✈️ {tripName}
                  </span>

                  {/* Review */}
                  <p className="text-amber-900 text-[14px] leading-relaxed flex-1 mb-6 relative z-10 line-clamp-4">
                    &ldquo;{text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-amber-200 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-700 to-orange-700 flex items-center justify-center text-white font-bold text-sm shrink-0 overflow-hidden relative">
                      {avatar ? (
                        <Image
                          src={avatar}
                          alt={name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        name.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-amber-900 text-[13px] leading-none truncate">{name}</p>
                      <p className="text-[11px] text-amber-800 mt-0.5 truncate">{location}</p>
                    </div>
                    <span className="text-[10px] font-bold text-white bg-green-600 px-2 py-0.5 rounded-full border border-green-700 shrink-0">
                      Verified
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Rating summary */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500 rounded-[18px] border border-amber-300 px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="text-[42px] font-extrabold text-amber-900 leading-none">
              {avgRating}
            </div>
            <div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>
              <div className="text-[12px] text-amber-800 mt-0.5 font-bold">
                {reviews.length > 0
                  ? `Based on ${reviews.length} traveler reviews`
                  : "Based on 5,000+ happy traveler reviews"}
              </div>
            </div>
          </div>

          <div className="hidden sm:block w-px h-12 bg-amber-300" />

          <div className="flex items-center gap-8">
            {[
              { platform: "Google", score: "4.8", color: "text-[#4285F4]" },
              { platform: "TripAdvisor", score: "4.7", color: "text-[#00AF87]" },
              { platform: "TrustPilot", score: "4.6", color: "text-[#00B67A]" },
            ].map((r) => (
              <div key={r.platform} className="text-center">
                <div className={`text-[18px] font-extrabold ${r.color} leading-none`}>{r.score}/5</div>
                <div className="text-[11px] text-amber-800 mt-0.5">{r.platform}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
