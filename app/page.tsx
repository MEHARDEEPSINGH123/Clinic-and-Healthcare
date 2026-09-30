"use client";

import React, { useState } from "react";
import FloatingRail from "@/components/nav/FloatingRail";
import ConciergeEntry from "@/components/concierge/ConciergeEntry";
import HealthJourneySection from "@/components/sections/HealthJourneySection";
import DoctorSpotlightSection from "@/components/sections/DoctorSpotlightSection";
import ServicesEcosystemSection from "@/components/sections/ServicesEcosystemSection";
import AppointmentCenterSection from "@/components/sections/AppointmentCenterSection";
import InsuranceExplorerSection from "@/components/sections/InsuranceExplorerSection";
import PreparationCenterSection from "@/components/sections/PreparationCenterSection";
import FollowUpTimelineSection from "@/components/sections/FollowUpTimelineSection";
import HealthPackagesSection from "@/components/sections/HealthPackagesSection";
import LocationExperienceSection from "@/components/sections/LocationExperienceSection";
import PatientStoriesSection from "@/components/sections/PatientStoriesSection";
import HealthResourcesSection from "@/components/sections/HealthResourcesSection";
import FinalExperienceSection from "@/components/sections/FinalExperienceSection";
import BookingModal from "@/components/modal/BookingModal";
import { Doctor } from "@/lib/types";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | undefined>();
  const [selectedClinicId, setSelectedClinicId] = useState<string | undefined>();
  const [selectedService, setSelectedService] = useState<string | undefined>();

  const handleOpenBooking = () => {
    setSelectedDoctorId(undefined);
    setSelectedClinicId(undefined);
    setSelectedService(undefined);
    setIsBookingOpen(true);
  };

  const handleBookDoctor = (doc: Doctor) => {
    setSelectedDoctorId(doc.id);
    setSelectedClinicId(doc.clinicId);
    setSelectedService(`${doc.specialtyName} Consultation`);
    setIsBookingOpen(true);
  };

  const handleBookService = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsBookingOpen(true);
  };

  const handleBookClinic = (clinicId: string) => {
    setSelectedClinicId(clinicId);
    setIsBookingOpen(true);
  };

  const handleSelectOptionFromConcierge = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen relative bg-background text-primary selection:bg-secondary selection:text-white">
      {/* Floating Vertical Navigation Rail (Position: Left Center, Auto-hide on scroll) */}
      <FloatingRail onOpenBooking={handleOpenBooking} />

      {/* Landing Experience Concierge (Fullscreen: "How Can We Help You Today?") */}
      <ConciergeEntry
        onSelectOption={handleSelectOptionFromConcierge}
        onOpenBooking={handleOpenBooking}
      />

      {/* Section 01: Health Journey */}
      <HealthJourneySection onOpenBookingWithService={handleBookService} />

      {/* Section 02: Doctor Discovery (Netflix-style Doctor Spotlight, NO CARDS) */}
      <DoctorSpotlightSection onBookDoctor={handleBookDoctor} />

      {/* Section 03: Services Experience */}
      <ServicesEcosystemSection onSelectService={handleBookService} />

      {/* Section 04: Appointment Center */}
      <AppointmentCenterSection />

      {/* Section 05: Insurance Explorer */}
      <InsuranceExplorerSection />

      {/* Section 06: Preparation Center */}
      <PreparationCenterSection />

      {/* Section 07: Follow-Up Experience */}
      <FollowUpTimelineSection />

      {/* Section 08: Health Packages */}
      <HealthPackagesSection onBookPackage={handleBookService} />

      {/* Section 09: Location Experience (Interactive Singapore Map) */}
      <LocationExperienceSection onSelectClinicForBooking={handleBookClinic} />

      {/* Section 10: Patient Stories */}
      <PatientStoriesSection />

      {/* Section 11: Health Resources */}
      <HealthResourcesSection />

      {/* Section 12: Final Experience */}
      <FinalExperienceSection onOpenBooking={handleOpenBooking} />

      {/* Global Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedDoctorId={selectedDoctorId}
        preselectedClinicId={selectedClinicId}
        preselectedService={selectedService}
      />
    </main>
  );
}
