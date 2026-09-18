import { describe, expect, it } from "vitest";
import { calculateQuote } from "./quote";
import { vehicles } from "./vehicles";

describe("quote domain", () => {
  it("recalculates a positive monthly payment from the catalog price", () => {
    const result = calculateQuote(vehicles[1], { vehicleId: vehicles[1].id, downPaymentUsd: 9000, termMonths: 48 });
    expect(result.vehiclePriceUsd).toBe(29900);
    expect(result.financedAmountUsd).toBe(20900);
    expect(result.monthlyPaymentUsd).toBeGreaterThan(0);
    expect(result.isDemo).toBe(true);
  });

  it("caps an oversized down payment instead of producing a negative loan", () => {
    const result = calculateQuote(vehicles[0], { vehicleId: vehicles[0].id, downPaymentUsd: 999999, termMonths: 24 });
    expect(result.financedAmountUsd).toBeGreaterThanOrEqual(0);
    expect(result.downPaymentUsd).toBeLessThan(vehicles[0].priceUsd);
  });
});
