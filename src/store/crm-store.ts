"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const stages = ["Nuevo", "Contactado", "Cotización", "Prueba", "Cerrado"] as const;
export type LeadStage = typeof stages[number];
export interface DemoLead {
  id: string;
  name: string;
  vehicleId: string;
  source: string;
  stage: LeadStage;
  owner: string;
  nextAction: string;
  summary: string;
  notes: string[];
  consent: boolean;
}
const seedLeads: DemoLead[] = [
  { id:"demo-1", name:"María F. · ejemplo", vehicleId:"terra-s5", source:"Anuncio → WhatsApp", stage:"Cotización", owner:"Andrea", nextAction:"Confirmar prueba de manejo", summary:"Familia de 5. Presupuesto USD 30.000. Busca espacio y autonomía para viajes.", notes:["Prefiere una prueba el sábado por la mañana."], consent:true },
  { id:"demo-2", name:"Carlos M. · ejemplo", vehicleId:"neo-c1", source:"Asesor web", stage:"Nuevo", owner:"Sin asignar", nextAction:"Asignar un asesor", summary:"Primer eléctrico. Uso urbano. Presupuesto USD 25.000.", notes:[], consent:false },
  { id:"demo-3", name:"Andrea R. · ejemplo", vehicleId:"alto-x7", source:"Anuncio → WhatsApp", stage:"Prueba", owner:"Miguel", nextAction:"Revisar disponibilidad de color", summary:"Necesita siete plazas. Ya evaluó una simulación de financiamiento.", notes:["Requiere confirmación humana de stock."], consent:true },
  { id:"demo-4", name:"José L. · ejemplo", vehicleId:"terra-s5", source:"Catálogo web", stage:"Contactado", owner:"Andrea", nextAction:"Enviar cotización solicitada", summary:"Recorre 45 km diarios. Consulta carga en casa y garantía.", notes:[], consent:true },
  { id:"demo-5", name:"Laura P. · ejemplo", vehicleId:"neo-c1", source:"Asesor web", stage:"Cerrado", owner:"Miguel", nextAction:"Preparar seguimiento posventa", summary:"Venta ficticia para mostrar el cierre del embudo.", notes:["Cierre de ejemplo. No representa ingresos reales."], consent:true },
];
interface CRMStore {
  leads: DemoLead[];
  update: (id: string, patch: Partial<Omit<DemoLead,"id">>) => void;
  addNote: (id: string, note: string) => void;
  captureInterest: (vehicleId: string, summary: string) => void;
  reset: () => void;
}
export const useCRMStore = create<CRMStore>()(persist(set => ({
  leads: seedLeads,
  update: (id, patch) => set(state => ({leads:state.leads.map(lead=>lead.id===id?{...lead,...patch}:lead)})),
  addNote: (id,note) => set(state=>({leads:state.leads.map(lead=>lead.id===id?{...lead,notes:[...lead.notes,note]}:lead)})),
  captureInterest: (vehicleId,summary) => set(state => {
    const existing = state.leads.find(lead=>lead.id==="web-demo-interest");
    if(existing) return {leads:state.leads.map(lead=>lead.id===existing.id?{...lead,vehicleId,summary,stage:"Cotización" as LeadStage}:lead)};
    return {leads:[{id:"web-demo-interest",name:"Visitante web · demo",vehicleId,source:"Asesor web",stage:"Cotización",owner:"Sin asignar",nextAction:"Revisar interés y solicitar permiso de contacto",summary,notes:[],consent:false},...state.leads]};
  }),
  reset: () => set({leads:seedLeads}),
}), {name:"olbol-crm-demo-v1"}));
