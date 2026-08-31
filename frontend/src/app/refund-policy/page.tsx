"use client";

import React from "react";
import { RefreshCw, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { useSiteSettings } from "@/context/SiteSettingsContext";

export default function RefundPolicyPage() {
  const { settings } = useSiteSettings();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pt-28 pb-20 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 border-b border-slate-800 pb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest">
            <RefreshCw className="w-4 h-4" /> Returns & Refunds
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white">Refund & Cancellation Policy</h1>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Clear, transparent, and fair cancellation policies for all bookings at Travel2Dubai.
          </p>
        </div>

        {/* Content sections */}
        <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
          <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-amber-400" /> Refund & Cancellation Guidelines
            </h2>
            <p className="whitespace-pre-line text-slate-300 leading-relaxed">
              {settings.legal.refundPolicy ||
                "Approved refunds will be processed back to the original payment source or bank account within 5 to 7 working days from the cancellation confirmation date."}
            </p>
          </section>

          <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" /> Cancellation Timeline & Fees
            </h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-slate-800/60 rounded-xl border border-slate-700/50">
                <span>30+ Days Prior to Departure</span>
                <span className="font-bold text-emerald-400">100% Refund (Minus Nominal Process Fee)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-800/60 rounded-xl border border-slate-700/50">
                <span>15 - 29 Days Prior to Departure</span>
                <span className="font-bold text-amber-400">50% Package Refund</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-800/60 rounded-xl border border-slate-700/50">
                <span>0 - 14 Days Prior to Departure</span>
                <span className="font-bold text-red-400">Non-refundable</span>
              </div>
            </div>
          </section>

          <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" /> Non-Refundable Items
            </h2>
            <p className="text-slate-400">
              Visa processing fees, non-refundable flight ticket deposits, and express visa clearance fees paid to government embassies cannot be refunded once submitted.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
