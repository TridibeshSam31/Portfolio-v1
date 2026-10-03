import { TopNav } from "@/components/navigation/TopNav";
import { Console } from "@/components/navigation/Console";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { NeedleDropModal } from "@/components/ui/NeedleDropModal";
import { Hero } from "@/components/hero/Hero";
import { Marquee } from "@/components/ui/Marquee";
import { LinerNotes } from "@/components/about/LinerNotes";
import { Philosophy } from "@/components/about/Philosophy";
import { Projects } from "@/components/projects/Projects";
import { UnderTheHood } from "@/components/systems/UnderTheHood";
import { DSAJourney } from "@/components/systems/DSAJourney";
import { OpenSource } from "@/components/github/OpenSource";
import { PaperTrail } from "@/components/resume/PaperTrail";
import { Contact } from "@/components/contact/Contact";

export const revalidate = 86400;

export default function Home() {
  return (
    <MotionProvider>
      <NeedleDropModal />
      <TopNav />
      <main id="main">
        <Hero />
        <Marquee />
        <LinerNotes />
        <Philosophy />
        <Projects />
        <UnderTheHood />
        <DSAJourney />
        <OpenSource />
        <PaperTrail />
        <Contact />
      </main>
      <Console />
    </MotionProvider>
  );
}
