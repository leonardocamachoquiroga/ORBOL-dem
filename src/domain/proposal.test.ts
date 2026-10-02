import { describe, expect, it } from "vitest";
import { estimateMonthly, providerMonthlyUsd } from "./proposal";

describe("official WhatsApp provider costs", () => {
  it("counts inbound and outbound Twilio messages at the published rate", () => {
    expect(providerMonthlyUsd("twilio", 5000)).toBe(25);
    expect(providerMonthlyUsd("twilio", 50000)).toBe(250);
  });

  it("keeps direct access and the regular 360dialog license independent of volume", () => {
    expect(providerMonthlyUsd("meta", 50000)).toBe(0);
    expect(providerMonthlyUsd("360dialog", 5000)).toBe(59);
    expect(providerMonthlyUsd("360dialog", 50000)).toBe(59);
    expect(providerMonthlyUsd("twilio", 11800)).toBe(59);
  });

  it("adds provider fees to the planning subtotal without inventing a CRM license", () => {
    const direct = estimateMonthly("meta", 10000, 450);
    const twilio = estimateMonthly("twilio", 10000, 450);
    expect(direct.totalMin).toBe(780);
    expect(direct.totalMax).toBe(840);
    expect(twilio.totalMin - direct.totalMin).toBe(50);
    expect(estimateMonthly("360dialog", 10000, 450).totalMin).toBe(839);
  });
});
