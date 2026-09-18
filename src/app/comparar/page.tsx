import { CompareView } from "@/components/compare-view";

export default async function ComparePage({ searchParams }: { searchParams: Promise<{ ids?: string }> }) {
  const params = await searchParams;
  return <main className="comparison-page"><div className="shell"><section className="page-intro"><span className="eyebrow">COMPARAR SIN COMPLICAR</span><h1>Lo importante, lado a lado.</h1><p>Una mirada clara para que la decisión se sienta tuya.</p></section><CompareView ids={params.ids} /></div></main>;
}
