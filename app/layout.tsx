import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/Toaster";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ProcureWide",
  description: "Made by Scientists, for Science",
  openGraph: {
    title: "ProcureWide",
    description: "Made by Scientists, for Science",
    url: "https://procurewide.com",
    siteName: "ProcureWide",
    images: [
      {
        url: "FAQ.png",
        width: 600,
        height: 450,
        alt: "ProcureWide",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
