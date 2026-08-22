import React from "react";
import { Metadata } from "next";
import { RefreshCw, CheckCircle2, Clock, AlertTriangle, Mail, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Triptoo Travels",
  description: "Understand the cancellation guidelines and refund procedures for Triptoo Travels tour packages.",
};

export default function RefundPolicyPage() {
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
            Clear, transparent, and fair cancellation policies for all bookings at Triptoo Travels.
          </p>
        </div>

        {/* Content sections */}
        <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
          <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" /> 1. Cancellation Timeline & Fees
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
              <CheckCircle2 className="w-5 h-5 text-amber-400" /> 2. Refund Processing Time
            </h2>
            <p>
              Approved refunds will be processed back to the original payment source or bank account within <strong>5 to 7 working days</strong> from the cancellation confirmation date.
            </p>
          </section>

          <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" /> 3. Non-Refundable Items & Contact
            </h2>
            <p>
              Flight tickets, visa processing fees, and peak holiday season hotel surcharges are governed by third-party provider rules and may be non-refundable.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-400">
              <p className="text-white font-semibold">For Cancellation Requests & Support:</p>
              <p>Email: <span className="text-amber-400">info@triptootravels.com</span> | <span className="text-amber-400">support@triptootravels.com</span> | <span className="text-amber-400">reservations@triptootravels.com</span> | <span className="text-amber-400">pooja.gupta@triptootravels.com</span></p>
              <p>Phone / WhatsApp: <span className="text-amber-400">+91 8767656900</span> / <span className="text-amber-400">+18046504477 (24x7 WhatsApp)</span></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
