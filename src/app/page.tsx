import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ContactBranches } from "@/components/contact-branches";
import { Testimonials } from "@/components/testimonials";
import { VehicleCard } from "@/components/vehicle-card";
import { VehicleSearchBar } from "@/components/vehicle-search-bar";
import { VehicleVisual } from "@/components/vehicle-visual";
import { vehicles } from "@/domain/vehicles";

export default function HomePage() {
  const heroVehicle = vehicles[1];
  return <main>
    <section className="hero"><div className="shell hero__grid"><div className="hero__copy"><span className="hero__kicker">OLBOL / ELECTRIC MOBILITY</span><h1>Eléctrico <em>sin</em> compromisos.</h1><p className="hero__intro">Una nueva forma de elegir tu próximo vehículo. Menos ruido. Más espacio para lo que importa.</p><div className="hero__actions"><Link href="/vehiculos/terra-s5" className="button-primary">Explorar Terra S5 <ArrowUpRight size={16} /></Link><Link href="/asesor" className="button-light">Hablar con un asesor <ArrowRight size={16} /></Link></div><p className="hero__note"><span /> Diseñado para moverte más lejos, todos los días.</p></div><div className="hero__visual"><VehicleVisual vehicle={heroVehicle} size="hero" /></div></div></section>
    <section className="section section--search"><div className="shell"><VehicleSearchBar /></div></section>
    <section className="section"><div className="shell"><div className="section-heading"><div><span className="eyebrow">UNA MIRADA MÁS AMPLIA</span><h2>Tu próximo vehículo merece espacio.</h2></div><p>Explora una línea de vehículos eléctricos pensada alrededor de tu vida, no de una lista de especificaciones.</p></div><div className="feature-vehicle"><div className="feature-vehicle__visual"><VehicleVisual vehicle={heroVehicle} size="detail" showLabel={false} /></div><div className="feature-vehicle__content"><span className="eyebrow">OLBOL / TERRA S5</span><h3>Más espacio para lo que importa.</h3><p>420 km de autonomía. Cinco plazas amplias. Un SUV que entiende tu ritmo.</p><Link href="/vehiculos/terra-s5" className="feature-vehicle__link">Conocer Terra S5 <ArrowRight size={16} /></Link></div></div></div></section>
    <section className="section section--dark"><div className="shell"><div className="section-heading"><div><span className="eyebrow">LA LÍNEA OLBOL</span><h2>Encuentra el que encaja contigo.</h2></div><Link href="/vehiculos" className="feature-vehicle__link">Ver todos los vehículos <ArrowRight size={16} /></Link></div><div className="vehicle-grid">{[vehicles[0], vehicles[2]].map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} />)}</div></div></section>
    <section className="section section--dark" style={{ paddingTop: 0 }}><div className="shell advisor-preview"><div><span className="eyebrow">OLBOL INTELLIGENCE</span><h2>No tienes que saber exactamente qué buscas.</h2><p>Cuéntale al asesor cómo es tu vida. Él convierte tus prioridades en una recomendación que puedes sentir.</p><Link href="/asesor" className="feature-vehicle__link">Encontrar mi OLBOL <ArrowRight size={16} /></Link></div><div className="advisor-preview__card"><div className="advisor-preview__top"><span>ASESOR OLBOL</span><span className="arrow-circle"><ArrowUpRight size={16} /></span></div><div className="advisor-preview__bubble">“Somos cuatro en casa y los fines de semana salimos de la ciudad.”</div><div className="advisor-preview__choices"><span>Vehículo familiar</span><span>Quiero comparar</span><span>Tengo un presupuesto</span></div></div></div></section>
    <Testimonials />
    <ContactBranches />
  </main>;
}
