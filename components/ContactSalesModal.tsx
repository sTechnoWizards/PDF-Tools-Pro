"use client";

import { X, Phone, Mail, MessageCircle, Building2, Users, Send } from "lucide-react";
import { useState } from "react";

interface ContactSalesModalProps {
  onClose: () => void;
}

export function ContactSalesModal({ onClose }: ContactSalesModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    teamSize: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with all details
    const subject = `Business Plan Inquiry from ${formData.name}`;
    const body = `
Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company}
Team Size: ${formData.teamSize}

Message:
${formData.message}

---
Sent from PDFMantra Contact Form
    `.trim();
    
    window.open(`mailto:shubham10a50@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    setSubmitted(true);
    
    // Close after 2 seconds
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const openWhatsApp = () => {
    const message = `Hi! I'm interested in the PDFMantra Business plan.`;
    window.open(`https://wa.me/916232627062?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-2 transition hover:bg-white/20"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
              <Building2 size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black">Contact Sales</h2>
              <p className="mt-1 text-sm font-medium text-white/90">
                Let's discuss your team's PDF workflow needs
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="py-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                <Send size={32} className="text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Message Sent!</h3>
              <p className="mt-2 text-sm text-slate-600">
                We'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Quick Contact Options */}
              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href="tel:+916232627062"
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-indigo-300 hover:bg-indigo-50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                    <Phone size={18} className="text-indigo-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-semibold text-slate-500">Call us</div>
                    <div className="text-sm font-bold text-slate-900">+91 6232627062</div>
                  </div>
                </a>

                <button
                  onClick={openWhatsApp}
                  type="button"
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-emerald-300 hover:bg-emerald-50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                    <MessageCircle size={18} className="text-emerald-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-semibold text-slate-500">WhatsApp</div>
                    <div className="text-sm font-bold text-slate-900">Chat instantly</div>
                  </div>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200"></div>
                <span className="text-xs font-semibold text-slate-400">OR SEND A MESSAGE</span>
                <div className="h-px flex-1 bg-slate-200"></div>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                      placeholder="Acme Inc."
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                      Team Size *
                    </label>
                    <select
                      required
                      value={formData.teamSize}
                      onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    >
                      <option value="">Select size</option>
                      <option value="1-10">1-10 people</option>
                      <option value="11-50">11-50 people</option>
                      <option value="51-200">51-200 people</option>
                      <option value="201-1000">201-1000 people</option>
                      <option value="1000+">1000+ people</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Tell us about your needs *
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    placeholder="Tell us about your document workflow, team needs, or any specific requirements..."
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:shadow-xl"
                >
                  <Send size={16} />
                  Send Message
                </button>
              </form>

              <div className="rounded-xl bg-amber-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100">
                    <Mail size={16} className="text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-amber-900">Email us directly</div>
                    <a
                      href="mailto:shubham10a50@gmail.com"
                      className="text-sm font-bold text-amber-700 hover:text-amber-900"
                    >
                      shubham10a50@gmail.com
                    </a>
                    <div className="mt-1 text-xs text-amber-700">
                      Response time: Within 24 hours
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
