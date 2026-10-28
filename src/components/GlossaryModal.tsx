import React, { useState } from 'react';
import { GLOSSARY_ITEMS } from '../data/congruenceData';
import { X, Search, BookOpen, ExternalLink, Bookmark } from 'lucide-react';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredItems = GLOSSARY_ITEMS.filter(
    (item) =>
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.def.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#0b1224] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">พจนานุกรมคำศัพท์เรขาคณิต ม.2</h3>
              <p className="text-xs text-slate-400">นิยามและสัญลักษณ์สำคัญเกี่ยวกับความเท่ากันทุกประการ</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-900/50">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ค้นหาคำศัพท์ เช่น สมนัย, มุมแย้ง, ด้านร่วม, การสะท้อน..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-950/70 border border-slate-700/80 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Term List */}
        <div className="p-5 overflow-y-auto space-y-3.5 flex-1 divide-y divide-slate-800/60">
          {filteredItems.map((item, idx) => (
            <div key={idx} className={idx > 0 ? 'pt-3.5' : ''}>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-sm font-bold text-amber-400">{item.term}</span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                  {item.symbol}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{item.def}</p>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="text-center py-8 text-xs text-slate-400">
              ไม่พบคำศัพท์ที่ตรงกับการค้นหา "{searchQuery}"
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs text-slate-400">
          <span>ความเท่ากันทุกประการ (Congruence ≅)</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
