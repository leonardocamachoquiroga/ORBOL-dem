"use client";

import Link from "next/link";
import { MessageCircle, X, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useDialog } from "./use-dialog";

function ChannelPreview({ onClose }: { onClose: () => void }) {
  const ref = useDialog(onClose);
  return <div className="modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="test-drive-modal floating-whatsapp-dialog" role="dialog" aria-modal="true" aria-labelledby="whatsapp-preview-title" ref={ref}>
      <button className="modal-close" onClick={onClose} aria-label="Cerrar"><X size={18} /></button>
      <span className="eyebrow">WHATSAPP BUSINESS OFICIAL</span>
      <h2 id="whatsapp-preview-title">Una conversación que continúa.</h2>
      <p>En producción, este botón abrirá el número oficial de OLBOL. Hoy puedes probar el asesor y preparar el mensaje con el vehículo y tus prioridades.</p>
      <Link className="button-primary" href="/asesor" onClick={onClose}>Probar el asesor <ArrowRight size={16} /></Link>
      <Link className="text-link" href="/demo#whatsapp" onClick={onClose}>Ver la solución de WhatsApp <ArrowRight size={16} /></Link>
    </div>
  </div>;
}

export function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  return <><button className="floating-whatsapp" onClick={() => setOpen(true)} aria-label="Ver continuidad por WhatsApp"><MessageCircle size={21} /><span>WhatsApp</span></button>{open && <ChannelPreview onClose={() => setOpen(false)} />}</>;
}
