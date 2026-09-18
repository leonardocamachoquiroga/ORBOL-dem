"use client";

import { useEffect, useMemo, useState } from "react";
import { Calculator, Check, LoaderCircle } from "lucide-react";
import { calculateQuote, type QuoteResult } from "@/domain/quote";
import { formatPrice, getVehicleById, vehicles } from "@/domain/vehicles";

export function QuotePanel({ vehicleId }: { vehicleId: string }) {
  const vehicle = getVehicleById(vehicleId) ?? vehicles[1];
  const [downPayment, setDownPayment] = useState(Math.round(vehicle.priceUsd * 0.3));
  const [term, setTerm] = useState<24 | 36 | 48 | 60>(48);
  const [quote, setQuote] = useState<QuoteResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDownPayment(Math.round(vehicle.priceUsd * 0.3));
    setQuote(null);
  }, [vehicle.id, vehicle.priceUsd]);

  const liveQuote = useMemo(() => calculateQuote(vehicle, { vehicleId: vehicle.id, downPaymentUsd: downPayment, termMonths: term }), [downPayment, term, vehicle]);

  async function validateQuote() {
    setLoading(true);
    try {
      const response = await fetch("/api/quote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ vehicleId: vehicle.id, downPaymentUsd: downPayment, termMonths: term }) });
      if (!response.ok) throw new Error("quote-failed");
      setQuote(await response.json() as QuoteResult);
    } finally {
      setLoading(false);
    }
  }

  const displayedQuote = quote ?? liveQuote;
  return <div className="quote-panel"><div className="quote-panel__header"><div><span className="eyebrow">SIMULACIÓN DE COMPRA</span><h3>{vehicle.name}</h3></div><span className="quote-panel__icon"><Calculator size={17} /></span></div><div className="quote-panel__body"><div className="quote-control"><div><span>Inicial</span><strong>{formatPrice(downPayment)}</strong></div><input type="range" min={Math.round(vehicle.priceUsd * .1)} max={Math.round(vehicle.priceUsd * .8)} step={500} value={downPayment} onChange={(event) => { setDownPayment(Number(event.target.value)); setQuote(null); }} aria-label="Monto de inicial" /></div><div className="quote-control"><div><span>Plazo</span><strong>{term} meses</strong></div><div className="term-options">{([24, 36, 48, 60] as const).map((option) => <button type="button" key={option} className={term === option ? "is-active" : ""} onClick={() => { setTerm(option); setQuote(null); }}>{option}</button>)}</div></div><div className="quote-result quote-result--live"><div><span>Cuota estimada en tiempo real</span><strong>{formatPrice(displayedQuote.monthlyPaymentUsd)} <small>/ mes</small></strong></div><div className="quote-result__meta"><span>Financiado {formatPrice(displayedQuote.financedAmountUsd)}</span><span>Tasa demo 10,5% anual</span></div><p><Check size={14} /> Se actualiza mientras ajustas la inicial y el plazo.</p></div><button className="quote-button" onClick={() => void validateQuote()} disabled={loading}>{loading ? <LoaderCircle size={16} className="spin" /> : <Calculator size={16} />} {loading ? "Validando…" : "Validar cotización"}</button></div><p className="quote-panel__note">Simulación conceptual. No constituye una oferta financiera ni reserva real.</p></div>;
}
