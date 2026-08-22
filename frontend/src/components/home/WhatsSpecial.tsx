"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const slides = [
  {
    id: 1,
    number: "01",
    title: "We Turn Vacations Into Stories",
    description:
      "We don't just plan vacations; we create journeys tailored to your dreams, ensuring every moment is unforgettable.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    number: "02",
    title: "Hidden Gems, Local Vibes",
    description:
      "With our trusted local partners, you'll discover secret spots and cultural treasures that most tourists miss.",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    number: "03",
    title: "Personalized Like Never Before",
    description:
      "From food to views to the rhythm of your trip—every detail is shaped around your pace and preferences.",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    number: "04",
    title: "Seamless Travel Experience",
    description:
      "From booking to boarding and beyond, our dedicated support ensures a smooth, stress-free adventure.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    number: "05",
    title: "Curated by Explorers, Not Algorithms",
    description:
      "Our packages are handpicked by real travelers and experts—not bots. Expect authentic experiences, not generic ones.",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    number: "06",
    title: "Exclusive B2B & Group Benefits",
    description:
      "Get access to premium rates, early bird deals, and group discounts—perfect for corporate trips or large events.",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

export const WhatsSpecial = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm text-blue-600 mb-2">/About Us</p>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            What&apos;s So Special About This?
          </h2>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto mb-8">
            Save more on your trips with exclusive discounts, seasonal
            promotions, and unbeatable deals for unforgettable adventures.
          </p>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
            Learn More →
          </Button>
        </div>

        {/* Interactive Slider */}
        <div className="relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  width={800}
                  height={600}
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute top-6 left-6">
                  <span className="text-6xl font-bold text-white opacity-90">
                    {slides[currentSlide].number}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="space-y-8">
              <div className="transition-all duration-500 ease-in-out">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {slides[currentSlide].title}
                </h3>
                <p className="text-lg text-slate-200 leading-relaxed">
                  {slides[currentSlide].description}
                </p>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 w-12"
                          : "bg-gray-300 hover:bg-blue-200"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={prevSlide}
                    className="p-3 rounded-full bg-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-blue-50 border border-slate-600"
                  >
                    <ChevronLeft className="h-5 w-5 text-blue-600" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="p-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-700 hover:to-purple-700"
                  >
                    <ChevronRight className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
