/**
 * @file src/components/Footer.tsx
 * @description Accessible application footer with legal disclaimer and engine verification.
 */

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer
      role="contentinfo"
      aria-label="Engine specification and legal disclaimer"
      className="w-full bg-[#ffffff] shadow-[0_-1px_6px_rgba(0,0,0,0.03)] py-4 sm:py-6 mt-12 border-t border-[#e0e2ec]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2 text-[#47464e] font-body-sm text-[11px] sm:text-[12px] text-center md:text-left">
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
            lock
          </span>
          <span>
            Simulation for learning, not financial advice. Demo data stays strictly on your device.
          </span>
        </div>

        <div className="flex items-center gap-3 font-label-caps text-[9px] sm:text-[10px] text-[#47464e]">
          <span>CALIBRATED FOR ₹10,000 / 30-DAY VELOCITY</span>
          <span className="px-2 py-0.5 rounded bg-[#ebedf7] text-[#181c23] font-bold">
            INR SYSTEM
          </span>
        </div>
      </div>
    </footer>
  );
};
