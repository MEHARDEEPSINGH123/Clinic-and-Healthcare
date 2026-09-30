"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  ShieldCheck,
  Heart,
  PhoneCall,
  Clock,
  MapPin,
  ArrowRight,
} from "lucide-react";

interface FinalExperienceSectionProps {
  onOpenBooking: () => void;
}

export default function FinalExperienceSection({ onOpenBooking }: FinalExperienceSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-between px-6 md:px-16 pt-24 pb-12 bg-primary text-white overflow-hidden">
      {/* Ambient Breathing Lighting Elements */}
      <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] rounded-full bg-secondary/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-[450px] h-[450px] rounded-full bg-highlight/10 blur-[120px] pointer-events-none" />

      {/* Main Center Fullscreen CTA */}
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center my-auto py-12 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Subtle Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-highlight font-heading font-semibold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-highlight" />
            <span>Vitalis Health • Singapore</span>
          </div>

          {/* Prompt Required Headline */}
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-heading font-bold tracking-tight leading-[1.05] text-white">
            Your Health. <br />
            <span className="font-editorial italic font-normal text-secondary-light">
              Designed Around You.
            </span>
          </h2>

          <p className="max-w-xl mx-auto text-sm sm:text-base text-white/70 font-sans leading-relaxed">
            Experience the calm, unhurried precision of modern healthcare. 20 clinic sanctuaries,
            80 specialists, and a lifetime of proactive cellular longevity.
          </p>

          {/* Button: Book Appointment */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-10 py-5 rounded-full bg-secondary text-white hover:bg-secondary-light font-heading font-bold text-sm tracking-wide shadow-float transition-all hover:scale-105 flex items-center justify-center gap-2.5 group"
            >
              <Calendar className="w-4 h-4 text-highlight" />
              <span>Book Appointment</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#journey"
              className="w-full sm:w-auto px-8 py-5 rounded-full bg-white/10 hover:bg-white/15 text-white font-heading font-semibold text-xs tracking-wide border border-white/20 transition-all text-center"
            >
              Explore Guided Pathways
            </a>
          </div>
        </motion.div>
      </div>

      {/* Footer & Credibility Layer */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-10 border-t border-white/10 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-highlight font-heading font-bold text-sm">
              V
            </div>
            <div>
              <span className="font-heading font-bold text-white text-sm block">Vitalis Health</span>
              <span className="text-[11px] text-white/50">Care Beyond Appointments • Singapore</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
            <a href="#journey" className="hover:text-white transition-colors">Journey</a>
            <a href="#doctors" className="hover:text-white transition-colors">Doctors</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#appointments" className="hover:text-white transition-colors">Appointments</a>
            <a href="#insurance" className="hover:text-white transition-colors">Insurance</a>
            <a href="#packages" className="hover:text-white transition-colors">Packages</a>
            <a href="#locations" className="hover:text-white transition-colors">Locations</a>
            <a href="#resources" className="hover:text-white transition-colors">Resources</a>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-white/50">
            <ShieldCheck className="w-4 h-4 text-secondary" />
            <span>MOH Accredited Clinic Network</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-white/40 pt-4 border-t border-white/5 font-sans">
          <p>© 2026 Vitalis Health Pte. Ltd. All rights reserved. For life-threatening emergencies, please dial 995 immediately.</p>
          <p>SingPass & Medisave Approved Electronic Claims Portal.</p>
        </div>
      </div>
    </section>
  );
}
