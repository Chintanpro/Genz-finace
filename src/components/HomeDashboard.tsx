import React from 'react';
import { BASELINE_EXPEDITION } from '../mockData';

export interface LedgerEntry {
  id: string;
  day: string;
  desc: string;
  cat: string;
  amt: number;
  isCommitted?: boolean;
}

interface HomeDashboardProps {
  onNavigateToLab: () => void;
  currentDay: number;
  liquidBalance: number;
  ledgerItems: LedgerEntry[];
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  onNavigateToLab,
  currentDay,
  liquidBalance,
  ledgerItems,
}) => {
  const freeToSpend = Math.max(0, liquidBalance - 3848);
  const spentTotal = Math.max(0, BASELINE_EXPEDITION.totalBudget - liquidBalance);

  const handleExportLedger = () => {
    const data = {
      expedition: 'RUNWAY ₹10K EXPEDITION',
      calibration: '₹10,000 / 30-Day Velocity',
      currentDay,
      liquidBalance,
      freeToSpend,
      committedBills: 3848,
      ledger: ledgerItems,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `runway-cashflow-day-${currentDay}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="tabpanel"
      id="panel-home"
      aria-labelledby="tab-home"
      className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6 animate-fadeIn"
    >
      {/* Top Welcome & Runway Status */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#ffffff] p-5 rounded-xl border border-[#e0e2ec] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-[#ebedf7] text-[#181c23] font-label-caps text-[10px]">
              EXPEDITION #881 ACTIVE
            </span>
            <span className="text-[#47464e] font-body-sm text-[12px]">·</span>
            <span className="text-[#47464e] font-label-caps text-[10px]">
              30-DAY VELOCITY ENVELOPE
            </span>
          </div>
          <h1 className="font-headline-lg text-[26px] text-[#181c23] tracking-tight">
            Personal Cashflow Runway Overview
          </h1>
          <p className="font-body-md text-[13px] text-[#47464e] mt-1 max-w-2xl">
            You are at <span className="font-bold text-[#181c23]">Day {currentDay}</span> of 30. Your
            baseline cash envelope is calibrated to ensure all fixed debts and daily subsistence remain
            safeguarded through midnight on Day 30.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportLedger}
            className="flex items-center gap-1.5 px-3 py-2 rounded bg-[#ebedf7] text-[#181c23] font-label-caps text-[11px] font-bold hover:bg-[#e0e2ec] transition-colors cursor-pointer border border-[#e0e2ec]"
            title="Export ledger as JSON"
          >
            <span className="material-symbols-outlined text-[16px]">file_download</span>
            <span>EXPORT LEDGER</span>
          </button>

          <button
            onClick={onNavigateToLab}
            className="flex items-center gap-2 px-4 py-2 rounded bg-[#17173d] text-white font-label-caps text-[11px] font-bold hover:bg-[#000000] transition-all cursor-pointer shadow-sm active:scale-98"
          >
            <span className="material-symbols-outlined text-[18px]">science</span>
            <span>WHAT-IF LAB</span>
          </button>
        </div>
      </div>

      {/* 4 Key Envelope Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-[#ffffff] p-4 rounded-xl border border-[#e0e2ec] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-caps text-[10px] text-[#47464e]">
              LIQUID BALANCE
            </span>
            <span className="w-2 h-2 rounded-full bg-[#17173d]" />
          </div>
          <div className="font-display-lg text-[30px] text-[#181c23] font-bold tabular-numbers leading-tight">
            ₹{liquidBalance.toLocaleString('en-IN')}
          </div>
          <div className="font-body-sm text-[11px] text-[#47464e] mt-1 flex justify-between">
            <span>{((liquidBalance / 10000) * 100).toFixed(1)}% of ₹10,000 envelope</span>
            <span className="font-semibold text-[#181c23]">
              {Math.round(liquidBalance / 100)} Tokens
            </span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-[#ffffff] p-4 rounded-xl border border-[#e0e2ec] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-caps text-[10px] text-[#2c6b1e]">
              SAFE FREE-TO-SPEND
            </span>
            <span className="w-2 h-2 rounded-full bg-[#a6e34b]" />
          </div>
          <div className="font-display-lg text-[30px] text-[#2c6b1e] font-bold tabular-numbers leading-tight">
            ₹{freeToSpend.toLocaleString('en-IN')}
          </div>
          <div className="font-body-sm text-[11px] text-[#47464e] mt-1 flex justify-between">
            <span>After reserving all bills</span>
            <span className="font-semibold text-[#2c6b1e]">
              {Math.round(freeToSpend / 100)} Tokens
            </span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-[#ffffff] p-4 rounded-xl border border-[#e0e2ec] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-caps text-[10px] text-[#004a75]">
              COMMITTED BILLS
            </span>
            <span className="w-2 h-2 rounded-full bg-[#3fa7f2]" />
          </div>
          <div className="font-display-lg text-[30px] text-[#001d32] font-bold tabular-numbers leading-tight">
            ₹3,848
          </div>
          <div className="font-body-sm text-[11px] text-[#47464e] mt-1 flex justify-between">
            <span>EMI, Gym, Broadband & Utilities</span>
            <span className="font-semibold text-[#004a75]">38.5 Tokens</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-[#ffffff] p-4 rounded-xl border border-[#e0e2ec] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-caps text-[10px] text-[#47464e]">
              DAILY ALLOWANCE
            </span>
            <span className="w-2 h-2 rounded-full bg-[#575e74]" />
          </div>
          <div className="font-display-lg text-[30px] text-[#181c23] font-bold tabular-numbers leading-tight">
            ₹{Math.max(0, Math.round(freeToSpend / Math.max(1, 30 - currentDay)))}{' '}
            <span className="text-[14px] font-normal text-[#47464e]">/ day</span>
          </div>
          <div className="font-body-sm text-[11px] text-[#47464e] mt-1 flex justify-between">
            <span>{30 - currentDay} days remaining</span>
            <span className="font-semibold text-[#181c23]">Target: Day 30</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Envelope Distribution & Ledger Manifest */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Envelope Architecture (7 cols) */}
        <div className="lg:col-span-7 bg-[#ffffff] rounded-xl p-5 border border-[#e0e2ec] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#e0e2ec] pb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#17173d] text-[20px]">
                pie_chart
              </span>
              <h3 className="font-headline-sm text-[18px] text-[#181c23]">
                Zero-Sum Envelope Distribution
              </h3>
            </div>
            <span className="font-label-caps text-[10px] text-[#47464e]">
              TOTAL: ₹10,000
            </span>
          </div>

          {/* Envelope Bar */}
          <div className="w-full h-8 rounded-lg overflow-hidden flex shadow-inner">
            <div
              className="bg-[#d7dae3] flex items-center justify-center text-[10px] font-bold text-[#47464e]"
              style={{ width: `${Math.min(100, (spentTotal / 10000) * 100)}%` }}
              title={`Spent: ₹${spentTotal}`}
            >
              SPENT ({Math.round((spentTotal / 10000) * 100)}%)
            </div>
            <div
              className="bg-[#a6e34b] flex items-center justify-center text-[10px] font-bold text-[#2c6b1e]"
              style={{ width: `${Math.min(100, (freeToSpend / 10000) * 100)}%` }}
              title={`Free: ₹${freeToSpend}`}
            >
              FREE ({Math.round((freeToSpend / 10000) * 100)}%)
            </div>
            <div
              className="bg-[#cde5ff] flex items-center justify-center text-[10px] font-bold text-[#001d32]"
              style={{ width: '38.5%' }}
              title="Committed Bills: ₹3,848"
            >
              BILLS (38.5%)
            </div>
          </div>

          {/* Detailed Envelopes list */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#f1f3fd] border border-[#e0e2ec]">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded bg-[#a6e34b]" />
                <div>
                  <span className="text-[13px] font-semibold text-[#181c23] block">
                    Unallocated Free Runway
                  </span>
                  <span className="text-[11px] text-[#47464e]">
                    Available for discretionary spends, dining, or shopping
                  </span>
                </div>
              </div>
              <span className="font-ledger-num-md font-bold text-[#2c6b1e] text-[15px]">
                ₹{freeToSpend.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-[#f1f3fd] border border-[#e0e2ec]">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded bg-[#3fa7f2]" />
                <div>
                  <span className="text-[13px] font-semibold text-[#181c23] block">
                    Fixed Scheduled Obligations
                  </span>
                  <span className="text-[11px] text-[#47464e]">
                    Locked for Cult Gym, AI tool, Phone EMI & Broadband
                  </span>
                </div>
              </div>
              <span className="font-ledger-num-md font-bold text-[#004a75] text-[15px]">
                ₹3,848
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-[#f1f3fd] border border-[#e0e2ec]">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded bg-[#9f86f0]" />
                <div>
                  <span className="text-[13px] font-semibold text-[#181c23] block">
                    Goa Trip Automatic Vault SIP
                  </span>
                  <span className="text-[11px] text-[#47464e]">
                    Disciplined ₹50 daily auto-save stream (Target ₹5,000)
                  </span>
                </div>
              </div>
              <span className="font-ledger-num-md font-bold text-[#181c23] text-[15px]">
                ₹2,400 saved
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-[#f1f3fd] border border-[#e0e2ec]">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded bg-[#d7dae3]" />
                <div>
                  <span className="text-[13px] font-semibold text-[#181c23] block">
                    Total Debits to Date
                  </span>
                  <span className="text-[11px] text-[#47464e]">
                    Verified debits over the expedition
                  </span>
                </div>
              </div>
              <span className="font-ledger-num-md font-bold text-[#47464e] text-[15px]">
                ₹{spentTotal.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Recent Ledger Manifest (5 cols) */}
        <div className="lg:col-span-5 bg-[#ffffff] rounded-xl p-5 border border-[#e0e2ec] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#e0e2ec] pb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#47464e] text-[20px]">
                receipt_long
              </span>
              <h3 className="font-headline-sm text-[18px] text-[#181c23]">
                Recent Ledger Activity
              </h3>
            </div>
            <span className="font-label-caps text-[10px] text-[#47464e]">
              REAL RECORD
            </span>
          </div>

          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {ledgerItems.map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-between p-2.5 rounded-lg border transition-colors ${
                  item.isCommitted
                    ? 'bg-[#ffdad6]/40 border-[#ffdad6]'
                    : 'bg-[#f1f3fd] hover:bg-[#ebedf7] border-[#e0e2ec]/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`px-1.5 py-0.5 rounded font-label-caps text-[9px] font-bold border ${
                      item.isCommitted
                        ? 'bg-[#ba1a1a] text-white border-[#ba1a1a]'
                        : 'bg-[#ffffff] text-[#181c23] border-[#e0e2ec]'
                    }`}
                  >
                    {item.day}
                  </span>
                  <div>
                    <span className="text-[12px] font-medium text-[#181c23] block leading-tight">
                      {item.desc}
                    </span>
                    <span className="text-[10px] text-[#47464e]">{item.cat}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-ledger-num-md text-[13px] font-bold text-[#ba1a1a]">
                    -₹{Math.abs(item.amt).toLocaleString('en-IN')}
                  </span>
                  {item.isCommitted && (
                    <span className="block font-label-caps text-[8px] text-[#93000a] font-bold">
                      COMMITTED
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={onNavigateToLab}
              className="w-full py-2.5 rounded bg-[#ebedf7] text-[#181c23] font-label-caps text-[11px] font-bold hover:bg-[#17173d] hover:text-white transition-all cursor-pointer border border-[#e0e2ec] flex items-center justify-center gap-2"
            >
              <span>RUN WHAT-IF EXPERIMENT NOW</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
