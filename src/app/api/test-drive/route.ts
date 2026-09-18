import { NextResponse } from "next/server";
import { z } from "zod";
import { catalogRepository } from "@/application/catalog-service";

const requestSchema = z.object({ vehicleId: z.string(), name: z.string().min(2).max(80), phone: z.string().min(7).max(30), email: z.string().email(), date: z.string().min(8), time: z.string().min(4) });

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Completa los campos requeridos" }, { status: 400 });
  const vehicle = await catalogRepository.getVehicle(parsed.data.vehicleId);
  if (!vehicle) return NextResponse.json({ error: "Vehículo no encontrado" }, { status: 404 });
  return NextResponse.json({ ok: true, demo: true, vehicle: vehicle.name, confirmationId: `OLB-TD-${Date.now().toString().slice(-6)}` });
}
