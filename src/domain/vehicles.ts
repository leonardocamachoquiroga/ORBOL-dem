export type VehicleCategory = "city" | "suv" | "family";
export type Availability = "available" | "limited" | "preorder";
export type VehicleCondition = "new" | "used";

export interface VehicleColor {
  name: string;
  hex: string;
  swatch: string;
}

export interface Vehicle {
  id: string;
  slug: string;
  brand: string;
  year: number;
  mileageKm: number;
  condition: VehicleCondition;
  conditionLabel: string;
  name: string;
  eyebrow: string;
  tagline: string;
  category: VehicleCategory;
  categoryLabel: string;
  priceUsd: number;
  rangeKm: number;
  powerKw: number;
  fastChargeMinutes: number;
  passengers: number;
  engine: string;
  transmission: string;
  fuel: string;
  availability: Availability;
  availabilityLabel: string;
  colors: VehicleColor[];
  features: string[];
  highlights: string[];
  visualVariant: "neo" | "terra" | "alto";
}

export const vehicles: Vehicle[] = [
  {
    id: "neo-c1",
    slug: "neo-c1",
    brand: "OLBOL",
    year: 2025,
    mileageKm: 12400,
    condition: "used",
    conditionLabel: "Seminuevo certificado",
    name: "Neo C1",
    eyebrow: "OLBOL / CITY ELECTRIC",
    tagline: "La ciudad, en otra frecuencia.",
    category: "city",
    categoryLabel: "Ciudad",
    priceUsd: 21900,
    rangeKm: 310,
    powerKw: 90,
    fastChargeMinutes: 35,
    passengers: 5,
    engine: "Eléctrico · 90 kW",
    transmission: "Automática · 1 velocidad",
    fuel: "100% eléctrico",
    availability: "available",
    availabilityLabel: "Disponible",
    colors: [
      { name: "Lunar white", hex: "#E9E8E1", swatch: "#E8E7DF" },
      { name: "Graphite", hex: "#252827", swatch: "#252827" },
      { name: "Andean blue", hex: "#7C9AA3", swatch: "#7C9AA3" },
    ],
    features: ["Cabina silenciosa", "Asistencia urbana", "Carga inteligente", "Pantalla panorámica"],
    highlights: ["310 km de autonomía", "5 plazas", "35 min de carga rápida"],
    visualVariant: "neo",
  },
  {
    id: "terra-s5",
    slug: "terra-s5",
    brand: "OLBOL",
    year: 2026,
    mileageKm: 0,
    condition: "new",
    conditionLabel: "Nuevo",
    name: "Terra S5",
    eyebrow: "OLBOL / EVERYDAY SUV",
    tagline: "Más espacio para lo que importa.",
    category: "suv",
    categoryLabel: "SUV",
    priceUsd: 29900,
    rangeKm: 420,
    powerKw: 150,
    fastChargeMinutes: 30,
    passengers: 5,
    engine: "Eléctrico · 150 kW",
    transmission: "Automática · 1 velocidad",
    fuel: "100% eléctrico",
    availability: "limited",
    availabilityLabel: "Stock limitado",
    colors: [
      { name: "Stone", hex: "#CFCBC0", swatch: "#CFCBC0" },
      { name: "Obsidian", hex: "#151817", swatch: "#151817" },
      { name: "Copper dusk", hex: "#A66D59", swatch: "#A66D59" },
    ],
    features: ["Maletero modular", "Conducción asistida", "Techo panorámico", "Carga bidireccional"],
    highlights: ["420 km de autonomía", "5 plazas amplias", "30 min de carga rápida"],
    visualVariant: "terra",
  },
  {
    id: "alto-x7",
    slug: "alto-x7",
    brand: "OLBOL",
    year: 2026,
    mileageKm: 0,
    condition: "new",
    conditionLabel: "Nuevo",
    name: "Alto X7",
    eyebrow: "OLBOL / FAMILY ELECTRIC",
    tagline: "Llegar juntos es el destino.",
    category: "family",
    categoryLabel: "Familiar",
    priceUsd: 39900,
    rangeKm: 510,
    powerKw: 200,
    fastChargeMinutes: 28,
    passengers: 7,
    engine: "Eléctrico · 200 kW",
    transmission: "Automática · 1 velocidad",
    fuel: "100% eléctrico",
    availability: "preorder",
    availabilityLabel: "Preorden abierta",
    colors: [
      { name: "Cloud", hex: "#DADBD6", swatch: "#DADBD6" },
      { name: "Forest", hex: "#314941", swatch: "#314941" },
      { name: "Solar yellow", hex: "#D8AE49", swatch: "#D8AE49" },
    ],
    features: ["Tres filas flexibles", "Asientos inteligentes", "Modo viaje", "Sonido inmersivo"],
    highlights: ["510 km de autonomía", "7 plazas", "28 min de carga rápida"],
    visualVariant: "alto",
  },
];

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return vehicles.find((vehicle) => vehicle.slug === slug);
}

export function getVehicleById(id: string): Vehicle | undefined {
  return vehicles.find((vehicle) => vehicle.id === id);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export function availabilityTone(availability: Availability): "positive" | "warning" | "muted" {
  if (availability === "available") return "positive";
  if (availability === "limited") return "warning";
  return "muted";
}
