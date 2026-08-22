export interface LocationData {
    city: string;
    state: string;
    destination: string;
}

export interface FlightOption {
    _id?: string;
    type: "main" | "internal";
    airline: string;
    flightNumber: string;
    departureCity: string;
    departureAirport: string;
    departureTime: string;
    departureDate: string;
    arrivalCity: string;
    arrivalAirport: string;
    arrivalTime: string;
    arrivalDate: string;
    duration: string;
    class: "economy" | "business" | "first";
    price: number;
    description?: string;
    image?: {
        url: string;
        public_id: string;
    };
}

export interface HotelOption {
    _id?: string;
    location: string;
    hotelName: string;
    nights: number;
    roomType: string;
    amenities?: string[];
    price: number;
    starRating?: number;
    checkInDate?: string;
    checkOutDate?: string;
    description?: string;
    images?: Array<{
        url: string;
        public_id: string;
    }>;
    image?: {
        url: string;
        public_id: string;
    };
}

// export interface IReview {

//     rating: number;
//     review: string;
//     user: string; // Using string for ObjectId representation in frontend
//     applaud: number;
//     package: string; // Using string for ObjectId representation in frontend
//     createdAt?: string;
//     updatedAt?: string;
// }


export interface IReview {
    _id: string;
    rating: number;
    comment: string;
    user: {
        _id: string;
        name: string;
        email: string;
    };
    package: {
        _id: string;
        title: string;
        description: string;
    };
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
}
export interface DurationData {
    day: number;
    night: number;
}

export interface SightseeingOption {
    _id?: string;
    name: string;
    description?: string;
    location?: string;
    duration?: string;
    images?: Array<{
        url: string;
        public_id: string;
    }>;
}

export interface ItineraryDay {
    day: number;
    title: string;
    description: string;
    city?: string;
    hotelName?: string;
    _id?: string;
}

export interface PackageData {
    _id: string;
    title: string;
    location: LocationData;
    duration: DurationData;
    price: number;
    originalPrice: number;
    rating?: number;
    reviews?: string[];
    images: {
        url: string;
        public_id: string;
    }[];
    features: string[];
    category?: string;
    discount: number;
    description: string;
    highlights: string[];
    itinerary: ItineraryDay[];
    inclusions: string[];
    exclusions: string[];
    flights?: FlightOption[];
    hotels?: HotelOption[];
    sightseeings?: SightseeingOption[];
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export interface PackagesResponse {
    success: boolean;
    packages: PackageData[];
}

export interface RelatedPackage {
    id: number;
    title: string;
    location: string;
    price: number;
    rating: number;
    image: string;
} 