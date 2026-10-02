export const proposal = {
  reviewedOn: "2 de octubre de 2026",
  implementationUsd: 2400,
  maintenanceUsd: 250,
  crmSeatUsd: 35,
  hostingBudgetUsd: 25,
  aiBudgetUsd: 25,
  whatsappMinUsd: 30,
  whatsappMaxUsd: 90,
  domainAnnualBudgetUsd: 25,
  crmMinimumMonths: 6,
};

export function estimateMonthly(sellers: number, adsUsd: number) {
  const crm = sellers * proposal.crmSeatUsd;
  const fixed = crm + proposal.hostingBudgetUsd + proposal.aiBudgetUsd;
  return {
    crm,
    technologyMin: fixed + proposal.whatsappMinUsd,
    technologyMax: fixed + proposal.whatsappMaxUsd,
    totalMin: fixed + proposal.whatsappMinUsd + proposal.maintenanceUsd + adsUsd,
    totalMax: fixed + proposal.whatsappMaxUsd + proposal.maintenanceUsd + adsUsd,
    crmInitial: crm * proposal.crmMinimumMonths,
  };
}

export const researchSources = [
  {title:"Política de mensajes de WhatsApp",url:"https://business.whatsapp.com/policy"},
  {title:"Precios de la plataforma WhatsApp",url:"https://business.whatsapp.com/products/platform-pricing"},
  {title:"Actualización de WhatsApp en octubre de 2026",url:"https://www.kommo.com/blog/whatsapp-pricing-update/"},
  {title:"Planes oficiales de Kommo",url:"https://www.kommo.com/buy/tariff/"},
  {title:"Facturación y contratación mínima de Kommo",url:"https://support.kommo.com/docs/billing-overview"},
  {title:"Precios oficiales de respond.io",url:"https://respond.io/pricing"},
  {title:"Precios oficiales de Twilio",url:"https://www.twilio.com/en-us/whatsapp/pricing"},
];
