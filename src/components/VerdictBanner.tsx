/**
 * @file src/components/VerdictBanner.tsx
 * @description Accessible verdict alert banner announcing cashflow runway integrity.
 */

import React from 'react';
import { ConsequenceMetrics } from '../types';

interface VerdictBannerProps {
  metrics: ConsequenceMetrics;
}

export const VerdictBanner: React.FC<VerdictBannerProps> = ({ metrics }) => {
  const isRed = metrics.verdict === 'RED';
  const isAmber = metrics.verdict === 'AMBER';

  const daysLost = metrics.collapseDay ? Math.max(0, 30 - metrics.collapseDay) : 0;
  const dropPercent = Math.round(
    ((metrics.dailyAllowanceBefore - metrics.dailyAllowanceAfter) /
      metrics.dailyAllowanceBefore) *
      100
  );

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-label={`Runway Verdict: ${metrics.verdict}`}
      className={`rounded-xl p-4 sm:p-5 shadow-xs border transition-colors ${
        isRed
          ? 'bg-[#ffdad6] text-[#93000a] border-[#ffdad6]'
          : isAmber
          ? 'bg-[#ffc83d]/20 text-[#7a5a00] border-[#ffc83d]/40'
          : 'bg-[#a6e34b]/20 text-[#2c6b1e] border-[#a6e34b]/40'
      }`}
    >
      {/* Top Tag Row */}
      <div className="flex items-center justify-between pb-1.5 mb-1.5">
        <div className="flex items-center gap-2">
          <span
            className={`material-symbols-outlined text-[24px] ${
              isRed ? 'text-[#ba1a1a]' : isAmber ? 'text-[#b27b00]' : 'text-[#2c6b1e]'
            }`}
            aria-hidden="true"
          >
            explore
          </span>
          <span
            className={`font-headline-sm text-[16px] sm:text-[18px] tracking-tight font-extrabold uppercase ${
              isRed ? 'text-[#ba1a1a]' : isAmber ? 'text-[#b27b00]' : 'text-[#2c6b1e]'
            }`}
          >
            VERDICT: {metrics.verdict}
          </span>
        </div>

        <span
          className={`px-2 py-0.5 rounded font-label-caps text-[9px] sm:text-[10px] text-white font-bold ${
            isRed ? 'bg-[#ba1a1a]' : isAmber ? 'bg-[#b27b00]' : 'bg-[#2c6b1e]'
          }`}
        >
          {isRed
            ? 'RUNWAY SEVERED'
            : isAmber
            ? 'RUNWAY RESTRICTED'
            : 'RUNWAY CLEAR'}
        </span>
      </div>

      {/* Primary Verdict Announcement */}
      <div className="font-display-lg text-[18px] sm:text-[22px] leading-tight text-[#181c23] font-extrabold mb-3">
        {isRed
          ? `Money runs out completely on Day ${metrics.collapseDay || 16}.`
          : isAmber
          ? 'Runway survives but burns safety margins dangerously low.'
          : 'Runway remains fully cleared through Day 30.'}
      </div>

      {/* 3 Impact Bullets in Surface Box */}
      <div className="space-y-2 bg-[#ffffff]/85 backdrop-blur-xs p-3 rounded-lg border border-[#e0e2ec]/60 shadow-xs">
        {/* Bullet 1 */}
        <div className="flex items-start gap-2.5">
          <span
            className={`material-symbols-outlined text-[16px] mt-0.5 shrink-0 ${
              isRed ? 'text-[#ba1a1a]' : isAmber ? 'text-[#b27b00]' : 'text-[#2c6b1e]'
            }`}
            aria-hidden="true"
          >
            {isRed ? 'cancel' : isAmber ? 'warning' : 'check_circle'}
          </span>
          <p className="font-body-md text-[12px] sm:text-[13px] text-[#181c23]">
            {isRed ? (
              <>
                <span className="font-bold">Breaks runway by {daysLost} days</span> before
                Day 30 finish line.
              </>
            ) : isAmber ? (
              <>
                <span className="font-bold">Consumes 85% of buffer</span> leaving emergency margin vulnerable.
              </>
            ) : (
              <>
                <span className="font-bold">Full 30-day runway preserved</span> with healthy buffer intact.
              </>
            )}
          </p>
        </div>

        {/* Bullet 2 */}
        <div className="flex items-start gap-2.5">
          <span
            className={`material-symbols-outlined text-[16px] mt-0.5 shrink-0 ${
              isRed ? 'text-[#ba1a1a]' : isAmber ? 'text-[#b27b00]' : 'text-[#2c6b1e]'
            }`}
            aria-hidden="true"
          >
            trending_down
          </span>
          <p className="font-body-md text-[12px] sm:text-[13px] text-[#181c23]">
            <span className="font-bold">
              Daily allowance drops by {Math.max(0, dropPercent)}%
            </span>{' '}
            from ₹{metrics.dailyAllowanceBefore} to just ₹{metrics.dailyAllowanceAfter}/day.
          </p>
        </div>

        {/* Bullet 3 */}
        <div className="flex items-start gap-2.5">
          <span
            className={`material-symbols-outlined text-[16px] mt-0.5 shrink-0 ${
              isRed ? 'text-[#ba1a1a]' : isAmber ? 'text-[#b27b00]' : 'text-[#2c6b1e]'
            }`}
            aria-hidden="true"
          >
            {metrics.goaDaysSlip > 0 ? 'event_busy' : 'event_available'}
          </span>
          <p className="font-body-md text-[12px] sm:text-[13px] text-[#181c23]">
            {metrics.goaDaysSlip > 0 ? (
              <>
                <span className="font-bold">
                  Goa Trip auto-save slips by {metrics.goaDaysSlip} days
                </span>{' '}
                beyond original date (Target Day {metrics.goaTargetDayAfter}).
              </>
            ) : (
              <>
                <span className="font-bold">Goa Trip auto-save stays on track</span> for Day 30 completion.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
