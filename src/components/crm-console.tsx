"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronRight, ClipboardList, Search, ShieldCheck, RotateCcw, X } from "lucide-react";
import { useCRMStore, stages, type LeadStage, type DemoLead } from "@/store/crm-store";
import { formatPrice, getVehicleById } from "@/domain/vehicles";
import { PremiumSelect } from "./premium-select";
import { useDialog } from "./use-dialog";

function LeadDetail({lead,onClose}:{lead:DemoLead;onClose:()=>void}) {
  const {update,addNote} = useCRMStore();
  const [note,setNote] = useState("");
  const ref = useDialog(onClose);
  return <div className="modal-backdrop" onMouseDown={event=>{if(event.target===event.currentTarget)onClose();}}><div className="test-drive-modal lead-detail" ref={ref} role="dialog" aria-modal="true" aria-labelledby="lead-title">
    <button className="modal-close" onClick={onClose} aria-label="Cerrar oportunidad"><X size={18}/></button>
    <span className="eyebrow">OPORTUNIDAD DE DEMOSTRACIÓN</span><h2 id="lead-title">{lead.name}</h2>
    <p className="lead-detail__vehicle">{getVehicleById(lead.vehicleId)?.name} · {lead.source}</p>
    <p>{lead.summary}</p>
    <div className="lead-detail__fields"><div><span>Etapa comercial</span><PremiumSelect ariaLabel="Etapa comercial" value={lead.stage} options={stages.map(s=>({value:s,label:s}))} onChange={stage=>update(lead.id,{stage:stage as LeadStage})}/></div><div><span>Responsable</span><PremiumSelect ariaLabel="Responsable" value={lead.owner} options={["Sin asignar","Andrea","Miguel","Sofía"].map(s=>({value:s,label:s}))} onChange={owner=>update(lead.id,{owner})}/></div></div>
    <label className="lead-action">Próxima acción<input value={lead.nextAction} onChange={event=>update(lead.id,{nextAction:event.target.value})} maxLength={150}/></label>
    <div className={`consent-status ${lead.consent?"is-consented":""}`}><ShieldCheck size={18}/><span>{lead.consent?"Permiso de seguimiento de ejemplo registrado":"Sin permiso de seguimiento. No habilitar campañas."}</span></div>
    <h3>Historial del asesor</h3><ul className="lead-notes">{lead.notes.map((n,i)=><li key={i}><Check size={14}/><span>{n}</span></li>)}{lead.notes.length===0&&<li>Sin notas por ahora.</li>}</ul>
    <form className="lead-note-form" onSubmit={event=>{event.preventDefault();if(note.trim()){addNote(lead.id,note.trim());setNote("");}}}><label htmlFor="lead-note">Nueva nota de ejemplo</label><textarea id="lead-note" value={note} onChange={event=>setNote(event.target.value)} placeholder="Registra el siguiente paso…" maxLength={500}/><button className="button-primary" disabled={!note.trim()} type="submit">Guardar nota <Check size={15}/></button></form>
  </div></div>;
}

export function CRMConsole() {
  const {leads,reset} = useCRMStore();
  const [ready,setReady] = useState(false);
  const [term,setTerm] = useState("");
  const [selectedId,setSelectedId] = useState<string|null>(null);
  const [filter,setFilter] = useState("Todas");
  useEffect(()=>setReady(true),[]);
  const filtered = useMemo(()=>leads.filter(lead=>(filter==="Todas"||lead.source===filter)&&`${lead.name} ${lead.summary} ${getVehicleById(lead.vehicleId)?.name}`.toLowerCase().includes(term.toLowerCase())),[leads,filter,term]);
  const selected = leads.find(lead=>lead.id===selectedId);
  if(!ready)return <div className="crm-loading" aria-live="polite">Preparando la consola comercial…</div>;
  const active=leads.filter(lead=>lead.stage!=="Cerrado");
  return <>
    <div className="crm-notice"><span className="status-pill"><span className="status-pill__dot"/> Entorno de demostración</span><span>Datos ficticios · Cambios guardados solo en este navegador</span><button className="ghost-button" onClick={()=>{reset();setSelectedId(null);}}><RotateCcw size={14}/> Restablecer ejemplos</button></div>
    <div className="crm-metrics"><div><span>Oportunidades activas</span><strong>{active.length.toString().padStart(2,"0")}</strong><small>Clientes con un próximo paso</small></div><div><span>Necesitan responsable</span><strong>{active.filter(lead=>lead.owner==="Sin asignar").length.toString().padStart(2,"0")}</strong><small>Para que ninguna consulta se pierda</small></div><div><span>Pruebas de manejo</span><strong>{leads.filter(lead=>lead.stage==="Prueba").length.toString().padStart(2,"0")}</strong><small>Etapa previa a la decisión</small></div><div><span>Valor potencial del embudo</span><strong>{formatPrice(active.reduce((sum,lead)=>sum+(getVehicleById(lead.vehicleId)?.priceUsd??0),0))}</strong><small>Precios demo · No son ventas</small></div></div>
    <div className="crm-toolbar"><div><span className="eyebrow">TU EQUIPO EN UNA SOLA VISTA</span><h2>Del interés al siguiente paso.</h2></div><div className="crm-filters"><label className="crm-search"><Search size={16}/><input value={term} onChange={e=>setTerm(e.target.value)} placeholder="Buscar oportunidades" aria-label="Buscar oportunidades"/></label><PremiumSelect ariaLabel="Origen del contacto" value={filter} options={["Todas","Asesor web","Anuncio → WhatsApp","Catálogo web"].map(s=>({value:s,label:s}))} onChange={setFilter}/></div></div>
    <div className="crm-board">{stages.map(stage=><section className="crm-column" key={stage} aria-label={`Etapa ${stage}`}><div className="crm-column__heading"><span>{stage}</span><small>{filtered.filter(lead=>lead.stage===stage).length}</small></div><div className="crm-column__cards">{filtered.filter(lead=>lead.stage===stage).map(lead=><button className="lead-card" key={lead.id} onClick={()=>setSelectedId(lead.id)}><span className="lead-card__source">{lead.source}</span><strong>{lead.name}</strong><span className="lead-card__model">{getVehicleById(lead.vehicleId)?.name}</span><span className="lead-card__action"><ClipboardList size={14}/>{lead.nextAction}</span><span className="lead-card__footer"><span className="lead-avatar">{lead.owner==="Sin asignar"?"—":lead.owner[0]}</span><span>{lead.owner}</span><ChevronRight size={14}/></span></button>)}{!filtered.some(lead=>lead.stage===stage)&&<p className="crm-column__empty">Sin oportunidades en esta etapa</p>}</div></section>)}</div>
    <div className="crm-bottom"><ShieldCheck size={20}/><p>En producción, el CRM conectará conversaciones, permisos, responsables y tareas. Esta consola muestra el proceso con ejemplos locales.</p><Link href="/demo#solucion">Conocer la solución <ArrowRight size={16}/></Link></div>
    {selected&&<LeadDetail lead={selected} onClose={()=>setSelectedId(null)}/>}
  </>;
}
