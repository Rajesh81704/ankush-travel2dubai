"use client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useRouter } from "next/navigation";

const destinationPackages = [
  {
    id: "sikkim-darjeeling",
    title: "Popular Sikkim and Darjeeling Tour Packages",
    packages: [
      {
        id: "sikkim-1",
        title: "Mystical Sikkim & Darjeeling 7 Day Himalayan Retreat",
        subtitle: "Tour Packages",
        image:
          "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "7 Days",
      },
      {
        id: "sikkim-2",
        title: "Sikkim & Darjeeling Delight 7-Day Himalayan Retreat",
        subtitle: "Tour Packages",
        image:
          "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "7 Days",
      },
      {
        id: "sikkim-3",
        title: "Enchanting Darjeeling 4-Day Himalayan Escape",
        subtitle: "Tour Packages",
        image:
          "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "4 Days",
      },
      {
        id: "sikkim-4",
        title: "Enchanting Darjeeling 3-Day Himalayan Escape",
        subtitle: "Tour Packages",
        image:
          "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "3 Days",
      },
    ],
  },
  {
    id: "meghalaya",
    title: "Popular Meghalaya Tour Packages",
    packages: [
      {
        id: "meghalaya-1",
        title: "Enchanting Meghalaya & Assam 6-Day Tour",
        subtitle: "Tour Packages",
        image:
          "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "6 Days",
      },
      {
        id: "meghalaya-2",
        title: "Meghalaya Explorer 6-Day Journey Through Nature's Paradise",
        subtitle: "Tour Packages",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "6 Days",
      },
      {
        id: "meghalaya-3",
        title: "Mystical Meghalaya 5-Day Journey Through the Clouds",
        subtitle: "Tour Packages",
        image:
          "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "5 Days",
      },
      {
        id: "meghalaya-4",
        title: "Meghalaya & Assam Explorer - 9 Days of Nature & Adventure",
        subtitle: "Tour Packages",
        image:
          "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "9 Days",
      },
    ],
  },
];

const DestinationPackages = () => {
  const router = useRouter();
  return (
    <section className="py-16 bg-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {destinationPackages.map((destination) => (
          <div
            key={destination.id}
            onClick={() => {
              router.push(`/packages`);
            }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              {destination.title}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {destination.packages.map((pkg) => (
                <Card
                  key={pkg.id}
                  className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer p-0"
                  // onClick={() => handlePackageClick(pkg.id)}
                >
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      width={800}
                      height={600}
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    <div className="absolute bottom-5 left-5 right-5 text-white">
                      <h3 className="text-lg font-bold mb-2 leading-snug line-clamp-2 break-words">
                        {pkg.title}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="bg-slate-700/20 backdrop-blur-sm text-white border-white/30"
                      >
                        {pkg.subtitle}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DestinationPackages;
