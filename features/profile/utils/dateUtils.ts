/**
 * Formats an ISO date string (YYYY-MM-DD) into a human-readable locale string.
 *
 * @example
 * formatDate("2026-06-08") // → "8 June 2026"
 */
export const formatDate = (iso: string): string => {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
