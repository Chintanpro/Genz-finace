/**
 * @file src/components/ExperimentParameters.tsx
 * @description Experiment parameters input calibration sandbox with accessible slider and presets.
 */

import React, { useState } from 'react';
import { PRESET_EXPENSES } from '../constants';

interface ExperimentParametersProps {
  expenseName: string;
  expenseAmount: number;
  expenseCategory: string;
  expenseType: string;
  executionDay: number;
  onUpdateAmount: (amount: number) => void;
  onUpdateExecutionDay: (day: number) => void;
  onSelectPreset: (presetId: string) => void;
  onUpdateDetails: (name: string, category: string) => void;
}

export const ExperimentParameters: React.FC<ExperimentParametersProps> = ({
  expenseName,
  expenseAmount,
  expenseCategory,
  expenseType,
  executionDay,
  onUpdateAmount,
  onUpdateExecutionDay,
  onSelectPreset,
  onUpdateDetails,
}) => {
  const [showPresetsMenu, setShowPresetsMenu] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [customName, setCustomName] = useState(expenseName);

  const handleSaveName = () => {
    if (customName.trim()) {
      onUpdateDetails(customName.trim(), expenseCategory);
    }
    setIsEditingName(false);
  };

  const timelineDays = [
    { day: 10, label: 'D10', type: 'past' },
    { day: 11, label: 'D11', type: 'past' },
    { day: 12, label: 'D12 ACTIVE', type: 'today' },
    { day: 13, label: 'D13', type: 'future' },
    { day: 14, label: 'D14', type: 'future' },
    { day: 15, label: 'D15 BILL', type: 'bill' },
    { day: 16, label: 'D16 CRASH', type: 'crash' },
    { day: 17, label: 'D17', type: 'future' },
    { day: 21, label: 'D21 PAYOUT', type: 'bill' },
  ];

  return (
    <div
      role="region"
      aria-labelledby="experiment-heading"
      className="bg-[#ffffff] rounded-xl p-4 sm:p-5 shadow-xs border border-[#e0e2ec]"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#e0e2ec]/70">
        <span
          id="experiment-heading"
          className="font-label-caps text-[10px] text-[#47464e] tracking-wider"
        >
          EXPERIMENT PARAMETERS
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowPresetsMenu(!showPresetsMenu)}
            aria-expanded={showPresetsMenu}
            aria-haspopup="true"
            className="px-2 py-1 min-h-[32px] rounded bg-[#f1f3fd] hover:bg-[#e0e2ec] text-[#181c23] font-label-caps text-[9px] cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-[#17173d]"
          >
            SELECT PRESET ▾
          </button>
          <span className="px-2 py-0.5 rounded bg-[#ebedf7] text-[#181c23] font-label-caps text-[10px]">
            SIM-SESSION #881
          </span>
        </div>
      </div>

      {/* Preset selection drawer/popover */}
      {showPresetsMenu && (
        <div
          role="menu"
          aria-label="Preset expenses"
          className="mb-4 p-3 bg-[#f1f3fd] rounded-lg border border-[#e0e2ec] animate-fadeIn"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-caps text-[10px] text-[#47464e]">
              CHOOSE A SAMPLE EXPENSE
            </span>
            <button
              onClick={() => setShowPresetsMenu(false)}
              className="text-[#47464e] hover:text-[#181c23] text-xs cursor-pointer font-bold p-1"
              aria-label="Close preset menu"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto">
            {PRESET_EXPENSES.map((preset) => (
              <button
                key={preset.id}
                role="menuitem"
                onClick={() => {
                  onSelectPreset(preset.id);
                  setCustomName(preset.name);
                  setShowPresetsMenu(false);
                }}
                className="text-left p-2 rounded bg-[#ffffff] hover:bg-[#dce1fc] border border-[#e0e2ec] transition-colors cursor-pointer group focus-visible:ring-2 focus-visible:ring-[#17173d]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[12px] sm:text-[13px] font-semibold text-[#181c23] group-hover:text-[#17173d]">
                    {preset.name}
                  </span>
                  <span className="font-ledger-num-md text-[12px] sm:text-[13px] font-bold text-[#ba1a1a]">
                    ₹{preset.amount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="text-[10px] sm:text-[11px] text-[#47464e] mt-0.5 line-clamp-1">
                  {preset.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Title & Amount Display */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          {isEditingName ? (
            <div className="flex items-center gap-2 mb-1">
              <label htmlFor="edit-expense-name" className="sr-only">
                Edit expense title
              </label>
              <input
                id="edit-expense-name"
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="font-headline-md text-[18px] sm:text-[20px] text-[#181c23] border-b-2 border-[#17173d] bg-transparent outline-none max-w-[200px]"
                autoFocus
              />
              <button
                onClick={handleSaveName}
                className="px-2 py-0.5 rounded bg-[#17173d] text-white font-label-caps text-[10px] cursor-pointer"
              >
                SAVE
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 group">
              <h2 className="font-headline-md text-[20px] sm:text-[22px] text-[#181c23] leading-tight">
                {expenseName}
              </h2>
              <button
                onClick={() => setIsEditingName(true)}
                title="Edit expense name"
                className="text-[#47464e] hover:text-[#181c23] opacity-60 group-hover:opacity-100 cursor-pointer p-1"
                aria-label={`Edit expense name: ${expenseName}`}
              >
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                  edit
                </span>
              </button>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-1.5 mt-1">
            <span className="px-2 py-0.5 rounded bg-[#e6e8f2] text-[#181c23] font-label-caps text-[10px]">
              {expenseCategory}
            </span>
            <span className="px-2 py-0.5 rounded bg-[#f1f3fd] text-[#47464e] font-label-caps text-[10px]">
              {expenseType}
            </span>
          </div>
        </div>

        <div className="text-right">
          <span className="font-label-caps text-[10px] text-[#47464e] block tracking-wider">
            EXPENDITURE
          </span>
          <span className="font-display-lg text-[28px] sm:text-[32px] text-[#ba1a1a] font-extrabold tracking-tight tabular-numbers leading-none">
            ₹{expenseAmount.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Dynamic Calibration Range Slider */}
      <div className="space-y-1 mb-4">
        <div className="flex items-center justify-between font-label-caps text-[10px] text-[#47464e]">
          <label htmlFor="expense-amount-slider">SIMULATED VALUE</label>
          <span className="font-ledger-num-md text-[#181c23] font-semibold text-[12px]">
            ₹{expenseAmount.toLocaleString('en-IN')} of ₹10,000
          </span>
        </div>

        <input
          id="expense-amount-slider"
          type="range"
          min="100"
          max="5000"
          step="50"
          value={expenseAmount}
          aria-label="Simulated expenditure value"
          aria-valuemin={100}
          aria-valuemax={5000}
          aria-valuenow={expenseAmount}
          onChange={(e) => onUpdateAmount(Number(e.target.value))}
          className="w-full h-3 bg-[#e6e8f2] rounded-lg appearance-none cursor-pointer accent-[#17173d] focus-visible:ring-2 focus-visible:ring-[#17173d]"
        />

        {/* Reference Ticks */}
        <div className="relative pt-1">
          <div className="flex items-center justify-between font-label-sm text-[10px] sm:text-[11px] text-[#47464e]">
            <span>₹100</span>
            <span className="text-[#181c23] font-bold">Today's Allowance (₹168)</span>
            <span className="text-[#47464e]">Free-to-Spend (₹3,201)</span>
            <span>₹5,000</span>
          </div>
        </div>
      </div>

      {/* Timing Strip: Select Date of Injection */}
      <div className="bg-[#f1f3fd] p-3 rounded-lg mb-3 border border-[#e0e2ec]">
        <div className="flex items-center justify-between font-label-caps text-[10px] mb-1.5">
          <span className="text-[#47464e]">EXECUTION TIMELINE MOMENT</span>
          <span className="text-[#181c23] font-bold">
            DAY {executionDay} {executionDay === 12 ? '(TODAY)' : ''}
          </span>
        </div>

        <div
          role="radiogroup"
          aria-label="Select execution day"
          className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none"
        >
          {timelineDays.map((item) => {
            const isSelected = executionDay === item.day;
            return (
              <button
                key={item.day}
                role="radio"
                aria-checked={isSelected}
                onClick={() => onUpdateExecutionDay(item.day)}
                className={`px-2.5 py-1 min-h-[32px] rounded font-label-caps text-[10px] whitespace-nowrap transition-all cursor-pointer font-bold focus-visible:ring-2 focus-visible:ring-[#17173d] ${
                  isSelected
                    ? 'bg-[#000000] text-white shadow-xs scale-102'
                    : item.type === 'today'
                    ? 'bg-[#ffffff] text-[#181c23] border border-[#000000]'
                    : item.type === 'bill'
                    ? 'bg-[#cde5ff] text-[#001d32] hover:bg-[#95ccff]'
                    : item.type === 'crash'
                    ? 'bg-[#ffdad6] text-[#93000a] hover:bg-[#ffdad6]/80'
                    : 'bg-[#ffffff] text-[#47464e] hover:text-[#181c23]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fast Adjust Increment Pills */}
      <div className="flex flex-wrap items-center gap-1.5">
        {[
          { label: 'SET: ₹999', val: 999 },
          { label: 'SET: ₹1,500', val: 1500 },
          { label: 'SET: ₹2,499', val: 2499 },
          { label: 'SET: MAX (₹3,201)', val: 3201 },
        ].map((pill) => {
          const isCurrent = expenseAmount === pill.val;
          return (
            <button
              key={pill.val}
              onClick={() => onUpdateAmount(pill.val)}
              aria-label={`Set expenditure to ₹${pill.val}`}
              className={`px-2.5 py-1 min-h-[32px] rounded font-label-caps text-[10px] transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#17173d] ${
                isCurrent
                  ? 'bg-[#17173d] text-white font-bold'
                  : 'bg-[#ebedf7] text-[#181c23] hover:bg-[#e6e8f2]'
              }`}
            >
              {pill.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
