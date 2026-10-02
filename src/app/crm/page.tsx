import { CRMConsole } from "@/components/crm-console";

export default function CRMPage() {
  return <main className="crm-page"><section className="page-intro"><div className="shell"><span className="eyebrow">OLBOL / CONSOLA COMERCIAL</span><h1>Cada conversación tiene un siguiente paso.</h1><p>Asigna un asesor, conserva el contexto y acompaña cada oportunidad hasta la decisión.</p></div></section><div className="shell"><CRMConsole/></div></main>;
}
