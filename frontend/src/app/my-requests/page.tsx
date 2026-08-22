"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText,
  Compass,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  MapPin,
  Calendar,
  Phone,
  Mail,
  ArrowRight,
  Loader2,
  Sparkles,
  User,
  ShieldCheck,
  Globe,
} from "lucide-react";
import api from "@/lib/api";
import { useAppSelector } from "@/store/hooks";

interface PackageInquiryItem {
  _id: string;
  name: string;
  mobileNumber: string;
  email: string;
  destination: string;
  message: string;
  packageId?: {
    _id: string;
    title: string;
    category?: string;
    price?: number;
    images?: { url: string }[];
  } | null;
  createdAt: string;
}

interface VisaInquiryItem {
  _id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  visaType: string;
  passportNumber?: string;
  travelDate?: string;
  message?: string;
  status: "pending" | "in-review" | "approved" | "rejected";
  createdAt: string;
}

export default function MyRequestsPage() {
  const { user, isLoggedIn, isLoading: isAuthLoading } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState<"packages" | "visa">("packages");
  
  const [packageInquiries, setPackageInquiries] = useState<PackageInquiryItem[]>([]);
  const [visaInquiries, setVisaInquiries] = useState<VisaInquiryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const [pkgRes, visaRes] = await Promise.allSettled([
          api.get("/inquiries/my-requests"),
          api.get("/visa/my-requests"),
        ]);

        if (pkgRes.status === "fulfilled" && pkgRes.value?.data) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const resData = pkgRes.value.data as any;
          const list = Array.isArray(resData)
            ? resData
            : resData.data || resData.inquiries || resData.packageInquiries || [];
          setPackageInquiries(list);
        }

        if (visaRes.status === "fulfilled" && visaRes.value?.data) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const resData = visaRes.value.data as any;
          const list = Array.isArray(resData)
            ? resData
            : resData.visaInquiries || resData.data || resData.inquiries || [];
          setVisaInquiries(list);
        }
      } catch (err) {
        console.error("Error fetching my requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isLoggedIn]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" /> Approved
          </span>
        );
      case "in-review":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Clock className="w-3.5 h-3.5" /> Under Review
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 border border-rose-500/30 text-rose-400">
            <XCircle className="w-3.5 h-3.5" /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 border border-blue-500/30 text-blue-400">
            <AlertCircle className="w-3.5 h-3.5" /> Pending Confirmation
          </span>
        );
    }
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-amber-400 space-y-3">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="text-xs text-slate-400 font-medium">Checking authentication...</span>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-md w-full bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl relative z-10">
          <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center mx-auto text-amber-400">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Sign In Required</h2>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Please log in to your account to view your travel package inquiries and visa application status.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow-lg shadow-amber-500/10"
          >
            Go to Homepage &amp; Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="pt-28 pb-20 px-6 lg:px-12 max-w-7xl mx-auto space-y-10 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-900 pb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              My Requests &amp; <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">Applications</span>
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Track the status of your submitted travel package inquiries and visa applications for <span className="text-white font-medium">{user?.email}</span>
            </p>
          </div>

          {/* Quick stats summary */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl px-4 py-3 text-center min-w-[110px]">
              <span className="text-2xl font-extrabold text-amber-400 block">{packageInquiries.length}</span>
              <span className="text-[11px] text-slate-400 font-medium">Tour Requests</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl px-4 py-3 text-center min-w-[110px]">
              <span className="text-2xl font-extrabold text-blue-400 block">{visaInquiries.length}</span>
              <span className="text-[11px] text-slate-400 font-medium">Visa Requests</span>
            </div>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex items-center gap-3 border-b border-slate-900 pb-1">
          <button
            onClick={() => setActiveTab("packages")}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 border ${
              activeTab === "packages"
                ? "bg-amber-500 text-slate-950 border-amber-500 shadow-lg shadow-amber-500/10"
                : "bg-slate-900/60 text-slate-400 border-slate-800/80 hover:text-white hover:border-slate-700"
            }`}
          >
            <Compass className="w-4 h-4" /> Tour Package Inquiries ({packageInquiries.length})
          </button>
          <button
            onClick={() => setActiveTab("visa")}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 border ${
              activeTab === "visa"
                ? "bg-amber-500 text-slate-950 border-amber-500 shadow-lg shadow-amber-500/10"
                : "bg-slate-900/60 text-slate-400 border-slate-800/80 hover:text-white hover:border-slate-700"
            }`}
          >
            <FileText className="w-4 h-4" /> Visa Applications ({visaInquiries.length})
          </button>
        </div>

        {/* Content area */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20 text-amber-400 space-y-3">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-xs text-slate-400 font-medium">Loading your requests...</span>
          </div>
        ) : activeTab === "packages" ? (
          /* Package Inquiries List */
          <div>
            {packageInquiries.length === 0 ? (
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto">
                <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center mx-auto text-amber-400">
                  <Compass className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">No Package Inquiries Found</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    You haven&apos;t submitted any package inquiries yet. Explore our top tour packages to start planning!
                  </p>
                </div>
                <Link
                  href="/packages"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow-md"
                >
                  Explore Packages <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {packageInquiries.map((inquiry) => (
                  <div
                    key={inquiry._id}
                    className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 hover:border-amber-500/40 transition-all duration-300 shadow-xl space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                            Target Destination
                          </span>
                          <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-amber-400 shrink-0" /> {inquiry.destination}
                          </h3>
                        </div>
                        {getStatusBadge("pending")}
                      </div>

                      {inquiry.packageId && typeof inquiry.packageId === "object" && (
                        <div className="bg-slate-950/60 rounded-2xl border border-slate-800/60 p-3.5 flex items-center gap-3">
                          {inquiry.packageId.images?.[0]?.url ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              src={inquiry.packageId.images[0].url}
                              alt={inquiry.packageId.title}
                              className="w-12 h-12 rounded-xl object-cover shrink-0"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 text-slate-400">
                              ✈️
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Selected Package</span>
                            <h4 className="text-xs font-bold text-white truncate">{inquiry.packageId.title}</h4>
                            {inquiry.packageId.price && (
                              <span className="text-xs font-bold text-amber-400">₹{inquiry.packageId.price.toLocaleString("en-IN")}</span>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800/60">
                        <p className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-slate-500" /> Contact Name: <span className="text-white font-medium">{inquiry.name}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-slate-500" /> Mobile: <span className="text-white font-medium">{inquiry.mobileNumber}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-slate-500" /> Email: <span className="text-white font-medium">{inquiry.email}</span>
                        </p>
                        {inquiry.message && (
                          <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/40 text-[11px] text-slate-400 leading-relaxed italic">
                            &quot;{inquiry.message}&quot;
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Submitted on {new Date(inquiry.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                      <span className="text-amber-400/80 font-medium">Expert Callback Scheduled</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Visa Applications List */
          <div>
            {visaInquiries.length === 0 ? (
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto">
                <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center mx-auto text-amber-400">
                  <FileText className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">No Visa Applications Found</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    You haven&apos;t submitted any visa requests yet. Check out our visa services to get started!
                  </p>
                </div>
                <Link
                  href="/visa"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow-md"
                >
                  Explore Visa Services <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {visaInquiries.map((visa) => (
                  <div
                    key={visa._id}
                    className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 hover:border-amber-500/40 transition-all duration-300 shadow-xl space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider block">
                            Destination Country
                          </span>
                          <h3 className="text-xl font-bold text-white flex items-center gap-2 mt-0.5">
                            <Globe className="w-4 h-4 text-amber-400" /> {visa.country}
                          </h3>
                        </div>
                        {getStatusBadge(visa.status)}
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-slate-950/60 border border-slate-800/60 rounded-xl p-2.5">
                          <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Visa Type</span>
                          <span className="font-bold text-slate-200">{visa.visaType}</span>
                        </div>
                        {visa.passportNumber && (
                          <div className="bg-slate-950/60 border border-slate-800/60 rounded-xl p-2.5">
                            <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Passport No</span>
                            <span className="font-bold text-slate-200">{visa.passportNumber}</span>
                          </div>
                        )}
                        {visa.travelDate && (
                          <div className="bg-slate-950/60 border border-slate-800/60 rounded-xl p-2.5 col-span-2">
                            <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Expected Travel Date</span>
                            <span className="font-bold text-slate-200 flex items-center gap-1.5 mt-0.5">
                              <Calendar className="w-3.5 h-3.5 text-amber-400" /> {visa.travelDate}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800/60">
                        <p className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-slate-500" /> Applicant: <span className="text-white font-medium">{visa.name}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-slate-500" /> Phone: <span className="text-white font-medium">{visa.phone}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-slate-500" /> Email: <span className="text-white font-medium">{visa.email}</span>
                        </p>
                        {visa.message && (
                          <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/40 text-[11px] text-slate-400 leading-relaxed italic mt-2">
                            &quot;{visa.message}&quot;
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Applied on {new Date(visa.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                      <span className="text-emerald-400/90 flex items-center gap-1 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5" /> Priority Filing Active
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
