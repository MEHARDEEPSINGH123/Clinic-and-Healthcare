import rawDatasetJson from "@/vitalis_health_dataset.json";
import {
  RawDataset,
  Clinic,
  Doctor,
  Service,
  InsurancePanel,
  PreparationInstruction,
  FollowUpProgram,
  HealthPackage,
  PatientJourney,
  Review,
  HealthArticle,
  AppointmentSlotItem,
} from "./types";

const rawDataset = rawDatasetJson as RawDataset;

// Specialty Catalog (mapped to SP001 - SP025)
const SPECIALTY_META: Record<string, { name: string; category: string; description: string }> = {
  SP001: { name: "Preventive Medicine & Longevity", category: "Longevity", description: "Comprehensive cellular health, biological age metrics, and metabolic optimization." },
  SP002: { name: "Cardiology & Vascular Health", category: "Cardiac", description: "Advanced echocardiography, coronary calcium scanning, and arterial compliance." },
  SP003: { name: "Endocrinology & Metabolic Health", category: "Metabolism", description: "Continuous glucose tracking, thyroid balance, and hormonal homeostasis." },
  SP004: { name: "Dermatology & Medical Aesthetics", category: "Aesthetic", description: "Evidence-based skin health, barrier restoration, and laser diagnostics." },
  SP005: { name: "Executive Health Screening", category: "Diagnostics", description: "Bespoke annual health audits with rapid multi-disciplinary physician reviews." },
  SP006: { name: "Family Medicine & Primary Care", category: "Primary", description: "Longitudinal whole-person healthcare for every chapter of life." },
  SP007: { name: "Gastroenterology & Microbiome", category: "Digestive", description: "Microbiome mapping, non-invasive liver elastography, and endoscopic care." },
  SP008: { name: "Orthopaedics & Sports Biomechanics", category: "Musculoskeletal", description: "Movement analysis, regenerative joint therapies, and physical conditioning." },
  SP009: { name: "Women's Health & Gynaecology", category: "Women's Care", description: "Hormone cycle mapping, fertility preservation, pelvic ultrasound, and menopause care." },
  SP010: { name: "Men's Health & Vitality", category: "Men's Care", description: "Cardio-metabolic screening, testosterone optimization, and prostate vigilance." },
  SP011: { name: "Neurology & Cognitive Longevity", category: "Neurology", description: "Brain health biomarkers, sleep architecture, and neuro-cognitive screening." },
  SP012: { name: "Pulmonary & Respiratory Medicine", category: "Pulmonary", description: "Spirometry, lung volume studies, and environmental allergy surveillance." },
  SP013: { name: "Mindfulness & Mental Wellbeing", category: "Psychiatry", description: "Compassionate psychiatric consultation, stress resilience, and sleep health." },
  SP014: { name: "Ophthalmology & Visual Acuity", category: "Eye Care", description: "Optical coherence tomography, macular surveillance, and dry eye spa." },
  SP015: { name: "ENT & Acoustic Health", category: "ENT", description: "Hearing preservation, vocal fold endoscopy, and sinus air filtration." },
  SP016: { name: "Functional Medicine & Nutrition", category: "Nutrition", description: "Nutrigenomics, micronutrient assays, and targeted elimination dietetics." },
  SP017: { name: "Paediatrics & Adolescent Health", category: "Paediatrics", description: "Developmental milestones, pediatric immunizations, and allergy protocols." },
  SP018: { name: "Rheumatology & Autoimmune Care", category: "Immunology", description: "Early inflammatory arthritis detection and autoimmune balance." },
  SP019: { name: "Sleep Medicine & Circadian Rhythm", category: "Sleep", description: "Home polysomnography, REM architecture optimization, and chronotype coaching." },
  SP020: { name: "Travel Medicine & Immunization", category: "Travel", description: "Pre-departure prophylaxis, international vaccine passports, and tropical disease prep." },
  SP021: { name: "Allergy & Clinical Immunology", category: "Immunology", description: "Skin prick testing, molecular allergen profiling, and immunotherapy." },
  SP022: { name: "Oncology Surveillance & Genomics", category: "Oncology", description: "Circulating tumor DNA screening, hereditary cancer risks, and early interception." },
  SP023: { name: "Geriatric Medicine & Active Ageing", category: "Ageing", description: "Sarcopenia prevention, cognitive reserve boosting, and polypharmacy reduction." },
  SP024: { name: "Pain Management & Rehabilitation", category: "Rehab", description: "Non-opioid regenerative protocols, myofascial release, and ergonomic therapy." },
  SP025: { name: "Tele-Urgent Care & Virtual Health", category: "Virtual", description: "24/7 digital concierge consultations with doorstep medication delivery within 90 minutes." },
};

