/**
 * @file src/App.tsx
 * @description Root application orchestrating Banknote Studio runway engine, lazy modules, and context.
 */

import React, { useState, Suspense, lazy } from 'react';
import { CameraView, ProjectionMode, ActiveTabId, LedgerEntry } from './types';
import {
  INITIAL_BILLS,
  INITIAL_LEDGER,
  PRESET_EXPENSES,
} from './constants';
import { calculateConsequences } from './utils/calculations';
import { playTactileClick } from './utils/sound';
import { Header } from './components/Header';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { Footer } from './components/Footer';

// Lazy-loaded workspace screens for performance optimization
const WhatIfLab = lazy(() =>
  import('./components/WhatIfLab').then((m) => ({ default: m.WhatIfLab }))
);
const HomeDashboard = lazy(() =>
  import('./components/HomeDashboard').then((m) => ({ default: m.HomeDashboard }))
);
const BillsScreen = lazy(() =>
  import('./components/BillsScreen').then((m) => ({ default: m.BillsScreen }))
);
const GoalsScreen = lazy(() =>
  import('./components/GoalsScreen').then((m) => ({ default: m.GoalsScreen }))
);
const HealthRiskScreen = lazy(() =>
  import('./components/HealthRiskScreen').then((m) => ({ default: m.HealthRiskScreen }))
);
const ScienceLabScreen = lazy(() =>
  import('./components/ScienceLabScreen').then((m) => ({ default: m.ScienceLabScreen }))
);

