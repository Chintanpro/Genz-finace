/**
 * @file src/components/TokenVaultMatrix.tsx
 * @description 3D spatial token matrix stage, camera perspective controls, and clearance timeline rail.
 */

import React from 'react';
import { CameraView, ProjectionMode, ConsequenceMetrics } from '../types';

interface TokenVaultMatrixProps {
  cameraView: CameraView;
  onChangeCameraView: (view: CameraView) => void;
  projectionMode: ProjectionMode;
  onChangeProjectionMode: (mode: ProjectionMode) => void;
  expenseAmount: number;
  metrics: ConsequenceMetrics;
  currentDay: number;
}

export const TokenVaultMatrix: React.FC<TokenVaultMatrixProps> = ({
  cameraView,
  onChangeCameraView,
  projectionMode,
  onChangeProjectionMode,
  expenseAmount,
  metrics,
  currentDay,
}) => {
  const isBefore = projectionMode === 'before';
  const spentCount = 30; // D1-D12 spent
  const ghostCount = isBefore ? 0 : metrics.ghostTokenCount;
  const billCount = 18;
  const safeRemainCount = Math.max(0, 100 - spentCount - ghostCount - billCount);

  // Perspective styles
  const getCameraTransform = () => {
    switch (cameraView) {
      case 'iso':
        return 'rotateX(36deg) rotateZ(-18deg) scale(0.96)';
      case 'top':
        return 'rotateX(0deg) rotateZ(0deg) scale(1)';
      case 'runway':
        return 'rotateX(54deg) rotateZ(0deg) scale(1.05)';
      default:
        return 'rotateX(36deg) rotateZ(-18deg)';
    }
  };

  return (
    <div
      role="region"
      aria-labelledby="vault-wall-heading"
      className="bg-[#ffffff] rounded-xl p-4 sm:p-5 shadow-xs border border-[#e0e2ec] relative overflow-hidden"
    >
      {/* Top Surface Security Seal Bar */}
      <div className="flex flex-wrap items-center justify-between pb-3 mb-3 border-b border-[#e0e2ec]/70 gap-2">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-[18px] text-[#47464e]"
            aria-hidden="true"
          >
            layers
          </span>
          <h2
            id="vault-wall-heading"
            className="font-label-caps text-[11px] text-[#181c23] uppercase"
          >
            Vault Wall 100-Token Matrix
          </h2>
          <span className="px-1.5 py-0.5 rounded bg-[#cde5ff] text-[#001d32] font-label-caps text-[9px] tracking-wider">
            {isBefore ? 'BASELINE MODE' : 'GHOST MODE ACTIVE'}
          </span>
        </div>

        {/* Camera & View Controls */}
        <div
          role="radiogroup"
          aria-label="Select 3D stage camera perspective"
          className="flex items-center gap-1 bg-[#f1f3fd] p-0.5 rounded-lg"
        >
          <button
            role="radio"
            aria-checked={cameraView === 'iso'}
            onClick={() => onChangeCameraView('iso')}
            className={`px-2.5 py-1 min-h-[30px] rounded font-label-caps text-[10px] transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#17173d] ${
              cameraView === 'iso'
                ? 'bg-[#ffffff] text-[#181c23] shadow-xs font-bold'
                : 'text-[#47464e] hover:text-[#181c23]'
            }`}
          >
            ISO
          </button>
          <button
            role="radio"
            aria-checked={cameraView === 'top'}
            onClick={() => onChangeCameraView('top')}
            className={`px-2.5 py-1 min-h-[30px] rounded font-label-caps text-[10px] transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#17173d] ${
              cameraView === 'top'
                ? 'bg-[#ffffff] text-[#181c23] shadow-xs font-bold'
                : 'text-[#47464e] hover:text-[#181c23]'
            }`}
          >
            TOP-DOWN
          </button>
          <button
            role="radio"
            aria-checked={cameraView === 'runway'}
            onClick={() => onChangeCameraView('runway')}
            className={`px-2.5 py-1 min-h-[30px] rounded font-label-caps text-[10px] transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#17173d] ${
              cameraView === 'runway'
                ? 'bg-[#ffffff] text-[#181c23] shadow-xs font-bold'
                : 'text-[#47464e] hover:text-[#181c23]'
            }`}
          >
            RUNWAY CAM
          </button>
        </div>
      </div>

      {/* Interactive Compare Mode Toggle */}
      <div className="flex items-center justify-between bg-[#f1f3fd] p-1.5 rounded-lg mb-4">
        <span className="font-label-caps text-[10px] text-[#47464e] pl-1 tracking-wider">
          PROJECTION COMPARE
        </span>
        <div
          role="group"
          aria-label="Projection comparison toggle"
          className="flex items-center gap-1 bg-[#ffffff] rounded p-0.5 shadow-xs"
        >
          <button
            onClick={() => onChangeProjectionMode('before')}
            aria-pressed={isBefore}
            className={`px-2.5 py-1 min-h-[30px] rounded font-label-caps text-[10px] transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#17173d] ${
              isBefore
                ? 'bg-[#17173d] text-white font-bold'
                : 'text-[#47464e] hover:text-[#181c23]'
            }`}
          >
            BEFORE (DAY 30)
          </button>
          <button
            onClick={() => onChangeProjectionMode('after')}
            aria-pressed={!isBefore}
            className={`px-2.5 py-1 min-h-[30px] rounded font-label-caps text-[10px] transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#17173d] ${
              !isBefore
                ? 'bg-[#17173d] text-white font-bold'
                : 'text-[#47464e] hover:text-[#181c23]'
            }`}
          >
            AFTER (-₹{expenseAmount.toLocaleString('en-IN')})
          </button>
        </div>
      </div>

      {/* Token Matrix Spatial Stage Canvas Simulation */}
      <div
        role="img"
        aria-label={`100-Token Vault Grid: 30 spent tokens, ${ghostCount} ghosted tokens, 18 bill tokens, ${safeRemainCount} safe buffer tokens`}
        className="relative w-full min-h-[320px] bg-[#ebedf7] rounded-xl overflow-hidden flex flex-col justify-between p-4 border border-[#e0e2ec]"
      >
        {/* Isometric Grid Floor Pattern */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#17173d_1px,transparent_1px)] [background-size:16px_16px]"
        />

        {/* Spatial Metadata Overlay */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#ffffff] text-[#181c23] font-ledger-num-md text-[13px] font-semibold shadow-xs">
              1 Token = ₹100
            </span>
            <span className="text-[#47464e] font-body-sm text-[12px]">
              {100 - spentCount - ghostCount} tokens remain · {ghostCount} tokens ghosted
            </span>
          </div>

          <div
            role="status"
            className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded font-label-caps text-[10px] ${
              metrics.verdict === 'RED'
                ? 'bg-[#ffdad6] text-[#93000a]'
                : metrics.verdict === 'AMBER'
                ? 'bg-[#ffc83d]/20 text-[#7a5a00]'
                : 'bg-[#a6e34b]/30 text-[#2c6b1e]'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
              warning
            </span>
            <span>
              {metrics.verdict === 'RED'
                ? `ZERO-RUNWAY: DAY ${metrics.collapseDay || 16}`
                : 'SAFE CLEARANCE'}
            </span>
          </div>
        </div>

        {/* 100-Token Vault Grid Layout (10x10 with 3D Stage transformation) */}
        <div
          className="relative z-10 my-auto py-3 transition-transform duration-500 ease-out flex justify-center"
          style={{ perspective: 900 }}
        >
          <div
            className="grid grid-cols-10 gap-1.5 sm:gap-2 max-w-[340px] sm:max-w-[420px] mx-auto p-3 bg-[#ffffff]/60 backdrop-blur-xs rounded-lg border border-[#e0e2ec]/60 shadow-xs transition-transform duration-500"
            style={{
              transform: getCameraTransform(),
              transformStyle: 'preserve-3d',
            }}
          >
            {/* 30 Spent Tokens (Days 1-12) */}
            {Array.from({ length: spentCount }).map((_, i) => (
              <div
                key={`spent-${i}`}
                title={`Spent Day 1-12 Token #${i + 1} (₹100)`}
                className="w-5 sm:w-6 lg:w-7 h-4 sm:h-5 rounded-xs bg-[#d7dae3] opacity-45 transition-all hover:opacity-100 hover:scale-110 cursor-pointer"
              />
            ))}

            {/* Ghosted Tokens for Simulated Purchase */}
            {Array.from({ length: ghostCount }).map((_, i) => (
              <div
                key={`ghost-${i}`}
                title={`Ghosted Token #${spentCount + i + 1}: -₹100 liquidation from active buffer`}
                className="w-5 sm:w-6 lg:w-7 h-4 sm:h-5 rounded-xs bg-[#ba1a1a]/25 shadow-[inset_0_0_0_1px_rgba(186,26,26,0.85)] animate-pulse transition-all hover:scale-115 cursor-pointer"
              />
            ))}

            {/* 18 Committed Bills Tokens */}
            {Array.from({ length: billCount }).map((_, i) => (
              <div
                key={`bill-${i}`}
                title={`Fixed Bill Obligation Token #${spentCount + ghostCount + i + 1} (₹100)`}
                className="w-5 sm:w-6 lg:w-7 h-4 sm:h-5 rounded-xs bg-[#cde5ff] text-[#001d32] text-center flex items-center justify-center font-label-caps text-[8px] font-bold border border-[#95ccff] hover:scale-110 cursor-pointer"
              >
                {i === 0 ? 'BILL' : ''}
              </div>
            ))}

            {/* Residual Safe Buffer Tokens */}
            {Array.from({ length: safeRemainCount }).map((_, i) => (
              <div
                key={`safe-${i}`}
                title={`Safe Runway Buffer Token #${spentCount + ghostCount + billCount + i + 1} (₹100)`}
                className="w-5 sm:w-6 lg:w-7 h-4 sm:h-5 rounded-xs bg-[#dce1fc] hover:bg-[#a6e34b] transition-all hover:scale-110 border border-[#c0c6df] cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* Red Sliding Hazard Barrier on Stage Floor */}
        <div className="relative z-10 flex items-center justify-between px-3 py-1.5 bg-[#ffffff]/90 backdrop-blur-md rounded border border-[#e0e2ec]">
          <div className="flex items-center gap-1.5 text-[#ba1a1a] font-label-caps text-[11px]">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              block
            </span>
            <span>
              {metrics.verdict === 'RED'
                ? `CRITICAL IMPACT: SLIDES TRAJECTORY WALL TO DAY ${metrics.collapseDay || 16}`
                : 'CLEARANCE BUFFER SECURED ACROSS 30 DAYS'}
            </span>
          </div>
          <span className="font-ledger-num-md text-[13px] text-[#ba1a1a] font-bold">
            {metrics.verdict === 'RED'
              ? `${30 - (metrics.collapseDay || 16)}-DAY RUNWAY COLLAPSE`
              : 'ZERO DEFICIT'}
          </span>
        </div>
      </div>

      {/* Runway Timeline Strip: Segmented Operational Clearance */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-1.5 font-label-caps text-[10px]">
          <span className="text-[#181c23]">30-DAY CLEARANCE TIMELINE</span>
          <span className="text-[#47464e]">OPERATIONAL TARGET: DAY 30</span>
        </div>

        {/* Graphic Timeline Rail */}
        <div
          role="progressbar"
          aria-label="30-day clearance trajectory timeline"
          aria-valuenow={currentDay}
          aria-valuemin={1}
          aria-valuemax={30}
          className="relative h-10 bg-[#f1f3fd] rounded-lg p-1 flex items-center border border-[#e0e2ec]"
        >
          {/* Segment: Elapsed Burn (D1-D12) */}
          <div
            className="h-full bg-[#d7dae3] rounded-l flex items-center justify-center text-[#47464e] font-label-caps text-[9px] sm:text-[10px]"
            style={{ width: '40%' }}
          >
            ELAPSED (D1–D12)
          </div>

          {/* Segment: Crash Window (D13-D16) */}
          <div
            className={`h-full relative flex items-center justify-center font-label-caps text-[9px] sm:text-[10px] font-bold transition-all ${
              metrics.verdict === 'RED'
                ? 'bg-[#ffdad6] text-[#93000a]'
                : 'bg-[#dce1fc] text-[#141b2e]'
            }`}
            style={{ width: '13.3%' }}
          >
            {metrics.verdict === 'RED' ? 'D16 COLLAPSE' : 'SAFE'}
            {metrics.verdict === 'RED' && (
              <div
                className="absolute -top-2 w-2 h-2 rotate-45 bg-[#ba1a1a]"
                aria-hidden="true"
              />
            )}
          </div>

          {/* Segment: Deficit Abyss or Full Clearance */}
          <div
            className={`h-full rounded-r flex items-center justify-center font-label-caps text-[9px] sm:text-[10px] tracking-wider uppercase transition-all ${
              metrics.verdict === 'RED'
                ? 'bg-[#ba1a1a]/15 text-[#ba1a1a]'
                : 'bg-[#a6e34b]/20 text-[#2c6b1e]'
            }`}
            style={{ width: '46.7%' }}
          >
            {metrics.verdict === 'RED'
              ? 'RUNWAY GAP (14 DAYS DEFICIT)'
              : 'PROTECTED RUNWAY'}
          </div>

          {/* Sliding Marker for Day 12 Active */}
          <div className="absolute left-[40%] top-0 bottom-0 w-0.5 bg-[#000000] z-20">
            <span className="absolute -top-5 -translate-x-1/2 px-1 rounded bg-[#000000] text-white font-label-caps text-[9px] whitespace-nowrap shadow-xs">
              NOW (D{currentDay})
            </span>
          </div>

          {/* Scheduled Bill Markers */}
          <div className="absolute left-[50%] -bottom-5 -translate-x-1/2 flex flex-col items-center pointer-events-none">
            <span className="material-symbols-outlined text-[12px] text-[#001d32]" aria-hidden="true">
              arrow_drop_up
            </span>
            <span className="font-label-caps text-[8px] text-[#47464e] whitespace-nowrap">
              D15 ₹399
            </span>
          </div>

          <div className="absolute left-[53.3%] -top-5 -translate-x-1/2 flex flex-col items-center pointer-events-none">
            <span className="font-label-caps text-[8px] text-[#ba1a1a] font-bold whitespace-nowrap">
              D16 ₹499
            </span>
            <span className="material-symbols-outlined text-[12px] text-[#ba1a1a]" aria-hidden="true">
              arrow_drop_down
            </span>
          </div>

          <div className="absolute left-[83.3%] -bottom-5 -translate-x-1/2 flex flex-col items-center pointer-events-none">
            <span className="material-symbols-outlined text-[12px] text-[#001d32]" aria-hidden="true">
              arrow_drop_up
            </span>
            <span className="font-label-caps text-[8px] text-[#47464e] whitespace-nowrap">
              D25 ₹1,200
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Legibility Note */}
      <div className="mt-7 pt-2 flex flex-wrap items-center justify-between font-label-sm text-[11px] text-[#47464e] gap-2 border-t border-[#e0e2ec]/60">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#ba1a1a]" aria-hidden="true" />
          Vermilion tokens represent immediate liquidation from the active runway buffer.
        </span>
        <span className="font-ledger-num-md text-[13px] font-semibold text-[#181c23]">
          Clearance Delta: {isBefore ? '0.0%' : `${metrics.clearanceDeltaPercent}%`}
        </span>
      </div>
    </div>
  );
};
