import type { Metadata } from "next";
import { Inter, Space_Grotesk, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vitalis Health | Care Beyond Appointments",
  description:
    "A premium healthcare experience platform. Singapore's leading network for preventive longevity, executive health screening, and compassionate continuous medicine.",
  keywords: [
    "Vitalis Health",
    "Singapore Healthcare",
    "Executive Health Screening",
    "Preventive Medicine",
    "Longevity Health",
    "Apple Health Experience",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${cormorant.variable}`}
    >
      <body className="bg-background text-primary min-h-screen selection:bg-secondary selection:text-white">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
