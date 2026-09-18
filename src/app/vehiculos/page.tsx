import { CatalogBrowser } from "@/components/catalog-browser";

export default async function VehiclesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const get = (key: string) => typeof params[key] === "string" ? params[key] : undefined;
  return <main><div className="shell"><section className="page-intro"><span className="eyebrow">LA LÍNEA OLBOL</span><h1>Diseñados para seguirte.</h1><p>Tres maneras de moverte. Una misma idea: tecnología que se siente sencilla.</p></section><CatalogBrowser initialFilters={{ model: get("model"), year: get("year"), maxPrice: get("maxPrice"), condition: get("condition"), maxMileage: get("maxMileage") }} /></div></main>;
}
