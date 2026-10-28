import React, { useState } from 'react';
import {
  Eye,
  Maximize2,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Layers,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const MemoryTricksSection: React.FC = () => {
  // State for AAA Scale slider demonstrator (0.7x to 2.2x)
  const [aaaScale, setAaaScale] = useState<number>(1.5);
  // Optional overlap overlay toggle to visually inspect superposition
  const [showOverlap, setShowOverlap] = useState<boolean>(false);

  const baseLen = 3.0; // cm
  const scaledLen = (baseLen * aaaScale).toFixed(1);
  const isExactFit = Math.abs(aaaScale - 1.0) < 0.05;

  return (
    <section id="pitfalls-section" className="py-14 border-b border-slate-800/80 bg-[#060a15]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2">
            <span>หัวข้อ 3.3</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>ข้อควรระวังในห้องสอบ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex flex-wrap items-center gap-2">
            <span>ม.ม.ม. (AAA) รูปคล้าย ไม่ใช่เท่ากันทุกประการ</span>
          </h2>
          <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
            แม้รูปสามเหลี่ยมสองรูปจะมีขนาดของมุมเท่ากันทุกคู่แบบ <strong>มุม-มุม-มุม (AAA)</strong> แต่ไม่ได้รับประกันว่าจะเท่ากันทุกประการ เพราะเป็นเพียง <strong>"รูปสามเหลี่ยมที่คล้ายกัน" (Similar Triangles ~)</strong> ที่มีรูปร่างเหมือนกัน แต่ขนาดความยาวของด้านสามารถย่อหรือขยายได้
          </p>
        </div>

        {/* Comparison Overview Banners */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/40 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 font-bold text-xs">
              AAA
            </div>
            <div>
              <div className="flex items-center gap-2 font-bold text-sm text-amber-300">
                <span>ม.ม.ม. (AAA) = รูปคล้ายกัน (Similar ~)</span>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                มุมเท่ากัน 3 คู่ (60°, 60°, 60°) การันตีเพียง <strong>"รูปทรงเดียวกัน"</strong> แต่ไม่การันตีขนาด เปรียบเสมือนภาพถ่ายรูปเดิมที่นำมาซูมเข้าหรือซูมออก
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/40 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 font-bold text-xs">
              1 Side
            </div>
            <div>
              <div className="flex items-center gap-2 font-bold text-sm text-cyan-300">
                <span>ต้องมี "ความยาวด้าน" อย่างน้อย 1 ด้านจึงจะเท่ากันทุกประการ (≅)</span>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                เงื่อนไขจริงทั้ง 5 แบบ (ด.ด.ด., ด.ม.ด., ม.ด.ม., ม.ม.ด., ฉ.ด.ด.) จะมี <strong>ความยาวด้านอย่างน้อย 1 ด้านเสมอ</strong> เพื่อล็อกสเกลขนาดให้เท่ากับ 1.0x พอดี
              </p>
            </div>
          </div>
        </div>

        {/* Main Interactive Demonstrator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Visual Simulator (7 cols) */}
          <div className="lg:col-span-7 bg-[#0b1224] rounded-2xl border border-slate-800 p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-amber-400" />
                  <span className="font-bold text-white text-base">
                    ห้องทดลองจำลองการย่อ-ขยาย ม.ม.ม. (AAA)
                  </span>
                </div>
                <span
                  className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg border ${
                    isExactFit
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60'
                      : 'bg-amber-950/80 text-amber-300 border-amber-700/60'
                  }`}
                >
                  {isExactFit ? 'สเกล 1.0x (เท่ากันทุกประการ ≅)' : `สเกล ${aaaScale.toFixed(1)}x (คล้ายกัน ~)`}
                </span>
              </div>

              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                สังเกตสามเหลี่ยมทั้งสองรูป: มุมทั้ง 3 มุมเท่ากันเป๊ะ (60°, 60°, 60°) แต่เมื่อปรับขนาดสเกล รูปที่ 2 จะย่อหรือขยาย ทำให้ไม่สามารถนำไปทับรูปที่ 1 ได้สนิทพอดี (ยกเว้นตอนที่สเกล = 1.0x)
              </p>

              {/* Interactive SVG Canvas */}
              <div className="mt-4 h-72 bg-[#050914] rounded-xl border border-slate-800/80 p-3 relative flex items-center justify-center overflow-hidden select-none">
                <svg viewBox="0 0 360 210" className="w-full h-full">
                  <defs>
                    <linearGradient id="t1Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#0284c7" stopOpacity="0.08" />
                    </linearGradient>
                    <linearGradient id="t2Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#d97706" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines subtle */}
                  <line x1="20" y1="170" x2="340" y2="170" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3" />

                  {/* Triangle 1: Reference Equilateral Triangle (Base 60px, Height ~52px) */}
                  <g transform="translate(60, 170)">
                    {/* Vertices: (0,0), (60,0), (30, -51.96) */}
                    <polygon
                      points="0,0 60,0 30,-51.96"
                      fill="url(#t1Grad)"
                      stroke="#06b6d4"
                      strokeWidth="2.5"
                    />

                    {/* Angle Arcs for Triangle 1 */}
                    {/* Bottom-left angle 60 deg */}
                    <path d="M 12,0 A 12,12 0 0,0 6,-10.39" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
                    {/* Bottom-right angle 60 deg */}
                    <path d="M 48,0 A 12,12 0 0,1 54,-10.39" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
                    {/* Top angle 60 deg */}
                    <path d="M 24,-41.57 A 12,12 0 0,0 36,-41.57" fill="none" stroke="#22d3ee" strokeWidth="1.5" />

                    {/* Angle label */}
                    <text x="30" y="-18" fill="#22d3ee" fontSize="10" textAnchor="middle" fontWeight="bold">
                      60°
                    </text>

                    {/* Labels */}
                    <text x="30" y="16" fill="#38bdf8" fontSize="11" textAnchor="middle" fontWeight="bold">
                      △ABC (ต้นแบบ)
                    </text>
                    <text x="30" y="28" fill="#94a3b8" fontSize="10" textAnchor="middle">
                      ด้าน = {baseLen.toFixed(1)} ซม.
                    </text>
                  </g>

                  {/* Triangle 2: Scaled Triangle or Overlaid Triangle */}
                  {showOverlap ? (
                    // Overlaid at the same position as Triangle 1 (translate 60, 170)
                    <g transform="translate(60, 170)">
                      <polygon
                        points={`0,0 ${60 * aaaScale},0 ${30 * aaaScale},${-51.96 * aaaScale}`}
                        fill="url(#t2Grad)"
                        stroke="#f59e0b"
                        strokeWidth="2.5"
                        strokeDasharray={isExactFit ? 'none' : '4 3'}
                        className="transition-all duration-150"
                      />
                      <text
                        x={30 * aaaScale}
                        y={-51.96 * aaaScale - 8}
                        fill="#fbbf24"
                        fontSize="11"
                        textAnchor="middle"
                        fontWeight="bold"
                      >
                        △DEF ซ้อนทับ ({aaaScale.toFixed(1)}x)
                      </text>
                    </g>
                  ) : (
                    // Displayed side-by-side on the right side
                    <g
                      transform={`translate(${230 - (30 * aaaScale - 30)}, 170)`}
                      className="transition-all duration-150"
                    >
                      <polygon
                        points={`0,0 ${60 * aaaScale},0 ${30 * aaaScale},${-51.96 * aaaScale}`}
                        fill="url(#t2Grad)"
                        stroke="#f59e0b"
                        strokeWidth="2.5"
                      />

                      {/* Angle Arcs for Triangle 2 */}
                      <path
                        d={`M 14,0 A 14,14 0 0,0 7,-12.12`}
                        fill="none"
                        stroke="#fbbf24"
                        strokeWidth="1.5"
                      />
                      <path
                        d={`M ${60 * aaaScale - 14},0 A 14,14 0 0,1 ${60 * aaaScale - 7},-12.12`}
                        fill="none"
                        stroke="#fbbf24"
                        strokeWidth="1.5"
                      />

                      {/* Angle label */}
                      <text
                        x={30 * aaaScale}
                        y={-25 * aaaScale}
                        fill="#fbbf24"
                        fontSize={10}
                        textAnchor="middle"
                        fontWeight="bold"
                      >
                        60°
                      </text>

                      {/* Labels */}
                      <text
                        x={30 * aaaScale}
                        y="16"
                        fill="#fbbf24"
                        fontSize="11"
                        textAnchor="middle"
                        fontWeight="bold"
                      >
                        △DEF (รูปจำลอง)
                      </text>
                      <text
                        x={30 * aaaScale}
                        y="28"
                        fill="#fde68a"
                        fontSize="10"
                        textAnchor="middle"
                      >
                        ด้าน = {scaledLen} ซม.
                      </text>
                    </g>
                  )}
                </svg>

                {/* Floating status badge inside diagram */}
                <div className="absolute top-2.5 right-2.5 bg-slate-900/95 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5 font-mono">
                    <span className="text-slate-300">ขนาดความยาวด้าน:</span>
                    <span className="text-amber-300 font-bold">{scaledLen} ซม.</span>
                    <span className="text-slate-400">({aaaScale.toFixed(1)}x)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <span className="text-slate-400">สถานะ:</span>
                    {isExactFit ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> ทับสนิทพอดี (≅)
                      </span>
                    ) : (
                      <span className="text-rose-400 font-bold flex items-center gap-1">
                        <XCircle className="w-3 h-3" /> ทับไม่สนิท (ขนาดไม่เท่า)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Interactive Scale Slider Controls */}
              <div className="mt-4 p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>ปรับย่อ - ขยายสเกลขนาดของรูปที่ 2:</span>
                  </span>
                  <span className="font-mono text-amber-300 font-bold">
                    {aaaScale.toFixed(1)} เท่า ({scaledLen} ซม.)
                  </span>
                </div>

                <input
                  type="range"
                  min="0.7"
                  max="2.2"
                  step="0.1"
                  value={aaaScale}
                  aria-label="ปรับสเกลขนาดของรูปสามเหลี่ยม"
                  onChange={(e) => setAaaScale(parseFloat(e.target.value))}
                  className="w-full accent-amber-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />

                {/* Quick Presets & Superposition Toggle */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-400 mr-1">ปุ่มลัด:</span>
                    <button
                      onClick={() => setAaaScale(0.8)}
                      className={`py-1 px-2.5 rounded-lg border text-xs font-medium transition-colors ${
                        aaaScale === 0.8
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                          : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border-slate-700'
                      }`}
                    >
                      ย่อ 0.8x
                    </button>
                    <button
                      onClick={() => setAaaScale(1.0)}
                      className={`py-1 px-2.5 rounded-lg border text-xs font-bold transition-colors ${
                        isExactFit
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                          : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border-slate-700'
                      }`}
                    >
                      1.0x (เท่ากันพอดี)
                    </button>
                    <button
                      onClick={() => setAaaScale(1.6)}
                      className={`py-1 px-2.5 rounded-lg border text-xs font-medium transition-colors ${
                        aaaScale === 1.6
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                          : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border-slate-700'
                      }`}
                    >
                      ขยาย 1.6x
                    </button>
                    <button
                      onClick={() => setAaaScale(2.0)}
                      className={`py-1 px-2.5 rounded-lg border text-xs font-medium transition-colors ${
                        aaaScale === 2.0
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                          : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border-slate-700'
                      }`}
                    >
                      ขยาย 2.0x
                    </button>
                  </div>

                  <button
                    onClick={() => setShowOverlap(!showOverlap)}
                    className={`py-1 px-3 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                      showOverlap
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>{showOverlap ? 'แยกดูเทียบข้าง' : 'ลองนำมาซ้อนทับกัน'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom takeaway */}
            <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-300 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>ข้อสรุปสำคัญ:</strong> ทั้ง △ABC และ △DEF มีมุมเท่ากันทุกมุม <strong>60° = 60°</strong> ครบทั้ง 3 คู่ (ม.ม.ม.) แต่ถ้าด้านยาว 3 ซม. กับ 4.5 ซม. นำมาวางซ้อนกันจะไม่ทับสนิท จึงสรุปได้เพียงว่าเป็น <strong>รูปที่คล้ายกัน (Similar)</strong> เท่านั้น ไม่ใช่ความเท่ากันทุกประการ
              </span>
            </div>
          </div>

          {/* Right Column: In-depth Educational Breakdown (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Why AAA Fails Card */}
            <div className="bg-[#0b1224] rounded-2xl border border-slate-800 p-5 shadow-xl">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-xs font-bold text-amber-400">
                <Lightbulb className="w-4 h-4" />
                <span>ทำไม ม.ม.ม. ถึงล็อกรูปทรงได้ แต่ล็อกขนาดไม่ได้?</span>
              </div>

              <div className="mt-4 space-y-3 text-xs text-slate-300 leading-relaxed">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5">มุมเป็นตัวกำหนด "สัดส่วนรูปร่าง":</strong>
                    มุม 3 มุมบอกได้ว่าสามเหลี่ยมมีรูปร่างเพรียว ป้าน หรือสมมาตรแบบไหน เช่น มุม 60°-60°-60° จะเป็นสามเหลี่ยมด้านเท่าเสมอ
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5">แต่ไม่มีข้อมูล "ระยะความยาว":</strong>
                    ไม่มีด้านใดมากำหนดว่าสามเหลี่ยมต้องมีขนาดกว้างยาวกี่เซนติเมตร จึงสามารถขยายเป็นตึกสูง 100 เมตร หรือย่อเป็นเหรียญ 1 ซม. ก็ยังมีมุมเท่าเดิมได้
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5">ต้องล็อกความยาวอย่างน้อย 1 ด้าน:</strong>
                    เมื่อกำหนดให้มีด้านยาวเท่ากัน 1 คู่ (เช่น กลายเป็น ม.ด.ม. หรือ ม.ม.ด.) สเกลจะถูกบังคับเป็น 1.0x ทันที และจะกลายเป็นเท่ากันทุกประการอย่างสมบูรณ์!
                  </div>
                </div>
              </div>
            </div>

            {/* Exam Trap Alert Cheat Sheet */}
            <div className="bg-[#0b1224] rounded-2xl border border-slate-800 p-5 shadow-xl">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-xs font-bold text-cyan-400">
                <Sparkles className="w-4 h-4" />
                <span>สูตรจำตัดช้อยส์ในห้องสอบ ม.2</span>
              </div>

              <div className="mt-3.5 space-y-2 text-xs">
                <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/30 text-rose-200">
                  <span className="font-bold text-rose-300 block mb-1">❌ เจอโจทย์ให้ ม.ม.ม. (AAA):</span>
                  <span>
                    ตอบทันทีว่า <strong>"ไม่เท่ากันทุกประการ"</strong> (เป็นเพียงแค่รูปสามเหลี่ยมที่คล้ายกัน)
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-emerald-200">
                  <span className="font-bold text-emerald-300 block mb-1">✅ เงื่อนไขที่เท่ากันทุกประการจริง:</span>
                  <span>
                    ต้องเป็นหนึ่งใน 5 แบบนี้เท่านั้น: <strong>ด.ด.ด.</strong>, <strong>ด.ม.ด.</strong>, <strong>ม.ด.ม.</strong>, <strong>ม.ม.ด.</strong>, หรือ <strong>ฉ.ด.ด.</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
