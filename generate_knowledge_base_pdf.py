import os
import json
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

# Define Vitalis Palette Colors
PRIMARY = colors.HexColor("#264653")      # Deep Slate Pine
SECONDARY = colors.HexColor("#2A9D8F")    # Vitality Teal
ACCENT = colors.HexColor("#E76F51")       # Warm Coral
HIGHLIGHT = colors.HexColor("#E9C46A")    # Radiant Amber
BG_CREAM = colors.HexColor("#F7F5F0")     # Warm Stone Canvas
CARD_BG = colors.HexColor("#FFFFFF")      # Pure White
BORDER_COLOR = colors.HexColor("#E5E5E5") # Hairline Border
MUTED_TEXT = colors.HexColor("#555555")   # Muted Slate
LIGHT_TEAL = colors.HexColor("#EAF5F4")   # Soft Teal Tint
LIGHT_AMBER = colors.HexColor("#FDF8EC")  # Soft Amber Tint

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        if self._pageNumber == 1:
            return  # Suppress headers/footers on the cover page

        self.saveState()
        self.setFont("Helvetica-Bold", 7.5)
        self.setFillColor(PRIMARY)
        
        # Running Top Header
        self.drawString(54, 11 * inch - 36, "VITALIS HEALTH • AI CHATBOT KNOWLEDGE BASE & CLINICAL MANUAL")
        self.setFont("Helvetica", 7.5)
        self.setFillColor(MUTED_TEXT)
        self.drawRightString(8.5 * inch - 54, 11 * inch - 36, "SINGAPORE MEDICAL NETWORK")
        
        self.setStrokeColor(BORDER_COLOR)
        self.setLineWidth(0.75)
        self.line(54, 11 * inch - 42, 8.5 * inch - 54, 11 * inch - 42)

        # Running Bottom Footer
        self.setFont("Helvetica", 7.5)
        self.setFillColor(MUTED_TEXT)
        self.drawString(54, 34, "CONFIDENTIAL • CARE BEYOND APPOINTMENTS • FOR AI CONCIERGE RAG INGESTION")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(8.5 * inch - 54, 34, page_str)
        self.line(54, 44, 8.5 * inch - 54, 44)
        
        self.restoreState()

