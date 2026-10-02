# Revisión de la demo OLBOL

Fecha: 2 de octubre de 2026.

La revisión visual final también corrigió la altura del contenedor de galería en móvil y tablet, que solapaba el título, y una etiqueta que se estiraba sobre la foto. El reporte responsive comprueba ambos casos además del desbordamiento horizontal.

Se corrigieron imágenes de tarjetas sin altura, contrastes, solapamientos, estados del asesor, persistencia al recargar, el botón de continuidad de WhatsApp y enlaces de contacto conceptuales. Se añadieron galería ampliable accesible, manejo de errores, navegación móvil, animación sutil con respeto por movimiento reducido, CRM local y propuesta comercial con costos ajustables.

## Evidencia de verificación

- `pnpm test`: siete pruebas aprobadas en tres archivos.
- `pnpm lint`: sin advertencias ni errores.
- `pnpm build`: compilación de producción completada y diecisiete páginas generadas.
- `scripts/verify-demo.cjs`: dieciséis comprobaciones aprobadas; incluye comparación a cotización, resumen de WhatsApp, interés a CRM, edición y persistencia, modales y navegación móvil. Resultado en `verificacion-funcional.json`.
- `scripts/capture-demo.cjs`: veintiocho casos, siete rutas a 390, 768, 1024 y 1440 píxeles. Sin desbordamiento horizontal; en las capturas de escritorio no hubo imágenes rotas ni errores de ejecución. Resultado en `capturas/revision.json`.
- Capturas comerciales tomadas de la compilación de producción. La recomendación funciona con el asesor local cuando la API externa no responde.
- Documento Word de catorce páginas exportado con Word, renderizado a PNG y revisado visualmente, incluidas capturas, tablas y enlaces de fuentes.

## Límites concretos de la entrega

Los datos son ficticios. No se enviaron mensajes, no se activaron anuncios y no se conectaron cuentas reales de Meta o Kommo. Los registros comerciales se guardan en el navegador. La integración, las plantillas, los permisos y la aceptación del número quedan dentro del piloto propuesto. La calidad del proveedor externo de IA requiere validación con el catálogo oficial.

Los honorarios son una propuesta interna sugerida, pues aún no están definidos. Se asumen tres usuarios. Las provisiones de hosting, IA y mensajería no son tarifas garantizadas. Se documenta la discrepancia de fuentes sobre la actualización de WhatsApp de octubre de 2026 y queda pendiente confirmar el tarifario técnico aplicable a Bolivia antes de contratar.
