import { z } from "zod";
import type { Vehicle } from "./vehicles";

export const quoteInputSchema = z.object({
  vehicleId: z.string().min(1),
  downPaymentUsd: z.number().min(0),
  termMonths: z.union([z.literal(24), z.literal(36), z.literal(48), z.literal(60)]),
});

export type QuoteInput = z.infer<typeof quoteInputSchema>;

export interface QuoteResult {
  vehicleId: string;
  vehicleName: string;
  vehiclePriceUsd: number;
  downPaymentUsd: number;
  financedAmountUsd: number;
  termMonths: QuoteInput["termMonths"];
  annualRate: number;
  monthlyPaymentUsd: number;
  totalCostUsd: number;
  isDemo: true;
}

export function calculateQuote(vehicle: Vehicle, input: QuoteInput): QuoteResult {
  const downPaymentUsd = Math.min(Math.max(input.downPaymentUsd, 0), vehicle.priceUsd * 0.8);
  const financedAmountUsd = Math.max(vehicle.priceUsd - downPaymentUsd, 0);
  const annualRate = 0.105;
  const monthlyRate = annualRate / 12;
  const periods = input.termMonths;
  const monthlyPaymentUsd = financedAmountUsd === 0
    ? 0
    : financedAmountUsd * (monthlyRate * Math.pow(1 + monthlyRate, periods)) / (Math.pow(1 + monthlyRate, periods) - 1);
  const roundedMonthly = Math.round(monthlyPaymentUsd);
  return {
    vehicleId: vehicle.id,
    vehicleName: vehicle.name,
    vehiclePriceUsd: vehicle.priceUsd,
    downPaymentUsd,
    financedAmountUsd,
    termMonths: input.termMonths,
    annualRate,
    monthlyPaymentUsd: roundedMonthly,
    totalCostUsd: Math.round(downPaymentUsd + roundedMonthly * periods),
    isDemo: true,
  };
}
