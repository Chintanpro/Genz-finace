/**
 * @file src/components/ConsequenceBoard.tsx
 * @description Accessible 6-outcome consequence board with interactive math links and commit/undo window.
 */

import React, { useState, useEffect } from 'react';
import { ConsequenceMetrics } from '../types';

interface ConsequenceBoardProps {
  metrics: ConsequenceMetrics;
  expenseAmount: number;
  expenseName: string;
  onOpenMath: (formulaKey: string) => void;
  onTryAlternative: () => void;
  onCommitExpense: () => void;
  isCommitted: boolean;
  onUndoCommit: () => void;
}

export const ConsequenceBoard: React.FC<ConsequenceBoardProps> = ({
  metrics,
  expenseAmount,
  expenseName,
  onOpenMath,
  onTryAlternative,
  onCommitExpense,
  isCommitted,
  onUndoCommit,
}) => {
  const [countdown, setCountdown] = useState(8);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCommitted && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!isCommitted) {
      setCountdown(8);
    }
    return () => clearInterval(timer);
  }, [isCommitted, countdown]);

  const handleCommitClick = () => {
    if (isCommitted) {
      onUndoCommit();
      setCountdown(8);
    } else {
      onCommitExpense();
      setCountdown(8);
    }
  };

  const allowanceDiff = metrics.dailyAllowanceBefore - metrics.dailyAllowanceAfter;
  const allowanceDropPct = Math.round(
    (allowanceDiff / metrics.dailyAllowanceBefore) * 100
  );

  return (
    <div
      role="region"
      aria-labelledby="consequence-heading"
      className="bg-[#ffffff] rounded-xl p-4 sm:p-5 shadow-xs border border-[#e0e2ec]"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#e0e2ec]/70">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-[#47464e] text-[18px]"
            aria-hidden="true"
          >
            table_rows
          </span>
          <h3 id="consequence-heading" className="font-headline-sm text-[16px] sm:text-[18px] text-[#181c23]">
            Live Consequence Board
          </h3>
        </div>
        <span className="font-label-caps text-[10px] text-[#47464e] tracking-wider">
          BEFORE → AFTER
        </span>
      </div>

      {/* Consequence Rows List */}
      <div className="space-y-2.5">
        {/* Row 1: Liquid Balance */}
        <div className="bg-[#f1f3fd] p-3 rounded-lg hover:bg-[#ebedf7] transition-colors border border-[#e0e2ec]/60">
          <div className="flex items-center justify-between mb-1">
            <span className="font-label-caps text-[10px] text-[#47464e]">
              1. LIQUID BALANCE
            </span>
            <span className="px-1.5 py-0.2 rounded bg-[#ffdad6] text-[#93000a] font-label-caps text-[10px]">
              -₹{expenseAmount.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex items-baseline justify-between font-ledger-num-md mb-1">
            <span className="text-[#47464e] line-through text-[14px] sm:text-[15px]">
              ₹{metrics.liquidBalanceBefore.toLocaleString('en-IN')}
            </span>
            <span
              className="material-symbols-outlined text-[16px] text-[#47464e]"
              aria-hidden="true"
            >
              arrow_forward
            </span>
            <span className="text-[#ba1a1a] font-bold text-[16px] sm:text-[18px]">
              ₹{metrics.liquidBalanceAfter.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-between font-body-sm text-[11px] text-[#47464e] pt-1 border-t border-[#e0e2ec]/60 gap-1">
            <span>
              Because {expenseName.toLowerCase()} cost is debited immediately on Day 12.
            </span>
            <button
              onClick={() => onOpenMath('liquid')}
              aria-label={`View math formula for liquid balance deduction: ${metrics.liquidBalanceBefore} minus ${expenseAmount}`}
              className="font-label-caps text-[10px] text-[#17173d] hover:underline cursor-pointer font-bold focus-visible:ring-1 focus-visible:ring-[#17173d]"
            >
              MATH: {metrics.liquidBalanceBefore} - {expenseAmount}
            </button>
          </div>
        </div>

        {/* Row 2: Daily Allowance */}
        <div className="bg-[#f1f3fd] p-3 rounded-lg hover:bg-[#ebedf7] transition-colors border border-[#e0e2ec]/60">
          <div className="flex items-center justify-between mb-1">
            <span className="font-label-caps text-[10px] text-[#47464e]">
              2. DAILY ALLOWANCE (18 DAYS LEFT)
            </span>
            <span className="px-1.5 py-0.2 rounded bg-[#ffdad6] text-[#93000a] font-label-caps text-[10px]">
              -₹{allowanceDiff}/DAY (-{allowanceDropPct}%)
            </span>
          </div>
          <div className="flex items-baseline justify-between font-ledger-num-md mb-1">
            <span className="text-[#47464e] line-through text-[14px] sm:text-[15px]">
              ₹{metrics.dailyAllowanceBefore} / day
            </span>
            <span
              className="material-symbols-outlined text-[16px] text-[#47464e]"
              aria-hidden="true"
            >
              arrow_forward
            </span>
            <span className="text-[#ba1a1a] font-bold text-[16px] sm:text-[18px]">
              ₹{metrics.dailyAllowanceAfter} / day
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-between font-body-sm text-[11px] text-[#47464e] pt-1 border-t border-[#e0e2ec]/60 gap-1">
            <span>
              {metrics.dailyAllowanceAfter < 50
                ? 'Leaves under ₹50/day for daily transit and tea snacks.'
                : 'Tightens discretionary daily consumption budget.'}
            </span>
            <button
              onClick={() => onOpenMath('allowance')}
              aria-label="View math formula for daily allowance reduction"
              className="font-label-caps text-[10px] text-[#17173d] hover:underline cursor-pointer font-bold focus-visible:ring-1 focus-visible:ring-[#17173d]"
            >
              MATH: ({metrics.liquidBalanceAfter} - 3,848 Bills) ÷ 18
            </button>
          </div>
        </div>

        {/* Row 3: Goal Commitment: Goa Trip */}
        <div className="bg-[#f1f3fd] p-3 rounded-lg hover:bg-[#ebedf7] transition-colors border border-[#e0e2ec]/60">
          <div className="flex items-center justify-between mb-1">
            <span className="font-label-caps text-[10px] text-[#47464e]">
              3. GOAL COMMITMENT: GOA TRIP
            </span>
            <span
              className={`px-1.5 py-0.2 rounded font-label-caps text-[10px] ${
                metrics.goaDaysSlip > 0
                  ? 'bg-[#ffdad6] text-[#93000a]'
                  : 'bg-[#dce1fc] text-[#141b2e]'
              }`}
            >
              {metrics.goaDaysSlip > 0 ? 'STATUS: BEHIND' : 'STATUS: ON TRACK'}
            </span>
          </div>
          <div className="flex items-baseline justify-between font-ledger-num-md mb-1">
            <span className="text-[#181c23] text-[14px] sm:text-[15px]">Target Day 30</span>
            <span
              className="material-symbols-outlined text-[16px] text-[#47464e]"
              aria-hidden="true"
            >
              arrow_forward
            </span>
            <span
              className={`font-bold text-[16px] sm:text-[18px] ${
                metrics.goaDaysSlip > 0 ? 'text-[#ba1a1a]' : 'text-[#2c6b1e]'
              }`}
            >
              Day {metrics.goaTargetDayAfter}{' '}
              {metrics.goaDaysSlip > 0 ? `(+${metrics.goaDaysSlip} Days)` : ''}
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-between font-body-sm text-[11px] text-[#47464e] pt-1 border-t border-[#e0e2ec]/60 gap-1">
            <span>
              {metrics.goaDaysSlip > 0
                ? 'Freezes automatic ₹50 daily SIP vault contribution.'
                : 'Continues steady ₹50 daily automated vault contributions.'}
            </span>
            <button
              onClick={() => onOpenMath('goal')}
              aria-label="View math formula for Goa trip goal slip calculation"
              className="font-label-caps text-[10px] text-[#17173d] hover:underline cursor-pointer font-bold focus-visible:ring-1 focus-visible:ring-[#17173d]"
            >
              MATH: ₹{Math.max(0, -metrics.monthEndForecastAfter)} deficit ÷ ₹50/d
            </button>
          </div>
        </div>

        {/* Row 4: Month-End Forecast */}
        <div className="bg-[#f1f3fd] p-3 rounded-lg hover:bg-[#ebedf7] transition-colors border border-[#e0e2ec]/60">
          <div className="flex items-center justify-between mb-1">
            <span className="font-label-caps text-[10px] text-[#47464e]">
              4. MONTH-END DAY 30 FORECAST
            </span>
            <span
              className={`px-1.5 py-0.2 rounded font-label-caps text-[10px] ${
                metrics.isDeficit
                  ? 'bg-[#ffdad6] text-[#93000a]'
                  : 'bg-[#a6e34b]/30 text-[#2c6b1e]'
              }`}
            >
              {metrics.isDeficit
                ? `ZERO DAY ${metrics.collapseDay || 16}`
                : 'SURPLUS SECURE'}
            </span>
          </div>
          <div className="flex items-baseline justify-between font-ledger-num-md mb-1">
            <span className="text-[#181c23] text-[14px] sm:text-[15px]">
              +₹{metrics.monthEndForecastBefore} spare clearance
            </span>
            <span
              className="material-symbols-outlined text-[16px] text-[#47464e]"
              aria-hidden="true"
            >
              arrow_forward
            </span>
            <span
              className={`font-bold text-[16px] sm:text-[18px] ${
                metrics.isDeficit ? 'text-[#ba1a1a]' : 'text-[#2c6b1e]'
              }`}
            >
              {metrics.monthEndForecastAfter >= 0 ? '+' : ''}₹
              {metrics.monthEndForecastAfter.toLocaleString('en-IN')}{' '}
              {metrics.isDeficit ? 'deficit' : 'buffer'}
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-between font-body-sm text-[11px] text-[#47464e] pt-1 border-t border-[#e0e2ec]/60 gap-1">
            <span>Cannot service Phone EMI (₹1,200) due on Day 25 without shortfall.</span>
            <button
              onClick={() => onOpenMath('forecast')}
              aria-label="View math formula for month-end forecast calculation"
              className="font-label-caps text-[10px] text-[#17173d] hover:underline cursor-pointer font-bold focus-visible:ring-1 focus-visible:ring-[#17173d]"
            >
              MATH: {metrics.monthEndForecastBefore} - {expenseAmount}
            </button>
          </div>
        </div>

        {/* Row 5: Volatility Risk Index */}
        <div className="bg-[#f1f3fd] p-3 rounded-lg hover:bg-[#ebedf7] transition-colors border border-[#e0e2ec]/60">
          <div className="flex items-center justify-between mb-1">
            <span className="font-label-caps text-[10px] text-[#47464e]">
              5. VOLATILITY RISK INDEX
            </span>
            <span className="px-1.5 py-0.2 rounded bg-[#ffdad6] text-[#93000a] font-label-caps text-[10px]">
              +{metrics.volatilityIndexAfter - metrics.volatilityIndexBefore} PTS SPIKE
            </span>
          </div>
          <div className="flex items-baseline justify-between font-ledger-num-md mb-1">
            <span className="text-[#181c23] text-[14px] sm:text-[15px]">
              {metrics.volatilityIndexBefore} (Watch)
            </span>
            <span
              className="material-symbols-outlined text-[16px] text-[#47464e]"
              aria-hidden="true"
            >
              arrow_forward
            </span>
            <span
              className={`font-bold text-[16px] sm:text-[18px] ${
                metrics.volatilityIndexAfter > 70 ? 'text-[#ba1a1a]' : 'text-[#7a5a00]'
              }`}
            >
              {metrics.volatilityIndexAfter}{' '}
              {metrics.volatilityIndexAfter > 70 ? '(Danger Zone)' : '(Elevated)'}
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-between font-body-sm text-[11px] text-[#47464e] pt-1 border-t border-[#e0e2ec]/60 gap-1">
            <span>Exposes household to 0% shock buffer for emergency bills.</span>
            <button
              onClick={() => onOpenMath('volatility')}
              aria-label="View math formula for volatility risk index"
              className="font-label-caps text-[10px] text-[#17173d] hover:underline cursor-pointer font-bold focus-visible:ring-1 focus-visible:ring-[#17173d]"
            >
              MATH: Unbuffered ratio = {(expenseAmount / 2650).toFixed(2)}
            </button>
          </div>
        </div>

        {/* Row 6: Financial Health Index */}
        <div className="bg-[#f1f3fd] p-3 rounded-lg hover:bg-[#ebedf7] transition-colors border border-[#e0e2ec]/60">
          <div className="flex items-center justify-between mb-1">
            <span className="font-label-caps text-[10px] text-[#47464e]">
              6. FINANCIAL HEALTH INDEX
            </span>
            <span className="px-1.5 py-0.2 rounded bg-[#ffdad6] text-[#93000a] font-label-caps text-[10px]">
              -{metrics.healthIndexBefore - metrics.healthIndexAfter} PTS DROP
            </span>
          </div>
          <div className="flex items-baseline justify-between font-ledger-num-md mb-1">
            <span className="text-[#181c23] text-[14px] sm:text-[15px]">
              {metrics.healthIndexBefore} (Solid Clearance)
            </span>
            <span
              className="material-symbols-outlined text-[16px] text-[#47464e]"
              aria-hidden="true"
            >
              arrow_forward
            </span>
            <span
              className={`font-bold text-[16px] sm:text-[18px] ${
                metrics.healthIndexAfter < 50 ? 'text-[#ba1a1a]' : 'text-[#7a5a00]'
              }`}
            >
              {metrics.healthIndexAfter}{' '}
              {metrics.healthIndexAfter < 50 ? '(Stretched)' : '(Guarded)'}
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-between font-body-sm text-[11px] text-[#47464e] pt-1 border-t border-[#e0e2ec]/60 gap-1">
            <span>Violates fundamental 30-day velocity discipline rule.</span>
            <button
              onClick={() => onOpenMath('health')}
              aria-label="View math formula for financial health index"
              className="font-label-caps text-[10px] text-[#17173d] hover:underline cursor-pointer font-bold focus-visible:ring-1 focus-visible:ring-[#17173d]"
            >
              MATH: Weighted score index
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Action Suite */}
      <div className="mt-4 pt-3 border-t border-[#e0e2ec] space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={onTryAlternative}
            className="w-full py-2.5 min-h-[44px] rounded bg-[#ebedf7] text-[#181c23] font-label-caps text-[11px] font-bold hover:bg-[#e0e2ec] transition-colors cursor-pointer border border-[#e0e2ec] focus-visible:ring-2 focus-visible:ring-[#17173d]"
          >
            TRY ALTERNATIVE PACK
          </button>

          <button
            onClick={handleCommitClick}
            aria-label={
              isCommitted
                ? `Committed expense. Click to undo within ${countdown} seconds.`
                : 'Lock simulated expense into real cashflow ledger'
            }
            className={`w-full py-2.5 min-h-[44px] rounded font-label-caps text-[11px] font-bold transition-all cursor-pointer shadow-xs active:scale-98 relative overflow-hidden focus-visible:ring-2 focus-visible:ring-[#17173d] ${
              isCommitted
                ? 'bg-[#17173d] text-white hover:bg-[#17173d]/90'
                : 'bg-[#ba1a1a] text-white hover:opacity-90'
            }`}
          >
            {isCommitted ? (
              <span className="flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#a6e34b] animate-ping" aria-hidden="true" />
                COMMITTED · UNDO ({countdown}s)
              </span>
            ) : (
              'LOCK IT IN ANYWAY'
            )}

            {/* Countdown line indicator */}
            {isCommitted && countdown > 0 && (
              <div
                className="absolute bottom-0 left-0 h-1 bg-[#a6e34b] transition-all duration-1000 ease-linear"
                style={{ width: `${(countdown / 8) * 100}%` }}
              />
            )}
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between text-[#47464e] font-label-sm text-[11px] px-1 gap-1">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
              history
            </span>
            Includes an 8-second instant undo buffer window.
          </span>
          <span>Encrypted local ledger state</span>
        </div>
      </div>
    </div>
  );
};
