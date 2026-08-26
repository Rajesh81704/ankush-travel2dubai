"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/lib/api";

export interface ImageMedia {
  url: string;
  public_id?: string;
}

export interface SiteSettings {
  logo?: ImageMedia;
  footerLogo?: ImageMedia;
  hero: {
    title: string;
    subtitle: string;
    badge: string;
    bgImage?: ImageMedia;
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
    bannerImage?: ImageMedia;
    stats?: Array<{ label: string; value: string }>;
  };
  b2b: {
    title: string;
    subtitle: string;
    content: string;
    benefits?: string[];
    bannerImage?: ImageMedia;
  };
}

const defaultSettings: SiteSettings = {
  hero: {
    title: "Explore Dubai Like Never Before",
    subtitle: "Handcrafted luxury tours, visa assistance, and unforgettable experiences in Dubai.",
    badge: "✨ Best Price Guaranteed",
  },
  contact: {
    phone: "+91 98765 43210",
    alternatePhone: "+91 91234 56789",
    email: "info@travel2dubai.co.in",
    address: "Suite 402, Travel Plaza, Connaught Place, New Delhi, India",
    workingHours: "Mon - Sat: 9:30 AM - 7:00 PM",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.996195821817!2d77.2182!3d28.6315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjg8MzcnNTMuNCJOIDc3wrAxMycwNS41IkU!5e0!3m2!1sen!2sin!4v1650000000000",
  },
  footer: {
    tagline: "Your trusted partner for memorable travel packages and hassle-free international visas.",
    copyright: "© 2026 Travel2Dubai. All rights reserved.",
    facebookUrl: "https://facebook.com",
    instagramUrl: "https://instagram.com",
    whatsappNumber: "+919876543210",
    twitterUrl: "https://twitter.com",
    linkedinUrl: "https://linkedin.com",
  },
  aboutUs: {
    title: "About Travel2Dubai",
    subtitle: "Crafting exceptional journeys and seamless travel experiences since 2018.",
    content: "At Travel2Dubai, we specialize in curating bespoke travel packages, luxury desert safaris, corporate tours, and fast-track visa processing for Dubai and global destinations. Our dedicated team of travel experts ensures every detail of your trip is tailored to perfection.",
    mission: "To deliver world-class, transparent, and memorable travel experiences for every traveler.",
    vision: "To become India's leading travel technology agency for Middle East & international tourism.",
    stats: [
      { label: "Happy Travelers", value: "50,000+" },
      { label: "Tour Packages", value: "250+" },
      { label: "Visas Approved", value: "99.8%" },
      { label: "Destination Experts", value: "15+" },
    ],
  },
  b2b: {
    title: "B2B Travel Partner Program",
    subtitle: "Partner with Travel2Dubai to grow your travel agency business with exclusive B2B rates and dedicated support.",
    content: "We offer travel agents, tour operators, and corporate partners access to direct DMC rates for Dubai hotels, sightseeing tours, transfers, and express visa processing. Join our network of over 1,200 successful B2B partners across India.",
    benefits: [
      "Direct DMC Wholesale Pricing for Dubai Packages & Visas",
      "24/7 Dedicated Partner Account Manager Support",
      "Express 24-Hour Visa Processing with High Approval Rates",
      "Custom White-Label Quotations & Itinerary Builder",
    ],
  },
};

interface SiteSettingsContextType {
  settings: SiteSettings;
  loading: boolean;
}

const SiteSettingsContext = createContext<SiteSettingsContextType>({
  settings: defaultSettings,
  loading: true,
});

export const SiteSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const res = await api.get<{ success: boolean; data: SiteSettings }>("/site-settings");
        if (res.data?.data) {
          setSettings((prev) => ({
            ...prev,
            ...res.data.data,
            hero: { ...prev.hero, ...res.data.data.hero },
            contact: { ...prev.contact, ...res.data.data.contact },
            footer: { ...prev.footer, ...res.data.data.footer },
            aboutUs: { ...prev.aboutUs, ...res.data.data.aboutUs },
            b2b: { ...prev.b2b, ...res.data.data.b2b },
          }));
        }
      } catch (err) {
        console.warn("[SiteSettings] Using default site settings fallback");
      } finally {
        setLoading(false);
      }
    };

    fetchSiteSettings();
  }, []);

  return (
    <SiteSettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => useContext(SiteSettingsContext);
