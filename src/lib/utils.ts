import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function truncateHash(hash: string, chars = 8): string {
  if (!hash || hash.length < chars * 2 + 2) return hash;
  return `${hash.slice(0, chars + 2)}...${hash.slice(-chars)}`;
}

export function confidenceToLabel(confidence: number): string {
  if (confidence >= 0.90) return 'Very high consistency';
  if (confidence >= 0.80) return 'High consistency';
  if (confidence >= 0.70) return 'Moderate consistency';
  if (confidence >= 0.60) return 'Low consistency';
  return 'Inconclusive';
}

export function confidenceToPercent(confidence: number): string {
  return `${Math.round(confidence * 100)}%`;
}
