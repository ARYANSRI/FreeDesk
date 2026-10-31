/**
 * Billing & Currency Helpers
 * All money stored in integer paise.
 */
export function formatPaiseToRupees(paise: number): string {
  const rupees = paise / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(rupees);
}

export function rupeesToPaise(rupees: number): number {
  return Math.round(rupees * 100);
}
