"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Calendar,
  Sparkles,
  Stethoscope,
  Video,
  ArrowRight,
  ShieldCheck,
  Clock,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { getVitalisMetrics } from "@/lib/data";

interface ConciergeEntryProps {
  onSelectOption: (option: string) => void;
  onOpenBooking: () => void;
}

export default function ConciergeEntry({ onSelectOption, onOpenBooking }: ConciergeEntryProps) {
  const metrics = getVitalisMetrics();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeConciergeTab, setActiveConciergeTab] = useState<string | null>(null);

  const conciergeOptions = [
    {
      id: "find-doctor",
      title: "Find a Doctor",
      subtitle: "80 specialists across Singapore",
      badge: "Spotlight",
      icon: Stethoscope,
      action: () => {
        onSelectOption("doctors");
        const el = document.getElementById("doctors");
        el?.scrollIntoView({ behavior: "smooth" });
      },
      tagline: "Explore clinician credentials, languages & philosophies",
    },
    {
      id: "book-appointment",
      title: "Book Appointment",
      subtitle: "Instant confirmation in 30s",
      badge: "Direct",
      icon: Calendar,
      action: onOpenBooking,
      tagline: "Same-day priority slots & digital check-in passes",
    },
    {
      id: "health-screening",
      title: "Health Screening",
      subtitle: "Cellular & biomarker audits",
      badge: "Longevity",
      icon: Sparkles,
      action: () => {
        onSelectOption("packages");
        const el = document.getElementById("packages");
        el?.scrollIntoView({ behavior: "smooth" });
      },
      tagline: "Epigenetic biological clock, CAC scoring & MRI protocols",
    },
    {
      id: "specialist-care",
      title: "Specialist Care",
      subtitle: "25 medical disciplines",
      badge: "Precision",
      icon: ShieldCheck,
      action: () => {
        onSelectOption("services");
        const el = document.getElementById("services");
        el?.scrollIntoView({ behavior: "smooth" });
      },
      tagline: "Cardiology, endocrinology, gynaecology & sports rehab",
    },
    {
      id: "teleconsultation",
      title: "Teleconsultation",
      subtitle: "24/7 virtual concierge",
      badge: "Instant",
      icon: Video,
      action: onOpenBooking,
      tagline: "Doorstep prescription delivery in Singapore under 90 mins",
    },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-between px-6 md:px-16 pt-12 pb-16 overflow-hidden bg-background">
      {/* Ambient Breathing Background Elements */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-highlight/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      {/* Top Header / Subtle Brand Mark */}
      <div className="relative z-10 flex items-center justify-between max-w-7xl mx-auto w-full pt-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-primary text-highlight flex items-center justify-center font-heading font-bold text-lg shadow-sm">
            V
          </div>
          <div>
            <span className="font-heading font-bold text-xl tracking-tight text-primary block leading-none">
              Vitalis Health
            </span>
            <span className="text-[11px] text-primary/60 tracking-wider font-medium font-sans uppercase">
              Singapore Medical Network
            </span>
          </div>
        </div>

        {/* Live Network Availability Indicator */}
        <div className="hidden sm:flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel text-xs text-primary font-medium shadow-subtle">
          <span>20 Sanctuaries Open</span>
          <span className="text-primary/30">•</span>
          <span className="text-primary/70">Care Beyond Appointments</span>
        </div>

        <button
          onClick={onOpenBooking}
          className="px-5 py-2.5 rounded-full bg-primary text-white hover:bg-primary/90 text-xs font-heading font-semibold tracking-wide transition-all shadow-sm hover:shadow"
        >
          Concierge Portal
        </button>
      </div>

      {/* Main Center Concierge Experience */}
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center my-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-border shadow-subtle text-xs text-primary/80 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>A New Standard of Preventive & Interceptive Healthcare</span>
          </div>

          {/* Concierge Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-bold tracking-tight text-primary leading-[1.08]">
            How Can We Help{" "}
            <span className="font-editorial italic font-normal text-secondary block sm:inline">
              You Today?
            </span>
          </h1>

          <p className="max-w-xl mx-auto text-base sm:text-lg text-primary/70 font-sans leading-relaxed">
            Welcome to Vitalis Health. A quiet, human, and meticulously designed healthcare
            ecosystem crafted around your longevity.
          </p>
        </motion.div>

        {/* Interactive Concierge 5 Options Deck */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mt-10 text-left"
        >
          {conciergeOptions.map((opt, i) => {
            const Icon = opt.icon;
            const isHovered = activeConciergeTab === opt.id;

            return (
              <motion.div
                key={opt.id}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                onMouseEnter={() => setActiveConciergeTab(opt.id)}
                onMouseLeave={() => setActiveConciergeTab(null)}
                onClick={opt.action}
                className="group relative cursor-pointer p-5 rounded-3xl bg-white/90 hover:bg-white border border-border/80 hover:border-secondary/50 shadow-subtle hover:shadow-elevation transition-all flex flex-col justify-between min-h-[170px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-surface-cream group-hover:bg-secondary/10 text-primary group-hover:text-secondary flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-heading font-semibold px-2 py-0.5 rounded-full bg-surface-cream text-primary/60 group-hover:text-secondary group-hover:bg-secondary/10 transition-colors uppercase tracking-wider">
                      {opt.badge}
                    </span>
                  </div>

                  <h3 className="text-sm font-heading font-bold text-primary group-hover:text-secondary transition-colors">
                    {opt.title}
                  </h3>
                  <p className="text-xs text-primary/60 mt-1 line-clamp-2">
                    {opt.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/50 flex items-center justify-between text-[11px] font-medium text-primary/50 group-hover:text-secondary transition-colors">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quick Search Concierge Input */}
        <div className="mt-8 max-w-xl mx-auto">
          <div className="relative flex items-center">
            <Search className="absolute left-5 w-4 h-4 text-primary/40" />
            <input
              type="text"
              placeholder="Search by condition, specialist, doctor name, or clinic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchQuery.trim()) {
                  const el = document.getElementById("doctors");
                  el?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="w-full pl-12 pr-28 py-3.5 rounded-full bg-white/95 border border-border shadow-subtle focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none text-xs sm:text-sm text-primary placeholder:text-primary/40 transition-all"
            />
            <button
              onClick={() => {
                const el = document.getElementById("doctors");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="absolute right-2 px-4 py-2 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-all font-heading"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Network Trust Bar & Scroll Prompt */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-4 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-primary/70">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 font-medium">
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-primary text-sm">{metrics.totalClinics}</span>
            <span>Sanctuaries</span>
          </div>
          <span className="text-primary/30">•</span>
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-primary text-sm">{metrics.totalDoctors}</span>
            <span>Doctors</span>
          </div>
          <span className="text-primary/30">•</span>
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-primary text-sm">{metrics.totalPanels}</span>
            <span>Insurance Panels</span>
          </div>
          <span className="text-primary/30">•</span>
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-secondary text-sm">{metrics.recommendationRate}</span>
            <span>Patient Trust</span>
          </div>
        </div>

        <a
          href="#journey"
          className="flex items-center gap-2 text-primary/60 hover:text-primary transition-colors cursor-pointer group"
        >
          <span>Begin Health Journey</span>
          <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
        </a>
      </div>
    </section>
  );
}
