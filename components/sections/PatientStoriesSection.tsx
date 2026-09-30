"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  MapPin,
} from "lucide-react";
import { getAllReviews } from "@/lib/data";
import SafeImage from "@/components/ui/SafeImage";

export default function PatientStoriesSection() {
  const reviews = getAllReviews();
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentReview = reviews[currentIndex] || reviews[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="relative py-28 px-6 md:px-16 bg-surface-cream/40 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-heading font-semibold text-secondary uppercase tracking-widest block mb-2">
              10 • Editorial Testimonials
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-primary tracking-tight">
              Patient{" "}
              <span className="font-editorial italic font-normal text-secondary">
                Stories
              </span>
            </h2>
            <p className="mt-2 text-sm text-primary/70 max-w-lg">
              Authentic journeys from over 200 verified patients who transformed their biological health
              and redefined what healthcare feels like.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-full border border-border bg-white text-primary flex items-center justify-center hover:bg-surface-cream shadow-subtle transition-all"
              aria-label="Previous Story"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-heading font-semibold text-primary/70">
              {currentIndex + 1} / {reviews.length}
            </span>
            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full border border-border bg-white text-primary flex items-center justify-center hover:bg-surface-cream shadow-subtle transition-all"
              aria-label="Next Story"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Editorial Story Theater */}
        <div className="rounded-4xl bg-white border border-border shadow-float p-6 sm:p-10 md:p-14 relative overflow-hidden">
          <Quote className="w-20 h-20 text-secondary/10 absolute top-8 right-8 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Portrait & Key Biomarker Metric */}
              <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <SafeImage
                    src={currentReview.avatar}
                    alt={currentReview.author}
                    name={currentReview.author}
                    className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover shadow-elevation border-2 border-white ring-4 ring-secondary/10"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center shadow-md">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-heading font-bold text-primary">
                    {currentReview.author}
                  </h3>
                  <p className="text-xs text-primary/60 font-sans mt-0.5">
                    {currentReview.role}
                  </p>
                </div>

                {/* Highlight Biomarker Metric */}
                <div className="px-4 py-2 rounded-2xl bg-secondary/10 border border-secondary/20 text-xs font-heading font-bold text-secondary flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{currentReview.highlightMetric}</span>
                </div>
              </div>

              {/* Right Column: Large Editorial Quote & Story */}
              <div className="lg:col-span-8 space-y-6">
                {/* 5-Star Rating & Location */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/70">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-highlight fill-highlight" />
                    ))}
                    <span className="text-xs font-heading font-bold text-primary ml-1.5">
                      5.0 Verified Experience
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-primary/60">
                    <MapPin className="w-3.5 h-3.5 text-secondary" />
                    <span>{currentReview.clinicLocation}</span>
                  </div>
                </div>

                {/* Large Editorial Headline Quote */}
                <blockquote className="text-xl sm:text-2xl md:text-3xl font-editorial italic font-normal text-primary leading-snug">
                  "{currentReview.quote}"
                </blockquote>

                {/* In-depth Narrative */}
                <p className="text-xs sm:text-sm text-primary/75 leading-relaxed font-sans">
                  {currentReview.fullStory}
                </p>

                {/* Service Tag & Date */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-primary/50 font-mono">
                  <span>Service: {currentReview.serviceReceived}</span>
                  <span>Reviewed: {currentReview.date}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnail Selector Strip */}
        <div className="mt-8 flex gap-3 overflow-x-auto pb-2 justify-start sm:justify-center">
          {reviews.slice(0, 5).map((rev, idx) => (
            <button
              key={rev.id}
              onClick={() => setCurrentIndex(idx)}
              className={`flex items-center gap-2.5 p-2 pr-3.5 rounded-2xl border transition-all ${
                currentIndex === idx
                  ? "bg-white border-secondary ring-2 ring-secondary/20 shadow-sm"
                  : "bg-white/60 hover:bg-white border-border text-primary/70"
              }`}
            >
              <SafeImage
                src={rev.avatar}
                alt={rev.author}
                name={rev.author}
                className="w-8 h-8 rounded-xl object-cover"
              />
              <span className="text-xs font-heading font-semibold text-primary">
                {rev.author.split(" ")[0]}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
