export interface ImageMedia {
  url: string;
  public_id?: string;
}

export interface SiteSettings {
  _id?: string;
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
