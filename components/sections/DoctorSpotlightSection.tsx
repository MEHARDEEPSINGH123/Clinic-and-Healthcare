"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope,
  Calendar,
  Languages,
  Clock,
  Award,
  ChevronLeft,
  ChevronRight,
  Shield,
  MapPin,
  Star,
  Sparkles,
} from "lucide-react";
import { getAllDoctors, getAllClinics } from "@/lib/data";
import { Doctor } from "@/lib/types";
import SafeImage from "@/components/ui/SafeImage";

interface DoctorSpotlightSectionProps {
  onBookDoctor: (doctor: Doctor) => void;
}

export default function DoctorSpotlightSection({ onBookDoctor }: DoctorSpotlightSectionProps) {
  const allDoctors = getAllDoctors();
  const clinics = getAllClinics();

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Filter doctors based on category
  const filteredDoctors = allDoctors.filter((doc) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Cardiology") return doc.specialtyName.includes("Cardiology");
    if (activeCategory === "Longevity & Metabolic") return doc.specialtyName.includes("Longevity") || doc.specialtyName.includes("Metabolic");
    if (activeCategory === "Women's & Family") return doc.specialtyName.includes("Women") || doc.specialtyName.includes("Family");
    if (activeCategory === "Specialists") return !doc.specialtyName.includes("Family");
    return true;
  });

  const safeIndex = currentIndex >= filteredDoctors.length ? 0 : currentIndex;
  const currentDoctor = filteredDoctors[safeIndex] || allDoctors[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredDoctors.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredDoctors.length) % filteredDoctors.length);
  };

  return (
    <section id="doctors" className="relative py-28 px-6 md:px-16 bg-surface-cream/50 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <span className="text-xs font-heading font-semibold text-secondary uppercase tracking-widest block mb-2">
              02 • Doctor Discovery
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-primary tracking-tight">
              Clinician{" "}
              <span className="font-editorial italic font-normal text-secondary">
                Spotlight Theater
              </span>
            </h2>
          </div>

          {/* Specialty Filter Pill Tabs */}
          <div className="flex flex-wrap gap-2">
            {["All", "Cardiology", "Longevity & Metabolic", "Women's & Family", "Specialists"].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentIndex(0);
                }}
                className={`px-4 py-2 rounded-full text-xs font-heading font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-sm"
                    : "bg-white text-primary/70 hover:bg-black/5 border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Spotlight Theater Container (Netflix-Style Immersive Presentation, NO CARDS) */}
        <div className="relative rounded-4xl bg-white border border-border shadow-float overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDoctor.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]"
            >
              {/* Left Column: Massive Immersive Portrait with Ambient Depth */}
              <div className="lg:col-span-5 relative bg-primary/5 min-h-[380px] lg:min-h-full overflow-hidden flex items-end justify-center">
                <SafeImage
                  src={currentDoctor.image}
                  alt={currentDoctor.name}
                  name={currentDoctor.name}
                  className="w-full h-full object-cover object-top absolute inset-0 transition-transform duration-700 hover:scale-105"
                />

                {/* Subtle Gradient Veil */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent pointer-events-none" />

                {/* Portrait Overlay Badges */}
                <div className="relative z-10 p-6 sm:p-8 w-full text-white space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-heading font-bold text-white border border-white/20">
                      {currentDoctor.specialtyName}
                    </span>
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-highlight text-primary text-[11px] font-heading font-bold">
                      <Star className="w-3 h-3 fill-primary" />
                      {currentDoctor.rating.toFixed(2)}
                    </span>
                  </div>

                  <div className="text-xs text-white/90 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-highlight" />
                    <span>{currentDoctor.clinicName}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Editorial Biography & Clinical Dossier */}
              <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 flex flex-col justify-between space-y-6">
                <div className="space-y-6">
                  {/* Top Doctor Meta Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border/70">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-secondary" />
                      <span className="text-xs font-heading font-semibold text-secondary uppercase tracking-wider">
                        {currentDoctor.availability}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-primary/60">
                      ID: <span className="font-mono text-primary">{currentDoctor.id}</span> • {currentDoctor.experienceYears} Years Practice
                    </div>
                  </div>

                  {/* Doctor Name & Credentials */}
                  <div>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-primary tracking-tight">
                      {currentDoctor.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-secondary font-medium font-sans mt-1">
                      {currentDoctor.credentials}
                    </p>
                  </div>

                  {/* Editorial Philosophy Quote */}
                  <blockquote className="font-editorial italic text-lg sm:text-xl text-primary/80 border-l-2 border-secondary pl-4 py-1 leading-snug">
                    "{currentDoctor.quote}"
                  </blockquote>

                  {/* Detailed Bio */}
                  <p className="text-xs sm:text-sm text-primary/70 leading-relaxed font-sans">
                    {currentDoctor.bio}
                  </p>

                  {/* Languages, Next Slot & Fee Badges */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3.5 rounded-2xl bg-surface-cream border border-border/70">
                      <div className="flex items-center gap-1.5 text-[11px] text-primary/60 font-semibold mb-1">
                        <Languages className="w-3.5 h-3.5 text-secondary" />
                        <span>Languages</span>
                      </div>
                      <div className="text-xs font-bold text-primary truncate">
                        {currentDoctor.languages.join(", ")}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-surface-cream border border-border/70">
                      <div className="flex items-center gap-1.5 text-[11px] text-primary/60 font-semibold mb-1">
                        <Clock className="w-3.5 h-3.5 text-secondary" />
                        <span>Next Slot</span>
                      </div>
                      <div className="text-xs font-bold text-primary truncate">
                        {currentDoctor.nextSlot}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-surface-cream border border-border/70">
                      <div className="flex items-center gap-1.5 text-[11px] text-primary/60 font-semibold mb-1">
                        <Award className="w-3.5 h-3.5 text-secondary" />
                        <span>Consultation Fee</span>
                      </div>
                      <div className="text-xs font-bold text-primary">
                        S$ {currentDoctor.consultationFeeSgd} SGD
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Bar & Netflix Slide Navigators */}
                <div className="pt-6 border-t border-border/70 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={handlePrev}
                      className="w-11 h-11 rounded-full border border-border hover:border-primary text-primary flex items-center justify-center transition-colors bg-white shadow-subtle hover:bg-surface-cream"
                      aria-label="Previous Doctor"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="text-xs font-heading font-semibold text-primary/70">
                      <span className="text-primary font-bold">{safeIndex + 1}</span> / {filteredDoctors.length} Clinicians
                    </div>

                    <button
                      onClick={handleNext}
                      className="w-11 h-11 rounded-full border border-border hover:border-primary text-primary flex items-center justify-center transition-colors bg-white shadow-subtle hover:bg-surface-cream"
                      aria-label="Next Doctor"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  <button
                    onClick={() => onBookDoctor(currentDoctor)}
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-white hover:bg-primary/95 text-xs font-heading font-semibold tracking-wide shadow-md transition-all flex items-center justify-center gap-2 group"
                  >
                    <Calendar className="w-4 h-4 text-highlight" />
                    <span>Book Appointment with {currentDoctor.name.split(" ")[1]}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Netflix-Style Clinician Thumbnail Ribbon */}
        <div className="mt-8 flex gap-3 overflow-x-auto pb-4 pt-1">
          {filteredDoctors.slice(0, 16).map((doc, idx) => {
            const isCurrent = idx === safeIndex;
            return (
              <button
                key={doc.id}
                onClick={() => setCurrentIndex(idx)}
                className={`flex-shrink-0 flex items-center gap-3 p-2.5 pr-4 rounded-2xl border transition-all text-left ${
                  isCurrent
                    ? "bg-white border-secondary ring-2 ring-secondary/20 shadow-md"
                    : "bg-white/60 hover:bg-white border-border/80 text-primary/70"
                }`}
              >
                <SafeImage
                  src={doc.image}
                  alt={doc.name}
                  name={doc.name}
                  className="w-10 h-10 rounded-xl object-cover"
                />
                <div className="min-w-0">
                  <div className="text-xs font-heading font-bold text-primary truncate max-w-[120px]">
                    {doc.name}
                  </div>
                  <div className="text-[10px] text-primary/60 truncate max-w-[120px]">
                    {doc.specialtyName.split("&")[0]}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
