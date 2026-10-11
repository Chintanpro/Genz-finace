/**
 * @file src/components/MathDetailModal.tsx
 * @description Accessible derivation inspector modal with keyboard dismissal.
 */

import React, { useEffect } from 'react';
import { ConsequenceMetrics } from '../types';

interface MathDetailModalProps {
  formulaKey: string | null;
  onClose: () => void;
  metrics: ConsequenceMetrics;
  expenseAmount: number;
}

export const MathDetailModal: React.FC<MathDetailModalProps> = ({
  formulaKey,
  onClose,
  metrics,
  expenseAmount,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && formulaKey) {
        onClose();
      }
    };
    if (formulaKey) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [formulaKey, onClose]);

  if (!formulaKey) return null;

  const getFormulaDetails = () => {
    switch (formulaKey) {
      case 'liquid':
        return {
          title: 'Liquid Balance Derivation',
          formula: `Opening Liquid (D12) - Simulated Expense = Closing Liquid`,
          equation: `₹${metrics.liquidBalanceBefore.toLocaleString('en-IN')} - ₹${expenseAmount.toLocaleString('en-IN')} = ₹${metrics.liquidBalanceAfter.toLocaleString('en-IN')}`,
          explanation:
            'Liquid balance represents all immediate deployable capital stored in primary operational vaults. Because this transaction settles in real time on Day 12, the entire principal is deducted instantaneously from the active cash envelope.',
          takeaway:
            'You lose immediate cash cushion before any pending mid-month obligations take effect.',
        };
      case 'allowance':
        return {
          title: 'Daily Allowance Velocity Formula',
          formula: `(Closing Liquid - Committed Fixed Bills) ÷ Remaining Expedition Days`,
          equation: `(₹${metrics.liquidBalanceAfter.toLocaleString('en-IN')} - ₹3,848) ÷ 18 days = ₹${metrics.dailyAllowanceAfter} / day`,
          explanation:
            'Daily allowance is the true sovereign daily speed limit. It protects your ability to eat, commute, and survive without defaulting on fixed bills (Gym ₹499, AI tool ₹399, Phone EMI ₹1,200, Broadband ₹799, etc.).',
          takeaway: `Your daily spending tolerance drops from ₹168/day to ₹${metrics.dailyAllowanceAfter}/day (-${Math.round(((metrics.dailyAllowanceBefore - metrics.dailyAllowanceAfter) / metrics.dailyAllowanceBefore) * 100)}%), which is below typical subsistence transit and meal costs.`,
        };
      case 'goal':
        return {
          title: 'Goal Commitment Slip Calculation',
          formula: `Unfunded Month-End Deficit ÷ Daily SIP Vault Contribution`,
          equation: `₹${Math.max(0, -metrics.monthEndForecastAfter).toLocaleString('en-IN')} Deficit ÷ ₹50/day = +${metrics.goaDaysSlip} Days Delay`,
          explanation:
            'The Goa Trip vault relies on a disciplined ₹50/day automated transfer. When an unplanned expense forces an unbuffered deficit, the engine automatically halts the SIP stream to avoid overdrafting your primary account.',
          takeaway: `Your vacation fund slips by ${metrics.goaDaysSlip} days, pushing your completion date from Day 30 to Day ${metrics.goaTargetDayAfter}.`,
        };
      case 'forecast':
        return {
          title: 'Month-End Day 30 Clearance Forecast',
          formula: `Baseline Month-End Surplus - Immediate Liquidation Amount`,
          equation: `+₹${metrics.monthEndForecastBefore} - ₹${expenseAmount.toLocaleString('en-IN')} = -₹${Math.abs(metrics.monthEndForecastAfter).toLocaleString('en-IN')} Deficit`,
          explanation:
            'Baseline clearance projected a tight but positive safety cushion (+₹104) at midnight on Day 30. Subtracting the simulated expense flips the polarity into an unfunded deficit hole that will cause failure on Day 25 when the Phone EMI debits.',
          takeaway: `You run out of operational liquidity on Day ${metrics.collapseDay || 16}, leaving 14 days of unprotected commitments.`,
        };
      case 'volatility':
        return {
          title: 'Volatility Risk Index (VRI) Matrix',
          formula: `Baseline Risk + (Expense ÷ Total Budget × Sensitivity Multiplier)`,
          equation: `38 + (₹${expenseAmount.toLocaleString('en-IN')} ÷ ₹10,000 × 175) = ${metrics.volatilityIndexAfter} (Danger Zone)`,
          explanation:
            'VRI measures your vulnerability to unforeseen fiscal shock events (such as medical needs, auto repairs, or delayed client invoices). An unbuffered ratio above 0.8 leaves virtually 0% room for error.',
          takeaway: `At ${metrics.volatilityIndexAfter} pts, any unanticipated cost exceeding ₹200 triggers immediate systemic default.`,
        };
      case 'health':
        return {
          title: 'Financial Health Index (FHI)',
          formula: `Weighted Composite: Runway Velocity (40%) + Buffer Health (35%) + Debt Discipline (25%)`,
          equation: `72 (Solid Clearance) - ${metrics.healthIndexBefore - metrics.healthIndexAfter} pts = ${metrics.healthIndexAfter} (Stretched)`,
          explanation:
            'FHI evaluates whole-system financial resilience across the 30-day expedition velocity envelope. A score below 50 indicates acute financial fragility and structural stress.',
          takeaway: `Scores in the 40s signal that discretionary impulse purchases are cannibalizing baseline obligations.`,
        };
      default:
        return {
          title: 'Ledger Arithmetic Breakdown',
          formula: 'Standard Cashflow Variance Calculation',
          equation: 'Variance = Inflows - Outflows - Committed Escrows',
          explanation: 'All calculations enforce zero-sum cash envelope arithmetic.',
          takeaway: 'Every rupee spent must correspond to a reduction in another envelope.',
        };
    }
  };

  const details = getFormulaDetails();

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="math-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#17173d]/60 backdrop-blur-xs animate-fadeIn"
    >
      <div className="bg-[#ffffff] rounded-xl max-w-lg w-full p-4 sm:p-5 shadow-xl border border-[#e0e2ec]">
        <div className="flex items-center justify-between pb-3 border-b border-[#e0e2ec]">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[#17173d] text-[20px]"
              aria-hidden="true"
            >
              calculate
            </span>
            <h3 id="math-dialog-title" className="font-headline-sm text-[17px] text-[#181c23]">
              {details.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Math Breakdown dialog"
            className="w-7 h-7 rounded-full bg-[#f1f3fd] hover:bg-[#e0e2ec] text-[#181c23] flex items-center justify-center font-bold text-sm cursor-pointer focus-visible:ring-2 focus-visible:ring-[#17173d]"
          >
            ✕
          </button>
        </div>

        <div className="py-4 space-y-3">
          <div className="p-3 bg-[#f1f3fd] rounded-lg border border-[#e0e2ec]">
            <span className="font-label-caps text-[9px] text-[#47464e] block mb-1">
              MATHEMATICAL FORMULA
            </span>
            <div className="font-mono text-[12px] text-[#17173d] font-semibold break-all">
              {details.formula}
            </div>
          </div>

          <div className="p-3 bg-[#ebedf7] rounded-lg border border-[#c8c5cf]">
            <span className="font-label-caps text-[9px] text-[#47464e] block mb-1">
              CURRENT VARIABLE REGISTRATION
            </span>
            <div className="font-ledger-num-md text-[14px] text-[#ba1a1a] font-bold">
              {details.equation}
            </div>
          </div>

          <div>
            <h4 className="font-label-caps text-[10px] text-[#181c23] mb-1">
              LEDGER RATIONALE
            </h4>
            <p className="font-body-sm text-[12px] text-[#47464e] leading-relaxed">
              {details.explanation}
            </p>
          </div>

          <div className="p-2.5 rounded bg-[#ffdad6]/60 border border-[#ffdad6] text-[#93000a]">
            <span className="font-label-caps text-[9px] font-bold block mb-0.5">
              CRITICAL TAKEAWAY
            </span>
            <p className="font-body-sm text-[12px] font-medium leading-normal">
              {details.takeaway}
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-[#e0e2ec] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 min-h-[36px] rounded bg-[#17173d] text-white font-label-caps text-[10px] hover:opacity-90 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#17173d]"
          >
            DISMISS BREAKDOWN
          </button>
        </div>
      </div>
    </div>
  );
};
