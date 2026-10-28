import React from 'react';
import { Triangle, BookOpen, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenGlossary: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenGlossary }) => {
  return (
    <footer className="border-t border-slate-800 bg-[#050813] text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Editorial Description */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2.5 text-white font-bold text-base mb-1">
            <div className="w-6 h-6 rounded bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Triangle className="w-3.5 h-3.5 fill-cyan-400/20" />
            </div>
            <span>เรขาคณิต ม.2 · ความเท่ากันทุกประการ (Triangle Congruence)</span>
          </div>
          <p className="text-xs text-slate-500 max-w-md">
            สื่อการเรียนรู้เชิงโต้ตอบสำหรับนักเรียนชั้นมัธยมศึกษาปีที่ 2 สาระการเรียนรู้คณิตศาสตร์พื้นฐาน
          </p>
        </div>

        {/* Navigation & Glossary Action */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-400">
          <a href="#mindmap-section" className="hover:text-cyan-400 transition-colors">
            แผนผังบทเรียน
          </a>
          <a href="#simulator-section" className="hover:text-cyan-400 transition-colors">
            ห้องทดลองทับซ้อน
          </a>
          <a href="#conditions-section" className="hover:text-cyan-400 transition-colors">
            เงื่อนไข 5 แบบ
          </a>
          <a href="#pitfalls-section" className="hover:text-cyan-400 transition-colors">
            กลเม็ด & กับดัก
          </a>
          <a href="#quiz-section" className="hover:text-cyan-400 transition-colors">
            แบบทดสอบ
          </a>
          <button
            onClick={onOpenGlossary}
            className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
          >
            พจนานุกรมคำศัพท์
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
        <div>
          เนื้อหาตรงตามหลักสูตรแกนกลางการศึกษาขั้นพื้นฐาน (กลุ่มสาระการเรียนรู้คณิตศาสตร์)
        </div>
        <div className="flex items-center gap-2">
          <span>สัญลักษณ์ทางเรขาคณิต: ≅ (เท่ากันทุกประการ)</span>
          <span aria-hidden="true">·</span>
          <span>~ (คล้ายกัน)</span>
        </div>
      </div>
    </footer>
  );
};
