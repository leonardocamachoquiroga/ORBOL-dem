import { describe, expect, it } from "vitest";
import { advisorContextDefaults, extractContext, getRuleBasedAdvisor, recommendVehicle } from "./advisor";

describe("advisor domain", () => {
  it("extracts Spanish buying context", () => {
    expect(extractContext("Somos cuatro, viajamos los fines de semana y tengo un presupuesto de USD 30 mil")).toMatchObject({ budgetMaxUsd: 30000, passengers: 4, usage: "travel" });
  });

  it("recommends a seven-seat vehicle to a family of seven", () => {
    const recommendation = recommendVehicle({ ...advisorContextDefaults, passengers: 7, usage: "travel", budgetMaxUsd: 45000, priorities: ["space", "range"] });
    expect(recommendation.id).toBe("alto-x7");
  });

  it("asks focused questions before recommending", () => {
    const turn = getRuleBasedAdvisor("Somos 5", advisorContextDefaults);
    expect(turn.message).toContain("recorridos");
    expect(turn.quickReplies.length).toBeGreaterThan(1);
  });
});
