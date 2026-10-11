/**
 * @file src/types/index.ts
 * @description Centralized TypeScript type definitions for Banknote Studio Runway engine.
 */

export type CameraView = 'iso' | 'top' | 'runway';
export type ProjectionMode = 'before' | 'after';
export type VerdictType = 'RED' | 'AMBER' | 'GREEN';
export type ActiveTabId =
  | 'home'
  | 'what-if-lab'
  | 'bills-and-subscriptions'
  | 'goals'
  | 'health-and-risk'
  | 'science-lab';

export interface BillItem {
  id: string;
  name: string;
  amount: number;
  dueDay: number;
  category: 'Subscription' | 'Utility' | 'EMI' | 'Fixed';
  isPausable: boolean;
  isPaused: boolean;
  tokenCount: number;
}

export interface GoalItem {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDay: number;
  dailySip: number;
  projectedDay: number;
  color: string;
}

export interface PresetExpense {
  id: string;
  name: string;
  amount: number;
  category: string;
  type: string;
  description: string;
}

export interface LedgerEntry {
  id: string;
  day: string;
  desc: string;
  cat: string;
  amt: number;
  isCommitted?: boolean;
}

export interface ConsequenceMetrics {
  liquidBalanceBefore: number;
  liquidBalanceAfter: number;
  dailyAllowanceBefore: number;
  dailyAllowanceAfter: number;
  goaTargetDayBefore: number;
  goaTargetDayAfter: number;
  goaDaysSlip: number;
  monthEndForecastBefore: number;
  monthEndForecastAfter: number;
  isDeficit: boolean;
  collapseDay: number | null;
  volatilityIndexBefore: number;
  volatilityIndexAfter: number;
  healthIndexBefore: number;
  healthIndexAfter: number;
  verdict: VerdictType;
  runwaySevered: boolean;
  clearanceDeltaPercent: number;
  ghostTokenCount: number;
  safeRemainingTokens: number;
}

export interface SimulationState {
  expenseName: string;
  expenseAmount: number;
  expenseCategory: string;
  expenseType: string;
  executionDay: number;
  cameraView: CameraView;
  projectionMode: ProjectionMode;
  appliedStrategyId: 'offset' | 'split' | 'shift' | null;
  isCommitted: boolean;
  committedTxId: string | null;
  soundEnabled: boolean;
}

export interface ChemicalProperty {
  CID: number;
  name: string;
  MolecularFormula: string;
  MolecularWeight: number;
  CanonicalSMILES: string;
  XLogP: number | null;
  TPSA: number;
  HBondDonorCount: number;
  HBondAcceptorCount: number;
  RotatableBondCount: number;
  structurePngUrl: string;
  labReagentCost: number;
  lipinskiPass: boolean;
  lipinskiViolations: string[];
  veberPass: boolean;
  veberViolations: string[];
}

export interface LiteratureArticle {
  id: string;
  title: string;
  authorString: string;
  journalTitle: string;
  pubYear: string;
  doi?: string;
  citedByCount: number;
  isOpenAccess: boolean;
  europePmcUrl: string;
  apcCost: number;
}

export interface ProteinTarget {
  primaryAccession: string;
  uniProtkbId: string;
  geneName: string;
  organism: string;
  proteinName: string;
  sequenceLength: number;
  alphaFoldUrl: string;
  computeCost: number;
}
