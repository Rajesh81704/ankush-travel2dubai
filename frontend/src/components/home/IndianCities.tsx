import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const cities = [
  {
    name: "Mumbai",
    image:
      "https://images.unsplash.com/photo-1595855759920-86582396756a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
    description: "Gateway of India",
    attractions: ["Marine Drive", "Gateway of India", "Juhu Beach"],
  },
  {
    name: "Delhi-NCR",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
    description: "Capital Heritage",
    attractions: ["Red Fort", "Qutub Minar", "India Gate"],
  },
  {
    name: "Bengaluru",
    image:
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
    description: "Silicon Valley",
    attractions: ["Lalbagh Garden", "Cubbon Park", "ISKCON Temple"],
  },
  {
    name: "Hyderabad",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
    description: "Pearl City",
    attractions: ["Charminar", "Golconda Fort", "Hussain Sagar"],
  },
  {
    name: "Chandigarh",
    image:
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
    description: "Planned Paradise",
    attractions: ["Rock Garden", "Sukhna Lake", "Rose Garden"],
  },
  {
    name: "Ahmedabad",
    image:
      "https://images.unsplash.com/photo-1609948543931-f58c8e4a6c0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
    description: "Heritage Hub",
    attractions: ["Sabarmati Ashram", "Adalaj Stepwell", "Sidi Saiyyed Mosque"],
  },
  {
    name: "Pune",
    image:
      "https://images.unsplash.com/photo-1567836683126-b66740706b7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
    description: "Cultural Capital",
    attractions: ["Shaniwar Wada", "Aga Khan Palace", "Sinhagad Fort"],
  },
  {
    name: "Chennai",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
    description: "Detroit of India",
    attractions: ["Marina Beach", "Kapaleeshwarar Temple", "Fort St. George"],
  },
  {
    name: "Kolkata",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
    description: "City of Joy",
    attractions: ["Victoria Memorial", "Howrah Bridge", "Dakshineswar Temple"],
  },
  {
    name: "Kochi",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
    description: "Queen of Arabian Sea",
    attractions: ["Fort Kochi", "Chinese Fishing Nets", "Mattancherry Palace"],
  },
];

export const IndianCities = () => {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6">
            Popular Cities
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed px-4">
            Discover India&apos;s vibrant cities with rich heritage and modern
            attractions that will leave you spellbound
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {cities.map((city, index) => (
            <Card
              key={index}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border-0 bg-slate-700/80 backdrop-blur-sm relative p-0"
            >
              <div className="relative h-48 sm:h-56 md:h-48 lg:h-52 overflow-hidden">
                <Image
                  width={400}
                  height={300}
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  priority={index < 4}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                />

                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black/95 group-hover:via-black/60 transition-all duration-500" />

                {/* Subtle Border Glow */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400/30 rounded-lg transition-all duration-500" />

                <CardContent className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
                  <h3 className="font-bold text-base sm:text-lg mb-1 group-hover:text-blue-200 transition-colors duration-300 relative z-10">
                    {city.name}
                  </h3>
                  <p className="text-xs sm:text-sm opacity-90 mb-2 group-hover:opacity-100 transition-opacity duration-300 relative z-10">
                    {city.description}
                  </p>

                  {/* Enhanced Attractions Display */}
                  <div className="flex flex-wrap gap-1 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 relative z-10">
                    {city.attractions.slice(0, 2).map((attraction, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-slate-700/20 backdrop-blur-sm px-2 py-1 rounded-full border border-white/30 hover:bg-slate-700/30 hover:border-white/50 transition-all duration-300"
                      >
                        {attraction}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
