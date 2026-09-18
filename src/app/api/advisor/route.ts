import { NextResponse } from "next/server";
import { advisorTurnSchema, customerContextSchema, getRuleBasedAdvisor, type CustomerContext } from "@/domain/advisor";

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
  if (!url || !key || !model) return null;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(url, { method: "POST", signal: controller.signal, headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` }, body: JSON.stringify({ model, temperature: 0.2, response_format: { type: "json_object" }, messages: [{ role: "system", content: "Eres el asesor comercial de OLBOL. Responde en español. Devuelve exclusivamente un JSON con message, contextPatch, quickReplies y uiCommand. Nunca inventes especificaciones." }, { role: "user", content: JSON.stringify({ message, context }) }] }) });
    if (!response.ok) return null;
    const payload = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
    const content = payload.choices?.[0]?.message?.content;
    if (!content) return null;
    const parsed = advisorTurnSchema.safeParse(JSON.parse(content));
    return parsed.success ? parsed.data : null;
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
