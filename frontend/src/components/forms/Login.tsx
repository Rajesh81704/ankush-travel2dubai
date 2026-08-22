"use client";
import { useState } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import api from "@/lib/api";
import { setUser } from "@/store/slice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2, X, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  user?: User;
}

const RATINGS = [
  { label: "TRIP ADVISER", score: "4.5/5", color: "text-green-600", icon: "/tripadvisor.svg" },
  { label: "TRUST PILOT",  score: "4.0/5", color: "text-blue-700",  icon: "/trustpilot.svg" },
  { label: "GOOGLE",       score: "4.4/5", color: "text-yellow-500", icon: "/google.svg" },
  { label: "REVIEWS.IO",   score: "4.3/5", color: "text-green-700", icon: "/reviewsio.png" },
];

export default function Login({ onClose }: { onClose?: () => void }) {
  const [tab, setTab] = useState<"login" | "signup">("login");

  // Form fields
  const [email, setEmail]                   = useState("");
  const [password, setPassword]             = useState("");
  const [name, setName]                     = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI state
  const [showPassword, setShowPassword]         = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading]               = useState(false);
  const [error, setError]                       = useState<string | null>(null);

  const dispatch = useDispatch();
  const router   = useRouter();

  const clearForm = () => {
    setEmail("");
    setPassword("");
    setName("");
    setConfirmPassword("");
    setError(null);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const switchTab = (t: "login" | "signup") => {
    setTab(t);
    clearForm();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await api.post<ApiResponse>("/auth/login", { email, password });

      const userObj = res.data.user;
      if (userObj) {
        dispatch(setUser(userObj));
        toast.success(`Welcome back, ${userObj.name}! 👋`);
        onClose?.();
        router.push("/");
      }
    } catch (err) {
      const axiosErr = err as AxiosError<ApiResponse>;
      const msg =
        axiosErr.response?.data?.message ||
        "Login failed. Please check your credentials and try again.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Client-side validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await api.post<ApiResponse>("/auth/register", { name, email, password });

      const userObj = res.data.user;
      if (userObj) {
        dispatch(setUser(userObj));
        toast.success(`Account created! Welcome, ${userObj.name}! 🎉`);
        onClose?.();
        router.push("/");
      }
    } catch (err) {
      const axiosErr = err as AxiosError<ApiResponse>;
      const msg =
        axiosErr.response?.data?.message ||
        "Sign up failed. Please try again.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl flex overflow-hidden relative max-h-[92vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close button */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute top-4 right-4 z-50 w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 rounded-full flex items-center justify-center transition-all duration-200"
      >
        <X className="h-4 w-4" />
      </button>

      {/* ── Left — Hero Image ── */}
      <div className="hidden md:flex flex-col justify-between w-1/2 bg-gray-100 relative">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Travel adventure"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        <div className="relative z-10 p-10 flex flex-col h-full justify-end">
          <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg leading-tight">
            Your Adventure<br />Starts Here
          </h2>
          <p className="text-white/80 text-sm font-medium mb-8">
            20,000+ tours and activities from 1,200+ trusted suppliers.
          </p>
          <div className="flex flex-wrap gap-2">
            {RATINGS.map((r) => (
              <div key={r.label} className="flex items-center gap-1.5 bg-white/85 backdrop-blur-sm rounded-lg px-2.5 py-1 shadow-sm">
                <Image src={r.icon} alt={r.label} width={16} height={16} />
                <span className={`font-bold text-xs ${r.color}`}>{r.score}</span>
                <span className="text-[10px] text-gray-600 font-medium">{r.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right — Form ── */}
      <div className="w-full md:w-1/2 bg-white p-8 md:p-10 flex flex-col">
        {/* Tabs */}
        <div className="flex border-b border-gray-100 mb-7">
          <button
            type="button"
            onClick={() => switchTab("login")}
            className={cn(
              "flex-1 pb-3 text-[15px] font-semibold border-b-2 transition-colors",
              tab === "login"
                ? "border-orange-500 text-orange-500"
                : "border-transparent text-gray-400 hover:text-gray-600"
            )}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => switchTab("signup")}
            className={cn(
              "flex-1 pb-3 text-[15px] font-semibold border-b-2 transition-colors",
              tab === "signup"
                ? "border-orange-500 text-orange-500"
                : "border-transparent text-gray-400 hover:text-gray-600"
            )}
          >
            Sign Up
          </button>
        </div>

        {/* Heading */}
        <h3 className="text-[22px] font-extrabold text-gray-900 mb-1">
          {tab === "login" ? "Welcome back" : "Create your account"}
        </h3>
        <p className="text-[13px] text-gray-500 mb-6">
          {tab === "login"
            ? "Sign in to access your bookings and wishlist."
            : "Join us and start planning your dream trip."}
        </p>

        {/* Error banner */}
        {error && (
          <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 text-[13px] rounded-[10px] px-4 py-3 mb-5">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={tab === "login" ? handleLogin : handleSignup}
          className="flex flex-col gap-4"
          autoComplete="off"
        >
          {/* Name — signup only */}
          {tab === "signup" && (
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-[13px] font-semibold text-gray-700 block">
                Full Name *
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={2}
                maxLength={50}
                className="w-full px-4 py-3 border border-gray-200 rounded-[12px] text-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/15 transition-all bg-gray-50 hover:border-gray-300"
              />
            </div>
          )}

          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-[13px] font-semibold text-gray-700 block">
              Email Address *
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
              className="w-full px-4 py-3 border border-gray-200 rounded-[12px] text-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/15 transition-all bg-gray-50 hover:border-gray-300"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label htmlFor="password" className="text-[13px] font-semibold text-gray-700 block">
              Password *
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder={tab === "signup" ? "Min. 8 characters" : "Enter your password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                autoComplete={tab === "login" ? "current-password" : "new-password"}
                className="w-full px-4 py-3 pr-11 border border-gray-200 rounded-[12px] text-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/15 transition-all bg-gray-50 hover:border-gray-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password — signup only */}
          {tab === "signup" && (
            <div className="space-y-1.5">
              <label htmlFor="confirm-password" className="text-[13px] font-semibold text-gray-700 block">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  className={cn(
                    "w-full px-4 py-3 pr-11 border rounded-[12px] text-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all bg-gray-50",
                    confirmPassword && password !== confirmPassword
                      ? "border-red-300 focus:border-red-400 focus:ring-red-400/15"
                      : confirmPassword && password === confirmPassword
                      ? "border-green-300 focus:border-green-400 focus:ring-green-400/15"
                      : "border-gray-200 focus:border-orange-400 focus:ring-orange-400/15 hover:border-gray-300"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                {/* Match indicator */}
                {confirmPassword && (
                  <div className="absolute right-10 top-1/2 -translate-y-1/2">
                    {password === confirmPassword ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-400" />
                    )}
                  </div>
                )}
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-[11px] text-red-500 mt-1">Passwords do not match</p>
              )}
            </div>
          )}

          {/* Forgot password */}
          {tab === "login" && (
            <div className="text-right -mt-1">
              <a href="#" className="text-[12px] text-orange-500 hover:text-orange-600 font-medium hover:underline">
                Forgot password?
              </a>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-3 rounded-[12px] text-[14px] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md mt-1"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {tab === "login" ? "Signing in..." : "Creating account..."}
              </>
            ) : (
              tab === "login" ? "Sign In" : "Create Account"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <Separator className="flex-1" />
          <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap">or continue with</span>
          <Separator className="flex-1" />
        </div>

        {/* Google OAuth */}
        <Link
          href="/api/auth/google"
        >
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2.5 border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-[12px] text-[14px] transition-all duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#4285F4" d="M43.6 20.5h-1.9V20H24v8h11.3c-1.6 4.3-5.7 7-11.3 7-6.6 0-12-5.4-12-12s5.4-12 12-12c2.6 0 5 .8 7 2.3l5.7-5.7C34.1 6.5 29.3 4.5 24 4.5 12.7 4.5 3.5 13.7 3.5 25S12.7 45.5 24 45.5c10.5 0 20-8.5 20-20 0-1.3-.1-2.2-.4-3z" />
              <path fill="#34A853" d="M6.3 14.1l6.6 4.8C14.5 16.1 18.8 13 24 13c2.6 0 5 .8 7 2.3l5.7-5.7C34.1 6.5 29.3 4.5 24 4.5c-7.1 0-13.2 4.1-16.3 10.1z" />
              <path fill="#FBBC05" d="M24 45.5c5.3 0 10.1-1.8 13.8-4.9l-6.4-5.2c-2 1.4-4.5 2.2-7.4 2.2-5.6 0-10.3-3.7-12-8.7l-6.6 5.1C7.1 41.1 14.9 45.5 24 45.5z" />
              <path fill="#EA4335" d="M43.6 20.5h-1.9V20H24v8h11.3c-1.1 3-3.6 5.2-6.6 6.1l6.4 5.2c3.7-3.4 6-8.4 6-14.3 0-1.3-.1-2.2-.4-3z" />
            </svg>
            Continue with Google
          </button>
        </Link>

        {/* Terms */}
        <p className="mt-5 text-center text-[11px] text-gray-400 leading-relaxed">
          By continuing, you agree to our{" "}
          <a href="#" className="text-orange-500 hover:underline">Terms of Service</a>
          {" "}and{" "}
          <a href="#" className="text-orange-500 hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
