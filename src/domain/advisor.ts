import { z } from "zod";
import { getVehicleById, vehicles, type Vehicle } from "./vehicles";

export const customerStageSchema = z.enum(["welcome", "discovery", "recommendation", "comparison", "interest"]);
export const customerContextSchema = z.object({
  budgetMaxUsd: z.number().positive().optional(),
  passengers: z.number().int().positive().max(9).optional(),
  dailyDistanceKm: z.number().positive().optional(),
  usage: z.enum(["city", "mixed", "travel"]).optional(),
  priorities: z.array(z.enum(["price", "range", "space", "technology"])),
  selectedVehicleIds: z.array(z.string()),
  recommendedVehicleId: z.string().optional(),
  stage: customerStageSchema,
});

export type CustomerContext = z.infer<typeof customerContextSchema>;

export const uiCommandSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("none") }),
  z.object({ type: z.literal("show_vehicle"), vehicleId: z.string() }),
  z.object({ type: z.literal("show_recommendation"), vehicleId: z.string() }),
  z.object({ type: z.literal("show_comparison"), vehicleIds: z.tuple([z.string(), z.string()]) }),
  z.object({ type: z.literal("show_quote"), vehicleId: z.string() }),
  z.object({ type: z.literal("show_interest_summary"), vehicleId: z.string() }),
]);

export const advisorTurnSchema = z.object({
  message: z.string().min(1),
  contextPatch: customerContextSchema.partial(),
  quickReplies: z.array(z.string()).max(4),
  uiCommand: uiCommandSchema,
});

export type AdvisorTurn = z.infer<typeof advisorTurnSchema>;

const emptyContext: CustomerContext = {
  priorities: [],
  selectedVehicleIds: [],
  stage: "welcome",
};

const numberWords: Record<string, number> = {
  uno: 1,
  una: 1,
  dos: 2,
  tres: 3,
  cuatro: 4,
  cinco: 5,
  seis: 6,
  siete: 7,
};

