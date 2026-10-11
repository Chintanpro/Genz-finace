/**
 * @file src/components/TimeMachineModal.tsx
 * @description Accessible Time Machine temporal scrubber with keyboard support.
 */

import React, { useEffect } from 'react';

interface TimeMachineModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDay: number;
  onSelectDay: (day: number) => void;
}

export const TimeMachineModal: React.FC<TimeMachineModalProps> = ({
  isOpen,
  onClose,
  currentDay,
  onSelectDay,
}) => {
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
      aria-labelledby="time-machine-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#17173d]/70 backdrop-blur-sm animate-fadeIn"
    >
      <div className="bg-[#ffffff] rounded-xl max-w-md w-full p-5 shadow-2xl border border-[#e0e2ec]">
        <div className="flex items-center justify-between pb-3 border-b border-[#e0e2ec]">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[#17173d] text-[22px]"
              aria-hidden="true"
            >
              timelapse
            </span>
            <h3
              id="time-machine-title"
              className="font-headline-sm text-[18px] text-[#181c23]"
            >
              Expedition Time Machine
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Time Machine modal"
            className="w-7 h-7 rounded-full bg-[#f1f3fd] hover:bg-[#e0e2ec] text-[#181c23] flex items-center justify-center font-bold text-sm cursor-pointer focus-visible:ring-2 focus-visible:ring-[#17173d]"
          >
            ✕
          </button>
        </div>

        <div className="py-4 space-y-4">
          <p className="font-body-sm text-[13px] text-[#47464e]">
            Scrub forward or backward across the 30-day velocity envelope to see how your runway
            contracts, bills trigger, and liquid reserves drain in real time.
          </p>

          <div className="bg-[#f1f3fd] p-4 rounded-lg border border-[#e0e2ec] text-center">
            <span className="font-label-caps text-[10px] text-[#47464e] block mb-1">
              ACTIVE TEMPORAL COORDINATE
            </span>
            <div className="font-display-lg text-[36px] text-[#17173d] font-extrabold tabular-numbers">
              DAY {currentDay} <span className="text-[18px] text-[#47464e] font-normal">/ 30</span>
            </div>
            <div className="text-[11px] text-[#47464e] mt-1">
              {30 - currentDay} days remaining in current ₹10,000 envelope
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between font-label-caps text-[10px] text-[#47464e]">
              <label htmlFor="time-machine-slider">DAY 1 (DISPATCH)</label>
              <span>DAY 15 (MID-EXPEDITION)</span>
              <span>DAY 30 (TARGET)</span>
            </div>
            <input
              id="time-machine-slider"
              type="range"
              min="1"
              max="30"
              value={currentDay}
              aria-label="Expedition Day Scrubber"
              aria-valuemin={1}
              aria-valuemax={30}
              aria-valuenow={currentDay}
              onChange={(e) => onSelectDay(Number(e.target.value))}
              className="w-full h-3 bg-[#e6e8f2] rounded-lg appearance-none cursor-pointer accent-[#17173d] focus-visible:ring-2 focus-visible:ring-[#17173d]"
            />
          </div>

          <div className="grid grid-cols-4 gap-2 pt-2">
            {[1, 12, 16, 25].map((d) => (
              <button
                key={d}
                onClick={() => onSelectDay(d)}
                aria-label={`Jump to Day ${d}`}
                className={`py-1.5 min-h-[36px] rounded font-label-caps text-[10px] border transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#17173d] ${
                  currentDay === d
                    ? 'bg-[#17173d] text-white border-[#17173d] font-bold'
                    : 'bg-[#ffffff] text-[#181c23] border-[#e0e2ec] hover:bg-[#f1f3fd]'
                }`}
              >
                {d === 1
                  ? 'DAY 1'
                  : d === 12
                  ? 'DAY 12 (NOW)'
                  : d === 16
                  ? 'DAY 16 (CRASH)'
                  : 'DAY 25 (EMI)'}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-[#e0e2ec] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 min-h-[36px] rounded bg-[#17173d] text-white font-label-caps text-[10px] hover:opacity-90 cursor-pointer font-bold focus-visible:ring-2 focus-visible:ring-[#17173d]"
          >
            CONFIRM TEMPORAL MOMENT
          </button>
        </div>
      </div>
    </div>
  );
};
