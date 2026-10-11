/**
 * @file src/components/BillsScreen.tsx
 * @description Committed bills ledger with accessible subscription pause toggles.
 */

import React from 'react';
import { BillItem } from '../types';

interface BillsScreenProps {
  bills: BillItem[];
  onTogglePauseBill: (billId: string) => void;
  onNavigateToLab: () => void;
}

export const BillsScreen: React.FC<BillsScreenProps> = ({
  bills,
  onTogglePauseBill,
  onNavigateToLab,
}) => {
  const totalUpcoming = bills
    .filter((b) => !b.isPaused && b.dueDay >= 12)
    .reduce((sum, b) => sum + b.amount, 0);

  const totalPaused = bills
    .filter((b) => b.isPaused)
    .reduce((sum, b) => sum + b.amount, 0);

  return (
    <div
      role="tabpanel"
      id="panel-bills-and-subscriptions"
      aria-labelledby="tab-bills-and-subscriptions"
      className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6 animate-fadeIn"
    >
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#ffffff] p-5 rounded-xl border border-[#e0e2ec] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-[#cde5ff] text-[#001d32] font-label-caps text-[10px] font-bold">
              18 BLUE TOKENS RESERVED
            </span>
            <span className="text-[#47464e] font-body-sm text-[12px]" aria-hidden="true">
              ·
            </span>
            <span className="text-[#47464e] font-label-caps text-[10px]">
              OBLIGATIONS LEDGER
            </span>
          </div>
          <h1 className="font-headline-lg text-[22px] sm:text-[26px] text-[#181c23] tracking-tight">
            Committed Bills & Subscriptions
          </h1>
          <p className="font-body-md text-[13px] text-[#47464e] mt-1 max-w-2xl">
            Fixed recurring obligations are automatically ring-fenced to safeguard your credit score
            and essential services. You can pause non-essential digital subscriptions to free up immediate
            runway tokens.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="font-label-caps text-[10px] text-[#47464e] block">
              UPCOMING OBLIGATIONS
            </span>
            <span className="font-display-lg text-[22px] sm:text-[26px] text-[#001d32] font-bold tabular-numbers">
              ₹{totalUpcoming.toLocaleString('en-IN')}
            </span>
          </div>
          {totalPaused > 0 && (
            <div className="text-right pl-3 border-l border-[#e0e2ec]">
              <span className="font-label-caps text-[10px] text-[#2c6b1e] block">
                FREED RUNWAY
              </span>
              <span className="font-display-lg text-[22px] sm:text-[26px] text-[#2c6b1e] font-bold tabular-numbers">
                +₹{totalPaused.toLocaleString('en-IN')}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bills Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bills.map((bill) => {
          const isPast = bill.dueDay < 12;
          return (
            <article
              key={bill.id}
              aria-label={`${bill.name}: ₹${bill.amount}`}
              className={`rounded-xl p-4 border transition-all ${
                bill.isPaused
                  ? 'bg-[#f1f3fd] border-dashed border-[#b9bed0] opacity-80'
                  : isPast
                  ? 'bg-[#ffffff] border-[#e0e2ec] opacity-60'
                  : 'bg-[#ffffff] border-[#e0e2ec] shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`px-2 py-0.5 rounded font-label-caps text-[9px] font-bold ${
                    isPast
                      ? 'bg-[#e6e8f2] text-[#47464e]'
                      : bill.isPaused
                      ? 'bg-[#ebedf7] text-[#47464e]'
                      : 'bg-[#cde5ff] text-[#001d32]'
                  }`}
                >
                  {isPast ? 'PAID ON D' + bill.dueDay : `DUE DAY ${bill.dueDay}`}
                </span>

                <span className="font-label-caps text-[10px] text-[#47464e]">
                  {bill.tokenCount} TOKENS
                </span>
              </div>

              <h2 className="font-headline-sm text-[16px] text-[#181c23] mb-1">
                {bill.name}
              </h2>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] text-[#47464e]">{bill.category}</span>
                <span className="text-[#47464e] text-xs" aria-hidden="true">
                  ·
                </span>
                <span
                  className={`text-[11px] font-semibold ${
                    bill.isPausable ? 'text-[#2c6b1e]' : 'text-[#ba1a1a]'
                  }`}
                >
                  {bill.isPausable ? 'Pausable Subscription' : 'Mandatory Obligation'}
                </span>
              </div>

              <div className="flex items-baseline justify-between pt-2 border-t border-[#e0e2ec] mb-3">
                <span className="font-label-caps text-[10px] text-[#47464e]">
                  BILL AMOUNT
                </span>
                <span className="font-display-lg text-[20px] sm:text-[22px] text-[#181c23] font-bold tabular-numbers">
                  ₹{bill.amount.toLocaleString('en-IN')}
                </span>
              </div>

              {bill.isPausable && !isPast && (
                <button
                  onClick={() => onTogglePauseBill(bill.id)}
                  aria-pressed={bill.isPaused}
                  aria-label={
                    bill.isPaused
                      ? `Resume subscription for ${bill.name}`
                      : `Pause subscription for ${bill.name} to free ₹${bill.amount}`
                  }
                  className={`w-full py-2.5 min-h-[44px] rounded font-label-caps text-[10px] font-bold transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#17173d] ${
                    bill.isPaused
                      ? 'bg-[#2c6b1e] text-white hover:bg-[#2c6b1e]/90'
                      : 'bg-[#ebedf7] text-[#181c23] hover:bg-[#e0e2ec]'
                  }`}
                >
                  {bill.isPaused ? `✓ PAUSED (FREES ₹${bill.amount})` : 'PAUSE FOR THIS CYCLE'}
                </button>
              )}

              {!bill.isPausable && !isPast && (
                <div className="w-full py-2 text-center bg-[#f1f3fd] text-[#47464e] font-label-caps text-[9px] rounded">
                  LOCKED PROTOCOL · MANDATORY DEBIT
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Mitigation Pack Callout */}
      <div className="bg-[#ebedf7] p-4 rounded-xl border border-[#c8c5cf] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className="material-symbols-outlined text-[#17173d] text-[24px]"
            aria-hidden="true"
          >
            bolt
          </span>
          <div>
            <h2 className="font-headline-sm text-[16px] text-[#181c23]">
              Need to free up runway tokens immediately?
            </h2>
            <p className="font-body-sm text-[12px] text-[#47464e]">
              Pausing the Cult Gym pass (₹499) and AI study tool (₹399) creates an instant ₹898 cushion
              extending your zero-runway crash point by 6 days.
            </p>
          </div>
        </div>

        <button
          onClick={onNavigateToLab}
          className="px-4 py-2.5 min-h-[44px] rounded bg-[#17173d] text-white font-label-caps text-[10px] font-bold hover:bg-[#000000] transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#17173d]"
        >
          SIMULATE IN WHAT-IF LAB
        </button>
      </div>
    </div>
  );
};
