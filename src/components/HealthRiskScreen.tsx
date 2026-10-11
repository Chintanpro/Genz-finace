/**
 * @file src/components/HealthRiskScreen.tsx
 * @description Volatility risk diagnostics, financial health indexes, and shock scenario simulations.
 */

import React, { useState } from 'react';
import { ConsequenceMetrics } from '../types';

interface HealthRiskScreenProps {
  metrics: ConsequenceMetrics;
  onNavigateToLab: () => void;
}

export const HealthRiskScreen: React.FC<HealthRiskScreenProps> = ({
  metrics,
  onNavigateToLab,
}) => {
  const [activeStressTest, setActiveStressTest] = useState<string | null>(null);

  const stressScenarios = [
    {
      id: 'delayed-invoice',
      name: 'Freelance Payout Delayed 7 Days',
      amount: -1500,
      impact: 'Moves safe runway back by 5 days; freezes emergency cushion.',
      severity: 'AMBER',
    },
    {
      id: 'urgent-medical',
      name: 'Emergency Clinic & Pharmacy Visit',
      amount: -1800,
      impact: 'Triggers instant collapse to Day 14 if combined with sneaker purchase.',
      severity: 'RED',
    },
    {
      id: 'phone-repair',
      name: 'Screen Glass Replacement & Service',
      amount: -1200,
      impact: 'Depletes unallocated discretionary buffer to ₹401.',
      severity: 'AMBER',
    },
  ];

  return (
    <div
      role="tabpanel"
      id="panel-health-and-risk"
      aria-labelledby="tab-health-and-risk"
      className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6 animate-fadeIn"
    >
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#ffffff] p-5 rounded-xl border border-[#e0e2ec] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-[#ebedf7] text-[#181c23] font-label-caps text-[10px] font-bold">
              DIAGNOSTIC SUITE
            </span>
            <span className="text-[#47464e] font-body-sm text-[12px]" aria-hidden="true">
              ·
            </span>
            <span className="text-[#47464e] font-label-caps text-[10px]">
              ALGORITHM VER 2.8 ACTIVE
            </span>
          </div>
          <h1 className="font-headline-lg text-[22px] sm:text-[26px] text-[#181c23] tracking-tight">
            Financial Health & Volatility Risk
          </h1>
          <p className="font-body-md text-[13px] text-[#47464e] mt-1 max-w-2xl">
            Financial runway health is treated like an active aircraft airstrip: clear visual thresholds,
            navigational headings, and zero tolerance for sudden fuel exhaustion before the finish line.
          </p>
        </div>

        <button
          onClick={onNavigateToLab}
          className="flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded bg-[#17173d] text-white font-label-caps text-[11px] font-bold hover:bg-[#000000] transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#17173d]"
        >
          <span>SIMULATE SPEND</span>
        </button>
      </div>

      {/* 2 Main Radar Diagnostic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Volatility Risk Index */}
        <article
          aria-labelledby="vri-heading"
          className="bg-[#ffffff] rounded-xl p-5 border border-[#e0e2ec] shadow-xs space-y-4"
        >
          <div className="flex items-center justify-between border-b border-[#e0e2ec] pb-3">
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-[#ba1a1a] text-[22px]"
                aria-hidden="true"
              >
                crisis_alert
              </span>
              <h2 id="vri-heading" className="font-headline-sm text-[18px] text-[#181c23]">
                Volatility Risk Index (VRI)
              </h2>
            </div>
            <span
              className={`px-2 py-0.5 rounded font-label-caps text-[10px] font-bold ${
                metrics.volatilityIndexAfter > 70
                  ? 'bg-[#ffdad6] text-[#93000a]'
                  : 'bg-[#dce1fc] text-[#141b2e]'
              }`}
            >
              {metrics.volatilityIndexAfter > 70 ? 'DANGER ZONE' : 'MONITORED'}
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <div>
              <span className="font-label-caps text-[10px] text-[#47464e] block">
                CURRENT PROJECTED SCORE
              </span>
              <span className="font-display-lg text-[32px] sm:text-[40px] text-[#ba1a1a] font-extrabold tabular-numbers">
                {metrics.volatilityIndexAfter}
                <span className="text-[18px] sm:text-[20px] font-normal text-[#47464e]"> / 100</span>
              </span>
            </div>
            <div className="text-right">
              <span className="font-label-caps text-[10px] text-[#47464e] block">
                BASELINE
              </span>
              <span className="font-ledger-num-md text-[16px] sm:text-[18px] text-[#181c23] font-bold">
                {metrics.volatilityIndexBefore} (Watch)
              </span>
            </div>
          </div>

          <div
            role="progressbar"
            aria-label="Volatility Risk Index Meter"
            aria-valuenow={metrics.volatilityIndexAfter}
            aria-valuemin={0}
            aria-valuemax={100}
            className="w-full h-3 bg-[#e6e8f2] rounded-full overflow-hidden"
          >
            <div
              className="h-full bg-gradient-to-r from-[#2c6b1e] via-[#ffc83d] to-[#ba1a1a] transition-all duration-500"
              style={{ width: `${metrics.volatilityIndexAfter}%` }}
            />
          </div>

          <p className="font-body-sm text-[12px] text-[#47464e] leading-relaxed">
            High volatility values imply that your liquid capital is concentrated in committed
            obligations, with zero shock absorption for unexpected household emergencies.
          </p>
        </article>

        {/* Card 2: Financial Health Index */}
        <article
          aria-labelledby="fhi-heading"
          className="bg-[#ffffff] rounded-xl p-5 border border-[#e0e2ec] shadow-xs space-y-4"
        >
          <div className="flex items-center justify-between border-b border-[#e0e2ec] pb-3">
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-[#2c6b1e] text-[22px]"
                aria-hidden="true"
              >
                health_and_safety
              </span>
              <h2 id="fhi-heading" className="font-headline-sm text-[18px] text-[#181c23]">
                Financial Health Index (FHI)
              </h2>
            </div>
            <span
              className={`px-2 py-0.5 rounded font-label-caps text-[10px] font-bold ${
                metrics.healthIndexAfter < 50
                  ? 'bg-[#ffdad6] text-[#93000a]'
                  : 'bg-[#a6e34b]/30 text-[#2c6b1e]'
              }`}
            >
              {metrics.healthIndexAfter < 50 ? 'STRETCHED' : 'SOLID CLEARANCE'}
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <div>
              <span className="font-label-caps text-[10px] text-[#47464e] block">
                HEALTH CAPACITY
              </span>
              <span
                className={`font-display-lg text-[32px] sm:text-[40px] font-extrabold tabular-numbers ${
                  metrics.healthIndexAfter < 50 ? 'text-[#ba1a1a]' : 'text-[#2c6b1e]'
                }`}
              >
                {metrics.healthIndexAfter}
                <span className="text-[18px] sm:text-[20px] font-normal text-[#47464e]"> / 100</span>
              </span>
            </div>
            <div className="text-right">
              <span className="font-label-caps text-[10px] text-[#47464e] block">
                BASELINE
              </span>
              <span className="font-ledger-num-md text-[16px] sm:text-[18px] text-[#181c23] font-bold">
                {metrics.healthIndexBefore} (Solid)
              </span>
            </div>
          </div>

          <div
            role="progressbar"
            aria-label="Financial Health Index Meter"
            aria-valuenow={metrics.healthIndexAfter}
            aria-valuemin={0}
            aria-valuemax={100}
            className="w-full h-3 bg-[#e6e8f2] rounded-full overflow-hidden"
          >
            <div
              className={`h-full transition-all duration-500 ${
                metrics.healthIndexAfter < 50 ? 'bg-[#ba1a1a]' : 'bg-[#2c6b1e]'
              }`}
              style={{ width: `${metrics.healthIndexAfter}%` }}
            />
          </div>

          <p className="font-body-sm text-[12px] text-[#47464e] leading-relaxed">
            Consistently operating above 65 maintains runway durability. Dropping below 50 causes
            liquidity freezes that slip goal milestones and trigger penalty stress.
          </p>
        </article>
      </div>

      {/* Stress Testing Sandbox */}
      <section
        aria-labelledby="stress-heading"
        className="bg-[#ffffff] rounded-xl p-5 border border-[#e0e2ec] shadow-xs space-y-4"
      >
        <div className="flex items-center justify-between border-b border-[#e0e2ec] pb-3">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[#17173d] text-[20px]"
              aria-hidden="true"
            >
              biotech
            </span>
            <h2 id="stress-heading" className="font-headline-sm text-[18px] text-[#181c23]">
              Stress-Testing Scenarios (Shock Resilience Check)
            </h2>
          </div>
          <span className="font-label-caps text-[10px] text-[#47464e]">
            CLICK TO SIMULATE SHOCK
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {stressScenarios.map((sc) => {
            const isSelected = activeStressTest === sc.id;
            return (
              <button
                key={sc.id}
                onClick={() =>
                  setActiveStressTest(isSelected ? null : sc.id)
                }
                aria-pressed={isSelected}
                className={`text-left p-3.5 rounded-lg border transition-all cursor-pointer min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#17173d] ${
                  isSelected
                    ? 'bg-[#17173d] text-white border-[#17173d] shadow-sm'
                    : 'bg-[#f1f3fd] text-[#181c23] border-[#e0e2ec] hover:bg-[#ebedf7]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`px-1.5 py-0.5 rounded font-label-caps text-[9px] font-bold ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : sc.severity === 'RED'
                        ? 'bg-[#ffdad6] text-[#93000a]'
                        : 'bg-[#dce1fc] text-[#141b2e]'
                    }`}
                  >
                    {sc.severity} RISK
                  </span>
                  <span
                    className={`font-ledger-num-md text-[13px] font-bold ${
                      isSelected ? 'text-[#ffdad6]' : 'text-[#ba1a1a]'
                    }`}
                  >
                    -₹{Math.abs(sc.amount).toLocaleString('en-IN')}
                  </span>
                </div>
                <h3 className="font-headline-sm text-[14px] font-semibold mb-1">
                  {sc.name}
                </h3>
                <p
                  className={`font-body-sm text-[11px] leading-relaxed ${
                    isSelected ? 'text-white/80' : 'text-[#47464e]'
                  }`}
                >
                  {sc.impact}
                </p>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
