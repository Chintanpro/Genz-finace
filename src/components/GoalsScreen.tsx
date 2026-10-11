/**
 * @file src/components/GoalsScreen.tsx
 * @description Sinking fund capital vaults, adjustable SIP sliders, and slip predictions.
 */

import React, { useState } from 'react';
import { INITIAL_GOALS } from '../constants';

interface GoalsScreenProps {
  onNavigateToLab: () => void;
  goaDaysSlip: number;
}

export const GoalsScreen: React.FC<GoalsScreenProps> = ({
  onNavigateToLab,
  goaDaysSlip,
}) => {
  const [goals, setGoals] = useState(INITIAL_GOALS);

  const handleUpdateSip = (id: string, newSip: number) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, dailySip: newSip } : g))
    );
  };

  return (
    <div
      role="tabpanel"
      id="panel-goals"
      aria-labelledby="tab-goals"
      className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6 animate-fadeIn"
    >
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#ffffff] p-5 rounded-xl border border-[#e0e2ec] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-[#e2dfff] text-[#17173d] font-label-caps text-[10px] font-bold">
              CAPITAL VAULTS ACTIVE
            </span>
            <span className="text-[#47464e] font-body-sm text-[12px]" aria-hidden="true">
              ·
            </span>
            <span className="text-[#47464e] font-label-caps text-[10px]">
              DAILY AUTOMATED SIP ENGINE
            </span>
          </div>
          <h1 className="font-headline-lg text-[22px] sm:text-[26px] text-[#181c23] tracking-tight">
            Target Goals & Sinking Funds
          </h1>
          <p className="font-body-md text-[13px] text-[#47464e] mt-1 max-w-2xl">
            Sinking fund vaults receive micro-deposits every day to fund future expeditions and emergency
            cushions without accumulating debt. Large discretionary splurges instantly freeze these streams.
          </p>
        </div>

        <button
          onClick={onNavigateToLab}
          className="flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded bg-[#17173d] text-white font-label-caps text-[11px] font-bold hover:bg-[#000000] transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#17173d]"
        >
          <span>TEST GOAL IMPACT</span>
        </button>
      </div>

      {/* Goals Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {goals.map((goal) => {
          const isGoa = goal.id === 'goal-goa';
          const effectiveProjectedDay = isGoa
            ? goal.targetDay + goaDaysSlip
            : goal.projectedDay;
          const progressPct = Math.min(
            100,
            Math.round((goal.currentAmount / goal.targetAmount) * 100)
          );

          return (
            <article
              key={goal.id}
              aria-label={`${goal.name}: Saved ₹${goal.currentAmount} of ₹${goal.targetAmount}`}
              className="bg-[#ffffff] rounded-xl p-5 border border-[#e0e2ec] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: goal.color }}
                    aria-hidden="true"
                  />
                  <span
                    className={`px-2 py-0.5 rounded font-label-caps text-[9px] font-bold ${
                      isGoa && goaDaysSlip > 0
                        ? 'bg-[#ffdad6] text-[#93000a]'
                        : 'bg-[#dce1fc] text-[#141b2e]'
                    }`}
                  >
                    {isGoa && goaDaysSlip > 0
                      ? `SLIPPED BY +${goaDaysSlip} DAYS`
                      : 'ON SCHEDULE'}
                  </span>
                </div>

                <h2 className="font-headline-sm text-[18px] text-[#181c23] mb-1">
                  {goal.name}
                </h2>

                <div className="flex items-baseline justify-between mb-3">
                  <span className="font-display-lg text-[22px] sm:text-[24px] text-[#181c23] font-bold tabular-numbers">
                    ₹{goal.currentAmount.toLocaleString('en-IN')}{' '}
                    <span className="text-[13px] font-normal text-[#47464e]">
                      / ₹{goal.targetAmount.toLocaleString('en-IN')}
                    </span>
                  </span>
                  <span className="font-label-caps text-[11px] text-[#47464e] font-bold">
                    {progressPct}%
                  </span>
                </div>

                {/* Progress bar */}
                <div
                  role="progressbar"
                  aria-label={`${goal.name} progress`}
                  aria-valuenow={progressPct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  className="w-full h-2.5 bg-[#e6e8f2] rounded-full overflow-hidden mb-4"
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${progressPct}%`,
                      backgroundColor: goal.color,
                    }}
                  />
                </div>

                {/* Micro info */}
                <div className="space-y-2 bg-[#f1f3fd] p-3 rounded-lg border border-[#e0e2ec] text-[12px] mb-4">
                  <div className="flex justify-between">
                    <span className="text-[#47464e]">Target Day:</span>
                    <span className="font-semibold text-[#181c23]">
                      Day {goal.targetDay}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#47464e]">Projected Completion:</span>
                    <span
                      className={`font-bold ${
                        isGoa && goaDaysSlip > 0 ? 'text-[#ba1a1a]' : 'text-[#2c6b1e]'
                      }`}
                    >
                      Day {effectiveProjectedDay}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#47464e]">Daily Auto-Save SIP:</span>
                    <span className="font-bold text-[#181c23]">
                      ₹{goal.dailySip} / day
                    </span>
                  </div>
                </div>
              </div>

              {/* Slider for Daily SIP */}
              <div>
                <div className="flex justify-between font-label-caps text-[10px] text-[#47464e] mb-1">
                  <label htmlFor={`sip-slider-${goal.id}`}>ADJUST DAILY SIP RATE</label>
                  <span className="font-bold text-[#181c23]">₹{goal.dailySip}/d</span>
                </div>
                <input
                  id={`sip-slider-${goal.id}`}
                  type="range"
                  min="20"
                  max="150"
                  step="10"
                  value={goal.dailySip}
                  aria-label={`Adjust daily auto-save rate for ${goal.name}`}
                  aria-valuemin={20}
                  aria-valuemax={150}
                  aria-valuenow={goal.dailySip}
                  onChange={(e) => handleUpdateSip(goal.id, Number(e.target.value))}
                  className="w-full h-3 bg-[#e6e8f2] rounded appearance-none cursor-pointer accent-[#17173d] focus-visible:ring-2 focus-visible:ring-[#17173d]"
                />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
