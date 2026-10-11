/**
 * @file src/services/storageService.ts
 * @description Local persistence, JSON/CSV ledger export, and simulation reports.
 */

import { LedgerEntry } from '../types';

export interface ExportReportPayload {
  expedition: string;
  calibration: string;
  currentDay: number;
  liquidBalance: number;
  freeToSpend: number;
  committedBills: number;
  ledger: LedgerEntry[];
  exportedAt: string;
}

/**
 * Exports current financial ledger state as formatted JSON file
 */
export function exportLedgerAsJson(payload: ExportReportPayload): void {
  if (typeof window === 'undefined') return;
  const jsonContent = JSON.stringify(payload, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `runway-cashflow-day-${payload.currentDay}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Exports current financial ledger state as standard CSV file
 */
export function exportLedgerAsCsv(ledger: LedgerEntry[], currentDay: number): void {
  if (typeof window === 'undefined') return;
  const headers = ['Day', 'Description', 'Category', 'Amount (INR)', 'Committed'];
  const rows = ledger.map((item) => [
    `"${item.day}"`,
    `"${item.desc.replace(/"/g, '""')}"`,
    `"${item.cat}"`,
    item.amt,
    item.isCommitted ? 'Yes' : 'No',
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `runway-ledger-day-${currentDay}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