function normalize(text: string): string {
  return text.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function parseBudget(text: string): number | undefined {
  const normalized = normalize(text).replace(/\s+/g, " ");
  const match = normalized.match(/(?:\$|usd|presupuesto|budget|gasto|hasta)\s*([0-9][0-9.,]*)(?:\s*(mil|k))?/i);
  if (!match) return undefined;
  const raw = match[1].replace(/\./g, "").replace(/,/g, "");
  const numeric = Number(raw);
  if (!Number.isFinite(numeric)) return undefined;
  return match[2] ? numeric * 1000 : numeric;
}

function parsePassengers(text: string): number | undefined {
  const normalized = normalize(text);
  const numeric = normalized.match(/(?:somos|familia de|para|pasajeros|personas)\s*(?:de\s*)?([1-9])/);
  if (numeric) return Number(numeric[1]);
  const word = Object.keys(numberWords).find((key) => new RegExp(`(?:somos|familia de|para)\\s+${key}`).test(normalized));
  return word ? numberWords[word] : undefined;
}

function parseUsage(text: string): CustomerContext["usage"] {
  const normalized = normalize(text);
  if (/(viaj|carretera|fin de semana|ruta|largos)/.test(normalized)) return "travel";
  if (/(ciudad|urbano|trabajo|diario|corto)/.test(normalized)) return "city";
  if (/(familia|mixto|ciudad y|a veces)/.test(normalized)) return "mixed";
  return undefined;
}

function parsePriorities(text: string): CustomerContext["priorities"] {
  const normalized = normalize(text);
  const priorities: CustomerContext["priorities"] = [];
  if (/(barato|precio|presupuesto|econom)/.test(normalized)) priorities.push("price");
  if (/(autonomia|rango|viaj|carretera)/.test(normalized)) priorities.push("range");
  if (/(espacio|familia|maletero|pasaj)/.test(normalized)) priorities.push("space");
  if (/(tecnolog|pantalla|asistencia)/.test(normalized)) priorities.push("technology");
  return priorities;
}

export function extractContext(message: string): Partial<CustomerContext> {
  const budgetMaxUsd = parseBudget(message);
  const passengers = parsePassengers(message);
  const usage = parseUsage(message);
  const priorities = parsePriorities(message);
  const patch: Partial<CustomerContext> = {};
  if (budgetMaxUsd) patch.budgetMaxUsd = budgetMaxUsd;
  if (passengers) patch.passengers = passengers;
  if (usage) patch.usage = usage;
  if (priorities.length) patch.priorities = priorities;
  return patch;
}

function recommendationScore(vehicle: Vehicle, context: CustomerContext): number {
  let score = 0;
  if (!context.budgetMaxUsd || vehicle.priceUsd <= context.budgetMaxUsd) score += 30;
  else score += Math.max(0, 30 - ((vehicle.priceUsd - context.budgetMaxUsd) / context.budgetMaxUsd) * 30);
  if (!context.passengers || vehicle.passengers >= context.passengers) score += 30;
  else score -= 50;
  if (context.usage === "travel") score += Math.min(25, vehicle.rangeKm / 20);
  else if (context.usage === "city") score += Math.min(25, 25 - vehicle.rangeKm / 40);
  else score += 18;
  const priorities = context.priorities;
  if (priorities.includes("space")) score += vehicle.passengers >= 7 ? 15 : vehicle.passengers >= 5 ? 10 : 0;
  if (priorities.includes("range")) score += Math.min(15, vehicle.rangeKm / 40);
  if (priorities.includes("technology")) score += vehicle.powerKw >= 150 ? 10 : 6;
  if (priorities.includes("price")) score += vehicle.priceUsd <= 25000 ? 10 : 5;
  return score;
}

export function recommendVehicle(context: CustomerContext): Vehicle {
  return [...vehicles].sort((a, b) => recommendationScore(b, context) - recommendationScore(a, context))[0];
}

function missingQuestion(context: CustomerContext): { message: string; quickReplies: string[] } | undefined {
  if (!context.passengers) {
    return { message: "Para entender el espacio que necesitas, ¿cuántas personas viajarían normalmente?", quickReplies: ["Solo yo", "Somos 4", "Somos 5", "Somos 7"] };
  }
  if (!context.usage) {
    return { message: "¿Cómo imaginas la mayoría de tus recorridos?", quickReplies: ["Principalmente ciudad", "Ciudad y carretera", "Viajes de fin de semana"] };
  }
  if (!context.budgetMaxUsd) {
    return { message: "¿Tienes un rango de presupuesto para orientarte hacia la opción correcta?", quickReplies: ["Hasta USD 25.000", "Hasta USD 30.000", "Hasta USD 40.000", "Quiero comparar primero"] };
  }
  return undefined;
}

function recommendationMessage(vehicle: Vehicle, context: CustomerContext): string {
  const reasons = [
    context.passengers && vehicle.passengers >= context.passengers ? `espacio para ${context.passengers} personas` : "una cabina flexible",
    context.usage === "travel" ? `${vehicle.rangeKm} km para tus recorridos largos` : `${vehicle.rangeKm} km para moverte con tranquilidad`,
    context.budgetMaxUsd && vehicle.priceUsd <= context.budgetMaxUsd ? "entra en el rango que indicaste" : "es la alternativa más cercana a tu rango",
  ];
  return `Por lo que me contaste, elegiría el ${vehicle.name}. Tiene ${reasons[0]}, ${reasons[1]} y ${reasons[2]}. ¿Quieres verlo frente a otra opción?`;
}

function mentionedVehicle(message: string): Vehicle | undefined {
  const normalized = normalize(message);
  return vehicles.find((vehicle) => normalized.includes(normalize(vehicle.name)) || normalized.includes(vehicle.id));
}

export function getRuleBasedAdvisor(message: string, currentContext: CustomerContext = emptyContext): AdvisorTurn {
  const normalized = normalize(message);
  const patch = extractContext(message);
  const context: CustomerContext = {
    ...currentContext,
    ...patch,
    priorities: Array.from(new Set([...(currentContext.priorities ?? []), ...(patch.priorities ?? [])])),
    stage: currentContext.stage === "welcome" ? "discovery" : currentContext.stage,
  };

  if (/(cotiz|cuota|financ|mensual|pago inicial)/.test(normalized)) {
    const vehicle = mentionedVehicle(message) ?? (context.recommendedVehicleId ? getVehicleById(context.recommendedVehicleId) : undefined) ?? recommendVehicle(context);
    return {
      message: `Claro. Preparé una simulación para el ${vehicle.name} usando el precio vigente del catálogo de demostración. Puedes ajustar la inicial y el plazo en el panel.`,
      contextPatch: { ...patch, recommendedVehicleId: vehicle.id, selectedVehicleIds: [vehicle.id], stage: "interest" },
      quickReplies: ["Me interesa", "Comparar con otra opción", "Ajustar mi búsqueda"],
      uiCommand: { type: "show_quote", vehicleId: vehicle.id },
    };
  }

  if (/(compar|frente a|entre los|otra opcion)/.test(normalized) && context.recommendedVehicleId) {
    const recommendation = getVehicleById(context.recommendedVehicleId) ?? recommendVehicle(context);
    const alternate = vehicles.find((vehicle) => vehicle.id !== recommendation.id && (!context.passengers || vehicle.passengers >= context.passengers)) ?? vehicles.find((vehicle) => vehicle.id !== recommendation.id) ?? vehicles[0];
    return {
      message: `Claro. Te muestro el ${recommendation.name} junto al ${alternate.name} para que la diferencia se sienta en un vistazo.`,
      contextPatch: { ...patch, selectedVehicleIds: [recommendation.id, alternate.id], stage: "comparison" },
      quickReplies: ["Me interesa la recomendación", "Quiero volver a ver opciones"],
      uiCommand: { type: "show_comparison", vehicleIds: [recommendation.id, alternate.id] },
    };
  }

  if (/(me interesa|quiero ese|me gusta|avancemos|siguiente paso|reserv)/.test(normalized) && context.recommendedVehicleId) {
    const vehicle = getVehicleById(context.recommendedVehicleId) ?? vehicles[0];
    return {
      message: `Perfecto. Dejé el ${vehicle.name} como tu opción principal. En una siguiente etapa podríamos simular financiamiento y disponibilidad de entrega para completar la reserva.`,
      contextPatch: { ...patch, stage: "interest", selectedVehicleIds: [vehicle.id] },
      quickReplies: ["Ver financiamiento", "Empezar de nuevo"],
      uiCommand: { type: "show_interest_summary", vehicleId: vehicle.id },
    };
  }

  const question = missingQuestion(context);
  if (question) {
    return {
      message: question.message,
      contextPatch: { ...patch, stage: "discovery" },
      quickReplies: question.quickReplies,
      uiCommand: context.selectedVehicleIds[0] ? { type: "show_vehicle", vehicleId: context.selectedVehicleIds[0] } : { type: "none" },
    };
  }

  const recommendation = recommendVehicle(context);
  return {
    message: recommendationMessage(recommendation, context),
    contextPatch: { ...patch, recommendedVehicleId: recommendation.id, selectedVehicleIds: [recommendation.id], stage: "recommendation" },
    quickReplies: ["Comparar con otra opción", "Me interesa", "Quiero ajustar mi búsqueda"],
    uiCommand: { type: "show_recommendation", vehicleId: recommendation.id },
  };
}

export const advisorContextDefaults = emptyContext;
