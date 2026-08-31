"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { setUser, User } from "@/store/slice";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "sonner";
import api from "@/lib/api";
import { ShieldCheck, Lock, User as UserIcon, Globe, Sparkles } from "lucide-react";

interface LoginForm {
  identifier: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<LoginForm>();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoading(true);
      const response = await api.post("/auth/admin/login", {
        identifier: data.identifier,
        password: data.password,
      });
      if (response.status === 200) {
        toast.success("Welcome back! Admin login successful.");
        dispatch(setUser(response.data as User));
        router.push("/");
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      toast.error(err.response?.data?.message || err.message || "Invalid credentials or login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-slate-950 px-4 overflow-hidden">
      {/* Background Decorative Glow Gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-sky-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Glassmorphism Card */}
      <Card className="w-full max-w-md bg-slate-900/80 backdrop-blur-2xl border border-amber-500/20 text-slate-100 shadow-[0_0_50px_rgba(245,158,11,0.12)] rounded-3xl relative z-10 p-2 sm:p-4">
        <CardHeader className="text-center space-y-3 pb-6 border-b border-slate-800/80">
          {/* Logo Badge */}
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 via-amber-600/10 to-amber-500/5 border border-amber-500/30 flex items-center justify-center shadow-inner relative group">
            <Globe className="w-8 h-8 text-amber-400 transition-transform duration-300 group-hover:rotate-12" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900 animate-pulse" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-[11px] font-bold uppercase tracking-wider mb-2 border border-amber-500/20">
              <Sparkles className="w-3.5 h-3.5" /> Management Console
            </div>
            <CardTitle className="text-2xl font-extrabold tracking-tight text-white">
              Travel2Dubai Admin
            </CardTitle>
            <p className="text-xs text-slate-400 mt-1">
              Authorized Portal Access & Content Management System
            </p>
          </div>
        </CardHeader>

        <CardContent className="pt-6 flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
              {/* Identifier Field */}
              <FormItem className="space-y-1.5">
                <FormLabel className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <UserIcon className="w-3.5 h-3.5 text-amber-400" /> Username or Email
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="admin@travel2dubai.co.in"
                      {...form.register("identifier")}
                      className="bg-slate-950/80 border-slate-800 focus:border-amber-500 focus:ring-amber-500/20 text-slate-100 placeholder:text-slate-600 rounded-xl h-11 transition-all"
                    />
                  </div>
                </FormControl>
              </FormItem>

              {/* Password Field */}
              <FormItem className="space-y-1.5">
                <FormLabel className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-400" /> Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="password"
                      placeholder="••••••••••••"
                      {...form.register("password")}
                      className="bg-slate-950/80 border-slate-800 focus:border-amber-500 focus:ring-amber-500/20 text-slate-100 placeholder:text-slate-600 rounded-xl h-11 transition-all"
                    />
                  </div>
                </FormControl>
              </FormItem>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:to-amber-500 text-slate-950 font-extrabold text-sm py-3 rounded-xl shadow-lg shadow-amber-500/25 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] mt-2"
              >
                {loading ? "Authenticating Session..." : "Sign In to Admin Console →"}
              </Button>
            </form>
          </Form>

          {/* Footer Security Badge */}
          <div className="pt-4 mt-2 border-t border-slate-800/80 text-center flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Encrypted Admin Session • Travel2Dubai DMC System</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
