/**
 * @file src/components/WhatIfLab.tsx
 * @description What-If simulation workspace tab panel coordinating vault, metrics, and parameters.
 */

import React from 'react';
import { CameraView, ProjectionMode, ConsequenceMetrics } from '../types';
import { TokenVaultMatrix } from './TokenVaultMatrix';
import { MitigationStrategies } from './MitigationStrategies';
import { ExperimentParameters } from './ExperimentParameters';
import { VerdictBanner } from './VerdictBanner';
import { ConsequenceBoard } from './ConsequenceBoard';

interface WhatIfLabProps {
  cameraView: CameraView;
  onChangeCameraView: (view: CameraView) => void;
  projectionMode: ProjectionMode;
  onChangeProjectionMode: (mode: ProjectionMode) => void;
  expenseName: string;
  expenseAmount: number;
  expenseCategory: string;
  expenseType: string;
  executionDay: number;
  currentDay: number;
  metrics: ConsequenceMetrics;
  appliedStrategyId: 'offset' | 'split' | 'shift' | null;
  isCommitted: boolean;
  onUpdateAmount: (amount: number) => void;
  onUpdateExecutionDay: (day: number) => void;
  onSelectPreset: (presetId: string) => void;
  onUpdateDetails: (name: string, category: string) => void;
  onApplyStrategy: (strategyId: 'offset' | 'split' | 'shift') => void;
  onOpenMath: (formulaKey: string) => void;
  onTryAlternative: () => void;
  onCommitExpense: () => void;
  onUndoCommit: () => void;
}

export const WhatIfLab: React.FC<WhatIfLabProps> = ({
  cameraView,
  onChangeCameraView,
  projectionMode,
  onChangeProjectionMode,
  expenseName,
  expenseAmount,
  expenseCategory,
  expenseType,
  executionDay,
  currentDay,
  metrics,
  appliedStrategyId,
  isCommitted,
  onUpdateAmount,
  onUpdateExecutionDay,
  onSelectPreset,
  onUpdateDetails,
  onApplyStrategy,
  onOpenMath,
  onTryAlternative,
  onCommitExpense,
  onUndoCommit,
}) => {
  return (
    <div
      role="tabpanel"
      id="panel-what-if-lab"
      aria-labelledby="tab-what-if-lab"
      className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 space-y-4 animate-fadeIn"
    >
      {/* Top Context & Ledger Breadcrumb Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-[#e6e8f2] text-[#181c23] font-label-caps text-[10px] sm:text-[11px] uppercase tracking-wider font-bold">
            Lab Protocol 04
          </span>
          <span className="text-[#47464e] font-body-sm text-[13px]" aria-hidden="true">
            /
          </span>
          <h1 className="font-headline-sm text-[16px] sm:text-[18px] text-[#181c23] font-semibold">
            Simulated Cashflow Trajectory
          </h1>
          <span
            role="status"
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#ffdad6] text-[#93000a] font-label-caps text-[10px] font-bold"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a] animate-ping" aria-hidden="true" />
            IMPACT DETECTED
          </span>
        </div>

        <div className="flex items-center gap-2 font-label-caps text-[10px] sm:text-[11px] text-[#47464e]">
          <span>BASELINE: ₹10,000 EXPEDITION</span>
          <span className="text-[#c8c5cf]" aria-hidden="true">
            |
          </span>
          <span className="text-[#181c23] font-ledger-num-md font-bold text-[12px] sm:text-[13px]">
            DAY {currentDay} / 30
          </span>
        </div>
      </div>

      {/* Main Asymmetric Workspace Layout: 58% (7 Cols) & 42% (5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-start">
        {/* LEFT STAGE: 58% (7 Columns) 3D Ghost Chamber & Runway Gauge */}
        <section
          aria-label="3D Vault Matrix and Mitigation Strategies"
          className="lg:col-span-7 flex flex-col gap-4"
        >
          <TokenVaultMatrix
            cameraView={cameraView}
            onChangeCameraView={onChangeCameraView}
            projectionMode={projectionMode}
            onChangeProjectionMode={onChangeProjectionMode}
            expenseAmount={expenseAmount}
            metrics={metrics}
            currentDay={currentDay}
          />

          <MitigationStrategies
            onApplyStrategy={onApplyStrategy}
            appliedStrategyId={appliedStrategyId}
          />
        </section>

        {/* RIGHT COMMAND PANEL: 42% (5 Columns) Decision Controls & Consequence Board */}
        <section
          aria-label="Simulation Parameters and Consequence Board"
          className="lg:col-span-5 flex flex-col gap-4"
        >
          <ExperimentParameters
            expenseName={expenseName}
            expenseAmount={expenseAmount}
            expenseCategory={expenseCategory}
            expenseType={expenseType}
            executionDay={executionDay}
            onUpdateAmount={onUpdateAmount}
            onUpdateExecutionDay={onUpdateExecutionDay}
            onSelectPreset={onSelectPreset}
            onUpdateDetails={onUpdateDetails}
          />

          <VerdictBanner metrics={metrics} />

          <ConsequenceBoard
            metrics={metrics}
            expenseAmount={expenseAmount}
            expenseName={expenseName}
            onOpenMath={onOpenMath}
            onTryAlternative={onTryAlternative}
            onCommitExpense={onCommitExpense}
            isCommitted={isCommitted}
            onUndoCommit={onUndoCommit}
          />
        </section>
      </div>

      {/* Small Footer Trust & Protocol Verification Line */}
      <div className="p-3 bg-[#ffffff] rounded-lg flex flex-wrap items-center justify-between gap-3 shadow-xs font-label-caps text-[9px] sm:text-[10px] text-[#47464e] border border-[#e0e2ec]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-[#181c23]" aria-hidden="true">
            verified_user
          </span>
          <span className="font-semibold text-[#181c23]">
            BANKNOTE STUDIO CALIBRATED ENGINE · ALGORITHM VER 2.8 · REAL-TIME SIMULATION ACTIVE
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span>CURRENCY: INR (₹)</span>
          <span className="text-[#c8c5cf]" aria-hidden="true">
            |
          </span>
          <span>ENVELOPE: ZERO-SUM EXPEDITION</span>
        </div>
      </div>
    </div>
  );
};
