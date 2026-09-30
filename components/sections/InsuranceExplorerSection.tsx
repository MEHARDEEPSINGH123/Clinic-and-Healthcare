"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  CheckCircle2,
  Search,
  FileText,
  CreditCard,
  Building2,
  Globe2,
  Sparkles,
  Info,
} from "lucide-react";
import { getAllInsurancePanels } from "@/lib/data";
import { InsurancePanel } from "@/lib/types";

export default function InsuranceExplorerSection() {
  const allPanels = getAllInsurancePanels();
  const [activeTier, setActiveTier] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPanel, setSelectedPanel] = useState<InsurancePanel>(allPanels[0]);

  const tiers = [
    { label: "All (30 Panels)", value: "All" },
    { label: "Integrated Shield", value: "Integrated Shield" },
    { label: "National Scheme / CHAS", value: "National Scheme / CHAS" },
    { label: "Corporate Panel", value: "Corporate Panel" },
    { label: "International Expat", value: "International Expat" },
  ];

  const filteredPanels = allPanels.filter((panel) => {
    const matchesTier = activeTier === "All" || panel.tier === activeTier;
    const matchesSearch =
      panel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      panel.badge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesSearch;
  });

  return (
    <section id="insurance" className="relative py-28 px-6 md:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-heading font-semibold text-secondary uppercase tracking-widest block mb-2">
              05 • Insurance & Panels
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-primary tracking-tight">
              Insurance{" "}
              <span className="font-editorial italic font-normal text-secondary">
                Explorer
              </span>
            </h2>
            <p className="mt-2 text-sm text-primary/70 max-w-lg">
              Care should never come with insurance anxiety. Vitalis is accredited with 30 leading
              insurers, national schemes, and corporate networks with direct cashless billing.
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-primary/40 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search insurer or policy..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white border border-border text-xs text-primary focus:border-secondary outline-none shadow-subtle"
            />
          </div>
        </div>

        {/* Tier Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-10">
          {tiers.map((t) => (
            <button
              key={t.value}
              onClick={() => setActiveTier(t.value)}
              className={`px-4 py-2 rounded-full text-xs font-heading font-semibold whitespace-nowrap transition-all ${
                activeTier === t.value
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white text-primary/70 hover:bg-black/5 border border-border"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Main 2-Column Explorer: Floating Wall on Left, Interactive Deep Dive on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Floating Logo / Badge Wall */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[580px] overflow-y-auto pr-2">
            <AnimatePresence>
              {filteredPanels.map((panel) => {
                const isSelected = selectedPanel?.id === panel.id;
                return (
                  <motion.div
                    key={panel.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setSelectedPanel(panel)}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                      isSelected
                        ? "bg-white border-secondary ring-2 ring-secondary/20 shadow-md scale-[1.02]"
                        : "bg-white/80 hover:bg-white border-border/80 text-primary/80 hover:border-secondary/30"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-heading font-bold px-2 py-0.5 rounded-full bg-surface-cream text-secondary uppercase tracking-wider">
                          {panel.tier}
                        </span>
                        {panel.cashlessBilling && (
                          <span className="text-[10px] font-semibold text-secondary flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-secondary" />
                            Direct Cashless
                          </span>
                        )}
                      </div>

                      <h4 className="text-xs font-heading font-bold text-primary leading-snug">
                        {panel.name}
                      </h4>
                      <div className="text-[11px] text-primary/60 mt-1 font-sans">
                        {panel.badge}
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-border/50 flex items-center justify-between text-[10px] text-primary/50 font-mono">
                      <span>ID: {panel.id}</span>
                      <span className="font-semibold text-secondary">Co-pay: {panel.copayPercent}%</span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Right Column: Interactive Panel Coverage Details Dossier */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="rounded-3xl bg-white border border-border shadow-elevation p-6 sm:p-8 space-y-6">
              <div className="pb-4 border-b border-border/80">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  <span className="text-[10px] font-heading font-bold text-secondary uppercase tracking-widest">
                    Coverage Transparency
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-primary">
                  {selectedPanel.name}
                </h3>
                <p className="text-xs text-primary/60 mt-0.5">
                  Accreditation Code: {selectedPanel.id}
                </p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-surface-cream border border-border">
                  <div className="text-[11px] text-primary/60 font-medium">Direct Settlement</div>
                  <div className="text-xs font-heading font-bold text-secondary mt-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Cashless Desk</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-surface-cream border border-border">
                  <div className="text-[11px] text-primary/60 font-medium">Estimated Co-Pay</div>
                  <div className="text-xs font-heading font-bold text-primary mt-1">
                    {selectedPanel.copayPercent}% capped by policy
                  </div>
                </div>
              </div>

              {/* Eligibility & Claim Guidance */}
              <div className="space-y-3 text-xs">
                <div>
                  <h5 className="font-heading font-semibold text-primary mb-1">What is Covered</h5>
                  <p className="text-primary/75 leading-relaxed bg-surface-cream/50 p-3 rounded-xl border border-border/60">
                    {selectedPanel.eligibility}
                  </p>
                </div>

                <div>
                  <h5 className="font-heading font-semibold text-primary mb-1">How Claims are Processed</h5>
                  <p className="text-primary/75 leading-relaxed bg-surface-cream/50 p-3 rounded-xl border border-border/60">
                    {selectedPanel.claimProcess}
                  </p>
                </div>
              </div>

              {/* Medisave & SingPass Note */}
              <div className="p-3.5 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-primary/80 leading-relaxed">
                  Our concierge team generates digital Letters of Guarantee (LOG) instantly on site. Simply present your SingPass or digital insurance card upon arrival.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
