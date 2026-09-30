"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Heart,
  Clock,
  Bell,
  CheckCircle2,
  Calendar,
  Volume2,
  Play,
  Pause,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { getAllFollowUpPrograms } from "@/lib/data";

export default function FollowUpTimelineSection() {
  const programs = getAllFollowUpPrograms();
  const [selectedProgramIndex, setSelectedProgramIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [completedReminders, setCompletedReminders] = useState<Record<string, boolean>>({
    "R1-0": true,
    "R2-0": true,
  });

  const activeProgram = programs[selectedProgramIndex] || programs[0];

  const toggleReminder = (id: string) => {
    setCompletedReminders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const milestones = [
    { day: "Day 01", title: "Diagnostic Baseline", desc: "Whole-body blood draw & resting ECG processed", status: "completed" },
    { day: "Day 07", title: "CGM Telemetry Sync", desc: "Sensor paired with Vitalis App for glycemic trends", status: "completed" },
    { day: "Day 30", title: "Circadian Review", desc: "Sleep architecture adjustments with Dr. Valerie Neo", status: "current" },
    { day: "Day 60", title: "Biomarker Re-Check", desc: "Point-of-care micro-draw for ApoB & hs-CRP", status: "upcoming" },
    { day: "Day 90", title: "Longevity Graduation", desc: "Biological age audit & ongoing year-round plan", status: "upcoming" },
  ];

  return (
    <section className="relative py-28 px-6 md:px-16 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-heading font-semibold text-secondary uppercase tracking-widest block mb-2">
            07 • Follow-Up Care & Journey
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-primary tracking-tight">
            Continuous Care{" "}
            <span className="font-editorial italic font-normal text-secondary">
              Beyond Appointments
            </span>
          </h2>
          <p className="mt-3 text-sm text-primary/70">
            Medicine shouldn't end when you leave the clinic. We stay by your side through 90-day
            milestones, telemetry reminders, and doctor voice summaries.
          </p>
        </div>

        {/* Follow-up Program Selector Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
          {programs.slice(0, 5).map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setSelectedProgramIndex(idx)}
              className={`px-4 py-2.5 rounded-full text-xs font-heading font-semibold whitespace-nowrap transition-all ${
                selectedProgramIndex === idx
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white text-primary/70 hover:bg-black/5 border border-border"
              }`}
            >
              {p.title.split("90-Day")[0]}
            </button>
          ))}
        </div>

        {/* Main 2-Column Interface: Progress Dashboard & Reminder Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Apple Health Style Circular Progress & Biomarker Dashboard */}
          <div className="lg:col-span-5 rounded-4xl bg-white border border-border shadow-elevation p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div>
                <span className="text-[10px] font-heading font-bold text-secondary uppercase tracking-widest">
                  Longitudinal Protocol
                </span>
                <h3 className="text-xl font-heading font-bold text-primary mt-0.5">
                  {activeProgram.title}
                </h3>
              </div>
              <span className="text-xs font-mono px-2 py-1 rounded-full bg-surface-cream text-primary/70">
                {activeProgram.id}
              </span>
            </div>

            {/* Apple Health Style Rings Visualization */}
            <div className="p-6 rounded-3xl bg-surface-cream flex items-center justify-around gap-4">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#E5E5E5"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke={activeProgram.color}
                    strokeWidth="10"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 * (1 - activeProgram.progressPercent / 100)}
                    strokeLinecap="round"
                    fill="none"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute text-center">
                  <div className="text-2xl font-heading font-bold text-primary">
                    {activeProgram.progressPercent}%
                  </div>
                  <div className="text-[9px] font-semibold text-primary/50 uppercase">
                    Achieved
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: activeProgram.color }} />
                  <span className="font-semibold text-primary">Target Goal</span>
                </div>
                <p className="text-[11px] text-primary/70 leading-snug max-w-[160px]">
                  {activeProgram.targetGoal}
                </p>
                <div className="text-[10px] font-semibold text-secondary pt-1">
                  {activeProgram.currentMilestone}
                </div>
              </div>
            </div>

            {/* Simulated Apple-Voice Memo Audio Summary */}
            <div className="p-4 rounded-2xl bg-white border border-border flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center shadow-sm hover:scale-105 transition-transform"
                >
                  {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <div className="text-xs">
                  <div className="font-heading font-bold text-primary">
                    Doctor Audio Memo (2:14)
                  </div>
                  <div className="text-[11px] text-primary/60">
                    Dr. Alistair Chen • Lipid Subfractions Summary
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <span className={`w-1 h-4 bg-secondary rounded-full ${isPlayingAudio ? "animate-pulse" : ""}`} />
                <span className={`w-1 h-6 bg-secondary rounded-full ${isPlayingAudio ? "animate-pulse delay-75" : ""}`} />
                <span className={`w-1 h-3 bg-secondary rounded-full ${isPlayingAudio ? "animate-pulse delay-150" : ""}`} />
              </div>
            </div>

            {/* Interactive Daily Reminders Checklist */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-heading font-bold text-primary/70 uppercase tracking-wider">
                <span>Daily Telemetry Reminders</span>
                <Bell className="w-3.5 h-3.5 text-secondary" />
              </div>

              {activeProgram.reminders.map((rem) => {
                const isDone = !!completedReminders[rem.id];
                return (
                  <div
                    key={rem.id}
                    onClick={() => toggleReminder(rem.id)}
                    className={`cursor-pointer p-3 rounded-2xl border transition-all flex items-center justify-between ${
                      isDone
                        ? "bg-secondary/5 border-secondary/30 text-primary"
                        : "bg-surface-cream/50 hover:bg-surface-cream border-border text-primary/70"
                    }`}
                  >
                    <div className="flex items-center gap-3 text-xs">
                      <CheckCircle2
                        className={`w-4 h-4 flex-shrink-0 ${
                          isDone ? "text-secondary" : "text-primary/20"
                        }`}
                      />
                      <span className={isDone ? "line-through text-primary/50" : "font-medium"}>
                        {rem.task}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-primary/50 pl-2">
                      {rem.time}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Longitudinal Patient Journey Milestones */}
          <div className="lg:col-span-7 rounded-4xl bg-white border border-border shadow-elevation p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-[10px] font-heading font-bold text-secondary uppercase tracking-widest">
                90-Day Trajectory
              </span>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-primary mt-1">
                Patient Journey Milestones
              </h3>
              <p className="text-xs text-primary/60 mt-0.5">
                Every milestone is paired with verified laboratory markers and direct clinical review.
              </p>
            </div>

            <div className="space-y-4 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-border">
              {milestones.map((m, i) => (
                <div key={i} className="relative flex items-start gap-5 pl-1">
                  {/* Step Dot */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono z-10 ${
                      m.status === "completed"
                        ? "bg-secondary text-white ring-4 ring-white"
                        : m.status === "current"
                        ? "bg-primary text-highlight ring-4 ring-white animate-pulse"
                        : "bg-surface-cream text-primary/40 border border-border ring-4 ring-white"
                    }`}
                  >
                    {i + 1}
                  </div>

                  <div className="flex-1 p-4 rounded-2xl bg-surface-cream/70 border border-border/80">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="text-xs font-heading font-bold text-primary">
                        {m.title}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white text-primary/60 border border-border">
                        {m.day}
                      </span>
                    </div>
                    <p className="text-xs text-primary/70 font-sans">
                      {m.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-between text-xs">
              <span className="text-primary font-medium">
                Next scheduled review: <strong>14 Oct 2026 at Guoco Tower</strong>
              </span>
              <span className="text-secondary font-bold font-heading">Active</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
