import React from "react";
import { Metadata } from "next";
import { FileText, Check, Shield, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | Triptoo Travels",
  description: "Terms and conditions governing travel package bookings and portal usage with Triptoo Travels.",
};

export default function TermsPage() {
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
          <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Check className="w-5 h-5 text-amber-400" /> 1. Booking Confirmation & Payment
            </h2>
            <p>
              All bookings are confirmed upon receipt of advance deposit or full payment as specified in your booking invoice. Payments made via bank transfer, credit card, or UPI must match invoice details.
            </p>
          </section>

          <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-amber-400" /> 2. Passport & Visa Responsibilities
            </h2>
            <p>
              Travellers are responsible for ensuring that their passports have at least 6 months validity from departure date. Visa assistance provided by Triptoo Travels is subject to embassy/consulate discretion.
            </p>
          </section>

          <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-400" /> 3. Liability & Travel Insurance
            </h2>
            <p>
              Triptoo Travels acts as an agent between travellers and airlines, hotels, and transport vendors. We strongly recommend purchasing comprehensive travel insurance for unforeseen flight delays or medical emergencies.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-1">
              <p className="text-white font-semibold">Support Desk:</p>
              <p>Email: info@triptootravels.com | support@triptootravels.com | reservations@triptootravels.com</p>
              <p>Phone / WhatsApp: +91 8767656900 / +18046504477 (24x7 Support)</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
