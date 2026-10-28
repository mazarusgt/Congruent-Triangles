import React, { useState } from 'react';
import { CongruenceConditionId } from '../types/geometry';
import { getSideTickMarks } from '../utils/geometryUtils';
import { Sliders, CheckCircle2, Triangle, Layers, Sparkles, RefreshCw } from 'lucide-react';

interface ConditionTab {
  id: CongruenceConditionId;
  label: string;
  name: string;
}

const CONDITION_TABS: ConditionTab[] = [
  { id: 'SAS', label: 'ด.ม.ด.', name: 'ด้าน - มุม - ด้าน (SAS)' },
  { id: 'ASA', label: 'ม.ด.ม.', name: 'มุม - ด้าน - มุม (ASA)' },
  { id: 'AAS', label: 'ม.ม.ด.', name: 'มุม - มุม - ด้าน (AAS)' },
  { id: 'SSS', label: 'ด.ด.ด.', name: 'ด้าน - ด้าน - ด้าน (SSS)' },
  { id: 'RHS', label: 'ฉ.ด.ด.', name: 'ฉาก - ด้าน - ด้าน (RHS)' },
];

export const TriangleInspector: React.FC = () => {
  const [selectedCondition, setSelectedCondition] = useState<CongruenceConditionId>('SAS');
  const [showCorrespondingLines, setShowCorrespondingLines] = useState<boolean>(true);

  // SAS parameters
  const [sasSideAB, setSasSideAB] = useState<number>(65);
  const [sasAngleB, setSasAngleB] = useState<number>(55);
  const [sasSideBC, setSasSideBC] = useState<number>(95);

  // ASA parameters
  const [asaAngleB, setAsaAngleB] = useState<number>(55);
  const [asaSideBC, setAsaSideBC] = useState<number>(100);
  const [asaAngleC, setAsaAngleC] = useState<number>(45);

  // AAS parameters
  const [aasAngleB, setAasAngleB] = useState<number>(50);
  const [aasAngleA, setAasAngleA] = useState<number>(65);
  const [aasSideBC, setAasSideBC] = useState<number>(95);

  // SSS parameters
  const [sssSideAB, setSssSideAB] = useState<number>(65);
  const [sssSideBC, setSssSideBC] = useState<number>(100);
  const [sssSideAC, setSssSideAC] = useState<number>(85);

  // RHS parameters (Angle B locked at 90°)
  const [rhsLegBC, setRhsLegBC] = useState<number>(90);
  const [rhsLegAB, setRhsLegAB] = useState<number>(60);

  // Base origin for Triangle 1 (B)
  const bx = 45;
  const by = 135;
  const offsetX = 165;

  // Compute vertices (A, B, C) and (D, E, F) based on current condition
  let ax = 0;
  let ay = 0;
  let cx = 0;
  let cy = 0;
  let displayAngleB = 0;
  let displayAngleC = 0;
  let displayAngleA = 0;
  let lengthAB = 0;
  let lengthBC = 0;
  let lengthAC = 0;

  if (selectedCondition === 'SAS') {
    lengthAB = sasSideAB;
    lengthBC = sasSideBC;
    displayAngleB = sasAngleB;
    const radB = (sasAngleB * Math.PI) / 180;
    ax = bx + lengthAB * Math.cos(radB);
    ay = by - lengthAB * Math.sin(radB);
    cx = bx + lengthBC;
    cy = by;
    lengthAC = Math.round(
      Math.sqrt(lengthAB ** 2 + lengthBC ** 2 - 2 * lengthAB * lengthBC * Math.cos(radB))
    );
    const cosC = Math.max(
      -1,
      Math.min(1, (lengthBC ** 2 + lengthAC ** 2 - lengthAB ** 2) / (2 * lengthBC * lengthAC))
    );
    displayAngleC = Math.round((Math.acos(cosC) * 180) / Math.PI);
    displayAngleA = 180 - displayAngleB - displayAngleC;
  } else if (selectedCondition === 'ASA') {
    lengthBC = asaSideBC;
    displayAngleB = asaAngleB;
    displayAngleC = asaAngleC;
    displayAngleA = 180 - (asaAngleB + asaAngleC);
    const radB = (asaAngleB * Math.PI) / 180;
    const radC = (asaAngleC * Math.PI) / 180;
    const radA = (displayAngleA * Math.PI) / 180;
    // Law of sines: AB / sin(C) = BC / sin(A)
    lengthAB = Math.round((lengthBC * Math.sin(radC)) / Math.sin(radA));
    lengthAC = Math.round((lengthBC * Math.sin(radB)) / Math.sin(radA));
    ax = bx + lengthAB * Math.cos(radB);
    ay = by - lengthAB * Math.sin(radB);
    cx = bx + lengthBC;
    cy = by;
  } else if (selectedCondition === 'AAS') {
    lengthBC = aasSideBC;
    displayAngleB = aasAngleB;
    displayAngleA = aasAngleA;
    displayAngleC = 180 - (aasAngleB + aasAngleA);
    const radB = (aasAngleB * Math.PI) / 180;
    const radC = (displayAngleC * Math.PI) / 180;
    const radA = (aasAngleA * Math.PI) / 180;
    lengthAB = Math.round((lengthBC * Math.sin(radC)) / Math.sin(radA));
    lengthAC = Math.round((lengthBC * Math.sin(radB)) / Math.sin(radA));
    ax = bx + lengthAB * Math.cos(radB);
    ay = by - lengthAB * Math.sin(radB);
    cx = bx + lengthBC;
    cy = by;
  } else if (selectedCondition === 'SSS') {
    lengthAB = sssSideAB;
    lengthBC = sssSideBC;
    lengthAC = sssSideAC;
    // Law of cosines at B: b^2 = a^2 + c^2 - 2ac cos(B)
    const cosB = Math.max(
      -0.95,
      Math.min(0.95, (lengthBC ** 2 + lengthAB ** 2 - lengthAC ** 2) / (2 * lengthBC * lengthAB))
    );
    const radB = Math.acos(cosB);
    displayAngleB = Math.round((radB * 180) / Math.PI);
    ax = bx + lengthAB * Math.cos(radB);
    ay = by - lengthAB * Math.sin(radB);
    cx = bx + lengthBC;
    cy = by;
    const cosC = Math.max(
      -1,
      Math.min(1, (lengthBC ** 2 + lengthAC ** 2 - lengthAB ** 2) / (2 * lengthBC * lengthAC))
    );
    displayAngleC = Math.round((Math.acos(cosC) * 180) / Math.PI);
    displayAngleA = 180 - displayAngleB - displayAngleC;
  } else {
    // RHS
    lengthBC = rhsLegBC;
    lengthAB = rhsLegAB;
    displayAngleB = 90; // Strictly right angle
    lengthAC = Math.round(Math.hypot(lengthBC, lengthAB));
    ax = bx;
    ay = by - lengthAB;
    cx = bx + lengthBC;
    cy = by;
    displayAngleC = Math.round((Math.atan2(lengthAB, lengthBC) * 180) / Math.PI);
    displayAngleA = 90 - displayAngleC;
  }

  // Triangle 2 (DEF) vertices
  const dx = ax + offsetX;
  const dy = ay;
  const ex = bx + offsetX;
  const ey = by;
  const fx = cx + offsetX;
  const fy = cy;

  // Helper to render angle mark (square when 90°, arc otherwise)
  const renderAngleMark = (
    vertex: [number, number],
    pRay1: [number, number],
    pRay2: [number, number],
    angleDeg: number,
    color: string,
    isForced90 = false
  ) => {
    const isRight = isForced90 || Math.abs(angleDeg - 90) < 0.5;
    const [vx, vy] = vertex;
    const d1x = pRay1[0] - vx;
    const d1y = pRay1[1] - vy;
    const len1 = Math.hypot(d1x, d1y) || 1;
    const u1x = d1x / len1;
    const u1y = d1y / len1;

    const d2x = pRay2[0] - vx;
    const d2y = pRay2[1] - vy;
    const len2 = Math.hypot(d2x, d2y) || 1;
    const u2x = d2x / len2;
    const u2y = d2y / len2;

    if (isRight) {
      // 90° Square Right-Angle Symbol
      const s = 14;
      const c1x = vx + s * u1x;
      const c1y = vy + s * u1y;
      const c2x = vx + s * u1x + s * u2x;
      const c2y = vy + s * u1y + s * u2y;
      const c3x = vx + s * u2x;
      const c3y = vy + s * u2y;

      return (
        <g>
          <polygon
            points={`${vx},${vy} ${c1x},${c1y} ${c2x},${c2y} ${c3x},${c3y}`}
            fill="rgba(34, 211, 238, 0.15)"
          />
          <path
            d={`M ${c1x},${c1y} L ${c2x},${c2y} L ${c3x},${c3y}`}
            fill="none"
            stroke={color}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x={c2x + 5}
            y={c2y - 4}
            fill={color}
            fontSize="10"
            fontWeight="bold"
          >
            90° (มุมฉาก)
          </text>
        </g>
      );
    }

    // Curved Arc for acute/obtuse angles
    const r = 18;
    const startX = vx + r * u1x;
    const startY = vy + r * u1y;
    const endX = vx + r * u2x;
    const endY = vy + r * u2y;
    const cross = u1x * u2y - u1y * u2x;
    const sweep = cross > 0 ? 1 : 0;

    const midUx = (u1x + u2x) / (Math.hypot(u1x + u2x, u1y + u2y) || 1);
    const midUy = (u1y + u2y) / (Math.hypot(u1x + u2x, u1y + u2y) || 1);
    const textX = vx + (r + 11) * midUx;
    const textY = vy + (r + 11) * midUy;

    return (
      <g>
        <path
          d={`M ${startX},${startY} A ${r},${r} 0 0,${sweep} ${endX},${endY}`}
          fill="none"
          stroke={color}
          strokeWidth="2"
        />
        <text
          x={textX}
          y={textY}
          fill={color}
          fontSize="10"
          fontWeight="bold"
          textAnchor="middle"
        >
          {Math.round(angleDeg)}°
        </text>
      </g>
    );
  };

  return (
    <section className="py-12 border-b border-slate-800/80 bg-[#070c18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Mode Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-2">
              <span>ห้องทดลองเชิงปฏิบัติ</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>เครื่องมือตรวจสอบการสร้างรูปสามเหลี่ยม (Triangle Inspector)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              ปรับค่าตัวแปร & ตรวจสอบความสมนัยแบบเรียลไทม์
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              เลือกเงื่อนไขทั้ง 5 แบบ แล้วเลื่อนปรับความยาวด้านหรือขนาดมุมของ △ABC
              เพื่อสังเกตว่า △DEF จะเปลี่ยนตามและสมนัยกัน 100% เสมอ
            </p>
          </div>

          {/* Condition toggle for inspector */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl shrink-0 text-xs">
            {CONDITION_TABS.map((cond) => {
              const isActive = selectedCondition === cond.id;
              return (
                <button
                  key={cond.id}
                  onClick={() => setSelectedCondition(cond.id)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                  title={cond.name}
                >
                  <span>{cond.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2 Column Sandbox */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Visual Display Screen (7 cols) */}
          <div className="lg:col-span-7 bg-[#0b1224] rounded-2xl border border-slate-800 p-5 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800 text-xs">
              <span className="text-cyan-400 font-semibold flex items-center gap-1.5">
                <Triangle className="w-3.5 h-3.5 fill-cyan-400/20" />
                <span>
                  จำลองการสร้าง △ABC ≅ △DEF ตามเงื่อนไข{' '}
                  <strong className="text-amber-400 font-bold">
                    {CONDITION_TABS.find((c) => c.id === selectedCondition)?.label}
                  </strong>
                </span>
              </span>
              <button
                onClick={() => setShowCorrespondingLines(!showCorrespondingLines)}
                className="text-slate-400 hover:text-white text-[11px] flex items-center gap-1 transition-colors"
              >
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>{showCorrespondingLines ? 'ซ่อนเส้นเชื่อมสมนัย' : 'แสดงเส้นเชื่อมสมนัย'}</span>
              </button>
            </div>

            <div className="h-64 sm:h-72 w-full bg-[#050914] rounded-xl border border-slate-800/80 flex items-center justify-center p-2 relative overflow-hidden select-none">
              <svg viewBox="0 0 370 175" className="w-full h-full">
                {/* Connecting lines between corresponding vertices */}
                {showCorrespondingLines && (
                  <g opacity="0.35">
                    <line x1={ax} y1={ay} x2={dx} y2={dy} stroke="#06b6d4" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1={bx} y1={by} x2={ex} y2={ey} stroke="#06b6d4" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1={cx} y1={cy} x2={fx} y2={fy} stroke="#06b6d4" strokeWidth="1" strokeDasharray="3 3" />
                  </g>
                )}

                {/* Base ground line */}
                <line x1="20" y1="135" x2="350" y2="135" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

                {/* ------------------- TRIANGLE 1: ABC ------------------- */}
                <polygon
                  points={`${bx},${by} ${cx},${cy} ${ax},${ay}`}
                  fill="rgba(6, 182, 212, 0.15)"
                  stroke="#06b6d4"
                  strokeWidth="2.5"
                />

                {/* Vertex Dots & Labels */}
                <circle cx={ax} cy={ay} r="3.5" fill="#38bdf8" />
                <circle cx={bx} cy={by} r="3.5" fill="#38bdf8" />
                <circle cx={cx} cy={cy} r="3.5" fill="#38bdf8" />
                <text x={ax - 5} y={ay - 8} fill="#38bdf8" fontSize="12" fontWeight="bold">A</text>
                <text x={bx - 14} y={by + 6} fill="#38bdf8" fontSize="12" fontWeight="bold">B</text>
                <text x={cx + 6} y={cy + 6} fill="#38bdf8" fontSize="12" fontWeight="bold">C</text>

                {/* ------------------- TRIANGLE 2: DEF ------------------- */}
                <polygon
                  points={`${ex},${ey} ${fx},${fy} ${dx},${dy}`}
                  fill="rgba(245, 158, 11, 0.15)"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                />

                <circle cx={dx} cy={dy} r="3.5" fill="#fbbf24" />
                <circle cx={ex} cy={ey} r="3.5" fill="#fbbf24" />
                <circle cx={fx} cy={fy} r="3.5" fill="#fbbf24" />
                <text x={dx - 5} y={dy - 8} fill="#fbbf24" fontSize="12" fontWeight="bold">D</text>
                <text x={ex - 14} y={ey + 6} fill="#fbbf24" fontSize="12" fontWeight="bold">E</text>
                <text x={fx + 6} y={fy + 6} fill="#fbbf24" fontSize="12" fontWeight="bold">F</text>

                {/* ------------------- MARKS BASED ON CONDITION ------------------- */}
                {/* 1. SAS (Side AB, Angle B, Side BC) */}
                {selectedCondition === 'SAS' && (
                  <g>
                    {/* Tick mark on AB & DE (1 tick) */}
                    {getSideTickMarks([bx, by], [ax, ay], 1).map((l, i) => (
                      <line key={`sas-ab-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
                    ))}
                    {getSideTickMarks([ex, ey], [dx, dy], 1).map((l, i) => (
                      <line key={`sas-de-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
                    ))}

                    {/* Angle mark at ∠B & ∠E (Square if 90°, arc otherwise) */}
                    {renderAngleMark([bx, by], [cx, cy], [ax, ay], displayAngleB, '#22d3ee')}
                    {renderAngleMark([ex, ey], [fx, fy], [dx, dy], displayAngleB, '#fbbf24')}

                    {/* Tick mark on BC & EF (2 ticks) */}
                    {getSideTickMarks([bx, by], [cx, cy], 2).map((l, i) => (
                      <line key={`sas-bc-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
                    ))}
                    {getSideTickMarks([ex, ey], [fx, fy], 2).map((l, i) => (
                      <line key={`sas-ef-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
                    ))}
                  </g>
                )}

                {/* 2. ASA (Angle B, Side BC, Angle C) */}
                {selectedCondition === 'ASA' && (
                  <g>
                    {/* Angle B & E */}
                    {renderAngleMark([bx, by], [cx, cy], [ax, ay], displayAngleB, '#22d3ee')}
                    {renderAngleMark([ex, ey], [fx, fy], [dx, dy], displayAngleB, '#fbbf24')}

                    {/* Included Side BC & EF (1 tick) */}
                    {getSideTickMarks([bx, by], [cx, cy], 1).map((l, i) => (
                      <line key={`asa-bc-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
                    ))}
                    {getSideTickMarks([ex, ey], [fx, fy], 1).map((l, i) => (
                      <line key={`asa-ef-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
                    ))}

                    {/* Angle C & F */}
                    {renderAngleMark([cx, cy], [bx, by], [ax, ay], displayAngleC, '#38bdf8')}
                    {renderAngleMark([fx, fy], [ex, ey], [dx, dy], displayAngleC, '#f59e0b')}
                  </g>
                )}

                {/* 3. AAS (Angle B, Angle A, Side BC) */}
                {selectedCondition === 'AAS' && (
                  <g>
                    {/* Angle B & E */}
                    {renderAngleMark([bx, by], [cx, cy], [ax, ay], displayAngleB, '#22d3ee')}
                    {renderAngleMark([ex, ey], [fx, fy], [dx, dy], displayAngleB, '#fbbf24')}

                    {/* Angle A & D */}
                    {renderAngleMark([ax, ay], [bx, by], [cx, cy], displayAngleA, '#38bdf8')}
                    {renderAngleMark([dx, dy], [ex, ey], [fx, fy], displayAngleA, '#f59e0b')}

                    {/* Side BC & EF (1 tick) */}
                    {getSideTickMarks([bx, by], [cx, cy], 1).map((l, i) => (
                      <line key={`aas-bc-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
                    ))}
                    {getSideTickMarks([ex, ey], [fx, fy], 1).map((l, i) => (
                      <line key={`aas-ef-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
                    ))}
                  </g>
                )}

                {/* 4. SSS (Side AB, Side BC, Side AC) */}
                {selectedCondition === 'SSS' && (
                  <g>
                    {/* Side AB & DE (1 tick) */}
                    {getSideTickMarks([bx, by], [ax, ay], 1).map((l, i) => (
                      <line key={`sss-ab-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
                    ))}
                    {getSideTickMarks([ex, ey], [dx, dy], 1).map((l, i) => (
                      <line key={`sss-de-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
                    ))}

                    {/* Side BC & EF (2 ticks) */}
                    {getSideTickMarks([bx, by], [cx, cy], 2).map((l, i) => (
                      <line key={`sss-bc-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
                    ))}
                    {getSideTickMarks([ex, ey], [fx, fy], 2).map((l, i) => (
                      <line key={`sss-ef-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
                    ))}

                    {/* Side AC & DF (3 ticks) */}
                    {getSideTickMarks([ax, ay], [cx, cy], 3).map((l, i) => (
                      <line key={`sss-ac-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
                    ))}
                    {getSideTickMarks([dx, dy], [fx, fy], 3).map((l, i) => (
                      <line key={`sss-df-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
                    ))}
                  </g>
                )}

                {/* 5. RHS (Right angle at B, Leg BC, Hypotenuse AC) */}
                {selectedCondition === 'RHS' && (
                  <g>
                    {/* Right Angle Square at B & E */}
                    {renderAngleMark([bx, by], [cx, cy], [ax, ay], 90, '#22d3ee', true)}
                    {renderAngleMark([ex, ey], [fx, fy], [dx, dy], 90, '#fbbf24', true)}

                    {/* Leg BC & EF (1 tick) */}
                    {getSideTickMarks([bx, by], [cx, cy], 1).map((l, i) => (
                      <line key={`rhs-bc-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
                    ))}
                    {getSideTickMarks([ex, ey], [fx, fy], 1).map((l, i) => (
                      <line key={`rhs-ef-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
                    ))}

                    {/* Hypotenuse AC & DF (2 ticks) */}
                    {getSideTickMarks([ax, ay], [cx, cy], 2).map((l, i) => (
                      <line key={`rhs-ac-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
                    ))}
                    {getSideTickMarks([dx, dy], [fx, fy], 2).map((l, i) => (
                      <line key={`rhs-df-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
                    ))}
                  </g>
                )}
              </svg>

              {/* Live Measurements Floating Badge */}
              <div className="absolute bottom-2 left-3 right-3 flex flex-wrap items-center justify-between text-xs px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80 backdrop-blur-sm gap-2">
                <span className="text-slate-300 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>△ABC ≅ △DEF (สมนัยกัน 100%)</span>
                </span>
                <div className="flex items-center gap-3 font-mono text-[11px]">
                  <span className="text-cyan-300">
                    ด้าน AB = {lengthAB} | BC = {lengthBC} | AC = {lengthAC}
                  </span>
                  <span className="text-amber-300">
                    มุม B = {displayAngleB}°
                    {displayAngleB === 90 ? ' (มุมฉาก ⏹)' : ''}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Controls Deck (5 cols) */}
          <div className="lg:col-span-5 bg-[#0b1224] rounded-2xl border border-slate-800 p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-semibold text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-amber-400" />
                  <span>ปรับแต่งตัวแปรของเงื่อนไข</span>
                </div>
                <span className="text-amber-400 font-mono font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                  {CONDITION_TABS.find((c) => c.id === selectedCondition)?.name}
                </span>
              </div>

              {/* Dynamic Controls based on selectedCondition */}
              <div className="mt-4 space-y-4 text-xs">
                {/* 1. SAS SLIDERS */}
                {selectedCondition === 'SAS' && (
                  <>
                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>ความยาวด้าน AB (DE):</span>
                        <span className="font-mono text-cyan-300 font-bold">{sasSideAB} px</span>
                      </div>
                      <input
                        type="range"
                        min="45"
                        max="90"
                        value={sasSideAB}
                        aria-label="ความยาวด้าน AB"
                        onChange={(e) => setSasSideAB(Number(e.target.value))}
                        className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>มุมในระหว่างด้าน ∠B (∠E):</span>
                        <span className="font-mono text-emerald-300 font-bold">
                          {sasAngleB}° {sasAngleB === 90 ? '⏹ (มุมฉาก)' : ''}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="30"
                        max="120"
                        value={sasAngleB}
                        aria-label="มุมในระหว่างด้าน B"
                        onChange={(e) => setSasAngleB(Number(e.target.value))}
                        className="w-full accent-emerald-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                      />
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[10px] text-slate-400">
                          {sasAngleB === 90 ? '✨ สัญลักษณ์เปลี่ยนเป็นสี่เหลี่ยมมุมฉากแล้ว' : 'ลากไปที่ 90° เพื่อดูสัญลักษณ์สี่เหลี่ยม'}
                        </span>
                        <button
                          onClick={() => setSasAngleB(90)}
                          className="text-[10px] text-cyan-300 hover:text-cyan-200 underline"
                        >
                          ตั้งเป็น 90° (มุมฉาก)
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>ความยาวด้าน BC (EF):</span>
                        <span className="font-mono text-amber-300 font-bold">{sasSideBC} px</span>
                      </div>
                      <input
                        type="range"
                        min="60"
                        max="130"
                        value={sasSideBC}
                        aria-label="ความยาวด้าน BC"
                        onChange={(e) => setSasSideBC(Number(e.target.value))}
                        className="w-full accent-amber-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                      />
                    </div>
                  </>
                )}

                {/* 2. ASA SLIDERS */}
                {selectedCondition === 'ASA' && (
                  <>
                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>มุมที่ 1: ∠B (∠E):</span>
                        <span className="font-mono text-cyan-300 font-bold">
                          {asaAngleB}° {asaAngleB === 90 ? '⏹ (มุมฉาก)' : ''}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="30"
                        max="95"
                        value={asaAngleB}
                        aria-label="มุม B"
                        onChange={(e) => setAsaAngleB(Number(e.target.value))}
                        className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-end mt-0.5">
                        <button
                          onClick={() => setAsaAngleB(90)}
                          className="text-[10px] text-cyan-300 hover:text-cyan-200 underline"
                        >
                          ตั้งเป็น 90° (มุมฉาก)
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>ด้านแขนร่วม BC (EF):</span>
                        <span className="font-mono text-amber-300 font-bold">{asaSideBC} px</span>
                      </div>
                      <input
                        type="range"
                        min="70"
                        max="130"
                        value={asaSideBC}
                        aria-label="ด้านแขนร่วม BC"
                        onChange={(e) => setAsaSideBC(Number(e.target.value))}
                        className="w-full accent-amber-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>มุมที่ 2: ∠C (∠F):</span>
                        <span className="font-mono text-emerald-300 font-bold">{asaAngleC}°</span>
                      </div>
                      <input
                        type="range"
                        min="25"
                        max="80"
                        value={asaAngleC}
                        aria-label="มุม C"
                        onChange={(e) => setAsaAngleC(Number(e.target.value))}
                        className="w-full accent-emerald-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                      />
                    </div>
                  </>
                )}

                {/* 3. AAS SLIDERS */}
                {selectedCondition === 'AAS' && (
                  <>
                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>มุมคู่ที่ 1: ∠B (∠E):</span>
                        <span className="font-mono text-cyan-300 font-bold">
                          {aasAngleB}° {aasAngleB === 90 ? '⏹ (มุมฉาก)' : ''}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="30"
                        max="90"
                        value={aasAngleB}
                        aria-label="มุม B"
                        onChange={(e) => setAasAngleB(Number(e.target.value))}
                        className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>มุมคู่ที่ 2: ∠A (∠D):</span>
                        <span className="font-mono text-emerald-300 font-bold">{aasAngleA}°</span>
                      </div>
                      <input
                        type="range"
                        min="30"
                        max="90"
                        value={aasAngleA}
                        aria-label="มุม A"
                        onChange={(e) => setAasAngleA(Number(e.target.value))}
                        className="w-full accent-emerald-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>ด้านตรงข้ามมุม ∠A (ด้าน BC / EF):</span>
                        <span className="font-mono text-amber-300 font-bold">{aasSideBC} px</span>
                      </div>
                      <input
                        type="range"
                        min="60"
                        max="130"
                        value={aasSideBC}
                        aria-label="ด้าน BC"
                        onChange={(e) => setAasSideBC(Number(e.target.value))}
                        className="w-full accent-amber-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                      />
                    </div>
                  </>
                )}

                {/* 4. SSS SLIDERS */}
                {selectedCondition === 'SSS' && (
                  <>
                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>ด้านคู่ที่ 1: AB (DE):</span>
                        <span className="font-mono text-cyan-300 font-bold">{sssSideAB} px</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="90"
                        value={sssSideAB}
                        aria-label="ด้าน AB"
                        onChange={(e) => setSssSideAB(Number(e.target.value))}
                        className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>ด้านคู่ที่ 2: BC (EF):</span>
                        <span className="font-mono text-amber-300 font-bold">{sssSideBC} px</span>
                      </div>
                      <input
                        type="range"
                        min="70"
                        max="130"
                        value={sssSideBC}
                        aria-label="ด้าน BC"
                        onChange={(e) => setSssSideBC(Number(e.target.value))}
                        className="w-full accent-amber-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>ด้านคู่ที่ 3: AC (DF):</span>
                        <span className="font-mono text-emerald-300 font-bold">{sssSideAC} px</span>
                      </div>
                      <input
                        type="range"
                        min="60"
                        max="120"
                        value={sssSideAC}
                        aria-label="ด้าน AC"
                        onChange={(e) => setSssSideAC(Number(e.target.value))}
                        className="w-full accent-emerald-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                      />
                    </div>
                  </>
                )}

                {/* 5. RHS SLIDERS */}
                {selectedCondition === 'RHS' && (
                  <>
                    <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/40 text-[11px] text-cyan-200">
                      <strong>มุมฉากถูกล็อกที่ 90°:</strong> แสดงสัญลักษณ์สี่เหลี่ยมมุมฉาก (⏹) ที่จุด B และ E ตายตัวตามนิยามรูปสามเหลี่ยมมุมฉาก
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>ด้านประกอบมุมฉาก BC (EF):</span>
                        <span className="font-mono text-cyan-300 font-bold">{rhsLegBC} px</span>
                      </div>
                      <input
                        type="range"
                        min="60"
                        max="125"
                        value={rhsLegBC}
                        aria-label="ด้านประกอบมุมฉาก BC"
                        onChange={(e) => setRhsLegBC(Number(e.target.value))}
                        className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>ด้านประกอบมุมฉาก AB (DE):</span>
                        <span className="font-mono text-amber-300 font-bold">{rhsLegAB} px</span>
                      </div>
                      <input
                        type="range"
                        min="40"
                        max="90"
                        value={rhsLegAB}
                        aria-label="ด้านประกอบมุมฉาก AB"
                        onChange={(e) => setRhsLegAB(Number(e.target.value))}
                        className="w-full accent-amber-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] flex justify-between items-center text-slate-300">
                      <span>ด้านตรงข้ามมุมฉาก AC (DF) จากพีทาโกรัส:</span>
                      <span className="font-mono text-emerald-400 font-bold">
                        {lengthAC} px
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Quick Math Takeaway */}
            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-1.5">
              <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>หลักการความเท่ากันทุกประการของ {selectedCondition}:</span>
              </div>
              <p className="leading-relaxed">
                {selectedCondition === 'SAS' &&
                  'เมื่อล็อกความยาวด้าน 2 ด้านและมุมในระหว่างด้าน (ด.ม.ด.) ปลายแขนด้านที่เหลือจะถูกตรึงตำแหน่งไว้ตายตัว ทำให้ด้านที่ 3 และมุมอีก 2 มุมต้องเท่ากันโดยอัตโนมัติ!'}
                {selectedCondition === 'ASA' &&
                  'เมื่อล็อกมุมที่ปลายฐานทั้งสองและระยะทางของแขนร่วม (ม.ด.ม.) รังสีของมุมทั้งสองจะพุ่งไปตัดกันได้เพียงจุดเดียวพอดี จึงสร้างสามเหลี่ยมได้เพียงแบบเดียวเท่านั้น!'}
                {selectedCondition === 'AAS' &&
                  'ผลรวมมุมภายในคือ 180° เสมอ ทำให้มุมที่สามเท่ากันโดยอัตโนมัติ และด้าน 1 ด้านที่กำหนดจะช่วยล็อกขนาดสเกลรูปให้เท่ากันทุกประการ (แปลงเป็น ม.ด.ม. ได้เสมอ)'}
                {selectedCondition === 'SSS' &&
                  'ความยาวด้านทั้งสามทำหน้าที่เป็นโครงสร้างแข็ง (Rigid Frame) เมื่อด้านเท่ากันทั้งสามด้าน มุมทั้งสามมุมจะถูกบังคับให้เท่ากันตามทฤษฎีบทโคไซน์ทันที!'}
                {selectedCondition === 'RHS' &&
                  'ในรูปสามเหลี่ยมมุมฉาก (มุม 90° แสดงเป็นรูปสี่เหลี่ยม) ทฤษฎีบทพีทาโกรัส a² + b² = c² จะคำนวณด้านที่สามให้เท่ากันโดยอัตโนมัติ จึงรับประกันความเท่ากันทุกประการ 100%!'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
