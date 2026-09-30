"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Clock,
  CheckCircle2,
  ArrowRight,
  Shield,
  Activity,
  Heart,
  Brain,
  Eye,
  SlidersHorizontal,
} from "lucide-react";
import { getAllServices } from "@/lib/data";
import { Service } from "@/lib/types";

interface ServicesEcosystemSectionProps {
  onSelectService: (serviceName: string) => void;
}

export default function ServicesEcosystemSection({ onSelectService }: ServicesEcosystemSectionProps) {
  const allServices = getAllServices();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchFilter, setSearchFilter] = useState<string>("");

  // Extract unique categories
  const categories = ["All", "Longevity", "Cardiac", "Metabolism", "Diagnostics", "Women's Care", "Neurology", "Sleep"];

  const filteredServices = allServices.filter((service) => {
    const matchesCat =
      selectedCategory === "All" ||
      service.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      service.specialtyName.toLowerCase().includes(selectedCategory.toLowerCase());

    const matchesSearch =
      service.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      service.description.toLowerCase().includes(searchFilter.toLowerCase());

    return matchesCat && matchesSearch;
  });

  return (
    <section id="services" className="relative py-28 px-6 md:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-heading font-semibold text-secondary uppercase tracking-widest block mb-2">
              03 • Healthcare Ecosystem
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-primary tracking-tight">
              Evidence-Based{" "}
              <span className="font-editorial italic font-normal text-secondary">
                Clinical Services
              </span>
            </h2>
            <p className="mt-2 text-sm text-primary/70 max-w-lg">
              100 curated diagnostic and interventional services spanning 25 medical disciplines.
              Engineered for predictive clarity and cellular longevity.
            </p>
          </div>

          {/* Quick Search in Services */}
          <div className="w-full lg:w-72">
            <input
              type="text"
              placeholder="Search services or tests..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full px-4 py-2.5 rounded-full bg-white border border-border text-xs text-primary focus:border-secondary outline-none shadow-subtle"
            />
          </div>
        </div>

        {/* Specialty Ecosystem Category Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-heading font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-secondary text-white shadow-sm"
                  : "bg-white text-primary/70 hover:bg-black/5 border border-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Ecosystem Services Grid with Animated Transitions */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredServices.slice(0, 9).map((service) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className="group relative rounded-3xl bg-white border border-border/80 hover:border-secondary/50 shadow-subtle hover:shadow-elevation transition-all p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  {/* Top Badge & Duration */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-heading font-bold px-2.5 py-1 rounded-full bg-surface-cream text-secondary uppercase tracking-wider">
                      {service.category}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-primary/60 font-medium">
                      <Clock className="w-3.5 h-3.5 text-secondary" />
                      <span>{service.durationMinutes} mins</span>
                    </div>
                  </div>

                  {/* Title & Fee */}
                  <h3 className="text-lg font-heading font-bold text-primary group-hover:text-secondary transition-colors leading-snug">
                    {service.name}
                  </h3>
                  <div className="text-xs font-semibold text-secondary mt-1">
                    S$ {service.feeSgd} SGD
                  </div>

                  <p className="text-xs text-primary/70 mt-3 line-clamp-3 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Preparation Note */}
                  <div className="my-4 p-3 rounded-2xl bg-surface-cream/80 border border-border/60 text-[11px] text-primary/80">
                    <strong className="text-primary font-semibold">Prep:</strong> {service.preparationSummary}
                  </div>

                  {/* Clinical Benefits List */}
                  <div className="space-y-1.5 pt-1">
                    {service.benefits.slice(0, 3).map((ben, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-primary/75">
                        <CheckCircle2 className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                        <span className="truncate">{ben}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Trigger */}
                <div className="pt-6 mt-4 border-t border-border/60 flex items-center justify-between">
                  <span className="text-[11px] text-primary/50 font-mono">
                    ID: {service.id}
                  </span>
                  <button
                    onClick={() => onSelectService(service.name)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/5 group-hover:bg-secondary group-hover:text-white text-primary text-xs font-heading font-semibold transition-all"
                  >
                    <span>Inquire & Book</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredServices.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-border">
            <p className="text-sm text-primary/70">No services match your active filter.</p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchFilter("");
              }}
              className="mt-3 text-xs font-semibold text-secondary underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
