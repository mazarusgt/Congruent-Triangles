import React, { useState } from 'react';
import { BookOpen, Menu, X, Triangle, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenGlossary: () => void;
  onJumpToQuiz: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenGlossary, onJumpToQuiz }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#080d1a]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-amber-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Triangle className="w-4 h-4 fill-cyan-400/20 stroke-cyan-400 stroke-2" />
          </div>
          <span className="font-semibold text-slate-100">เรขาคณิต ม.2</span>
          <span className="text-slate-600">·</span>
          <span className="text-amber-400 font-medium text-sm sm:text-base">ความเท่ากันทุกประการ</span>
        </a>

        {/* Zone 2: Navigation Links (Clean single-line text links) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a
            href="#mindmap-section"
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            แผนผังบทเรียน
          </a>
          <a
            href="#simulator-section"
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            ห้องทดลองทับซ้อน (3.1)
          </a>
          <a
            href="#conditions-section"
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            เงื่อนไข 5 แบบ (3.2)
          </a>
          <a
            href="#pitfalls-section"
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            ม.ม.ม. รูปคล้าย (3.3)
          </a>
          <a
            href="#quiz-section"
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
          >
            แบบทดสอบ
          </a>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenGlossary}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
            title="เปิดพจนานุกรมคำศัพท์เรขาคณิต"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>คำศัพท์สำคัญ</span>
          </button>

          <button
            onClick={onJumpToQuiz}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-sm hover:shadow-amber-500/20 transition-all whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
            <span>ทำแบบทดสอบ</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 focus:outline-none"
            aria-label="เมนูหลัก"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-slate-800 flex flex-col gap-2 pb-2 text-sm">
          <a
            href="#mindmap-section"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-md"
          >
            แผนผังบทเรียน
          </a>
          <a
            href="#simulator-section"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-md"
          >
            ห้องทดลองทับซ้อน (Sec 3.1)
          </a>
          <a
            href="#conditions-section"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-md"
          >
            เงื่อนไขความเท่ากัน 5 แบบ (Sec 3.2)
          </a>
          <a
            href="#pitfalls-section"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-md"
          >
            ม.ม.ม. รูปคล้าย ไม่ใช่เท่ากันทุกประการ (3.3)
          </a>
          <a
            href="#quiz-section"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-md"
          >
            แบบทดสอบประเมินตนเอง
          </a>
          <div className="pt-2 border-t border-slate-800/60 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenGlossary();
              }}
              className="flex-1 py-2 text-center text-xs font-medium text-slate-300 bg-slate-800 rounded-lg"
            >
              พจนานุกรมคำศัพท์
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
