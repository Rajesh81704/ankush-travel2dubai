import mongoose, { Schema, Document } from "mongoose";

export interface ISiteSettings extends Document {
  logo?: { url: string; public_id?: string };
  footerLogo?: { url: string; public_id?: string };
  hero: {
    title: string;
    subtitle: string;
    badge: string;
    bgImage?: { url: string; public_id?: string };
  };
  contact: {
    phone: string;
    alternatePhone?: string;
    email: string;
    address: string;
    workingHours?: string;
    mapEmbedUrl?: string;
  };
  footer: {
    tagline: string;
    copyright: string;
    facebookUrl?: string;
    instagramUrl?: string;
    whatsappNumber?: string;
    twitterUrl?: string;
    linkedinUrl?: string;
  };
  aboutUs: {
    title: string;
    subtitle: string;
    content: string;
    mission?: string;
    vision?: string;
    bannerImage?: { url: string; public_id?: string };
    stats?: Array<{ label: string; value: string }>;
  };
  b2b: {
    title: string;
    subtitle: string;
    content: string;
    benefits?: string[];
    bannerImage?: { url: string; public_id?: string };
  };
  paymentDetails: {
    accountName: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    branch: string;
    upiId?: string;
    upiQrImage?: { url: string; public_id?: string };
  };
  announcementBar: {
    enabled: boolean;
    text: string;
    link?: string;
  };
  offices?: Array<{
    country: string;
    flag: string;
    name: string;
    address: string;
    note?: string;
  }>;
  legal: {
    privacyPolicy: string;
    termsAndConditions: string;
    refundPolicy: string;
  };
}

