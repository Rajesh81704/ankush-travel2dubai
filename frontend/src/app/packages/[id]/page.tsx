"use client";

import {
  PackageHeader,
  ImageGallery,
  PackageDetails,
  PackageBrochure,
  PackageData,
  IReview,
} from "@/components/packages";
import { InquiryForm } from "@/components/home/InquiryForm";
import api from "@/lib/api";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store";
import Login from "@/components/forms/Login";
import { Download, CreditCard, Building, PhoneCall, MessageSquare, X, CheckCircle, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

interface PackageDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PackageDetailPage({ params }: PackageDetailPageProps) {
  const [packageData, setPackageData] = useState<PackageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { isLoggedIn, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const { id } = await params;
        const response = await api.get<{
          success: boolean;
          package: PackageData;
          reviews: IReview[];
        }>(`/packages/${id}`);

        if (response.data.success && response.data.package) {
          setPackageData(response.data.package);
        } else {
          throw new Error("Package not found");
        }
      } catch (error) {
        console.error("Error fetching package data:", error);
        setError("Failed to load package");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  const handleDownloadBrochure = () => {
    if (!isLoggedIn) {
      toast.info("Please sign up or log in to download the package brochure.");
      setShowLoginModal(true);
      return;
    }

    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] pt-[68px]">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8 py-16">
          <div className="flex justify-center items-center py-24">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full border-4 border-[#E5E7EB] border-t-[#F59E0B] animate-spin mx-auto mb-5" />
              <p className="text-[#6B7280] font-medium">Loading package details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !packageData) {
    return notFound();
  }

  return (
    <>
      <div className="min-h-screen bg-[#F8FAFC] pt-[68px] print:hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          <div className="xl:col-span-2 space-y-5 lg:space-y-7">
            <PackageHeader
              title={packageData.title}
              location={packageData.location.destination}
              duration={`${packageData.duration.day} Days ${packageData.duration.night} Nights`}
              rating={packageData.rating || 0}
              reviews={
                Array.isArray(packageData.reviews)
                  ? packageData.reviews.length
                  : packageData.reviews || 0
              }
              features={packageData.features}
              discount={`${packageData.discount}% OFF`}
            />

            <ImageGallery
              images={packageData.images.map((image) => image.url)}
              title={packageData.title}
            />

            <PackageDetails
              description={packageData.description}
              highlights={packageData.highlights}
              itinerary={packageData.itinerary}
              inclusions={packageData.inclusions}
              exclusions={packageData.exclusions}
              rating={packageData.rating || 0}
              reviews={
                Array.isArray(packageData.reviews)
                  ? packageData.reviews.length
                  : packageData.reviews || 0
              }
              packageId={packageData._id}
              flights={packageData.flights}
              hotels={packageData.hotels}
              sightseeings={packageData.sightseeings}
            />
          </div>

          {/* Booking sidebar */}
          <div className="space-y-5 lg:space-y-6">
            <div className="bg-white rounded-[20px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-[#E5E7EB] sticky top-[88px] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#F59E0B] uppercase tracking-widest">Special Price</span>
                {packageData.discount > 0 && (
                  <span className="bg-[#EF4444] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {packageData.discount}% OFF
                  </span>
                )}
              </div>
              {packageData.discount > 0 && (
                <div>
                  <span className="text-[13px] text-[#9CA3AF] line-through">
                    ₹{packageData.price?.toLocaleString("en-IN")}
                  </span>
                </div>
              )}
              <div className="text-[32px] font-extrabold text-[#111827] leading-none">
                ₹{Math.round(packageData.price * (1 - (packageData.discount || 0) / 100)).toLocaleString("en-IN")}
                <span className="text-[14px] text-[#6B7280] font-normal ml-1">/ Person</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="w-full flex items-center justify-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold py-3.5 px-6 rounded-[14px] shadow-md hover:shadow-lg transition-all duration-200 text-[15px]"
                >
                  <CreditCard className="w-4 h-4" /> Book Now & Payment Details
                </button>

                <button
                  onClick={handleDownloadBrochure}
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-[14px] border border-slate-800 transition-all duration-200 text-xs"
                >
                  <Download className="w-4 h-4 text-amber-400" /> Download Brochure (PDF)
                </button>

                <button
                  onClick={() => setShowInquiryForm(true)}
                  className="w-full flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-3 px-6 rounded-[14px] border border-blue-200 transition-all duration-200 text-xs"
                >
                  ✈️ Get Custom Quote
                </button>
              </div>

              {/* Quick info */}
              <div className="pt-4 border-t border-[#E5E7EB] grid grid-cols-2 gap-3">
                <div className="bg-[#F8FAFC] rounded-[10px] p-3 text-center">
                  <div className="text-[11px] text-[#9CA3AF] mb-0.5">Duration</div>
                  <div className="text-[13px] font-bold text-[#111827]">
                    {packageData.duration.day}D / {packageData.duration.night}N
                  </div>
                </div>
                <div className="bg-[#F8FAFC] rounded-[10px] p-3 text-center">
                  <div className="text-[11px] text-[#9CA3AF] mb-0.5">Rating</div>
                  <div className="text-[13px] font-bold text-[#111827]">
                    {packageData.rating ? `${packageData.rating}★` : "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Form Modal */}
      {showInquiryForm && (
        <InquiryForm
          packageTitle={packageData.title}
          packageId={packageData._id}
          destination={`${packageData.location.city}, ${packageData.location.state}, ${packageData.location.destination}`}
          onClose={() => setShowInquiryForm(false)}
        />
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <Login onClose={() => setShowLoginModal(false)} />
        </div>
      )}

      {/* Payment & Bank Details Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 text-slate-100 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 border-b border-slate-800 pb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" /> Direct Official Booking
              </div>
              <h3 className="text-2xl font-extrabold text-white">Payment & Account Details</h3>
              <p className="text-xs text-slate-400">
                To confirm your booking for <span className="text-amber-400 font-bold">{packageData.title}</span>, please deposit via IMPS/NEFT/RTGS to our official company account.
              </p>
            </div>

            {/* Bank details card */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3.5 text-xs text-slate-300">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                <span className="text-slate-400">Company Name:</span>
                <span className="font-bold text-white text-sm">TRIPTOO TRAVELS PRIVATE LIMITED</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                <span className="text-slate-400">Bank Name:</span>
                <span className="font-bold text-white">ICICI Bank</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                <span className="text-slate-400">Account Number:</span>
                <span className="font-mono font-bold text-amber-400 text-sm">924020012345678</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                <span className="text-slate-400">IFSC Code:</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">ICIC0000123</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Branch Location:</span>
                <span className="font-semibold text-white">Vasai East, 401208</span>
              </div>
            </div>

            {/* Contact & International WhatsApp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href="tel:+918767656900"
                className="p-3.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-2xl flex items-center gap-3 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">India Support Desk</p>
                  <p className="text-xs font-bold text-white">+91 8767656900</p>
                </div>
              </a>

              <a
                href={`https://wa.me/18046504477?text=Hi%20Triptoo%20Travels,%20I%20want%20to%20confirm%20my%20booking%20for%20${encodeURIComponent(packageData.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/60 rounded-2xl flex items-center gap-3 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider">International WhatsApp</p>
                  <p className="text-xs font-bold text-white">Click to Chat</p>
                </div>
              </a>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  setShowInquiryForm(true);
                }}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-2xl text-xs transition-colors"
              >
                Send Receipt &amp; Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
      </div>

      {/* ── Official PDF Brochure (Only visible on Print/PDF Export) ── */}
      <PackageBrochure packageData={packageData} />
    </>
  );
}
