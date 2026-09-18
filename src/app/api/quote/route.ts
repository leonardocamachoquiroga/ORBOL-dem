import { NextResponse } from "next/server";
import { catalogRepository } from "@/application/catalog-service";
import { calculateQuote, quoteInputSchema } from "@/domain/quote";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = quoteInputSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Parámetros de cotización inválidos" }, { status: 400 });
  const vehicle = await catalogRepository.getVehicle(parsed.data.vehicleId);
  if (!vehicle) return NextResponse.json({ error: "Vehículo no encontrado en el catálogo" }, { status: 404 });
  return NextResponse.json(calculateQuote(vehicle, parsed.data));
}
