import React, { useState } from 'react';
import { MIND_MAP_DATA } from '../data/congruenceData';
import { MindMapNode } from '../types/geometry';
import {
  ChevronRight,
  ChevronDown,
  Layers,
  Move,
  Triangle,
  AlertTriangle,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const MindMapSection: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<MindMapNode>(MIND_MAP_DATA.children![0]);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    superposition: true,
    'triangle-conditions': true,
    'pitfalls-proofs': true,
    applications: true,
  });

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getNodeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Move':
        return <Move className="w-4 h-4 text-cyan-400" />;
      case 'Triangle':
        return <Triangle className="w-4 h-4 text-amber-400" />;
      case 'AlertTriangle':
        return <AlertTriangle className="w-4 h-4 text-rose-400" />;
      case 'GraduationCap':
        return <GraduationCap className="w-4 h-4 text-emerald-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-3.5 h-3.5 text-cyan-300" />;
      case 'Sparkles':
        return <Sparkles className="w-3.5 h-3.5 text-amber-300" />;
      default:
        return <Layers className="w-4 h-4 text-slate-400" />;
    }
  };

  const scrollToSection = (sectionId?: string) => {
    if (!sectionId) return;
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="mindmap-section" className="py-14 border-b border-slate-800/80 bg-[#080d1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-2">
              <span>ภาพรวมสถาปัตยกรรมเนื้อหา</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>บทที่ 3</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              แผนผังมโนทัศน์ (Interactive Mind Map)
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              คลิกเพื่อขยายและสำรวจหัวข้อย่อย ระบบจะไฮไลต์เส้นทางการเรียนรู้และเปิดข้อมูลสรุปใจความสำคัญพร้อมปุ่มลัดไปยังส่วนฝึกปฏิบัติ
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 border border-slate-800 rounded-lg px-3 py-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" />
            <span>คลิกโหนดเพื่อดูรายละเอียด</span>
          </div>
        </div>

        {/* 2-Zone Layout: Left Tree Structure | Right Concept Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Tree Structure */}
          <div className="lg:col-span-7 bg-[#0b1224] rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-xs font-medium text-slate-400">
              <span>โครงสร้างเนื้อหา (Tree Navigation)</span>
              <span>4 ส่วนหลัก</span>
            </div>

            {/* Root Node */}
            <div
              onClick={() => setSelectedNode(MIND_MAP_DATA)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between mb-5 ${
                selectedNode.id === MIND_MAP_DATA.id
                  ? 'bg-cyan-950/40 border-cyan-500/80 text-white shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-900/70 border-slate-700/60 text-slate-200 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                  <Triangle className="w-4 h-4 fill-cyan-400/30" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <span>{MIND_MAP_DATA.title}</span>
                  </div>
                  <div className="text-xs text-slate-400">{MIND_MAP_DATA.subtitle}</div>
                </div>
              </div>
              <span className="text-xs font-mono text-cyan-400">แกนหลัก</span>
            </div>

            {/* Tree Branches */}
            <div className="space-y-4 pl-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-cyan-500/50 before:via-amber-500/50 before:to-emerald-500/50">
              {MIND_MAP_DATA.children?.map((branch) => {
                const isSelected = selectedNode.id === branch.id;
                const isExpanded = !!expandedNodes[branch.id];

                return (
                  <div key={branch.id} className="relative pl-6">
                    {/* Horizontal connector line */}
                    <div className="absolute left-0 top-5 w-6 h-px bg-slate-700" />

                    {/* Branch Header Card */}
                    <div
                      onClick={() => setSelectedNode(branch)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-amber-950/30 border-amber-500/70 text-white shadow-md'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-md bg-slate-800 border border-slate-700/60">
                          {getNodeIcon(branch.iconName)}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-100">{branch.title}</div>
                          <div className="text-xs text-slate-400">{branch.subtitle}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {branch.children && branch.children.length > 0 && (
                          <button
                            onClick={(e) => toggleExpand(branch.id, e)}
                            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                            title={isExpanded ? 'ย่อกิ่ง' : 'ขยายกิ่ง'}
                          >
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Sub-branches */}
                    {isExpanded && branch.children && (
                      <div className="mt-2.5 space-y-2 pl-6 relative before:absolute before:left-3 before:top-1 before:bottom-1 before:w-px before:bg-slate-800">
                        {branch.children.map((subNode) => {
                          const isSubSelected = selectedNode.id === subNode.id;
                          return (
                            <div key={subNode.id} className="relative pl-4">
                              <div className="absolute left-0 top-3.5 w-4 h-px bg-slate-800" />
                              <div
                                onClick={() => setSelectedNode(subNode)}
                                className={`px-3 py-2 rounded-lg border text-xs cursor-pointer transition-colors flex items-center justify-between ${
                                  isSubSelected
                                    ? 'bg-cyan-950/40 border-cyan-500/60 text-cyan-200'
                                    : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                                  <span className="font-medium">{subNode.title}</span>
                                </div>
                                <span className="text-slate-500 truncate max-w-[120px]">{subNode.subtitle}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Concept Spotlight Panel */}
          <div className="lg:col-span-5 bg-[#0b1224] rounded-2xl border border-slate-800 p-6 shadow-xl sticky top-20">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
              <span className="text-cyan-400 font-semibold tracking-wider">เจาะลึกมโนทัศน์ (Concept Focus)</span>
              <span className="text-slate-500 font-mono">ระดับ {selectedNode.level === 0 ? 'ภาพรวม' : selectedNode.level === 1 ? 'หมวดหลัก' : 'ประเด็นย่อย'}</span>
            </div>

            <div className="mt-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 shrink-0 text-cyan-400">
                  {getNodeIcon(selectedNode.iconName)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{selectedNode.title}</h3>
                  <div className="text-xs text-amber-400 font-medium mt-0.5">{selectedNode.subtitle}</div>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-sm text-slate-300 leading-relaxed">
                {selectedNode.description}
              </div>

              {/* Learning Tips / Formula Highlights */}
              <div className="mt-5 space-y-3">
                <div className="text-xs font-semibold text-slate-400">จุดสำคัญที่ต้องจำ:</div>
                <ul className="text-xs text-slate-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>รูปสองรูปเท่ากันทุกประการ ก็ต่อเมื่อ ทับกันได้สนิทพอดี (พื้นที่, รูปร่าง และขนาดเท่ากัน 100%)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>เมื่อพิสูจน์ความเท่ากันทุกประการสำเร็จ องค์ประกอบที่สมนัยกันที่เหลือทั้งหมดจะเท่ากันทันที</span>
                  </li>
                </ul>
              </div>

              {/* Direct Jump Action */}
              {selectedNode.sectionId ? (
                <div className="mt-6 pt-4 border-t border-slate-800">
                  <button
                    onClick={() => scrollToSection(selectedNode.sectionId)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-slate-950 font-semibold text-xs transition-all shadow-md shadow-cyan-500/10"
                  >
                    <span>ไปยังส่วน {selectedNode.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
                  <span>เลือกหัวข้อย่อยเพื่อวาร์ปไปยังส่วนเนื้อหา</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
