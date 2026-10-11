/**
 * @file src/__tests__/simulation.test.ts
 * @description Deterministic verification suite for runway simulations, mathematics, and Lipinski rules.
 */

import { calculateConsequences, formatCurrency } from '../utils/calculations';
import { evaluateLipinski, evaluateVeber } from '../services/scienceApi';
import { BASELINE_EXPEDITION, INITIAL_BILLS } from '../constants';

/**
 * Self-contained test runner verifying mathematical invariants
 */
export function runSimulationTestSuite(): { passed: number; failed: number; results: string[] } {
  let passed = 0;
  let failed = 0;
  const results: string[] = [];

  function assert(condition: boolean, message: string) {
    if (condition) {
      passed++;
      results.push(`✓ PASS: ${message}`);
    } else {
      failed++;
      results.push(`✗ FAIL: ${message}`);
      console.error(`Assertion failed: ${message}`);
    }
  }

  // Test 1: Baseline invariant without expense
  const baseline = calculateConsequences(0, 12, INITIAL_BILLS, 'before');
  assert(baseline.liquidBalanceAfter === 7013, 'Baseline liquid balance must be ₹7,013');
  assert(baseline.dailyAllowanceBefore === 168, 'Baseline daily allowance must be ₹168/day');
  assert(baseline.verdict === 'GREEN', 'Baseline verdict must be GREEN');
  assert(!baseline.runwaySevered, 'Baseline runway must not be severed');

  // Test 2: Sneaker purchase (₹2,499) on Day 12
  const sneaker = calculateConsequences(2499, 12, INITIAL_BILLS, 'after');
  assert(sneaker.liquidBalanceAfter === 4514, 'Liquid balance after ₹2,499 must equal ₹4,514');
  assert(sneaker.dailyAllowanceAfter === 37, 'Daily allowance must drop to ₹37/day (-78%)');
  assert(sneaker.collapseDay === 16, 'Zero-runway collapse must trigger on Day 16');
  assert(sneaker.verdict === 'RED', 'Verdict must be RED (Runway severed)');
  assert(sneaker.goaDaysSlip === 42, 'Goa Trip must slip by exactly 42 days');
  assert(sneaker.ghostTokenCount === 25, '25 tokens must be ghosted for ₹2,499');

  // Test 3: Currency formatting
  assert(formatCurrency(2499) === '₹2,499', 'Currency formatter outputs standard INR symbol and grouping');
  assert(formatCurrency(-1500) === '-₹1,500', 'Currency formatter handles negative values gracefully');

  // Test 4: Lipinski Rule of 5 evaluation
  const aspirinLipinski = evaluateLipinski({
    mw: 180.16,
    logP: 1.2,
    hbd: 1,
    hba: 4,
  });
  assert(aspirinLipinski.pass, 'Aspirin must pass Lipinski Rule of 5 with 0 violations');

  const heavyCompound = evaluateLipinski({
    mw: 650,
    logP: 6.2,
    hbd: 7,
    hba: 12,
  });
  assert(!heavyCompound.pass, 'High MW (>500) and LogP (>5) compound must fail Lipinski Rule of 5');

  // Test 5: Veber Oral Bioavailability rules
  const validVeber = evaluateVeber({ rotatableBonds: 2, tpsa: 63.6 });
  assert(validVeber.pass, 'Small rotatable bonds and TPSA <= 140 must pass Veber rules');

  const invalidVeber = evaluateVeber({ rotatableBonds: 14, tpsa: 165 });
  assert(!invalidVeber.pass, 'Rotatable bonds > 10 and TPSA > 140 must fail Veber rules');

  return { passed, failed, results };
}

// Auto-run verification in test environments
if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'test') {
  runSimulationTestSuite();
}
