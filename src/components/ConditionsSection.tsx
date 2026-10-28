import React, { useState } from 'react';
import { CONGRUENCE_CONDITIONS } from '../data/congruenceData';
import { CongruenceCondition, CongruenceConditionId } from '../types/geometry';
import { getSideTickMarks } from '../utils/geometryUtils';
import {
  Sparkles,
  Layers,
  RotateCw,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const ConditionsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'sides' | 'angles'>('all');
  const [activeOverlayCard, setActiveOverlayCard] = useState<CongruenceConditionId | null>(null);
  const [expandedElements, setExpandedElements] = useState<Record<string, boolean>>({
    SAS: true,
  });

  const filteredConditions = CONGRUENCE_CONDITIONS.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'sides') return item.category === 'sides' || item.id === 'RHS';
    if (filter === 'angles') return item.category === 'angles';
    return true;
  });

  const toggleExpandElements = (id: string) => {
    setExpandedElements((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAnimateCardOverlay = (id: CongruenceConditionId) => {
    if (activeOverlayCard === id) {
      setActiveOverlayCard(null);
    } else {
      setActiveOverlayCard(id);
    }
  };

  return (
    <section id="conditions-section" className="py-14 border-b border-slate-800/80 bg-[#080d1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2">
              <span>หัวข้อ 3.2</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>5 เงื่อนไขความเท่ากันทุกประการของรูปสามเหลี่ยม</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              การตรวจสอบความเท่ากันทุกประการ (Congruence Conditions)
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              รูปสามเหลี่ยมมีองค์ประกอบ 6 ส่วน (ด้าน 3 ด้าน มุม 3 มุม) แต่เราตรวจสอบเพียง 3 ส่วนตามเงื่อนไขที่กำหนด
              ก็สามารถสรุปได้อย่างแม่นยำว่ารูปทั้งสองเท่ากันทุกประการ
            </p>
          </div>

          {/* Interactive Filter Segmented Control */}
          <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl shrink-0">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                filter === 'all'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              แสดงทั้งหมด (5 แบบ)
            </button>
            <button
              onClick={() => setFilter('sides')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                filter === 'sides'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              เน้นด้าน (ด.ด.ด. / ด.ม.ด. / ฉ.ด.ด.)
            </button>
            <button
              onClick={() => setFilter('angles')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                filter === 'angles'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              เน้นมุม (ม.ด.ม. / ม.ม.ด.)
            </button>
          </div>
        </div>

        {/* Legend strip (Color coding) */}
        <div className="mb-8 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-slate-300">รหัสสีสัญลักษณ์ในภาพ:</span>
            <span className="flex items-center gap-1.5 text-amber-300">
              <span className="w-3 h-0.5 bg-amber-400 inline-block" />
              <span>ขีดสีทอง = ด้านที่ยาวเท่ากัน (Side Tick Marks)</span>
            </span>
            <span className="flex items-center gap-1.5 text-cyan-300">
              <span className="w-2.5 h-2.5 rounded-full border border-cyan-400 inline-block" />
              <span>ส่วนโค้งสีฟ้า = มุมที่มีขนาดเท่ากัน (Angle Arcs)</span>
            </span>
          </div>
          <span className="text-slate-500 font-mono">ม.2 เรขาคณิต</span>
        </div>

        {/* 5 Conditions Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConditions.map((condition) => {
            const isOverlaid = activeOverlayCard === condition.id;
            const isExpanded = !!expandedElements[condition.id];

            return (
              <div
                key={condition.id}
                className="bg-[#0b1224] rounded-2xl border border-slate-800 hover:border-slate-700/80 transition-all shadow-xl flex flex-col overflow-hidden"
              >
                {/* Card Top Banner */}
                <div className="p-5 pb-3 border-b border-slate-800/70 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl font-extrabold text-amber-400 font-mono">
                        {condition.thaiAbbr}
                      </span>
                      <span className="text-slate-600 font-mono">|</span>
                      <span className="text-xs font-semibold text-cyan-300">
                        {condition.id}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white">{condition.thaiName}</h3>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">{condition.englishName}</div>
                  </div>

                  <button
                    onClick={() => handleAnimateCardOverlay(condition.id)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      isOverlaid
                        ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-300'
                        : 'bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 text-slate-300'
                    }`}
                    title="จำลองการเคลื่อนที่ทับซ้อนของสามเหลี่ยมคู่นี้"
                  >
                    <RotateCw className={`w-3.5 h-3.5 ${isOverlaid ? 'animate-spin' : ''}`} />
                    <span>{isOverlaid ? 'ทับซ้อนอยู่' : 'จำลองทับ'}</span>
                  </button>
                </div>

                {/* SVG Visual Diagram Area */}
                <div className="relative h-48 bg-[#060a15] border-b border-slate-800/60 flex items-center justify-center p-2 select-none overflow-hidden">
                  <svg viewBox="0 0 330 150" className="w-full h-full">
                    <defs>
                      <linearGradient id={`grad-t1-${condition.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#0284c7" stopOpacity="0.08" />
                      </linearGradient>
                      <linearGradient id={`grad-t2-${condition.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#d97706" stopOpacity="0.08" />
                      </linearGradient>
                    </defs>

                    {/* Triangle 1 (ABC) */}
                    <g>
                      <polygon
                        points={condition.svgData.t1.points}
                        fill={`url(#grad-t1-${condition.id})`}
                        stroke="#06b6d4"
                        strokeWidth="2"
                      />
                      {/* Vertex labels */}
                      {condition.svgData.t1.labels.map((lbl, idx) => (
                        <text
                          key={idx}
                          x={lbl.x}
                          y={lbl.y}
                          fill="#38bdf8"
                          fontSize="12"
                          fontWeight="bold"
                        >
                          {lbl.text}
                        </text>
                      ))}

                      {/* Side tick marks */}
                      {condition.svgData.sideMarks.t1Marks?.map((mark, idx) => {
                        const tickLines = getSideTickMarks(mark.p1, mark.p2, mark.count);
                        return (
                          <g key={`t1-side-${idx}`}>
                            {tickLines.map((line, cIdx) => (
                              <line
                                key={cIdx}
                                x1={line.x1}
                                y1={line.y1}
                                x2={line.x2}
                                y2={line.y2}
                                stroke="#fbbf24"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                              />
                            ))}
                          </g>
                        );
                      })}

                      {/* Angle marks */}
                      {condition.svgData.angleMarks.t1Arcs.map((arc, idx) => {
                        if (arc.isRight) {
                          return (
                            <rect
                              key={`t1-ang-${idx}`}
                              x={arc.cx}
                              y={arc.cy - 12}
                              width="12"
                              height="12"
                              fill="none"
                              stroke="#22d3ee"
                              strokeWidth="1.8"
                            />
                          );
                        }
                        return (
                          <circle
                            key={`t1-ang-${idx}`}
                            cx={arc.cx}
                            cy={arc.cy}
                            r={arc.r}
                            fill="none"
                            stroke="#22d3ee"
                            strokeWidth="1.8"
                            strokeDasharray={arc.count === 2 ? '4 2' : 'none'}
                          />
                        );
                      })}
                    </g>

                    {/* Triangle 2 (DEF) - with animated transform if isOverlaid */}
                    <g
                      className="transition-all duration-700 ease-in-out"
                      style={{
                        transform: isOverlaid
                          ? 'translate(-160px, 0px)'
                          : 'translate(0px, 0px)',
                      }}
                    >
                      <polygon
                        points={condition.svgData.t2.points}
                        fill={isOverlaid ? 'rgba(16, 185, 129, 0.25)' : `url(#grad-t2-${condition.id})`}
                        stroke={isOverlaid ? '#10b981' : '#f59e0b'}
                        strokeWidth="2"
                        strokeDasharray={isOverlaid ? 'none' : 'none'}
                      />
                      {/* Vertex labels */}
                      {!isOverlaid &&
                        condition.svgData.t2.labels.map((lbl, idx) => (
                          <text
                            key={idx}
                            x={lbl.x}
                            y={lbl.y}
                            fill="#fbbf24"
                            fontSize="12"
                            fontWeight="bold"
                          >
                            {lbl.text}
                          </text>
                        ))}

                      {/* Side tick marks */}
                      {condition.svgData.sideMarks.t2Marks?.map((mark, idx) => {
                        const tickLines = getSideTickMarks(mark.p1, mark.p2, mark.count);
                        return (
                          <g key={`t2-side-${idx}`}>
                            {tickLines.map((line, cIdx) => (
                              <line
                                key={cIdx}
                                x1={line.x1}
                                y1={line.y1}
                                x2={line.x2}
                                y2={line.y2}
                                stroke="#fbbf24"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                              />
                            ))}
                          </g>
                        );
                      })}

                      {/* Angle marks */}
                      {condition.svgData.angleMarks.t2Arcs.map((arc, idx) => {
                        if (arc.isRight) {
                          return (
                            <rect
                              key={`t2-ang-${idx}`}
                              x={arc.cx}
                              y={arc.cy - 12}
                              width="12"
                              height="12"
                              fill="none"
                              stroke="#22d3ee"
                              strokeWidth="1.8"
                            />
                          );
                        }
                        return (
                          <circle
                            key={`t2-ang-${idx}`}
                            cx={arc.cx}
                            cy={arc.cy}
                            r={arc.r}
                            fill="none"
                            stroke="#22d3ee"
                            strokeWidth="1.8"
                            strokeDasharray={arc.count === 2 ? '4 2' : 'none'}
                          />
                        );
                      })}
                    </g>
                  </svg>

                  {/* Overlap Status Floating Badge */}
                  {isOverlaid && (
                    <div className="absolute top-2 left-2 right-2 bg-emerald-950/90 border border-emerald-500/70 rounded-lg px-2.5 py-1 text-[11px] text-emerald-200 flex items-center justify-between">
                      <span className="font-semibold">✨ ทับกันได้สนิทพอดี (△ABC ≅ △DEF)</span>
                      <span className="font-mono text-emerald-400">100%</span>
                    </div>
                  )}
                </div>

                {/* Card Content & Criteria */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {condition.summary}
                    </p>

                    {/* Criteria checklist */}
                    <div className="space-y-1.5 mb-4">
                      <div className="text-[11px] font-semibold text-slate-400">องค์ประกอบตามเงื่อนไข:</div>
                      {condition.criteria.map((crit, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{crit}</span>
                        </div>
                      ))}
                    </div>

                    {/* Memory Trick Snippet */}
                    <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200/90 mb-3">
                      <div className="flex items-center gap-1.5 font-semibold text-amber-400 mb-1">
                        <Lightbulb className="w-3.5 h-3.5" />
                        <span>กลเม็ดช่วยจำ:</span>
                      </div>
                      <p className="text-[11px] leading-relaxed">{condition.memoryTrick}</p>
                    </div>
                  </div>

                  {/* Corresponding Elements Toggle Accordion */}
                  <div className="pt-3 border-t border-slate-800">
                    <button
                      onClick={() => toggleExpandElements(condition.id)}
                      className="w-full flex items-center justify-between text-xs text-slate-400 hover:text-cyan-300 py-1"
                    >
                      <span>ส่วนที่สมนัยกัน (Corresponding Parts)</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="mt-2.5 space-y-2 p-2.5 rounded-lg bg-slate-950/50 border border-slate-800 text-[11px]">
                        <div>
                          <span className="font-semibold text-amber-400">ด้านที่สมนัยกัน:</span>
                          <div className="text-slate-300 pl-2">
                            {condition.correspondingElements.sides.map((s, idx) => (
                              <div key={idx}>• {s}</div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="font-semibold text-cyan-400">มุมที่สมนัยกัน:</span>
                          <div className="text-slate-300 pl-2">
                            {condition.correspondingElements.angles.map((a, idx) => (
                              <div key={idx}>• {a}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Memory Tricks & Identification Rule of Thumb Box */}
        <div className="mt-12 bg-[#0b1224] rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Lightbulb className="w-5 h-5 fill-amber-400/20" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">กลเม็ดสังเกตรูป & จุดระวังระดับสอบไล่ (Memory Tricks Box)</h3>
              <p className="text-xs text-slate-400">
                สรุปวิธีแยกแยะเงื่อนไขอย่างถูกต้อง เพื่อไม่ให้เสียคะแนนกับข้อสอบลวง
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-xs">
              <div className="font-bold text-amber-400 mb-1 flex items-center gap-1.5">
                <span>1. ด.ม.ด. (SAS)</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                มุมต้องเป็น <strong className="text-amber-300">"มุมในระหว่างด้าน"</strong> คือจุดที่ด้านคู่ที่เท่ากันมาชนกันพอดี ถ้ามุมหลุดไปอยู่อีกฝั่งจะกลายเป็น ด.ด.ม. ซึ่งใช้ไม่ได้!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-xs">
              <div className="font-bold text-cyan-400 mb-1 flex items-center gap-1.5">
                <span>2. ม.ด.ม. (ASA) vs ม.ม.ด.</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                ม.ด.ม. ด้านต้องเป็น <strong className="text-cyan-300">"แขนร่วม"</strong> ระหว่างสองมุม ส่วน ม.ม.ด. ด้านจะอยู่ตรงข้ามกับมุมใดมุมหนึ่ง ทั้งสองแบบการันตีความเท่ากันทุกประการ
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-xs">
              <div className="font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                <span>3. ฉ.ด.ด. (RHS) ข้อยกเว้น</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                ใช้ได้เฉพาะ <strong className="text-emerald-300">"สามเหลี่ยมมุมฉาก"</strong> เท่านั้น โดยต้องรู้ด้านตรงข้ามมุมฉาก (H) และด้านประกอบมุมฉาก 1 ด้าน (S) พีทาโกรัสจะล็อกด้านที่ 3 ให้เท่ากันเสมอ
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-rose-900/50 text-xs">
              <div className="font-bold text-rose-400 mb-1 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>4. กับดัก SSA & AAA</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                <strong className="text-rose-300">ด.ด.ม. (SSA)</strong> และ <strong className="text-rose-300">ม.ม.ม. (AAA)</strong> <span className="underline">ไม่สามารถ</span> สรุปว่าเท่ากันทุกประการได้ ข้อสอบมักนำมาหลอกบ่อยที่สุด!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
