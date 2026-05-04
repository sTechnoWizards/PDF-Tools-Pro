"use client";

import {
  Check,
  Crown,
  FileImage,
  ImageIcon,
  PenLine,
  Sparkles,
  Type,
  Wand2,
  X,
} from "lucide-react";
import Link from "next/link";

const PRO_FEATURES = [
  { icon: <Type size={15} />, label: "Edit existing PDF text in-place" },
  { icon: <Wand2 size={15} />, label: "AI-powered text replacement" },
  { icon: <PenLine size={15} />, label: "Digital signature (typed & image)" },
  { icon: <ImageIcon size={15} />, label: "Insert & position images" },
  { icon: <FileImage size={15} />, label: "Export selected page ranges" },
  { icon: <Sparkles size={15} />, label: "Priority support & new features first" },
];

const FREE_FEATURES = [
  "Select & copy real PDF text",
  "Move & resize annotation objects",
  "Text box annotations",
  "Highlight PDF text",
  "Export full & current page",
];

type PremiumModalProps = {
  onClose: () => void;
};

export function PremiumModal({ onClose }: PremiumModalProps) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="premium-modal-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl shadow-indigo-900/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-indigo-700 via-violet-700 to-fuchsia-600 px-6 py-7 text-white">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Close"
          >
            <X size={16} />
          </button>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber-400 px-3 py-1 text-xs font-black text-slate-950 shadow-md">
            <Crown size={12} strokeWidth={3} /> PRO FEATURE
          </div>
          <h2 id="premium-modal-title" className="text-2xl font-black tracking-tight">
            Unlock the full PDF editor
          </h2>
          <p className="mt-2 text-sm font-medium leading-relaxed text-indigo-100">
            You've hit a Pro-only feature. Upgrade to get unrestricted access to every tool.
          </p>
        </div>

        {/* Content */}
        <div className="grid gap-5 p-6 sm:grid-cols-2">
          {/* Pro features */}
          <div>
            <div className="mb-3 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-amber-600">
              <Crown size={12} /> Pro includes
            </div>
            <ul className="space-y-2.5">
              {PRO_FEATURES.map((f) => (
                <li key={f.label} className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    {f.icon}
                  </span>
                  {f.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Free features */}
          <div>
            <div className="mb-3 text-[11px] font-black uppercase tracking-widest text-slate-400">
              Free tier includes
            </div>
            <ul className="space-y-2.5">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                  <Check size={14} className="flex-shrink-0 text-emerald-500" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="border-t border-slate-100 bg-slate-50 px-6 py-4">
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href="/pricing"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 text-sm font-black text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:shadow-xl sm:w-auto sm:flex-1"
            >
              <Crown size={15} strokeWidth={2.5} />
              Upgrade to Pro
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 sm:w-auto"
            >
              Continue with Free
            </button>
          </div>
          <p className="mt-3 text-center text-xs text-slate-400">
            No credit card required to try. Cancel any time.
          </p>
        </div>
      </div>
    </div>
  );
}
