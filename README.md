# OLBOL Digital Sales Experience

Demo conceptual de una experiencia de venta digital para vehículos eléctricos. El catálogo, precios, disponibilidad e imágenes son ficticios y están diseñados para una presentación de producto.

## Inicio

```bash
pnpm install
pnpm dev
```

Abrir `http://localhost:3000`.

## Rutas de presentación

- `/` — Home premium con buscador rápido, reseñas, sucursales, mapa y WhatsApp flotante.
- `/vehiculos` — inventario con filtros por carrocería, modelo, año, precio, condición y kilometraje.
- `/vehiculos/terra-s5` — ficha VDP con galería de alta resolución, ficha técnica, precio, prueba de manejo y cotización.
- `/asesor` — vendedor IA con recomendación, cotizador en tiempo real y continuidad de contexto por WhatsApp.
- `/crm` — consola comercial con oportunidades, responsables, etapas, notas y permisos de seguimiento.
- `/demo` — propuesta de WhatsApp oficial y CRM, explicación de la solución, requisitos y canales oficiales, sin precios de implementación ni costos de proveedores.

## Guion de demo

1. Desde Home, entrar a Terra S5.
2. Pulsar “Quiero saber si es para mí”.
3. Escribir: `Somos 5, viajamos los fines de semana y tengo un presupuesto de USD 30 mil`.
4. Pedir `Quiero comparar` y después `Quiero cotizar`; validar la simulación y preparar el resumen de WhatsApp.
5. Responder `Me interesa`, abrir Ver CRM y asignar responsable, etapa y próxima acción.
6. Abrir Propuesta, explicar Yaku, el CRM del DMS y los canales oficiales; coordinar el siguiente paso con el equipo comercial.

El documento de apoyo interno `docs/OLBOL WhatsApp IA y Yaku.docx` contiene el research y el speech del análisis anterior. No forma parte de la demo pública ni constituye una oferta comercial vigente. La propuesta anterior `docs/OLBOL propuesta y guion de demo.docx` se conserva como antecedente; sus referencias a Kommo y sus totales han sido sustituidos. Los honorarios sugeridos requieren confirmación antes de emitir una oferta.

La demo funciona sin variables de entorno gracias al asesor determinista local. `OLBOL_LOCAL_ADVISOR=1` permite usarlo también cuando hay un proveedor externo configurado. Para activar ese proveedor, completar las variables de `.env.example` en `.env.local`. La clave permanece únicamente en el servidor; `.env.local` está excluido de Git.

## Datos e integraciones

El asesor usa un `CatalogRepository` como puerto de acceso a datos. La implementación actual es local para que la presentación no dependa de una base externa; puede reemplazarse por una implementación SQL, Supabase, inventario o CRM sin cambiar la UI. La cotización siempre toma el precio del repositorio y devuelve una simulación marcada como demo.

Las imágenes de vehículos están en `public/images/vehicles` en WebP optimizado. La galería está preparada para sustituir estos renders por las fotografías oficiales y, posteriormente, por un set 360°.

La ruta `/api/whatsapp/handoff` prepara un resumen que puede copiarse. La demo no envía mensajes. La propuesta de producción contempla WhatsApp Business Platform con Yaku como primera opción, o un CRM básico en el panel DMS, con permisos de contacto, plantillas, bajas y atención humana. La integración oficial reduce riesgos operativos; Meta conserva la facultad de restringir cuentas.

El CRM guarda ejemplos y cambios en el almacenamiento local del navegador. Puede restablecerse desde su pantalla. No hay conexión de producción a Yaku, proveedores de WhatsApp ni campañas publicitarias activadas. La consola representa el flujo comercial, no la interfaz real de Yaku. Usar únicamente datos ficticios durante la presentación.

## Presentación comercial

La demo pública explica la solución sin mostrar honorarios, cuotas de proveedores, presupuesto de anuncios ni un simulador de inversión. Yaku sigue como primera opción y el CRM básico en el DMS como alternativa. El equipo comercial define los precios, costos y condiciones con OLBOL.

La explicación de WhatsApp prioriza Business Platform como vía autorizada para conectar IA y CRM. Las conexiones no oficiales añaden riesgo de bloqueo. El canal oficial exige cumplir las políticas de Meta y no ofrece inmunidad ante restricciones por incumplimientos.

Los documentos de investigación se conservan como material de apoyo interno previo. Sus referencias económicas son orientativas y no deben presentarse como la oferta actual.

## Verificación

```bash
pnpm test
pnpm lint
pnpm build
```

La revisión incluye siete pruebas unitarias, diecinueve comprobaciones funcionales y siete pantallas en cuatro anchos. Los resultados están en `docs/verificacion-funcional.json`, `docs/capturas/revision.json` y `docs/revision-demo.md`.

Los scripts de navegador usan Playwright y Edge. Definir `OLBOL_RUNTIME_MODULES` con la carpeta de módulos del runtime que contiene Playwright y ejecutar, con la aplicación encendida:

```bash
node scripts/verify-demo.cjs
node scripts/capture-demo.cjs
node scripts/capture-sales-scenes.cjs
```

El documento vigente se genera con `scripts/build-whatsapp-document.py` y se verifica visualmente con `scripts/render-demo-document.ps1` en Windows con Word instalado. Los archivos de QA se excluyen de Git.

El producto no realiza reservas reales ni representa precios, stock, sucursales o resultados oficiales de OLBOL.
