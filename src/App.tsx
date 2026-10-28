import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MindMapSection } from './components/MindMapSection';
import { SuperpositionSimulator } from './components/SuperpositionSimulator';
import { ConditionsSection } from './components/ConditionsSection';
import { TriangleInspector } from './components/TriangleInspector';
import { MemoryTricksSection } from './components/MemoryTricksSection';
import { QuizSection } from './components/QuizSection';
import { GlossaryModal } from './components/GlossaryModal';
import { Footer } from './components/Footer';

export default function App() {
  const [glossaryOpen, setGlossaryOpen] = useState(false);

  const handleStartExplore = () => {
    const el = document.getElementById('simulator-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenConditions = () => {
    const el = document.getElementById('conditions-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleJumpToQuiz = () => {
    const el = document.getElementById('quiz-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Bar Contract Navigation */}
      <Navbar
        onOpenGlossary={() => setGlossaryOpen(true)}
        onJumpToQuiz={handleJumpToQuiz}
      />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          onStartExplore={handleStartExplore}
          onOpenConditions={handleOpenConditions}
        />

        {/* 2. Interactive Mind Map (Chapter Architecture Tree) */}
        <MindMapSection />

        {/* 3. 2D Superposition & Rigidity Simulator (Sec 3.1) */}
        <SuperpositionSimulator />

        {/* 4. 5 Triangle Congruence Condition Cards (Sec 3.2) */}
        <ConditionsSection />

        {/* 5. Interactive Triangle Inspector Sandbox */}
        <TriangleInspector />

        {/* 6. Memory Tricks & Pitfalls Demonstrators (SSA & AAA) */}
        <MemoryTricksSection />

        {/* 7. Interactive Practice Quiz */}
        <QuizSection />
      </main>

      {/* Footer */}
      <Footer onOpenGlossary={() => setGlossaryOpen(true)} />

      {/* Quick Reference Glossary Modal */}
      <GlossaryModal
        isOpen={glossaryOpen}
        onClose={() => setGlossaryOpen(false)}
      />
    </div>
  );
}