// Singapore Locations Meta (mapped to LOC001 - LOC020 & CL001 - CL020)
const CLINIC_LOCATIONS_META: Array<{
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
  lat: number;
  lng: number;
  mapX: number;
  mapY: number;
  image: string;
  tag: string;
}> = [
  {
    name: "Vitalis Flagship Marina Bay",
    district: "Downtown / Financial District",
    address: "Tower 2, #18-01 Marina Bay Financial Centre, 10 Marina Blvd",
    postalCode: "018983",
    mrt: "Downtown MRT (DT17) / Marina Bay (NS27/TE20)",
    mrtLine: "Downtown Line",
    mrtColor: "#005ec4",
    openingHours: "Mon - Fri: 08:00 - 20:30",
    weekendHours: "Sat: 08:30 - 16:00 | Sun: Closed",
    phone: "+65 6812 7701",
    facilities: ["Executive Health Screening Suite", "Cardiac Echo & Ultrasound", "Private Acoustic Pods", "Bio-Lounge Concierge"],
    parking: "Valet parking at Tower 2 Lobby. B2 EV charging stations available.",
    lat: 1.2801,
    lng: 103.8542,
    mapX: 52,
    mapY: 72,
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
    tag: "Flagship Sanctuary",
  },
  {
    name: "Vitalis Novena Specialist Suites",
    district: "Novena Medical Hub",
    address: "Novena Specialist Center #09-12, 8 Sinaran Drive",
    postalCode: "307470",
    mrt: "Novena MRT (NS20)",
    mrtLine: "North South Line",
    mrtColor: "#d42e12",
    openingHours: "Mon - Fri: 08:30 - 19:30",
    weekendHours: "Sat - Sun: 09:00 - 15:00",
    phone: "+65 6812 7702",
    facilities: ["Specialist Consultation Rooms", "Digital Mammography", "Bone Mineral Densitometry", "Infusion Wellness Suite"],
    parking: "Underground parking via Sinaran Dr. Sheltered link to Novena MRT.",
    lat: 1.3204,
    lng: 103.8441,
    mapX: 50,
    mapY: 53,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    tag: "Specialist Centre",
  },
  {
    name: "Vitalis Orchard Paragon",
    district: "Orchard Road Shopping & Medical Belt",
    address: "Paragon Medical #14-06, 290 Orchard Road",
    postalCode: "238859",
    mrt: "Orchard MRT (NS22/TE14) / Somerset (NS23)",
    mrtLine: "North South & Thomson-East Coast",
    mrtColor: "#9D5B25",
    openingHours: "Mon - Fri: 08:30 - 20:00",
    weekendHours: "Sat: 09:00 - 17:00 | Sun: 10:00 - 14:00",
    phone: "+65 6812 7703",
    facilities: ["Dermatology & Skin Laser Suite", "Executive Screening", "Holistic Nutrition Bar", "VIP Valet Reception"],
    parking: "Direct Paragon Medical carpark lifts with priority patient lots.",
    lat: 1.3039,
    lng: 103.8358,
    mapX: 47,
    mapY: 62,
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
    tag: "Orchard Pavilion",
  },
  {
    name: "Vitalis Guoco Tower Tanjong Pagar",
    district: "Tanjong Pagar / CBD South",
    address: "Guoco Tower Level 22, 1 Wallich Street",
    postalCode: "078881",
    mrt: "Tanjong Pagar MRT (EW15)",
    mrtLine: "East West Line",
    mrtColor: "#009640",
    openingHours: "Mon - Fri: 07:45 - 20:00",
    weekendHours: "Sat: 08:30 - 14:00 | Sun: Closed",
    phone: "+65 6812 7704",
    facilities: ["Continuous Glucose Lab", "Metabolic Profiling Suite", "Physician Quiet Rooms", "Express Blood Laboratory"],
    parking: "Guoco Tower B3 carpark with direct elevator to medical floor.",
    lat: 1.2766,
    lng: 103.8458,
    mapX: 48,
    mapY: 74,
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80",
    tag: "Metabolic Hub",
  },
  {
    name: "Vitalis Ocean Financial Raffles Place",
    district: "Raffles Place Financial Heart",
    address: "Ocean Financial Centre #16-02, 10 Collyer Quay",
    postalCode: "049315",
    mrt: "Raffles Place MRT (NS26/EW14)",
    mrtLine: "North South & East West",
    mrtColor: "#d42e12",
    openingHours: "Mon - Fri: 08:00 - 19:30",
    weekendHours: "Sat: 08:30 - 13:00 | Sun: Closed",
    phone: "+65 6812 7705",
    facilities: ["Same-Day Screening Express", "Cardiac Rhythm Holter Lab", "Tele-Urgent Virtual Hub", "Corporate Wellness Center"],
    parking: "Underground parking via Collyer Quay. Direct underground MRT link.",
    lat: 1.2831,
    lng: 103.8522,
    mapX: 51,
    mapY: 70,
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80",
    tag: "Financial District",
  },
  {
    name: "Vitalis Holland Village Sanctuary",
    district: "Holland Village / Bukit Timah",
    address: "One Holland Village #04-18, 7 Holland Village Way",
    postalCode: "275748",
    mrt: "Holland Village MRT (CC21)",
    mrtLine: "Circle Line",
    mrtColor: "#ff9e1b",
    openingHours: "Mon - Sun: 08:30 - 21:00",
    weekendHours: "Sat - Sun: 08:30 - 20:00",
    phone: "+65 6812 7706",
    facilities: ["Family & Pediatric Care", "Outdoor Zen Garden Terrace", "Allergy Immuno-Testing", "Vaccination Lounge"],
    parking: "Ample parking at One Holland Village with EV superchargers.",
    lat: 1.3117,
    lng: 103.7963,
    mapX: 35,
    mapY: 60,
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1200&q=80",
    tag: "Wellness Sanctuary",
  },
  {
    name: "Vitalis Katong I12 Pavilion",
    district: "East Coast / Marine Parade",
    address: "I12 Katong #03-22, 112 East Coast Road",
    postalCode: "428802",
    mrt: "Marine Parade MRT (TE26)",
    mrtLine: "Thomson-East Coast Line",
    mrtColor: "#9D5B25",
    openingHours: "Mon - Fri: 08:30 - 20:30",
    weekendHours: "Sat - Sun: 09:00 - 18:00",
    phone: "+65 6812 7707",
    facilities: ["Women's Health Specialist Unit", "Ultrasound Diagnostic Pods", "Mindfulness Studio", "Childhood Immunization"],
    parking: "B1 & B2 Carpark at I12 Katong. Lift lobby B.",
    lat: 1.3051,
    lng: 103.9048,
    mapX: 70,
    mapY: 63,
    image: "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1200&q=80",
    tag: "East Coast Pavilion",
  },
  {
    name: "Vitalis Jurong East Gateway",
    district: "Jurong Innovation / West Coast",
    address: "Westgate Tower #12-01, 1 Gateway Drive",
    postalCode: "608531",
    mrt: "Jurong East MRT (NS1/EW24)",
    mrtLine: "North South & East West",
    mrtColor: "#009640",
    openingHours: "Mon - Fri: 08:00 - 20:00",
    weekendHours: "Sat - Sun: 08:30 - 17:00",
    phone: "+65 6812 7708",
    facilities: ["Occupational Health Suite", "Digital X-Ray & Bone Scan", "Sports Rehabilitation Room", "Rapid PCR & Blood Lab"],
    parking: "Westgate mall parking with sheltered walkway to Tower lobby.",
    lat: 1.3338,
    lng: 103.7436,
    mapX: 20,
    mapY: 50,
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    tag: "West Gateway Hub",
  },
  {
    name: "Vitalis Tampines One East Center",
    district: "Tampines Regional Centre",
    address: "Tampines Plaza 1 #08-03, 3 Tampines Central 1",
    postalCode: "529540",
    mrt: "Tampines MRT (EW2/DT32)",
    mrtLine: "East West & Downtown",
    mrtColor: "#005ec4",
    openingHours: "Mon - Fri: 08:30 - 21:00",
    weekendHours: "Sat - Sun: 09:00 - 18:00",
    phone: "+65 6812 7709",
    facilities: ["Executive Screening", "Family Medicine", "Preventive Eye Health Lab", "Elderly Mobility Assessor"],
    parking: "Underground parking Tampines Plaza 1. 2 mins walk from MRT.",
    lat: 1.3533,
    lng: 103.9439,
    mapX: 82,
    mapY: 42,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    tag: "East Regional Centre",
  },
  {
    name: "Vitalis Woodlands North Coast",
    district: "Woodlands Northern Gateway",
    address: "Woods Square Tower 1 #06-08, 6 Woodlands Square",
    postalCode: "737737",
    mrt: "Woodlands MRT (NS9/TE2)",
    mrtLine: "North South & Thomson-East Coast",
    mrtColor: "#d42e12",
    openingHours: "Mon - Fri: 08:30 - 20:00",
    weekendHours: "Sat: 09:00 - 16:00 | Sun: 09:00 - 13:00",
    phone: "+65 6812 7710",
    facilities: ["Primary Care & Vaccinations", "Chronic Disease Management", "Cross-Border Health Screening", "Acoustic Therapy"],
    parking: "Woods Square basement car park with direct lift access.",
    lat: 1.4368,
    lng: 103.7865,
    mapX: 33,
    mapY: 15,
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    tag: "North Gateway",
  },
  {
    name: "Vitalis Sentosa Cove Retreat",
    district: "Sentosa Cove Luxury Enclave",
    address: "Quayside Isle #02-05, 31 Ocean Way",
    postalCode: "098375",
    mrt: "HarbourFront MRT (NE1/CC29) + Sentosa Express",
    mrtLine: "North East & Circle Line",
    mrtColor: "#800080",
    openingHours: "Mon - Sun: 09:00 - 19:00",
    weekendHours: "Sat - Sun: 09:00 - 19:00",
    phone: "+65 6812 7711",
    facilities: ["Longevity Bio-Optimization", "IV Micronutrient Bar", "Cryotherapy & Recovery", "Private Yacht Doctor Dispatch"],
    parking: "Quayside Isle basement parking with marina view drop-off.",
    lat: 1.2464,
    lng: 103.8427,
    mapX: 47,
    mapY: 85,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    tag: "Longevity Retreat",
  },
  {
    name: "Vitalis Bugis Heritage House",
    district: "Bugis / Bras Basah Arts Belt",
    address: "Duo Tower #11-04, 3 Fraser Street",
    postalCode: "189352",
    mrt: "Bugis MRT (EW12/DT14)",
    mrtLine: "Downtown & East West",
    mrtColor: "#005ec4",
    openingHours: "Mon - Fri: 08:30 - 20:00",
    weekendHours: "Sat: 09:00 - 16:00 | Sun: 09:00 - 13:00",
    phone: "+65 6812 7712",
    facilities: ["Cognitive Brain Lab", "Dermatology Aesthetics", "Holistic Stress Clinic", "Sleep Diagnostics Setup"],
    parking: "DUO Tower B3 carpark. Underpass linked to Bugis MRT.",
    lat: 1.3005,
    lng: 103.8587,
    mapX: 54,
    mapY: 64,
    image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=1200&q=80",
    tag: "Cultural Arts Hub",
  },
  {
    name: "Vitalis Paya Lebar Quarter",
    district: "Paya Lebar Commercial Hub",
    address: "PLQ 1 #07-02, 1 Paya Lebar Link",
    postalCode: "408533",
    mrt: "Paya Lebar MRT (EW8/CC9)",
    mrtLine: "East West & Circle Line",
    mrtColor: "#ff9e1b",
    openingHours: "Mon - Fri: 08:00 - 20:30",
    weekendHours: "Sat - Sun: 09:00 - 17:00",
    phone: "+65 6812 7713",
    facilities: ["Cardio Stress Testing", "Ultrasound Diagnostic Clinic", "Physiotherapy Alignment", "Executive Health Pods"],
    parking: "Direct lift access from PLQ Mall B2/B3 carparks.",
    lat: 1.3178,
    lng: 103.8925,
    mapX: 66,
    mapY: 57,
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=1200&q=80",
    tag: "Commercial Gateway",
  },
  {
    name: "Vitalis Serangoon NEX Community",
    district: "Serangoon Central",
    address: "NEX Integrated Suite #04-33, 23 Serangoon Central",
    postalCode: "556083",
    mrt: "Serangoon MRT (NE12/CC13)",
    mrtLine: "North East & Circle Line",
    mrtColor: "#800080",
    openingHours: "Mon - Sun: 08:30 - 21:30",
    weekendHours: "Sat - Sun: 08:30 - 21:30",
    phone: "+65 6812 7714",
    facilities: ["Paediatric & Baby Wellness", "Family Primary Care", "Minor Surgical Procedure Suite", "Vaccination Bay"],
    parking: "NEX Carpark level 4 and 5 with direct clinic level access.",
    lat: 1.3501,
    lng: 103.8732,
    mapX: 60,
    mapY: 45,
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=80",
    tag: "Community Care",
  },
  {
    name: "Vitalis Bishan Central Wing",
    district: "Bishan / Ang Mo Kio",
    address: "Bishan Junction 8 Office Tower #05-02, 9 Bishan Place",
    postalCode: "579837",
    mrt: "Bishan MRT (NS17/CC15)",
    mrtLine: "North South & Circle Line",
    mrtColor: "#d42e12",
    openingHours: "Mon - Fri: 08:30 - 20:00",
    weekendHours: "Sat - Sun: 09:00 - 16:00",
    phone: "+65 6812 7715",
    facilities: ["Comprehensive Blood Analysis", "Bone Health & DEXA", "Geriatric Functional Mobility", "Nutrition Counselling"],
    parking: "Junction 8 multi-storey carpark with covered link bridge.",
    lat: 1.3508,
    lng: 103.8488,
    mapX: 52,
    mapY: 44,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    tag: "Central Diagnostic",
  },
  {
    name: "Vitalis Clementi West Care Hub",
    district: "Clementi / University Town",
    address: "321 Clementi #03-01, 321 Clementi Ave 3",
    postalCode: "129905",
    mrt: "Clementi MRT (EW23)",
    mrtLine: "East West Line",
    mrtColor: "#009640",
    openingHours: "Mon - Fri: 08:30 - 20:30",
    weekendHours: "Sat - Sun: 09:00 - 17:00",
    phone: "+65 6812 7716",
    facilities: ["Sports Medicine & Biomechanics", "Student & Faculty Health", "Musculoskeletal Ultrasound", "Acupuncture Therapy"],
    parking: "Underground carpark at 321 Clementi. Direct escalator access.",
    lat: 1.3152,
    lng: 103.7651,
    mapX: 26,
    mapY: 57,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    tag: "Sports & Academic Hub",
  },
  {
    name: "Vitalis Ang Mo Kio Sanctuary",
    district: "Ang Mo Kio Heritage Town",
    address: "AMK Hub Suite #03-12, 53 Ang Mo Kio Ave 3",
    postalCode: "569933",
    mrt: "Ang Mo Kio MRT (NS16)",
    mrtLine: "North South Line",
    mrtColor: "#d42e12",
    openingHours: "Mon - Fri: 08:00 - 21:00",
    weekendHours: "Sat - Sun: 08:30 - 18:00",
    phone: "+65 6812 7717",
    facilities: ["Cardio-Metabolic Screening", "Diabetic Retinopathy Camera", "Holistic Nursing Support", "Travel Vaccine Hub"],
    parking: "AMK Hub basement carpark with designated elderly drop-off.",
    lat: 1.3691,
    lng: 103.8499,
    mapX: 52,
    mapY: 38,
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    tag: "Preventive Sanctuary",
  },
  {
    name: "Vitalis HarbourFront Waterfront",
    district: "HarbourFront / Keppel Bay",
    address: "HarbourFront Tower One #15-01, 1 HarbourFront Place",
    postalCode: "098633",
    mrt: "HarbourFront MRT (NE1/CC29)",
    mrtLine: "North East & Circle Line",
    mrtColor: "#800080",
    openingHours: "Mon - Fri: 08:30 - 19:30",
    weekendHours: "Sat: 09:00 - 15:00 | Sun: Closed",
    phone: "+65 6812 7718",
    facilities: ["Maritime Occupational Health", "Seaside Acoustic Recovery Lounge", "Full Bio-Screening", "Digital Radiography"],
    parking: "HarbourFront Tower 1 lobby valet. Sheltered to VivoCity.",
    lat: 1.2647,
    lng: 103.8214,
    mapX: 41,
    mapY: 78,
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
    tag: "Waterfront Centre",
  },
  {
    name: "Vitalis One-North Biopolis",
    district: "One-North Biomedical Hub",
    address: "Synapse Biopolis #02-04, 3 Biopolis Drive",
    postalCode: "138623",
    mrt: "One-North MRT (CC23) / Buona Vista (EW21/CC22)",
    mrtLine: "Circle Line",
    mrtColor: "#ff9e1b",
    openingHours: "Mon - Fri: 08:00 - 19:00",
    weekendHours: "Sat: 09:00 - 13:00 | Sun: Closed",
    phone: "+65 6812 7719",
    facilities: ["Genomic Testing Lab", "Biomarker Sequencing Station", "Longevity Clinical Trials Support", "Precision Epigenetics"],
    parking: "Biopolis Synapse basement parking with direct medical elevator.",
    lat: 1.3002,
    lng: 103.7915,
    mapX: 33,
    mapY: 64,
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
    tag: "Innovation & Genomics",
  },
  {
    name: "Vitalis Changi City Aviation Hub",
    district: "Changi Business Park / East Coast",
    address: "Changi City Point #02-18, 5 Changi Business Park Central 1",
    postalCode: "486038",
    mrt: "Expo MRT (CG1/DT35)",
    mrtLine: "Downtown & East West Line",
    mrtColor: "#005ec4",
    openingHours: "Mon - Fri: 08:30 - 20:30",
    weekendHours: "Sat - Sun: 09:00 - 17:00",
    phone: "+65 6812 7720",
    facilities: ["Aviation Medical Exam", "Pre-Flight Health Screening", "Vaccines for Global Travelers", "Rapid Result Laboratory"],
    parking: "Changi City Point carpark with direct link to Expo MRT.",
    lat: 1.3347,
    lng: 103.9619,
    mapX: 88,
    mapY: 48,
    image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=1200&q=80",
    tag: "Aviation Care Hub",
  },
];

