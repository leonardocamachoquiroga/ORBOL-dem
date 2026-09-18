import { NextResponse } from "next/server";
import { catalogRepository } from "@/application/catalog-service";
import { customerContextSchema } from "@/domain/advisor";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { vehicleId?: unknown; context?: unknown } | null;
  if (!body || typeof body.vehicleId !== "string") return NextResponse.json({ error: "Vehículo requerido" }, { status: 400 });
  const context = customerContextSchema.safeParse(body.context);
  if (!context.success) return NextResponse.json({ error: "Contexto inválido" }, { status: 400 });
  const vehicle = await catalogRepository.getVehicle(body.vehicleId);
  if (!vehicle) return NextResponse.json({ error: "Vehículo no encontrado" }, { status: 404 });
  const details = [
    context.data.passengers ? `${context.data.passengers} personas` : undefined,
    context.data.usage === "travel" ? "viajes de fin de semana" : context.data.usage === "city" ? "uso urbano" : undefined,
    context.data.budgetMaxUsd ? `presupuesto de USD ${context.data.budgetMaxUsd.toLocaleString("en-US")}` : undefined,
  ].filter(Boolean).join(", ");
  return NextResponse.json({ channel: "whatsapp", demo: true, message: `Hola, quiero continuar viendo el ${vehicle.name}. ${details ? `Busco un vehículo para ${details}. ` : ""}Me gustaría revisar la cotización y disponibilidad.` });
}
