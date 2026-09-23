import AboutSection from "./components/homepage/about";
import Achievements from "./components/homepage/achievements";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Highlights from "./components/homepage/highlights";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Highlights />
      <Projects />
      <Skills />
      <Experience />
      <Achievements />
      <AboutSection />
      <Education />
      <ContactSection />
    </>
  );
}
