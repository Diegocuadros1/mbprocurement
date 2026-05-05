import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Process } from "@/components/Process";
import { CaseStudies } from "@/components/CaseStudies";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) redirect("/dashboard");
  return (
    <>
      <Hero />
      <Features />
      <Process />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}
