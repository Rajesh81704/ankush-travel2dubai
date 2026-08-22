"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Users, Mail, Phone, User, MessageCircle, Send, CheckCircle2, Shield, Headphones } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";
import { useAppSelector } from "@/store/hooks";

interface InquiryFormProps {
  packageTitle: string;
  packageId: string;
  destination: string;
  onClose: () => void;
}

const benefits = [
  { icon: CheckCircle2, text: "Personalized travel recommendations", color: "text-[#22C55E]" },
  { icon: CheckCircle2, text: "Exclusive discounts & offers", color: "text-[#F59E0B]" },
  { icon: CheckCircle2, text: "Customized itineraries", color: "text-[#2563EB]" },
  { icon: CheckCircle2, text: "Expert travel support", color: "text-purple-500" },
];

export const InquiryForm = ({
  packageTitle,
  packageId,
  onClose,
  destination,
}: InquiryFormProps) => {
  const user = useAppSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    destination: destination,
    guests: "2",
    message: "",
    packageId: packageId,
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || "",
        email: prev.email || user.email || "",
        mobileNumber: prev.mobileNumber || user.phone || "",
      }));
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/inquiries", {
        name: formData.name,
        mobileNumber: formData.mobileNumber,
        email: formData.email,
        destination: formData.destination,
        message: formData.message || "No special requirements",
        packageId: formData.packageId,
        guests: formData.guests,
      });
      if (response.status === 200 || response.status === 201) {
        toast.success(
          "🎉 Inquiry submitted! Our travel expert will contact you within 24 hours."
        );
        onClose();
      }
    } catch (error: unknown) {
      console.error("Error submitting inquiry:", error);
      // Show the actual error message from the backend if available
      const axiosError = error as { response?: { data?: { message?: string } } };
      const msg = axiosError?.response?.data?.message || "Failed to submit inquiry. Please try again.";
      toast.error(msg);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-[900px] bg-slate-700 rounded-[20px] shadow-[0_30px_80px_rgba(0,0,0,0.25)] overflow-hidden max-h-[95vh] overflow-y-auto">
        {/* Hero Banner */}
        <div className="relative h-[140px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Travel"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 40%" }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/50 to-black/70" />
          <div className="absolute inset-0 flex flex-col justify-center px-8">
            <h2 className="text-[22px] font-extrabold text-white leading-tight drop-shadow">
              Let&apos;s Plan Your Perfect Getaway
            </h2>
            <p className="text-white/80 text-[13px] mt-1 font-medium">
              Share your travel plans with us and our experts will craft the best experience for you.
            </p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-slate-700/20 hover:bg-slate-700/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Breadcrumb */}
        <div className="px-8 py-3 bg-[#F8FAFC] border-b border-[#E5E7EB]">
          <div className="text-[12px] text-[#9CA3AF]">
            <span>Home</span>
            <span className="mx-2">›</span>
            <span>Packages</span>
            <span className="mx-2">›</span>
            <span className="text-[#F59E0B] font-semibold">Submit Inquiry</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-7">
            {/* Left — Form */}
            <div>
              {/* Package Banner */}
              <div className="bg-[#FFF7ED] border border-[#FED7AA] rounded-[14px] p-4 flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-[#F59E0B] rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                  <span className="text-lg">✈️</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#92400E] text-[14px] leading-snug">{packageTitle}</h3>
                  <p className="text-[12px] text-[#B45309] mt-0.5">
                    Fill the form below and unlock exclusive deals up to 20% off
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-[13px] font-semibold text-[#374151]">
                      <User className="h-3.5 w-3.5 text-[#F59E0B]" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-[12px] text-[14px] text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all bg-[#F8FAFC] hover:border-[#D1D5DB]"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-[13px] font-semibold text-[#374151]">
                      <Mail className="h-3.5 w-3.5 text-[#F59E0B]" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-[12px] text-[14px] text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all bg-[#F8FAFC] hover:border-[#D1D5DB]"
                      placeholder="Enter your email"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-[13px] font-semibold text-[#374151]">
                      <Phone className="h-3.5 w-3.5 text-[#F59E0B]" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      required
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-[12px] text-[14px] text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all bg-[#F8FAFC] hover:border-[#D1D5DB]"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {/* Travelers */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-[13px] font-semibold text-[#374151]">
                      <Users className="h-3.5 w-3.5 text-[#F59E0B]" />
                      Number of Travelers *
                    </label>
                    <select
                      name="guests"
                      required
                      value={formData.guests}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-[12px] text-[14px] text-[#111827] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all bg-[#F8FAFC] hover:border-[#D1D5DB] cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Traveler" : "Travelers"}
                        </option>
                      ))}
                      <option value="5+">5+ Travelers</option>
                    </select>
                  </div>
                </div>

                {/* Special Requirements */}
                <div className="mt-5 space-y-1.5">
                  <label className="flex items-center gap-1.5 text-[13px] font-semibold text-[#374151]">
                    <MessageCircle className="h-3.5 w-3.5 text-[#F59E0B]" />
                    Special Requirements
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-[12px] text-[14px] text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all bg-[#F8FAFC] hover:border-[#D1D5DB] resize-none"
                    placeholder="Tell us about your preferences, special occasions, or any specific requirements..."
                  />
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="px-8 py-3 text-[14px] border-[#E5E7EB] text-[#374151] hover:bg-[#F8FAFC] rounded-[12px] font-semibold"
                  >
                    Cancel
                  </Button>
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 px-8 py-3 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold rounded-[12px] text-[14px] shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <Send className="h-4 w-4" />
                    Submit Inquiry
                  </button>
                </div>

                {/* Security notice */}
                <div className="mt-4 flex items-center justify-center gap-2 text-[12px] text-[#9CA3AF]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                  <span>🔒 Your information is secure and protected by industry-standard encryption</span>
                </div>
              </form>
            </div>

            {/* Right — Info Cards */}
            <div className="space-y-4">
              {/* Why Submit */}
              <div className="bg-[#F8FAFC] rounded-[16px] border border-[#E5E7EB] p-5">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#FEE2E2] flex items-center justify-center">
                    <span className="text-base">💝</span>
                  </div>
                  <h4 className="font-bold text-[#111827] text-[14px]">Why Submit an Inquiry?</h4>
                </div>
                <ul className="space-y-2.5">
                  {benefits.map(({ icon: Icon, text, color }) => (
                    <li key={text} className="flex items-start gap-2.5">
                      <Icon className={`h-4 w-4 ${color} shrink-0 mt-0.5`} />
                      <p className="text-[13px] text-[#374151]">{text}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Need Help */}
              <div className="bg-[#F8FAFC] rounded-[16px] border border-[#E5E7EB] p-5">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Headphones className="h-4 w-4 text-[#2563EB]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#111827] text-[14px]">Need Help?</h4>
                    <p className="text-[11px] text-[#9CA3AF]">Our travel experts are ready to assist you!</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[13px] text-[#374151]">
                    <Phone className="h-3.5 w-3.5 text-[#F59E0B] shrink-0" />
                    +91 8767656900 / +18046504477
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-[#374151]">
                    <Mail className="h-3.5 w-3.5 text-[#F59E0B] shrink-0" />
                    info@triptootravels.com
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-[#374151]">
                    <Mail className="h-3.5 w-3.5 text-[#F59E0B] shrink-0" />
                    support@triptootravels.com
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-[#374151]">
                    <Mail className="h-3.5 w-3.5 text-[#F59E0B] shrink-0" />
                    reservations@triptootravels.com
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-[#374151]">
                    <span className="w-3.5 h-3.5 text-[#F59E0B] shrink-0 flex items-center justify-center text-[10px]">🕐</span>
                    24x7 WhatsApp Support
                  </div>
                </div>
              </div>

              {/* Privacy */}
              <div className="bg-[#F0FDF4] rounded-[16px] border border-[#BBF7D0] p-4 flex items-start gap-3">
                <Shield className="h-5 w-5 text-[#22C55E] shrink-0 mt-0.5" />
                <p className="text-[12px] text-[#166534] leading-relaxed font-medium">
                  We respect your privacy. Your details will never be shared with third parties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
