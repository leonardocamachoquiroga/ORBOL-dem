import { NextResponse } from "next/server";
import { advisorTurnSchema, customerContextSchema, getRuleBasedAdvisor, type CustomerContext } from "@/domain/advisor";
import { vehicles, getVehicleById } from "@/domain/vehicles";

function parseRequest(input: unknown): { message: string; context: CustomerContext } | null {
  if (!input || typeof input !== "object") return null;
  const body = input as { message?: unknown; context?: unknown };
  if (typeof body.message !== "string" || body.message.trim().length === 0 || body.message.length > 1500) return null;
  const parsedContext = customerContextSchema.safeParse(body.context);
  if (!parsedContext.success) return null;
  return { message: body.message.trim(), context: parsedContext.data };
}

async function getLlmTurn(message: string, context: CustomerContext) {
  const url = process.env.LLM_API_URL;
  const key = process.env.LLM_API_KEY;
  const model = process.env.LLM_MODEL;
  if (process.env.OLBOL_LOCAL_ADVISOR === "1" || !url || !key || !model) return null;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const catalog = vehicles.map(({id,name,priceUsd,rangeKm,passengers,fastChargeMinutes,availabilityLabel})=>({id,name,priceUsd,rangeKm,passengers,fastChargeMinutes,availabilityLabel}));
    const response = await fetch(url, { method: "POST", signal: controller.signal, headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` }, body: JSON.stringify({ model, temperature: 0.2, response_format: { type: "json_object" }, messages: [{ role: "system", content: `Eres el asesor comercial de una demo de OLBOL. Responde en español. Devuelve exclusivamente un JSON con message, contextPatch, quickReplies y uiCommand. Usa solo estos datos conceptuales del catálogo: ${JSON.stringify(catalog)}. Nunca inventes especificaciones, descuentos, stock real ni promesas de reservas. Las cuotas las calcula el panel. Comandos permitidos: none, show_vehicle, show_recommendation, show_comparison, show_quote, show_interest_summary. Usa únicamente los IDs del catálogo.` }, { role: "user", content: JSON.stringify({ message, context }) }] }) });
    if (!response.ok) return null;
    const payload = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
    const content = payload.choices?.[0]?.message?.content;
    if (!content) return null;
    const parsed = advisorTurnSchema.safeParse(JSON.parse(content));
    if (!parsed.success) return null;
    const command = parsed.data.uiCommand;
    const referencedIds = command.type === "none" ? [] : command.type === "show_comparison" ? command.vehicleIds : [command.vehicleId];
    if (referencedIds.some(id=>!getVehicleById(id)) || (command.type === "show_comparison" && command.vehicleIds[0] === command.vehicleIds[1])) return null;
    if (parsed.data.contextPatch.recommendedVehicleId && !getVehicleById(parsed.data.contextPatch.recommendedVehicleId)) return null;
    return parsed.data;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: Request) {
  const parsed = parseRequest(await request.json().catch(() => null));
  if (!parsed) return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  const llmTurn = await getLlmTurn(parsed.message, parsed.context);
  const turn = llmTurn ?? getRuleBasedAdvisor(parsed.message, parsed.context);
  return NextResponse.json(turn);
}
