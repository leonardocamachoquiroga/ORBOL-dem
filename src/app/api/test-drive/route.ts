import { NextResponse } from "next/server";
import { z } from "zod";
import { catalogRepository } from "@/application/catalog-service";

const requestSchema = z.object({ vehicleId: z.string(), name: z.string().min(2).max(80), phone: z.string().min(7).max(30), email: z.string().email(), date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), time: z.enum(["10:00","12:00","16:00","18:00"]) });

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Completa los campos requeridos" }, { status: 400 });
  const today = new Intl.DateTimeFormat("en-CA",{timeZone:"America/La_Paz",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date());
  const requestedDate = new Date(`${parsed.data.date}T12:00:00Z`);
  if (!Number.isFinite(requestedDate.getTime()) || requestedDate.toISOString().slice(0,10)!==parsed.data.date || parsed.data.date<today) return NextResponse.json({error:"Selecciona una fecha válida a partir de hoy"},{status:400});
  const vehicle = await catalogRepository.getVehicle(parsed.data.vehicleId);
  if (!vehicle) return NextResponse.json({ error: "Vehículo no encontrado" }, { status: 404 });
  return NextResponse.json({ ok: true, demo: true, vehicle: vehicle.name, confirmationId: `OLB-TD-${Date.now().toString().slice(-6)}` });
}
