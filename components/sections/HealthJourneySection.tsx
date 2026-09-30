"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Stethoscope,
  ShieldCheck,
  HeartPulse,
  Syringe,
  Activity,
  ArrowRight,
  Clock,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { getAllDoctors, getAllServices } from "@/lib/data";

interface HealthJourneySectionProps {
  onOpenBookingWithService?: (serviceName: string) => void;
}

interface JourneyPath {
  id: string;
  title: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  lightBg: string;
  description: string;
  timeEstimate: string;
  biometricFocus: string[];
  steps: { step: string; detail: string }[];
  matchedSpecialty: string;
}

const JOURNEY_PATHS: JourneyPath[] = [
  {
    id: "screening",
    title: "Health Screening",
    badge: "Cellular & Biomarkers",
    icon: Sparkles,
    accentColor: "#2A9D8F",
    lightBg: "rgba(42, 157, 143, 0.08)",
    description:
      "A comprehensive exploration of your cardiovascular compliance, biological age, metabolic flexibility, and cancer tumor markers.",
    timeEstimate: "90 - 120 Mins",
    biometricFocus: ["Epigenetic DNA Methylation", "ApoB & Lipid Subfractions", "Abdominal Ultrasound 3D", "Fasting HOMA-IR"],
    matchedSpecialty: "Executive Health Screening & Longevity",
    steps: [
      { step: "01. Intake", detail: "Digital pre-screening lifestyle & genomic audit" },
      { step: "02. Fasting Diagnostics", detail: "Point-of-care micro-draw & 12-lead resting ECG" },
      { step: "03. Specialist Consultation", detail: "45-minute physician dialogue on high-res displays" },
      { step: "04. App Sync", detail: "Encrypted results delivered within 4 hours with voice summary" },
    ],
  },
  {
    id: "general",
    title: "General Consultation",
    badge: "Primary Family Medicine",
    icon: Stethoscope,
    accentColor: "#264653",
    lightBg: "rgba(38, 70, 83, 0.08)",
    description:
      "Attentive, unhurried primary medical consultations for acute concerns, continuous wellness reviews, and medication management.",
    timeEstimate: "30 - 45 Mins",
    biometricFocus: ["Resting Vitals & Blood Pressure", "Auscultation & Lung Aeration", "Chronic Panel Titration", "Digital Prescription Dispatch"],
    matchedSpecialty: "Family Medicine & Primary Care",
    steps: [
      { step: "01. Check-In", detail: "Instant biometric pass scanning in private sanctuary" },
      { step: "02. Dialogue", detail: "Unhurried whole-person diagnostic inquiry" },
      { step: "03. Care Plan", detail: "Immediate pharmacy preparation or specialist referral" },
      { step: "04. Follow-Up", detail: "Automated digital check-in at Day 3 and Day 7" },
    ],
  },
  {
    id: "specialist",
    title: "Specialist Consultation",
    badge: "Tertiary Expertise",
    icon: ShieldCheck,
    accentColor: "#E76F51",
    lightBg: "rgba(231, 111, 81, 0.08)",
    description:
      "Direct access to Singapore's leading cardiologists, endocrinologists, gynaecologists, neurologists, and sports biomechanists.",
    timeEstimate: "45 - 60 Mins",
    biometricFocus: ["Echocardiography Doppler", "Hormonal Steroid Cascade", "Neuro-Cognitive Processing", "Joint Ultrasound"],
    matchedSpecialty: "Cardiology & Vascular Health",
    steps: [
      { step: "01. Medical Records Review", detail: "Pre-consultation review of prior hospital scans" },
      { step: "02. Deep In-Clinic Imaging", detail: "High-resolution ultrasound and diagnostic telemetry" },
      { step: "03. Multi-Disciplinary Action", detail: "Individualized therapeutic roadmap" },
      { step: "04. Direct Concierge", detail: "Dedicated care coordinator for repeat scans and insurance" },
    ],
  },
  {
    id: "preventive",
    title: "Preventive Care",
    badge: "Longevity Optimization",
    icon: HeartPulse,
    accentColor: "#2A9D8F",
    lightBg: "rgba(42, 157, 143, 0.08)",
    description:
      "Proactive interventions to arrest chronic disease trajectories decades before symptoms manifest. Designed around cellular vitality.",
    timeEstimate: "60 Mins",
    biometricFocus: ["Carotid CIMT Thickness", "Visceral Adiposity DEXA", "Continuous Glucose Telemetry", "Inflammatory hs-CRP"],
    matchedSpecialty: "Preventive Medicine & Longevity",
    steps: [
      { step: "01. Phenotype Mapping", detail: "Metabolic risk calculation and family history audit" },
      { step: "02. Continuous Sensor Setup", detail: "14-day CGM application and real-time telemetry pairing" },
      { step: "03. Nutrition Coaching", detail: "Nutrigenomic meal architecture and supplement plan" },
      { step: "04. 90-Day Milestone", detail: "Repeat fingerprick and insulin sensitivity verification" },
    ],
  },
  {
    id: "vaccination",
    title: "Vaccination",
    badge: "Immune Architecture",
    icon: Syringe,
    accentColor: "#E9C46A",
    lightBg: "rgba(233, 196, 106, 0.12)",
    description:
      "Singapore National Childhood Immunisation Schedule, adult influenza/pneumococcal updates, and global travel health prophylaxis.",
    timeEstimate: "20 - 30 Mins",
    biometricFocus: ["Antibody Titers Assay", "Travel Destination Profiling", "Cold-Chain Verified Vaccines", "NIR Record Sync"],
    matchedSpecialty: "Travel Medicine & Immunization",
    steps: [
      { step: "01. Pre-Immune Screen", detail: "Allergy and contraindication check with doctor" },
      { step: "02. Gentle Administration", detail: "Acoustic lounge setting with soothing numbing options" },
      { step: "03. 15-Min Quiet Lounge", detail: "Organic herbal hydration and observation" },
      { step: "04. NIR & HealthHub Sync", detail: "Instant certificate update to Singapore MOH portal" },
    ],
  },
  {
    id: "wellness",
    title: "Wellness Program",
    badge: "Holistic Healthspan",
    icon: Activity,
    accentColor: "#264653",
    lightBg: "rgba(38, 70, 83, 0.08)",
    description:
      "Longitudinal sleep architecture resets, stress resilience coaching, gut microbiome restoration, and ergonomic kinetic alignment.",
    timeEstimate: "Ongoing 90-Day",
    biometricFocus: ["REM & Slow-Wave Sleep %", "Heart Rate Variability (HRV)", "Gut Microbiome Diversity", "Cortisol Circadian Arc"],
    matchedSpecialty: "Sleep Medicine & Circadian Rhythm",
    steps: [
      { step: "01. Baseline Assessment", detail: "Comprehensive sleep and microbiome telemetry kit" },
      { step: "02. Protocol Blueprint", detail: "Chronotype light therapy and nutritional micro-habits" },
      { step: "03. Weekly Care Check-in", detail: "Direct digital coach telemetry messaging" },
      { step: "04. Milestone Celebrate", detail: "Documented sleep quality score improvement >35%" },
    ],
  },
];

