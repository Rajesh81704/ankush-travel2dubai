"use client";

import React, { useState, useEffect } from "react";
import {
  FileCheck,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  PhoneCall,
  X,
  User,
  Mail,
  Phone,
  Calendar,
  Globe,
  FileText,
  CheckCircle2,
  Loader2,
  Clock,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";
import { useAppSelector } from "@/store/hooks";

export interface VisaPackageItem {
  _id?: string;
  country: string;
  flag: string;
  visaType: string;
  processingTime: string;
  validity: string;
  price: string;
  popular: boolean;
  requirements?: string[];
  isActive?: boolean;
}

export default function VisaPage() {
  const user = useAppSelector((state) => state.auth.user);

  const [visaPackages, setVisaPackages] = useState<VisaPackageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFormModal, setShowFormModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customCountry, setCustomCountry] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "Dubai (UAE)",
    visaType: "Tourist Visa",
    passportNumber: "",
    travelDate: "",
    message: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || "",
        email: prev.email || user.email || "",
        phone: prev.phone || user.phone || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const res = await api.get<{ success: boolean; visaPackages: VisaPackageItem[] }>("/visa/packages");
        if (res.data && res.data.visaPackages && res.data.visaPackages.length > 0) {
          setVisaPackages(res.data.visaPackages);
          setFormData((prev) => ({ ...prev, country: res.data.visaPackages[0].country }));
        }
      } catch (err) {
        console.error("Error fetching visa packages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleOpenModal = (countryName?: string) => {
    const selected = countryName || (visaPackages.length > 0 ? visaPackages[0].country : "Dubai (UAE)");
    setFormData((prev) => ({ ...prev, country: selected }));
    setCustomCountry("");
    setShowFormModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const finalCountry = formData.country === "Other Country" ? customCountry : formData.country;
      if (!finalCountry || !finalCountry.trim()) {
        toast.error("Please select or specify a valid country");
        setIsSubmitting(false);
        return;
      }
      const payload = { ...formData, country: finalCountry };
      const res = await api.post("/visa/inquire", payload);
      if (res.data.success || res.status === 201) {
        toast.success("Visa inquiry submitted successfully!", {
          action: {
            label: "View My Requests",
            onClick: () => { window.location.href = "/my-requests"; },
          },
        });
        setShowFormModal(false);
        setCustomCountry("");
        setFormData({
          name: "",
          email: "",
          phone: "",
          country: visaPackages.length > 0 ? visaPackages[0].country : "Dubai (UAE)",
          visaType: "Tourist Visa",
          passportNumber: "",
          travelDate: "",
          message: "",
        });
      }
    } catch (err: unknown) {
      console.error("Error submitting visa inquiry:", err);
      toast.error("Failed to submit inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="pt-28 pb-20 px-6 lg:px-12 max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Visa Packages Grid */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-slate-900 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Popular Visa Destinations</h2>
              <p className="text-xs text-slate-400 mt-1">Select a country to apply or view processing timelines</p>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Showing {visaPackages.length} Available Destinations
            </span>
          </div>

          {loading ? (
            <div className="flex flex-col justify-center items-center py-20 text-amber-400 space-y-3">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="text-xs text-slate-400 font-medium">Loading visa destinations...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visaPackages.map((visa, idx) => (
                <div
                  key={visa._id || idx}
                  className="group relative bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 hover:border-amber-500/40 hover:bg-slate-900/90 transition-all duration-300 shadow-xl flex flex-col justify-between"
                >
                  {visa.popular && (
                    <span className="absolute top-4 right-4 bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Popular
                    </span>
                  )}

                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl leading-none">{visa.flag}</span>
                      <div>
                        <h3 className="font-bold text-lg text-white group-hover:text-amber-400 transition-colors">
                          {visa.country}
                        </h3>
                        <span className="inline-block text-[11px] font-medium text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded border border-slate-800 mt-0.5">
                          {visa.visaType}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2.5 pt-3 border-t border-slate-800/70 text-xs">
                      <div className="flex items-center justify-between text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-500" /> Processing:
                        </span>
                        <span className="font-semibold text-slate-200">{visa.processingTime}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" /> Validity:
                        </span>
                        <span className="font-semibold text-slate-200">{visa.validity}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/50">
                        <span className="text-slate-400">Starting From:</span>
                        <span className="font-bold text-amber-400 text-lg">{visa.price}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 flex gap-2">
                    <button
                      onClick={() => handleOpenModal(visa.country)}
                      className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all duration-200"
                    >
                      Apply Online <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href={`https://wa.me/18046504477?text=Hi%20Triptoo%20Travels,%20I%20want%20to%20apply%20for%20a%20${encodeURIComponent(visa.country)}%20Visa`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-3.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs flex items-center justify-center border border-slate-700/80 transition-colors"
                      title="WhatsApp Assistance"
                    >
                      💬
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 4-Step Simple Process Section */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 lg:p-12 space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h3 className="text-2xl font-bold text-white">How It Works</h3>
            <p className="text-xs text-slate-400">Simple, transparent 4-step visa assistance process</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3 bg-slate-950/60 p-6 rounded-2xl border border-slate-800/60 relative">
              <span className="text-3xl font-extrabold text-amber-500/20">01</span>
              <h4 className="font-bold text-sm text-white">Select Destination</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Choose your target country and visa type from our verified packages.
              </p>
            </div>

            <div className="space-y-3 bg-slate-950/60 p-6 rounded-2xl border border-slate-800/60 relative">
              <span className="text-3xl font-extrabold text-amber-500/20">02</span>
              <h4 className="font-bold text-sm text-white">Submit Details</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Fill out the quick online form with your basic details and travel schedule.
              </p>
            </div>

            <div className="space-y-3 bg-slate-950/60 p-6 rounded-2xl border border-slate-800/60 relative">
              <span className="text-3xl font-extrabold text-amber-500/20">03</span>
              <h4 className="font-bold text-sm text-white">Document Verification</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our visa counselor verifies your documents to guarantee embassy approval.
              </p>
            </div>

            <div className="space-y-3 bg-slate-950/60 p-6 rounded-2xl border border-slate-800/60 relative">
              <span className="text-3xl font-extrabold text-amber-500/20">04</span>
              <h4 className="font-bold text-sm text-white">Visa Delivery</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Receive your approved e-Visa or passport with visa stamp directly.
              </p>
            </div>
          </div>
        </div>

        {/* Support CTA Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 rounded-3xl p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left max-w-xl">
            <h3 className="text-2xl font-bold text-white">Need Personal Visa Consultation?</h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Our embassy experts are ready to assist you with custom visa inquiries and document review.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 shrink-0">
            <button
              onClick={() => handleOpenModal()}
              className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors shadow-md"
            >
              <FileCheck className="w-4 h-4" /> Submit Inquiry Online
            </button>
            <a
              href="tel:+918767656900"
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs flex items-center gap-2 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" /> +91 8767656900
            </a>
            <a
              href="https://wa.me/18046504477"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/60 text-emerald-300 font-bold text-xs flex items-center gap-2 transition-colors"
            >
              💬 +18046504477 (WhatsApp)
            </a>
          </div>
        </div>
      </div>

      {/* Modal Dialog */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/40">
              <div>
                <h3 className="text-lg font-bold text-white">Online Visa Application / Inquiry</h3>
              </div>
              <button
                onClick={() => setShowFormModal(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-amber-400" /> Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter full name"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-amber-400" /> Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-amber-400" /> Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter mobile number"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300 flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-amber-400" /> Destination Country *
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => {
                      setFormData({ ...formData, country: e.target.value });
                      if (e.target.value !== "Other Country") setCustomCountry("");
                    }}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  >
                    {visaPackages.map((v) => (
                      <option key={v._id || v.country} value={v.country} className="bg-slate-900 text-white">
                        {v.country}
                      </option>
                    ))}
                    <option value="Other Country" className="bg-slate-900 text-white">
                      Other Country (Specify below)
                    </option>
                  </select>
                </div>
              </div>

              {formData.country === "Other Country" && (
                <div className="space-y-1.5 bg-slate-950/60 p-3 rounded-xl border border-amber-500/30">
                  <label className="font-semibold text-amber-400 flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5" /> Specify Country Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customCountry}
                    onChange={(e) => setCustomCountry(e.target.value)}
                    placeholder="Enter country name (e.g. Canada, Australia...)"
                    className="w-full px-4 py-2 bg-slate-950 border border-amber-500/50 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-amber-400" /> Visa Type
                  </label>
                  <select
                    value={formData.visaType}
                    onChange={(e) => setFormData({ ...formData, visaType: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Tourist Visa" className="bg-slate-900 text-white">Tourist Visa</option>
                    <option value="Business Visa" className="bg-slate-900 text-white">Business Visa</option>
                    <option value="Express / E-Visa" className="bg-slate-900 text-white">Express / E-Visa</option>
                    <option value="Transit Visa" className="bg-slate-900 text-white">Transit Visa</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300 flex items-center gap-1">
                    Passport Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.passportNumber}
                    onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value })}
                    placeholder="e.g. Z1234567"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" /> Expected Travel Date &amp; Notes
                </label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Mention your target travel dates or any specific visa requirements..."
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors shadow-lg shadow-amber-500/10"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      Submit Request <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
