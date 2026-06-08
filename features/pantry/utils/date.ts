const MS_PER_DAY = 24 * 60 * 60 * 1000;

function startOfDay(date: Date): Date {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
}

function parseDate(dateStr: string | undefined): Date | null {
  if (!dateStr) return null;
  const parsed = new Date(dateStr);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function daysBetween(from: Date, to: Date): number {
  return Math.round(
    (startOfDay(to).getTime() - startOfDay(from).getTime()) / MS_PER_DAY,
  );
}

export function getDaysInPantry(createdAt: string | undefined): number | null {
  const created = parseDate(createdAt);
  if (!created) return null;
  return daysBetween(created, new Date());
}

export function getDaysUntilExpiry(
  expirationDate: string | undefined,
): number | null {
  const expires = parseDate(expirationDate);
  if (!expires) return null;
  return daysBetween(new Date(), expires);
}

export function formatDaysLabel(days: number | null): string {
  if (days === null) return '—';
  if (days < 0) return 'Expired';
  if (days === 0) return 'Today';
  if (days === 1) return '1 day';
  return `${days} days`;
}

export function isExpiringSoon(
  daysUntil: number | null,
  threshold = 3,
): boolean {
  if (daysUntil === null) return false;
  return daysUntil <= threshold;
}
