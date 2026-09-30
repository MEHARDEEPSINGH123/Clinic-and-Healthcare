"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Clock,
  CheckCircle2,
  ArrowRight,
  Shield,
  Layers,
  Heart,
  HelpCircle,
  X,
} from "lucide-react";
import { getAllHealthPackages } from "@/lib/data";
import { HealthPackage } from "@/lib/types";

interface HealthPackagesSectionProps {
  onBookPackage: (pkgName: string) => void;
}

export default function HealthPackagesSection({ onBookPackage }: HealthPackagesSectionProps) {
  const allPackages = getAllHealthPackages();
  const [selectedTier, setSelectedTier] = useState<string>("All");
  const [inspectingPackage, setInspectingPackage] = useState<HealthPackage | null>(null);

  useEffect(() => {
    if (inspectingPackage) {
      document.body.style.overflow = "hidden";
      const win = window as unknown as { __lenis?: { stop: () => void; start: () => void } };
      if (win.__lenis) win.__lenis.stop();
    } else {
      document.body.style.overflow = "";
      const win = window as unknown as { __lenis?: { stop: () => void; start: () => void } };
      if (win.__lenis) win.__lenis.start();
    }
    return () => {
      document.body.style.overflow = "";
      const win = window as unknown as { __lenis?: { stop: () => void; start: () => void } };
      if (win.__lenis) win.__lenis.start();
    };
  }, [inspectingPackage]);

  const tiers = ["All", "Executive", "Platinum", "Essential", "Specialized"];

  const filteredPackages = allPackages.filter((pkg) => {
    if (selectedTier === "All") return true;
    return pkg.tier === selectedTier;
  });

  return (
    <section id="packages" className="relative py-28 px-6 md:px-16 bg-surface-cream/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-heading font-semibold text-secondary uppercase tracking-widest block mb-2">
              08 • Health Screening Packages
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-primary tracking-tight">
              Curated Screening{" "}
              <span className="font-editorial italic font-normal text-secondary">
                Storytelling
              </span>
            </h2>
            <p className="mt-2 text-sm text-primary/70 max-w-lg">
              No clinical jargon or static tables. Explore narrative-driven health audits tailored to
              your stage of life and longevity aspirations.
            </p>
          </div>

          {/* Tier Tabs */}
          <div className="flex flex-wrap gap-2">
            {tiers.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTier(t)}
                className={`px-4 py-2 rounded-full text-xs font-heading font-semibold transition-all ${
                  selectedTier === t
                    ? "bg-primary text-white shadow-sm"
                    : "bg-white text-primary/70 hover:bg-black/5 border border-border"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Storytelling Cards Grid (NO TABLES!) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.slice(0, 6).map((pkg) => {
            const isFeatured = pkg.recommended;
            return (
              <motion.div
                key={pkg.id}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`rounded-4xl p-6 sm:p-8 flex flex-col justify-between transition-all relative ${
                  isFeatured
                    ? "bg-white border-2 border-primary shadow-float ring-4 ring-primary/5"
                    : "bg-white border border-border shadow-elevation hover:border-secondary/40"
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3 left-8 px-3 py-1 rounded-full bg-primary text-highlight text-[10px] font-heading font-bold uppercase tracking-wider shadow-sm">
                    Most Popular Protocol
                  </div>
                )}

                <div>
                  {/* Tier & Duration */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-heading font-bold px-2.5 py-0.5 rounded-full bg-surface-cream text-secondary uppercase tracking-wider">
                      {pkg.tier}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-primary/60 font-medium">
                      <Clock className="w-3.5 h-3.5 text-secondary" />
                      <span>{pkg.duration}</span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-primary">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-primary/60 mt-1 line-clamp-2 font-sans">
                    {pkg.subtitle}
                  </p>

                  {/* Pricing Display */}
                  <div className="my-5 pb-5 border-b border-border/80 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-heading font-bold text-primary">
                      S$ {pkg.priceSgd}
                    </span>
                    <span className="text-xs text-primary/50 font-medium font-sans">
                      SGD Nett / All-Inclusive
                    </span>
                  </div>

                  {/* Narrative Story / Summary */}
                  <p className="text-xs text-primary/75 leading-relaxed font-sans mb-4">
                    {pkg.summary}
                  </p>

                  {/* Suitability Badge */}
                  <div className="p-3.5 rounded-2xl bg-surface-cream border border-border/60 text-xs mb-5">
                    <div className="text-[10px] font-heading font-bold text-primary/60 uppercase tracking-wider mb-0.5">
                      Recommended For
                    </div>
                    <div className="text-xs text-primary font-medium">
                      {pkg.suitability}
                    </div>
                  </div>

                  {/* Core Benefits */}
                  <div className="space-y-2 mb-6">
                    <div className="text-[10px] font-heading font-bold text-primary/60 uppercase tracking-wider">
                      Key Clinical Outcomes
                    </div>
                    {pkg.benefits.slice(0, 3).map((ben, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-primary/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5" />
                        <span>{ben}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Area */}
                <div className="pt-4 border-t border-border/60 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setInspectingPackage(pkg)}
                    className="text-xs font-semibold text-primary/70 hover:text-secondary transition-colors underline"
                  >
                    View Coverage ({pkg.coverage.length})
                  </button>

                  <button
                    type="button"
                    onClick={() => onBookPackage(pkg.name)}
                    className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary/95 text-white text-xs font-heading font-semibold tracking-wide transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <span>Schedule</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed Coverage Drawer / Modal */}
        <AnimatePresence>
          {inspectingPackage && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
              data-lenis-prevent
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setInspectingPackage(null)}
                className="fixed inset-0 bg-primary/40 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                data-lenis-prevent
                className="relative w-full max-w-xl bg-white rounded-3xl shadow-float border border-border p-6 sm:p-8 z-10 max-h-[85vh] overflow-y-auto space-y-6 overscroll-contain"
              >
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div>
                    <span className="text-[10px] font-heading font-bold text-secondary uppercase tracking-widest">
                      Full Diagnostic Coverage
                    </span>
                    <h3 className="text-xl font-heading font-bold text-primary mt-0.5">
                      {inspectingPackage.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setInspectingPackage(null)}
                    className="w-8 h-8 rounded-full bg-surface-cream text-primary flex items-center justify-center hover:bg-primary/10 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-primary/70 mb-3">
                    Biomarker & Diagnostic Panels Included ({inspectingPackage.coverage.length})
                  </h4>
                  <div className="space-y-2">
                    {inspectingPackage.coverage.map((cov, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-2xl bg-surface-cream/80 border border-border/60 text-xs text-primary flex items-center gap-2.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                        <span className="font-medium">{cov}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-secondary/10 border border-secondary/20 text-xs space-y-1">
                  <div className="font-semibold text-primary">Doctor Consultation:</div>
                  <div className="text-primary/80">{inspectingPackage.doctorConsultation}</div>
                  <div className="text-[11px] text-secondary font-medium pt-1">
                    Fasting Required: {inspectingPackage.fastingRequired ? "Yes (8 hours prior)" : "No fasting required"}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setInspectingPackage(null)}
                    className="px-5 py-2.5 rounded-full border border-border text-xs font-semibold text-primary"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const name = inspectingPackage.name;
                      setInspectingPackage(null);
                      onBookPackage(name);
                    }}
                    className="px-6 py-2.5 rounded-full bg-primary text-white text-xs font-heading font-semibold shadow-sm"
                  >
                    Book This Package
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
