import AboutSection from "@/components/home/AboutSection";
import CapabilitySection from "@/components/home/CapabilitySection";
import ContactSection from "@/components/home/ContactSection";
import HeroSection from "@/components/home/HeroSection";
import ProjectsSection from "@/components/home/ProjectsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <CapabilitySection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
