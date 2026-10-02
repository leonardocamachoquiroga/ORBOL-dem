"use client";

import { useState } from "react";
import { Check, Copy, LoaderCircle, MessageCircle } from "lucide-react";
import type { CustomerContext } from "@/domain/advisor";
import type { Vehicle } from "@/domain/vehicles";

export function WhatsAppCard({ vehicle, context }: { vehicle: Vehicle; context: CustomerContext }) {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  async function prepareHandoff() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/whatsapp/handoff", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ vehicleId: vehicle.id, context }) });
      if (!response.ok) throw new Error("handoff-failed");
      const payload = await response.json() as { message?: string };
      setMessage(payload.message ?? "Hola, quiero continuar mi compra con OLBOL.");
    } catch {
      setError("No pudimos preparar el mensaje. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  async function copyMessage() {
    if (!message) return;
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setError("Selecciona el mensaje y cópialo manualmente.");
    }
  }

  return <div className="whatsapp-card"><div className="whatsapp-card__title"><span className="whatsapp-card__icon"><MessageCircle size={16} /></span><div><strong>Continúa por WhatsApp</strong><p>Prepara un resumen de tu conversación. No se envía en esta demo.</p></div></div>{message ? <div className="whatsapp-card__message"><span>MENSAJE PREPARADO</span><p>{message}</p><button onClick={() => void copyMessage()}>{copied ? <><Check size={14} /> Copiado</> : <><Copy size={14} /> Copiar mensaje</>}</button></div> : <button className="whatsapp-card__button" onClick={() => void prepareHandoff()} disabled={loading}>{loading ? <LoaderCircle size={15} className="spin" /> : <MessageCircle size={15} />} {loading ? "Preparando…" : "Preparar continuidad"}</button>}{error && <p className="form-error" role="alert">{error}</p>}</div>;
}
