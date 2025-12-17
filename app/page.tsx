import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Process } from "@/components/Process";
import { CaseStudies } from "@/components/CaseStudies";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Process />
      <CaseStudies />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}
