import React, { useState } from 'react';
import { Play, Compass, ArrowRight, RotateCw, CheckCircle2 } from 'lucide-react';
import { getSideTickMarks } from '../utils/geometryUtils';

interface HeroSectionProps {
  onStartExplore: () => void;
  onOpenConditions: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartExplore, onOpenConditions }) => {
  const [heroRotated, setHeroRotated] = useState(false);

  return (
    <section className="relative overflow-hidden pt-8 pb-14 md:py-16 border-b border-slate-800/80 bg-gradient-to-b from-[#0b1329] via-[#080d1a] to-[#080d1a]">
      {/* Subtle neon geometry background grid */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #38bdf8 1px, transparent 0)`,
          backgroundSize: '36px 36px'
        }}
        aria-hidden="true"
      />

      {/* Subtle background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/10 via-amber-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headlines & Editorial Presentation */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Clean unboxed metadata */}
            <div className="flex items-center gap-2 text-xs font-medium text-cyan-400 mb-3 tracking-wide">
              <span>คณิตศาสตร์พื้นฐาน ม.2</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>บทที่ 3</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-amber-400">Triangle Congruence (≅)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.2] mb-4 text-balance">
              ความเท่ากันทุกประการ
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-cyan-300">
                ของรูปสามเหลี่ยม
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 mb-6 leading-relaxed max-w-2xl">
              สำรวจความสัมพันธ์ทางเรขาคณิตผ่านห้องทดลองจำลองการเคลื่อนที่แบบแข็ง (Rigid Motion)
              ทดสอบการหมุนและเลื่อนขนานเพื่อทับกันให้สนิท พร้อมเจาะลึก 5 เงื่อนไขสำคัญ
              (ด.ม.ด., ม.ด.ม., ม.ม.ด., ด.ด.ด., ฉ.ด.ด.) และฝึกฝนด้วยโจทย์จริง
            </p>

            {/* Quick Feature Markers (Clean unboxed line) */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-400 mb-8 border-y border-slate-800/80 py-3 w-full max-w-xl">
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="text-cyan-400">●</span>
                <span>จำลองการทับซ้อน 2 มิติ</span>
              </div>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="text-amber-400">●</span>
                <span>5 เงื่อนไขมาตรฐาน</span>
              </div>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="text-emerald-400">●</span>
                <span>แบบทดสอบ 8 ข้อพร้อมเฉลยละเอียด</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <a
                href="#simulator-section"
                onClick={onStartExplore}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-sm transition-all shadow-md shadow-amber-500/10 hover:shadow-amber-500/25 whitespace-nowrap"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>เข้าสู่ห้องทดลองทับซ้อน (3.1)</span>
              </a>

              <a
                href="#conditions-section"
                onClick={onOpenConditions}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 font-medium text-sm transition-colors whitespace-nowrap"
              >
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>ดูเงื่อนไข 5 แบบ (3.2)</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Visual Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-md bg-slate-900/80 rounded-2xl border border-slate-800 p-5 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping opacity-75" />
                  <span className="text-slate-300 font-medium">นิยามการทับกันสนิท (Superposition)</span>
                </div>
                <button
                  onClick={() => setHeroRotated(!heroRotated)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 transition-colors text-xs font-mono"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>{heroRotated ? 'คลี่ออก' : 'หมุนทับซ้อน'}</span>
                </button>
              </div>

              {/* Dynamic SVG Visual Preview */}
              <div className="relative h-64 w-full bg-[#070b16] rounded-xl flex items-center justify-center overflow-hidden border border-slate-800/60">
                <svg
                  viewBox="0 0 340 220"
                  className="w-full h-full select-none"
                >
                  <defs>
                    <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>

                  {/* Target Triangle (Triangle 1: ABC) */}
                  <g className="transition-all duration-700">
                    <polygon
                      points="60,180 200,180 110,50"
                      fill="url(#cyanGrad)"
                      stroke="#38bdf8"
                      strokeWidth="2.5"
                      strokeDasharray="none"
                    />
                    {/* Tick marks on Triangle 1 */}
                    {getSideTickMarks([60, 180], [110, 50], 1, 14, 5).map((l, i) => (
                      <line key={`ab-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
                    ))}
                    {getSideTickMarks([60, 180], [200, 180], 2, 14, 5).map((l, i) => (
                      <line key={`bc-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
                    ))}
                    {getSideTickMarks([200, 180], [110, 50], 3, 14, 5).map((l, i) => (
                      <line key={`ca-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
                    ))}

                    {/* Angle arc at A */}
                    <path d="M 98,68 A 20,20 0 0,0 120,68" fill="none" stroke="#22d3ee" strokeWidth="2" />

                    {/* Labels */}
                    <text x="45" y="195" fill="#94a3b8" fontSize="13" fontWeight="bold">B</text>
                    <text x="210" y="195" fill="#94a3b8" fontSize="13" fontWeight="bold">C</text>
                    <text x="105" y="38" fill="#38bdf8" fontSize="14" fontWeight="bold">A</text>
                  </g>

                  {/* Moving/Rotated Triangle 2 (DEF) */}
                  <g
                    className="transition-all duration-700 ease-in-out origin-center"
                    style={{
                      transform: heroRotated
                        ? 'translate(0px, 0px) rotate(0deg)'
                        : 'translate(95px, -15px) rotate(32deg) scale(0.96)',
                      transformOrigin: '200px 120px',
                    }}
                  >
                    <polygon
                      points="60,180 200,180 110,50"
                      fill={heroRotated ? 'rgba(16, 185, 129, 0.25)' : 'url(#goldGrad)'}
                      stroke={heroRotated ? '#10b981' : '#f59e0b'}
                      strokeWidth={heroRotated ? '3' : '2'}
                      strokeDasharray={heroRotated ? 'none' : '4 3'}
                    />
                    {/* Matching ticks */}
                    {getSideTickMarks([60, 180], [110, 50], 1, 14, 5).map((l, i) => (
                      <line key={`def-ab-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
                    ))}
                    {getSideTickMarks([60, 180], [200, 180], 2, 14, 5).map((l, i) => (
                      <line key={`def-bc-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
                    ))}
                    {getSideTickMarks([200, 180], [110, 50], 3, 14, 5).map((l, i) => (
                      <line key={`def-ca-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
                    ))}

                    {!heroRotated && (
                      <>
                        <text x="40" y="195" fill="#fbbf24" fontSize="12" fontWeight="bold">E</text>
                        <text x="210" y="195" fill="#fbbf24" fontSize="12" fontWeight="bold">F</text>
                        <text x="105" y="38" fill="#fbbf24" fontSize="13" fontWeight="bold">D</text>
                      </>
                    )}
                  </g>
                </svg>

                {/* Overlap Status Badge inside the preview */}
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80 backdrop-blur-sm">
                  <span className="text-slate-400">สถานะการเคลื่อนที่:</span>
                  {heroRotated ? (
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>✨ ทับกันได้สนิทพอดี (△ABC ≅ △DEF)</span>
                    </span>
                  ) : (
                    <span className="text-amber-400 font-medium">ยังไม่ทับกัน (ลองคลิก "หมุนทับซ้อน")</span>
                  )}
                </div>
              </div>

              {/* Explanatory text below canvas */}
              <div className="mt-3 text-xs text-slate-400 flex items-center justify-between">
                <span>สัญลักษณ์: <span className="text-cyan-300 font-mono">≅</span> (Congruent)</span>
                <span className="font-mono text-slate-500">6 องค์ประกอบสมนัยกันสมบูรณ์</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
