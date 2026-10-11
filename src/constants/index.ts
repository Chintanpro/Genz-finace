/**
 * @file src/constants/index.ts
 * @description Application constants, calibration models, and baseline data.
 */

import { BillItem, GoalItem, PresetExpense, LedgerEntry } from '../types';

export const BASELINE_EXPEDITION = {
  totalBudget: 10000,
  tokenValue: 100, // 1 token = ₹100, 100 tokens total
  totalTokens: 100,
  currentDay: 12,
  totalDays: 30,
  spentSoFar: 2987, // ~30 tokens
  liquidBalanceCurrent: 7013,
  freeToSpendCurrent: 3201,
  dailyAllowanceBaseline: 168,
  baselineHealthIndex: 72,
  baselineVolatilityIndex: 38,
  monthEndForecastBaseline: 104,
  currencySymbol: '₹',
  currencyCode: 'INR',
} as const;

export const INITIAL_BILLS: BillItem[] = [
  {
    id: 'bill-1',
    name: 'Spotify & Cloud Storage',
    amount: 150,
    dueDay: 8,
    category: 'Subscription',
    isPausable: false,
    isPaused: false,
    tokenCount: 2,
  },
  {
    id: 'bill-2',
    name: 'AI Study Tool (Pro Tier)',
    amount: 399,
    dueDay: 15,
    category: 'Subscription',
    isPausable: true,
    isPaused: false,
    tokenCount: 4,
  },
  {
    id: 'bill-3',
    name: 'Cult Gym Pass',
    amount: 499,
    dueDay: 16,
    category: 'Subscription',
    isPausable: true,
    isPaused: false,
    tokenCount: 5,
  },
  {
    id: 'bill-4',
    name: 'Smartphone EMI',
    amount: 1200,
    dueDay: 25,
    category: 'EMI',
    isPausable: false,
    isPaused: false,
    tokenCount: 12,
  },
  {
    id: 'bill-5',
    name: 'High-speed Fiber Broadband',
    amount: 799,
    dueDay: 28,
    category: 'Utility',
    isPausable: false,
    isPaused: false,
    tokenCount: 8,
  },
  {
    id: 'bill-6',
    name: 'Hostel Maintenance & Water',
    amount: 950,
    dueDay: 29,
    category: 'Fixed',
    isPausable: false,
    isPaused: false,
    tokenCount: 9,
  },
];

export const INITIAL_GOALS: GoalItem[] = [
  {
    id: 'goal-goa',
    name: 'Goa Trip Expedition',
    targetAmount: 5000,
    currentAmount: 2400,
    targetDay: 30,
    dailySip: 50,
    projectedDay: 30,
    color: '#9f86f0',
  },
  {
    id: 'goal-emergency',
    name: 'Emergency Buffer Vault',
    targetAmount: 3000,
    currentAmount: 1800,
    targetDay: 30,
    dailySip: 40,
    projectedDay: 30,
    color: '#ffc83d',
  },
  {
    id: 'goal-tech',
    name: 'Noise-Cancelling Earbuds',
    targetAmount: 2500,
    currentAmount: 1100,
    targetDay: 45,
    dailySip: 30,
    projectedDay: 45,
    color: '#3fa7f2',
  },
];

export const PRESET_EXPENSES: PresetExpense[] = [
  {
    id: 'preset-sneakers',
    name: 'Buying sneakers',
    amount: 2499,
    category: 'WANT · DISCRETIONARY',
    type: 'ONE-TIME CHARGE',
    description: 'Limited edition streetwear sneakers on flash clearance sale.',
  },
  {
    id: 'preset-phone-emi',
    name: 'Upgraded mechanical keyboard',
    amount: 1500,
    category: 'WANT · ACCESSORY',
    type: 'ONE-TIME CHARGE',
    description: 'Custom mechanical keyboard with lubricated tactile switches.',
  },
  {
    id: 'preset-dinner',
    name: 'Rooftop cocktail party & dinner',
    amount: 999,
    category: 'LEISURE · SOCIAL',
    type: 'ONE-TIME CHARGE',
    description: 'Weekend celebration with friends including dinner and commute.',
  },
  {
    id: 'preset-max',
    name: 'Weekend camping retreat',
    amount: 3201,
    category: 'EXPEDITION · TRAVEL',
    type: 'ONE-TIME CHARGE',
    description: 'All-inclusive weekend trekking package with rental gear.',
  },
  {
    id: 'preset-reagent',
    name: 'PubChem Reference Standards & Reagents',
    amount: 1450,
    category: 'SCIENCE · LAB REAGENTS',
    type: 'ONE-TIME CHARGE',
    description: 'High-purity chemical standards for chromatographic validation.',
  },
  {
    id: 'preset-alphafold',
    name: 'GPU Cloud AlphaFold Compute Credits',
    amount: 850,
    category: 'SCIENCE · COMPUTE',
    type: 'ONE-TIME CHARGE',
    description: 'Dedicated GPU cluster runtime for de novo protein folding.',
  },
  {
    id: 'preset-apc',
    name: 'Open Access Journal Publication APC',
    amount: 2100,
    category: 'SCIENCE · PUBLICATION',
    type: 'ONE-TIME CHARGE',
    description: 'Subsidized open-access processing charge for peer-reviewed paper.',
  },
];

export const INITIAL_LEDGER: LedgerEntry[] = [
  { id: 'tx-1', day: 'D12', desc: 'Evening snack & cutting chai', cat: 'Daily Food', amt: -60 },
  { id: 'tx-2', day: 'D11', desc: 'Metro transit card smart-card topup', cat: 'Commute', amt: -300 },
  { id: 'tx-3', day: 'D10', desc: 'Weekly pantry vegetables & fruit', cat: 'Groceries', amt: -850 },
  { id: 'tx-4', day: 'D8', desc: 'Spotify & Cloud backup renewal', cat: 'Subscription', amt: -150 },
  { id: 'tx-5', day: 'D5', desc: 'Pharmacy essentials & vitamins', cat: 'Health', amt: -420 },
  { id: 'tx-6', day: 'D2', desc: 'Weekend cafe study session', cat: 'Discretionary', amt: -290 },
];
