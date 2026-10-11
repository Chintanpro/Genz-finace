/**
 * @file src/components/ErrorBoundary.tsx
 * @description Production error boundary catching unhandled rendering exceptions.
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Uncaught error inside Banknote Runway Engine:', error, errorInfo);
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: null });
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          role="alert"
          aria-live="assertive"
          className="min-h-screen bg-[#f9f9ff] flex items-center justify-center p-6 text-[#181c23]"
        >
          <div className="max-w-md w-full bg-[#ffffff] p-6 rounded-xl border border-[#e0e2ec] shadow-lg text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]" aria-hidden="true">
                warning
              </span>
            </div>
            <h2 className="font-headline-md text-[20px] font-bold text-[#181c23]">
              Runway Engine Safeguard Triggered
            </h2>
            <p className="font-body-sm text-[13px] text-[#47464e]">
              A calculation variance or rendering interruption occurred. Your ledger data remains
              safe.
            </p>
            {this.state.error && (
              <div className="p-3 bg-[#f1f3fd] rounded text-left font-mono text-[11px] text-[#ba1a1a] overflow-x-auto max-h-32">
                {this.state.error.message}
              </div>
            )}
            <button
              onClick={this.handleReset}
              className="w-full py-2.5 rounded bg-[#17173d] text-white font-label-caps text-[11px] font-bold hover:bg-[#000000] transition-colors focus-visible:ring-2 focus-visible:ring-[#17173d]"
            >
              RESTART EXPEDITION
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
