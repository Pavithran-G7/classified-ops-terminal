import { useState } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import EntranceAnimation from '@/components/EntranceAnimation';
import SystemProfile from '@/components/SystemProfile';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  const [entranceDone, setEntranceDone] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {!entranceDone && <EntranceAnimation onComplete={() => setEntranceDone(true)} />}
      <Navigation />
      <HeroSection skipBoot={entranceDone} />
      <SystemProfile />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </div>
  );
};

export default Index;