// Curated Doctor Names & Meta for 80 Doctors (DOC001 - DOC080)
const DOCTOR_NAMES = [
  "Dr. Alistair Chen", "Dr. Mei-Ling Tan", "Dr. Jonathan Wong", "Dr. Priya Nair", "Dr. Marcus Lee",
  "Dr. Sarah Lim", "Dr. David Koh", "Dr. Valerie Neo", "Dr. Kenneth Ng", "Dr. Evelyn Zhang",
  "Dr. Timothy Seah", "Dr. Nurul Huda", "Dr. Julian Teo", "Dr. Chloe Sim", "Dr. Benjamin Goh",
  "Dr. Rachel Siew", "Dr. Sean Fernandez", "Dr. Fiona Low", "Dr. Ethan Chua", "Dr. Alicia Fong",
  "Dr. Gabriel Tay", "Dr. Hannah Yeo", "Dr. Darren Kwek", "Dr. Stephanie Chew", "Dr. Nicholas Ang",
  "Dr. Samantha Ong", "Dr. Keith Tan", "Dr. Amanda Lim", "Dr. Ryan Pillay", "Dr. Jessica Ho",
  "Dr. Christopher Poh", "Dr. Natalie Chia", "Dr. Jeremy Quek", "Dr. Brenda Song", "Dr. Lucas Wee",
  "Dr. Grace Pang", "Dr. Matthew Eu", "Dr. Cheryl Toh", "Dr. Arthur Loke", "Dr. Beatrice Lim",
  "Dr. Christian Sim", "Dr. Diana Kumar", "Dr. Edwin Lau", "Dr. Felicia Seng", "Dr. George Chia",
  "Dr. Heather Teng", "Dr. Ian Khor", "Dr. Joanne Varma", "Dr. Kevin Baey", "Dr. Lorraine Chan",
  "Dr. Malcolm Seet", "Dr. Nadia Aljunied", "Dr. Oliver Quek", "Dr. Patricia Aw", "Dr. Quentin Yap",
  "Dr. Rebecca Nathan", "Dr. Samuel Boon", "Dr. Teresa Choo", "Dr. Umar Farooq", "Dr. Vanessa Leong",
  "Dr. Wayne Heng", "Dr. Xanthe Teoh", "Dr. Yvan Lim", "Dr. Zoe Chng", "Dr. Aaron Pillai",
  "Dr. Belinda Woo", "Dr. Colin Sham", "Dr. Denise Kang", "Dr. Edward Low", "Dr. Faith Chia",
  "Dr. Gordon Ng", "Dr. Hilary Song", "Dr. Isaac Pereira", "Dr. Janice Tan", "Dr. Kelvin Ong",
  "Dr. Lisa Koh", "Dr. Michael Chee", "Dr. Nicole Sim", "Dr. Patrick Rao", "Dr. Wendy Ang",
];

