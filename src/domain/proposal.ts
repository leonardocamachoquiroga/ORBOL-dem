export const proposal = {
  reviewedOn: "2 de octubre de 2026",
  implementationUsd: 2400,
  maintenanceUsd: 250,
  hostingBudgetUsd: 25,
  aiBudgetUsd: 25,
  whatsappMinUsd: 30,
  whatsappMaxUsd: 90,
  domainAnnualBudgetUsd: 25,
};

export type WhatsAppProvider = "meta" | "twilio" | "360dialog";

export const whatsappOptions = [
  { id: "meta", name: "Meta Cloud API directa", fee: "Sin cuota de acceso", copy: "Nuestra primera opción si Yaku permite conectar conversaciones y tenemos capacidad para mantener la integración. El consumo de Meta se paga aparte." },
  { id: "twilio", name: "Twilio", fee: "USD 0,005 por mensaje", copy: "Cobra cada mensaje entrante y saliente, además de Meta. Conviene evaluar esta ruta si ya usamos su infraestructura o empezamos con poco volumen." },
  { id: "360dialog", name: "360dialog", fee: "USD 59 por número / mes", copy: "Una cuota fija para el canal, más el consumo de Meta. Ofrece coexistencia con la app Business para números elegibles; revisamos el caso de OLBOL primero." },
] as const;

export function providerMonthlyUsd(provider: WhatsAppProvider, messages: number) {
  if (provider === "twilio") return Math.max(0, messages) * 0.005;
  return provider === "360dialog" ? 59 : 0;
}

export function estimateMonthly(provider: WhatsAppProvider, messages: number, adsUsd: number) {
  const channel = providerMonthlyUsd(provider, messages);
  const fixed = channel + proposal.hostingBudgetUsd + proposal.aiBudgetUsd;
  return {
    channel,
    technologyMin: fixed + proposal.whatsappMinUsd,
    technologyMax: fixed + proposal.whatsappMaxUsd,
    totalMin: fixed + proposal.whatsappMinUsd + proposal.maintenanceUsd + adsUsd,
    totalMax: fixed + proposal.whatsappMaxUsd + proposal.maintenanceUsd + adsUsd,
  };
}

export const researchSources = [
  {title:"Política de mensajes de WhatsApp",url:"https://whatsappbusiness.com/policy/"},
  {title:"Precios y actualización de Meta",url:"https://whatsappbusiness.com/resources/faq/"},
  {title:"Precios oficiales de Twilio",url:"https://www.twilio.com/en-us/whatsapp/pricing"},
  {title:"Requisitos de alta en Twilio",url:"https://www.twilio.com/docs/whatsapp/self-sign-up"},
  {title:"Tarifas oficiales de 360dialog",url:"https://docs.360dialog.com/docs/get-started/pricing"},
  {title:"Coexistencia con la app Business",url:"https://docs.360dialog.com/docs/resources/phone-numbers/coexistence"},
  {title:"Referencia de consumo de IA",url:"https://developers.openai.com/api/docs/models/gpt-4.1-mini"},
];
