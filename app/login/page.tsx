"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { createClient } from "@/lib/supabase/client";
import {
  ArrowRight,
  Eye,
  EyeOff,
  FileText,
  Loader2,
  Lock,
  Mail,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<{ type: "info" | "error" | "success"; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setNotice({ type: "error", text: "Please fill in both fields." });
      return;
    }
    setLoading(true);
    setNotice(null);
    const supabase = createClient();

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { emailRedirectTo: `${location.origin}/auth/callback` },
        });
        setLoading(false);
        if (error) {
          setNotice({ type: "error", text: error.message });
        } else {
          setNotice({ type: "success", text: "Account created! Check your email to confirm, then log in." });
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        setLoading(false);
        if (error) {
          setNotice({ type: "error", text: error.message });
        } else {
          router.push("/editor");
          router.refresh();
        }
      }
    } catch (err: any) {
      setLoading(false);
      setNotice({ type: "error", text: err?.message || "Authentication failed" });
    }
  }

  async function handleGoogle() {
    setLoading(true);
    setNotice(null);
    const supabase = createClient();
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${location.origin}/auth/callback` },
      });
      if (error) {
        setLoading(false);
        setNotice({ type: "error", text: error.message });
      }
      // If no error, browser will redirect — keep loading spinner
    } catch (err: any) {
      setLoading(false);
      setNotice({ type: "error", text: err?.message || "Google sign-in failed" });
    }
  }

  async function handleForgotPassword() {
    if (!email.trim()) {
      setNotice({ type: "info", text: "Enter your email above, then click Forgot password." });
      return;
    }
    setLoading(true);
    setNotice(null);
    const supabase = createClient();
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${location.origin}/auth/callback?next=/reset-password`,
      });
      setLoading(false);
      if (error) {
        setNotice({ type: "error", text: error.message });
      } else {
        setNotice({ type: "success", text: "Password reset email sent. Check your inbox." });
      }
    } catch (err: any) {
      setLoading(false);
      setNotice({ type: "error", text: err?.message || "Failed to send reset email" });
    }
  }

  const noticeColors = {
    info: "border-indigo-100 bg-indigo-50 text-indigo-700",
    error: "border-red-100 bg-red-50 text-red-700",
    success: "border-emerald-100 bg-emerald-50 text-emerald-700",
  };

  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-violet-50 px-4 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-xl shadow-indigo-100/60 backdrop-blur">
            <div className="mb-7 flex flex-col items-center gap-2 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-[1.2rem] bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-200">
                <FileText size={26} />
              </div>
              <h1 className="mt-2 text-2xl font-black tracking-[-0.03em] text-slate-950">
                {mode === "login" ? "Welcome back" : "Create account"}
              </h1>
              <p className="text-sm font-medium text-slate-500">
                {mode === "login" ? "Log in to your PDFMantra workspace" : "Start your free PDFMantra workspace"}
              </p>
            </div>

            <button
              type="button"
              onClick={handleGoogle}
              disabled={loading}
              className="mb-4 flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:border-slate-300 disabled:opacity-60"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <div className="relative mb-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-semibold text-slate-400">or</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-600">Email</span>
                <div className="relative">
                  <Mail size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-600">Password</span>
                <div className="relative">
                  <Lock size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete={mode === "login" ? "current-password" : "new-password"}
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-10 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </label>

              {mode === "login" && (
                <div className="text-right">
                  <button type="button" onClick={handleForgotPassword} className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">
                    Forgot password?
                  </button>
                </div>
              )}

              {notice && (
                <div className={`rounded-xl border px-4 py-3 text-sm font-medium ${noticeColors[notice.type]}`}>
                  {notice.text}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-3 text-sm font-bold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 disabled:opacity-70"
              >
                {loading ? <><Loader2 className="animate-spin" size={16} /> Please wait</> : <>{mode === "login" ? "Log in" : "Create account"}<ArrowRight size={16} /></>}
              </button>
            </form>

            <p className="mt-6 text-center text-sm font-medium text-slate-500">
              {mode === "login" ? (
                <>Don&apos;t have an account?{" "}
                  <button type="button" onClick={() => { setMode("signup"); setNotice(null); }} className="font-bold text-indigo-600 hover:text-indigo-700">Sign up free</button>
                </>
              ) : (
                <>Already have an account?{" "}
                  <button type="button" onClick={() => { setMode("login"); setNotice(null); }} className="font-bold text-indigo-600 hover:text-indigo-700">Log in</button>
                </>
              )}
            </p>
          </div>

          <div className="mt-5 text-center">
            <p className="text-sm font-medium text-slate-500">
              Just need to edit a PDF?{" "}
              <Link href="/editor" className="inline-flex items-center gap-1 font-bold text-indigo-600 hover:text-indigo-700">
                Continue as guest <ArrowRight size={13} />
              </Link>
            </p>
          </div>

          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs font-medium text-slate-400">
            <Sparkles size={12} />
            Files never leave your browser — 100% private
          </div>
        </div>
      </main>
    </>
  );
}