// Lazy-loaded dialogs
const JudgeModeModal = lazy(() =>
  import('./components/JudgeModeModal').then((m) => ({ default: m.JudgeModeModal }))
);
const TimeMachineModal = lazy(() =>
  import('./components/TimeMachineModal').then((m) => ({ default: m.TimeMachineModal }))
);
const MathDetailModal = lazy(() =>
  import('./components/MathDetailModal').then((m) => ({ default: m.MathDetailModal }))
);

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTabId>('what-if-lab');
  const [currentDay, setCurrentDay] = useState<number>(12);
  const [executionDay, setExecutionDay] = useState<number>(12);

  // Expenditure State
  const [expenseName, setExpenseName] = useState<string>('Buying sneakers');
  const [expenseAmount, setExpenseAmount] = useState<number>(2499);
  const [expenseCategory, setExpenseCategory] = useState<string>('WANT · DISCRETIONARY');
  const [expenseType, setExpenseType] = useState<string>('ONE-TIME CHARGE');

  // Simulation Controls
  const [cameraView, setCameraView] = useState<CameraView>('iso');
  const [projectionMode, setProjectionMode] = useState<ProjectionMode>('after');
  const [appliedStrategyId, setAppliedStrategyId] = useState<'offset' | 'split' | 'shift' | null>(null);

  // Financial Ledger State
  const [liquidBalance, setLiquidBalance] = useState<number>(7013);
  const [ledger, setLedger] = useState<LedgerEntry[]>(INITIAL_LEDGER);
  const [bills, setBills] = useState(INITIAL_BILLS);
  const [isCommitted, setIsCommitted] = useState<boolean>(false);
  const [committedTxId, setCommittedTxId] = useState<string | null>(null);

  // Preferences & Modals
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isJudgeOpen, setIsJudgeOpen] = useState<boolean>(false);
  const [isTimeMachineOpen, setIsTimeMachineOpen] = useState<boolean>(false);
  const [mathFormulaKey, setMathFormulaKey] = useState<string | null>(null);

  // Dynamically calculate metrics based on state
  const metrics = calculateConsequences(
    expenseAmount,
    executionDay,
    bills,
    projectionMode
  );

  const handleToggleSound = () => {
    setSoundEnabled((prev) => !prev);
    playTactileClick('click', !soundEnabled);
  };

  // Handle Strategy application
  const handleApplyStrategy = (strategyId: 'offset' | 'split' | 'shift') => {
    playTactileClick('click', soundEnabled);
    if (appliedStrategyId === strategyId) {
      // Toggle off / reset
      setAppliedStrategyId(null);
      setExpenseAmount(2499);
      setExecutionDay(12);
      setBills((prev) =>
        prev.map((b) =>
          b.id === 'bill-2' || b.id === 'bill-3' ? { ...b, isPaused: false } : b
        )
      );
      return;
    }

    setAppliedStrategyId(strategyId);
    if (strategyId === 'offset') {
      setExpenseAmount(999);
      setBills((prev) =>
        prev.map((b) =>
          b.id === 'bill-2' || b.id === 'bill-3' ? { ...b, isPaused: true } : b
        )
      );
    } else if (strategyId === 'split') {
      setExpenseAmount(1250);
    } else if (strategyId === 'shift') {
      setExecutionDay(21);
    }
  };

  const handleSelectPreset = (presetId: string) => {
    playTactileClick('click', soundEnabled);
    const found = PRESET_EXPENSES.find((p) => p.id === presetId);
    if (found) {
      setExpenseName(found.name);
      setExpenseAmount(found.amount);
      setExpenseCategory(found.category);
      setExpenseType(found.type);
      setAppliedStrategyId(null);
    }
  };

  const handleSimulateScientificExpense = (name: string, amount: number, category: string) => {
    playTactileClick('click', soundEnabled);
    setExpenseName(name);
    setExpenseAmount(amount);
    setExpenseCategory(category);
    setExpenseType('ONE-TIME CHARGE');
    setAppliedStrategyId(null);
    setActiveTab('what-if-lab');
  };

  const handleTogglePauseBill = (billId: string) => {
    playTactileClick('click', soundEnabled);
    setBills((prev) =>
      prev.map((b) => (b.id === billId ? { ...b, isPaused: !b.isPaused } : b))
    );
  };

  const handleCommitExpense = () => {
    playTactileClick('commit', soundEnabled);
    setIsCommitted(true);
    const newTxId = `tx-commit-${Date.now()}`;
    setCommittedTxId(newTxId);

    const newEntry: LedgerEntry = {
      id: newTxId,
      day: `D${executionDay}`,
      desc: expenseName,
      cat: expenseCategory,
      amt: -expenseAmount,
      isCommitted: true,
    };
    setLedger((prev) => [newEntry, ...prev]);
    setLiquidBalance((prev) => Math.max(0, prev - expenseAmount));
  };

  const handleUndoCommit = () => {
    playTactileClick('undo', soundEnabled);
    setIsCommitted(false);
    if (committedTxId) {
      setLedger((prev) => prev.filter((item) => item.id !== committedTxId));
      setLiquidBalance((prev) => prev + expenseAmount);
      setCommittedTxId(null);
    }
  };

  return (
    <ErrorBoundary>
      {/* Skip to Content accessible landmark */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#17173d] focus:text-white focus:rounded focus:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        Skip to main content
      </a>

      <div className="min-h-screen bg-[#f9f9ff] text-[#181c23] flex flex-col justify-between selection:bg-[#17173d] selection:text-white">
        {/* Master Header */}
        <Header
          currentDay={currentDay}
          activeTab={activeTab}
          onSelectTab={(tab) => {
            playTactileClick('click', soundEnabled);
            setActiveTab(tab);
          }}
          onOpenTimeMachine={() => {
            playTactileClick('click', soundEnabled);
            setIsTimeMachineOpen(true);
          }}
          onOpenJudgeMode={() => {
            playTactileClick('click', soundEnabled);
            setIsJudgeOpen(true);
          }}
          metrics={metrics}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
        />

        {/* Main Content Workspace with Suspense */}
        <main
          id="main-content"
          role="main"
          tabIndex={-1}
          className="w-full pt-28 flex-1 outline-none"
        >
          <Suspense fallback={<LoadingSkeleton />}>
            {activeTab === 'what-if-lab' && (
              <WhatIfLab
                cameraView={cameraView}
                onChangeCameraView={(view) => {
                  playTactileClick('click', soundEnabled);
                  setCameraView(view);
                }}
                projectionMode={projectionMode}
                onChangeProjectionMode={(mode) => {
                  playTactileClick('click', soundEnabled);
                  setProjectionMode(mode);
                }}
                expenseName={expenseName}
                expenseAmount={expenseAmount}
                expenseCategory={expenseCategory}
                expenseType={expenseType}
                executionDay={executionDay}
                currentDay={currentDay}
                metrics={metrics}
                appliedStrategyId={appliedStrategyId}
                isCommitted={isCommitted}
                onUpdateAmount={(amt) => {
                  setExpenseAmount(amt);
                  setAppliedStrategyId(null);
                }}
                onUpdateExecutionDay={(d) => {
                  playTactileClick('click', soundEnabled);
                  setExecutionDay(d);
                }}
                onSelectPreset={handleSelectPreset}
                onUpdateDetails={(name, cat) => {
                  setExpenseName(name);
                  setExpenseCategory(cat);
                }}
                onApplyStrategy={handleApplyStrategy}
                onOpenMath={(k) => {
                  playTactileClick('click', soundEnabled);
                  setMathFormulaKey(k);
                }}
                onTryAlternative={() => handleApplyStrategy('offset')}
                onCommitExpense={handleCommitExpense}
                onUndoCommit={handleUndoCommit}
              />
            )}

            {activeTab === 'home' && (
              <HomeDashboard
                onNavigateToLab={() => {
                  playTactileClick('click', soundEnabled);
                  setActiveTab('what-if-lab');
                }}
                currentDay={currentDay}
                liquidBalance={liquidBalance}
                ledgerItems={ledger}
              />
            )}

            {activeTab === 'bills-and-subscriptions' && (
              <BillsScreen
                bills={bills}
                onTogglePauseBill={handleTogglePauseBill}
                onNavigateToLab={() => {
                  playTactileClick('click', soundEnabled);
                  setActiveTab('what-if-lab');
                }}
              />
            )}

            {activeTab === 'goals' && (
              <GoalsScreen
                onNavigateToLab={() => {
                  playTactileClick('click', soundEnabled);
                  setActiveTab('what-if-lab');
                }}
                goaDaysSlip={metrics.goaDaysSlip}
              />
            )}

            {activeTab === 'health-and-risk' && (
              <HealthRiskScreen
                metrics={metrics}
                onNavigateToLab={() => {
                  playTactileClick('click', soundEnabled);
                  setActiveTab('what-if-lab');
                }}
              />
            )}

            {activeTab === 'science-lab' && (
              <ScienceLabScreen
                onSimulateScientificExpense={handleSimulateScientificExpense}
                currentDay={currentDay}
              />
            )}
          </Suspense>
        </main>

        {/* Global Accessible Footer */}
        <Footer />

        {/* Dialog Overlays */}
        <Suspense fallback={null}>
          <JudgeModeModal
            isOpen={isJudgeOpen}
            onClose={() => setIsJudgeOpen(false)}
            expenseName={expenseName}
            expenseAmount={expenseAmount}
            onAcceptDelay={() => {
              handleApplyStrategy('shift');
              setIsJudgeOpen(false);
            }}
            onOverrule={() => {
              setIsJudgeOpen(false);
              handleCommitExpense();
            }}
          />

          <TimeMachineModal
            isOpen={isTimeMachineOpen}
            onClose={() => setIsTimeMachineOpen(false)}
            currentDay={currentDay}
            onSelectDay={(d) => {
              playTactileClick('click', soundEnabled);
              setCurrentDay(d);
              setExecutionDay(d);
            }}
          />

          <MathDetailModal
            formulaKey={mathFormulaKey}
            onClose={() => setMathFormulaKey(null)}
            metrics={metrics}
            expenseAmount={expenseAmount}
          />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}
