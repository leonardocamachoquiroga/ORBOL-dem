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
6. Abrir Propuesta, comparar proveedor de WhatsApp, volumen y publicidad, explicar alcance y acordar el siguiente paso.

El documento vigente `docs/OLBOL WhatsApp IA y Yaku.docx` resume la recomendación, requisitos, costos, capturas y speech. La propuesta anterior `docs/OLBOL propuesta y guion de demo.docx` se conserva como antecedente; sus referencias a Kommo y sus totales han sido sustituidos. Los honorarios sugeridos requieren confirmación antes de emitir una oferta.

La demo funciona sin variables de entorno gracias al asesor determinista local. `OLBOL_LOCAL_ADVISOR=1` permite usarlo también cuando hay un proveedor externo configurado. Para activar ese proveedor, completar las variables de `.env.example` en `.env.local`. La clave permanece únicamente en el servidor; `.env.local` está excluido de Git.

## Datos e integraciones

El asesor usa un `CatalogRepository` como puerto de acceso a datos. La implementación actual es local para que la presentación no dependa de una base externa; puede reemplazarse por una implementación SQL, Supabase, inventario o CRM sin cambiar la UI. La cotización siempre toma el precio del repositorio y devuelve una simulación marcada como demo.

Las imágenes de vehículos están en `public/images/vehicles` en WebP optimizado. La galería está preparada para sustituir estos renders por las fotografías oficiales y, posteriormente, por un set 360°.

La ruta `/api/whatsapp/handoff` prepara un resumen que puede copiarse. La demo no envía mensajes. La propuesta de producción contempla WhatsApp Business Platform con Yaku como primera opción, o un CRM básico en el panel DMS, con permisos de contacto, plantillas, bajas y atención humana. La integración oficial reduce riesgos operativos; Meta conserva la facultad de restringir cuentas.

El CRM guarda ejemplos y cambios en el almacenamiento local del navegador. Puede restablecerse desde su pantalla. No hay conexión de producción a Yaku, proveedores de WhatsApp ni campañas publicitarias activadas. La consola representa el flujo comercial, no la interfaz real de Yaku. Usar únicamente datos ficticios durante la presentación.

## Escenario de inversión

Supuesto inicial: un número y 10.000 mensajes mensuales entrantes + salientes. Yaku es la primera opción; sus capacidades de API, bandeja y licencia se deben validar. Si el cliente prefiere un CRM básico en el DMS, su construcción requiere un alcance y precio específicos.

Meta Cloud API directa no cobra una cuota de acceso adicional. Twilio suma USD 0,005 por mensaje entrante o saliente; 360dialog Regular suma USD 59 por número al mes. El consumo de Meta, IA e infraestructura va aparte. Los costos de proveedores y requisitos están vinculados desde `/demo` y el documento vigente.

Implementación sugerida USD 2.400 y mantenimiento sugerido USD 250 al mes, sujetos a revisión del alcance. Con reservas de infraestructura USD 25, IA USD 25 y Meta USD 30–90, más anuncios USD 450, el subtotal de planificación es USD 780–840 con Meta directa, USD 830–890 con Twilio o USD 839–899 con 360dialog. **A estos subtotales se debe sumar el CRM, impuestos y consumos adicionales.** No son cotizaciones cerradas ni garantías de capacidad.

Meta publica cargos por mensajes de atención desde octubre de 2026, con los primeros 1.000 por número al mes sin cargo. Confirmar el tarifario regional aplicable a Bolivia antes de cotizar: no se validó el valor unitario. El control de volumen ajusta únicamente el recargo de Twilio; Meta y la IA dependen del uso real.

## Verificación

```bash
pnpm test
pnpm lint
pnpm build
```

La revisión incluye diez pruebas unitarias, diecinueve comprobaciones funcionales y siete pantallas en cuatro anchos. Los resultados están en `docs/verificacion-funcional.json`, `docs/capturas/revision.json` y `docs/revision-demo.md`.

Los scripts de navegador usan Playwright y Edge. Definir `OLBOL_RUNTIME_MODULES` con la carpeta de módulos del runtime que contiene Playwright y ejecutar, con la aplicación encendida:

```bash
node scripts/verify-demo.cjs
node scripts/capture-demo.cjs
node scripts/capture-sales-scenes.cjs
```

El documento vigente se genera con `scripts/build-whatsapp-document.py` y se verifica visualmente con `scripts/render-demo-document.ps1` en Windows con Word instalado. Los archivos de QA se excluyen de Git.

El producto no realiza reservas reales ni representa precios, stock, sucursales o resultados oficiales de OLBOL.
