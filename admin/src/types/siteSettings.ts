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
  paymentDetails: {
    accountName: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    branch: string;
    upiId?: string;
    upiQrImage?: ImageMedia;
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
