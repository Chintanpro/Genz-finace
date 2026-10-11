/**
 * @file src/components/LoadingSkeleton.tsx
 * @description Accessible loading skeleton screen for lazy-loaded route components.
 */

import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading workspace module"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-pulse"
    >
      <div className="h-24 bg-[#ebedf7] rounded-xl w-full" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 h-96 bg-[#ebedf7] rounded-xl" />
        <div className="lg:col-span-5 space-y-4">
          <div className="h-44 bg-[#ebedf7] rounded-xl" />
          <div className="h-32 bg-[#ebedf7] rounded-xl" />
          <div className="h-48 bg-[#ebedf7] rounded-xl" />
        </div>
      </div>
      <span className="sr-only">Calibrating runway telemetry...</span>
    </div>
  );
};
