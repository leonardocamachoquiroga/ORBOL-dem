"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { estimateMonthly, proposal } from "@/domain/proposal";
import { formatPrice } from "@/domain/vehicles";

export function ProposalCosts() {
  const [sellers,setSellers] = useState(3);
  const [ads,setAds] = useState(450);
  const estimate = estimateMonthly(sellers,ads);
  return <div className="proposal-costs">
    <div className="proposal-costs__controls"><div className="proposal-control"><label htmlFor="sellers">Usuarios del CRM <strong>{sellers}</strong></label><input id="sellers" type="range" min={1} max={10} value={sellers} onChange={e=>setSellers(Number(e.target.value))}/></div><div className="proposal-control"><label htmlFor="ads-budget">Presupuesto mensual de anuncios <strong>{formatPrice(ads)}</strong></label><input id="ads-budget" type="range" min={300} max={900} step={50} value={ads} onChange={e=>setAds(Number(e.target.value))}/></div><p>Supuesto inicial: un número de WhatsApp y un equipo pequeño. Ajusta la propuesta durante la reunión.</p></div>
    <div className="proposal-costs__detail"><div className="cost-row"><span>Kommo Advanced <small>{sellers} × USD 35 / usuario / mes</small></span><strong>{formatPrice(estimate.crm)}</strong></div><div className="cost-row"><span>Hosting web <small>Provisión de infraestructura</small></span><strong>USD 25</strong></div><div className="cost-row"><span>Asesor IA <small>Provisión de consumo</small></span><strong>USD 25</strong></div><div className="cost-row"><span>WhatsApp / Meta <small>Provisión variable por mensajes</small></span><strong>USD 30–90</strong></div><div className="cost-subtotal"><span>Tecnología mensual estimada</span><strong>{formatPrice(estimate.technologyMin)}–{estimate.technologyMax}</strong></div><div className="cost-row"><span>Nuestro mantenimiento <small>Propuesta sugerida · Hasta 3 h de ajustes al mes</small></span><strong>USD 250</strong></div><div className="cost-row"><span>Inversión en anuncios <small>Pago directo a Meta · Gestión continua aparte</small></span><strong>{formatPrice(ads)}</strong></div><div className="cost-total" aria-live="polite"><span>Total mensual estimado</span><strong>{formatPrice(estimate.totalMin)}–{estimate.totalMax}</strong><small>Sin impuestos ni excesos de consumo</small></div></div>
    <div className="proposal-costs__setup"><span className="eyebrow">IMPLEMENTACIÓN PROPUESTA</span><strong>{formatPrice(proposal.implementationUsd)}</strong><p>Web comercial, asesor conectado al catálogo, WhatsApp oficial, CRM, configuración inicial de una campaña y capacitación. Plan de 4–6 semanas sujeto a accesos y aprobaciones.</p><ul><li><Check size={15}/> 50% al inicio · 30% al integrar · 20% al aceptar</li><li><Check size={15}/> Licencia CRM inicial: {formatPrice(estimate.crmInitial)} por 6 meses</li><li><Check size={15}/> Dominio: provisión de USD 25 al año</li></ul><a className="text-link" href="https://www.kommo.com/buy/tariff/" target="_blank" rel="noreferrer">Revisar tarifa del proveedor <ArrowUpRight size={15}/></a></div>
    <p className="proposal-costs__note">Honorarios sugeridos pendientes de confirmar por nuestro equipo. Hosting, IA, dominio y WhatsApp son presupuestos de planificación, no tarifas ni topes garantizados. Kommo exige una contratación mínima de 6 meses; confirmar precio regional y condiciones antes de contratar. Mensajería, publicidad, impuestos y servicios adicionales se facturan aparte de la licencia. Research al {proposal.reviewedOn}.</p>
  </div>;
}
