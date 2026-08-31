"use client";

import React from "react";
import { ShieldCheck, Eye, Lock, FileText } from "lucide-react";
import { useSiteSettings } from "@/context/SiteSettingsContext";

export default function PrivacyPolicyPage() {
  const { settings } = useSiteSettings();

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
            Your privacy and trust are our topmost priorities at Travel2Dubai.
          </p>
        </div>

        {/* Content section */}
        <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
          <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-amber-400" /> Data Privacy & Protection Notice
            </h2>
            <p className="whitespace-pre-line text-slate-300 leading-relaxed">
              {settings.legal.privacyPolicy ||
                "Your privacy and trust are our top priorities at Travel2Dubai. We collect personal information solely for processing holiday packages, hotel reservations, flight tickets, and visa applications. We do not sell or trade your data to third parties."}
            </p>
          </section>

          <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-amber-400" /> Information Usage & Security
            </h2>
            <ul className="list-disc list-inside space-y-1.5 text-slate-400 pl-2">
              <li>Fulfill tour package reservations, flight tickets, hotel vouchers, and visa applications.</li>
              <li>Send booking updates, itinerary confirmations, and responsive customer support.</li>
              <li>Maintain strict SSL data encryption and security protocols for all transactions.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
