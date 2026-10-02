"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { estimateMonthly, proposal, whatsappOptions, type WhatsAppProvider } from "@/domain/proposal";
import { formatPrice } from "@/domain/vehicles";

export function ProposalCosts() {
  const [provider, setProvider] = useState<WhatsAppProvider>("meta");
  const [crm, setCrm] = useState("yaku");
  const [messages, setMessages] = useState(10000);
  const [ads, setAds] = useState(450);
  const estimate = estimateMonthly(provider, messages, ads);
  return <div className="proposal-costs">
    <div className="proposal-costs__controls">
      <div className="proposal-control"><label htmlFor="crm-choice">Seguimiento comercial</label><select id="crm-choice" value={crm} onChange={e=>setCrm(e.target.value)}><option value="yaku">Yaku · primera opción</option><option value="dms">CRM básico en el DMS</option></select></div>
      <div className="proposal-control"><label htmlFor="whatsapp-provider">Conexión oficial</label><select id="whatsapp-provider" value={provider} onChange={e=>setProvider(e.target.value as WhatsAppProvider)}>{whatsappOptions.map(option=><option key={option.id} value={option.id}>{option.name}</option>)}</select></div>
      <div className="proposal-control"><label htmlFor="monthly-messages">Mensajes al mes <strong>{messages.toLocaleString("es-BO")}</strong></label><input id="monthly-messages" type="range" min={2000} max={50000} step={1000} value={messages} onChange={e=>setMessages(Number(e.target.value))}/><small>Entrantes + salientes. Determina el recargo de Twilio.</small></div>
      <div className="proposal-control"><label htmlFor="ads-budget">Anuncios al mes <strong>{formatPrice(ads)}</strong></label><input id="ads-budget" type="range" min={300} max={900} step={50} value={ads} onChange={e=>setAds(Number(e.target.value))}/></div>
      <p>Un número de WhatsApp. La licencia de Yaku o el desarrollo del CRM en el DMS se cotizan tras definir el alcance.</p>
    </div>
    <div className="proposal-costs__detail">
      <div className="cost-row"><span>{crm === "yaku" ? "Yaku" : "CRM básico DMS"}<small>{crm === "yaku" ? "Licencia y capacidades por confirmar" : "Desarrollo y operación por cotizar"}</small></span><strong>Por definir</strong></div>
      <div className="cost-row"><span>Proveedor de WhatsApp <small>{provider === "twilio" ? "USD 0,005 × mensajes entrantes y salientes" : provider === "360dialog" ? "Plan Regular · un número" : "Acceso directo sin cuota adicional"}</small></span><strong>{formatPrice(estimate.channel)}</strong></div>
      <div className="cost-row"><span>Infraestructura <small>Provisión inicial</small></span><strong>USD 25</strong></div>
      <div className="cost-row"><span>Asesor IA <small>Reserva de consumo de texto</small></span><strong>USD 25</strong></div>
      <div className="cost-row"><span>Consumo de Meta <small>Reserva orientativa; tarifa regional pendiente</small></span><strong>USD 30-90</strong></div>
      <div className="cost-subtotal"><span>Tecnología estimada sin CRM</span><strong>{formatPrice(estimate.technologyMin)}-{estimate.technologyMax}</strong></div>
      <div className="cost-row"><span>Nuestro mantenimiento <small>Sugerido · Hasta 3 h de ajustes al mes</small></span><strong>USD 250</strong></div>
      <div className="cost-row"><span>Inversión en anuncios <small>Pago a Meta · Gestión continua aparte</small></span><strong>{formatPrice(ads)}</strong></div>
      <div className="cost-total" aria-live="polite"><span>Subtotal mensual de planificación</span><strong>{formatPrice(estimate.totalMin)}-{estimate.totalMax}</strong><small>Sumar CRM, impuestos y cualquier consumo adicional</small></div>
    </div>
    <div className="proposal-costs__setup"><span className="eyebrow">IMPLEMENTACIÓN SUGERIDA</span><strong>{formatPrice(proposal.implementationUsd)}</strong><p>Referencia interna para web comercial, asesor, conexión oficial, configuración inicial y capacitación. Validar el precio tras revisar Yaku; construir el CRM en el DMS puede cambiar el alcance.</p><ul><li><Check size={15}/> Yaku como primera opción de CRM</li><li><Check size={15}/> Alcance y honorarios sujetos a definición</li><li><Check size={15}/> Dominio: provisión de USD 25 al año</li></ul></div>
    <p className="proposal-costs__note">Honorarios sugeridos pendientes de confirmar. El subtotal excluye Yaku o el CRM del DMS y no constituye una oferta cerrada. Infraestructura, IA, dominio y Meta son provisiones, no tarifas ni topes garantizados. El volumen del control calcula únicamente el recargo de Twilio; los cargos de Meta y la IA dependen de la categoría, destino y uso real. Alquiler de número, complementos y gestión continua de campañas se cotizan aparte. Research al {proposal.reviewedOn}.</p>
  </div>;
}
