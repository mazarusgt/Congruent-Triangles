import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/congruenceData';
import { QuizQuestion } from '../types/geometry';
import { getSideTickMarks } from '../utils/geometryUtils';
import {
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowRight,
  RotateCcw,
  Trophy,
  Award,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

export const QuizSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [userAnswersHistory, setUserAnswersHistory] = useState<Record<number, boolean>>({});

  const currentQuestion: QuizQuestion = QUIZ_QUESTIONS[currentIndex];
  const isCorrect = selectedOptionId === currentQuestion.correctOptionId;

  const handleSelectOption = (optionId: string) => {
    if (hasSubmitted && isCorrect) return; // already answered correctly
    setSelectedOptionId(optionId);
    setHasSubmitted(true);

    if (optionId === currentQuestion.correctOptionId) {
      if (!userAnswersHistory[currentQuestion.id]) {
        setScore((prev) => prev + 1);
        setStreak((prev) => prev + 1);
        setUserAnswersHistory((prev) => ({ ...prev, [currentQuestion.id]: true }));
      }
      setShowHint(false);
    } else {
      setStreak(0);
      setShowHint(true);
    }
  };

  const handleRetryCurrent = () => {
    setSelectedOptionId(null);
    setHasSubmitted(false);
    setShowHint(true);
  };

  const handleNextQuestion = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setHasSubmitted(false);
      setShowHint(false);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setHasSubmitted(false);
    setScore(0);
    setStreak(0);
    setShowHint(false);
    setIsQuizCompleted(false);
    setUserAnswersHistory({});
  };

  // Helper to render dynamic SVG for quiz questions
  const renderQuestionDiagram = (type: QuizQuestion['diagramType']) => {
    switch (type) {
      case 'SAS':
        return (
          <svg viewBox="0 0 320 140" className="w-full h-full select-none">
            {/* Triangle 1 (ABC) */}
            <polygon points="30,120 130,120 70,30" fill="rgba(6, 182, 212, 0.15)" stroke="#06b6d4" strokeWidth="2" />
            {getSideTickMarks([30, 120], [70, 30], 1, 14, 5).map((l, i) => (
              <line key={`q1-ab-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
            ))}
            {getSideTickMarks([70, 30], [130, 120], 2, 14, 5).map((l, i) => (
              <line key={`q1-ac-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
            ))}
            <path d="M 60,45 A 20,20 0 0,0 80,45" fill="none" stroke="#22d3ee" strokeWidth="2" />
            <text x="18" y="130" fill="#94a3b8" fontSize="12" fontWeight="bold">B</text>
            <text x="136" y="130" fill="#94a3b8" fontSize="12" fontWeight="bold">C</text>
            <text x="68" y="24" fill="#38bdf8" fontSize="12" fontWeight="bold">A</text>

            {/* Triangle 2 (DEF) */}
            <polygon points="190,120 290,120 230,30" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="2" />
            {getSideTickMarks([190, 120], [230, 30], 1, 14, 5).map((l, i) => (
              <line key={`q1-de-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
            ))}
            {getSideTickMarks([230, 30], [290, 120], 2, 14, 5).map((l, i) => (
              <line key={`q1-df-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
            ))}
            <path d="M 220,45 A 20,20 0 0,0 240,45" fill="none" stroke="#22d3ee" strokeWidth="2" />
            <text x="178" y="130" fill="#94a3b8" fontSize="12" fontWeight="bold">E</text>
            <text x="296" y="130" fill="#94a3b8" fontSize="12" fontWeight="bold">F</text>
            <text x="228" y="24" fill="#fbbf24" fontSize="12" fontWeight="bold">D</text>
          </svg>
        );

      case 'RHS':
        return (
          <svg viewBox="0 0 320 140" className="w-full h-full select-none">
            {/* Right Triangle 1 */}
            <polygon points="40,120 130,120 40,30" fill="rgba(6, 182, 212, 0.15)" stroke="#06b6d4" strokeWidth="2" />
            <rect x="40" y="108" width="12" height="12" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
            {/* Hypotenuse tick (40, 30) to (130, 120) */}
            {getSideTickMarks([40, 30], [130, 120], 1, 14, 5).map((l, i) => (
              <line key={`rhs1-h-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
            ))}
            {/* Base leg tick (40, 120) to (130, 120) */}
            {getSideTickMarks([40, 120], [130, 120], 2, 14, 5).map((l, i) => (
              <line key={`rhs1-b-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
            ))}
            <text x="96" y="68" fill="#fbbf24" fontSize="11" fontWeight="bold">10 ซม.</text>
            <text x="75" y="136" fill="#fbbf24" fontSize="11" fontWeight="bold">6 ซม.</text>

            {/* Right Triangle 2 */}
            <polygon points="190,120 280,120 190,30" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="2" />
            <rect x="190" y="108" width="12" height="12" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
            {/* Hypotenuse tick (190, 30) to (280, 120) */}
            {getSideTickMarks([190, 30], [280, 120], 1, 14, 5).map((l, i) => (
              <line key={`rhs2-h-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
            ))}
            {/* Base leg tick (190, 120) to (280, 120) */}
            {getSideTickMarks([190, 120], [280, 120], 2, 14, 5).map((l, i) => (
              <line key={`rhs2-b-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
            ))}
            <text x="246" y="68" fill="#fbbf24" fontSize="11" fontWeight="bold">10 ซม.</text>
            <text x="225" y="136" fill="#fbbf24" fontSize="11" fontWeight="bold">6 ซม.</text>
          </svg>
        );

      case 'SSA_FAIL':
        return (
          <svg viewBox="0 0 320 140" className="w-full h-full select-none">
            <line x1="30" y1="120" x2="290" y2="120" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Obtuse Triangle */}
            <polygon points="30,120 120,40 85,120" fill="rgba(244, 63, 94, 0.15)" stroke="#f43f5e" strokeWidth="2" />
            {/* Acute Triangle */}
            <polygon points="160,120 250,40 290,120" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" strokeWidth="2" />
            <text x="35" y="112" fill="#22d3ee" fontSize="10">θ</text>
            <text x="165" y="112" fill="#22d3ee" fontSize="10">θ</text>
            <text x="45" y="135" fill="#f43f5e" fontSize="11">รูปที่ 1 (มุมป้าน)</text>
            <text x="200" y="135" fill="#38bdf8" fontSize="11">รูปที่ 2 (มุมแหลม)</text>
          </svg>
        );

      case 'MISSING_ANGLE':
        return (
          <svg viewBox="0 0 320 140" className="w-full h-full select-none">
            {/* Triangle ABC */}
            <polygon points="30,120 130,120 70,30" fill="rgba(6, 182, 212, 0.15)" stroke="#06b6d4" strokeWidth="2" />
            <text x="65" y="55" fill="#22d3ee" fontSize="11" fontWeight="bold">48°</text>
            <text x="42" y="112" fill="#22d3ee" fontSize="11" fontWeight="bold">72°</text>
            <text x="100" y="112" fill="#94a3b8" fontSize="11">∠C</text>
            <text x="68" y="22" fill="#38bdf8" fontSize="12" fontWeight="bold">A</text>
            <text x="20" y="125" fill="#38bdf8" fontSize="12" fontWeight="bold">B</text>
            <text x="135" y="125" fill="#38bdf8" fontSize="12" fontWeight="bold">C</text>

            <text x="150" y="75" fill="#fbbf24" fontSize="16" fontWeight="bold">≅</text>

            {/* Triangle XYZ */}
            <polygon points="190,120 290,120 230,30" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="2" />
            <text x="228" y="22" fill="#fbbf24" fontSize="12" fontWeight="bold">X</text>
            <text x="180" y="125" fill="#fbbf24" fontSize="12" fontWeight="bold">Y</text>
            <text x="295" y="125" fill="#fbbf24" fontSize="12" fontWeight="bold">Z (?)</text>
            <text x="260" y="112" fill="#fbbf24" fontSize="12" fontWeight="bold">∠Z = ?</text>
          </svg>
        );

      case 'ISOSCELES':
        return (
          <svg viewBox="0 0 320 140" className="w-full h-full select-none">
            {/* Big Isosceles Triangle ABC with Altitude AD */}
            <polygon points="70,120 250,120 160,20" fill="rgba(6, 182, 212, 0.1)" stroke="#06b6d4" strokeWidth="2" />
            {/* Altitude line AD */}
            <line x1="160" y1="20" x2="160" y2="120" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
            {/* Right angle marks at D */}
            <rect x="148" y="108" width="12" height="12" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
            <rect x="160" y="108" width="12" height="12" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
            {/* Equal leg ticks on AB and AC */}
            {getSideTickMarks([70, 120], [160, 20], 1, 14, 5).map((l, i) => (
              <line key={`iso-ab-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
            ))}
            {getSideTickMarks([160, 20], [250, 120], 1, 14, 5).map((l, i) => (
              <line key={`iso-ac-${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
            ))}
            <text x="156" y="14" fill="#38bdf8" fontSize="12" fontWeight="bold">A</text>
            <text x="55" y="125" fill="#94a3b8" fontSize="12" fontWeight="bold">B</text>
            <text x="260" y="125" fill="#94a3b8" fontSize="12" fontWeight="bold">C</text>
            <text x="156" y="135" fill="#fbbf24" fontSize="12" fontWeight="bold">D</text>
          </svg>
        );

      case 'PARALLELOGRAM':
        return (
          <svg viewBox="0 0 320 140" className="w-full h-full select-none">
            {/* Parallelogram ABCD */}
            <polygon points="60,110 200,110 240,40 100,40" fill="rgba(6, 182, 212, 0.1)" stroke="#06b6d4" strokeWidth="2" />
            {/* Diagonal AC */}
            <line x1="100" y1="40" x2="200" y2="110" stroke="#fbbf24" strokeWidth="2.5" />
            {/* Alternate angle marks */}
            <path d="M 120,40 A 20,20 0 0,1 116,56" fill="none" stroke="#22d3ee" strokeWidth="2" />
            <path d="M 180,110 A 20,20 0 0,1 184,94" fill="none" stroke="#22d3ee" strokeWidth="2" />
            <text x="90" y="32" fill="#38bdf8" fontSize="12" fontWeight="bold">A</text>
            <text x="248" y="38" fill="#94a3b8" fontSize="12" fontWeight="bold">B</text>
            <text x="205" y="122" fill="#94a3b8" fontSize="12" fontWeight="bold">C</text>
            <text x="48" y="118" fill="#94a3b8" fontSize="12" fontWeight="bold">D</text>
          </svg>
        );

      default:
        return (
          <svg viewBox="0 0 320 140" className="w-full h-full select-none">
            <polygon points="30,120 130,120 70,30" fill="rgba(6, 182, 212, 0.15)" stroke="#06b6d4" strokeWidth="2" />
            <polygon points="190,120 290,120 230,30" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="2" />
            <text x="75" y="80" fill="#38bdf8" fontSize="14" textAnchor="middle">△ 1</text>
            <text x="235" y="80" fill="#fbbf24" fontSize="14" textAnchor="middle">△ 2</text>
          </svg>
        );
    }
  };

  return (
    <section id="quiz-section" className="py-14 border-b border-slate-800/80 bg-[#080d1a]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
              <span>หัวข้อ 3.4</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>แบบทดสอบประเมินตนเอง</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              แบบฝึกหัดทบทวนความรู้ (Interactive Practice Quiz)
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              ฝึกวิเคราะห์รูปเรขาคณิตจริง {QUIZ_QUESTIONS.length} ข้อ พร้อมเฉลยละเอียดและคำใบ้เพื่อช่วยคิด
            </p>
          </div>

          {/* Score & Streak Stats (Clean unboxed figures) */}
          <div className="flex items-center gap-4 bg-slate-900/80 border border-slate-800 px-4 py-2.5 rounded-xl shrink-0 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px]">คะแนนสะสม</span>
              <span className="font-mono text-base font-bold text-emerald-400">
                {score} / {QUIZ_QUESTIONS.length}
              </span>
            </div>
            <div className="w-px h-7 bg-slate-800" />
            <div>
              <span className="text-slate-400 block text-[10px]">ความแม่นยำต่อเนื่อง</span>
              <span className="font-mono text-base font-bold text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {streak} ข้อ
              </span>
            </div>
          </div>
        </div>

        {/* Completion Card or Question Card */}
        {isQuizCompleted ? (
          <div className="bg-[#0b1224] rounded-2xl border border-slate-800 p-8 shadow-2xl text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-4 shadow-lg shadow-amber-500/10">
              <Trophy className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">ทำแบบฝึกหัดครบทั้ง {QUIZ_QUESTIONS.length} ข้อแล้ว!</h3>
            <p className="text-slate-300 text-sm max-w-md mb-6">
              ยอดเยี่ยมมาก คุณได้ทบทวนนิยามและเงื่อนไขความเท่ากันทุกประการของรูปสามเหลี่ยมอย่างครอบคลุม
            </p>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 mb-6 flex items-center gap-8 text-center">
              <div>
                <div className="text-xs text-slate-400">คะแนนสุทธิ</div>
                <div className="text-2xl font-mono font-extrabold text-emerald-400">{score} / 8</div>
              </div>
              <div className="w-px h-8 bg-slate-800" />
              <div>
                <div className="text-xs text-slate-400">ผลการประเมิน</div>
                <div className="text-sm font-bold text-amber-400">
                  {score >= 7 ? 'ยอดเยี่ยมระดับเซียนเรขาคณิต' : score >= 5 ? 'เข้าใจหลักการดีมาก' : 'ลองทบทวนเงื่อนไขอีกครั้ง'}
                </div>
              </div>
            </div>

            <button
              onClick={handleRestartQuiz}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-slate-950 font-semibold text-sm transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>ทำแบบทดสอบใหม่อีกครั้ง</span>
            </button>
          </div>
        ) : (
          <div className="bg-[#0b1224] rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-2xl">
            {/* Top Info Bar */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono text-cyan-400 font-bold text-sm">
                  ข้อที่ {currentIndex + 1}
                </span>
                <span className="text-slate-600">/</span>
                <span className="text-slate-500 font-mono">{QUIZ_QUESTIONS.length}</span>
              </div>

              {/* Progress bar */}
              <div className="w-36 sm:w-48 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-amber-400 h-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-white leading-snug mb-2">
                {currentQuestion.questionText}
              </h3>
              {currentQuestion.contextText && (
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {currentQuestion.contextText}
                </p>
              )}
            </div>

            {/* Diagram Area */}
            <div className="mb-6 h-48 sm:h-52 bg-[#060a15] rounded-xl border border-slate-800/80 p-2 flex items-center justify-center overflow-hidden">
              {renderQuestionDiagram(currentQuestion.diagramType)}
            </div>

            {/* Multiple Choice Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                const isOptionCorrect = option.id === currentQuestion.correctOptionId;

                let buttonStyle = 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-200';
                if (hasSubmitted) {
                  if (isSelected && isOptionCorrect) {
                    buttonStyle = 'bg-emerald-950/60 border-emerald-500/80 text-emerald-200 shadow-md shadow-emerald-500/10';
                  } else if (isSelected && !isOptionCorrect) {
                    buttonStyle = 'bg-rose-950/60 border-rose-500/80 text-rose-200';
                  } else if (isOptionCorrect) {
                    buttonStyle = 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300';
                  }
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${buttonStyle}`}
                  >
                    <span className="w-6 h-6 rounded-md bg-slate-800 border border-slate-700/80 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                      {option.id}
                    </span>
                    <span className="text-xs sm:text-sm font-medium leading-relaxed pt-0.5">
                      {option.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Feedback & Explanation Box */}
            {hasSubmitted && (
              <div
                className={`p-4 rounded-xl border mb-6 animate-in fade-in duration-200 ${
                  isCorrect
                    ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200'
                    : 'bg-rose-950/40 border-rose-500/60 text-rose-200'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm mb-1">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-300">ยอดเยี่ยม ถูกต้องแล้ว!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-400" />
                      <span className="text-rose-300">ยังไม่ถูกต้องนะ ลองสังเกตอีกครั้ง</span>
                    </>
                  )}
                </div>

                <p className="text-xs leading-relaxed text-slate-300 mt-2">
                  {currentQuestion.explanation}
                </p>

                {/* If incorrect, show hint and retry button */}
                {!isCorrect && (
                  <div className="mt-3 pt-3 border-t border-rose-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 text-xs text-amber-300">
                      <Lightbulb className="w-4 h-4 shrink-0 text-amber-400" />
                      <span>{currentQuestion.hint}</span>
                    </div>

                    <button
                      onClick={handleRetryCurrent}
                      className="px-3 py-1.5 rounded-lg bg-rose-900/50 hover:bg-rose-800/60 border border-rose-700/60 text-xs font-medium text-white transition-colors shrink-0"
                    >
                      ลองตอบใหม่อีกครั้ง
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons Row */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <div className="text-xs text-slate-500">
                {hasSubmitted ? (
                  isCorrect ? 'พร้อมสำหรับข้อต่อไปแล้ว' : 'สามารถกดลองตอบใหม่ได้'
                ) : (
                  'เลือกคำตอบ 1 ข้อเพื่อส่งตรวจ'
                )}
              </div>

              {hasSubmitted && (
                <button
                  onClick={handleNextQuestion}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs transition-all shadow-md shadow-amber-500/10"
                >
                  <span>{currentIndex < QUIZ_QUESTIONS.length - 1 ? 'ข้อถัดไป' : 'ดูผลคะแนนรวม'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
