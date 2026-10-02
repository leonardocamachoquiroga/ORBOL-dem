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
- `/demo` — propuesta de WhatsApp oficial y CRM, controles de riesgo, investigación y simulador de inversión.

## Guion de demo

1. Desde Home, entrar a Terra S5.
2. Pulsar “Quiero saber si es para mí”.
3. Escribir: `Somos 5, viajamos los fines de semana y tengo un presupuesto de USD 30 mil`.
4. Pedir `Quiero comparar` y después `Quiero cotizar`; validar la simulación y preparar el resumen de WhatsApp.
5. Responder `Me interesa`, abrir Ver CRM y asignar responsable, etapa y próxima acción.
6. Abrir Propuesta, ajustar usuarios y publicidad, explicar alcance y acordar el siguiente paso.

El documento `docs/OLBOL propuesta y guion de demo.docx` contiene capturas reales, el speech, alternativas, costos, fuentes y respuestas a objeciones. Los honorarios son sugeridos y requieren confirmación antes de emitir la oferta formal.

La demo funciona sin variables de entorno gracias al asesor determinista local. `OLBOL_LOCAL_ADVISOR=1` permite usarlo también cuando hay un proveedor externo configurado. Para activar ese proveedor, completar las variables de `.env.example` en `.env.local`. La clave permanece únicamente en el servidor; `.env.local` está excluido de Git.

## Datos e integraciones

El asesor usa un `CatalogRepository` como puerto de acceso a datos. La implementación actual es local para que la presentación no dependa de una base externa; puede reemplazarse por una implementación SQL, Supabase, inventario o CRM sin cambiar la UI. La cotización siempre toma el precio del repositorio y devuelve una simulación marcada como demo.

Las imágenes de vehículos están en `public/images/vehicles` en WebP optimizado. La galería está preparada para sustituir estos renders por las fotografías oficiales y, posteriormente, por un set 360°.

La ruta `/api/whatsapp/handoff` prepara un resumen que puede copiarse. La demo no envía mensajes. La propuesta de producción contempla WhatsApp Business Platform y Kommo Advanced, con permisos de contacto, plantillas, bajas y atención humana. La integración oficial reduce riesgos operativos; Meta conserva la facultad de restringir cuentas.

El CRM guarda ejemplos y cambios en el almacenamiento local del navegador. Puede restablecerse desde su pantalla. No hay conexión de producción a Kommo ni campañas publicitarias activadas. Usar únicamente datos ficticios durante la presentación.

## Escenario de inversión

Supuesto inicial: un número y tres usuarios de Kommo Advanced. Implementación sugerida USD 2.400; mantenimiento sugerido USD 250 al mes. Con una provisión tecnológica de USD 185–245 y anuncios de USD 450, el total estimado es USD 885–945 al mes, sin impuestos ni excesos de consumo. Kommo requiere seis meses al contratar: USD 630 en este escenario.

Las tarifas publicadas y sus fuentes están en `/demo` y en el documento. Hosting, IA y mensajería son provisiones de planificación. La tarifa de mensajes aplicable a Bolivia se debe confirmar antes de contratar; el research detectó una discrepancia entre el aviso de actualización de Kommo y la página general de Meta.

## Verificación

```bash
pnpm test
pnpm lint
pnpm build
```

La revisión incluye siete pruebas unitarias, dieciséis comprobaciones funcionales y siete pantallas en cuatro anchos. Los resultados están en `docs/verificacion-funcional.json`, `docs/capturas/revision.json` y `docs/revision-demo.md`.

Los scripts de navegador usan Playwright y Edge. Definir `OLBOL_RUNTIME_MODULES` con la carpeta de módulos del runtime que contiene Playwright y ejecutar, con la aplicación encendida:

```bash
node scripts/verify-demo.cjs
node scripts/capture-demo.cjs
node scripts/capture-sales-scenes.cjs
```

El documento se genera con `scripts/build-demo-document.py` y se verifica visualmente con `scripts/render-demo-document.ps1` en Windows con Word instalado. Los archivos de QA se excluyen de Git.

El producto no realiza reservas reales ni representa precios, stock, sucursales o resultados oficiales de OLBOL.
