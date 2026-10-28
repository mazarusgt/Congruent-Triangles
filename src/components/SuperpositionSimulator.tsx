import React, { useState, useEffect } from 'react';
import { SimulatorShapeType } from '../types/geometry';
import {
  RotateCw,
  Move,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sliders,
  Sparkles,
} from 'lucide-react';

export const SuperpositionSimulator: React.FC = () => {
  const [shapeType, setShapeType] = useState<SimulatorShapeType>('arrows');
  
  // Transform states for the moving shape
  // Initial default offset and angle per shape
  const getInitialState = (type: SimulatorShapeType) => {
    switch (type) {
      case 'arrows':
        return { x: 130, y: -20, angle: 90 };
      case 'drops':
        return { x: 110, y: 35, angle: -65 };
      case 'triangles':
        return { x: 120, y: -30, angle: 60 };
      case 'non_congruent':
        return { x: 100, y: -20, angle: 45 };
    }
  };

  const initial = getInitialState(shapeType);
  const [posX, setPosX] = useState(initial.x);
  const [posY, setPosY] = useState(initial.y);
  const [angle, setAngle] = useState(initial.angle);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState<0 | 1 | 2>(0); // 0: initial, 1: rotated, 2: translated (overlapped)

  // Reset when shape changes
  useEffect(() => {
    const init = getInitialState(shapeType);
    setPosX(init.x);
    setPosY(init.y);
    setAngle(init.angle);
    setCurrentStep(0);
    setIsAnimating(false);
  }, [shapeType]);

  // Compute metrics
  const distance = Math.round(Math.sqrt(posX * posX + posY * posY));
  // normalized angle diff to closest multiple of 360
  const normalizedAngle = Math.abs(((angle % 360) + 360) % 360);
  const angleDiff = Math.round(Math.min(normalizedAngle, 360 - normalizedAngle));
  
  // Is it congruent shape or non-congruent?
  const isTrulyCongruent = shapeType !== 'non_congruent';
  const isPositionMatched = distance <= 5 && angleDiff <= 4;
  const isPerfectOverlap = isTrulyCongruent && isPositionMatched;

  // Overlap percentage calculation
  const rawOverlap = Math.max(0, 100 - (distance * 0.55 + angleDiff * 0.45));
  const overlapPct = isTrulyCongruent
    ? isPerfectOverlap
      ? 100
      : Math.min(96, Math.round(rawOverlap))
    : isPositionMatched
    ? 68 // non congruent can never reach 100%
    : Math.min(65, Math.round(rawOverlap));

  // Step 1: Rotate
  const handleStep1Rotate = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setAngle(0);
    setCurrentStep(1);
    setTimeout(() => setIsAnimating(false), 450);
  };

  // Step 2: Translate / Slide into target
  const handleStep2Translate = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPosX(0);
    setPosY(0);
    setCurrentStep(2);
    setTimeout(() => setIsAnimating(false), 450);
  };

  // Auto playback: Step 1 then Step 2
  const handleAutoPlay = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    // 1st rotate
    setAngle(0);
    setCurrentStep(1);
    setTimeout(() => {
      // 2nd slide
      setPosX(0);
      setPosY(0);
      setCurrentStep(2);
      setTimeout(() => setIsAnimating(false), 500);
    }, 600);
  };

  // Reset
  const handleReset = () => {
    const init = getInitialState(shapeType);
    setPosX(init.x);
    setPosY(init.y);
    setAngle(init.angle);
    setCurrentStep(0);
  };

  // Render SVG Paths
  const renderShapePath = (isTarget: boolean) => {
    switch (shapeType) {
      case 'arrows':
        // Modern chevron arrow
        return (
          <path
            d="M -35,-35 L 15,-35 L 35,0 L 15,35 L -35,35 L -15,0 Z"
            fill={isTarget ? 'rgba(6, 182, 212, 0.15)' : 'rgba(245, 158, 11, 0.25)'}
            stroke={isTarget ? '#06b6d4' : '#f59e0b'}
            strokeWidth={isTarget ? 2.5 : 2}
            strokeDasharray={isTarget ? 'none' : isPerfectOverlap ? 'none' : '4 3'}
          />
        );
      case 'drops':
        // Organic teardrop / leaf
        return (
          <path
            d="M 0,-45 C 30,-20 40,20 0,45 C -40,20 -30,-20 0,-45 Z"
            fill={isTarget ? 'rgba(6, 182, 212, 0.15)' : 'rgba(245, 158, 11, 0.25)'}
            stroke={isTarget ? '#06b6d4' : '#f59e0b'}
            strokeWidth={isTarget ? 2.5 : 2}
            strokeDasharray={isTarget ? 'none' : isPerfectOverlap ? 'none' : '4 3'}
          />
        );
      case 'triangles':
        // Scalene Triangle
        return (
          <g>
            <polygon
              points="-45,35 45,35 15,-40"
              fill={isTarget ? 'rgba(6, 182, 212, 0.15)' : 'rgba(245, 158, 11, 0.25)'}
              stroke={isTarget ? '#06b6d4' : '#f59e0b'}
              strokeWidth={isTarget ? 2.5 : 2}
              strokeDasharray={isTarget ? 'none' : isPerfectOverlap ? 'none' : '4 3'}
            />
            {/* Vertex points */}
            <circle cx="-45" cy="35" r="3" fill={isTarget ? '#06b6d4' : '#f59e0b'} />
            <circle cx="45" cy="35" r="3" fill={isTarget ? '#06b6d4' : '#f59e0b'} />
            <circle cx="15" cy="-40" r="3" fill={isTarget ? '#06b6d4' : '#f59e0b'} />
            {isTarget ? (
              <>
                <text x="-58" y="45" fill="#38bdf8" fontSize="12" fontWeight="bold">B</text>
                <text x="50" y="45" fill="#38bdf8" fontSize="12" fontWeight="bold">C</text>
                <text x="18" y="-45" fill="#38bdf8" fontSize="12" fontWeight="bold">A</text>
              </>
            ) : (
              <>
                <text x="-58" y="45" fill="#fbbf24" fontSize="11" fontWeight="bold">E</text>
                <text x="50" y="45" fill="#fbbf24" fontSize="11" fontWeight="bold">F</text>
                <text x="18" y="-45" fill="#fbbf24" fontSize="11" fontWeight="bold">D</text>
              </>
            )}
          </g>
        );
      case 'non_congruent':
        // Different shapes: Target is triangle, Moving is a sheared triangle of different dimensions!
        if (isTarget) {
          return (
            <polygon
              points="-50,35 50,35 0,-40"
              fill="rgba(6, 182, 212, 0.15)"
              stroke="#06b6d4"
              strokeWidth="2.5"
            />
          );
        } else {
          return (
            <polygon
              points="-35,35 55,35 25,-25"
              fill="rgba(244, 63, 94, 0.2)"
              stroke="#f43f5e"
              strokeWidth="2"
              strokeDasharray="4 3"
            />
          );
        }
    }
  };

  return (
    <section id="simulator-section" className="py-14 border-b border-slate-800/80 bg-[#060a15]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-2">
              <span>หัวข้อ 3.1</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>ห้องทดลองจำลองการเคลื่อนที่แบบแข็ง (Isometry & Rigidity)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              แบบจำลองการซ้อนทับ 2 มิติ (2D Superposition Simulator)
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              ทดสอบนิยามความเท่ากันทุกประการ: รูป A และ B จะเท่ากันทุกประการ ก็ต่อเมื่อ
              สามารถเคลื่อนที่รูปหนึ่งไปทับอีกรูปหนึ่งได้ <strong className="text-amber-400">สนิทพอดี</strong>
              โดยใช้การหมุน (Rotate) และการเลื่อนขนาน (Translate)
            </p>
          </div>

          {/* Shape Selector Segmented Control */}
          <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl shrink-0">
            <button
              onClick={() => setShapeType('arrows')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                shapeType === 'arrows'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ลูกศร (Arrow Pairs)
            </button>
            <button
              onClick={() => setShapeType('drops')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                shapeType === 'drops'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ทรงหยดน้ำ (Drop Pairs)
            </button>
            <button
              onClick={() => setShapeType('triangles')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                shapeType === 'triangles'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              รูปสามเหลี่ยม (△ABC ≅ △DEF)
            </button>
            <button
              onClick={() => setShapeType('non_congruent')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                shapeType === 'non_congruent'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              รูปที่ไม่เท่ากัน (เปรียบเทียบ)
            </button>
          </div>
        </div>

        {/* 2-Zone Simulation Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Zone: Visual Simulation Canvas (7 cols) */}
          <div className="lg:col-span-7 bg-[#0b1224] rounded-2xl border border-slate-800 p-5 shadow-2xl relative flex flex-col">
            {/* Canvas Header & Legend */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-cyan-300 font-medium">
                  <span className="w-2.5 h-2.5 rounded-sm bg-cyan-500/40 border border-cyan-400 inline-block" />
                  <span>รูปต้นแบบ A (เป้าหมาย)</span>
                </span>
                <span className="flex items-center gap-1.5 text-amber-300 font-medium">
                  <span className="w-2.5 h-2.5 rounded-sm bg-amber-500/40 border border-amber-400 inline-block" />
                  <span>รูป B (กำลังเคลื่อนที่)</span>
                </span>
              </div>
              <div className="text-slate-400 font-mono">
                {isPositionMatched ? (
                  isTrulyCongruent ? (
                    <span className="text-emerald-400 font-bold">Δ = 0 (ตรงกัน)</span>
                  ) : (
                    <span className="text-rose-400 font-bold">ไม่ตรงกัน</span>
                  )
                ) : (
                  <span>
                    Δd: {distance}px · Δθ: {angleDiff}°
                  </span>
                )}
              </div>
            </div>

            {/* Interactive Stage Canvas */}
            <div className="relative h-80 sm:h-96 w-full bg-[#050914] rounded-xl border border-slate-800/80 overflow-hidden flex items-center justify-center select-none">
              {/* Subtle Cartesian Blueprint Grid */}
              <div
                className="absolute inset-0 opacity-[0.08] pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)`,
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Origin Crosshairs */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-px bg-slate-800/60" />
                <div className="h-full w-px bg-slate-800/60 absolute" />
              </div>

              {/* Main SVG Container */}
              <svg viewBox="-160 -120 320 240" className="w-full h-full overflow-visible">
                {/* 1. Target Shape (Center at 0, 0) */}
                <g className="transition-all duration-300">
                  {renderShapePath(true)}
                </g>

                {/* 2. Moving Shape */}
                <g
                  className="transition-transform duration-300 ease-out cursor-grab active:cursor-grabbing"
                  style={{
                    transform: `translate(${posX}px, ${posY}px) rotate(${angle}deg)`,
                  }}
                >
                  {renderShapePath(false)}
                </g>

                {/* Connector displacement line when not overlapped */}
                {!isPositionMatched && (
                  <line
                    x1="0"
                    y1="0"
                    x2={posX}
                    y2={posY}
                    stroke="#f59e0b"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                    opacity="0.6"
                  />
                )}
              </svg>

              {/* Overlay Celebration Banner */}
              {isPerfectOverlap && (
                <div className="absolute inset-x-6 top-6 p-3 rounded-xl bg-emerald-950/90 border border-emerald-500/80 shadow-2xl backdrop-blur-md flex items-center justify-between text-emerald-200 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <Sparkles className="w-4 h-4 fill-emerald-400" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-1.5">
                        <span>✨ ทับกันได้สนิทพอดี! (Congruent)</span>
                      </div>
                      <div className="text-xs text-emerald-300">
                        รูป A ≅ รูป B (รูปร่างและขนาดเท่ากันทุกประการ 100%)
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-xs px-2.5 py-1 rounded bg-emerald-900/60 border border-emerald-700/60 text-emerald-200">
                    MATCH: 100%
                  </span>
                </div>
              )}

              {/* Non-congruent Warning Banner */}
              {shapeType === 'non_congruent' && isPositionMatched && (
                <div className="absolute inset-x-6 top-6 p-3 rounded-xl bg-rose-950/90 border border-rose-500/80 shadow-2xl backdrop-blur-md flex items-center justify-between text-rose-200">
                  <div className="flex items-center gap-2.5">
                    <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    <div>
                      <div className="text-sm font-bold text-white">
                        ⚠️ ไม่สามารถทับกันได้สนิท! (Not Congruent)
                      </div>
                      <div className="text-xs text-rose-300">
                        แม้จัดตำแหน่งและมุมตรงกัน แต่ขนาดขอบและพื้นที่ต่างกัน จึงไม่เท่ากันทุกประการ
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-rose-900/60 text-rose-300">
                    {overlapPct}% MAX
                  </span>
                </div>
              )}
            </div>

            {/* Overlap Progress Gauge */}
            <div className="mt-4 p-3 bg-slate-900/70 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-400">ระดับความทับสนิท (Superposition Match)</span>
                <span className="font-mono font-bold text-cyan-400">{overlapPct}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    isPerfectOverlap
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-400'
                      : shapeType === 'non_congruent'
                      ? 'bg-rose-500'
                      : 'bg-gradient-to-r from-amber-500 to-cyan-400'
                  }`}
                  style={{ width: `${overlapPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right Zone: Control Deck & Steps (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Guided Step-by-Step Controller */}
            <div className="bg-[#0b1224] rounded-2xl border border-slate-800 p-5 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-semibold text-cyan-400">
                <span>ลำดับขั้นตอนการพิสูจน์ (2-Step Animation)</span>
                <span className="text-slate-500">Rigid Motion</span>
              </div>

              <div className="mt-4 space-y-3">
                {/* Step 1 Button */}
                <button
                  onClick={handleStep1Rotate}
                  disabled={isAnimating}
                  className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                    currentStep >= 1
                      ? 'bg-cyan-950/30 border-cyan-500/60 text-cyan-200'
                      : 'bg-slate-900/80 border-slate-700/60 hover:bg-slate-850 hover:border-slate-600 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-bold text-xs">
                      1
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <RotateCw className="w-3.5 h-3.5 text-cyan-400" />
                        <span>หมุนปรับทิศทาง (Step 1: Rotate)</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        หมุนรอบจุดศูนย์กลางให้มีมุมตรงกับรูปเป้าหมาย (θ = 0°)
                      </div>
                    </div>
                  </div>
                  {currentStep >= 1 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <span className="text-[11px] text-cyan-400 font-mono">กดหมุน</span>
                  )}
                </button>

                {/* Step 2 Button */}
                <button
                  onClick={handleStep2Translate}
                  disabled={isAnimating}
                  className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                    currentStep === 2
                      ? 'bg-amber-950/30 border-amber-500/60 text-amber-200'
                      : 'bg-slate-900/80 border-slate-700/60 hover:bg-slate-850 hover:border-slate-600 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-bold text-xs">
                      2
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Move className="w-3.5 h-3.5 text-amber-400" />
                        <span>เลื่อนขนานเข้าทับ (Step 2: Translate)</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        เลื่อนตำแหน่ง (dx, dy) ไปยังพิกัด (0, 0) เพื่อซ้อนทับ
                      </div>
                    </div>
                  </div>
                  {currentStep === 2 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <span className="text-[11px] text-amber-400 font-mono">กดเลื่อน</span>
                  )}
                </button>
              </div>

              {/* Automation & Reset Row */}
              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center gap-2">
                <button
                  onClick={handleAutoPlay}
                  disabled={isAnimating}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs transition-all shadow-md shadow-amber-500/10"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                  <span>เล่นลำดับอัตโนมัติ (Auto Superpose)</span>
                </button>

                <button
                  onClick={handleReset}
                  className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="รีเซ็ตตำแหน่งเริ่มต้น"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Manual Precision Sliders Deck */}
            <div className="bg-[#0b1224] rounded-2xl border border-slate-800 p-5 shadow-xl">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-semibold text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  <span>แถบปรับตำแหน่งด้วยตนเอง (Manual Sliders)</span>
                </div>
                <span className="text-slate-500 font-mono">พิกัดสัมพัทธ์</span>
              </div>

              <div className="mt-3.5 space-y-3.5 text-xs">
                {/* Angle Slider */}
                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>การหมุน (Rotation Angle θ)</span>
                    <span className="font-mono text-cyan-300 font-semibold">{angle}°</span>
                  </div>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    value={angle}
                    onChange={(e) => setAngle(Number(e.target.value))}
                    className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Translate X Slider */}
                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>เลื่อนแกน X (Translate X)</span>
                    <span className="font-mono text-amber-300 font-semibold">{posX} px</span>
                  </div>
                  <input
                    type="range"
                    min="-150"
                    max="150"
                    value={posX}
                    onChange={(e) => setPosX(Number(e.target.value))}
                    className="w-full accent-amber-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Translate Y Slider */}
                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>เลื่อนแกน Y (Translate Y)</span>
                    <span className="font-mono text-amber-300 font-semibold">{posY} px</span>
                  </div>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    value={posY}
                    onChange={(e) => setPosY(Number(e.target.value))}
                    className="w-full accent-amber-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Explanatory takeaway */}
              <div className="mt-4 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80 flex items-start gap-2 text-[11px] text-slate-400">
                <HelpCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  การเคลื่อนที่แบบแข็ง (Rigid Motion) ไม่ทำให้ขนาดหรือรูปร่างเปลี่ยนไป
                  ถ้ารูปทรงเท่ากันทุกประการ จะต้องมีมุมและพิกัดที่เลื่อนไปทับได้สนิทพอดีเสมอ
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
