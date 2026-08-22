"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Users,
  Clock,
  ShieldCheck,
  Star,
  CheckCircle2,
  Phone,
  Mail,
  Building2,
  Globe,
  Award,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Loader2,
  Handshake,
  Send,
} from "lucide-react";
import api from "@/lib/api";
import { B2BInquiryType, B2BRequestForm } from "@/types/b2b";
import { useAppSelector } from "@/store/hooks";

export default function B2BPage() {
  const user = useAppSelector((state) => state.auth.user);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<B2BRequestForm>({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    inquiryType: "Corporate Packages",
    message: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        contactName: prev.contactName || user.name || "",
        email: prev.email || user.email || "",
        phone: prev.phone || user.phone || "",
      }));
    }
  }, [user]);

  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await api.post("/b2b-requests", formData);
      if (response.status === 201 || response.data?.success) {
        toast.success("Partnership Inquiry Submitted!", {
          description: "Our dedicated B2B team will review your application and contact you within 24 hours.",
        });
        setFormData({
          companyName: "",
          contactName: "",
          email: "",
          phone: "",
          website: "",
          inquiryType: "Corporate Packages",
          message: "",
        });
      }
    } catch (error) {
      console.error("Error submitting B2B inquiry:", error);
      toast.error("Failed to submit inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof B2BRequestForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What are your B2B pricing and discount structures?",
      answer:
        "We offer tiered volume discounts starting at 12% off retail rates for travel agencies and custom net rates for corporate accounts.",
    },
    {
      question: "Do you provide white-label itinerary solutions?",
      answer:
        "Yes, we provide fully white-labeled tour packages and vouchers that you can brand and deliver under your company name.",
    },
    {
      question: "What is your typical turnaround time for B2B quotes?",
      answer:
        "Standard packages receive instant booking confirmation. Custom group or MICE itineraries are delivered within 4 to 12 hours.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="pt-28 pb-20 px-6 lg:px-12 max-w-7xl mx-auto space-y-20 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-semibold uppercase tracking-wide">
            <Handshake className="w-3.5 h-3.5" /> B2B Travel Partnerships
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Scale Your Travel Agency With <br />
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              Exclusive B2B Solutions
            </span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Join 200+ trusted travel agents and corporate partners. Gain access to net rates, white-labeled itineraries, and priority visa filing.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="flex items-center gap-1.5 bg-slate-900/80 px-3.5 py-1.5 rounded-full border border-slate-800">
              <Award className="w-3.5 h-3.5 text-amber-400" /> Trusted by 200+ Partners
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900/80 px-3.5 py-1.5 rounded-full border border-slate-800">
              <Globe className="w-3.5 h-3.5 text-blue-400" /> 50+ Global Destinations
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900/80 px-3.5 py-1.5 rounded-full border border-slate-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 24/7 Dedicated B2B Desk
            </span>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Value Proposition */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-4">
                <Building2 className="w-5 h-5 text-amber-400" /> Why Partner With Us?
              </h2>

              <div className="space-y-5 text-xs">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 text-amber-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">Exclusive Net Pricing</h3>
                    <p className="text-slate-400 mt-1 leading-relaxed">
                      Volume-based discounts and guaranteed net rates to ensure healthy profit margins for your agency.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 text-blue-400">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">White-Label Itineraries</h3>
                    <p className="text-slate-400 mt-1 leading-relaxed">
                      Custom PDF itineraries and hotel vouchers branded with your company name and logo.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">Fast Turnaround SLA</h3>
                    <p className="text-slate-400 mt-1 leading-relaxed">
                      Dedicated account managers to ensure custom group quotes are delivered within 4 to 12 hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 text-xs space-y-3">
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block">
                Direct B2B Desk
              </span>
              <div className="flex items-center justify-between text-slate-200">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-400" /> Phone: +91 8767656900 / +18046504477
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-400" /> b2b@triptootravels.com
                </span>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7 bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="border-b border-slate-800/80 pb-4">
              <h2 className="text-xl font-bold text-white">Apply for B2B Partnership</h2>
              <p className="text-xs text-slate-400 mt-1">Submit your company details to receive partner rates.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                    placeholder="e.g. Acme Travels Ltd"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Contact Person *</label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => handleInputChange("contactName", e.target.value)}
                    placeholder="Full name"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Business Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="partner@company.com"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Company Website (Optional)</label>
                  <input
                    type="text"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    placeholder="https://www.yourcompany.com"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Inquiry / Partnership Type *</label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => handleInputChange("inquiryType", e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Corporate Packages" className="bg-slate-900 text-white">Corporate Packages</option>
                    <option value="Group Tours" className="bg-slate-900 text-white">Group Tours &amp; MICE</option>
                    <option value="Custom Itineraries" className="bg-slate-900 text-white">Custom Itineraries</option>
                    <option value="Partnership Opportunities" className="bg-slate-900 text-white">General Agency Partnership</option>
                    <option value="Other" className="bg-slate-900 text-white">Other Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Additional Requirements / Notes</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Share details about expected annual volume, target destinations, or special requests..."
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-7 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors shadow-lg shadow-amber-500/10"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      Submit Partnership Application <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* 3-Step Process */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 lg:p-10 space-y-6">
          <div className="text-center space-y-1 max-w-xl mx-auto">
            <h2 className="text-xl font-bold text-white">Partnership Process</h2>
            <p className="text-xs text-slate-400">Get onboarded as an authorized partner in 3 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800/60 space-y-2">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">Step 01</span>
              <h3 className="font-bold text-white text-sm">Application Review</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our B2B team verifies your agency details and business credentials.
              </p>
            </div>

            <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800/60 space-y-2">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">Step 02</span>
              <h3 className="font-bold text-white text-sm">Agreement &amp; Net Rates</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Receive contract terms, volume discounts, and access to partner desk.
              </p>
            </div>

            <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800/60 space-y-2">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">Step 03</span>
              <h3 className="font-bold text-white text-sm">Start Booking</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Book tour packages and visa services with white-labeled collateral.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-white">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-5 text-left flex justify-between items-center text-xs sm:text-sm font-semibold text-white hover:text-amber-400 transition-colors"
                >
                  <span>{faq.question}</span>
                  {openFAQ === index ? (
                    <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/50 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

