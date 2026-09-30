export interface RawDataset {
  clinics: { id: string; name: string }[];
  doctors: { id: string; name: string }[];
  services: { id: string; name: string }[];
  consultation_fees: { id: string; fee_sgd: number }[];
  appointment_slots: { id: string }[];
  insurance_panels: { id: string }[];
  preparation_instructions: { id: string }[];
  follow_up_programs: { id: string }[];
  health_packages: { id: string }[];
  patient_journeys: { id: string }[];
  locations: { id: string }[];
  specialties: { id: string }[];
  reviews: { id: string; rating: number }[];
  health_articles: { id: string }[];
}

export interface Clinic {
  id: string;
  rawName: string;
  name: string;
  district: string;
  address: string;
  postalCode: string;
  mrt: string;
  mrtLine: string;
  mrtColor: string;
  openingHours: string;
  weekendHours: string;
  phone: string;
  facilities: string[];
  parking: string;
  doctorIds: string[];
  lat: number;
  lng: number;
  mapX: number; // percentage on SVG map
  mapY: number; // percentage on SVG map
  image: string;
  tag: string;
}

export interface Doctor {
  id: string;
  rawName: string;
  name: string;
  honorific: string;
  credentials: string;
  specialtyId: string;
  specialtyName: string;
  clinicId: string;
  clinicName: string;
  consultationFeeId: string;
  consultationFeeSgd: number;
  experienceYears: number;
  languages: string[];
  bio: string;
  quote: string;
  image: string;
  availability: string;
  rating: number;
  reviewCount: number;
  badges: string[];
  nextSlot: string;
}

export interface Service {
  id: string;
  rawName: string;
  name: string;
  specialtyId: string;
  specialtyName: string;
  category: string;
  description: string;
  durationMinutes: number;
  feeSgd: number;
  preparationSummary: string;
  benefits: string[];
  suitableFor: string;
  featured: boolean;
  image: string;
}

export interface InsurancePanel {
  id: string;
  name: string;
  tier: "Integrated Shield" | "Corporate Panel" | "National Scheme / CHAS" | "International Expat";
  cashlessBilling: boolean;
  copayPercent: number;
  claimProcess: string;
  eligibility: string;
  badge: string;
  logoUrl?: string;
  popular: boolean;
}

export interface PreparationInstruction {
  id: string;
  phase: "before" | "during" | "after";
  title: string;
  summary: string;
  actionItem: string;
  timing: string;
  iconName: string;
  vitalTips: string[];
}

export interface FollowUpProgram {
  id: string;
  title: string;
  duration: string;
  targetGoal: string;
  progressPercent: number;
  currentMilestone: string;
  nextAction: string;
  frequency: string;
  biometricFocus: string;
  color: string;
  reminders: { id: string; time: string; task: string; done: boolean }[];
}

export interface HealthPackage {
  id: string;
  name: string;
  subtitle: string;
  tier: "Essential" | "Executive" | "Platinum" | "Specialized";
  priceSgd: number;
  duration: string;
  summary: string;
  coverage: string[];
  benefits: string[];
  suitability: string;
  fastingRequired: boolean;
  doctorConsultation: string;
  recommended: boolean;
  colorTheme: string;
}

export interface PatientJourney {
  id: string;
  stageName: string;
  stepNumber: number;
  title: string;
  description: string;
  patientAction: string;
  digitalSupport: string;
  duration: string;
}

export interface Review {
  id: string;
  rating: number;
  author: string;
  role: string;
  serviceReceived: string;
  clinicLocation: string;
  date: string;
  quote: string;
  fullStory: string;
  avatar: string;
  verifiedPatient: boolean;
  highlightMetric: string;
}

export interface HealthArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  authorDoctorName: string;
  authorSpecialty: string;
  image: string;
  trending: boolean;
  tags: string[];
}

export interface AppointmentSlotItem {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM AM/PM
  period: "Morning" | "Afternoon" | "Evening";
  doctorId: string;
  clinicId: string;
  available: boolean;
}
