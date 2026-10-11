/**
 * @file src/components/Header.tsx
 * @description Master telemetry header, responsive mobile navigation, and status seals.
 */

import React, { useState } from 'react';
import { ConsequenceMetrics, ActiveTabId } from '../types';

interface HeaderProps {
  currentDay: number;
  activeTab: ActiveTabId;
  onSelectTab: (tab: ActiveTabId) => void;
  onOpenTimeMachine: () => void;
  onOpenJudgeMode: () => void;
  metrics: ConsequenceMetrics;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentDay,
  activeTab,
  onSelectTab,
  onOpenTimeMachine,
  onOpenJudgeMode,
  metrics,
  soundEnabled,
  onToggleSound,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDanger = metrics.verdict === 'RED';

  const navItems: Array<{ id: ActiveTabId; label: string; icon: string }> = [
    { id: 'home', label: 'Home', icon: 'dashboard' },
    { id: 'what-if-lab', label: 'What-If Lab', icon: 'science' },
    { id: 'bills-and-subscriptions', label: 'Bills & Subscriptions', icon: 'receipt_long' },
    { id: 'goals', label: 'Goals', icon: 'flag' },
    { id: 'health-and-risk', label: 'Health & Risk', icon: 'health_and_safety' },
    { id: 'science-lab', label: 'Science & Bio-Runway Lab', icon: 'biotech' },
  ];

