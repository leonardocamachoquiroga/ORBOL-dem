"use client";

import { FormEvent, useState } from "react";
import { CalendarDays, Check, X } from "lucide-react";
import type { Vehicle } from "@/domain/vehicles";
import { PremiumSelect, type PremiumSelectOption } from "./premium-select";

const timeOptions: PremiumSelectOption[] = [
  { value: "10:00", label: "10:00" },
  { value: "12:00", label: "12:00" },
  { value: "16:00", label: "16:00" },
  { value: "18:00", label: "18:00" },
];

export function TestDriveModal({ vehicle, onClose }: { vehicle: Vehicle; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState("10:00");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/test-drive", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vehicleId: vehicle.id,
        name: form.get("name"),
        phone: form.get("phone"),
        email: form.get("email"),
        date: form.get("date"),
        time: form.get("time"),
      }),
    });
    if (response.ok) setSent(true);
    setLoading(false);
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="test-drive-modal" role="dialog" aria-modal="true" aria-labelledby="test-drive-title">
        <button className="modal-close" onClick={onClose} aria-label="Cerrar"><X size={18} /></button>
        {sent ? (
          <div className="modal-success">
            <span><Check size={21} /></span>
            <span className="eyebrow">SOLICITUD RECIBIDA</span>
            <h2>Tu prueba del {vehicle.name} está en camino.</h2>
            <p>Un asesor te contactará para confirmar la fecha y la sucursal. En esta demo no se envían datos a un CRM real.</p>
            <button className="button-primary" onClick={onClose}>Cerrar</button>
          </div>
        ) : (
          <>
            <span className="eyebrow">AGENDAR PRUEBA DE MANEJO</span>
            <h2 id="test-drive-title">Siente el {vehicle.name}.</h2>
            <p className="test-drive-modal__intro">Solo necesitamos estos datos para preparar tu visita.</p>
            <form onSubmit={submit} className="test-drive-form">
              <label>Nombre<input name="name" required placeholder="Tu nombre" /></label>
              <label>Teléfono<input name="phone" required type="tel" placeholder="+591 700 000 00" /></label>
              <label>Correo<input name="email" required type="email" placeholder="tu@correo.com" /></label>
              <div className="test-drive-form__row">
                <label>Fecha<input name="date" required type="date" /></label>
                <label>
                  Hora
                  <PremiumSelect ariaLabel="Hora de la prueba" name="time" value={time} options={timeOptions} onChange={setTime} />
                </label>
              </div>
              <button className="button-primary" type="submit" disabled={loading}><CalendarDays size={16} /> {loading ? "Guardando…" : "Solicitar prueba"}</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
