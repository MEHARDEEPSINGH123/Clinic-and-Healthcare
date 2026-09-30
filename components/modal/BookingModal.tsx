"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  Clock,
  User,
  MapPin,
  CheckCircle2,
  Sparkles,
  Shield,
  CreditCard,
  QrCode,
  ArrowRight,
} from "lucide-react";
import { getAllClinics, getAllDoctors, getAllAppointmentSlots } from "@/lib/data";
import SafeImage from "@/components/ui/SafeImage";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDoctorId?: string;
  preselectedClinicId?: string;
  preselectedService?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  preselectedDoctorId,
  preselectedClinicId,
  preselectedService,
}: BookingModalProps) {
  const clinics = getAllClinics();
  const doctors = getAllDoctors();
  const slots = getAllAppointmentSlots();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedClinicId, setSelectedClinicId] = useState<string>(
    preselectedClinicId || clinics[0]?.id || "CL001"
  );
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(
    preselectedDoctorId || doctors[0]?.id || "DOC001"
  );
  const [selectedDate, setSelectedDate] = useState<string>("2026-10-01");
  const [selectedSlotTime, setSelectedSlotTime] = useState<string>("10:00 AM");
  const [patientName, setPatientName] = useState<string>("");
  const [patientPhone, setPatientPhone] = useState<string>("");
  const [patientEmail, setPatientEmail] = useState<string>("");
  const [selectedPanel, setSelectedPanel] = useState<string>("Direct Payment / Self-Claim");
  const [bookingRef, setBookingRef] = useState<string>("");

  // Lock background scroll and pause Lenis while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const win = window as unknown as { __lenis?: { stop: () => void; start: () => void } };
      if (win.__lenis) {
        win.__lenis.stop();
      }
    } else {
      document.body.style.overflow = "";
      const win = window as unknown as { __lenis?: { stop: () => void; start: () => void } };
      if (win.__lenis) {
        win.__lenis.start();
      }
    }

    return () => {
      document.body.style.overflow = "";
      const win = window as unknown as { __lenis?: { stop: () => void; start: () => void } };
      if (win.__lenis) {
        win.__lenis.start();
      }
    };
  }, [isOpen]);

  const activeDoctor = doctors.find((d) => d.id === selectedDoctorId) || doctors[0];
  const activeClinic = clinics.find((c) => c.id === selectedClinicId) || clinics[0];

  const availableSlotsForDay = slots.slice(0, 8);

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const refCode = `VIT-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(refCode);
    setStep(3);
  };

  const handleResetAndClose = () => {
    setStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
        data-lenis-prevent
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleResetAndClose}
          className="fixed inset-0 bg-primary/45 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          data-lenis-prevent
          className="relative w-full max-w-2xl bg-white rounded-3xl sm:rounded-4xl shadow-float border border-white/60 overflow-hidden z-10 max-h-[90vh] flex flex-col"
        >
          {/* Fixed Header Bar */}
          <div className="px-6 sm:px-8 py-4 sm:py-5 border-b border-border/80 flex items-center justify-between bg-surface-cream/70 flex-shrink-0">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                <span className="text-[11px] font-heading font-semibold text-secondary uppercase tracking-widest">
                  Vitalis Concierge Booking
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-heading font-bold text-primary mt-0.5">
                {step === 1 && "Select Sanctuary & Clinician"}
                {step === 2 && "Patient Information & Verification"}
                {step === 3 && "Appointment Confirmed"}
              </h3>
            </div>

            <button
              onClick={handleResetAndClose}
              className="w-9 h-9 rounded-full bg-primary/5 hover:bg-primary/10 text-primary flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Step 1: Clinic, Doctor, Date & Slot */}
          {step === 1 && (
            <div className="flex flex-col flex-1 overflow-hidden">
              {/* Scrollable Center Body - Only this scrolls */}
              <div
                data-lenis-prevent
                className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 overscroll-contain"
              >
                {preselectedService && (
                  <div className="p-3.5 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-secondary flex-shrink-0" />
                    <p className="text-xs text-primary/90 font-medium">
                      Inquiry for: <strong className="font-semibold text-primary">{preselectedService}</strong>
                    </p>
                  </div>
                )}

                {/* Clinic Selection */}
                <div>
                  <label className="block text-xs font-semibold text-primary/70 uppercase tracking-wider mb-2">
                    Select Clinic Sanctuary
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {clinics.slice(0, 4).map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedClinicId(c.id)}
                        className={`text-left p-3.5 rounded-2xl border transition-all ${
                          selectedClinicId === c.id
                            ? "border-primary bg-primary text-white shadow-sm"
                            : "border-border hover:border-primary/40 bg-surface-cream/40"
                        }`}
                      >
                        <div className="text-xs font-bold font-heading">{c.name}</div>
                        <div
                          className={`text-[11px] mt-0.5 ${
                            selectedClinicId === c.id ? "text-white/80" : "text-primary/60"
                          }`}
                        >
                          {c.mrt}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Doctor Selection */}
                <div>
                  <label className="block text-xs font-semibold text-primary/70 uppercase tracking-wider mb-2">
                    Select Doctor
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {doctors.slice(0, 4).map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setSelectedDoctorId(d.id)}
                        className={`text-left p-3.5 rounded-2xl border flex items-center gap-3 transition-all ${
                          selectedDoctorId === d.id
                            ? "border-secondary bg-secondary/5 ring-1 ring-secondary"
                            : "border-border hover:border-secondary/40 bg-white"
                        }`}
                      >
                        <SafeImage
                          src={d.image}
                          alt={d.name}
                          name={d.name}
                          className="w-11 h-11 rounded-full object-cover shadow-sm flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-primary truncate font-heading">{d.name}</div>
                          <div className="text-[11px] text-primary/60 truncate">{d.specialtyName}</div>
                          <div className="text-[11px] font-semibold text-secondary mt-0.5">
                            S$ {d.consultationFeeSgd} SGD
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date & Time Slots */}
                <div>
                  <label className="block text-xs font-semibold text-primary/70 uppercase tracking-wider mb-2">
                    Select Preferred Date & Slot
                  </label>
                  <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
                    {["2026-10-01", "2026-10-02", "2026-10-03", "2026-10-05", "2026-10-06"].map((dt, i) => (
                      <button
                        key={dt}
                        type="button"
                        onClick={() => setSelectedDate(dt)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                          selectedDate === dt
                            ? "bg-primary text-white"
                            : "bg-surface-cream text-primary/70 hover:bg-black/5"
                        }`}
                      >
                        {i === 0 ? "Today, Oct 1" : i === 1 ? "Tomorrow, Oct 2" : `Oct ${dt.split("-")[2]}`}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {availableSlotsForDay.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSelectedSlotTime(s.time)}
                        className={`py-2 px-2 text-center rounded-xl text-xs font-semibold border transition-all ${
                          selectedSlotTime === s.time
                            ? "bg-secondary text-white border-secondary shadow-sm"
                            : "border-border hover:border-secondary/40 text-primary/80"
                        }`}
                      >
                        {s.time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pinned Bottom Footer Action Bar */}
              <div className="p-4 sm:px-8 border-t border-border/80 bg-white flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-3.5 rounded-2xl bg-primary text-white font-heading font-semibold text-sm hover:bg-primary/95 transition-all flex items-center justify-center gap-2 shadow-md group"
                >
                  <span>Continue to Patient Details</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Patient Form */}
          {step === 2 && (
            <form onSubmit={handleConfirm} className="flex flex-col flex-1 overflow-hidden">
              {/* Scrollable Form Body */}
              <div
                data-lenis-prevent
                className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-5 overscroll-contain"
              >
                <div className="p-4 rounded-2xl bg-surface-cream border border-border/80 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <p className="font-semibold text-primary">Appointment Summary</p>
                    <p className="text-primary/70 mt-0.5">
                      {activeDoctor.name} • {activeClinic.name} • {selectedDate} at {selectedSlotTime}
                    </p>
                    <p className="text-secondary font-bold mt-1">Est. Consultation: S$ {activeDoctor.consultationFeeSgd}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-primary/70 uppercase tracking-wider mb-1.5">
                    Full Name (as per NRIC / Passport)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rachel Lim Wei-Ting"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-border focus:border-secondary focus:ring-1 focus:ring-secondary outline-none text-sm text-primary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-primary/70 uppercase tracking-wider mb-1.5">
                      Singapore Mobile Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+65 9123 4567"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-border focus:border-secondary focus:ring-1 focus:ring-secondary outline-none text-sm text-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-primary/70 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rachel@example.com"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-border focus:border-secondary focus:ring-1 focus:ring-secondary outline-none text-sm text-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-primary/70 uppercase tracking-wider mb-1.5">
                    Insurance / Payment Method
                  </label>
                  <select
                    value={selectedPanel}
                    onChange={(e) => setSelectedPanel(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-border focus:border-secondary focus:ring-1 focus:ring-secondary outline-none text-sm text-primary bg-white"
                  >
                    <option value="Direct Payment / Self-Claim">Direct Payment / Self-Claim (Cashless PayNow, Visa)</option>
                    <option value="AIA HealthShield Gold Max">AIA HealthShield Gold Max</option>
                    <option value="Great Eastern SupremeHealth">Great Eastern SupremeHealth</option>
                    <option value="Prudential PRUShield">Prudential PRUShield</option>
                    <option value="Singlife Comprehensive Shield">Singlife Comprehensive Shield</option>
                    <option value="CHAS Blue / Orange Subsidy">CHAS Blue / Orange Subsidy (MOH)</option>
                    <option value="Bupa / Cigna International">Bupa / Cigna International Global Direct</option>
                    <option value="Corporate Panel (Fullerton/IHP/MHC)">Corporate Panel (Fullerton / IHP / MHC)</option>
                  </select>
                </div>
              </div>

              {/* Pinned Bottom Form Actions */}
              <div className="p-4 sm:px-8 border-t border-border/80 bg-white flex gap-3 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3.5 rounded-2xl border border-border text-primary font-semibold text-xs hover:bg-surface-cream transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3.5 rounded-2xl bg-secondary text-white font-heading font-semibold text-xs hover:bg-secondary/90 transition-all shadow-md"
                >
                  Confirm & Generate Pass
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div
              data-lenis-prevent
              className="p-6 sm:p-8 text-center space-y-6 overflow-y-auto overscroll-contain flex-1"
            >
              <div className="w-16 h-16 rounded-full bg-secondary/10 text-secondary mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-heading font-bold text-secondary uppercase tracking-widest">
                  Booking Confirmed
                </span>
                <h4 className="text-2xl font-heading font-bold text-primary mt-1">
                  You are scheduled with {activeDoctor.name}
                </h4>
                <p className="text-xs text-primary/70 mt-1 max-w-md mx-auto">
                  A digital pass and fasting preparation instructions have been dispatched to your mobile.
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="max-w-sm mx-auto p-5 rounded-3xl bg-surface-cream border border-border text-left shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div>
                    <div className="text-[10px] font-bold text-primary/50 tracking-wider">BOOKING REF</div>
                    <div className="text-sm font-heading font-bold text-primary">{bookingRef}</div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center">
                    <QrCode className="w-6 h-6 text-primary" />
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-primary/80">
                    <Calendar className="w-3.5 h-3.5 text-secondary" />
                    <span>{selectedDate} at {selectedSlotTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary/80">
                    <MapPin className="w-3.5 h-3.5 text-secondary" />
                    <span className="truncate">{activeClinic.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary/80">
                    <CreditCard className="w-3.5 h-3.5 text-secondary" />
                    <span>{selectedPanel}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white text-[11px] text-primary/80 border border-border/80">
                  <strong className="text-primary font-semibold">Pre-Appointment Guidance:</strong> Fast 8 hours prior if doing metabolic screening. Plain water is permitted and encouraged.
                </div>
              </div>

              <div className="pt-2 pb-2">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-8 py-3.5 rounded-full bg-primary text-white font-heading font-semibold text-xs hover:bg-primary/95 transition-all shadow-md"
                >
                  Done & Return to Platform
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
