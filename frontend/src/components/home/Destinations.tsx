"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const destinations = [
  {
    name: "Asian Adventures",
    count: "25+ Tours",
    image:
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gradient: "from-orange-500/30 to-red-500/30",
  },
  {
    name: "European Escapes",
    count: "30+ Tours",
    image:
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gradient: "from-blue-500/30 to-cyan-500/30",
  },
  {
    name: "African Safari",
    count: "15+ Tours",
    image:
      "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gradient: "from-yellow-500/30 to-orange-500/30",
  },
  {
    name: "Ocean Adventures",
    count: "20+ Tours",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gradient: "from-teal-500/30 to-blue-500/30",
  },
];

export const Destinations = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-blue-600 drop-shadow-lg mb-4">
            Popular Destinations
          </h2>
          <p className="text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto font-medium">
            Explore the world&apos;s most breathtaking locations with our expert
            guides
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {destinations.map((destination, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden rounded-3xl shadow-lg border-0 bg-slate-700/90 hover:scale-105 hover:shadow-2xl transition-all duration-300 py-0"
            >
              <div className="relative h-72">
                <Image
                  width={100}
                  height={100}
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover rounded-3xl transition-transform duration-500"
                  loading="lazy"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${destination.gradient} opacity-70 rounded-3xl`}
                />
                <div className="absolute inset-0 bg-black/20 rounded-3xl" />
                <div className="absolute top-4 right-4">
                  <span className="inline-block bg-slate-700/80 text-orange-600 font-semibold px-4 py-1 rounded-full text-xs shadow-md backdrop-blur-md">
                    {destination.count}
                  </span>
                </div>
                <CardContent className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-start z-10">
                  <h3 className="text-2xl font-extrabold mb-2 text-white drop-shadow-lg">
                    {destination.name}
                  </h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-white/80 to-orange-300 rounded-full mb-2" />
                  <button className="mt-2 px-5 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-full shadow-lg text-sm hover:from-orange-600 hover:to-pink-600 transition-all duration-200">
                    View Tours
                  </button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
