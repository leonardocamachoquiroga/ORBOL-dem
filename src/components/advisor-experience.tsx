"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Check, LoaderCircle, RotateCcw, Send, Sparkles } from "lucide-react";
import { getRuleBasedAdvisor, type AdvisorTurn } from "@/domain/advisor";
import { getVehicleById, vehicles } from "@/domain/vehicles";
import { useDemoStore } from "@/store/demo-store";
import { ComparisonTable } from "./comparison-table";
import { VehicleVisual } from "./vehicle-visual";
import { QuotePanel } from "./quote-panel";
import { WhatsAppCard } from "./whatsapp-card";

const welcomeTurn: AdvisorTurn = {
  message: "Busquemos tu próximo vehículo. Cuéntame cómo piensas usarlo y yo me encargo de ordenar las opciones.",
  contextPatch: { stage: "discovery" },
  quickReplies: ["Es mi primer eléctrico", "Necesito uno familiar", "Quiero comparar modelos", "Tengo un presupuesto definido"],
  uiCommand: { type: "none" },
};

function commandVehicleId(command: AdvisorTurn["uiCommand"]): string | undefined {
  if (command.type === "show_vehicle" || command.type === "show_recommendation" || command.type === "show_quote" || command.type === "show_interest_summary") return command.vehicleId;
  if (command.type === "show_comparison") return command.vehicleIds[0];
  return undefined;
}

export function AdvisorExperience({ initialVehicleId }: { initialVehicleId?: string }) {
  const { messages, context, hasStarted, start, addUserMessage, addAssistantMessage, reset } = useDemoStore();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeCommand, setActiveCommand] = useState<AdvisorTurn["uiCommand"]>({ type: "none" });
  const [comparisonIds, setComparisonIds] = useState<[string, string] | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentVehicle = useMemo(() => getVehicleById(commandVehicleId(activeCommand) ?? initialVehicleId ?? context.recommendedVehicleId ?? "terra-s5") ?? vehicles[1], [activeCommand, context.recommendedVehicleId, initialVehicleId]);

  useEffect(() => {
    if (!hasStarted && messages.length === 0) {
      start();
      addAssistantMessage(welcomeTurn);
    }
  }, [addAssistantMessage, hasStarted, messages.length, start]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  function applyTurn(turn: AdvisorTurn) {
    addAssistantMessage(turn);
    setActiveCommand(turn.uiCommand);
    if (turn.uiCommand.type === "show_comparison") setComparisonIds(turn.uiCommand.vehicleIds);
  }

  async function submit(message = input) {
    const trimmed = message.trim();
    if (!trimmed || loading) return;
    setInput("");
    addUserMessage(trimmed);
    setLoading(true);
    try {
      const response = await fetch("/api/advisor", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: trimmed, context }) });
      if (!response.ok) throw new Error("advisor-request-failed");
      const data = await response.json();
      applyTurn(data);
    } catch {
      applyTurn(getRuleBasedAdvisor(trimmed, context));
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submit();
  }

  function resetDemo() {
    reset();
    setActiveCommand({ type: "none" });
    setComparisonIds(null);
    setTimeout(() => { start(); addAssistantMessage(welcomeTurn); }, 0);
  }

  const isInterest = activeCommand.type === "show_interest_summary";
  const isQuote = activeCommand.type === "show_quote";

  return (
    <div className="advisor-shell">
      <section className="advisor-stage">
        <div className="advisor-stage__top"><span className="status-pill"><span className="status-pill__dot" /> Asesor OLBOL / En línea</span><button className="ghost-button" onClick={resetDemo}><RotateCcw size={14} /> Reiniciar demo</button></div>
        <div className="advisor-stage__content">
          {comparisonIds ? <ComparisonTable vehicles={[getVehicleById(comparisonIds[0]) ?? vehicles[0], getVehicleById(comparisonIds[1]) ?? vehicles[1]]} /> : <>
            <div className="advisor-stage__copy"><span className="eyebrow">{isQuote ? "COTIZACIÓN OLBOL" : isInterest ? "TU OPCIÓN OLBOL" : activeCommand.type === "show_recommendation" ? "MI RECOMENDACIÓN" : "DISEÑADO PARA TU MOMENTO"}</span><h1>{isQuote ? `Cotiza tu ${currentVehicle.name}.` : isInterest ? `Tu ${currentVehicle.name} empieza aquí.` : currentVehicle.name}</h1><p>{isQuote ? "Ajusta la inicial y el plazo. El catálogo calcula una cuota orientativa en segundos." : isInterest ? "Hemos guardado tu interés en esta demo. El siguiente paso sería revisar configuración y disponibilidad." : currentVehicle.tagline}</p></div>
            <VehicleVisual vehicle={currentVehicle} size="hero" />
            <div className="advisor-stage__metrics"><div><strong>{currentVehicle.rangeKm}</strong><span>km de autonomía</span></div><div><strong>{currentVehicle.fastChargeMinutes}<small> min</small></strong><span>carga rápida</span></div><div><strong>{currentVehicle.passengers}</strong><span>pasajeros</span></div></div>
            {isQuote && <QuotePanel vehicleId={currentVehicle.id} />}
            {isInterest && <div className="interest-card"><div className="interest-card__icon"><Check size={18} /></div><div><strong>Interés registrado</strong><p>En una implementación real, continuarías con financiamiento y reserva.</p></div><ArrowUpRight size={18} /></div>}
            {(isQuote || isInterest) && <WhatsAppCard vehicle={currentVehicle} context={context} />}
          </>}
        </div>
      </section>
      <section className="advisor-conversation" aria-label="Conversación con el asesor">
        <div className="advisor-conversation__header"><div><span className="eyebrow">OLBOL INTELLIGENCE</span><h2>Hablemos de tu próximo vehículo.</h2></div><Sparkles size={18} /></div>
        <div className="advisor-messages" ref={scrollRef}>
          {messages.map((message) => <div key={message.id} className={`message message--${message.role}`}><span className="message__role">{message.role === "assistant" ? "OLBOL" : "TÚ"}</span><p>{message.content}</p>{message.role === "assistant" && message.quickReplies && <div className="quick-replies">{message.quickReplies.map((reply) => <button key={reply} onClick={() => void submit(reply)} disabled={loading}>{reply}</button>)}</div>}</div>)}
          {loading && <div className="message message--assistant message--loading"><span className="message__role">OLBOL</span><p><LoaderCircle size={16} className="spin" /> Estoy ordenando las opciones…</p></div>}
        </div>
        <form className="advisor-composer" onSubmit={onSubmit}><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Cuéntame qué estás buscando…" aria-label="Mensaje para el asesor" disabled={loading} /><button type="submit" aria-label="Enviar mensaje" disabled={!input.trim() || loading}><Send size={17} /></button></form>
        <p className="advisor-disclaimer">Demo conceptual · El asesor usa datos ficticios de OLBOL.</p>
      </section>
    </div>
  );
}
