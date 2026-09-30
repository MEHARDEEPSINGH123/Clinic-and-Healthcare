"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Droplets,
  Activity,
  ShieldCheck,
  Smartphone,
  CalendarCheck,
  CheckSquare,
  Square,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { getAllPreparationInstructions } from "@/lib/data";

export default function PreparationCenterSection() {
  const instructions = getAllPreparationInstructions();
  const [activePhase, setActivePhase] = useState<"before" | "during" | "after">("before");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const phaseInstructions = instructions.filter((i) => i.phase === activePhase);

  const phaseMeta = {
    before: {
      title: "Before Your Appointment",
      subtitle: "Preparing your metabolic biomarkers for precision reading.",
      timing: "T-minus 12 Hours to Arrival",
      color: "#2A9D8F",
    },
    during: {
      title: "During Your Appointment",
      subtitle: "Acoustic peace, zero waiting lines, and dignified examinations.",
      timing: "Inside Our Clinic Sanctuary",
      color: "#264653",
    },
    after: {
      title: "After Your Appointment",
      subtitle: "Immediate digital telemetry, physician voice memos & long-term support.",
      timing: "Post-Consultation & Longitudinal Care",
      color: "#E76F51",
    },
  };

  const activeMeta = phaseMeta[activePhase];

  return (
    <section className="relative py-28 px-6 md:px-16 bg-surface-cream/50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-heading font-semibold text-secondary uppercase tracking-widest block mb-2">
            06 • Preparation Center
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-primary tracking-tight">
            Seamless Care{" "}
            <span className="font-editorial italic font-normal text-secondary">
              Timeline
            </span>
          </h2>
          <p className="mt-3 text-sm text-primary/70">
            Clarity eliminates clinical friction. Explore what to expect before, during, and after your visit.
          </p>
        </div>

        {/* 3-Phase Interactive Timeline Pills */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-full bg-white border border-border shadow-subtle gap-2">
            {(["before", "during", "after"] as const).map((phase) => {
              const isSelected = activePhase === phase;
              return (
                <button
                  key={phase}
                  onClick={() => setActivePhase(phase)}
                  className={`px-6 py-2.5 rounded-full text-xs font-heading font-semibold capitalize transition-all ${
                    isSelected
                      ? "bg-primary text-white shadow-sm"
                      : "text-primary/70 hover:text-primary hover:bg-black/5"
                  }`}
                >
                  {phase === "before" && "Before Appointment"}
                  {phase === "during" && "During Appointment"}
                  {phase === "after" && "After Appointment"}
                </button>
              );
            })}
          </div>
        </div>

        {/* Phase Timeline Card Deck */}
        <motion.div
          key={activePhase}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-4xl bg-white border border-border shadow-elevation p-6 sm:p-10 md:p-12 space-y-8"
        >
          {/* Timeline Phase Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-border/80 gap-4">
            <div>
              <span className="text-xs font-heading font-bold text-secondary uppercase tracking-wider">
                {activeMeta.timing}
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-primary mt-1">
                {activeMeta.title}
              </h3>
              <p className="text-xs sm:text-sm text-primary/70 mt-1">
                {activeMeta.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-surface-cream text-xs text-primary/80 font-medium border border-border">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span>Visual Checklist Active</span>
            </div>
          </div>

          {/* Visual Instruction Grid (Not text heavy!) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {phaseInstructions.slice(0, 6).map((item, idx) => {
              const isChecked = !!checkedItems[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`cursor-pointer p-5 rounded-3xl border transition-all flex flex-col justify-between ${
                    isChecked
                      ? "bg-secondary/5 border-secondary/40 shadow-sm"
                      : "bg-surface-cream/50 hover:bg-surface-cream border-border/80"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white text-primary/60 border border-border">
                        {item.timing}
                      </span>
                      <button className="text-secondary">
                        {isChecked ? (
                          <CheckSquare className="w-5 h-5 text-secondary" />
                        ) : (
                          <Square className="w-5 h-5 text-primary/30 hover:text-primary/60" />
                        )}
                      </button>
                    </div>

                    <h4 className="text-sm font-heading font-bold text-primary mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-primary/70 leading-relaxed font-sans">
                      {item.actionItem}
                    </p>
                  </div>

                  {/* Bullet tips */}
                  <div className="mt-4 pt-3 border-t border-border/50 space-y-1">
                    {item.vitalTips.map((tip, tipIdx) => (
                      <div key={tipIdx} className="text-[11px] text-primary/60 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-secondary" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Fasting & Hydration Calculator Pill */}
          <div className="p-4 sm:p-5 rounded-2xl bg-surface-cream border border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0">
                <Droplets className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-primary font-heading font-bold block">Water Is Encouraged</strong>
                <span className="text-primary/70">Fasting does not mean dehydration. Pure drinking water keeps veins plump and ensures effortless blood draws.</span>
              </div>
            </div>
            <span className="font-mono text-[11px] text-secondary font-semibold whitespace-nowrap">
              08-Hr Window Recommended
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