  const handleTabClick = (tabId: ActiveTabId) => {
    onSelectTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header
      role="banner"
      className="fixed top-0 w-full z-40 bg-[#ffffff]/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#e0e2ec]"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex flex-col justify-between py-2">
        {/* Top Bar Row */}
        <div className="flex items-center justify-between gap-2 sm:gap-4 pt-1">
          {/* Brand Logo & Tag */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleTabClick('what-if-lab')}
              className="text-left flex flex-col group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#17173d] rounded p-1"
              aria-label="Runway Cashflow Clearance Home"
            >
              <div className="flex items-center gap-1.5">
                <span className="font-headline-md text-[18px] sm:text-[20px] tracking-tight text-[#181c23] uppercase font-bold">
                  RUNWAY
                </span>
                <span className="px-1.5 py-0.5 rounded bg-[#e6e8f2] text-[#47464e] font-label-caps text-[9px] sm:text-[10px]">
                  ₹10K EXPEDITION
                </span>
              </div>
              <span className="font-label-sm text-[10px] sm:text-[11px] text-[#47464e]">
                Personal Cashflow Clearance
              </span>
            </button>

            {/* Desktop Status Telemetry */}
            <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-[#e0e2ec]">
              {/* Day Scrubber / Time Machine Trigger */}
              <button
                onClick={onOpenTimeMachine}
                className="flex items-center gap-1.5 px-2.5 py-1 min-h-[36px] rounded bg-[#f1f3fd] hover:bg-[#e0e2ec] transition-colors text-[#181c23] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#17173d]"
                title="Open Time Machine to scrub through the 30-day expedition"
                aria-label={`Time Machine: Day ${currentDay} of 30 active. Click to scrub days.`}
              >
                <span className="font-ledger-num-md font-semibold text-[13px]">
                  Day {currentDay}
                </span>
                <span className="text-[#47464e] font-body-sm text-[11px]">of 30</span>
                <span className="ml-1 px-1.5 py-0.5 rounded bg-[#cde5ff] text-[#001d32] font-label-caps text-[9px] tracking-wider">
                  TIME MACHINE
                </span>
              </button>

              {/* Risk Status */}
              <div
                role="status"
                aria-live="polite"
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded font-label-caps text-[10px] ${
                  isDanger ? 'bg-[#ffdad6] text-[#93000a]' : 'bg-[#dce1fc] text-[#141b2e]'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isDanger ? 'bg-[#ba1a1a] animate-ping' : 'bg-[#575e74]'
                  }`}
                  aria-hidden="true"
                />
                <span>{isDanger ? 'RISK: SEVERED' : 'RISK: WATCH'}</span>
              </div>

              {/* Health Score */}
              <div
                role="status"
                aria-label={`Financial Health Score: ${metrics.healthIndexAfter} out of 100`}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#dce1fc] text-[#141b2e]"
              >
                <span className="font-ledger-num-md font-bold text-[13px]">
                  {metrics.healthIndexAfter}
                </span>
                <span className="font-label-caps text-[10px]">
                  {metrics.healthIndexAfter >= 65
                    ? 'HEALTH SOLID'
                    : metrics.healthIndexAfter >= 45
                    ? 'HEALTH STRETCHED'
                    : 'HEALTH CRITICAL'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Action Tools: Sound, Judge Mode, Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Audio Toggle */}
            <button
              onClick={onToggleSound}
              className="p-1.5 sm:px-2.5 sm:py-1 rounded bg-[#f1f3fd] hover:bg-[#ebedf7] text-[#181c23] transition-colors cursor-pointer flex items-center gap-1 min-h-[36px] focus-visible:ring-2 focus-visible:ring-[#17173d]"
              title={soundEnabled ? 'Mute tactile audio feedback' : 'Enable tactile audio feedback'}
              aria-label={soundEnabled ? 'Mute sound effects' : 'Unmute sound effects'}
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                {soundEnabled ? 'volume_up' : 'volume_off'}
              </span>
              <span className="hidden sm:inline font-label-caps text-[9px]">
                {soundEnabled ? 'AUDIO ON' : 'MUTED'}
              </span>
            </button>

            {/* Mobile Time Machine Shortcut */}
            <button
              onClick={onOpenTimeMachine}
              className="lg:hidden px-2 py-1 min-h-[36px] rounded bg-[#f1f3fd] text-[#181c23] font-label-caps text-[10px] flex items-center gap-1"
              aria-label={`Time Machine: Day ${currentDay}`}
            >
              <span className="material-symbols-outlined text-[15px]" aria-hidden="true">
                schedule
              </span>
              <span>D{currentDay}</span>
            </button>

            {/* Judge Mode Button */}
            <button
              onClick={onOpenJudgeMode}
              type="button"
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 min-h-[36px] rounded bg-[#ebedf7] text-[#181c23] font-label-caps text-[10px] sm:text-[11px] hover:bg-[#17173d] hover:text-white transition-all cursor-pointer shadow-xs active:scale-95 focus-visible:ring-2 focus-visible:ring-[#17173d]"
              aria-label="Open Judge Mode financial tribunal"
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                gavel
              </span>
              <span>JUDGE MODE</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded bg-[#f1f3fd] text-[#181c23] min-h-[36px] min-w-[36px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#17173d]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>

            {/* Pilot Profile Icon */}
            <div
              className="hidden sm:flex w-8 h-8 rounded-full bg-[#000000] text-white items-center justify-center font-bold text-xs shadow-xs"
              title="Expedition Pilot Profile"
              aria-label="Pilot profile menu"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                person
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav
          role="tablist"
          aria-label="Expedition workspaces"
          className="hidden md:flex items-center gap-1 pt-2 pb-0.5 overflow-x-auto scrollbar-none border-t border-[#e0e2ec]/60 mt-1"
        >
          {navItems.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                onClick={() => handleTabClick(tab.id)}
                className={`px-3 py-1 rounded text-[13px] font-medium transition-colors whitespace-nowrap cursor-pointer min-h-[36px] flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#17173d] ${
                  isActive
                    ? 'bg-[#17173d] text-white font-semibold shadow-xs'
                    : 'text-[#47464e] hover:bg-[#f1f3fd] hover:text-[#181c23]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]" aria-hidden="true">
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <nav
            role="navigation"
            aria-label="Mobile navigation"
            className="md:hidden flex flex-col gap-1 pt-2 pb-2 border-t border-[#e0e2ec] mt-2 animate-fadeIn"
          >
            {navItems.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`px-3 py-2.5 rounded text-[14px] font-medium text-left flex items-center gap-2 transition-colors min-h-[44px] ${
                    isActive
                      ? 'bg-[#17173d] text-white font-bold'
                      : 'text-[#181c23] hover:bg-[#f1f3fd]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
};
