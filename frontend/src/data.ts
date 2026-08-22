// import type { PackageData, RelatedPackage } from "./components/packages/types";

// // Mock data - in real app, this would come from API
// export const packageData: PackageData[] = [
//     {
//         id: 1,
//         title: "Magical Bali Adventure",
//         location: "Bali, Indonesia",
//         duration: "7 Days 6 Nights",
//         price: 1299,
//         originalPrice: 1599,
//         rating: 4.8,
//         reviews: 324,
//         images: [
//             "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&h=400",
//             "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=600&h=400",
//             "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=600&h=400",
//             "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&h=400",
//         ],
//         features: ["Beach Resort", "Cultural Tours", "Spa Included"],
//         discount: "20% OFF",
//         description:
//             "Experience the magic of Bali with our carefully curated 7-day adventure. From pristine beaches to ancient temples, this package offers the perfect blend of relaxation and cultural exploration.",
//         highlights: [
//             "Stay in luxury beachfront resort",
//             "Visit iconic temples and rice terraces",
//             "Traditional Balinese spa treatments",
//             "Sunset dinner cruise",
//             "Professional local guide",
//             "All transfers included",
//         ],
//         itinerary: [
//             {
//                 day: 1,
//                 title: "Arrival in Bali",
//                 description:
//                     "Airport pickup and check-in to beachfront resort. Welcome dinner with traditional Balinese dance performance.",
//             },
//             {
//                 day: 2,
//                 title: "Ubud Cultural Tour",
//                 description:
//                     "Visit Monkey Forest Sanctuary, Tegallalang Rice Terraces, and traditional art villages. Lunch at local restaurant.",
//             },
//             {
//                 day: 3,
//                 title: "Temple Hopping",
//                 description:
//                     "Explore Tanah Lot Temple and Uluwatu Temple. Watch the famous Kecak fire dance at sunset.",
//             },
//             {
//                 day: 4,
//                 title: "Beach Day & Spa",
//                 description:
//                     "Relax at Seminyak Beach. Afternoon traditional Balinese spa treatment at the resort.",
//             },
//             {
//                 day: 5,
//                 title: "Water Sports Adventure",
//                 description:
//                     "Snorkeling at Blue Lagoon, water sports activities, and beach BBQ lunch.",
//             },
//             {
//                 day: 6,
//                 title: "Volcano Sunrise Trek",
//                 description:
//                     "Early morning trek to Mount Batur for sunrise viewing. Hot springs relaxation afterward.",
//             },
//             {
//                 day: 7,
//                 title: "Departure",
//                 description:
//                     "Last-minute shopping at local markets. Airport transfer for departure.",
//             },
//         ],
//         inclusions: [
//             "6 nights accommodation in 4-star beachfront resort",
//             "Daily breakfast and 3 dinners",
//             "All transfers and transportation",
//             "Professional English-speaking guide",
//             "All entrance fees and activities mentioned",
//             "Traditional spa treatment",
//             "Airport pickup and drop-off",
//         ],
//         exclusions: [
//             "International flights",
//             "Travel insurance",
//             "Personal expenses and shopping",
//             "Alcoholic beverages",
//             "Tips and gratuities",
//             "Visa fees (if applicable)",
//         ],
//     },
//     {
//         id: 2,
//         title: "Santorini Island Escape",
//         location: "Santorini, Greece",
//         duration: "6 Days 5 Nights",
//         price: 1599,
//         originalPrice: 1899,
//         rating: 4.9,
//         reviews: 412,
//         images: [
//             "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&h=400",
//             "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=600&h=400",
//             "https://images.unsplash.com/photo-1555400011-2636ffea12dc?auto=format&fit=crop&w=600&h=400",
//             "https://images.unsplash.com/photo-1601581875039-e899893d520c?auto=format&fit=crop&w=600&h=400",
//         ],
//         features: ["Luxury Villa", "Wine Tasting", "Private Cruise"],
//         discount: "15% OFF",
//         description:
//             "Escape to the breathtaking beauty of Santorini with our 6-day package featuring iconic whitewashed villages, stunning sunsets, and crystal-clear Aegean waters.",
//         highlights: [
//             "Stay in cliffside villa with caldera views",
//             "Private sunset sailing cruise",
//             "Traditional Greek cooking class",
//             "Wine tasting tour of volcanic vineyards",
//             "Beach day at Red Beach",
//             "Explore ancient ruins of Akrotiri",
//         ],
//         itinerary: [
//             {
//                 day: 1,
//                 title: "Welcome to Paradise",
//                 description: "Airport transfer to luxury villa in Oia. Welcome dinner with sunset views over the caldera.",
//             },
//             {
//                 day: 2,
//                 title: "Island Exploration",
//                 description: "Tour of Fira, Imerovigli, and Oia villages. Afternoon wine tasting at local vineyards.",
//             },
//             {
//                 day: 3,
//                 title: "Sailing Adventure",
//                 description: "Private catamaran cruise around the island with stops for swimming and snorkeling. BBQ lunch onboard.",
//             },
//             {
//                 day: 4,
//                 title: "Cultural Immersion",
//                 description: "Visit ancient Akrotiri archaeological site. Greek cooking class and dinner with local family.",
//             },
//             {
//                 day: 5,
//                 title: "Beach & Relaxation",
//                 description: "Visit famous Red and Black beaches. Optional spa treatment or free time to explore.",
//             },
//             {
//                 day: 6,
//                 title: "Farewell to Santorini",
//                 description: "Morning at leisure. Airport transfer for departure.",
//             }
//         ],
//         inclusions: [
//             "5 nights in luxury cliffside accommodation",
//             "Daily breakfast and 2 specialty dinners",
//             "Private sunset sailing cruise with BBQ",
//             "Wine tasting tour",
//             "Cooking class with local chef",
//             "All transfers and guided tours",
//             "Airport pickup and drop-off",
//         ],
//         exclusions: [
//             "International flights",
//             "Travel insurance",
//             "Optional activities not mentioned",
//             "Personal expenses",
//             "Tips for guides and drivers",
//         ],
//     },
//     {
//         id: 3,
//         title: "Japanese Cultural Journey",
//         location: "Japan",
//         duration: "10 Days 9 Nights",
//         price: 2499,
//         originalPrice: 2899,
//         rating: 4.7,
//         reviews: 278,
//         images: [
//             "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=600&h=400",
//             "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=600&h=400",
//             "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&h=400",
//             "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=600&h=400",
//         ],
//         features: ["Ryokan Stay", "Bullet Train", "Tea Ceremony"],
//         discount: "15% OFF",
//         description:
//             "Discover the perfect blend of ancient traditions and modern wonders in this comprehensive tour of Japan, from busy Tokyo to peaceful Kyoto temples.",
//         highlights: [
//             "Experience traditional ryokan accommodation",
//             "Bullet train journey across Japan",
//             "Authentic tea ceremony and kimono experience",
//             "Mt. Fuji and Hakone national park",
//             "Hiroshima Peace Memorial visit",
//             "Tokyo's vibrant neighborhoods and nightlife",
//         ],
//         itinerary: [
//             {
//                 day: 1,
//                 title: "Arrive in Tokyo",
//                 description: "Welcome to Japan! Transfer to hotel in Tokyo. Evening orientation walk in Shinjuku.",
//             },
//             {
//                 day: 2,
//                 title: "Tokyo Exploration",
//                 description: "Full day tour of Tokyo including Tsukiji Outer Market, Meiji Shrine, and Shibuya Crossing.",
//             },
//             {
//                 day: 3,
//                 title: "Mt. Fuji & Hakone",
//                 description: "Day trip to Mt. Fuji and Hakone National Park. Cable car ride for mountain views. Hot springs experience.",
//             },
//             {
//                 day: 4,
//                 title: "Travel to Kyoto",
//                 description: "Bullet train to Kyoto. Afternoon visit to Fushimi Inari Shrine with its thousands of torii gates.",
//             },
//             {
//                 day: 5,
//                 title: "Ancient Kyoto",
//                 description: "Tour of Kinkaku-ji (Golden Pavilion), Arashiyama Bamboo Grove, and traditional tea ceremony.",
//             },
//             {
//                 day: 6,
//                 title: "Nara Day Trip",
//                 description: "Day trip to Nara to see Todai-ji Temple and deer park. Evening geisha district walk.",
//             },
//             {
//                 day: 7,
//                 title: "Hiroshima",
//                 description: "Bullet train to Hiroshima. Visit Peace Memorial Park and Museum. Ferry to Miyajima Island.",
//             },
//             {
//                 day: 8,
//                 title: "Osaka Adventure",
//                 description: "Travel to Osaka. Street food tour in Dotonbori. Visit Osaka Castle and modern Umeda Sky Building.",
//             },
//             {
//                 day: 9,
//                 title: "Free Day or Optional Activities",
//                 description: "Free day for shopping or optional activities like cooking class or anime museum visit.",
//             },
//             {
//                 day: 10,
//                 title: "Farewell Japan",
//                 description: "Final morning at leisure. Transfer to airport for departure.",
//             }
//         ],
//         inclusions: [
//             "9 nights accommodation (mix of hotels and one ryokan)",
//             "Daily breakfast, 3 lunches, and 2 dinners",
//             "Japan Rail Pass for bullet train travel",
//             "All entrance fees to scheduled attractions",
//             "Tea ceremony and cultural experiences",
//             "English-speaking guide throughout",
//             "Airport transfers",
//         ],
//         exclusions: [
//             "International flights",
//             "Travel insurance",
//             "Optional activities",
//             "Meals not mentioned",
//             "Personal expenses",
//         ],
//     },
//     {
//         id: 4,
//         title: "Machu Picchu & Sacred Valley",
//         location: "Peru",
//         duration: "8 Days 7 Nights",
//         price: 1899,
//         originalPrice: 2199,
//         rating: 4.8,
//         reviews: 356,
//         images: [
//             "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=600&h=400",
//             "https://images.unsplash.com/photo-1531653702333-620f093979df?auto=format&fit=crop&w=600&h=400",
//             "https://images.unsplash.com/photo-1533050487297-09b450131914?auto=format&fit=crop&w=600&h=400",
//             "https://images.unsplash.com/photo-1553550620-75686818e8a6?auto=format&fit=crop&w=600&h=400",
//         ],
//         features: ["Inca Trail", "Cultural Immersion", "Historic Sites"],
//         discount: "13% OFF",
//         description:
//             "Journey through the ancient wonders of Peru, from colonial Cusco to the magnificent Machu Picchu, exploring Incan history and local traditions.",
//         highlights: [
//             "Guided tour of Machu Picchu at sunrise",
//             "Sacred Valley exploration",
//             "Traditional Peruvian cooking class",
//             "Meet local artisans and communities",
//             "Scenic train journey through the Andes",
//             "Colonial and Incan architecture in Cusco",
//         ],
//         itinerary: [
//             {
//                 day: 1,
//                 title: "Lima Arrival",
//                 description: "Welcome to Peru! Airport pickup and transfer to hotel in Lima. Brief orientation meeting.",
//             },
//             {
//                 day: 2,
//                 title: "Lima to Cusco",
//                 description: "Morning flight to Cusco. Afternoon acclimatization and walking tour of historic center.",
//             },
//             {
//                 day: 3,
//                 title: "Cusco Exploration",
//                 description: "Visit Sacsayhuaman fortress, Qorikancha temple, and colonial cathedrals. Peruvian cooking class for dinner.",
//             },
//             {
//                 day: 4,
//                 title: "Sacred Valley",
//                 description: "Full day exploring Sacred Valley. Visit Pisac market, Ollantaytambo fortress, and a local community project.",
//             },
//             {
//                 day: 5,
//                 title: "Machu Picchu",
//                 description: "Early scenic train to Aguas Calientes. Guided afternoon tour of Machu Picchu. Overnight near site.",
//             },
//             {
//                 day: 6,
//                 title: "Sunrise at Machu Picchu",
//                 description: "Optional second visit to Machu Picchu for sunrise. Afternoon train back to Cusco.",
//             },
//             {
//                 day: 7,
//                 title: "Free Day in Cusco",
//                 description: "Free day to explore Cusco or optional activities like Rainbow Mountain trek. Farewell dinner with folk show.",
//             },
//             {
//                 day: 8,
//                 title: "Departure",
//                 description: "Transfer to Cusco airport for flight to Lima and international connections.",
//             }
//         ],
//         inclusions: [
//             "7 nights accommodation",
//             "Daily breakfast and 3 dinners",
//             "Domestic flights (Lima-Cusco-Lima)",
//             "Train tickets to/from Machu Picchu",
//             "Two entrance passes to Machu Picchu",
//             "Expert local guides",
//             "All transfers and ground transportation",
//         ],
//         exclusions: [
//             "International flights",
//             "Travel insurance",
//             "Optional activities",
//             "Meals not mentioned",
//             "Tips for guides and drivers",
//         ],
//     },
//     {
//         id: 5,
//         title: "Northern Lights Adventure",
//         location: "Iceland",
//         duration: "6 Days 5 Nights",
//         price: 2299,
//         originalPrice: 2699,
//         rating: 4.9,
//         reviews: 189,
//         images: [
//             "https://images.unsplash.com/photo-1579033385971-a7bc024a0dcf?auto=format&fit=crop&w=600&h=400",
//             "https://images.unsplash.com/photo-1504542982118-59308b40fe0c?auto=format&fit=crop&w=600&h=400",
//             "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=600&h=400",
//             "https://images.unsplash.com/photo-1548513050-66896b34da64?auto=format&fit=crop&w=600&h=400",
//         ],
//         features: ["Northern Lights", "Hot Springs", "Glacier Hike"],
//         discount: "15% OFF",
//         description:
//             "Experience Iceland's winter magic with this specially designed tour to maximize your chances of seeing the Northern Lights while exploring ice caves, waterfalls, and geothermal areas.",
//         highlights: [
//             "3 guided Northern Lights hunts",
//             "Blue Lagoon geothermal spa experience",
//             "Golden Circle tour of iconic sights",
//             "Ice cave exploration and glacier hike",
//             "Black sand beaches and dramatic waterfalls",
//             "Local farm visit with traditional food tasting",
//         ],
//         itinerary: [
//             {
//                 day: 1,
//                 title: "Reykjavik Welcome",
//                 description: "Arrival at Keflavik Airport. Transfer to Reykjavik hotel. Evening Northern Lights hunt outside the city.",
//             },
//             {
//                 day: 2,
//                 title: "Golden Circle",
//                 description: "Tour the Golden Circle including Thingvellir National Park, Geysir geothermal area, and Gullfoss waterfall. Evening aurora watching.",
//             },
//             {
//                 day: 3,
//                 title: "South Coast Wonders",
//                 description: "South Coast tour including Seljalandsfoss and Skógafoss waterfalls, and black sand beach at Reynisfjara.",
//             },
//             {
//                 day: 4,
//                 title: "Glacier Adventure",
//                 description: "Glacier hike and ice cave exploration in Vatnajökull National Park. Final Northern Lights hunt at night.",
//             },
//             {
//                 day: 5,
//                 title: "Relaxation Day",
//                 description: "Morning at leisure in Reykjavik. Afternoon visit to Blue Lagoon geothermal spa. Farewell dinner in the capital.",
//             },
//             {
//                 day: 6,
//                 title: "Departure",
//                 description: "Transfer to Keflavik Airport for departure.",
//             }
//         ],
//         inclusions: [
//             "5 nights accommodation in aurora-viewing locations",
//             "Daily breakfast and 2 dinners",
//             "3 guided Northern Lights hunts",
//             "Blue Lagoon entrance and towel",
//             "Ice cave and glacier hike with equipment",
//             "Professional English-speaking guide",
//             "All transfers in 4x4 super jeep",
//         ],
//         exclusions: [
//             "International flights",
//             "Travel insurance",
//             "Lunches and some dinners",
//             "Optional activities",
//             "Personal expenses",
//         ],
//     },
//     {
//         id: 6,
//         title: "Safari & Beach Tanzania",
//         location: "Tanzania",
//         duration: "9 Days 8 Nights",
//         price: 3299,
//         originalPrice: 3899,
//         rating: 4.8,
//         reviews: 243,
//         images: [
//             "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600&h=400",
//             "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&h=400",
//             "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?auto=format&fit=crop&w=600&h=400",
//             "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=600&h=400",
//         ],
//         features: ["Wildlife Safari", "Beach Resort", "Luxury Tented Camps"],
//         discount: "15% OFF",
//         description:
//             "Experience the best of Tanzania with this perfect combination of wildlife safari in the Serengeti and relaxation on the pristine beaches of Zanzibar.",
//         highlights: [
//             "Big Five game drives in the Serengeti",
//             "Ngorongoro Crater exploration",
//             "Traditional Maasai village visit",
//             "Luxury tented camps in the wilderness",
//             "Historic Stone Town tour in Zanzibar",
//             "White sand beaches and Indian Ocean",
//         ],
//         itinerary: [
//             {
//                 day: 1,
//                 title: "Arrival in Arusha",
//                 description: "Welcome to Tanzania! Transfer to hotel in Arusha. Pre-safari briefing and welcome dinner.",
//             },
//             {
//                 day: 2,
//                 title: "Lake Manyara",
//                 description: "Drive to Lake Manyara National Park for afternoon game drive. Famous for tree-climbing lions and flamingos.",
//             },
//             {
//                 day: 3,
//                 title: "Ngorongoro Crater",
//                 description: "Full-day exploration of Ngorongoro Crater, a UNESCO World Heritage site with incredible density of wildlife.",
//             },
//             {
//                 day: 4,
//                 title: "Serengeti National Park",
//                 description: "Drive to central Serengeti with game viewing en route. Afternoon safari in the world-famous plains.",
//             },
//             {
//                 day: 5,
//                 title: "Serengeti Safari",
//                 description: "Full day of game drives in Serengeti. Search for lions, elephants, giraffes, and possibly the Great Migration depending on the season.",
//             },
//             {
//                 day: 6,
//                 title: "Fly to Zanzibar",
//                 description: "Morning game drive. Flight to Zanzibar Island. Transfer to beach resort on the east coast.",
//             },
//             {
//                 day: 7,
//                 title: "Zanzibar Beach Day",
//                 description: "Full day of relaxation on white sand beaches. Optional water activities like snorkeling or sailing.",
//             },
//             {
//                 day: 8,
//                 title: "Stone Town Exploration",
//                 description: "Half-day tour of historic Stone Town with its maze-like streets. Spice tour in the afternoon.",
//             },
//             {
//                 day: 9,
//                 title: "Departure",
//                 description: "Transfer to Zanzibar Airport for departure flight.",
//             }
//         ],
//         inclusions: [
//             "8 nights accommodation (safari lodges and beach resort)",
//             "All meals during safari portion",
//             "Breakfast and dinner in Zanzibar",
//             "Professional safari guide and 4x4 vehicle",
//             "Internal flight (Serengeti to Zanzibar)",
//             "Park entrance fees and game drives",
//             "Airport transfers",
//         ],
//         exclusions: [
//             "International flights",
//             "Travel insurance",
//             "Visa fees",
//             "Lunches in Zanzibar",
//             "Optional activities and spa treatments",
//             "Tips and gratuities",
//         ],
//     },
// ];



// export const relatedPackages: RelatedPackage[] = [
//     {
//         id: 2,
//         title: "Thailand Explorer",
//         location: "Thailand",
//         price: 999,
//         rating: 4.6,
//         image: "/placeholder.svg?height=200&width=300",
//     },
//     {
//         id: 3,
//         title: "Maldives Paradise",
//         location: "Maldives",
//         price: 1899,
//         rating: 4.7,
//         image: "/placeholder.svg?height=200&width=300",
//     },
// ]; 