const DOCTOR_CREDENTIALS = [
  "MBBS (Singapore), MRCP (UK), FAMS (Cardiology)",
  "MBBS (Singapore), MMed (Family Med), FCFP (Singapore)",
  "MBBS (London), FRCP (Edin), FAMS (Endocrinology)",
  "MBBS (Singapore), MRCP (UK), Dip Derm (Glasgow)",
  "MBBS (Melbourne), FRACP, FAMS (Gastroenterology)",
  "MBBS (Singapore), MMed (Int Med), FAMS (Longevity)",
  "MBBS (Sydney), FRCS (Orth), FAMS (Sports Medicine)",
  "MBBS (Singapore), MRCOG (UK), FAMS (O&G)",
  "MBBS (Cambridge), PhD (Oxon), FAMS (Neurology)",
  "MBBS (Singapore), MMed (Psychiatry), FAMS",
];

// Curated Doctor Portrait Images (High quality, friendly, warm, Apple Health / Awwwards aesthetic)
const DOCTOR_IMAGES = [
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80", // Dr. Alistair Chen: male physician in lab coat with stethoscope
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80", // Dr. Mei-Ling Tan: female consultant in white coat with stethoscope
  "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=800&q=80", // Dr. Jonathan Wong: senior consultant in medical coat with stethoscope
  "https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&w=800&q=80", // Dr. Priya Nair: Asian male physician in clinical coat
  "https://images.unsplash.com/photo-1637059824899-a441006a6875?auto=format&fit=crop&w=800&q=80", // Dr. Marcus Lee: Asian female consultant physician with stethoscope
  "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80", // Dr. Sarah Lim: female doctor with stethoscope in clinical suite
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80", // Dr. David Koh: male clinician with stethoscope
  "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&w=800&q=80", // Dr. Valerie Neo: female physician with stethoscope, warm smile
  "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=800&q=80", // Dr. Kenneth Ng: male doctor in clinical room
  "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80", // Dr. Evelyn Zhang: female doctor in clinic
  "https://images.unsplash.com/photo-1623854767648-e7bb8009f0db?auto=format&fit=crop&w=800&q=80", // Dr. Timothy Seah: male doctor in white coat
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80", // Dr. Nurul Huda: clinician reviewing diagnostics
];

const DOCTOR_PHILOSOPHIES = [
  "True health is not merely the absence of disease, but a vibrant state of metabolic equilibrium, deep restful sleep, and lifelong vitality.",
  "I believe in treating the person behind the biomarkers. Preventive medicine is the greatest gift we can give our future selves.",
  "Every patient's cardiovascular system tells an intricate story. Our role is to listen early and intervene with quiet precision.",
  "Empowering patients with clear, dignified health knowledge removes anxiety and restores personal agency over longevity.",
  "In modern Singapore, stress often manifests silently in the gut and endocrine axes. We address root causes with empathy and science.",
];

// Insurance Panels Meta for 30 items (INS001 - INS030)
const INSURANCE_NAMES = [
  { name: "AIA HealthShield Gold Max", tier: "Integrated Shield" as const, copay: 5, cashless: true, badge: "Direct Cashless Billing", pop: true },
  { name: "Great Eastern SupremeHealth", tier: "Integrated Shield" as const, copay: 5, cashless: true, badge: "Direct Hospital & Specialist", pop: true },
  { name: "Prudential PRUShield Premier", tier: "Integrated Shield" as const, copay: 5, cashless: true, badge: "Instant Letter of Guarantee", pop: true },
  { name: "Singlife Comprehensive Shield", tier: "Integrated Shield" as const, copay: 5, cashless: true, badge: "Express Claim Settlement", pop: true },
  { name: "NTUC Income Enhanced IncomeShield", tier: "Integrated Shield" as const, copay: 5, cashless: true, badge: "Preferred Specialist Panel", pop: true },
  { name: "HSBC Life Shield Plan A", tier: "Integrated Shield" as const, copay: 5, cashless: true, badge: "Comprehensive Medical Coverage", pop: false },
  { name: "Raffles Shield Private Premier", tier: "Integrated Shield" as const, copay: 5, cashless: true, badge: "Direct Clinic Link", pop: false },
  { name: "CHAS Blue Scheme (MOH Singapore)", tier: "National Scheme / CHAS" as const, copay: 0, cashless: true, badge: "Maximum Government Subsidy", pop: true },
  { name: "CHAS Orange Scheme (MOH Singapore)", tier: "National Scheme / CHAS" as const, copay: 0, cashless: true, badge: "Tiered Chronic Care Subsidies", pop: true },
  { name: "CHAS Green Scheme (MOH Singapore)", tier: "National Scheme / CHAS" as const, copay: 0, cashless: true, badge: "Chronic Illness Screening Co-pay", pop: false },
  { name: "Singapore Medisave Approved Panel", tier: "National Scheme / CHAS" as const, copay: 0, cashless: true, badge: "Direct Medisave Deduction", pop: true },
  { name: "Pioneer & Merdeka Generation Subsidies", tier: "National Scheme / CHAS" as const, copay: 0, cashless: true, badge: "Enhanced Senior Subsidies", pop: false },
  { name: "Bupa Global Worldwide Elite", tier: "International Expat" as const, copay: 0, cashless: true, badge: "Direct Global Settlement", pop: true },
  { name: "Cigna Global Health Platinum", tier: "International Expat" as const, copay: 0, cashless: true, badge: "Global Direct Guarantee", pop: true },
  { name: "Allianz Care International", tier: "International Expat" as const, copay: 0, cashless: true, badge: "Worldwide Expat Support", pop: false },
  { name: "AXA Global Healthcare", tier: "International Expat" as const, copay: 0, cashless: true, badge: "Instant Concierge Approval", pop: false },
  { name: "Aetna International Summit", tier: "International Expat" as const, copay: 0, cashless: true, badge: "Direct Billing Partner", pop: false },
  { name: "Fullerton Health Corporate Network", tier: "Corporate Panel" as const, copay: 10, cashless: true, badge: "Enterprise Digital Pass", pop: true },
  { name: "IHP Integrated Health Plans", tier: "Corporate Panel" as const, copay: 10, cashless: true, badge: "Corporate Direct App", pop: true },
  { name: "MHC Medical Network Platinum", tier: "Corporate Panel" as const, copay: 10, cashless: true, badge: "QR Code Instant Check-In", pop: true },
  { name: "Mednefts Enterprise Care", tier: "Corporate Panel" as const, copay: 0, cashless: true, badge: "Digital Flexi Benefits", pop: false },
  { name: "Alliance Healthcare Corporate", tier: "Corporate Panel" as const, copay: 10, cashless: true, badge: "Direct Co-Pay Settlement", pop: false },
  { name: "Parkway Shenton Executive Panel", tier: "Corporate Panel" as const, copay: 10, cashless: true, badge: "Executive Corporate Card", pop: false },
  { name: "Adept Health Corporate Network", tier: "Corporate Panel" as const, copay: 10, cashless: true, badge: "E-Claimless Integration", pop: false },
  { name: "Tokio Marine Life Singapore", tier: "Integrated Shield" as const, copay: 10, cashless: true, badge: "Accredited Health Network", pop: false },
  { name: "MSIG Health Plus Prestige", tier: "Corporate Panel" as const, copay: 10, cashless: true, badge: "Enterprise Health Card", pop: false },
  { name: "Henner International Care", tier: "International Expat" as const, copay: 0, cashless: true, badge: "European Diplomatic Panel", pop: false },
  { name: "SOS International Medical Hub", tier: "International Expat" as const, copay: 0, cashless: true, badge: "Global Evac & Direct Pay", pop: false },
  { name: "Chubb Life Insurance Panel", tier: "Corporate Panel" as const, copay: 10, cashless: true, badge: "Verified Corporate Benefits", pop: false },
  { name: "Sompo Global Health Network", tier: "Corporate Panel" as const, copay: 10, cashless: true, badge: "Japanese Corporate Care", pop: false },
];