export default function HealthJourneySection({ onOpenBookingWithService }: HealthJourneySectionProps) {
  const [selectedPathId, setSelectedPathId] = useState<string>("screening");
  const activePath = JOURNEY_PATHS.find((p) => p.id === selectedPathId) || JOURNEY_PATHS[0];

  return (
    <section id="journey" className="relative py-24 px-6 md:px-16 transition-colors duration-700 bg-background">
      {/* Section Header */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center md:text-left md:flex md:items-end md:justify-between mb-12">
          <div>
            <span className="text-xs font-heading font-semibold text-secondary uppercase tracking-widest block mb-2">
              01 • Tailored Care Pathways
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-primary tracking-tight">
              Your Guided{" "}
              <span className="font-editorial italic font-normal text-secondary">
                Health Journey
              </span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 max-w-md text-sm text-primary/70">
            Healthcare should adapt to you, not the other way around. Select your primary intent to
            explore our personalized clinical roadmap.
          </p>
        </div>

        {/* 6 Adaptive Choices Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 p-2 rounded-3xl bg-white/70 border border-border shadow-subtle mb-10">
          {JOURNEY_PATHS.map((path) => {
            const Icon = path.icon;
            const isSelected = selectedPathId === path.id;

            return (
              <button
                key={path.id}
                onClick={() => setSelectedPathId(path.id)}
                className={`p-3.5 rounded-2xl flex flex-col items-center sm:items-start text-left transition-all duration-300 relative ${
                  isSelected
                    ? "bg-white shadow-elevation border border-border text-primary scale-100"
                    : "text-primary/60 hover:text-primary hover:bg-black/[0.02]"
                }`}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mb-2 transition-colors"
                  style={{
                    backgroundColor: isSelected ? path.accentColor : "transparent",
                    color: isSelected ? "#FFFFFF" : path.accentColor,
                  }}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="text-xs font-heading font-bold tracking-tight truncate w-full text-center sm:text-left">
                  {path.title}
                </div>
                <div className="text-[10px] text-primary/50 hidden sm:block truncate mt-0.5">
                  {path.badge}
                </div>

                {isSelected && (
                  <motion.div
                    layoutId="activeJourneyDot"
                    className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: path.accentColor }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Adaptive Dynamic Experience Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePath.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="rounded-4xl p-6 sm:p-10 md:p-12 border border-border shadow-elevation bg-white relative overflow-hidden"
            style={{
              background: `radial-gradient(circle at 90% 10%, ${activePath.lightBg}, #FFFFFF 70%)`,
            }}
          >
            {/* Top Row: Title, Summary, Time badge */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-border/80">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-heading font-semibold text-white shadow-sm"
                  style={{ backgroundColor: activePath.accentColor }}
                >
                  <span>{activePath.badge}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-primary">
                  {activePath.title} Experience
                </h3>
                <p className="text-sm sm:text-base text-primary/75 leading-relaxed">
                  {activePath.description}
                </p>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 p-4 rounded-2xl bg-surface-cream border border-border">
                <div className="flex items-center gap-1.5 text-xs text-primary/60 font-medium">
                  <Clock className="w-3.5 h-3.5 text-primary/60" />
                  <span>Duration</span>
                </div>
                <div className="text-base sm:text-lg font-heading font-bold text-primary">
                  {activePath.timeEstimate}
                </div>
              </div>
            </div>

            {/* Middle Row: Biometric Focus & Steps Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8">
              {/* Biometrics Column */}
              <div className="lg:col-span-4 space-y-4">
                <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-primary/60">
                  Target Biometric Insights
                </h4>
                <div className="space-y-2.5">
                  {activePath.biometricFocus.map((bio, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-2xl bg-surface-cream/70 border border-border/60 flex items-center gap-3 text-xs font-medium text-primary"
                    >
                      <CheckCircle2
                        className="w-4 h-4 flex-shrink-0"
                        style={{ color: activePath.accentColor }}
                      />
                      <span>{bio}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Steps Timeline Column */}
              <div className="lg:col-span-8 space-y-4">
                <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-primary/60">
                  Clinical Pathway Roadmap
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {activePath.steps.map((st, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl border border-border/80 bg-white/90 shadow-subtle hover:shadow transition-shadow"
                    >
                      <div
                        className="text-xs font-heading font-bold mb-1"
                        style={{ color: activePath.accentColor }}
                      >
                        {st.step}
                      </div>
                      <p className="text-xs text-primary/80 leading-relaxed font-sans">
                        {st.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Bar: Matched Specialty & Booking Trigger */}
            <div className="pt-6 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-primary/70 text-center sm:text-left">
                Primary Specialty: <strong className="text-primary font-semibold">{activePath.matchedSpecialty}</strong>
              </div>

              <button
                onClick={() => onOpenBookingWithService?.(activePath.title)}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full text-white font-heading font-semibold text-xs tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                style={{ backgroundColor: activePath.accentColor }}
              >
                <span>Schedule {activePath.title}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
