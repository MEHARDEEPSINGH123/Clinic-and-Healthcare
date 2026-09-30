"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Stethoscope,
  Sparkles,
  CalendarCheck,
  ShieldCheck,
  Layers,
  MapPin,
  BookOpen,
  ArrowUp,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "journey", label: "Health Journey", icon: Compass, href: "#journey" },
  { id: "doctors", label: "Doctors Spotlight", icon: Stethoscope, href: "#doctors" },
  { id: "services", label: "Care Ecosystem", icon: Sparkles, href: "#services" },
  { id: "appointments", label: "Appointment Center", icon: CalendarCheck, href: "#appointments" },
  { id: "insurance", label: "Insurance & Panels", icon: ShieldCheck, href: "#insurance" },
  { id: "packages", label: "Health Packages", icon: Layers, href: "#packages" },
  { id: "locations", label: "Sanctuary Locations", icon: MapPin, href: "#locations" },
  { id: "resources", label: "Health Resources", icon: BookOpen, href: "#resources" },
];

export default function FloatingRail({ onOpenBooking }: { onOpenBooking?: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("journey");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          // If near the top, always show
          if (currentScrollY < 120) {
            setIsVisible(true);
          } else {
            // Scrolling down -> hide; Scrolling up -> show
            if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 8) {
              setIsVisible(false);
            } else if (currentScrollY < lastScrollY && lastScrollY - currentScrollY > 8) {
              setIsVisible(true);
            }
          }
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }

      // Detect active section
      const sections = NAV_ITEMS.map((item) => item.id);
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 350 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop Centered Left Floating Rail */}
      <div className="fixed left-6 md:left-8 top-1/2 -translate-y-1/2 z-50 hidden sm:flex flex-col items-center pointer-events-none">
        <AnimatePresence>
          {isVisible && (
            <motion.nav
              aria-label="Vitalis Navigation Rail"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="pointer-events-auto flex flex-col items-center"
            >
              {/* Unified Vertical Glass Rail */}
              <div className="glass-panel rounded-full p-1.5 py-2.5 flex flex-col gap-1 items-center shadow-glass border border-white/70">
                {/* Brand Monogram Pill at Top of Rail */}
                <button
                  onClick={scrollToTop}
                  title="Vitalis Health - Return to top"
                  className="w-7 h-7 rounded-full bg-primary text-highlight flex items-center justify-center font-heading font-bold text-xs shadow-sm hover:scale-105 transition-transform mb-0.5"
                >
                  V
                </button>

              <div className="w-4 h-px bg-border/80 my-0.5" />

              {/* Navigation Items */}
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                const isHovered = hoveredItem === item.id;

                return (
                  <div key={item.id} className="relative flex items-center">
                    <a
                      href={item.href}
                      onClick={(e) => scrollToSection(e, item.href)}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                        isActive
                          ? "bg-primary text-white shadow-md scale-105"
                          : "text-primary/70 hover:text-primary hover:bg-black/5"
                      }`}
                      aria-label={item.label}
                    >
                      <Icon className="w-3.5 h-3.5 transition-transform duration-200" />

                      {/* Small Active Indicator Dot */}
                      {isActive && (
                        <span className="absolute -right-0.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-secondary ring-2 ring-white" />
                      )}
                    </a>

                    {/* Tooltip on Hover */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, x: 8, scale: 0.95 }}
                          animate={{ opacity: 1, x: 12, scale: 1 }}
                          exit={{ opacity: 0, x: 8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-full px-2.5 py-1 rounded-xl bg-primary text-white text-[11px] font-medium whitespace-nowrap shadow-float pointer-events-none z-50 flex items-center gap-1.5 ml-1"
                        >
                          <span>{item.label}</span>
                          <span className="w-1 h-1 rounded-full bg-highlight" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <div className="w-4 h-px bg-border/80 my-0.5" />

              {/* Scroll to Top */}
              <button
                onClick={scrollToTop}
                title="Return to top"
                className="w-7 h-7 rounded-full flex items-center justify-center text-primary/50 hover:text-primary hover:bg-black/5 transition-all text-xs"
              >
                <ArrowUp className="w-3 h-3" />
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      </div>

      {/* Mobile Floating Bottom Bar for smaller screens */}
      <div className="sm:hidden fixed bottom-4 left-4 right-4 z-50 glass-panel rounded-full p-2 px-3 shadow-glass flex items-center justify-between border border-white/70">
        <div className="flex items-center gap-1">
          <span className="w-7 h-7 rounded-full bg-primary text-highlight font-heading font-bold text-xs flex items-center justify-center">
            V
          </span>
          <span className="text-xs font-semibold tracking-tight text-primary font-heading pl-1">
            Vitalis
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#journey"
            className="text-xs font-medium px-3 py-1.5 rounded-full bg-primary/5 text-primary"
          >
            Journey
          </a>
          <a
            href="#doctors"
            className="text-xs font-medium px-3 py-1.5 rounded-full bg-primary/5 text-primary"
          >
            Doctors
          </a>
          <button
            onClick={onOpenBooking}
            className="text-xs font-medium px-3.5 py-1.5 rounded-full bg-secondary text-white font-heading font-semibold shadow-sm"
          >
            Book
          </button>
        </div>
      </div>
    </>
  );
}
