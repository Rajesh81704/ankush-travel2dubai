"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User, LogOut, MapPin, FileText } from "lucide-react";
import Login from "../forms/Login";
import { useAppSelector, useAppDispatch, logoutThunk } from "@/store";
import Image from "next/image";

const NAV_ITEMS = [
  { name: "Home", path: "/" },
  { name: "Packages", path: "/packages" },
  { name: "Visa Services", path: "/visa" },
  { name: "About Us", path: "/about" },
  { name: "B2B Partnership", path: "/b2b" },
  { name: "Contact Us", path: "/contact" },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const location = usePathname();
  const dispatch = useAppDispatch();
  const { isLoggedIn, isLoading } = useAppSelector((state) => state.auth);

  const isActive = useCallback((path: string) => location === path, [location]);
  const navItems = useMemo(() => NAV_ITEMS, []);
  const isHomePage = location === "/";

  useEffect(() => {
    let last = false;
    const handleScroll = () => {
      const scrolled = window.scrollY > 60;
      if (scrolled !== last) {
        setIsScrolled(scrolled);
        last = scrolled;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const handleMenuToggle = useCallback(() => setIsMenuOpen((o) => !o), []);
  const handleMenuClose = useCallback(() => setIsMenuOpen(false), []);
  const handleLoginOpen = useCallback(() => { setIsLoginOpen(true); handleMenuClose(); }, [handleMenuClose]);
  const handleLoginClose = useCallback(() => setIsLoginOpen(false), []);
  const handleLogout = useCallback(() => dispatch(logoutThunk()), [dispatch]);

  // Navbar background
  const navBg = isScrolled
    ? "bg-slate-800/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.3)]"
    : isHomePage
    ? "bg-transparent"
    : "bg-slate-800 shadow-[0_2px_12px_rgba(0,0,0,0.3)]";

  const isLight = false; // Always dark mode now

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 print:hidden ${navBg}`}>
        <div className="max-w-[1320px] mx-auto px-5 lg:px-10">
          <div className="flex items-center justify-between h-[78px]">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0 py-1">
              <Image
                src="/logo.png"
                alt="TripToo Travels"
                width={200}
                height={60}
                className="h-12 sm:h-14 lg:h-16 w-auto object-contain transition-transform duration-200 hover:scale-105"
                priority
              />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map(({ name, path }) => (
                <Link
                  key={name}
                  href={path}
                  className={`
                    relative px-4 py-2 rounded-full text-[14.5px] font-medium transition-all duration-200
                    ${isActive(path)
                      ? isLight
                        ? "text-[#2563EB] bg-blue-900/20"
                        : "text-white bg-white/15"
                      : isLight
                        ? "text-white hover:text-white hover:bg-slate-700"
                        : "text-white/85 hover:text-white hover:bg-white/10"
                    }
                  `}
                >
                  {name}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2.5">

              {/* Explore destinations shortcut */}
              <Link
                href="/packages"
                className={`
                  flex items-center gap-1.5 text-[13.5px] font-medium px-3.5 py-2 rounded-full transition-all duration-200
                  ${isLight
                    ? "text-white hover:text-[#2563EB] hover:bg-blue-900/20"
                    : "text-white/75 hover:text-white hover:bg-white/10"
                  }
                `}
              >
                <MapPin className="h-4 w-4" />
                Explore
              </Link>

              {/* My Requests button when logged in */}
              {isLoggedIn && (
                <Link
                  href="/my-requests"
                  className="flex items-center gap-1.5 text-[13.5px] font-medium px-4 py-2 rounded-full border border-amber-500/40 text-amber-300 hover:bg-amber-500/10 transition-all duration-200"
                >
                  <FileText className="h-4 w-4" />
                  My Requests
                </Link>
              )}

              {/* Divider */}
              <span className={`w-px h-5 ${isLight ? "bg-slate-600" : "bg-white/20"}`} />

              {/* Sign In / Logout */}
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  disabled={isLoading}
                  className={`
                    flex items-center gap-1.5 text-[13.5px] font-medium px-4 py-2 rounded-full border transition-all duration-200
                    ${isLight
                      ? "border-slate-600 text-white hover:border-red-500/50 hover:text-red-400 hover:bg-red-500/10"
                      : "border-white/30 text-white/90 hover:bg-white/10 hover:text-white"
                    }
                  `}
                >
                  <LogOut className="h-4 w-4" />
                  {isLoading ? "..." : "Logout"}
                </button>
              ) : (
                <button
                  onClick={handleLoginOpen}
                  disabled={isLoading}
                  className={`
                    flex items-center gap-1.5 text-[13.5px] font-medium px-4 py-2 rounded-full border transition-all duration-200
                    ${isLight
                      ? "border-slate-600 text-white hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-blue-900/20"
                      : "border-white/30 text-white/90 hover:bg-white/10 hover:text-white"
                    }
                  `}
                >
                  <User className="h-4 w-4" />
                  {isLoading ? "..." : "Sign In"}
                </button>
              )}

              {/* CTA */}
              <Link href="/contact">
                <button className="
                  flex items-center gap-1.5 text-[13.5px] font-semibold px-5 py-2.5 rounded-full
                  bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600
                  text-white shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-px
                ">
                  Book Now
                </button>
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={handleMenuToggle}
              className={`
                lg:hidden p-2 rounded-xl transition-colors
                ${isLight
                  ? "text-white hover:bg-slate-700"
                  : "text-white hover:bg-white/10"
                }
              `}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleMenuClose}
      />

      {/* Mobile Drawer */}
      <div
        className={`
          fixed top-0 right-0 w-[280px] h-full z-50 bg-slate-800 flex flex-col
          shadow-2xl transform transition-transform duration-300 ease-out lg:hidden
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700">
          <Image src="/logo.png" alt="TripToo Travels" width={150} height={48} className="h-10 w-auto object-contain" />
          <button
            onClick={handleMenuClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(({ name, path }) => (
            <Link
              key={name}
              href={path}
              onClick={handleMenuClose}
              className={`
                flex items-center px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-200
                ${isActive(path)
                  ? "bg-blue-900/30 text-[#2563EB]"
                  : "text-slate-300 hover:bg-slate-700 hover:text-slate-100"
                }
              `}
            >
              {name}
            </Link>
          ))}
        </nav>

        {/* Drawer Footer */}
        <div className="px-4 py-5 border-t border-slate-700 space-y-2.5">
          {isLoggedIn && (
            <Link
              href="/my-requests"
              onClick={handleMenuClose}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-amber-500/40 text-amber-300 text-sm font-medium hover:bg-amber-500/10 transition-colors"
            >
              <FileText className="h-4 w-4" />
              My Requests
            </Link>
          )}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-600 text-slate-300 text-sm font-medium hover:border-red-500/50 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          ) : (
            <button
              onClick={handleLoginOpen}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-600 text-slate-300 text-sm font-medium hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-blue-900/20 transition-colors"
            >
              <User className="h-4 w-4" />
              Sign In
            </button>
          )}
          <Link href="/contact" onClick={handleMenuClose}>
            <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white text-sm font-semibold shadow-sm transition-all duration-200">
              Book Now
            </button>
          </Link>
        </div>
      </div>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <Login onClose={handleLoginClose} />
        </div>
      )}
    </>
  );
};
