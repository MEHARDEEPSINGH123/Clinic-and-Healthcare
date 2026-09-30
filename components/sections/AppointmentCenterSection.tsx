"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  MapPin,
  CheckCircle2,
  Sparkles,
  QrCode,
  Shield,
  CreditCard,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { getAllClinics, getAllDoctors, getAllAppointmentSlots } from "@/lib/data";
import SafeImage from "@/components/ui/SafeImage";

export default function AppointmentCenterSection() {
  const clinics = getAllClinics();
  const doctors = getAllDoctors();
  const rawSlots = getAllAppointmentSlots();

  const [selectedClinicId, setSelectedClinicId] = useState<string>(clinics[0]?.id || "CL001");
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(doctors[0]?.id || "DOC001");
  const [selectedDate, setSelectedDate] = useState<string>("2026-10-01");
  const [selectedSlotTime, setSelectedSlotTime] = useState<string>("10:00 AM");
  const [patientName, setPatientName] = useState<string>("");
  const [patientPhone, setPatientPhone] = useState<string>("");
  const [confirmedBooking, setConfirmedBooking] = useState<{
    ref: string;
    doctorName: string;
    clinicName: string;
    date: string;
    time: string;
  } | null>(null);

  const activeClinic = clinics.find((c) => c.id === selectedClinicId) || clinics[0];
  const activeDoctor = doctors.find((d) => d.id === selectedDoctorId) || doctors[0];

  // 7 Upcoming Days
  const calendarDays = [
    { date: "2026-10-01", day: "Thu", label: "Oct 1", badge: "Today" },
    { date: "2026-10-02", day: "Fri", label: "Oct 2", badge: "Tomorrow" },
    { date: "2026-10-03", day: "Sat", label: "Oct 3", badge: "Weekend" },
    { date: "2026-10-05", day: "Mon", label: "Oct 5", badge: "Fast Track" },
    { date: "2026-10-06", day: "Tue", label: "Oct 6", badge: "" },
    { date: "2026-10-07", day: "Wed", label: "Oct 7", badge: "" },
    { date: "2026-10-08", day: "Thu", label: "Oct 8", badge: "" },
  ];

  // Dynamic slots based on selection
  const daySlots = rawSlots.slice(0, 10);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) {
      alert("Please enter patient name");
      return;
    }
    const ref = `VIT-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedBooking({
      ref,
      doctorName: activeDoctor.name,
      clinicName: activeClinic.name,
      date: selectedDate,
      time: selectedSlotTime,
    });
  };

  return (
    <section id="appointments" className="relative py-28 px-6 md:px-16 bg-surface-cream/40">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-heading font-semibold text-secondary uppercase tracking-widest block mb-2">
            04 • Frictionless Concierge
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-primary tracking-tight">
            Appointment{" "}
            <span className="font-editorial italic font-normal text-secondary">
              Center
            </span>
          </h2>
          <p className="mt-3 text-sm text-primary/70">
            Apple-level simplicity. Transparent consultation pricing, instant slot confirmation, and zero waiting room friction.
          </p>
        </div>

        {/* Booking Container */}
        <div className="rounded-4xl bg-white border border-border shadow-float p-6 sm:p-10 md:p-12">
          {!confirmedBooking ? (
            <form onSubmit={handleBook} className="space-y-10">
              {/* Step 1: Sanctuary Location Selection */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-heading font-bold uppercase tracking-wider text-primary">
                    1. Select Clinic Sanctuary
                  </h3>
                  <span className="text-xs text-secondary font-medium">
                    20 Locations Across Singapore
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {clinics.slice(0, 4).map((c) => {
                    const isSelected = selectedClinicId === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedClinicId(c.id)}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          isSelected
                            ? "bg-primary text-white border-primary shadow-md scale-[1.02]"
                            : "bg-surface-cream/50 hover:bg-surface-cream border-border text-primary/80"
                        }`}
                      >
                        <div className="text-xs font-heading font-bold truncate">
                          {c.name}
                        </div>
                        <div
                          className={`text-[11px] mt-1 truncate ${
                            isSelected ? "text-white/80" : "text-primary/60"
                          }`}
                        >
                          {c.mrt}
                        </div>
                        <div className="text-[10px] font-mono mt-2 opacity-60">
                          {c.id}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Doctor Selection */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-heading font-bold uppercase tracking-wider text-primary">
                    2. Select Clinician Specialist
                  </h3>
                  <span className="text-xs text-primary/60">
                    Transparent Consultation Fees
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {doctors.slice(0, 4).map((d) => {
                    const isSelected = selectedDoctorId === d.id;
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setSelectedDoctorId(d.id)}
                        className={`p-3.5 rounded-2xl border flex items-center gap-3 text-left transition-all ${
                          isSelected
                            ? "border-secondary bg-secondary/5 ring-2 ring-secondary/20 shadow-sm"
                            : "border-border hover:border-secondary/40 bg-white"
                        }`}
                      >
                        <SafeImage
                          src={d.image}
                          alt={d.name}
                          name={d.name}
                          className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-heading font-bold text-primary truncate">
                            {d.name}
                          </div>
                          <div className="text-[11px] text-primary/60 truncate">
                            {d.specialtyName.split("&")[0]}
                          </div>
                          <div className="text-xs font-bold text-secondary mt-0.5">
                            S$ {d.consultationFeeSgd} SGD
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Interactive Calendar Days & Available Slots */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-heading font-bold uppercase tracking-wider text-primary">
                    3. Select Date & Slot
                  </h3>
                  <span className="text-xs text-secondary font-medium flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Real-Time Telemetry
                  </span>
                </div>

                {/* Calendar Days Strip */}
                <div className="flex gap-2.5 overflow-x-auto pb-3 mb-5">
                  {calendarDays.map((d) => {
                    const isSelected = selectedDate === d.date;
                    return (
                      <button
                        key={d.date}
                        type="button"
                        onClick={() => setSelectedDate(d.date)}
                        className={`flex-shrink-0 min-w-[90px] p-3 rounded-2xl border text-center transition-all ${
                          isSelected
                            ? "bg-primary text-white border-primary shadow-sm"
                            : "bg-surface-cream text-primary/80 border-border hover:bg-black/5"
                        }`}
                      >
                        <div className="text-[11px] font-medium opacity-70 uppercase">
                          {d.day}
                        </div>
                        <div className="text-sm font-heading font-bold my-0.5">
                          {d.label}
                        </div>
                        {d.badge && (
                          <span
                            className={`text-[9px] font-heading font-semibold px-1.5 py-0.5 rounded-full ${
                              isSelected
                                ? "bg-white/20 text-white"
                                : "bg-primary/10 text-primary"
                            }`}
                          >
                            {d.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Slots Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {daySlots.map((slot) => {
                    const isSelected = selectedSlotTime === slot.time;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        disabled={!slot.available}
                        onClick={() => setSelectedSlotTime(slot.time)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          !slot.available
                            ? "opacity-30 cursor-not-allowed bg-black/5 border-transparent text-primary/40 line-through"
                            : isSelected
                            ? "bg-secondary text-white border-secondary shadow-md font-semibold"
                            : "bg-white border-border hover:border-secondary text-primary/80"
                        }`}
                      >
                        <div className="text-xs font-heading font-semibold">
                          {slot.time}
                        </div>
                        <div
                          className={`text-[10px] mt-0.5 ${
                            isSelected ? "text-white/80" : "text-primary/50"
                          }`}
                        >
                          {slot.period}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Patient Info & Instant Submit */}
              <div className="pt-6 border-t border-border/80 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Patient Name (as per NRIC)"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl bg-surface-cream border border-border focus:border-secondary outline-none text-xs text-primary"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Mobile (+65 9123 4567)"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl bg-surface-cream border border-border focus:border-secondary outline-none text-xs text-primary"
                  />
                </div>

                <div className="md:col-span-4">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-primary text-white font-heading font-semibold text-xs tracking-wide hover:bg-primary/95 transition-all shadow-md flex items-center justify-center gap-2 group"
                  >
                    <span>Confirm Slot & Get Pass</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* Animated Confirmation View */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-secondary/10 text-secondary mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-heading font-bold text-secondary uppercase tracking-widest">
                  Appointment Scheduled
                </span>
                <h3 className="text-3xl font-heading font-bold text-primary mt-1">
                  We look forward to welcoming you, {patientName}.
                </h3>
                <p className="text-xs text-primary/70 mt-1 max-w-md mx-auto">
                  Your electronic arrival pass has been generated. Please arrive 10 minutes prior for refreshments in our acoustic bio-lounge.
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="max-w-md mx-auto p-6 rounded-3xl bg-surface-cream border border-border shadow-subtle text-left space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div>
                    <div className="text-[10px] font-bold text-primary/50 tracking-wider">BOOKING PASS</div>
                    <div className="text-base font-heading font-bold text-primary">{confirmedBooking.ref}</div>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-border flex items-center justify-center">
                    <QrCode className="w-7 h-7 text-primary" />
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-primary/80">
                    <User className="w-4 h-4 text-secondary" />
                    <span>Clinician: <strong>{confirmedBooking.doctorName}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-primary/80">
                    <MapPin className="w-4 h-4 text-secondary" />
                    <span>Sanctuary: <strong>{confirmedBooking.clinicName}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-primary/80">
                    <CalendarIcon className="w-4 h-4 text-secondary" />
                    <span>Schedule: <strong>{confirmedBooking.date} at {confirmedBooking.time}</strong></span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-border/80 text-[11px] text-primary/80 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>
                    Fasting 8 hours prior is advised if metabolic blood tests are planned. Water is encouraged.
                  </span>
                </div>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setConfirmedBooking(null)}
                  className="px-6 py-3 rounded-full bg-primary text-white text-xs font-heading font-semibold hover:bg-primary/95 transition-all shadow-sm"
                >
                  Book Another Appointment
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