// Health Packages Meta for 50 Packages (PKG001 - PKG050)
const PACKAGE_STORIES = [
  {
    name: "Vitalis Genesis Baseline",
    subtitle: "The foundational metabolic and biomarker blueprint for proactive adults under 35.",
    tier: "Essential" as const,
    priceSgd: 280,
    duration: "60 mins",
    summary: "Establish your physiological baseline with precision lipid subfractions, liver and kidney metabolic health, resting 12-lead ECG, and fasting blood glucose.",
    coverage: ["Full Blood Count & Erythrocyte Indices", "Lipid Subfractions (Total, HDL, LDL, Triglycerides)", "Liver Function Profile (7 Biomarkers)", "Renal Chemistry & eGFR", "Resting 12-Lead Electrocardiogram", "Post-Screening Physician Deep Dive"],
    benefits: ["Understand your true metabolic baseline", "Early interception of insulin resistance", "Actionable 12-month nutrition directives", "Digital results within 4 hours"],
    suitability: "Ideal for young professionals, athletes, and first-time health screeners seeking high-precision clarity.",
    fastingRequired: true,
    doctorConsultation: "30-minute private consultation with Senior Family Physician",
    recommended: false,
    colorTheme: "#2A9D8F",
  },
  {
    name: "Vitalis Apex Executive",
    subtitle: "Our benchmark executive screening designed for high-performing professionals and leaders.",
    tier: "Executive" as const,
    priceSgd: 680,
    duration: "120 mins",
    summary: "An expansive clinical assessment integrating abdominal ultrasound, treadmill cardiovascular stress testing, cancer tumour markers, and thyroid metabolic panels.",
    coverage: ["All Genesis Comprehensive Biomarkers", "Complete Abdominal Ultrasound (Liver, Gallbladder, Kidneys, Spleen)", "Treadmill Stress Electrocardiogram (Bruce Protocol)", "Cancer Screening Markers (AFP, CEA, CA19-9, PSA/CA125)", "Free T4 & Sensitive TSH Hormone Assay", "High-Sensitivity CRP Inflammatory Index", "Personalized Doctor Longevity Consultation"],
    benefits: ["Detect silent structural and cardiovascular changes", "Screen for early-stage oncological signals", "Evaluate arterial elasticity and exercise tolerance", "Same-day priority multi-specialist referrals"],
    suitability: "Recommended for busy executives, entrepreneurs, and adults aged 35–55 requiring deep preventive reassurance.",
    fastingRequired: true,
    doctorConsultation: "45-minute consultation with Consultant Physician & Nutritionist",
    recommended: true,
    colorTheme: "#264653",
  },
  {
    name: "Vitalis Longevity Platinum",
    subtitle: "The gold-standard biological age profiling and whole-body interceptive screening experience.",
    tier: "Platinum" as const,
    priceSgd: 1480,
    duration: "180 mins",
    summary: "Cutting-edge longevity medicine featuring epigenetic biological clock analysis, low-dose coronary calcium CT scoring, advanced ApoB and Lp(a) cardio-genomics, and heavy metal profiling.",
    coverage: ["All Executive Apex Biomarkers", "Epigenetic DNA Methylation Biological Age Assay", "Coronary Artery Calcium (CAC) CT Scoring", "Apolipoprotein B (ApoB) & Lipoprotein(a) [Lp(a)]", "Whole-Body MRI Joint & Visceral Adipose Review", "Comprehensive Heavy Metal Toxicity Screen", "Continuous Glucose Monitor (CGM) 14-Day Sensor Onboarding", "Dedicated Concierge Doctor & Health Coach for 1 Year"],
    benefits: ["Discover your biological vs chronological age", "Quantify exact coronary calcification burden", "Identify atherogenic particle concentration before plaque forms", "Custom longevity supplementation and bio-optimization protocol"],
    suitability: "Designed for longevity enthusiasts, high-net-worth individuals, and proactive leaders seeking decades of healthspan.",
    fastingRequired: true,
    doctorConsultation: "60-minute comprehensive consult with Longevity Physician and Dietitian",
    recommended: true,
    colorTheme: "#E76F51",
  },
  {
    name: "Vitalis Cardio-Metabolic Prime",
    subtitle: "Advanced cardiovascular risk stratification and continuous glucose metabolism mastery.",
    tier: "Specialized" as const,
    priceSgd: 890,
    duration: "90 mins",
    summary: "Specialized diagnostics targeting vascular endothelial health, carotid intima-media thickness (CIMT) ultrasound, continuous glucose monitoring, and exercise VO2 capacity.",
    coverage: ["Carotid Artery Intima-Media Thickness (CIMT) Scan", "Echocardiogram (Cardiac Chamber & Valve Function)", "Advanced Lipid Particle Sizing & ApoB", "14-Day Continuous Glucose Monitor (Freestyle Libre 3)", "Homeostasis Model of Insulin Resistance (HOMA-IR)", "Cardiologist Consultation with Echocardiogram Review"],
    benefits: ["Direct visual assessment of arterial wall thickness", "Real-time glucose telemetry synced to Vitalis App", "Personalized exercise threshold recommendations", "Targeted statin/PCSK9/metabolic therapy guidance"],
    suitability: "Individuals with family history of cardiovascular disease, elevated LDL/ApoB, pre-diabetes, or hypertension.",
    fastingRequired: true,
    doctorConsultation: "45-minute Cardiology Specialist Consultation",
    recommended: false,
    colorTheme: "#E9C46A",
  },
  {
    name: "Vitalis Women's Bloom & Vitality",
    subtitle: "Holistic hormonal architecture, breast & pelvic precision, and bone longevity.",
    tier: "Specialized" as const,
    priceSgd: 750,
    duration: "105 mins",
    summary: "A tranquil and private experience incorporating 3D breast tomosynthesis, transvaginal pelvic ultrasound, ovarian reserve anti-Müllerian hormone (AMH), bone DEXA density, and thyroid panels.",
    coverage: ["High-Resolution Pelvic & Ovarian Ultrasound", "3D Digital Breast Tomosynthesis (Mammogram)", "Bone Mineral Densitometry (Dual-Energy X-Ray DEXA)", "Hormone Panel (Estradiol, Progesterone, FSH, LH, AMH)", "Cervical Liquid-Based Cytology & High-Risk HPV DNA", "Consultation with Female Gynaecology Specialist"],
    benefits: ["Earliest detection of reproductive and hormonal imbalances", "Assess ovarian reserve and perimenopause transition", "Protect skeletal integrity before osteopenia accelerates", "Delivered in a serene, female-only private wing"],
    suitability: "Women of all life stages navigating fertility planning, perimenopause, or routine annual preventive surveillance.",
    fastingRequired: false,
    doctorConsultation: "45-minute Consultation with Consultant Gynaecologist",
    recommended: false,
    colorTheme: "#2A9D8F",
  },
  {
    name: "Vitalis Neuro-Cognitive & Circadian",
    subtitle: "Optimizing brain health, deep sleep architecture, and executive mental clarity.",
    tier: "Specialized" as const,
    priceSgd: 820,
    duration: "90 mins",
    summary: "Investigate neuro-inflammation, cortisol circadian rhythms, digital neurocognitive processing speeds, and home sleep apnea monitoring.",
    coverage: ["Digital Neurocognitive Psychometric Evaluation", "4-Point Salivary Cortisol Rhythm Test", "Home Multi-Sensor Sleep Architecture Study", "Vitamin B12, Folate, Homocysteine & Methylation Panel", "Neurologist & Sleep Physician Consultation"],
    benefits: ["Identify root causes of brain fog and mid-day crashes", "Restore Stage 3 slow-wave and REM sleep cycles", "Mitigate long-term neuro-degenerative vulnerability", "Personalized light exposure and chronotherapy guide"],
    suitability: "Executives, researchers, and individuals experiencing unrefreshing sleep, burnout, or cognitive fatigue.",
    fastingRequired: false,
    doctorConsultation: "45-minute Neurologist & Sleep Medicine Consultation",
    recommended: false,
    colorTheme: "#264653",
  },
];

