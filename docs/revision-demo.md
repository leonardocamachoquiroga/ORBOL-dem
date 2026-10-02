# Revisión de la demo OLBOL

Fecha: 2 de octubre de 2026.

La revisión visual final también corrigió la altura del contenedor de galería en móvil y tablet, que solapaba el título, y una etiqueta que se estiraba sobre la foto. El reporte responsive comprueba ambos casos además del desbordamiento horizontal.

Se corrigieron imágenes de tarjetas sin altura, contrastes, solapamientos, estados del asesor, persistencia al recargar, el botón de continuidad de WhatsApp y enlaces de contacto conceptuales. Se añadieron galería ampliable accesible, manejo de errores, navegación móvil, animación sutil con respeto por movimiento reducido, CRM local y propuesta comercial con costos ajustables.

## Evidencia de verificación

- `pnpm test`: siete pruebas aprobadas en tres archivos; se retiraron las pruebas del simulador de costos eliminado.
- `pnpm lint`: sin advertencias ni errores.
- `pnpm build`: compilación de producción completada y diecisiete páginas generadas.
- `scripts/verify-demo.cjs`: diecinueve comprobaciones aprobadas; incluye comparación a cotización, resumen de WhatsApp, interés a CRM, edición y persistencia, modales y navegación móvil. Resultado en `verificacion-funcional.json`.
- `scripts/capture-demo.cjs`: veintiocho casos, siete rutas a 390, 768, 1024 y 1440 píxeles. Sin desbordamiento horizontal; en las capturas de escritorio no hubo imágenes rotas ni errores de ejecución. Resultado en `capturas/revision.json`.
- Capturas comerciales tomadas de la compilación de producción. La recomendación funciona con el asesor local cuando la API externa no responde.
- Documento vigente de seis páginas sobre WhatsApp IA y Yaku, exportado con Word, renderizado a PNG y revisado visualmente en todas sus páginas. Contiene capturas, requisitos por proveedor, escenarios de costo, fuentes y speech. La propuesta anterior de catorce páginas se conserva como antecedente y sus costos han sido sustituidos.

## Límites concretos de la entrega

Los datos son ficticios. No se enviaron mensajes, no se activaron anuncios y no se conectaron cuentas reales de Meta, Yaku, Twilio o 360dialog. Los registros comerciales se guardan en el navegador. La integración, las plantillas, los permisos y la aceptación del número quedan dentro del piloto propuesto. La calidad del proveedor externo de IA requiere validación con el catálogo oficial.

Los honorarios son sugeridos y deben revalidarse después de auditar Yaku y definir el alcance. Yaku es la primera opción; un CRM básico en el DMS es la alternativa. La licencia de Yaku, usuarios y capacidades de integración siguen por definir. Las provisiones de infraestructura, IA y Meta no son tarifas garantizadas. Meta ya publica el cambio de octubre de 2026 en su FAQ; queda pendiente el valor unitario del tarifario aplicable a Bolivia. El simulador marca sus cifras como subtotales sin CRM y compara Meta directa, Twilio y 360dialog.

## Actualización de la propuesta con Yaku

Se retiró Kommo de la recomendación activa, la contratación mínima de seis meses y el costo ficticio por usuario. Se distinguen CRM y conexión oficial. Se verificaron controles de proveedor, volumen y opción DMS; las capturas actuales muestran la propuesta revisada. Twilio requiere validar el programa Tech Provider al operar Yaku como proveedor de software para clientes. La coexistencia y continuidad del número deben validarse antes de cualquier migración.

## Demo pública sin precios

Se retiraron el simulador de inversión, importes de implementación y mantenimiento, provisiones, tarifas de proveedores y enlaces de precios de la interfaz. La propuesta conserva la explicación de Yaku, CRM DMS, IA, Meta directa, Twilio y 360dialog. El equipo comercial coordina el alcance y las condiciones del piloto.

Se actualizó el enlace desde CRM hacia la solución y el mensaje de WhatsApp: el canal oficial es la vía autorizada y las conexiones no oficiales añaden riesgo de bloqueo. Meta puede restringir cuentas por incumplimientos; no se promete inmunidad. La verificación funcional comprueba la ausencia de tarifas en la propuesta y la presencia de las opciones de integración.

Los documentos de investigación conservados son apoyo interno previo y no forman parte de la interfaz publicada ni de una oferta vigente.