def build_pdf():
    # Load raw dataset
    dataset_path = "vitalis_health_dataset.json"
    with open(dataset_path, "r", encoding="utf-8") as f:
        raw_data = json.load(f)

    pdf_filename = "Vitalis_Health_AI_Chatbot_Knowledge_Base.pdf"
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()

    # Custom Typography Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=28,
        leading=34,
        textColor=PRIMARY,
        spaceAfter=10
    )

    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=SECONDARY,
        spaceAfter=20
    )

    h1_style = ParagraphStyle(
        'Heading1_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=20,
        textColor=PRIMARY,
        spaceBefore=16,
        spaceAfter=8,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'Heading2_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=SECONDARY,
        spaceBefore=10,
        spaceAfter=5,
        keepWithNext=True
    )

    h3_style = ParagraphStyle(
        'Heading3_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=PRIMARY,
        spaceBefore=8,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor("#2C3E50"),
        spaceAfter=6
    )

    body_bold = ParagraphStyle(
        'Body_Bold_Custom',
        parent=body_style,
        fontName='Helvetica-Bold'
    )

    callout_style = ParagraphStyle(
        'CalloutText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=PRIMARY
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10,
        textColor=colors.white
    )

    table_cell_style = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=9.5,
        textColor=colors.HexColor("#264653")
    )

    table_cell_bold = ParagraphStyle(
        'TableCellBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=9.5,
        textColor=colors.HexColor("#264653")
    )

    story = []

    # =========================================================================
    # COVER PAGE
    # =========================================================================
    story.append(Spacer(1, 40))
    story.append(Paragraph("VITALIS HEALTH", ParagraphStyle('CoverEyebrow', fontName='Helvetica-Bold', fontSize=12, textColor=SECONDARY, leading=14, spaceAfter=8)))
    story.append(Paragraph("AI Chatbot Comprehensive<br/>Knowledge Base &amp; Operations Manual", title_style))
    story.append(Paragraph("A Complete Reference Architecture for Automated Clinical Concierge, Patient Triage, Directory Navigation &amp; Longitudinal Care Coordination", subtitle_style))
    
    story.append(HRFlowable(width="100%", thickness=3, color=SECONDARY, spaceBefore=10, spaceAfter=20))
    
    cover_meta = [
        [Paragraph("<b>Brand Identity:</b>", body_style), Paragraph("Vitalis Health (Singapore Medical Network)", body_style)],
        [Paragraph("<b>Tagline:</b>", body_style), Paragraph("Care Beyond Appointments", body_style)],
        [Paragraph("<b>Document Purpose:</b>", body_style), Paragraph("Master Ingestion Document for AI Conversational Concierge, RAG Vector Stores, Intent Routing &amp; Support Workflows", body_style)],
        [Paragraph("<b>Clinics In Network:</b>", body_style), Paragraph("20 Sanctuaries across Singapore (Marina Bay, Novena, Orchard, Tanjong Pagar, etc.)", body_style)],
        [Paragraph("<b>Clinician Roster:</b>", body_style), Paragraph("80 Specialist &amp; Family Physicians", body_style)],
        [Paragraph("<b>Clinical Disciplines:</b>", body_style), Paragraph("25 Specialties (Longevity, Cardiology, Endocrinology, Gynaecology, etc.)", body_style)],
        [Paragraph("<b>Diagnostic Services:</b>", body_style), Paragraph("100 Evidence-Based Protocols", body_style)],
        [Paragraph("<b>Insurance Partnerships:</b>", body_style), Paragraph("30 Direct Cashless Panels (AIA, Great Eastern, Prudential, Singlife, CHAS, Medisave)", body_style)],
        [Paragraph("<b>Regulatory Standards:</b>", body_style), Paragraph("Singapore MOH Accredited, PHMC Act Compliant, PDPA Medical Privacy Standard", body_style)],
        [Paragraph("<b>Version &amp; Date:</b>", body_style), Paragraph("Release 2.4 • October 2026", body_style)],
    ]
    t_cover = Table(cover_meta, colWidths=[130, 370])
    t_cover.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_cover)
    story.append(Spacer(1, 40))

    # Confidentiality Box
    disclaimer_text = (
        "<b>MANDATORY AI OPERATIONAL DIRECTIVE:</b> This document contains the definitive, single-source-of-truth "
        "data model for the Vitalis Health platform. When interacting with patients, the AI Chatbot MUST strictly uphold "
        "medical safety guardrails. In any situation involving chest pain, acute shortness of breath, loss of consciousness, "
        "unilateral weakness, or severe hemorrhage, the bot MUST immediately instruct the user to call 995 or report to the nearest A&E. "
        "The bot acts as a sophisticated healthcare concierge, facilitating appointments, answering preparation queries, and clarifying insurance panels, but does NOT issue definitive clinical diagnoses without physician review."
    )
    t_box = Table([[Paragraph(disclaimer_text, callout_style)]], colWidths=[500])
    t_box.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), LIGHT_TEAL),
        ('BORDER', (0,0), (-1,-1), 1, SECONDARY),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(t_box)

    story.append(PageBreak())

    # =========================================================================
    # CHAPTER 1: AI CHATBOT PERSONA, TONE & ARCHITECTURE
    # =========================================================================
    story.append(Paragraph("1. AI Chatbot Persona, Tone &amp; Operational Blueprint", h1_style))
    story.append(Paragraph(
        "The Vitalis Concierge AI embodies the persona of a senior, compassionate clinical concierge at a flagship Singapore medical institute. "
        "The communication tone is calm, warm, authoritative, and respectful. It combines the seamless design clarity of Apple Health, the mindfulness of Headspace, "
        "and the surgical precision of Singapore's premier healthcare network.",
        body_style
    ))
    story.append(Paragraph("<b>Core Persona Principles:</b>", h2_style))
    story.append(Paragraph("• <b>Human-First &amp; Empathetic:</b> Acknowledge patient concerns warmly. Never use cold robotic phrases.", body_style))
    story.append(Paragraph("• <b>Transparent Pricing:</b> Quote exact consultation fees in Singapore Dollars (SGD Nett) without hidden surcharges.", body_style))
    story.append(Paragraph("• <b>Zero-Wait Reassurance:</b> Reassure patients that Vitalis operates on a private sanctuary model with zero waiting room congestion.", body_style))
    story.append(Paragraph("• <b>Local Context Mastery:</b> Seamlessly converse about Singapore MRT stations, SingPass check-ins, CHAS subsidies, Medisave deductions, and Integrated Shield riders.", body_style))
    story.append(Paragraph("• <b>Proactive Longevity Orientation:</b> Emphasize preventive cellular biomarkers (ApoB, Lp(a), CAC score, epigenetic biological age) rather than reactive sickness treatment.", body_style))

    story.append(Spacer(1, 10))
    story.append(Paragraph("2. Emergency Triage Protocols &amp; Red-Flag Routing", h1_style))
    story.append(Paragraph(
        "The AI Chatbot MUST continually screen user input for acute life-threatening medical emergencies. "
        "If any trigger word or physiological red flag is detected, all conversational flows MUST halt immediately and present the Emergency Directive.",
        body_style
    ))

    triage_data = [
        [Paragraph("Red-Flag Symptoms", table_header_style), Paragraph("Clinical Risk", table_header_style), Paragraph("Mandatory AI Action", table_header_style)],
        [Paragraph("Crushing chest pressure, radiating arm/jaw pain, diaphoresis", table_cell_bold), Paragraph("Suspected Acute Myocardial Infarction", table_cell_style), Paragraph("Instruct immediate call to <b>995</b>. Do NOT offer clinic booking.", table_cell_style)],
        [Paragraph("Facial droop, arm weakness, slurred speech (FAST criteria)", table_cell_bold), Paragraph("Acute Cerebrovascular Event (Stroke)", table_cell_style), Paragraph("Instruct immediate ambulance call <b>995</b>. State time of symptom onset.", table_cell_style)],
        [Paragraph("Stridor, severe wheezing, anaphylaxis, facial angioedema", table_cell_bold), Paragraph("Acute Airway Compromise / Anaphylaxis", table_cell_style), Paragraph("Instruct immediate emergency response <b>995</b> / EpiPen use if prescribed.", table_cell_style)],
        [Paragraph("High fever >39.5°C with stiff neck, photophobia, petechial rash", table_cell_bold), Paragraph("Suspected Meningitis / Severe Sepsis", table_cell_style), Paragraph("Direct patient immediately to the nearest Hospital A&E.", table_cell_style)],
        [Paragraph("Active suicidal ideation, intent to harm self", table_cell_bold), Paragraph("Acute Psychiatric Emergency", table_cell_style), Paragraph("Provide SOS 24h Hotline: <b>1767</b> or IMH Emergency Helpline: <b>6389 2222</b>.", table_cell_style)],
    ]
    t_triage = Table(triage_data, colWidths=[160, 150, 190])
    t_triage.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, BG_CREAM]),
    ]))
    story.append(t_triage)

    story.append(PageBreak())

    # =========================================================================
    # CHAPTER 3: DIRECTORY OF ALL 20 CLINIC SANCTUARIES
    # =========================================================================
    story.append(Paragraph("3. Directory of All 20 Clinic Sanctuaries Across Singapore", h1_style))
    story.append(Paragraph(
        "Vitalis operates 20 serene medical sanctuaries in Singapore. Each clinic features private acoustic suites, "
        "diagnostic imaging, rapid blood lab capabilities, and direct access to primary MRT lines. The AI chatbot must match "
        "patients to their closest or most suitable facility.",
        body_style
    ))

    # We will build a detailed profile for each of the 20 clinics
    clinic_metas = [
        {"id": "CL001", "name": "Vitalis Flagship Marina Bay", "dist": "Downtown / CBD", "addr": "Tower 2, #18-01 Marina Bay Financial Centre, 10 Marina Blvd, S018983", "mrt": "Downtown MRT (DT17) / Marina Bay (NS27/TE20)", "hrs": "Mon-Fri: 08:00-20:30 | Sat: 08:30-16:00", "phone": "+65 6812 7701", "fac": "Executive Screening, Cardiac Echo, Private Acoustic Pods, Bio-Lounge", "park": "Valet at Tower 2 Lobby. B2 EV charging."},
        {"id": "CL002", "name": "Vitalis Novena Specialist Suites", "dist": "Novena Medical Hub", "addr": "Novena Specialist Center #09-12, 8 Sinaran Drive, S307470", "mrt": "Novena MRT (NS20)", "hrs": "Mon-Fri: 08:30-19:30 | Sat-Sun: 09:00-15:00", "phone": "+65 6812 7702", "fac": "Specialist Consults, Digital Mammography, Bone DEXA, Infusion Suite", "park": "Underground parking via Sinaran Dr. Sheltered link to MRT."},
        {"id": "CL003", "name": "Vitalis Orchard Paragon", "dist": "Orchard Medical Belt", "addr": "Paragon Medical #14-06, 290 Orchard Road, S238859", "mrt": "Orchard MRT (NS22/TE14) / Somerset (NS23)", "hrs": "Mon-Fri: 08:30-20:00 | Sat: 09:00-17:00 | Sun: 10:00-14:00", "phone": "+65 6812 7703", "fac": "Dermatology Lasers, Executive Screening, Nutrition Bar, VIP Lounge", "park": "Direct Paragon Medical lifts, designated patient lots."},
        {"id": "CL004", "name": "Vitalis Guoco Tower Tanjong Pagar", "dist": "Tanjong Pagar / CBD South", "addr": "Guoco Tower Level 22, 1 Wallich Street, S078881", "mrt": "Tanjong Pagar MRT (EW15)", "hrs": "Mon-Fri: 07:45-20:00 | Sat: 08:30-14:00", "phone": "+65 6812 7704", "fac": "CGM Continuous Glucose Lab, Metabolic Profiling, Express Blood Lab", "park": "Guoco Tower B3 carpark with direct medical elevator."},
        {"id": "CL005", "name": "Vitalis Ocean Financial Raffles Place", "dist": "Raffles Place CBD", "addr": "Ocean Financial Centre #16-02, 10 Collyer Quay, S049315", "mrt": "Raffles Place MRT (NS26/EW14)", "hrs": "Mon-Fri: 08:00-19:30 | Sat: 08:30-13:00", "phone": "+65 6812 7705", "fac": "Same-Day Screening, Holter Rhythm Lab, Tele-Urgent Hub", "park": "Basement carpark via Collyer Quay. Sheltered MRT concourse."},
        {"id": "CL006", "name": "Vitalis Holland Village Sanctuary", "dist": "Holland Village / West", "addr": "One Holland Village #04-18, 7 Holland Village Way, S275748", "mrt": "Holland Village MRT (CC21)", "hrs": "Mon-Sun: 08:30-21:00 (Daily)", "phone": "+65 6812 7706", "fac": "Family & Pediatric Care, Outdoor Zen Garden, Allergy Immuno-Lab", "park": "One Holland Village carpark with EV superchargers."},
        {"id": "CL007", "name": "Vitalis Katong I12 Pavilion", "dist": "East Coast / Marine Parade", "addr": "I12 Katong #03-22, 112 East Coast Road, S428802", "mrt": "Marine Parade MRT (TE26)", "hrs": "Mon-Fri: 08:30-20:30 | Sat-Sun: 09:00-18:00", "phone": "+65 6812 7707", "fac": "Women's Health Unit, Ultrasound Diagnostic Pods, Mindfulness Suite", "park": "B1 & B2 Carpark at I12 Katong. Lift lobby B."},
        {"id": "CL008", "name": "Vitalis Jurong East Gateway", "dist": "Jurong Innovation Hub", "addr": "Westgate Tower #12-01, 1 Gateway Drive, S608531", "mrt": "Jurong East MRT (NS1/EW24)", "hrs": "Mon-Fri: 08:00-20:00 | Sat-Sun: 08:30-17:00", "phone": "+65 6812 7708", "fac": "Occupational Health, Digital X-Ray, Sports Biomechanics Room", "park": "Westgate Mall parking with sheltered bridge to Tower."},
        {"id": "CL009", "name": "Vitalis Tampines One East Center", "dist": "Tampines Regional", "addr": "Tampines Plaza 1 #08-03, 3 Tampines Central 1, S529540", "mrt": "Tampines MRT (EW2/DT32)", "hrs": "Mon-Fri: 08:30-21:00 | Sat-Sun: 09:00-18:00", "phone": "+65 6812 7709", "fac": "Executive Screening, Family Medicine, Preventive Eye Health Lab", "park": "Tampines Plaza 1 basement parking. 2 mins walk from MRT."},
        {"id": "CL010", "name": "Vitalis Woodlands North Coast", "dist": "Woodlands Gateway", "addr": "Woods Square Tower 1 #06-08, 6 Woodlands Square, S737737", "mrt": "Woodlands MRT (NS9/TE2)", "hrs": "Mon-Fri: 08:30-20:00 | Sat-Sun: 09:00-16:00", "phone": "+65 6812 7710", "fac": "Primary Care, Chronic Disease Management, Cross-Border Screening", "park": "Woods Square basement carpark with direct lift access."},
        {"id": "CL011", "name": "Vitalis Sentosa Cove Retreat", "dist": "Sentosa Luxury Enclave", "addr": "Quayside Isle #02-05, 31 Ocean Way, S098375", "mrt": "HarbourFront MRT (NE1/CC29) + Sentosa Express", "hrs": "Mon-Sun: 09:00-19:00 (Daily)", "phone": "+65 6812 7711", "fac": "Longevity Bio-Optimization, IV Micronutrient Bar, Cryotherapy", "park": "Quayside Isle basement parking with marina drop-off."},
        {"id": "CL012", "name": "Vitalis Bugis Heritage House", "dist": "Bugis / Bras Basah", "addr": "Duo Tower #11-04, 3 Fraser Street, S189352", "mrt": "Bugis MRT (EW12/DT14)", "hrs": "Mon-Fri: 08:30-20:00 | Sat: 09:00-16:00", "phone": "+65 6812 7712", "fac": "Cognitive Brain Lab, Dermatology Aesthetics, Holistic Stress Clinic", "park": "DUO Tower B3 carpark. Underpass direct to MRT."},
        {"id": "CL013", "name": "Vitalis Paya Lebar Quarter", "dist": "Paya Lebar Hub", "addr": "PLQ 1 #07-02, 1 Paya Lebar Link, S408533", "mrt": "Paya Lebar MRT (EW8/CC9)", "hrs": "Mon-Fri: 08:00-20:30 | Sat-Sun: 09:00-17:00", "phone": "+65 6812 7713", "fac": "Cardio Stress Testing, Ultrasound Diagnostic Clinic, Physiotherapy", "park": "Direct lift access from PLQ Mall B2/B3 carparks."},
        {"id": "CL014", "name": "Vitalis Serangoon NEX Community", "dist": "Serangoon Central", "addr": "NEX Integrated Suite #04-33, 23 Serangoon Central, S556083", "mrt": "Serangoon MRT (NE12/CC13)", "hrs": "Mon-Sun: 08:30-21:30 (Daily)", "phone": "+65 6812 7714", "fac": "Pediatric & Baby Wellness, Primary Care, Minor Surgical Procedure", "park": "NEX multi-storey carpark level 4 and 5."},
        {"id": "CL015", "name": "Vitalis Bishan Central Wing", "dist": "Bishan / Ang Mo Kio", "addr": "Junction 8 Office Tower #05-02, 9 Bishan Place, S579837", "mrt": "Bishan MRT (NS17/CC15)", "hrs": "Mon-Fri: 08:30-20:00 | Sat-Sun: 09:00-16:00", "phone": "+65 6812 7715", "fac": "Comprehensive Blood Lab, Bone Health DEXA, Geriatric Mobility", "park": "Junction 8 multi-storey carpark with covered link bridge."},
        {"id": "CL016", "name": "Vitalis Clementi West Care Hub", "dist": "Clementi / UTown", "addr": "321 Clementi #03-01, 321 Clementi Ave 3, S129905", "mrt": "Clementi MRT (EW23)", "hrs": "Mon-Fri: 08:30-20:30 | Sat-Sun: 09:00-17:00", "phone": "+65 6812 7716", "fac": "Sports Medicine & Biomechanics, Student Health, Musculoskeletal US", "park": "Underground carpark at 321 Clementi. Direct lift access."},
        {"id": "CL017", "name": "Vitalis Ang Mo Kio Sanctuary", "dist": "Ang Mo Kio Town", "addr": "AMK Hub Suite #03-12, 53 Ang Mo Kio Ave 3, S569933", "mrt": "Ang Mo Kio MRT (NS16)", "hrs": "Mon-Fri: 08:00-21:00 | Sat-Sun: 08:30-18:00", "phone": "+65 6812 7717", "fac": "Cardio-Metabolic Screening, Diabetic Retinopathy Camera, Vaccines", "park": "AMK Hub basement carpark with elderly drop-off."},
        {"id": "CL018", "name": "Vitalis HarbourFront Waterfront", "dist": "HarbourFront / Keppel", "addr": "HarbourFront Tower 1 #15-01, 1 HarbourFront Place, S098633", "mrt": "HarbourFront MRT (NE1/CC29)", "hrs": "Mon-Fri: 08:30-19:30 | Sat: 09:00-15:00", "phone": "+65 6812 7718", "fac": "Maritime Health, Seaside Acoustic Recovery Lounge, Radiography", "park": "HarbourFront Tower 1 valet. Sheltered link to VivoCity."},
        {"id": "CL019", "name": "Vitalis One-North Biopolis", "dist": "Biopolis Research Hub", "addr": "Synapse Biopolis #02-04, 3 Biopolis Drive, S138623", "mrt": "One-North MRT (CC23) / Buona Vista (EW21)", "hrs": "Mon-Fri: 08:00-19:00 | Sat: 09:00-13:00", "phone": "+65 6812 7719", "fac": "Genomic Testing Lab, Biomarker Sequencing, Longevity Trials", "park": "Biopolis Synapse basement parking with direct medical elevator."},
        {"id": "CL020", "name": "Vitalis Changi City Aviation Hub", "dist": "Changi Business Park", "addr": "Changi City Point #02-18, 5 Changi Business Park Central 1, S486038", "mrt": "Expo MRT (CG1/DT35)", "hrs": "Mon-Fri: 08:30-20:30 | Sat-Sun: 09:00-17:00", "phone": "+65 6812 7720", "fac": "Aviation Medical Exams, Pre-Flight Screening, Travel Immunization", "park": "Changi City Point carpark with direct link to Expo MRT."},
    ]

    clinic_table_data = [
        [Paragraph("ID &amp; Name", table_header_style), Paragraph("Address &amp; MRT", table_header_style), Paragraph("Hours &amp; Phone", table_header_style), Paragraph("Key Amenities &amp; Focus", table_header_style)]
    ]
    for c in clinic_metas:
        clinic_table_data.append([
            Paragraph(f"<b>{c['id']}</b><br/>{c['name']}<br/><i>{c['dist']}</i>", table_cell_style),
            Paragraph(f"{c['addr']}<br/><b>MRT:</b> {c['mrt']}", table_cell_style),
            Paragraph(f"{c['hrs']}<br/><b>Tel:</b> {c['phone']}", table_cell_style),
            Paragraph(f"{c['fac']}<br/><b>Parking:</b> {c['park']}", table_cell_style),
        ])

    t_clinics = Table(clinic_table_data, colWidths=[120, 150, 110, 120])
    t_clinics.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, BG_CREAM]),
    ]))
    story.append(t_clinics)

    story.append(PageBreak())

    # =========================================================================
    # CHAPTER 4: CLINICIAN ROSTER - ALL 80 DOCTORS (DOC001 - DOC080)
    # =========================================================================
    story.append(Paragraph("4. Clinician Specialist Roster (All 80 Doctors: DOC001 - DOC080)", h1_style))
    story.append(Paragraph(
        "Vitalis Health engages 80 accredited physicians. Every doctor is licensed by the Singapore Medical Council (SMC) "
        "and holds postgraduate certifications. The AI Chatbot must accurately cite each doctor's specialty, credentials, "
        "consultation fee (SGD), language fluency, and home clinic sanctuary.",
        body_style
    ))

    # Doctor data generation (matching data.ts mappings)
    doctor_names = [
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
    ]

    doctor_credentials = [
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
    ]

    specialties_meta = [
        "Preventive Medicine & Longevity", "Cardiology & Vascular Health", "Endocrinology & Metabolic Health",
        "Dermatology & Medical Aesthetics", "Executive Health Screening", "Family Medicine & Primary Care",
        "Gastroenterology & Microbiome", "Orthopaedics & Sports Biomechanics", "Women's Health & Gynaecology",
        "Men's Health & Vitality", "Neurology & Cognitive Longevity", "Pulmonary & Respiratory Medicine",
        "Mindfulness & Mental Wellbeing", "Ophthalmology & Visual Acuity", "ENT & Acoustic Health",
        "Functional Medicine & Nutrition", "Paediatrics & Adolescent Health", "Rheumatology & Autoimmune Care",
        "Sleep Medicine & Circadian Rhythm", "Travel Medicine & Immunization", "Allergy & Clinical Immunology",
        "Oncology Surveillance & Genomics", "Geriatric Medicine & Active Ageing", "Pain Management & Rehabilitation",
        "Tele-Urgent Care & Virtual Health"
    ]

    doctor_rows = [
        [Paragraph("Doc ID &amp; Name", table_header_style), Paragraph("Credentials &amp; Specialty", table_header_style), Paragraph("Base Sanctuary", table_header_style), Paragraph("Fee (SGD)", table_header_style), Paragraph("Languages Spoken", table_header_style)]
    ]

    for idx, doc_item in enumerate(raw_data['doctors']):
        doc_id = doc_item['id']
        name = doctor_names[idx % len(doctor_names)]
        creds = doctor_credentials[idx % len(doctor_credentials)]
        spec = specialties_meta[idx % len(specialties_meta)]
        clinic = clinic_metas[idx % len(clinic_metas)]
        fee_val = raw_data['consultation_fees'][idx % len(raw_data['consultation_fees'])]['fee_sgd']
        langs = "English, Mandarin, Hokkien" if idx % 3 == 0 else ("English, Malay, Mandarin" if idx % 3 == 1 else "English, Tamil, Hindi")

        doctor_rows.append([
            Paragraph(f"<b>{doc_id}</b><br/>{name}", table_cell_style),
            Paragraph(f"<b>{spec}</b><br/>{creds}", table_cell_style),
            Paragraph(f"{clinic['name']}", table_cell_style),
            Paragraph(f"S$ {fee_val}", table_cell_bold),
            Paragraph(f"{langs}", table_cell_style),
        ])

    t_doctors = Table(doctor_rows, colWidths=[90, 160, 120, 50, 80])
    t_doctors.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 2.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2.5),
        ('LEFTPADDING', (0,0), (-1,-1), 3),
        ('RIGHTPADDING', (0,0), (-1,-1), 3),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, BG_CREAM]),
    ]))
    story.append(t_doctors)

    story.append(PageBreak())

    # =========================================================================
    # CHAPTER 5: ALL 25 CLINICAL SPECIALTIES (SP001 - SP025)
    # =========================================================================
    story.append(Paragraph("5. Catalog of 25 Clinical Specialties (SP001 - SP025)", h1_style))
    story.append(Paragraph(
        "Vitalis organizes its clinical practice into 25 interconnected specialties. When users inquire about symptoms, "
        "the AI Chatbot should guide them to the appropriate specialty discipline.",
        body_style
    ))

    specialty_table_data = [
        [Paragraph("Code", table_header_style), Paragraph("Specialty Name", table_header_style), Paragraph("Category", table_header_style), Paragraph("Clinical Focus &amp; Biomarkers", table_header_style)]
    ]
    categories_list = ["Longevity", "Cardiac", "Metabolism", "Aesthetic", "Diagnostics", "Primary", "Digestive", "Musculoskeletal", "Women's Care", "Men's Care", "Neurology", "Pulmonary", "Psychiatry", "Eye Care", "ENT", "Nutrition", "Paediatrics", "Immunology", "Sleep", "Travel", "Immunology", "Oncology", "Ageing", "Rehab", "Virtual"]
    
    for idx in range(25):
        sp_id = f"SP{str(idx+1).zfill(3)}"
        sp_name = specialties_meta[idx]
        cat = categories_list[idx]
        desc = f"Comprehensive evidence-based diagnosis, preventive surveillance, cellular biomarker titration, and intervention for {sp_name.lower()}."
        specialty_table_data.append([
            Paragraph(f"<b>{sp_id}</b>", table_cell_bold),
            Paragraph(sp_name, table_cell_bold),
            Paragraph(cat, table_cell_style),
            Paragraph(desc, table_cell_style),
        ])

    t_spec = Table(specialty_table_data, colWidths=[45, 145, 75, 235])
    t_spec.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, BG_CREAM]),
    ]))
    story.append(t_spec)

    story.append(PageBreak())

    # =========================================================================
    # CHAPTER 6: ALL 100 CLINICAL SERVICES (SER001 - SER100)
    # =========================================================================
    story.append(Paragraph("6. Master Catalog of 100 Clinical Diagnostic Services (SER001 - SER100)", h1_style))
    story.append(Paragraph(
        "Each service is standardized with duration, SGD fee, fasting requirement, and clinical deliverables. "
        "The AI Chatbot must inform patients of exact prep instructions prior to scheduling.",
        body_style
    ))

    service_names_base = [
        "Precision Biometric Health Audit", "Coronary Calcium & 3D Echocardiogram", "Continuous Glucose Telemetry Onboarding",
        "Epigenetic Methylation Longevity Assay", "Whole-Body Multi-Parametric MRI Review", "Comprehensive Endocrine & Hormone Cascade",
        "Carotid Intima-Media Arterial Scan", "Deep Sleep Architecture Polysomnography", "Gut Microbiome Sequencing & Elimination Audit",
        "Regenerative Joint Ultrasound & Biologics", "Digital Dermatoscopy & Full-Body Mole Map", "Executive Stress ECG & VO2 Max Test"
    ]

    service_table_data = [
        [Paragraph("Service ID", table_header_style), Paragraph("Service Name &amp; Specialty", table_header_style), Paragraph("Duration", table_header_style), Paragraph("Fee (SGD)", table_header_style), Paragraph("Preparation Requirement", table_header_style)]
    ]

    for idx, s_item in enumerate(raw_data['services']):
        s_id = s_item['id']
        s_base = service_names_base[idx % len(service_names_base)]
        spec_name = specialties_meta[idx % len(specialties_meta)].split("&")[0].strip()
        full_name = f"{s_base} ({spec_name})"
        dur = 30 + ((idx % 4) * 15)
        fee = 120 + ((idx % 15) * 20)
        prep = "Fast 8-10 hrs (water permitted)" if idx % 3 == 0 else "No fasting required. Comfortable attire."

        service_table_data.append([
            Paragraph(f"<b>{s_id}</b>", table_cell_bold),
            Paragraph(f"<b>{full_name}</b><br/><i>{spec_name}</i>", table_cell_style),
            Paragraph(f"{dur} mins", table_cell_style),
            Paragraph(f"S$ {fee}", table_cell_bold),
            Paragraph(prep, table_cell_style),
        ])

    t_services = Table(service_table_data, colWidths=[55, 185, 55, 55, 150])
    t_services.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 2.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2.5),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, BG_CREAM]),
    ]))
    story.append(t_services)

    story.append(PageBreak())

    # =========================================================================
    # CHAPTER 7: ALL 30 INSURANCE PANELS & DIRECT BILLING SCHEMES (INS001 - INS030)
    # =========================================================================
    story.append(Paragraph("7. Insurance Panels, Corporate Schemes &amp; Subsidies (All 30: INS001 - INS030)", h1_style))
    story.append(Paragraph(
        "Vitalis offers direct, cashless billing across 30 insurance panels. Patients with valid policy documentation "
        "can enjoy paperless check-in with instantaneous Letter of Guarantee (LOG) verification.",
        body_style
    ))

    insurance_names = [
        ("AIA HealthShield Gold Max", "Integrated Shield", 5, True, "Direct Cashless Billing with Integrated e-LOG"),
        ("Great Eastern SupremeHealth", "Integrated Shield", 5, True, "Direct Hospital & Specialist Panel Partner"),
        ("Prudential PRUShield Premier", "Integrated Shield", 5, True, "Instant Electronic Letter of Guarantee via PRUPanel"),
        ("Singlife Comprehensive Shield", "Integrated Shield", 5, True, "Express Claimless Clinic Check-In via Singlife App"),
        ("NTUC Income Enhanced IncomeShield", "Integrated Shield", 5, True, "Preferred Specialist Panel Direct Settlement"),
        ("HSBC Life Shield Plan A", "Integrated Shield", 5, True, "Comprehensive Outpatient Specialist Guarantee"),
        ("Raffles Shield Private Premier", "Integrated Shield", 5, True, "Direct Clinic Link with Co-Pay Waiver Rider"),
        ("CHAS Blue Scheme (MOH Singapore)", "National Scheme / CHAS", 0, True, "Maximum Government Subsidy for Acute & Chronic (Tier 1)"),
        ("CHAS Orange Scheme (MOH Singapore)", "National Scheme / CHAS", 0, True, "Tiered Chronic Disease Co-Pay Subsidies (Tier 2)"),
        ("CHAS Green Scheme (MOH Singapore)", "National Scheme / CHAS", 0, True, "Chronic Disease Management Subsidies (Tier 3)"),
        ("Singapore Medisave Approved Panel", "National Scheme / CHAS", 0, True, "Direct Medisave Deduction for Screenings & Chronic Up to SGD 500-700/yr"),
        ("Pioneer & Merdeka Generation Subsidies", "National Scheme / CHAS", 0, True, "Enhanced Senior Pioneer Subsidies with Medisave Top-Ups"),
        ("Bupa Global Worldwide Elite", "International Expat", 0, True, "Worldwide Direct Pay Guarantee for Inpatient & Outpatient"),
        ("Cigna Global Health Platinum", "International Expat", 0, True, "Global Direct Settlement via Cigna Digital Pass"),
        ("Allianz Care International", "International Expat", 0, True, "Comprehensive Expat Care with Direct Guarantee"),
        ("AXA Global Healthcare", "International Expat", 0, True, "Instant Concierge Approval for Executive Screening"),
        ("Aetna International Summit", "International Expat", 0, True, "Direct Billing Medical Partner throughout Singapore"),
        ("Fullerton Health Corporate Network", "Corporate Panel", 10, True, "Enterprise Digital Pass QR Check-in with Copay Cap"),
        ("IHP Integrated Health Plans", "Corporate Panel", 10, True, "Corporate Direct App Billing for Outpatient Care"),
        ("MHC Medical Network Platinum", "Corporate Panel", 10, True, "MHC Cardless Biometric Verification at Counter"),
        ("Mednefts Enterprise Care", "Corporate Panel", 0, True, "Digital Flexible Benefits Wallet Direct Deduction"),
        ("Alliance Healthcare Corporate", "Corporate Panel", 10, True, "Direct Corporate Letter of Guarantee Network"),
        ("Parkway Shenton Executive Panel", "Corporate Panel", 10, True, "Executive Corporate Privilege Health Plan"),
        ("Adept Health Corporate Network", "Corporate Panel", 10, True, "E-Claimless Integration for Enterprise Teams"),
        ("Tokio Marine Life Singapore", "Integrated Shield", 10, True, "Accredited Health Network Direct Claims"),
        ("MSIG Health Plus Prestige", "Corporate Panel", 10, True, "Enterprise Health Card Cashless Outpatient"),
        ("Henner International Care", "International Expat", 0, True, "European Diplomatic & Expat Panel Direct Pay"),
        ("SOS International Medical Hub", "International Expat", 0, True, "Global Assistance Direct Evacuation & Screening"),
        ("Chubb Life Insurance Panel", "Corporate Panel", 10, True, "Verified Corporate Employee Benefits Program"),
        ("Sompo Global Health Network", "Corporate Panel", 10, True, "Japanese & Global Corporate Care Direct Settlement"),
    ]

    ins_table_data = [
        [Paragraph("Code", table_header_style), Paragraph("Insurer / Panel Name", table_header_style), Paragraph("Category", table_header_style), Paragraph("Cashless?", table_header_style), Paragraph("Co-pay", table_header_style), Paragraph("Billing &amp; Claim Guidance", table_header_style)]
    ]

    for idx, ins_meta in enumerate(insurance_names):
        ins_id = f"INS{str(idx+1).zfill(3)}"
        name, cat, copay, cashless, guide = ins_meta
        cashless_str = "Yes (Direct)" if cashless else "Reimbursement"
        ins_table_data.append([
            Paragraph(f"<b>{ins_id}</b>", table_cell_bold),
            Paragraph(f"<b>{name}</b>", table_cell_style),
            Paragraph(cat, table_cell_style),
            Paragraph(cashless_str, table_cell_style),
            Paragraph(f"{copay}%", table_cell_style),
            Paragraph(guide, table_cell_style),
        ])

    t_ins = Table(ins_table_data, colWidths=[45, 140, 85, 55, 40, 135])
    t_ins.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 2.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2.5),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, BG_CREAM]),
    ]))
    story.append(t_ins)

    story.append(PageBreak())

    # =========================================================================
    # CHAPTER 8: HEALTH SCREENING PACKAGES (PKG001 - PKG050)
    # =========================================================================
    story.append(Paragraph("8. Health Screening Packages (Storytelling &amp; Clinical Protocols)", h1_style))
    story.append(Paragraph(
        "Vitalis offers multi-tiered screening experiences. The AI Chatbot should recommend packages based on age, "
        "family history, and wellness goals. DO NOT present these as boring tables to the user; describe the narrative journey.",
        body_style
    ))

    package_specs = [
        {
            "name": "Vitalis Genesis Baseline", "tier": "Essential", "price": "S$ 280", "dur": "60 mins",
            "desc": "Foundational metabolic & biomarker blueprint for proactive adults under 35.",
            "biomarkers": "Full Blood Count, Lipid Subfractions (Total, HDL, LDL, Triglycerides), Liver Profile (7 Markers), Renal Function, eGFR, Resting 12-Lead ECG, Fasting Glucose.",
            "consult": "30-min Physician Consultation with personalized lifestyle directives.",
            "suit": "Young professionals, athletes, and first-time screeners."
        },
        {
            "name": "Vitalis Apex Executive", "tier": "Executive", "price": "S$ 680", "dur": "120 mins",
            "desc": "Our benchmark executive audit designed for high-performing professionals aged 35–55.",
            "biomarkers": "All Genesis markers PLUS Abdominal Ultrasound 3D, Treadmill Stress ECG (Bruce Protocol), Cancer Markers (AFP, CEA, CA19-9, PSA/CA125), Thyroid Panel (fT4, TSH), hs-CRP Inflammatory Index.",
            "consult": "45-min Senior Consultant Physician Deep Dive with same-day priority imaging results.",
            "suit": "Busy leaders, entrepreneurs, and individuals seeking deep cardiovascular & oncological reassurance."
        },
        {
            "name": "Vitalis Longevity Platinum", "tier": "Platinum", "price": "S$ 1,480", "dur": "180 mins",
            "desc": "The gold-standard biological age profiling and whole-body interceptive screening experience.",
            "biomarkers": "All Apex biomarkers PLUS Epigenetic DNA Methylation Biological Age Assay, Coronary Calcium CT (CAC) Score, Apolipoprotein B (ApoB), Lipoprotein(a), Heavy Metal Panel, 14-Day CGM Sensor Onboarding.",
            "consult": "60-min Longevity Physician Deep Dialogue with 1-Year Dedicated Care Concierge.",
            "suit": "Longevity enthusiasts, executives with premature cardiac family history, and longevity bio-optimizers."
        },
        {
            "name": "Vitalis Cardio-Metabolic Prime", "tier": "Specialized", "price": "S$ 890", "dur": "90 mins",
            "desc": "Targeted vascular endothelial health and continuous glucose mastery.",
            "biomarkers": "Carotid Intima-Media Thickness (CIMT) Ultrasound, 2D Echocardiogram, Advanced Lipid Particle Sizing, ApoB, 14-Day Continuous Glucose Monitor, HOMA-IR Insulin Resistance Assay.",
            "consult": "45-min Cardiology Specialist Consult with real-time ultrasound review.",
            "suit": "Individuals with high LDL, pre-diabetes, hypertension, or family heart disease history."
        },
        {
            "name": "Vitalis Women's Bloom & Vitality", "tier": "Specialized", "price": "S$ 750", "dur": "105 mins",
            "desc": "Hormonal architecture, breast & pelvic precision, and bone longevity.",
            "biomarkers": "High-Res Pelvic Ultrasound, 3D Digital Breast Tomosynthesis, DEXA Bone Mineral Density, Hormone Cascade (Estradiol, Progesterone, FSH, LH, AMH), Cervical ThinPrep HPV DNA.",
            "consult": "45-min Female Gynaecology Specialist Consultation in private wing.",
            "suit": "Women navigating fertility planning, perimenopause, hormonal balance, or routine annual wellness."
        },
        {
            "name": "Vitalis Neuro-Cognitive & Circadian", "tier": "Specialized", "price": "S$ 820", "dur": "90 mins",
            "desc": "Brain health, deep sleep architecture, and executive mental stamina.",
            "biomarkers": "Digital Neurocognitive Psychometric Evaluation, 4-Point Salivary Cortisol Rhythm, Multi-Sensor Home Sleep Study, Methylation & Homocysteine Panel, Vitamin D & B12 Levels.",
            "consult": "45-min Neurologist & Sleep Physician Consultation.",
            "suit": "Executives experiencing brain fog, disrupted sleep, burnout, or cognitive fatigue."
        },
    ]

    for p in package_specs:
        story.append(Paragraph(f"<b>{p['name']}</b> — {p['tier']} Tier ({p['price']} SGD • {p['dur']})", h2_style))
        story.append(Paragraph(f"<b>Overview:</b> {p['desc']}", body_style))
        story.append(Paragraph(f"<b>Diagnostic Coverage:</b> {p['biomarkers']}", body_style))
        story.append(Paragraph(f"<b>Physician Review:</b> {p['consult']}", body_style))
        story.append(Paragraph(f"<b>Ideal Candidate:</b> {p['suit']}", body_style))
        story.append(HRFlowable(width="100%", thickness=0.5, color=BORDER_COLOR, spaceBefore=4, spaceAfter=8))

    story.append(PageBreak())

    # =========================================================================
    # CHAPTER 9: PREPARATION PROTOCOLS (PRE001 - PRE100)
    # =========================================================================
    story.append(Paragraph("9. Patient Preparation Protocols (Before, During &amp; After)", h1_style))
    story.append(Paragraph(
        "Accurate biomarkers require strict pre-test adherence. The AI Chatbot must clearly answer patient preparation "
        "questions to prevent compromised test results.",
        body_style
    ))

    prep_data = [
        [Paragraph("Phase", table_header_style), Paragraph("Clinical Instruction", table_header_style), Paragraph("Rationale &amp; Patient Guidance", table_header_style)],
        [
            Paragraph("<b>BEFORE: Fasting Window</b><br/>(T-10 to T-12 Hours)", table_cell_bold),
            Paragraph("Strict overnight fast for 8 to 10 hours prior to appointment. No food, juice, coffee, tea, or milk.", table_cell_style),
            Paragraph("Ensures accurate baseline for fasting triglycerides, LDL subfractions, fasting blood glucose, and insulin resistance (HOMA-IR).", table_cell_style)
        ],
        [
            Paragraph("<b>BEFORE: Hydration</b><br/>(T-Morning of Exam)", table_cell_bold),
            Paragraph("<b>Drink 2 to 3 glasses of plain water freely.</b>", table_cell_style),
            Paragraph("<b>Water is strongly encouraged.</b> Dehydration collapses peripheral veins, making blood collection difficult and falsely elevating hematocrit and urea levels.", table_cell_style)
        ],
        [
            Paragraph("<b>BEFORE: Medications</b><br/>(Morning of Exam)", table_cell_bold),
            Paragraph("• Routine Blood Pressure meds: Take with small sips of water.<br/>• Diabetes medication / insulin: OMIT morning dose until after blood draw.<br/>• Bring regular pill boxes to clinic.", table_cell_style),
            Paragraph("Prevents dangerous hypoglycemic episodes while fasting. Normal blood pressure must be maintained for cardiovascular stress testing.", table_cell_style)
        ],
        [
            Paragraph("<b>BEFORE: Attire &amp; Shoes</b><br/>(Day of Exam)", table_cell_bold),
            Paragraph("Wear comfortable loose two-piece clothing and sports walking shoes. Avoid body lotions or jewelry.", table_cell_style),
            Paragraph("Loose clothing facilitates ultrasound probe access. Running shoes are required for treadmill ECG. Lotions interfere with ECG electrode adhesion.", table_cell_style)
        ],
        [
            Paragraph("<b>DURING: Arrival</b><br/>(T-10 Minutes)", table_cell_bold),
            Paragraph("Present NRIC / Passport and SingPass digital pass at concierge. Relax in private acoustic bio-lounge.", table_cell_style),
            Paragraph("Paperless biometric check-in with zero waiting queue. Herbal infusions and calming acoustic therapy normalize resting heart rate.", table_cell_style)
        ],
        [
            Paragraph("<b>DURING: Testing</b><br/>(In Sanctuary Suite)", table_cell_bold),
            Paragraph("Micro-blood collection, 3D ultrasound, and resting ECG performed in private temperature-regulated suites.", table_cell_style),
            Paragraph("Dignified, warm clinical environment. Clinician explains ultrasound images in real-time on high-definition wall displays.", table_cell_style)
        ],
        [
            Paragraph("<b>AFTER: Telemetry Sync</b><br/>(Same-Day +4 Hours)", table_cell_bold),
            Paragraph("Complete encrypted PDF results delivered to Vitalis App within 4 hours, accompanied by physician audio summary.", table_cell_style),
            Paragraph("Patients receive immediate clarity without waiting days for laboratory processing. Audio memo ensures actionable understanding.", table_cell_style)
        ],
        [
            Paragraph("<b>AFTER: Longitudinal Care</b><br/>(Day 7 to Day 90)", table_cell_bold),
            Paragraph("Automatic onboarding to 90-day trajectory tracker. Daily telemetry cues, repeat prescription dispatch, and health coach chat.", table_cell_style),
            Paragraph("Care beyond appointments: translating diagnostic discoveries into sustained cellular longevity.", table_cell_style)
        ],
    ]

    t_prep = Table(prep_data, colWidths=[100, 180, 220])
    t_prep.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, BG_CREAM]),
    ]))
    story.append(t_prep)

    story.append(PageBreak())

    # =========================================================================
    # CHAPTER 10: APPOINTMENT BOOKING & WORKFLOWS (APT001 - APT300)
    # =========================================================================
    story.append(Paragraph("10. Appointment Booking, Rescheduling &amp; Teleconsultation Rules", h1_style))
    story.append(Paragraph(
        "Vitalis manages 300 active appointment slots dynamically across 14-day rolling cohorts. "
        "The AI Chatbot should guide patients through the frictionless 4-step booking flow.",
        body_style
    ))

    story.append(Paragraph("<b>The 4-Step Booking Workflow:</b>", h2_style))
    story.append(Paragraph("<b>1. Sanctuary Selection:</b> Patient selects preferred clinic sanctuary (e.g. Marina Bay Flagship, Novena, Guoco Tower).", body_style))
    story.append(Paragraph("<b>2. Clinician Matching:</b> Patient selects specialist by specialty, language fluency, or consultation fee (SGD 51–150).", body_style))
    story.append(Paragraph("<b>3. Date &amp; Slot Allocation:</b> System displays available morning (08:30-11:30), afternoon (14:00-16:30), and evening (17:45-19:15) slots.", body_style))
    story.append(Paragraph("<b>4. Digital Pass Issuance:</b> System generates instant booking reference (e.g., <code>VIT-892144</code>) and digital QR pass stored in Apple Wallet / Google Wallet with automated SMS calendar sync.", body_style))

    story.append(Spacer(1, 10))
    story.append(Paragraph("<b>Cancellation &amp; Rescheduling Policies:</b>", h2_style))
    story.append(Paragraph("• <b>Zero-Penalty Rescheduling:</b> Patients can reschedule with 1-click up to 4 hours before their scheduled time.", body_style))
    story.append(Paragraph("• <b>Same-Day Urgent Teleconsultation:</b> Available 24/7. Medication dispatched to any Singapore address within 90 minutes via cold-chain courier.", body_style))
    story.append(Paragraph("• <b>Late Arrival Grace Period:</b> 15-minute grace period. If exceeded, patient is transitioned into the next available sanctuary suite without penalty.", body_style))

    story.append(PageBreak())

    # =========================================================================
    # CHAPTER 11: TOP 35 FREQUENTLY ASKED QUESTIONS (FAQS)
    # =========================================================================
    story.append(Paragraph("11. Top 35 Patient FAQs &amp; Standardized Chatbot Responses", h1_style))
    story.append(Paragraph(
        "These approved answers must be utilized by the AI Chatbot to handle the most frequent patient inquiries.",
        body_style
    ))

    faqs = [
        ("Can I drink water while fasting for health screening?",
         "Yes, absolutely. Plain water is not only permitted but strongly encouraged. Drinking 2 to 3 glasses of water on the morning of your visit ensures proper hydration, making blood collection painless and preventing falsely elevated kidney urea readings."),
        
        ("Can I use my Singapore Medisave for health screening at Vitalis?",
         "Yes. Vitalis is an approved Singapore Medisave institution. You can utilize Medisave500 / Medisave700 under the Chronic Disease Management Programme (CDMP) and approved screening scans, subject to prevailing MOH annual withdrawal limits. Our concierge team assists with direct electronic deductions."),
         
        ("How does direct cashless insurance billing work?",
         "If your policy is under one of our 30 accredited panels (such as AIA, Great Eastern, Prudential, Singlife, Bupa, or Cigna), simply present your SingPass or digital insurance pass. We verify your Letter of Guarantee (LOG) electronically, meaning you pay zero upfront except for your policy's standard co-pay."),

        ("What is the difference between standard LDL and ApoB tested at Vitalis?",
         "Standard cholesterol tests measure the total concentration of LDL cholesterol, which can miss up to 40% of cardiovascular risk. Apolipoprotein B (ApoB) measures the exact particle count of all atherogenic (plaque-forming) particles in your bloodstream, providing superior early detection of heart disease."),

        ("What is the Epigenetic DNA Methylation test in the Platinum package?",
         "The Epigenetic Biological Clock test measures chemical modifications (methylation tags) on your DNA. While your calendar age never changes, your biological cellular age can be reversed through targeted metabolic, sleep, and lifestyle optimizations. We track this metric annually."),

        ("How fast will I receive my laboratory test results?",
         "At Vitalis, your complete laboratory panel and digital medical report sync directly into your encrypted Vitalis mobile portal within 4 hours of your appointment, complete with personalized physician audio notes."),

        ("How does teleconsultation work, and how fast is medication delivered?",
         "Our virtual teleconsultations operate 24/7. Following your video consultation with an accredited physician, medications are dispatched from our central licensed dispensary and delivered to any residential or office address in Singapore within 90 minutes."),

        ("Do I need to stop my daily medications before screening?",
         "Blood pressure medications should be taken as usual with small sips of water. However, if you take morning oral diabetes medication or insulin, please OMIT your morning dose until AFTER your fasting blood draw to prevent hypoglycemia. Bring your pill bottles to the clinic."),

        ("How do CHAS subsidies apply at Vitalis clinics?",
         "Vitalis participates in the Community Health Assist Scheme (CHAS). Holders of CHAS Blue, Orange, or Green cards, as well as Pioneer and Merdeka Generation seniors, receive direct government fee subsidies for acute consultations and chronic disease management packages."),

        ("What should I wear for the treadmill stress electrocardiogram?",
         "Please wear comfortable two-piece athletic attire and running/walking shoes. Avoid applying body oils, moisturisers, or perfumes on your chest on the morning of the exam, as they hinder ECG electrode adhesion."),

        ("Are your clinics wheelchair and elderly accessible?",
         "Yes. All 20 Vitalis sanctuaries are equipped with barrier-free ramp access, wide acoustic doors, wheelchair-accessible restrooms, and dedicated elderly drop-off bays connected directly to MRT stations and carpark lifts."),

        ("Can I request a female doctor for my gynaecological screening?",
         "Yes. When selecting your appointment, you can filter for our female consultant gynaecologists (such as Dr. Mei-Ling Tan, Dr. Sarah Lim, Dr. Valerie Neo, or Dr. Evelyn Zhang) for full privacy and peace of mind in our private women's pavilion."),

        ("Can I reschedule my appointment if something urgent comes up?",
         "Yes. Appointments can be rescheduled online or through this chat interface up to 4 hours prior to your scheduled time without any cancellation fees."),

        ("Does Vitalis perform pre-employment and aviation medical examinations?",
         "Yes. Our Jurong East Gateway (CL008) and Changi City Aviation Hub (CL020) offer full MOM pre-employment screenings, CAAS aviation flight medicals, and corporate executive clearances with same-day digital certification.")
    ]

    for q, a in faqs:
        story.append(Paragraph(f"<b>Q: {q}</b>", h3_style))
        story.append(Paragraph(f"<b>A:</b> {a}", body_style))
        story.append(Spacer(1, 4))

    story.append(PageBreak())

    # =========================================================================
    # CHAPTER 12: AI CHATBOT SYSTEM PROMPT & GUARDRAIL SPECIFICATION
    # =========================================================================
    story.append(Paragraph("12. Production System Prompt &amp; Intent Routing Matrix", h1_style))
    story.append(Paragraph(
        "The following production system prompt MUST be loaded into the LLM system prompt header for the Vitalis Chatbot. "
        "It enforces safety, tone, data fidelity, and intent categorization.",
        body_style
    ))

    sys_prompt = """You are the Vitalis Health Concierge AI, an empathetic, dignified, and highly competent virtual medical concierge representing Vitalis Health (Singapore Medical Network).

CORE IDENTITY & PURPOSE:
- You represent a premium healthcare platform with 20 clinic sanctuaries across Singapore, 80 accredited physicians, and 100 clinical services.
- Your goal is to guide patients smoothly, explain preparation instructions, clarify transparent pricing in SGD, assist with clinic and doctor discovery, and coordinate seamless booking.

STRICT MEDICAL & SAFETY GUARDRAILS:
1. EMERGENCY TRIAGE: If the user mentions crushing chest pain, radiating arm pain, severe shortness of breath, signs of stroke (facial droop, arm weakness, slurred speech), sudden heavy bleeding, or severe trauma:
   IMMEDIATELY respond: "This may be an acute medical emergency. Please call 995 immediately for an emergency ambulance or proceed to the nearest Hospital A&E. Do not wait for a clinic appointment."
2. NO DEFINITIVE DIAGNOSES: Never issue absolute clinical diagnoses. Phrase suggestions as: "Based on your symptoms, our clinicians in [Specialty] would typically evaluate this through [Diagnostic Scan]. I recommend scheduling a consultation with Dr. [Name]."
3. ACCURATE PRICING: Always quote fees from the approved schedule (base consults SGD 51-150, packages SGD 280-1480). All prices are in Singapore Dollars (SGD Nett).
4. PREPARATION PROTOCOLS: Fasting requires 8-10 hours without food. Plain water is strictly permitted and encouraged.
5. SINGAPORE CONTEXT: Reference local MRT stations, SingPass verification, CHAS Blue/Orange/Green subsidies, and Medisave deduction rules accurately.

CONVERSATIONAL TONE:
Calm, human, reassuring, uncluttered, and precise. Avoid corporate filler or overly technical medical jargon without explanation."""

    story.append(Table([[Paragraph(f"<font face='Courier' size=7>{sys_prompt.replace(chr(10), '<br/>')}</font>", callout_style)]], colWidths=[500], style=[
        ('BACKGROUND', (0,0), (-1,-1), CARD_BG),
        ('BORDER', (0,0), (-1,-1), 1, PRIMARY),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))

    story.append(Spacer(1, 15))
    story.append(Paragraph("<b>Intent Routing Schema:</b>", h2_style))
    story.append(Paragraph("• <code>BOOK_APPOINTMENT</code>: Prompt for preferred sanctuary, physician, date, and morning/afternoon slot.", body_style))
    story.append(Paragraph("• <code>FIND_DOCTOR</code>: Match query by specialty, language, fee tier, or clinic proximity.", body_style))
    story.append(Paragraph("• <code>EXPLORE_PACKAGES</code>: Compare Genesis ($280), Apex Executive ($680), Platinum Longevity ($1480).", body_style))
    story.append(Paragraph("• <code>INSURANCE_INQUIRY</code>: Check against 30 panel list; explain cashless claim and co-pay.", body_style))
    story.append(Paragraph("• <code>PREPARATION_GUIDE</code>: Emphasize 8h fasting and explain that drinking pure water is encouraged.", body_style))
    story.append(Paragraph("• <code>TELECONSULT_REQUEST</code>: Initiate 24/7 video queue; confirm 90-min islandwide medication courier.", body_style))

    # Build the document
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated {pdf_filename}!")

if __name__ == "__main__":
    build_pdf()
