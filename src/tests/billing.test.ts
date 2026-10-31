import { describe, it, expect } from "vitest";
import { formatPaiseToRupees, rupeesToPaise } from "@/lib/billing";

describe("Billing & Money Utilities", () => {
  it("converts rupees to integer paise without floating point issues", () => {
    expect(rupeesToPaise(500)).toBe(50000);
    expect(rupeesToPaise(1999.5)).toBe(199950);
  });

  it("formats paise to Indian Rupee representation", () => {
    const formatted = formatPaiseToRupees(200000);
    expect(formatted).toContain("2,000");
  });
});
