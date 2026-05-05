import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/Toaster";
import { Analytics } from "@vercel/analytics/next";
import { createClient } from "@/lib/supabase/server";
import { fetchAllCompanies } from "@/lib/companies";
import Sidebar from "@/components/Sidebar";
import { checkFirstLogin } from "@/lib/notifications";

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
        url: "logo.png",
        width: 600,
        height: 450,
        alt: "ProcureWide",
      },
    ],
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoggedIn = !!user;
  let isAdmin = false;
  let companies: { id: string; name: string; pending_orders: number }[] = [];

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role, welcomed_at, username")
      .eq("id", user.id)
      .single();

    isAdmin = profile?.role === "app_admin";

    // First-ever login: send welcome notification (non-blocking)
    if (!isAdmin && profile?.welcomed_at === null) {
      await checkFirstLogin(user.id, profile?.username ?? null);
    }

    if (isAdmin) {
      companies = await fetchAllCompanies().catch(() => []);
    }
  }

  return (
    <html lang="en" style={{ colorScheme: "light" }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {isLoggedIn && <Sidebar isAdmin={isAdmin} companies={companies} />}
        <div className={isLoggedIn ? "ml-60 pt-12" : ""}>{children}</div>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
