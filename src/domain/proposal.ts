export const whatsappOptions = [
  { id: "meta", name: "Meta Cloud API directa", label: "Conexión directa con Meta", copy: "Conectamos el canal oficial con nuestro asesor de IA y Yaku o el panel DMS. Nuestro equipo mantiene la integración y el flujo de atención." },
  { id: "twilio", name: "Twilio", label: "Integración mediante proveedor", copy: "Otra vía para acceder a WhatsApp Business Platform con herramientas de mensajería y eventos. Conservamos el contexto y el control humano en el CRM." },
  { id: "360dialog", name: "360dialog", label: "Coexistencia para números elegibles", copy: "Permite conectar la plataforma oficial y evaluar el uso de la app Business con el mismo número. Primero revisamos la elegibilidad y la operación actual de OLBOL." },
] as const;

export const researchSources = [
  {title:"Política de mensajes de WhatsApp",url:"https://whatsappbusiness.com/policy/"},
  {title:"WhatsApp Business Platform",url:"https://whatsappbusiness.com/products/business-platform/"},
  {title:"Requisitos de alta en Twilio",url:"https://www.twilio.com/docs/whatsapp/self-sign-up"},
  {title:"Coexistencia con la app Business",url:"https://docs.360dialog.com/docs/resources/phone-numbers/coexistence"},
];
