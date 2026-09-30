"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Tag,
  User,
  X,
} from "lucide-react";
import { getAllHealthArticles } from "@/lib/data";
import { HealthArticle } from "@/lib/types";
import SafeImage from "@/components/ui/SafeImage";

export default function HealthResourcesSection() {
  const articles = getAllHealthArticles();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedArticle, setSelectedArticle] = useState<HealthArticle | null>(null);

  useEffect(() => {
    if (selectedArticle) {
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
  }, [selectedArticle]);

  const categories = ["All", "Sleep & Circadian", "Cardiovascular", "Metabolic Health", "Longevity Medicine"];

  const filteredArticles = articles.filter((art) => {
    if (activeCategory === "All") return true;
    return art.category === activeCategory;
  });

  const featuredArticle = filteredArticles[0] || articles[0];
  const sideArticles = filteredArticles.slice(1, 4);

  return (
    <section id="resources" className="relative py-28 px-6 md:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-heading font-semibold text-secondary uppercase tracking-widest block mb-2">
              11 • Clinical Intelligence
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-primary tracking-tight">
              Health{" "}
              <span className="font-editorial italic font-normal text-secondary">
                Resources & Journal
              </span>
            </h2>
            <p className="mt-2 text-sm text-primary/70 max-w-lg">
              Magazine-style dispatches curated by Vitalis clinicians. Translating contemporary
              longevity research and metabolic science into everyday Singapore life.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-4 py-2 rounded-full text-xs font-heading font-semibold transition-all ${
                  activeCategory === c
                    ? "bg-primary text-white shadow-sm"
                    : "bg-white text-primary/70 hover:bg-black/5 border border-border"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Magazine-Style Layout: Featured Lead on Left, Trending Articles on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Featured Hero Article */}
          <div
            onClick={() => setSelectedArticle(featuredArticle)}
            className="lg:col-span-7 group cursor-pointer rounded-4xl bg-white border border-border shadow-elevation hover:border-secondary/40 transition-all overflow-hidden flex flex-col justify-between"
          >
            <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-primary/10">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/80 backdrop-blur-md text-white text-[10px] font-heading font-bold uppercase tracking-wider">
                Featured Cover Story
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3 text-xs text-primary/60">
                <span className="text-secondary font-semibold font-heading uppercase tracking-wider">
                  {featuredArticle.category}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-secondary" />
                  {featuredArticle.readTime}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-primary group-hover:text-secondary transition-colors leading-tight">
                {featuredArticle.title}
              </h3>

              <p className="text-xs sm:text-sm text-primary/70 leading-relaxed font-sans line-clamp-3">
                {featuredArticle.excerpt}
              </p>

              <div className="pt-4 border-t border-border/80 flex items-center justify-between">
                <div className="text-xs">
                  <strong className="text-primary block font-heading">{featuredArticle.authorDoctorName}</strong>
                  <span className="text-primary/60 text-[11px]">{featuredArticle.authorSpecialty}</span>
                </div>

                <span className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-secondary group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Trending Articles Deck */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-secondary" />
                <span className="text-xs font-heading font-bold text-primary uppercase tracking-wider">
                  Trending Clinical Dispatches
                </span>
              </div>
              <span className="text-xs text-primary/50 font-mono">100 Articles</span>
            </div>

            {sideArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className="group cursor-pointer p-5 rounded-3xl bg-white border border-border hover:border-secondary/40 shadow-subtle hover:shadow-elevation transition-all flex gap-4 items-center"
              >
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                />

                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center gap-2 text-[10px] text-primary/60">
                    <span className="text-secondary font-semibold uppercase">{art.category}</span>
                    <span>•</span>
                    <span>{art.readTime}</span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-heading font-bold text-primary group-hover:text-secondary transition-colors line-clamp-2 leading-snug">
                    {art.title}
                  </h4>

                  <div className="text-[11px] text-primary/60 truncate pt-1">
                    By {art.authorDoctorName}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Article Reader Modal */}
        <AnimatePresence>
          {selectedArticle && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
              data-lenis-prevent
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedArticle(null)}
                className="fixed inset-0 bg-primary/40 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                data-lenis-prevent
                className="relative w-full max-w-2xl bg-white rounded-4xl shadow-float border border-border p-6 sm:p-10 z-10 max-h-[85vh] overflow-y-auto space-y-6 overscroll-contain"
              >
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-heading font-bold text-secondary uppercase tracking-wider">
                      {selectedArticle.category}
                    </span>
                    <span className="text-primary/40">•</span>
                    <span className="text-xs text-primary/60">{selectedArticle.readTime}</span>
                  </div>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="w-9 h-9 rounded-full bg-surface-cream text-primary flex items-center justify-center hover:bg-primary/10 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-heading font-bold text-primary leading-tight">
                    {selectedArticle.title}
                  </h3>
                  <div className="text-xs text-primary/60 mt-2 flex items-center gap-2">
                    <span>Published by {selectedArticle.authorDoctorName}</span>
                    <span>•</span>
                    <span>{selectedArticle.date}</span>
                  </div>
                </div>

                <div className="rounded-3xl overflow-hidden h-60 w-full bg-surface-cream">
                  <img
                    src={selectedArticle.image}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-primary/80 leading-relaxed font-sans">
                  <p className="font-semibold text-primary text-sm sm:text-base leading-snug">
                    {selectedArticle.excerpt}
                  </p>
                  <p>
                    {selectedArticle.content}
                  </p>
                  <p>
                    At Vitalis Health, every preventive biomarker is viewed not in isolation, but as a component of your long-term cellular vitality. Through multi-modal continuous telemetry, individualized clinical nutrition, and physician guidance, we empower proactive individuals across Singapore to reclaim authority over their longevity.
                  </p>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {selectedArticle.tags.map((t, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-full bg-surface-cream text-[10px] font-medium text-primary/70">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="px-6 py-2.5 rounded-full bg-primary text-white text-xs font-heading font-semibold"
                  >
                    Close Journal
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
