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
- `/demo` — documentación visual del roadmap, arquitectura y respuestas a las dudas de OLBOL.

## Guion de demo

1. Desde Home, entrar a Terra S5.
2. Pulsar “Quiero saber si es para mí”.
3. Escribir: `Somos 5, viajamos los fines de semana y tengo un presupuesto de USD 30 mil`.
4. Revisar la recomendación y pedir una comparación.
5. Responder “Me interesa” para mostrar el siguiente paso comercial.

La demo funciona sin variables de entorno gracias al asesor determinista local. Para probar un endpoint compatible con chat, copiar `.env.example` a `.env.local` y completar `LLM_API_URL`, `LLM_API_KEY` y `LLM_MODEL`.

## Datos e integraciones

El asesor usa un `CatalogRepository` como puerto de acceso a datos. La implementación actual es local para que la presentación no dependa de una base externa; puede reemplazarse por una implementación SQL, Supabase, inventario o CRM sin cambiar la UI. La cotización siempre toma el precio del repositorio y devuelve una simulación marcada como demo.

Las imágenes de vehículos están en `public/images/vehicles` en WebP optimizado. La galería está preparada para sustituir estos renders por las fotografías oficiales y, posteriormente, por un set 360°.

El botón de WhatsApp usa un número demo y un mensaje prellenado. La ruta `/api/whatsapp/handoff` prepara el contexto; la conexión de producción deberá añadir el número oficial, plantillas aprobadas y credenciales de WhatsApp Business.

## Verificación

```bash
pnpm test
pnpm build
```

El producto no captura datos personales, no realiza reservas reales y no representa precios o stock oficiales de OLBOL.
