"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { FileText, LogIn, LogOut, Sparkles, User } from "lucide-react";

export function Header() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    // Get current session
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserEmail(user?.email ?? null);
    });
    // Listen for auth changes (login / logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-sm shadow-indigo-200">
            <FileText size={20} />
          </div>

          <div className="leading-tight">
            <div className="text-base font-semibold tracking-[-0.02em] text-slate-950">
              PDFMantra
            </div>
            <div className="text-xs font-medium text-slate-500">
              Smart PDF Workspace
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-medium text-slate-600 md:flex">
          <Link href="/tools" className="rounded-xl px-3 py-2 transition hover:bg-slate-100 hover:text-indigo-700">
            Tools
          </Link>
          <Link href="/pricing" className="rounded-xl px-3 py-2 transition hover:bg-slate-100 hover:text-indigo-700">
            Pricing
          </Link>

          {userEmail ? (
            <>
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600">
                <User size={14} className="text-indigo-500" />
                <span className="max-w-[160px] truncate">{userEmail}</span>
              </span>
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-red-600"
              >
                <LogOut size={15} /> Sign out
              </button>
            </>
          ) : (
            <Link href="/login" className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 transition hover:bg-slate-100 hover:text-indigo-700">
              <LogIn size={15} /> Login
            </Link>
          )}

          <Link
            href="/editor"
            className="ml-2 inline-flex min-h-10 items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md"
          >
            <Sparkles size={15} />
            Get Started
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          {userEmail ? (
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex min-h-9 items-center justify-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <LogOut size={15} />
            </button>
          ) : (
            <Link href="/login" className="inline-flex min-h-9 items-center justify-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              Login
            </Link>
          )}
          <Link href="/editor" className="inline-flex min-h-9 items-center justify-center rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700">
            Start
          </Link>
        </div>
      </div>
    </header>
  );
}
