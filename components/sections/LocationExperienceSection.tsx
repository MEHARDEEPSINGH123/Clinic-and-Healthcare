"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Clock,
  Car,
  Train,
  CheckCircle2,
  Stethoscope,
  Phone,
  ArrowRight,
  Shield,
  Building,
} from "lucide-react";
import { getAllClinics, getAllDoctors } from "@/lib/data";
import { Clinic } from "@/lib/types";
import SafeImage from "@/components/ui/SafeImage";

interface LocationExperienceSectionProps {
  onSelectClinicForBooking: (clinicId: string) => void;
}

export default function LocationExperienceSection({ onSelectClinicForBooking }: LocationExperienceSectionProps) {
  const clinics = getAllClinics();
  const doctors = getAllDoctors();
  const [selectedClinicId, setSelectedClinicId] = useState<string>(clinics[0]?.id || "CL001");
  const [activeRegion, setActiveRegion] = useState<string>("All");

  const activeClinic = clinics.find((c) => c.id === selectedClinicId) || clinics[0];

  // Doctors on duty at active clinic
  const onDutyDoctors = doctors.filter((d) => d.clinicId === activeClinic.id).slice(0, 3);

  const regions = ["All", "Central / CBD", "East Coast", "West / Innovation", "North"];

  const filteredClinics = clinics.filter((c) => {
    if (activeRegion === "All") return true;
    if (activeRegion === "Central / CBD") return c.district.includes("Downtown") || c.district.includes("Orchard") || c.district.includes("Novena") || c.district.includes("Raffles") || c.district.includes("Tanjong Pagar") || c.district.includes("Bugis");
    if (activeRegion === "East Coast") return c.district.includes("East") || c.district.includes("Katong") || c.district.includes("Tampines") || c.district.includes("Changi") || c.district.includes("Paya Lebar");
    if (activeRegion === "West / Innovation") return c.district.includes("West") || c.district.includes("Jurong") || c.district.includes("Holland") || c.district.includes("Clementi") || c.district.includes("One-North");
    if (activeRegion === "North") return c.district.includes("North") || c.district.includes("Woodlands") || c.district.includes("Bishan") || c.district.includes("Ang Mo Kio") || c.district.includes("Serangoon");
    return true;
  });

  return (
    <section id="locations" className="relative py-28 px-6 md:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-heading font-semibold text-secondary uppercase tracking-widest block mb-2">
              09 • Sanctuary Locations
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-primary tracking-tight">
              Interactive{" "}
              <span className="font-editorial italic font-normal text-secondary">
                Singapore Network
              </span>
            </h2>
            <p className="mt-2 text-sm text-primary/70 max-w-lg">
              20 private healthcare sanctuaries positioned across Singapore's key business, residential,
              and wellness hubs. Each location is directly connected to primary MRT transit lines.
            </p>
          </div>

          {/* Region Tabs */}
          <div className="flex flex-wrap gap-2">
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => setActiveRegion(r)}
                className={`px-4 py-2 rounded-full text-xs font-heading font-semibold transition-all ${
                  activeRegion === r
                    ? "bg-primary text-white shadow-sm"
                    : "bg-white text-primary/70 hover:bg-black/5 border border-border"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Map & Clinic Dossier Split Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Stylized Singapore SVG Map */}
          <div className="lg:col-span-7 rounded-4xl bg-white border border-border shadow-elevation p-6 sm:p-8 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                <span className="text-xs font-heading font-bold text-primary uppercase tracking-wider">
                  Singapore Island Topology
                </span>
              </div>
              <span className="text-[11px] text-primary/50 font-medium">
                Click any pin to inspect sanctuary
              </span>
            </div>

            {/* Stylized Singapore Canvas / SVG container */}
            <div className="relative w-full aspect-[16/10] bg-surface-cream rounded-3xl border border-border/80 overflow-hidden flex items-center justify-center p-4">
              {/* Stylized Island Background Contour */}
              <svg
                viewBox="0 0 1000 620"
                className="w-full h-full object-contain filter drop-shadow-sm select-none"
              >
                {/* Singapore Mainland stylized silhouette */}
                <path
                  d="M160,280 C210,220 280,180 380,170 C470,160 550,180 630,220 C710,240 820,250 880,310 C920,350 890,410 830,440 C750,460 670,470 580,480 C490,490 390,485 300,470 C220,450 170,410 140,360 C130,330 140,300 160,280 Z"
                  fill="#EDE8DC"
                  stroke="#D8D2C2"
                  strokeWidth="3"
                />
                {/* Sentosa Island */}
                <path
                  d="M440,510 C470,510 500,520 490,540 C460,550 430,540 440,510 Z"
                  fill="#EDE8DC"
                  stroke="#D8D2C2"
                  strokeWidth="2"
                />
                {/* Pulau Ubin & Tekong subtle hints */}
                <path
                  d="M780,180 C820,180 850,200 840,220 C810,220 780,200 780,180 Z"
                  fill="#EDE8DC"
                  stroke="#D8D2C2"
                  strokeWidth="2"
                />

                {/* Major Expressways / MRT Lines Graphic Accents */}
                <path
                  d="M200,320 L500,430 L850,330"
                  fill="none"
                  stroke="#2A9D8F"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  opacity="0.3"
                />
                <path
                  d="M380,180 L520,380 L510,480"
                  fill="none"
                  stroke="#E76F51"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  opacity="0.3"
                />
              </svg>

              {/* Clinic Pins Positioned Absolutely */}
              {clinics.map((c) => {
                const isSelected = selectedClinicId === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedClinicId(c.id)}
                    style={{
                      left: `${c.mapX}%`,
                      top: `${c.mapY}%`,
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 z-20 ${
                      isSelected ? "scale-125 z-30" : "scale-90 hover:scale-110 opacity-80 hover:opacity-100"
                    }`}
                    title={c.name}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shadow-md transition-all ${
                        isSelected
                          ? "bg-secondary text-white ring-4 ring-secondary/30"
                          : "bg-primary text-highlight hover:bg-secondary hover:text-white"
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                    </div>

                    {/* Pin Label on Hover or Active */}
                    {isSelected && (
                      <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded-md bg-primary text-white text-[10px] font-heading font-semibold whitespace-nowrap shadow-md pointer-events-none">
                        {c.name.replace("Vitalis ", "")}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick Clinic Badges Selector Strip */}
            <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
              {filteredClinics.map((c) => {
                const isSelected = selectedClinicId === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedClinicId(c.id)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-medium whitespace-nowrap transition-all ${
                      isSelected
                        ? "bg-primary text-white shadow-sm"
                        : "bg-surface-cream text-primary/70 hover:bg-black/5"
                    }`}
                  >
                    {c.name.replace("Vitalis ", "")}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Clinic Sanctuary Detail Dossier */}
          <div className="lg:col-span-5 sticky top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeClinic.id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }}
                className="rounded-4xl bg-white border border-border shadow-elevation overflow-hidden"
              >
                {/* Image Banner */}
                <div className="relative h-44 w-full overflow-hidden bg-primary/10">
                  <img
                    src={activeClinic.image}
                    alt={activeClinic.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white">
                    <span className="text-[11px] font-heading font-bold px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20">
                      {activeClinic.tag}
                    </span>
                    <span className="text-xs font-mono opacity-80">{activeClinic.id}</span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                  {/* Clinic Name & Address */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-primary">
                      {activeClinic.name}
                    </h3>
                    <p className="text-xs text-primary/70 mt-1 font-sans">
                      {activeClinic.address}, Singapore {activeClinic.postalCode}
                    </p>
                  </div>

                  {/* Nearest MRT & Parking */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-2xl bg-surface-cream border border-border">
                      <div className="flex items-center gap-1.5 text-[11px] text-primary/60 font-medium mb-1">
                        <Train className="w-3.5 h-3.5 text-secondary" />
                        <span>Nearest Transit</span>
                      </div>
                      <div className="text-xs font-bold text-primary truncate">
                        {activeClinic.mrt}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-surface-cream border border-border">
                      <div className="flex items-center gap-1.5 text-[11px] text-primary/60 font-medium mb-1">
                        <Clock className="w-3.5 h-3.5 text-secondary" />
                        <span>Hours</span>
                      </div>
                      <div className="text-xs font-bold text-primary truncate">
                        {activeClinic.openingHours}
                      </div>
                    </div>
                  </div>

                  {/* Facilities */}
                  <div>
                    <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-primary/70 mb-2">
                      Sanctuary Amenities
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {activeClinic.facilities.map((fac, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-full bg-surface-cream border border-border text-[11px] text-primary/80 font-medium"
                        >
                          {fac}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Parking Information */}
                  <div className="p-3 rounded-2xl bg-surface-cream/80 border border-border/60 flex items-start gap-2.5 text-xs text-primary/75">
                    <Car className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                    <span>{activeClinic.parking}</span>
                  </div>

                  {/* Doctors On Duty */}
                  <div>
                    <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-primary/70 mb-2">
                      Clinicians On Duty Today
                    </h4>
                    <div className="space-y-2">
                      {onDutyDoctors.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-2.5 rounded-xl border border-border/80 bg-white text-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <SafeImage
                              src={doc.image}
                              alt={doc.name}
                              name={doc.name}
                              className="w-7 h-7 rounded-full object-cover"
                            />
                            <div>
                              <div className="font-bold text-primary font-heading">{doc.name}</div>
                              <div className="text-[10px] text-primary/60">{doc.specialtyName.split("&")[0]}</div>
                            </div>
                          </div>
                          <span className="text-[10px] font-semibold text-secondary px-2 py-0.5 rounded-full bg-secondary/10">
                            Available
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action CTA */}
                  <button
                    onClick={() => onSelectClinicForBooking(activeClinic.id)}
                    className="w-full py-4 rounded-2xl bg-primary text-white font-heading font-semibold text-xs tracking-wide hover:bg-primary/95 transition-all shadow-md flex items-center justify-center gap-2 group"
                  >
                    <span>Schedule Appointment at {activeClinic.name.split(" ")[1]}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
