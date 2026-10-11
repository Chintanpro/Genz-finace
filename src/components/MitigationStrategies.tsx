/**
 * @file src/components/MitigationStrategies.tsx
 * @description Accessible mitigation strategies with touch targets and ARIA states.
 */

import React from 'react';

interface MitigationStrategiesProps {
  onApplyStrategy: (strategyId: 'offset' | 'split' | 'shift') => void;
  appliedStrategyId: 'offset' | 'split' | 'shift' | null;
}

export const MitigationStrategies: React.FC<MitigationStrategiesProps> = ({
  onApplyStrategy,
  appliedStrategyId,
}) => {
  return (
    <div
      role="region"
      aria-labelledby="mitigation-heading"
      className="bg-[#ffffff] rounded-xl p-4 sm:p-5 shadow-xs border border-[#e0e2ec]"
    >
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#e0e2ec]/70">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-[#000000] text-[18px]"
            aria-hidden="true"
          >
            alt_route
          </span>
          <h3 id="mitigation-heading" className="font-headline-sm text-[16px] sm:text-[18px] text-[#181c23]">
            3 Smart Mitigation Strategies
          </h3>
        </div>
        <span className="px-2 py-0.5 rounded bg-[#e6e8f2] text-[#181c23] font-label-caps text-[9px] sm:text-[10px]">
          AVOID ZERO DAY
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Option 1: Offset Pack (Recommended) */}
        <div
          className={`bg-[#f1f3fd] rounded-lg p-3 sm:p-4 flex flex-col justify-between border transition-all ${
            appliedStrategyId === 'offset'
              ? 'border-[#17173d] ring-2 ring-[#17173d]/20 bg-[#ffffff]'
              : 'border-[#e0e2ec] hover:bg-[#ebedf7]'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="px-1.5 py-0.5 rounded bg-[#dce1fc] text-[#141b2e] font-label-caps text-[9px] font-bold">
                RECOMMENDED
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#ebedf7] text-[#181c23] font-label-caps text-[9px]">
                VERDICT AMBER
              </span>
            </div>
            <h4 className="font-headline-sm text-[15px] text-[#181c23] mb-1">
              Offset Pack
            </h4>
            <p className="font-body-sm text-[12px] text-[#47464e] mb-3 leading-relaxed">
              Downgrade to <span className="text-[#181c23] font-bold">₹999</span> tier + pause
              Cult gym (frees ₹499) & AI study tool (frees ₹399).
            </p>
            <div className="bg-[#ffffff] p-2 rounded mb-3 border border-[#e0e2ec] shadow-xs">
              <span className="font-label-caps text-[9px] text-[#47464e]">
                NEW RUNWAY CLEARANCE
              </span>
              <div className="font-ledger-num-md text-[13px] text-[#181c23] font-bold">
                Lasts to Day 28 (+12 Days)
              </div>
            </div>
          </div>
          <button
            onClick={() => onApplyStrategy('offset')}
            aria-pressed={appliedStrategyId === 'offset'}
            aria-label="Use Offset Pack mitigation strategy"
            className={`w-full py-2 min-h-[40px] rounded font-label-caps text-[10px] transition-all cursor-pointer font-bold focus-visible:ring-2 focus-visible:ring-[#17173d] ${
              appliedStrategyId === 'offset'
                ? 'bg-[#2c6b1e] text-white'
                : 'bg-[#000000] text-white hover:opacity-90 active:scale-98'
            }`}
          >
            {appliedStrategyId === 'offset' ? '✓ STRATEGY APPLIED' : 'USE OFFSET PACK'}
          </button>
        </div>

        {/* Option 2: Split Over 2 Months */}
        <div
          className={`bg-[#f1f3fd] rounded-lg p-3 sm:p-4 flex flex-col justify-between border transition-all ${
            appliedStrategyId === 'split'
              ? 'border-[#17173d] ring-2 ring-[#17173d]/20 bg-[#ffffff]'
              : 'border-[#e0e2ec] hover:bg-[#ebedf7]'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="px-1.5 py-0.5 rounded bg-[#e6e8f2] text-[#47464e] font-label-caps text-[9px]">
                SPLIT DEFERRAL
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#ebedf7] text-[#181c23] font-label-caps text-[9px]">
                VERDICT AMBER
              </span>
            </div>
            <h4 className="font-headline-sm text-[15px] text-[#181c23] mb-1">
              2× Payment Tranche
            </h4>
            <p className="font-body-sm text-[12px] text-[#47464e] mb-3 leading-relaxed">
              Commit <span className="text-[#181c23] font-bold">2 × ₹1,250</span> across 60 days
              without tapping emergency contingency.
            </p>
            <div className="bg-[#ffffff] p-2 rounded mb-3 border border-[#e0e2ec] shadow-xs">
              <span className="font-label-caps text-[9px] text-[#47464e]">
                REVISED ALLOWANCE
              </span>
              <div className="font-ledger-num-md text-[13px] text-[#181c23] font-bold">
                ₹102 / day (Preserves Day 30)
              </div>
            </div>
          </div>
          <button
            onClick={() => onApplyStrategy('split')}
            aria-pressed={appliedStrategyId === 'split'}
            aria-label="Split payment into 2 tranches"
            className={`w-full py-2 min-h-[40px] rounded font-label-caps text-[10px] transition-all cursor-pointer font-bold focus-visible:ring-2 focus-visible:ring-[#17173d] ${
              appliedStrategyId === 'split'
                ? 'bg-[#2c6b1e] text-white'
                : 'bg-[#e6e8f2] text-[#181c23] hover:bg-[#e0e2ec] active:scale-98'
            }`}
          >
            {appliedStrategyId === 'split' ? '✓ TRANCHE ACTIVE' : 'SPLIT PAYMENT'}
          </button>
        </div>

        {/* Option 3: Delay Past Freelance Payout */}
        <div
          className={`bg-[#f1f3fd] rounded-lg p-3 sm:p-4 flex flex-col justify-between border transition-all ${
            appliedStrategyId === 'shift'
              ? 'border-[#17173d] ring-2 ring-[#17173d]/20 bg-[#ffffff]'
              : 'border-[#e0e2ec] hover:bg-[#ebedf7]'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="px-1.5 py-0.5 rounded bg-[#e6e8f2] text-[#47464e] font-label-caps text-[9px]">
                TIMING ALIGNMENT
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#ebedf7] text-[#181c23] font-label-caps text-[9px]">
                VERDICT AMBER
              </span>
            </div>
            <h4 className="font-headline-sm text-[15px] text-[#181c23] mb-1">
              Shift to Day 21
            </h4>
            <p className="font-body-sm text-[12px] text-[#47464e] mb-3 leading-relaxed">
              Delay purchase by 9 days until the guaranteed{' '}
              <span className="text-[#181c23] font-bold">₹1,500</span> client payout credits.
            </p>
            <div className="bg-[#ffffff] p-2 rounded mb-3 border border-[#e0e2ec] shadow-xs">
              <span className="font-label-caps text-[9px] text-[#47464e]">
                DEFICIT BUFFER
              </span>
              <div className="font-ledger-num-md text-[13px] text-[#181c23] font-bold">
                +₹1,609 End Safety Margin
              </div>
            </div>
          </div>
          <button
            onClick={() => onApplyStrategy('shift')}
            aria-pressed={appliedStrategyId === 'shift'}
            aria-label="Shift purchase to Day 21 after payout"
            className={`w-full py-2 min-h-[40px] rounded font-label-caps text-[10px] transition-all cursor-pointer font-bold focus-visible:ring-2 focus-visible:ring-[#17173d] ${
              appliedStrategyId === 'shift'
                ? 'bg-[#2c6b1e] text-white'
                : 'bg-[#e6e8f2] text-[#181c23] hover:bg-[#e0e2ec] active:scale-98'
            }`}
          >
            {appliedStrategyId === 'shift' ? '✓ SHIFTED TO D21' : 'DELAY TO DAY 21'}
          </button>
        </div>
      </div>
    </div>
  );
};