const siteSettingsSchema = new Schema<ISiteSettings>(
  {
    logo: {
      url: { type: String, default: "" },
      public_id: { type: String, default: "" },
    },
    footerLogo: {
      url: { type: String, default: "" },
      public_id: { type: String, default: "" },
    },
    hero: {
      title: { type: String, default: "Explore Dubai Like Never Before" },
      subtitle: { type: String, default: "Handcrafted luxury tours, visa assistance, and unforgettable experiences in Dubai." },
      badge: { type: String, default: "✨ Best Price Guaranteed" },
      bgImage: {
        url: { type: String, default: "" },
        public_id: { type: String, default: "" },
      },
    },
    contact: {
      phone: { type: String, default: "+91 98765 43210" },
      alternatePhone: { type: String, default: "+91 91234 56789" },
      email: { type: String, default: "info@travel2dubai.co.in" },
      address: { type: String, default: "Suite 402, Travel Plaza, Connaught Place, New Delhi, India" },
      workingHours: { type: String, default: "Mon - Sat: 9:30 AM - 7:00 PM" },
      mapEmbedUrl: { type: String, default: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.996195821817!2d77.2182!3d28.6315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjg8MzcnNTMuNCJOIDc3wrAxMycwNS41IkU!5e0!3m2!1sen!2sin!4v1650000000000" },
    },
    footer: {
      tagline: { type: String, default: "Your trusted partner for memorable travel packages and hassle-free international visas." },
      copyright: { type: String, default: "© 2026 Travel2Dubai. All rights reserved." },
      facebookUrl: { type: String, default: "https://facebook.com" },
      instagramUrl: { type: String, default: "https://instagram.com" },
      whatsappNumber: { type: String, default: "+919876543210" },
      twitterUrl: { type: String, default: "https://twitter.com" },
      linkedinUrl: { type: String, default: "https://linkedin.com" },
    },
    aboutUs: {
      title: { type: String, default: "About Travel2Dubai" },
      subtitle: { type: String, default: "Crafting exceptional journeys and seamless travel experiences since 2018." },
      content: { type: String, default: "At Travel2Dubai, we specialize in curating bespoke travel packages, luxury desert safaris, corporate tours, and fast-track visa processing for Dubai and global destinations. Our dedicated team of travel experts ensures every detail of your trip is tailored to perfection." },
      mission: { type: String, default: "To deliver world-class, transparent, and memorable travel experiences for every traveler." },
      vision: { type: String, default: "To become India's leading travel technology agency for Middle East & international tourism." },
      bannerImage: {
        url: { type: String, default: "" },
        public_id: { type: String, default: "" },
      },
      stats: {
        type: [
          {
            label: { type: String, default: "" },
            value: { type: String, default: "" },
          },
        ],
        default: [
          { label: "Happy Travelers", value: "50,000+" },
          { label: "Tour Packages", value: "250+" },
          { label: "Visas Approved", value: "99.8%" },
          { label: "Destination Experts", value: "15+" },
        ],
      },
    },
    b2b: {
      title: { type: String, default: "B2B Travel Partner Program" },
      subtitle: { type: String, default: "Partner with Travel2Dubai to grow your travel agency business with exclusive B2B rates and dedicated support." },
      content: { type: String, default: "We offer travel agents, tour operators, and corporate partners access to direct DMC rates for Dubai hotels, sightseeing tours, transfers, and express visa processing. Join our network of over 1,200 successful B2B partners across India." },
      benefits: {
        type: [String],
        default: [
          "Direct DMC Wholesale Pricing for Dubai Packages & Visas",
          "24/7 Dedicated Partner Account Manager Support",
          "Express 24-Hour Visa Processing with High Approval Rates",
          "Custom White-Label Quotations & Itinerary Builder",
        ],
      },
      bannerImage: {
        url: { type: String, default: "" },
        public_id: { type: String, default: "" },
      },
    },
    paymentDetails: {
      accountName: { type: String, default: "TRAVEL2DUBAI PRIVATE LIMITED" },
      bankName: { type: String, default: "ICICI Bank" },
      accountNumber: { type: String, default: "924020012345678" },
      ifscCode: { type: String, default: "ICIC0000123" },
      branch: { type: String, default: "Vasai East, Mumbai" },
      upiId: { type: String, default: "travel2dubai@icici" },
      upiQrImage: {
        url: { type: String, default: "" },
        public_id: { type: String, default: "" },
      },
    },
    announcementBar: {
      enabled: { type: Boolean, default: false },
      text: { type: String, default: "🔥 Special Discount: Get up to 20% off on Dubai Luxury Desert Safaris!" },
      link: { type: String, default: "/packages" },
    },
    offices: {
      type: [
        {
          country: { type: String, default: "" },
          flag: { type: String, default: "" },
          name: { type: String, default: "" },
          address: { type: String, default: "" },
          note: { type: String, default: "" },
        },
      ],
      default: [
        {
          country: "India — Headquarters",
          flag: "🇮🇳",
          name: "India Corporate Desk",
          address: "Suite 402, Travel Plaza, Connaught Place, New Delhi, India 110001",
          note: "Main Billing & Operations Desk",
        },
        {
          country: "Dubai, UAE",
          flag: "🇦🇪",
          name: "Dubai Operations Office",
          address: "Shop #03, AL Souq Al Kabeer, Meena Bazar, Burdubai, Dubai, UAE",
          note: "PO Box: 87867",
        },
      ],
    },
    legal: {
      privacyPolicy: {
        type: String,
        default: "Your privacy and trust are our top priorities at Travel2Dubai. We collect personal information solely for processing holiday packages, hotel reservations, flight tickets, and visa applications. We do not sell or trade your data to third parties.",
      },
      termsAndConditions: {
        type: String,
        default: "All tour package bookings are confirmed upon receipt of advance deposit or full payment as specified in your booking invoice. Payments made via bank transfer, UPI, or card must match invoice details.",
      },
      refundPolicy: {
        type: String,
        default: "Approved refunds will be processed back to the original payment source or bank account within 5 to 7 working days from the cancellation confirmation date.",
      },
    },
  },
  { timestamps: true }
);

export const SiteSettingsModel =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>("SiteSettings", siteSettingsSchema);
