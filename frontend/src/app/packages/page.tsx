"use client";
import { PackageCard } from "@/components/cards/package";
import { Button } from "@/components/ui/button";
import {
  AlertCircle, ChevronDown, SlidersHorizontal,
  Search, ChevronLeft, ChevronRight, X,
} from "lucide-react";
import { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PackageData } from "@/components/packages/types";
import api from "@/lib/api";

interface FilterMeta {
  categories: string[];
  states: string[];
  priceRange: { min: number; max: number; minDays: number; maxDays: number };
}

interface Pagination {
  total: number; page: number; limit: number;
  pages: number; hasNext: boolean; hasPrev: boolean;
}

const SORT_OPTIONS = [
  { id: "newest",     label: "Newest First" },
  { id: "popular",    label: "Most Popular" },
  { id: "price-asc",  label: "Price: Low → High" },
  { id: "price-desc", label: "Price: High → Low" },
  { id: "discount",   label: "Best Discount" },
];

const DURATION_OPTIONS = [
  { label: "1 – 3 Days",  minDays: 1,  maxDays: 3  },
  { label: "4 – 6 Days",  minDays: 4,  maxDays: 6  },
  { label: "7 – 9 Days",  minDays: 7,  maxDays: 9  },
  { label: "10+ Days",    minDays: 10, maxDays: 999 },
];

const PackagesContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // ── Filter state ──────────────────────────────────────────────────────────
  const [searchInput, setSearchInput]         = useState(searchParams.get("search") || "");
  const [category, setCategory]               = useState(searchParams.get("category") || "");
  const [sortBy, setSortBy]                   = useState(searchParams.get("sort") || "newest");
  const initialLoc = searchParams.get("state") || searchParams.get("destination") || searchParams.get("city") || "";
  const [selectedStates, setSelectedStates]   = useState<string[]>(initialLoc ? [initialLoc] : []);
  const [durationFilter, setDurationFilter]   = useState<{ minDays?: number; maxDays?: number }>({});
  const [onSale, setOnSale]                   = useState(false);
  const [minPrice, setMinPrice]               = useState<string>("");
  const [maxPrice, setMaxPrice]               = useState<string>("");
  const [page, setPage]                       = useState(1);

  // ── UI state ──────────────────────────────────────────────────────────────
  const [packageData, setPackageData]         = useState<PackageData[]>([]);
  const [filterMeta, setFilterMeta]           = useState<FilterMeta | null>(null);
  const [pagination, setPagination]           = useState<Pagination | null>(null);
  const [loading, setLoading]                 = useState(true);
  const [error, setError]                     = useState<string | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // ── Load filter metadata once ─────────────────────────────────────────────
  useEffect(() => {
    api.get<{ success: boolean; filters: FilterMeta }>("/packages/filters/meta")
      .then((res) => setFilterMeta(res.data.filters))
      .catch(() => {/* non-critical */});
  }, []);

  // ── Fetch packages whenever filters change ────────────────────────────────
  const fetchPackages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (searchInput.trim())                  params.set("search",   searchInput.trim());
      if (category && category !== "all")      params.set("category", category);
      if (sortBy)                              params.set("sortBy",   sortBy);
      if (selectedStates.length)               params.set("state",    selectedStates[0]);
      if (durationFilter.minDays)              params.set("minDays",  String(durationFilter.minDays));
      if (durationFilter.maxDays && durationFilter.maxDays < 999)
                                               params.set("maxDays",  String(durationFilter.maxDays));
      if (onSale)                              params.set("onSale",   "true");
      if (minPrice)                            params.set("minPrice", minPrice);
      if (maxPrice)                            params.set("maxPrice", maxPrice);
      params.set("page",  String(page));
      params.set("limit", "12");

      const res = await api.get<{ success: boolean; packages: PackageData[]; pagination: Pagination }>(
        `/packages?${params.toString()}`
      );
      setPackageData(res.data.packages || []);
      setPagination(res.data.pagination || null);
    } catch {
      setPackageData([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }, [searchInput, category, sortBy, selectedStates, durationFilter, onSale, minPrice, maxPrice, page]);

  useEffect(() => { fetchPackages(); }, [fetchPackages]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); setPage(1); fetchPackages(); };
  const handleApplyFilters = () => { setPage(1); fetchPackages(); setMobileFilterOpen(false); };
  const handleResetFilters = () => {
    setCategory(""); setSortBy("newest"); setSelectedStates([]);
    setDurationFilter({}); setOnSale(false); setMinPrice(""); setMaxPrice("");
    setSearchInput(""); setPage(1);
  };
  const handlePackageClick = (id: string) => router.push(`/packages/${id}`);

  const activeFilterCount = [
    category && category !== "all", selectedStates.length > 0,
    durationFilter.minDays, onSale, minPrice, maxPrice,
  ].filter(Boolean).length;

  if (error) return (
    <div className="min-h-screen flex items-center justify-center pt-[68px] bg-[#F8FAFC]">
      <div className="text-center max-w-sm mx-auto p-10 bg-white rounded-[20px] shadow-sm border border-[#E5E7EB]">
        <AlertCircle className="h-14 w-14 text-[#EF4444] mx-auto mb-4" />
        <h2 className="text-[20px] font-extrabold text-[#111827] mb-2">Something went wrong</h2>
        <p className="text-[#6B7280] text-sm mb-7">{error}</p>
        <Button onClick={() => window.location.reload()} className="bg-[#2563EB] hover:bg-[#1D4ED8] rounded-full px-8">
          Try Again
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* ── Hero ── */}
      <section className="relative overflow-visible pt-[68px]">
        <div className="relative h-[260px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Packages"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 35%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-[1320px] mx-auto w-full px-6 lg:px-16">
              <h1 className="text-[2.2rem] sm:text-[2.6rem] font-extrabold leading-tight drop-shadow-lg">
                <span className="text-white block">Handpicked Packages</span>
                <span className="block" style={{ color: "#F59E0B", fontStyle: "italic", fontFamily: "Georgia, serif" }}>
                  For Your Dream Journey
                </span>
              </h1>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 -mt-[26px] relative z-20">
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-[14px] shadow-[0_8px_40px_rgba(0,0,0,0.14)] border border-[#E5E7EB] px-4 sm:px-5 py-3.5"
          >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0">
              <div className="flex items-center gap-2.5 flex-1 sm:px-4 py-1">
                <Search className="h-4 w-4 text-[#2563EB] shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-0.5">Search</p>
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Destination, package name..."
                    className="w-full text-[13px] text-[#374151] font-medium placeholder-[#9CA3AF] outline-none bg-transparent"
                  />
                </div>
              </div>
              <div className="hidden sm:block w-px h-8 bg-[#E5E7EB] shrink-0" />
              <div className="flex items-center gap-2.5 flex-1 sm:px-4 py-1">
                <SlidersHorizontal className="h-4 w-4 text-[#2563EB] shrink-0" />
                <div className="flex-1">
                  <p className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-0.5">Sort By</p>
                  <select
                    value={sortBy}
                    onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
                    className="w-full text-[13px] text-[#374151] font-medium outline-none bg-transparent cursor-pointer"
                  >
                    {SORT_OPTIONS.map(({ id, label }) => <option key={id} value={id}>{label}</option>)}
                  </select>
                </div>
              </div>
              <div className="sm:ml-3 shrink-0">
                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold px-6 py-2.5 rounded-[10px] text-[13px] transition-all duration-200 whitespace-nowrap"
                >
                  <Search className="h-3.5 w-3.5" /> Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-[1320px] mx-auto px-6 lg:px-8 py-3 text-[12px] text-[#9CA3AF]">
        <span className="hover:text-[#2563EB] cursor-pointer" onClick={() => router.push("/")}>Home</span>
        <span className="mx-2">›</span>
        <span className="text-[#374151] font-semibold">Packages</span>
      </div>

      {/* Main */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex flex-col lg:flex-row gap-7">

          {/* ── Sidebar ─────────────────────────────────────────────────── */}
          <aside className="lg:w-[240px] shrink-0">
            {/* Mobile toggle */}
            <button
              className="lg:hidden w-full flex items-center justify-between bg-white rounded-[14px] border border-[#E5E7EB] px-4 py-3 mb-3 shadow-sm"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            >
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-[#2563EB]" />
                <span className="font-semibold text-[#111827] text-sm">Filters</span>
                {activeFilterCount > 0 && (
                  <span className="bg-[#2563EB] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </div>
              <ChevronDown className={`h-4 w-4 text-[#9CA3AF] transition-transform ${mobileFilterOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Filter panel */}
            <div className={`bg-white rounded-[20px] border border-[#E5E7EB] p-5 lg:sticky lg:top-[140px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] space-y-5 ${mobileFilterOpen ? "block" : "hidden lg:block"}`}>

              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-[#2563EB]" />
                  <span className="font-bold text-[#111827] text-[15px]">Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="bg-blue-100 text-[#2563EB] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                </div>
                <button
                  onClick={handleResetFilters}
                  className="text-[12px] text-[#EF4444] hover:underline font-semibold flex items-center gap-1"
                >
                  <X className="h-3 w-3" /> Reset
                </button>
              </div>

              {/* Category */}
              <div>
                <p className="text-[10px] font-extrabold text-[#9CA3AF] uppercase tracking-widest mb-2.5">Category</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="radio" name="cat"
                      checked={!category || category === "all"}
                      onChange={() => setCategory("all")}
                      className="accent-[#2563EB] w-3.5 h-3.5"
                    />
                    <span className={`text-[13px] ${!category || category === "all" ? "text-[#2563EB] font-semibold" : "text-[#374151]"}`}>
                      All Packages
                    </span>
                  </label>
                  {(filterMeta?.categories?.length
                    ? filterMeta.categories
                    : ["Adventure", "Cultural", "Luxury", "Budget", "Honeymoon", "Family", "Nature & Adventure"]
                  ).map((cat) => (
                    <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="radio" name="cat"
                        checked={category === cat}
                        onChange={() => setCategory(cat)}
                        className="accent-[#2563EB] w-3.5 h-3.5"
                      />
                      <span className={`text-[13px] ${category === cat ? "text-[#2563EB] font-semibold" : "text-[#374151] group-hover:text-[#111827]"}`}>
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-px bg-[#F3F4F6]" />

              {/* Duration */}
              <div>
                <p className="text-[10px] font-extrabold text-[#9CA3AF] uppercase tracking-widest mb-2.5">Trip Duration</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="radio" name="dur"
                      checked={!durationFilter.minDays}
                      onChange={() => setDurationFilter({})}
                      className="accent-[#2563EB] w-3.5 h-3.5"
                    />
                    <span className={`text-[13px] ${!durationFilter.minDays ? "text-[#2563EB] font-semibold" : "text-[#374151]"}`}>
                      Any Duration
                    </span>
                  </label>
                  {DURATION_OPTIONS.map(({ label, minDays, maxDays }) => (
                    <label key={label} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="radio" name="dur"
                        checked={durationFilter.minDays === minDays && durationFilter.maxDays === maxDays}
                        onChange={() => setDurationFilter({ minDays, maxDays })}
                        className="accent-[#2563EB] w-3.5 h-3.5"
                      />
                      <span className={`text-[13px] ${durationFilter.minDays === minDays ? "text-[#2563EB] font-semibold" : "text-[#374151] group-hover:text-[#111827]"}`}>
                        {label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-px bg-[#F3F4F6]" />

              {/* Price range */}
              <div>
                <p className="text-[10px] font-extrabold text-[#9CA3AF] uppercase tracking-widest mb-2.5">Price Range (₹)</p>
                <div className="flex gap-2">
                  <input
                    type="number" value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder={filterMeta ? String(filterMeta.priceRange.min) : "Min"}
                    className="w-full px-3 py-2 text-[13px] border border-[#E5E7EB] rounded-[10px] bg-[#F8FAFC] text-[#374151] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/10"
                  />
                  <input
                    type="number" value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder={filterMeta ? String(filterMeta.priceRange.max) : "Max"}
                    className="w-full px-3 py-2 text-[13px] border border-[#E5E7EB] rounded-[10px] bg-[#F8FAFC] text-[#374151] placeholder-[#9CA3AF] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/10"
                  />
                </div>
              </div>

              {/* On Sale */}
              <label className="flex items-center gap-2.5 cursor-pointer bg-[#FFFBEB] p-3 rounded-[10px] border border-[#FDE68A]">
                <input
                  type="checkbox" checked={onSale}
                  onChange={(e) => setOnSale(e.target.checked)}
                  className="accent-[#F59E0B] w-4 h-4 rounded"
                />
                <div>
                  <span className="text-[13px] text-[#92400E] font-semibold">On Sale Only</span>
                  <p className="text-[11px] text-[#B45309] mt-0.5">Packages with active discounts</p>
                </div>
              </label>

              {/* Apply */}
              <button
                onClick={handleApplyFilters}
                className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold py-3 rounded-[12px] text-[13px] transition-all duration-200 hover:shadow-md"
              >
                Apply Filters
              </button>
            </div>
          </aside>

          {/* ── Package Grid ──────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Results header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-[22px] font-extrabold text-[#111827]">Travel Packages</h2>
                <p className="text-[13px] text-[#6B7280] mt-0.5">
                  {loading ? "Loading..." : pagination
                    ? `${pagination.total} package${pagination.total !== 1 ? "s" : ""} found`
                    : `${packageData.length} packages`}
                  {searchInput && (
                    <span className="ml-1.5 text-[#2563EB] font-semibold">for &quot;{searchInput}&quot;</span>
                  )}
                </p>
              </div>
            </div>

            {/* Loading skeleton */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] animate-pulse shadow-sm">
                    <div className="h-52 bg-[#F3F4F6]" />
                    <div className="p-4 space-y-3">
                      <div className="h-3 bg-[#F3F4F6] rounded w-2/3" />
                      <div className="h-4 bg-[#F3F4F6] rounded w-full" />
                      <div className="h-3 bg-[#F3F4F6] rounded w-1/2" />
                      <div className="flex justify-between pt-2 border-t border-[#F3F4F6]">
                        <div className="h-5 bg-[#F3F4F6] rounded w-1/3" />
                        <div className="h-8 bg-[#F3F4F6] rounded w-1/4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : packageData.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-[20px] border border-[#E5E7EB] shadow-sm">
                <div className="text-5xl mb-4">🗺️</div>
                <h3 className="text-[18px] font-bold text-[#111827] mb-2">No packages found</h3>
                <p className="text-[#6B7280] text-sm mb-6">Try adjusting your filters or search terms.</p>
                <button onClick={handleResetFilters} className="text-[#2563EB] hover:underline text-sm font-semibold">
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {packageData.map((pkg) => (
                  <PackageCard key={pkg._id} pkg={pkg} handlePackageClick={() => handlePackageClick(pkg._id)} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.pages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  disabled={!pagination.hasPrev}
                  onClick={() => setPage((p) => p - 1)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[#6B7280] border border-[#E5E7EB] bg-white hover:border-[#2563EB] hover:text-[#2563EB] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {Array.from({ length: pagination.pages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === pagination.pages || Math.abs(p - page) <= 1)
                  .map((p, idx, arr) => (
                    <>
                      {idx > 0 && arr[idx - 1] !== p - 1 && (
                        <span key={`ellipsis-${p}`} className="text-[#9CA3AF] px-1">…</span>
                      )}
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-semibold transition-all shadow-sm ${
                          p === page
                            ? "bg-[#2563EB] text-white shadow-md"
                            : "text-[#6B7280] border border-[#E5E7EB] bg-white hover:border-[#2563EB] hover:text-[#2563EB]"
                        }`}
                      >
                        {p}
                      </button>
                    </>
                  ))}

                <button
                  disabled={!pagination.hasNext}
                  onClick={() => setPage((p) => p + 1)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[#6B7280] border border-[#E5E7EB] bg-white hover:border-[#2563EB] hover:text-[#2563EB] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Packages = () => (
  <Suspense fallback={
    <div className="min-h-screen flex items-center justify-center pt-[68px] bg-[#F8FAFC]">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-4 border-[#E5E7EB] border-t-[#2563EB] animate-spin mx-auto mb-4" />
        <p className="text-[#6B7280] font-medium">Loading packages...</p>
      </div>
    </div>
  }>
    <PackagesContent />
  </Suspense>
);

export default Packages;