// Patient Stories / Reviews Meta for 200 items (REV001 - REV200)
const REVIEW_STORIES = [
  {
    author: "Elena Rostova",
    role: "Managing Director, Global FinTech",
    service: "Vitalis Longevity Platinum Screening",
    clinic: "Vitalis Flagship Marina Bay",
    quote: "Vitalis doesn't feel like a medical clinic—it feels like walking into the world's most serene wellness retreat. The depth of biological clock data and Dr. Chen's clarity was revelatory.",
    story: "As a busy executive, medical visits used to mean sterile waiting rooms and rushed 10-minute checkups. At Vitalis Marina Bay, my experience was entirely bespoke. From the tea lounge to the same-day epigenetic analysis on my phone, every touchpoint was flawless. My biological age turned out to be 4.2 years younger than my calendar age—and Dr. Chen gave me a concrete roadmap to keep it that way.",
    metric: "Biological Age 4.2 yrs Younger",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    date: "14 Sep 2026",
  },
  {
    author: "Marcus Wei-Jie Tan",
    role: "Founder & Technology Architect",
    service: "Continuous Glucose & Cardio-Metabolic Prime",
    clinic: "Vitalis Guoco Tower Tanjong Pagar",
    quote: "Booking took 15 seconds. No paper forms, no waiting anxiety. Within 3 hours I had real-time telemetry from my CGM sensor and actionable dietary modifications.",
    story: "I had family history of premature cardiac illness. Rather than waiting for symptoms, Dr. Priya Nair ran an ApoB and calcium score that gave me definitive answers. The integration with the Vitalis digital portal felt like Apple Health designed by leading Singapore cardiologists. Truly a masterclass in modern medical experience.",
    metric: "ApoB Reduced by 34% in 90 Days",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    date: "02 Sep 2026",
  },
  {
    author: "Sophie Lin-Carrington",
    role: "Architectural Principal",
    service: "Women's Bloom & Bone Vitality",
    clinic: "Vitalis Katong I12 Pavilion",
    quote: "A clinic designed with dignity, warmth, and natural light. For the first time in years, a doctor took the time to listen to my hormone concerns without brushing them aside.",
    story: "Navigating perimenopause in your forties is often isolating. Dr. Mei-Ling Tan conducted a thorough hormonal and bone density study in an environment so calming it felt like a Japanese spa. Her holistic recommendations—balancing micronutrients, resistance training, and gentle progesterone therapy—changed my sleep in two weeks.",
    metric: "100% Deep Sleep Restoration",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    date: "28 Aug 2026",
  },
  {
    author: "Dato' Jonathan K. Raja",
    role: "Senior Partner, Private Equity",
    service: "Executive Apex Comprehensive",
    clinic: "Vitalis Orchard Paragon",
    quote: "The contrast between traditional hospitals and Vitalis is night and day. Seamless insurance coordination with Great Eastern, zero queueing, and immediate doctor dialogue.",
    story: "I do my annual screening here religiously. The team had my letter of guarantee pre-approved before I even arrived at Paragon. The ultrasound suite was whisper-quiet, and Dr. Jonathan Wong walked me through every quadrant of the scan in real-time on high-resolution screens. Exceptional standard of care.",
    metric: "Zero Waiting Room Queue Time",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    date: "19 Aug 2026",
  },
  {
    author: "Clara Deschanel",
    role: "Creative Director",
    service: "Sleep Medicine & Circadian Optimization",
    clinic: "Vitalis Holland Village Sanctuary",
    quote: "My chronic insomnia was resolved not with heavy sedatives, but through meticulous circadian biomarker mapping and light therapy protocols.",
    story: "I had spent five years struggling with unrefreshing sleep and mid-afternoon crashes. The home sleep diagnostics at Vitalis Holland Village revealed subtle upper airway resistance and delayed cortisol spikes. Within one month of following Dr. Valerie Neo's circadian program, I wake up naturally energized at 6:30 AM every morning.",
    metric: "REM Sleep +42% Increase",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    date: "11 Aug 2026",
  },
];

// Health Articles Meta for 100 items (ART001 - ART100)
const ARTICLE_STORIES = [
  {
    title: "The Biology of Sleep Architecture: Optimizing Deep Rest in a 24-Hour City",
    excerpt: "Why Singapore's high-ambient light and late-night digital exposure disrupt Stage 3 slow-wave sleep—and how targeted circadian resets restore hormonal repair.",
    category: "Sleep & Circadian",
    readTime: "6 min read",
    date: "24 Sep 2026",
    doctor: "Dr. Valerie Neo",
    specialty: "Sleep Medicine & Circadian Rhythm",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80",
    trending: true,
    tags: ["Circadian Health", "Slow-Wave Sleep", "Cortisol"],
  },
  {
    title: "Beyond LDL: Why ApoB and Lp(a) Are the New Frontier in Singapore Cardiology",
    excerpt: "Standard cholesterol tests miss up to 40% of cardiovascular risk. Understanding particle count and genetically determined lipoprotein(a) is reshaping preventive cardiology.",
    category: "Cardiovascular",
    readTime: "8 min read",
    date: "18 Sep 2026",
    doctor: "Dr. Alistair Chen",
    specialty: "Cardiology & Vascular Health",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80",
    trending: true,
    tags: ["ApoB", "Heart Health", "Precision Medicine"],
  },
  {
    title: "Continuous Glucose Monitoring for Non-Diabetics: Insights from 1,000 Vitalis Patients",
    excerpt: "What happens when healthy executives wear glucose sensors for 14 days? The surprising foods causing hidden glycemic spikes and chronic low-grade fatigue.",
    category: "Metabolic Health",
    readTime: "7 min read",
    date: "12 Sep 2026",
    doctor: "Dr. Jonathan Wong",
    specialty: "Endocrinology & Metabolic Health",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    trending: false,
    tags: ["CGM Telemetry", "Insulin Sensitivity", "Longevity"],
  },
  {
    title: "The Longevity Protocol: Practical Epigenetic Habits That Shift Biological Age",
    excerpt: "DNA methylation assays prove that biological age is plastic. How cold exposure, zone-2 training, and NAD+ precursors influence cellular senescence.",
    category: "Longevity Medicine",
    readTime: "9 min read",
    date: "05 Sep 2026",
    doctor: "Dr. Mei-Ling Tan",
    specialty: "Preventive Medicine & Longevity",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
    trending: true,
    tags: ["DNA Methylation", "Autophagy", "Healthspan"],
  },
  {
    title: "Navigating Integrated Shield Plans in Singapore: Maximizing Preventative Care",
    excerpt: "A patient's guide to leveraging private hospital riders, pre-hospitalization screening benefits, and CHAS subsidies without paperwork friction.",
    category: "Healthcare Economics",
    readTime: "5 min read",
    date: "29 Aug 2026",
    doctor: "Dr. Kenneth Ng",
    specialty: "Family Medicine & Primary Care",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
    trending: false,
    tags: ["Shield Plans", "Medisave", "Cashless Care"],
  },
  {
    title: "Ergonomics of the Modern Desk Worker: Preventing Cervical Disc Compression",
    excerpt: "Biomechanics of the forward head posture and practical micro-movements to alleviate chronic neck tension, shoulder impingement, and tension headaches.",
    category: "Sports & Rehab",
    readTime: "6 min read",
    date: "20 Aug 2026",
    doctor: "Dr. David Koh",
    specialty: "Orthopaedics & Sports Biomechanics",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80",
    trending: false,
    tags: ["Biomechanics", "Postural Health", "Mobility"],
  },
];

// Helper to deterministically build enriched datasets from raw JSON
export function getAllClinics(): Clinic[] {
  return rawDataset.clinics.map((rawItem, idx) => {
    const meta = CLINIC_LOCATIONS_META[idx % CLINIC_LOCATIONS_META.length];
    // Assign 4 doctors to each clinic
    const docIds = [
      `DOC${String((idx * 4 + 1) % 80 || 80).padStart(3, "0")}`,
      `DOC${String((idx * 4 + 2) % 80 || 80).padStart(3, "0")}`,
      `DOC${String((idx * 4 + 3) % 80 || 80).padStart(3, "0")}`,
      `DOC${String((idx * 4 + 4) % 80 || 80).padStart(3, "0")}`,
    ];
    return {
      id: rawItem.id,
      rawName: rawItem.name,
      name: meta.name,
      district: meta.district,
      address: meta.address,
      postalCode: meta.postalCode,
      mrt: meta.mrt,
      mrtLine: meta.mrtLine,
      mrtColor: meta.mrtColor,
      openingHours: meta.openingHours,
      weekendHours: meta.weekendHours,
      phone: meta.phone,
      facilities: meta.facilities,
      parking: meta.parking,
      doctorIds: docIds,
      lat: meta.lat,
      lng: meta.lng,
      mapX: meta.mapX,
      mapY: meta.mapY,
      image: meta.image,
      tag: meta.tag,
    };
  });
}

export function getAllDoctors(): Doctor[] {
  const clinics = getAllClinics();
  return rawDataset.doctors.map((rawDoc, idx) => {
    const name = DOCTOR_NAMES[idx % DOCTOR_NAMES.length];
    const specIdx = (idx % 25) + 1;
    const specId = `SP${String(specIdx).padStart(3, "0")}`;
    const specMeta = SPECIALTY_META[specId] || SPECIALTY_META["SP001"];
    const clinic = clinics[idx % clinics.length];
    const feeItem = rawDataset.consultation_fees[idx % rawDataset.consultation_fees.length];
    const credentials = DOCTOR_CREDENTIALS[idx % DOCTOR_CREDENTIALS.length];
    const image = DOCTOR_IMAGES[idx % DOCTOR_IMAGES.length];
    const bio = DOCTOR_PHILOSOPHIES[idx % DOCTOR_PHILOSOPHIES.length];

    const expYears = 10 + (idx % 18);
    const languages = idx % 3 === 0
      ? ["English", "Mandarin", "Hokkien"]
      : idx % 3 === 1
      ? ["English", "Bahasa Melayu", "Mandarin"]
      : ["English", "Tamil", "Hindi"];

    const availability = idx % 4 === 0
      ? "Available Today (Afternoon)"
      : idx % 4 === 1
      ? "Available Tomorrow Morning"
      : idx % 4 === 2
      ? "Teleconsultation Available Now"
      : "Next Slot This Friday";

    return {
      id: rawDoc.id,
      rawName: rawDoc.name,
      name,
      honorific: "Consultant Physician",
      credentials,
      specialtyId: specId,
      specialtyName: specMeta.name,
      clinicId: clinic.id,
      clinicName: clinic.name,
      consultationFeeId: feeItem.id,
      consultationFeeSgd: feeItem.fee_sgd,
      experienceYears: expYears,
      languages,
      bio: `Dr. ${name.replace("Dr. ", "")} brings ${expYears} years of clinical expertise across Singapore's leading tertiary centres and private academic practice. Dedicated to proactive, non-invasive interceptive medicine, focusing on individual patient biomarkers.`,
      quote: bio,
      image,
      availability,
      rating: 4.95 + ((idx % 5) * 0.01),
      reviewCount: 48 + (idx * 3),
      badges: ["MOH Accredited", "Singapore Medical Council", "Vitalis Concierge Panel"],
      nextSlot: idx % 2 === 0 ? "Today, 03:30 PM" : "Tomorrow, 10:15 AM",
    };
  });
}

