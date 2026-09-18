import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";

const reviews = [
  { quote: "Por fin pude entender qué modelo encajaba con mis recorridos sin tener que llenar un formulario interminable.", name: "María Fernanda", detail: "Primera compra eléctrica" },
  { quote: "La conversación me llevó de una duda general a una opción concreta y una cuota que podía comparar.", name: "Carlos M.", detail: "Familia / SUV" },
  { quote: "Se siente como hablar con alguien que conoce los vehículos, no como buscar datos en diez pestañas.", name: "Andrea R.", detail: "Terra S5 · demo" },
];

export function Testimonials() {
  return <section className="section testimonials-section"><div className="shell"><div className="section-heading"><div><span className="eyebrow">CONFIANZA QUE SE COMPARTE</span><h2>La experiencia también se entrega.</h2></div><Link href="https://www.google.com/maps" target="_blank" rel="noreferrer" className="text-link testimonials-link">Ver reseñas en Google Maps <ArrowUpRight size={15} /></Link></div><div className="testimonial-grid">{reviews.map((review) => <article className="testimonial-card" key={review.name}><div className="testimonial-card__stars">{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={13} fill="currentColor" />)}</div><blockquote>“{review.quote}”</blockquote><div><strong>{review.name}</strong><span>{review.detail}</span></div></article>)}</div><div className="delivery-strip"><div className="delivery-strip__visual"><span>ENTREGAS OLBOL / CONCEPTUAL</span><div className="delivery-strip__circles"><i /><i /><i /></div></div><div><span className="eyebrow">MOMENTOS QUE IMPORTAN</span><p>En la versión real, este espacio puede conectar reseñas verificadas y fotografías de entregas para construir autoridad sin interrumpir la venta.</p></div></div></div></section>;
}
