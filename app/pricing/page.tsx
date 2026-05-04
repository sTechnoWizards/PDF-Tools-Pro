"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { ContactSalesModal } from "@/components/ContactSalesModal";
import { createClient } from "@/lib/supabase/client";
import { ArrowRight, Check, Crown, FileText, Sparkles, Users, Zap } from "lucide-react";

const TIERS = [
  {
    id: "free",
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "For basic browser-side PDF editing and testing.",
    icon: <FileText size={24} />,
    badge: "Current",
    badgeColor: "bg-emerald-100 text-emerald-700",
    cta: "Start Free",
    ctaLink: "/editor",
    ctaStyle: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
    features: [
      "Upload and preview PDFs",
      "Select & copy real PDF text",
      "Text box annotations",
      "Highlight selectable PDF text",
      "Move & resize objects",
      "Export edited PDF (full/current page)",
      "Browser-side processing (100% private)",
      "Basic signature & image insertion",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "₹499",
    period: "/ month",
    yearlyPrice: "₹4,999 / year",
    description: "For users who need advanced editing, OCR, and higher limits.",
    icon: <Crown size={24} />,
    badge: "Most Popular",
    badgeColor: "bg-indigo-100 text-indigo-700",
    cta: "Upgrade to Pro",
    ctaLink: "/login",
    ctaStyle: "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200 hover:shadow-xl",
    features: [
      "Everything in Free",
      "Edit existing PDF text in-place",
      "AI-powered text replacement",
      "Scanned PDF OCR recognition",
      "PDF to Word/Excel conversion",
      "High-quality compression",
      "Saved signature library",
      "Export selected page ranges",
      "Higher usage limits (100 PDFs/month)",
      "Priority processing queue",
      "Email support",
    ],
  },
  {
    id: "business",
    name: "Business",
    price: "Custom",
    period: "pricing",
    description: "For teams and professional document workflows.",
    icon: <Users size={24} />,
    badge: "Enterprise",
    badgeColor: "bg-amber-100 text-amber-700",
    cta: "Contact Sales",
    ctaLink: "mailto:sales@pdfmantra.com",
    ctaStyle: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
    features: [
      "Everything in Pro",
      "Team workspace & collaboration",
      "Bulk PDF processing",
      "Advanced file handling & automation",
      "Admin controls & user management",
      "Custom usage limits",
      "Dedicated account manager",
      "Priority business support (24/7)",
      "Custom integrations & API access",
      "SSO & advanced security",
      "SLA guarantees",
    ],
  },
];

export default function PricingPage() {
  const [userTier, setUserTier] = useState<"free" | "pro" | "business" | null>(null);
  const [loading, setLoading] = useState(true);
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) {
        setUserTier("free");
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("tier, is_premium")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching user tier:", error);
          setUserTier("free");
        } else if (data?.tier) {
          setUserTier(data.tier as "free" | "pro" | "business");
        } else if (data?.is_premium === true) {
          setUserTier("pro");
        } else {
          setUserTier("free");
        }
      } catch (err) {
        console.error("Failed to load user tier:", err);
        setUserTier("free");
      }
      setLoading(false);
    });
  }, []);

  const getButtonForTier = (tierId: string) => {
    if (loading) {
      return { text: "Loading...", link: "#", style: "border border-slate-200 bg-white text-slate-400 cursor-wait", disabled: true };
    }

    if (userTier === tierId) {
      return { text: "Current Plan", link: "#", style: "border-2 border-emerald-500 bg-emerald-50 text-emerald-700 font-bold cursor-default", disabled: true };
    }

    if (tierId === "free") {
      return { text: "Start Free", link: "/editor", style: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50", disabled: false };
    }

    if (tierId === "pro") {
      if (userTier === "business") {
        return { text: "Downgrade to Pro", link: "mailto:support@pdfmantra.com?subject=Downgrade%20Request", style: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50", disabled: false };
      }
      return { text: "Upgrade to Pro", link: "/editor", style: "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200 hover:shadow-xl", disabled: false };
    }

    if (tierId === "business") {
      return { text: "Contact Sales", link: "#", style: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50", disabled: false, onClick: () => setShowContactModal(true) };
    }

    return { text: "Get Started", link: "/editor", style: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50", disabled: false };
  };

  return (
    <>
      <Header />
      {showContactModal && <ContactSalesModal onClose={() => setShowContactModal(false)} />}
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50">
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-sm font-bold text-indigo-700">
              <Zap size={14} /> Simple, Transparent Pricing
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Choose your PDF workflow
            </h1>
            <p className="mt-4 text-lg font-medium text-slate-600">
              Start free. Upgrade when you need more power.
              <br />
              All plans include 100% browser-side processing — your files never leave your device.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {TIERS.map((tier) => {
              const button = getButtonForTier(tier.id);
              return (
              <div
                key={tier.id}
                className={`relative flex flex-col overflow-hidden rounded-[2rem] border bg-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl ${
                  tier.id === "pro" ? "border-indigo-200 ring-2 ring-indigo-100" : "border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between border-b border-slate-100 p-6 pb-4">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tier.id === "pro" ? "bg-gradient-to-br from-indigo-500 to-violet-500 text-white" : "bg-slate-100 text-slate-600"}`}>
                      {tier.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-950">{tier.name}</h3>
                      {tier.badge && (
                        <span className={`mt-0.5 inline-block rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-wide ${tier.badgeColor}`}>
                          {tier.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-b border-slate-100 p-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-slate-950">{tier.price}</span>
                    <span className="text-lg font-semibold text-slate-500">{tier.period}</span>
                  </div>
                  {tier.yearlyPrice && (
                    <div className="mt-2 text-sm font-semibold text-emerald-600">
                      {tier.yearlyPrice} (Save 17%)
                    </div>
                  )}
                  <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600">{tier.description}</p>
                </div>

                <div className="flex-1 p-6">
                  <ul className="space-y-3">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm font-medium text-slate-700">
                        <Check size={16} className="mt-0.5 flex-shrink-0 text-emerald-500" strokeWidth={3} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 pt-0">
                  {button.disabled ? (
                    <div className={`flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold ${button.style}`}>
                      {button.text}
                      {userTier === tier.id && <Check size={16} />}
                    </div>
                  ) : button.onClick ? (
                    <button
                      onClick={button.onClick}
                      className={`flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold transition hover:-translate-y-0.5 ${button.style}`}
                    >
                      {button.text}
                      <ArrowRight size={16} />
                    </button>
                  ) : (
                    <Link
                      href={button.link}
                      className={`flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold transition hover:-translate-y-0.5 ${button.style}`}
                    >
                      {button.text}
                      <ArrowRight size={16} />
                    </Link>
                  )}
                </div>
              </div>
            );
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm font-medium text-slate-500">
              All plans include unlimited PDFs for personal use. Enterprise pricing available for high-volume teams.
            </p>
            <p className="mt-2 flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
              <Sparkles size={12} />
              Files never leave your browser — 100% private & secure
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