export function getAllServices(): Service[] {
  const allDoctors = getAllDoctors();
  return rawDataset.services.map((rawItem, idx) => {
    const specIdx = (idx % 25) + 1;
    const specId = `SP${String(specIdx).padStart(3, "0")}`;
    const specMeta = SPECIALTY_META[specId] || SPECIALTY_META["SP001"];
    const feeItem = rawDataset.consultation_fees[idx % rawDataset.consultation_fees.length];
    const doctor = allDoctors[idx % allDoctors.length];

    const serviceNames = [
      "Precision Biometric Health Audit",
      "Coronary Calcium & 3D Echocardiogram",
      "Continuous Glucose Telemetry Onboarding",
      "Epigenetic Methylation Longevity Assay",
      "Whole-Body Multi-Parametric MRI Review",
      "Comprehensive Endocrine & Hormone Cascade",
      "Carotid Intima-Media Arterial Scan",
      "Deep Sleep Architecture Polysomnography",
      "Gut Microbiome Sequencing & Elimination Audit",
      "Regenerative Joint Ultrasound & Biologics",
      "Digital Dermatoscopy & Full-Body Mole Map",
      "Executive Stress ECG & VO2 Max Test",
    ];

    const name = `${serviceNames[idx % serviceNames.length]} (${specMeta.name.split("&")[0].trim()})`;
    const fee = feeItem ? feeItem.fee_sgd * 2.5 : 180;

    return {
      id: rawItem.id,
      rawName: rawItem.name,
      name,
      specialtyId: specId,
      specialtyName: specMeta.name,
      category: specMeta.category,
      description: `Comprehensive evidence-based ${specMeta.name.toLowerCase()} protocol utilizing non-invasive diagnostic sensors and individualized clinical reviews with ${doctor.name}.`,
      durationMinutes: 30 + ((idx % 4) * 15),
      feeSgd: Math.round(fee),
      preparationSummary: idx % 3 === 0 ? "Fast for 8 hours prior (plain water allowed)." : "No fasting required. Wear comfortable clothing.",
      benefits: [
        "Same-day digital results in the Vitalis App",
        "Direct one-on-one specialist consultation",
        "Personalized biomarker trajectory roadmap",
        "Eligible for corporate panels & direct billing",
      ],
      suitableFor: "Recommended for adults seeking proactive health clarity and customized lifestyle directives.",
      featured: idx < 6,
      image: DOCTOR_IMAGES[idx % DOCTOR_IMAGES.length],
    };
  });
}

export function getAllInsurancePanels(): InsurancePanel[] {
  return rawDataset.insurance_panels.map((rawItem, idx) => {
    const meta = INSURANCE_NAMES[idx % INSURANCE_NAMES.length];
    return {
      id: rawItem.id,
      name: meta.name,
      tier: meta.tier,
      cashlessBilling: meta.cashless,
      copayPercent: meta.copay,
      claimProcess: "Instant electronic claim submission via SingPass or digital insurance card at concierge desk.",
      eligibility: "Covers outpatient specialist consults, approved health screenings, chronic medication, and diagnostic scans.",
      badge: meta.badge,
      popular: meta.pop,
    };
  });
}

export function getAllPreparationInstructions(): PreparationInstruction[] {
  const phases: Array<"before" | "during" | "after"> = ["before", "during", "after"];
  const instructionTemplates = [
    {
      phase: "before" as const,
      title: "Fasting & Hydration Architecture",
      summary: "8-10 hours overnight fasting required for accurate lipid subfractions and fasting glucose. Plain water is strongly encouraged to assist blood draws.",
      actionItem: "Stop solid food 8 hours before your slot. Drink 2 glasses of pure water upon waking.",
      timing: "T-minus 10 to 12 Hours",
      iconName: "Droplets",
      vitalTips: ["Drink plain water freely", "Avoid alcohol 24h prior", "Omit morning diabetes medication until after blood draw"],
    },
    {
      phase: "before" as const,
      title: "Attire & Physical Readiness",
      summary: "For treadmill ECGs and ultrasound examinations, loose two-piece athletic wear allows swift diagnostic sensor placement.",
      actionItem: "Wear comfortable walking shoes and bring your current medication list or supplement bottles.",
      timing: "T-minus 2 Hours",
      iconName: "Activity",
      vitalTips: ["Avoid caffeine on morning of test", "Bring gym shoes for stress test", "No heavy body lotions for ECG electrodes"],
    },
    {
      phase: "during" as const,
      title: "Digital Concierge Check-In",
      summary: "Arrive at your chosen Vitalis sanctuary. Scan your digital QR pass for instantaneous, paperless arrival.",
      actionItem: "Present your digital pass or NRIC at the biometric concierge desk. Relax in the acoustic bio-lounge.",
      timing: "Arrival (T-minus 10 mins)",
      iconName: "ShieldCheck",
      vitalTips: ["Private acoustic pods available", "Herbal infusions served", "Express blood collection suite"],
    },
    {
      phase: "during" as const,
      title: "Physician Consultation & Imaging",
      summary: "Meet your consultant doctor for high-resolution ultrasound, resting ECG, and deep biological exploration.",
      actionItem: "Discuss lifestyle goals, family history, and biomarker aspirations in complete privacy.",
      timing: "Consultation Suite",
      iconName: "UserCheck",
      vitalTips: ["High-res screen reviews", "Empathetic listening", "Interactive risk calculators"],
    },
    {
      phase: "after" as const,
      title: "Instant Results & Telemetry Sync",
      summary: "Your complete laboratory panel syncs directly into the Vitalis portal within 4 hours, accompanied by physician voice notes.",
      actionItem: "Review your biological age and target lipid biomarkers. Download your digital medical certificate.",
      timing: "Same Day (+4 Hours)",
      iconName: "Smartphone",
      vitalTips: ["Encrypted PDF download", "Audio commentary by your doctor", "Automated medication dispatch"],
    },
    {
      phase: "after" as const,
      title: "Longitudinal Longevity Roadmap",
      summary: "Your dedicated health coach checks in at day 7, 30, and 90 to ensure dietary and lifestyle milestones are achieved.",
      actionItem: "Schedule your follow-up progress review via the appointment center.",
      timing: "Day 7 to Day 90",
      iconName: "CalendarCheck",
      vitalTips: ["Continuous messaging with care team", "Repeat fingerprick tracking if requested", "Holistic healthspan review"],
    },
  ];

  return rawDataset.preparation_instructions.map((rawItem, idx) => {
    const tmpl = instructionTemplates[idx % instructionTemplates.length];
    return {
      id: rawItem.id,
      phase: tmpl.phase,
      title: `${tmpl.title} (Step ${idx + 1})`,
      summary: tmpl.summary,
      actionItem: tmpl.actionItem,
      timing: tmpl.timing,
      iconName: tmpl.iconName,
      vitalTips: tmpl.vitalTips,
    };
  });
}

