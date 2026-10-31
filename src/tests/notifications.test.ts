import { describe, it, expect } from "vitest";
import { buildWhatsAppLink } from "@/lib/notifications";

describe("Notifications Utilities", () => {
  it("generates a clean wa.me URL with phone and encoded reminder text", () => {
    const link = buildWhatsAppLink(
      "+91 98765-43210",
      "Hello Mr. Sharma, Aarav's fee of ₹2,000 is due on 8 Oct 2026."
    );
    expect(link).toContain("https://wa.me/919876543210?text=");
    expect(link).toContain(encodeURIComponent("Aarav's fee"));
  });
});
