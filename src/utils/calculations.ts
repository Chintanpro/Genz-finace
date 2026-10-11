/**
 * @file src/utils/calculations.ts
 * @description Pure calculation functions for the Banknote Studio runway engine.
 */

import { BillItem, ConsequenceMetrics } from '../types';
import { BASELINE_EXPEDITION, INITIAL_BILLS } from '../constants';

/**
 * Calculates complete consequence metrics dynamically based on simulated amount and execution day
 *
 * @param simulatedAmount - Amount in INR to simulate
 * @param executionDay - Day of expense injection (1-30)
 * @param activeBills - Currently configured bill obligations
 * @param projectionMode - 'before' or 'after' mode
 * @returns Comprehensive consequence metrics object
 */
export function calculateConsequences(
  simulatedAmount: number,
  executionDay = 12,
  activeBills: BillItem[] = INITIAL_BILLS,
  projectionMode: 'before' | 'after' = 'after'
): ConsequenceMetrics {
  const currentLiquid = BASELINE_EXPEDITION.liquidBalanceCurrent;
  const daysRemaining = Math.max(1, BASELINE_EXPEDITION.totalDays - executionDay);

  // If viewing 'before', simulate 0 extra expenditure
  const effectiveExpense = projectionMode === 'before' ? 0 : simulatedAmount;

  const liquidBalanceBefore = currentLiquid;
  const liquidBalanceAfter = Math.max(0, currentLiquid - effectiveExpense);

  // Calculate upcoming unpaused bills from executionDay to Day 30
  const upcomingBills = activeBills
    .filter((b) => b.dueDay >= executionDay && !b.isPaused)
    .reduce((acc, b) => acc + b.amount, 0);

  // Baseline remaining without simulation
  const baselineFreeSurplus = liquidBalanceBefore - upcomingBills;
  const dailyAllowanceBefore = Math.max(0, Math.round(baselineFreeSurplus / daysRemaining));

  // Simulated remaining
  const simulatedFreeSurplus = liquidBalanceAfter - upcomingBills;
  const dailyAllowanceAfter = Math.max(
    0,
    Math.round(simulatedFreeSurplus / daysRemaining)
  );

  // Month-end forecast
  const monthEndForecastBefore = BASELINE_EXPEDITION.monthEndForecastBaseline;
  const monthEndForecastAfter = monthEndForecastBefore - effectiveExpense;
  const isDeficit = monthEndForecastAfter < 0;

  // Collapse Day Calculation: trace daily burn to zero point
  let collapseDay: number | null = null;
  if (isDeficit) {
    let trackingCash = liquidBalanceAfter;
    const dailySubsistenceBurn = 120; // minimal survival burn per day
    for (let d = executionDay; d <= 30; d++) {
      const billsOnDay = activeBills
        .filter((b) => b.dueDay === d && !b.isPaused)
        .reduce((sum, b) => sum + b.amount, 0);
      trackingCash -= billsOnDay + dailySubsistenceBurn;
      if (trackingCash <= 0) {
        collapseDay = d;
        break;
      }
    }
    if (!collapseDay) collapseDay = 16;
  }

  // Goa Trip Slip
  const goaTargetDayBefore = 30;
  const deficitAmount = Math.max(0, -monthEndForecastAfter);
  const goaDaysSlip = effectiveExpense === 0 ? 0 : Math.ceil(deficitAmount / 50);
  const goaTargetDayAfter = goaTargetDayBefore + goaDaysSlip;

  // Volatility Risk Index (0 - 100)
  const expenseRatio = effectiveExpense / BASELINE_EXPEDITION.totalBudget;
  const volatilityIndexBefore = 38;
  const volatilitySpike = Math.round(expenseRatio * 175);
  const volatilityIndexAfter = Math.min(98, Math.max(38, 38 + volatilitySpike));

  // Financial Health Index (0 - 100)
  const healthIndexBefore = 72;
  const healthDrop = Math.round(expenseRatio * 115);
  const healthIndexAfter = Math.max(20, 72 - healthDrop);

  // Verdict calculation
  let verdict: 'RED' | 'AMBER' | 'GREEN' = 'GREEN';
  let runwaySevered = false;

  if (monthEndForecastAfter < -500 || (collapseDay !== null && collapseDay < 28)) {
    verdict = 'RED';
    runwaySevered = true;
  } else if (monthEndForecastAfter < 200 || dailyAllowanceAfter < 90) {
    verdict = 'AMBER';
  } else {
    verdict = 'GREEN';
  }

  // Tokens: 100 total
  const ghostTokenCount = Math.min(70, Math.round(effectiveExpense / 100));
  const spentTokens = 30;
  const billTokens = 18;
  const safeRemainingTokens = Math.max(0, 100 - spentTokens - billTokens - ghostTokenCount);

  const clearanceDeltaPercent = -Math.round((effectiveExpense / 5350) * 100 * 10) / 10;

  return {
    liquidBalanceBefore,
    liquidBalanceAfter,
    dailyAllowanceBefore,
    dailyAllowanceAfter,
    goaTargetDayBefore,
    goaTargetDayAfter,
    goaDaysSlip,
    monthEndForecastBefore,
    monthEndForecastAfter,
    isDeficit,
    collapseDay,
    volatilityIndexBefore,
    volatilityIndexAfter,
    healthIndexBefore,
    healthIndexAfter,
    verdict,
    runwaySevered,
    clearanceDeltaPercent,
    ghostTokenCount,
    safeRemainingTokens,
  };
}

/**
 * Formats a numeric currency value into Indian numbering system format (e.g. ₹2,499)
 *
 * @param amount - Numeric value
 * @param showSymbol - Whether to prefix with ₹
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, showSymbol = true): string {
  const formatted = Math.abs(amount).toLocaleString('en-IN');
  const sign = amount < 0 ? '-' : '';
  return `${sign}${showSymbol ? '₹' : ''}${formatted}`;
}
