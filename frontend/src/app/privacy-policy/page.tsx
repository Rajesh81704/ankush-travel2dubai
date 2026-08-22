import React from "react";
import { Metadata } from "next";
import { ShieldCheck, Lock, Eye, FileText, Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Triptoo Travels",
  description: "Learn how Triptoo Travels collects, uses, and safeguards your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pt-28 pb-20 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 border-b border-slate-800 pb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" /> Legal Policy
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white">Privacy Policy</h1>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Last Updated: July 2026. Your privacy and trust are our topmost priorities at Triptoo Travels.
          </p>
        </div>

        {/* Content sections */}
        <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
          <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-amber-400" /> 1. Information We Collect
            </h2>
            <p>
              When you use Triptoo Travels services, register an account, make booking inquiries, download package brochures, or request visa assistance, we collect information including:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-400 pl-2">
              <li>Full Name, Email Address, Phone Number, and Mailing Address.</li>
              <li>Government ID numbers (e.g. Passport details) strictly for visa and flight/hotel bookings.</li>
              <li>Payment and billing information processed securely via authorized payment gateways.</li>
              <li>Technical details like IP address, browser type, and page browsing activity.</li>
            </ul>
          </section>

          <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-amber-400" /> 2. How We Use Your Information
            </h2>
            <p>We use your information exclusively to:</p>
            <ul className="list-disc list-inside space-y-1 text-slate-400 pl-2">
              <li>Fulfill tour package reservations, flight tickets, hotel vouchers, and visa applications.</li>
              <li>Send booking updates, itinerary confirmations, and responsive customer support.</li>
              <li>Improve website experience, security, and customer satisfaction.</li>
              <li>Comply with regulatory travel requirements and anti-fraud protocols.</li>
            </ul>
          </section>

          <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-400" /> 3. Data Protection & Contact
            </h2>
            <p>
              We do not sell, rent, or trade your personal information to third parties for marketing purposes. Data is shared only with verified airline partners, hotels, and embassy/consulate authorities necessary to fulfill your travel bookings.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-400">
              <p className="text-white font-semibold">Triptoo Travels Privacy Desk:</p>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400" /> info@triptootravels.com | support@triptootravels.com | reservations@triptootravels.com | pooja.gupta@triptootravels.com
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400" /> +91 8767656900 / +18046504477 (24x7 WhatsApp Support)
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" /> Flat/Office-201, second floor, A wing Building, Vasai East, Agnes Paradise Building, Opposite Vijay Paradise, 401208
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