export function getAllFollowUpPrograms(): FollowUpProgram[] {
  const followUpTitles = [
    { title: "Metabolic Longevity 90-Day Protocol", goal: "Reduce HOMA-IR insulin resistance below 1.2 and optimize visceral fat index", focus: "Continuous Glucose Telemetry & Low-Glycemic Architecture", color: "#2A9D8F" },
    { title: "Vascular Endothelial Health Sprint", goal: "Lower ApoB under 70 mg/dL and enhance brachial flow-mediated dilation", focus: "ApoB, Lp(a), and Arterial Elasticity", color: "#264653" },
    { title: "Circadian Rhythm & REM Rebuilding", goal: "Increase restorative slow-wave sleep to >20% of sleep duration", focus: "Melatonin architecture & HRV monitoring", color: "#E76F51" },
    { title: "Post-Screening Executive Action Pathway", goal: "Resolve identified vitamin deficiencies, fatty liver signals, and hypertension", focus: "Bi-weekly doctor checks & lifestyle adjustments", color: "#E9C46A" },
    { title: "Gut Microbiome & Systemic Balance", goal: "Re-establish mucosal barrier integrity and eradicate systemic bloating", focus: "Targeted prebiotic foods & zonulin biomarkers", color: "#2A9D8F" },
  ];

  return rawDataset.follow_up_programs.map((rawItem, idx) => {
    const tmpl = followUpTitles[idx % followUpTitles.length];
    const progress = 35 + ((idx * 7) % 55);
    return {
      id: rawItem.id,
      title: tmpl.title,
      duration: "90 Days Active Pathway",
      targetGoal: tmpl.goal,
      progressPercent: progress,
      currentMilestone: `Milestone Phase ${((idx % 3) + 1)}: Biomarker Stabilization`,
      nextAction: "Lab re-test scheduled in 14 days. Daily nutrition log verified.",
      frequency: "Weekly digital check-in with your Vitalis care navigator",
      biometricFocus: tmpl.focus,
      color: tmpl.color,
      reminders: [
        { id: `R1-${idx}`, time: "07:30 AM", task: "Log fasting blood glucose via Bluetooth sensor", done: true },
        { id: `R2-${idx}`, time: "01:00 PM", task: "Post-lunch 10-minute zone-1 stroll", done: true },
        { id: `R3-${idx}`, time: "09:30 PM", task: "Enable warm amber lighting & sleep telemetry band", done: false },
      ],
    };
  });
}

export function getAllHealthPackages(): HealthPackage[] {
  return rawDataset.health_packages.map((rawItem, idx) => {
    const tmpl = PACKAGE_STORIES[idx % PACKAGE_STORIES.length];
    return {
      id: rawItem.id,
      name: `${tmpl.name}${idx >= PACKAGE_STORIES.length ? ` (Cohort ${Math.floor(idx / PACKAGE_STORIES.length) + 1})` : ""}`,
      subtitle: tmpl.subtitle,
      tier: tmpl.tier,
      priceSgd: tmpl.priceSgd + ((idx % 3) * 20),
      duration: tmpl.duration,
      summary: tmpl.summary,
      coverage: tmpl.coverage,
      benefits: tmpl.benefits,
      suitability: tmpl.suitability,
      fastingRequired: tmpl.fastingRequired,
      doctorConsultation: tmpl.doctorConsultation,
      recommended: idx === 1 || idx === 2,
      colorTheme: tmpl.colorTheme,
    };
  });
}

export function getAllPatientJourneys(): PatientJourney[] {
  const journeyStages = [
    { stage: "Stage 01: Intelligent Concierge Intake", title: "Personalized Care Mapping", desc: "No clipboard questionnaires. You choose your health focus in 3 taps; our algorithm pairs you with the ideal specialist and clinic location.", action: "Select primary health inquiry on mobile or desktop", digital: "Instant appointment sync & digital pre-screening questionnaire" },
    { stage: "Stage 02: Calm Sanctuary Experience", title: "Zero-Queue Private Suite", desc: "Step into our serene, acoustic clinic pavilions. Private consultation suites replace sterile waiting areas.", action: "Scan digital pass upon entry; enjoy bespoke herbal refreshments", digital: "Real-time clinic concierge notifications" },
    { stage: "Stage 03: Precision Biomarker Diagnostics", title: "Comprehensive Multi-Modal Testing", desc: "From point-of-care micro-blood analyses to 3D ultrasound and continuous telemetry sensor placement, diagnostics are swift and dignified.", action: "Relax during painless, warm diagnostic examinations", digital: "Sensors sync data directly to your encrypted health vault" },
    { stage: "Stage 04: Physician Deep Dialogue", title: "Empowering Medical Insights", desc: "Your consultant explains every reading on large visual displays. We co-create a clear, motivating action plan together.", action: "Ask questions, review images, and set longevity goals", digital: "Recorded audio doctor summary accessible in your app" },
    { stage: "Stage 05: Longitudinal Care & Telemetry", title: "Care Beyond Appointments", desc: "Our commitment begins after you leave. We track your progress, deliver repeat prescriptions within 90 minutes, and celebrate your healthspan wins.", action: "Wear your telemetry tracker or follow daily lifestyle cues", digital: "Direct encrypted chat with your Vitalis care team" },
  ];

  return rawDataset.patient_journeys.map((rawItem, idx) => {
    const tmpl = journeyStages[idx % journeyStages.length];
    return {
      id: rawItem.id,
      stageName: tmpl.stage,
      stepNumber: (idx % 5) + 1,
      title: tmpl.title,
      description: tmpl.desc,
      patientAction: tmpl.action,
      digitalSupport: tmpl.digital,
      duration: "Continuous 365-Day Support",
    };
  });
}

export function getAllReviews(): Review[] {
  return rawDataset.reviews.map((rawItem, idx) => {
    const tmpl = REVIEW_STORIES[idx % REVIEW_STORIES.length];
    return {
      id: rawItem.id,
      rating: rawItem.rating || 5,
      author: `${tmpl.author}${idx >= REVIEW_STORIES.length ? ` #${idx + 1}` : ""}`,
      role: tmpl.role,
      serviceReceived: tmpl.service,
      clinicLocation: tmpl.clinic,
      date: tmpl.date,
      quote: tmpl.quote,
      fullStory: tmpl.story,
      avatar: tmpl.avatar,
      verifiedPatient: true,
      highlightMetric: tmpl.metric,
    };
  });
}

export function getAllHealthArticles(): HealthArticle[] {
  return rawDataset.health_articles.map((rawItem, idx) => {
    const tmpl = ARTICLE_STORIES[idx % ARTICLE_STORIES.length];
    return {
      id: rawItem.id,
      title: `${tmpl.title}${idx >= ARTICLE_STORIES.length ? ` (Part ${Math.floor(idx / ARTICLE_STORIES.length) + 1})` : ""}`,
      excerpt: tmpl.excerpt,
      content: `${tmpl.excerpt} Modern medicine is shifting rapidly from disease reaction to interceptive prevention. At Vitalis Health, our multi-disciplinary clinicians utilize high-sensitivity biomarkers and personalized lifestyle medicine to extend healthy life expectancy across Singapore.`,
      category: tmpl.category,
      readTime: tmpl.readTime,
      date: tmpl.date,
      authorDoctorName: tmpl.doctor,
      authorSpecialty: tmpl.specialty,
      image: tmpl.image,
      trending: tmpl.trending || (idx % 4 === 0),
      tags: tmpl.tags,
    };
  });
}

export function getAllAppointmentSlots(): AppointmentSlotItem[] {
  const doctors = getAllDoctors();
  const clinics = getAllClinics();
  const times = [
    { t: "08:30 AM", p: "Morning" as const },
    { t: "09:15 AM", p: "Morning" as const },
    { t: "10:00 AM", p: "Morning" as const },
    { t: "11:30 AM", p: "Morning" as const },
    { t: "02:00 PM", p: "Afternoon" as const },
    { t: "03:15 PM", p: "Afternoon" as const },
    { t: "04:30 PM", p: "Afternoon" as const },
    { t: "05:45 PM", p: "Evening" as const },
    { t: "06:30 PM", p: "Evening" as const },
    { t: "07:15 PM", p: "Evening" as const },
  ];

  return rawDataset.appointment_slots.map((rawItem, idx) => {
    const dayOffset = Math.floor(idx / times.length) % 14;
    const dateObj = new Date(2026, 8, 30); // 2026-09-30
    dateObj.setDate(dateObj.getDate() + dayOffset);
    const dateStr = dateObj.toISOString().split("T")[0];

    const timeEntry = times[idx % times.length];
    const doc = doctors[idx % doctors.length];
    const clinic = clinics[idx % clinics.length];

    return {
      id: rawItem.id,
      date: dateStr,
      time: timeEntry.t,
      period: timeEntry.p,
      doctorId: doc.id,
      clinicId: clinic.id,
      available: (idx % 6) !== 0, // Most slots open
    };
  });
}

// Quick stats for Hero & Summary Badges
export function getVitalisMetrics() {
  return {
    totalClinics: rawDataset.clinics.length,
    totalDoctors: rawDataset.doctors.length,
    totalServices: rawDataset.services.length,
    totalPanels: rawDataset.insurance_panels.length,
    totalReviews: rawDataset.reviews.length,
    averageRating: "5.0",
    recommendationRate: "99.4%",
    patientCareTagline: "Care Beyond Appointments",
  };
}
