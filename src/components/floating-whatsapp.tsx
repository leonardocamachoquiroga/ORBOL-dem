import Link from "next/link";
import { MessageCircle } from "lucide-react";

const whatsappMessage = encodeURIComponent("Hola, quiero información sobre un vehículo OLBOL.");

export function FloatingWhatsApp() {
  return <Link className="floating-whatsapp" href={`https://wa.me/59170000000?text=${whatsappMessage}`} target="_blank" rel="noreferrer" aria-label="Hablar por WhatsApp"><MessageCircle size={21} /><span>WhatsApp</span></Link>;
}
