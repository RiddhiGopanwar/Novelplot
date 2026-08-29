import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Nunito, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SparkleField from "@/components/SparkleField";
import ToastHost from "@/components/ToastHost";
import Marquee from "@/components/Marquee";
import { AuthProvider } from "@/lib/AuthContext";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "600", "700", "800"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "The Novel Plot",
  description: "A cozy personal reading companion.",
};
export const dynamic = "force-dynamic";
export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${nunito.variable} ${spaceMono.variable} font-body bg-cream text-plum antialiased`}
      >
        <AuthProvider>
          <SparkleField />
          <Navbar />
          <Marquee />
          <main className="relative mx-auto max-w-6xl px-5 pb-24 pt-8 sm:px-8">
            {children}
          </main>
          <ToastHost />
        </AuthProvider>
      </body>
    </html>
  );
}
