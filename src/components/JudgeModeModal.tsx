/**
 * @file src/components/JudgeModeModal.tsx
 * @description Accessible judicial tribunal modal with keyboard navigation and focus management.
 */

import React, { useState, useEffect } from 'react';

interface JudgeModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  expenseName: string;
  expenseAmount: number;
  onAcceptDelay: () => void;
  onOverrule: () => void;
}

export const JudgeModeModal: React.FC<JudgeModeModalProps> = ({
  isOpen,
  onClose,
  expenseName,
  expenseAmount,
  onAcceptDelay,
  onOverrule,
}) => {
  const [checklist, setChecklist] = useState({
    ownsAlternative: false,
    noYield: true,
    emergencyRegret: true,
  });

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="judge-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#17173d]/75 backdrop-blur-sm animate-fadeIn"
    >
      <div className="bg-[#ffffff] rounded-xl max-w-xl w-full p-4 sm:p-6 shadow-2xl border-2 border-[#17173d] max-h-[90vh] overflow-y-auto">
        {/* Judicial Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-[#17173d]">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[#ba1a1a] text-[24px]"
              aria-hidden="true"
            >
              gavel
            </span>
            <div>
              <span className="font-label-caps text-[9px] sm:text-[10px] text-[#47464e] tracking-wider block">
                THE RUNWAY TRIBUNAL · CASE #881-A
              </span>
              <h2
                id="judge-modal-title"
                className="font-headline-md text-[18px] sm:text-[20px] text-[#181c23] leading-none uppercase font-bold"
              >
                Financial Judgment Audit
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Tribunal modal"
            className="w-8 h-8 rounded-full bg-[#f1f3fd] hover:bg-[#e0e2ec] text-[#181c23] flex items-center justify-center font-bold text-sm cursor-pointer focus-visible:ring-2 focus-visible:ring-[#17173d]"
          >
            ✕
          </button>
        </div>

        {/* Indictment Box */}
        <div className="my-4 p-3.5 bg-[#f1f3fd] rounded-lg border border-[#e0e2ec]">
          <div className="flex items-center justify-between font-label-caps text-[9px] sm:text-[10px] text-[#47464e] mb-1">
            <span>DEFENDANT: EXPEDITION PILOT</span>
            <span className="text-[#ba1a1a] font-bold">ACCUSED OF RUNWAY NEGLIGENCE</span>
          </div>
          <p className="font-body-md text-[13px] text-[#181c23]">
            Attempting to execute an unapproved discretionary debit of{' '}
            <span className="font-bold text-[#ba1a1a]">₹{expenseAmount.toLocaleString('en-IN')}</span>{' '}
            for <span className="font-bold uppercase">"{expenseName}"</span> on Day 12 of a
            tight 30-day clearance envelope.
          </p>
        </div>

        {/* The Verdict */}
        <div className="mb-4 p-4 rounded-lg bg-[#ffdad6] border-l-4 border-[#ba1a1a] text-[#93000a]">
          <div className="flex items-center gap-1.5 font-label-caps text-[11px] font-extrabold mb-1">
            <span
              className="material-symbols-outlined text-[16px]"
              aria-hidden="true"
            >
              sentiment_very_dissatisfied
            </span>
            <span>VERDICT: GUILTY OF PREMEDITATED RUNWAY SEVERANCE</span>
          </div>
          <p className="font-body-sm text-[12px] sm:text-[13px] leading-relaxed text-[#181c23]">
            "You are trading <span className="font-bold">14 days of sovereign financial freedom</span> for
            foam, rubber, and consumer vanity. On Day 16, your cash will hit zero. You will be walking in your
            brand new sneakers because you won't even have ₹20 left for metro fare."
          </p>
        </div>

        {/* The Reality Audit: Physical Equivalents */}
        <div className="mb-4">
          <span className="font-label-caps text-[10px] text-[#47464e] block mb-2 tracking-wider">
            PHYSICAL TACTILE TRADEOFF MATRIX (WHAT ₹{expenseAmount.toLocaleString('en-IN')} ACTUALLY BUYS)
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="p-2.5 rounded bg-[#ebedf7] border border-[#e0e2ec]">
              <span className="font-display-lg text-[20px] sm:text-[22px] text-[#17173d] font-bold block">
                {Math.round(expenseAmount / 100)}
              </span>
              <span className="font-label-sm text-[10px] text-[#47464e]">
                Nutritious Full Meals
              </span>
            </div>
            <div className="p-2.5 rounded bg-[#ebedf7] border border-[#e0e2ec]">
              <span className="font-display-lg text-[20px] sm:text-[22px] text-[#17173d] font-bold block">
                {Math.round(expenseAmount / 30)}
              </span>
              <span className="font-label-sm text-[10px] text-[#47464e]">
                Cups of Hot Masala Chai
              </span>
            </div>
            <div className="p-2.5 rounded bg-[#ebedf7] border border-[#e0e2ec]">
              <span className="font-display-lg text-[20px] sm:text-[22px] text-[#17173d] font-bold block">
                {Math.round((expenseAmount / 1200) * 30)}
              </span>
              <span className="font-label-sm text-[10px] text-[#47464e]">
                Days of Phone EMI Paid
              </span>
            </div>
            <div className="p-2.5 rounded bg-[#ebedf7] border border-[#e0e2ec]">
              <span className="font-display-lg text-[20px] sm:text-[22px] text-[#ba1a1a] font-bold block">
                -14
              </span>
              <span className="font-label-sm text-[10px] text-[#47464e]">
                Days of Runway Lost
              </span>
            </div>
          </div>
        </div>

        {/* Judicial Checklist */}
        <div className="mb-4 p-3 bg-[#f1f3fd] rounded-lg border border-[#e0e2ec]">
          <span className="font-label-caps text-[10px] text-[#181c23] block mb-2 font-bold">
            THE 72-HOUR RESTRAINT SENTENCE CHECKLIST
          </span>
          <div className="space-y-2 text-[12px] text-[#181c23]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={checklist.ownsAlternative}
                onChange={(e) =>
                  setChecklist({ ...checklist, ownsAlternative: e.target.checked })
                }
                className="w-4 h-4 accent-[#17173d] rounded"
              />
              <span>I already possess a functioning equivalent item at home.</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={checklist.noYield}
                onChange={(e) =>
                  setChecklist({ ...checklist, noYield: e.target.checked })
                }
                className="w-4 h-4 accent-[#17173d] rounded"
              />
              <span>This purchase produces 0% cash yield, dividend, or survival utility.</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={checklist.emergencyRegret}
                onChange={(e) =>
                  setChecklist({ ...checklist, emergencyRegret: e.target.checked })
                }
                className="w-4 h-4 accent-[#17173d] rounded"
              />
              <span>If an urgent medical expense arises next week, I will sorely regret this.</span>
            </label>
          </div>
        </div>

        {/* Decision Actions */}
        <div className="pt-3 border-t border-[#e0e2ec] flex flex-col sm:flex-row items-center justify-end gap-2">
          <button
            onClick={onOverrule}
            className="w-full sm:w-auto px-4 py-2 min-h-[40px] rounded bg-[#e6e8f2] text-[#181c23] font-label-caps text-[10px] hover:bg-[#e0e2ec] transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#17173d]"
          >
            OVERRULE THE JUDGE (RISK IT)
          </button>
          <button
            onClick={onAcceptDelay}
            className="w-full sm:w-auto px-5 py-2 min-h-[40px] rounded bg-[#17173d] text-white font-label-caps text-[10px] font-bold hover:bg-[#000000] transition-colors cursor-pointer shadow-xs focus-visible:ring-2 focus-visible:ring-[#17173d]"
          >
            ACCEPT SENTENCE · DELAY PURCHASE (RECOMMENDED)
          </button>
        </div>
      </div>
    </div>
  );
};
