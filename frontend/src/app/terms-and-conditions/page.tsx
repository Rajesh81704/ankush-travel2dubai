"use client";

import React from "react";
import { FileText, Check, Globe, Shield } from "lucide-react";
import { useSiteSettings } from "@/context/SiteSettingsContext";

export default function TermsPage() {
  const { settings } = useSiteSettings();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pt-28 pb-20 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 border-b border-slate-800 pb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-widest">
            <FileText className="w-4 h-4" /> Agreement
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white">Terms & Conditions</h1>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Please review the standard terms governing tour bookings, flight arrangements, and portal usage.
          </p>
        </div>

        {/* Content sections */}
        <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
          <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Check className="w-5 h-5 text-amber-400" /> Booking Terms & Policy
            </h2>
            <p className="whitespace-pre-line text-slate-300 leading-relaxed">
              {settings.legal.termsAndConditions ||
                "All tour package bookings are confirmed upon receipt of advance deposit or full payment as specified in your booking invoice. Payments made via bank transfer, UPI, or card must match invoice details."}
            </p>
          </section>

          <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-amber-400" /> Passport & Visa Responsibilities
            </h2>
            <p>
              Travellers are responsible for ensuring that their passports have at least 6 months validity from departure date. Visa assistance provided by Travel2Dubai is subject to embassy/consulate discretion.
            </p>
          </section>

          <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-400" /> Support Desk & Contact
            </h2>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p className="text-white font-semibold">Official Contact:</p>
              <p>Email: {settings.contact.email}</p>
              <p>Phone: {settings.contact.phone} {settings.contact.alternatePhone ? `/ ${settings.contact.alternatePhone}` : ""}</p>
              <p>Address: {settings.contact.address}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
