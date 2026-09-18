import { getVehicleById, vehicles, type Vehicle } from "@/domain/vehicles";

/**
 * Port used by the sales experience. The demo uses the in-memory adapter below;
 * a production implementation can replace it with a SQL/Supabase/CRM adapter
 * without changing the advisor or UI layers.
 */
export interface CatalogRepository {
  listVehicles(): Promise<Vehicle[]>;
  getVehicle(id: string): Promise<Vehicle | undefined>;
  getCurrentPrice(id: string): Promise<number | undefined>;
  checkAvailability(id: string): Promise<Vehicle["availability"] | undefined>;
}

export class InMemoryCatalogRepository implements CatalogRepository {
  async listVehicles() { return vehicles; }
  async getVehicle(id: string) { return getVehicleById(id); }
  async getCurrentPrice(id: string) { return getVehicleById(id)?.priceUsd; }
  async checkAvailability(id: string) { return getVehicleById(id)?.availability; }
}

export const catalogRepository: CatalogRepository = new InMemoryCatalogRepository();
