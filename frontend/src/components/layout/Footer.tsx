"use client";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Send } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Packages", href: "/packages" },
  { name: "Destinations", href: "/packages" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

const topDestinations = [
  { name: "Meghalaya", href: "/packages?state=Meghalaya" },
  { name: "West Bengal", href: "/packages?state=West%20Bengal" },
];

const supportLinks = [
  { name: "FAQs", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms & Conditions", href: "/terms-and-conditions" },
  { name: "Refund Policy", href: "/refund-policy" },
];

export const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-gray-400 print:hidden">
      {/* Newsletter Banner */}
      <div className="bg-linear-to-r from-[#1E3A8A] to-[#1D4ED8]">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[11px] font-bold text-blue-200 uppercase tracking-widest mb-1">Newsletter</p>
              <h3 className="text-white text-[24px] font-extrabold">Subscribe to our newsletter</h3>
              <p className="text-blue-200 text-[14px] mt-1">Get the best travel deals &amp; updates straight to your inbox.</p>
            </div>
            <form
              className="flex gap-3 w-full lg:w-auto lg:min-w-[420px]"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-300" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200/60 text-sm focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all"
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3.5 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold rounded-xl text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg whitespace-nowrap"
              >
                <Send className="h-4 w-4" />
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1320px] mx-auto px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl px-3.5 py-2 inline-flex items-center justify-center shadow-md">
              <Image
                src="/logo.png"
                alt="TripToo Travels"
                width={200}
                height={200}
                className="h-12 lg:h-14 w-auto object-contain"
              />
            </div>
            <p className="text-[14px] text-gray-400 leading-relaxed max-w-[280px]">
              Explore the world with us. Creating memories and lasting journeys, one destination at a time.
            </p>

            {/* Contact info */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-[13px] text-gray-400">
                <Phone className="h-4 w-4 text-[#F59E0B] shrink-0" />
                <span>+91 8767656900 / +18046504477 (24x7 WhatsApp)</span>
              </div>
              <div className="flex items-center gap-2.5 text-[13px] text-gray-400">
                <Mail className="h-4 w-4 text-[#F59E0B] shrink-0" />
                <span>info@triptootravels.com</span>
              </div>
              <div className="flex items-center gap-2.5 text-[13px] text-gray-400">
                <Mail className="h-4 w-4 text-[#F59E0B] shrink-0" />
                <span>support@triptootravels.com</span>
              </div>
              <div className="flex items-center gap-2.5 text-[13px] text-gray-400">
                <Mail className="h-4 w-4 text-[#F59E0B] shrink-0" />
                <span>reservations@triptootravels.com</span>
              </div>
              <div className="flex items-center gap-2.5 text-[13px] text-gray-400">
                <Mail className="h-4 w-4 text-[#F59E0B] shrink-0" />
                <span>pooja.gupta@triptootravels.com</span>
              </div>
              <div className="flex items-start gap-2.5 text-[13px] text-gray-400">
                <MapPin className="h-4 w-4 text-[#F59E0B] shrink-0 mt-0.5" />
                <span>Flat/Office-201, 2nd Floor, A Wing, Agnes Paradise Building, Opp. Vijay Paradise, Vasai East, 401208</span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-2.5">
              {[
                { Icon: Facebook, label: "Facebook", hover: "hover:bg-[#1877F2]", href: "https://www.facebook.com/bookitinerarytour/" },
                { Icon: Instagram, label: "Instagram", hover: "hover:bg-[#E1306C]", href: "#" },
                { Icon: Twitter, label: "Twitter", hover: "hover:bg-[#1DA1F2]", href: "https://x.com/bookitinerary" },
                { Icon: Youtube, label: "YouTube", hover: "hover:bg-[#FF0000]", href: "#" },
              ].map(({ Icon, label, hover, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-full bg-gray-800 ${hover} flex items-center justify-center transition-all duration-200 hover:scale-110`}
                >
                  <Icon className="h-4 w-4 text-gray-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-[15px] mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map(({ name, href }) => (
                <li key={name}>
                  <Link
                    href={href}
                    className="text-[13px] text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-[#F59E0B] transition-colors" />
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Destinations */}
          <div>
            <h4 className="text-white font-bold text-[15px] mb-5">Top Destinations</h4>
            <ul className="space-y-3">
              {topDestinations.map(({ name, href }) => (
                <li key={name}>
                  <Link
                    href={href}
                    className="text-[13px] text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-[#F59E0B] transition-colors" />
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold text-[15px] mb-5">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map(({ name, href }) => (
                <li key={name}>
                  <Link
                    href={href}
                    className="text-[13px] text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-[#F59E0B] transition-colors" />
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Google Map */}
        <div className="border-t border-gray-800 pt-10 pb-6 mb-4">
          <h4 className="text-white font-bold text-[15px] mb-4">Find Us</h4>
          <div className="rounded-[16px] overflow-hidden border border-gray-700 w-full h-[280px]">
            <iframe
              src="https://maps.google.com/maps?q=Flat/Office-201,+second+floor,+A+wing+Building,+Agnes+Paradise+Building,+Opposite+Vijay+Paradise,+Vasai+East,+401208&output=embed&z=16"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bookitinerary Tours and Travel Company Location"
            />
          </div>
        </div>

        {/* Global Offices */}
        <div className="border-t border-gray-800 pt-10 pb-6 mb-4">
          <h4 className="text-white font-bold text-[15px] mb-6">Our Global Offices</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                city: "India (HQ)",
                address: "Flat/Office-201, 2nd Floor, A Wing, Agnes Paradise Building, Opp. Vijay Paradise, Vasai East, 401208",
                flag: "🇮🇳",
              },
              {
                city: "Dubai, UAE",
                address: "Shop #03, AL Souq Al Kabeer, Meena Bazar, Burdubai. PO Box: 87867",
                flag: "🇦🇪",
              },
              {
                city: "Singapore",
                address: "291, Seragoon Road #01-01, Seragoon Building, 218107",
                flag: "🇸🇬",
              },
              {
                city: "Hong Kong",
                address: "Cheung Lee Commercial Building, 25 Kimberley Road, Tsim Sha Tsui, Kowloon. Licence: 350318",
                flag: "🇭🇰",
              },
            ].map(({ city, address, flag }) => (
              <div key={city} className="flex items-start gap-3">
                <span className="text-xl mt-0.5">{flag}</span>
                <div>
                  <p className="text-white text-[13px] font-semibold mb-0.5">{city}</p>
                  <p className="text-gray-500 text-[12px] leading-relaxed">{address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-gray-500">
            © 2024 TripToo Travels. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-gray-600 uppercase tracking-widest">Payment Methods</span>
            {["VISA", "Mastercard", "UPI", "Paytm"].map((pm, i) => (
              <span
                key={pm}
                className={`text-[11px] font-extrabold tracking-wide ${
                  i === 3 ? "text-[#F59E0B]" : "text-gray-400"
                }`}
              >
                {pm}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
