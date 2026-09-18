"use client";

import { useState } from "react";
import { Check, Copy, LoaderCircle, MessageCircle } from "lucide-react";
import type { CustomerContext } from "@/domain/advisor";
import type { Vehicle } from "@/domain/vehicles";

export function WhatsAppCard({ vehicle, context }: { vehicle: Vehicle; context: CustomerContext }) {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function prepareHandoff() {
    setLoading(true);
    try {
      const response = await fetch("/api/whatsapp/handoff", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ vehicleId: vehicle.id, context }) });
      const payload = await response.json() as { message?: string };
      setMessage(payload.message ?? "Hola, quiero continuar mi compra con OLBOL.");
    } finally {
      setLoading(false);
    }
  }

  async function copyMessage() {
    if (!message) return;
    await navigator.clipboard?.writeText(message);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return <div className="whatsapp-card"><div className="whatsapp-card__title"><span className="whatsapp-card__icon"><MessageCircle size={16} /></span><div><strong>Continúa por WhatsApp</strong><p>El contexto de tu conversación viaja contigo.</p></div></div>{message ? <div className="whatsapp-card__message"><span>MENSAJE PREPARADO</span><p>{message}</p><button onClick={() => void copyMessage}>{copied ? <><Check size={14} /> Copiado</> : <><Copy size={14} /> Copiar mensaje</>}</button></div> : <button className="whatsapp-card__button" onClick={() => void prepareHandoff} disabled={loading}>{loading ? <LoaderCircle size={15} className="spin" /> : <MessageCircle size={15} />} {loading ? "Preparando…" : "Preparar continuidad"}</button>}</div>;
}
