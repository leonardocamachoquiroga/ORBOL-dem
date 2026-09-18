import { AdvisorExperience } from "@/components/advisor-experience";

export default async function AdvisorPage({ searchParams }: { searchParams: Promise<{ vehicle?: string }> }) {
  const params = await searchParams;
  return <main><div className="shell advisor-page"><div className="breadcrumbs"><span>OLBOL</span><span>/</span><span>Asesor IA</span></div><AdvisorExperience initialVehicleId={params.vehicle} /></div></main>;
}
