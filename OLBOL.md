Sí. Con lo que ya está definido en la matriz y con el cambio importante de que la IA debería intentar **llevar la venta lo más lejos posible sin sentirse como formulario**, yo organizaría OLBOL como un producto propio, no como una adaptación visible del CRM base.

La idea de producto sería:

> **OLBOL Digital Sales Experience**
> Una experiencia de compra de vehículos eléctricos donde el cliente descubre, compara, consulta, recibe una recomendación, evalúa financiamiento y avanza hacia la reserva conversando con un asesor IA.

La matriz ya nos da el núcleo técnico: web optimizada para venta, WhatsApp oficial, CRM, captura automática, alertas y registro de conversaciones. Yo añadiría encima una **capa comercial inteligente** que convierta esas piezas en una experiencia coherente.

---

# Roadmap inicial OLBOL

Trabajaría con **sprints de una semana**. No porque necesariamente todo se termine en siete semanas, sino porque nos permite tomar decisiones de producto progresivamente sin diseñar seis meses de funcionalidad antes de probar la primera experiencia.

## Sprint 0 — Definición del producto y lenguaje visual

**Objetivo:** definir qué estamos construyendo antes de programar pantallas.

Aquí todavía no necesitamos solucionar toda la IA. Necesitamos fijar la experiencia.

| Definición                     | Resultado del sprint                                                   |
| ------------------------------ | ---------------------------------------------------------------------- |
| Qué vende OLBOL                | Catálogo real de vehículos                                             |
| A quién vende                  | 2–3 perfiles principales de comprador                                  |
| Qué significa “venta completa” | Consulta / recomendación / cotización / reserva / pago                 |
| Qué puede decidir la IA        | Límites comerciales                                                    |
| Qué debe escalar               | Casos que necesitan humano                                             |
| Identidad visual               | Design system inicial                                                  |
| Datos necesarios               | Catálogo, precios, autonomía, garantía, colores, stock, financiamiento |

El primer artefacto importante sería el **Customer Journey**:

```text
Descubro
   ↓
Exploro
   ↓
Pregunto
   ↓
IA entiende mi necesidad
   ↓
IA recomienda
   ↓
Comparo
   ↓
Resuelvo dudas
   ↓
Evalúo precio/financiamiento
   ↓
Elijo vehículo
   ↓
Configuro
   ↓
Reservo
   ↓
Seguimiento
```

La regla principal será:

> La información estructurada existe detrás del sistema, pero el cliente no debe sentir que está llenando un CRM.

---

# Sprint 1 — Web premium OLBOL

Este debería ser el primer desarrollo visible.

No construiría todavía un dashboard enorme. Primero haría que OLBOL parezca una marca de vehículos capaz de vender digitalmente.

## Arquitectura inicial

```text
OLBOL
│
├── Inicio
│
├── Vehículos
│
├── Modelo
│   ├── Diseño
│   ├── Autonomía
│   ├── Tecnología
│   ├── Carga
│   ├── Interior
│   └── Precio
│
├── Comparar
│
├── Asesor IA
│
├── Financiamiento
│
└── Mi compra
```

No tiene que existir todo funcionalmente desde Sprint 1. Pero la arquitectura debe contemplarlo.

---

# Home

La home no debería parecer una página corporativa de software.

Debe parecer **automotive commerce**.

Como referencia conceptual, marcas premium actuales como Lucid y Polestar dan muchísimo protagonismo al vehículo, reducen la navegación y combinan imágenes grandes con especificaciones y acciones como explorar, configurar, revisar inventario o reservar una prueba. ([Home | Lucid Motors][1])

### Hero

Pantalla casi completa.

```text
[                         VEHÍCULO                         ]

         ELÉCTRICO SIN COMPROMISOS

      401 km de autonomía para llegar más lejos.

            Desde $ XX.XXX

   [ Explorar vehículo ]    [ Hablar con un asesor ]
```

Pero hay algo importante:

### “Hablar con un asesor”

No debería abrir inmediatamente:

> Nombre
> Correo
> Celular

Debe abrir:

> **¿Qué estás buscando en tu próximo vehículo?**

Caja de texto grande.

Y sugerencias pequeñas:

`Quiero mi primer eléctrico`

`Necesito uno para mi familia`

`Quiero comparar modelos`

`Tengo un presupuesto definido`

---

# Segunda sección

Un modelo protagonista.

No seis cards pequeñas.

```text
                    [AUTO GRANDE]

BYD Yuan Up

401 km
Autonomía

30 min
Carga rápida

5
Pasajeros

Explorar →
```

Después otro modelo con composición inversa.

Eso permite que la página se sienta editorial y premium.

---

# Sprint 2 — Catálogo y Product Detail Page

Aquí construimos la parte que convierte una página bonita en herramienta de venta.

## Catálogo

No quiero:

```text
[card] [card] [card] [card]
[card] [card] [card] [card]
```

como ecommerce genérico.

Haría cards mucho más grandes.

Cada vehículo debería tener:

- fotografía real;
- modelo;
- categoría;
- autonomía;
- precio;
- capacidad;
- estado/disponibilidad;
- CTA.

Los filtros deberían ser comprensibles:

```text
Todos   SUV   Sedán   Ciudad

Precio
Autonomía
Pasajeros
```

Nada más inicialmente.

---

# Página de vehículo

Este será uno de los activos visuales más importantes.

Lucid, por ejemplo, estructura sus páginas alrededor de unos pocos indicadores potentes —autonomía, carga, potencia, aceleración— y luego construye una narrativa visual alrededor del diseño y experiencia del vehículo. ([Home | Lucid Motors][2])

OLBOL debería adaptar ese principio.

### Primer viewport

```text
← Vehículos

BYD
YUAN UP

El SUV eléctrico para todos los días.

        [        AUTOMÓVIL        ]

Desde $ XX.XXX

401 km       130 kW       30 min
Autonomía    Potencia     Carga

[ Quiero saber si es para mí ]
```

Observa el CTA.

No:

> CONTACTAR.

Sino:

> **Quiero saber si es para mí**

Eso conecta directamente con el vendedor IA.

---

# Sprint 3 — Asesor IA Web

Aquí aparece la diferencia real del producto.

El usuario ya puede entrar diciendo:

> “Tengo $25.000, somos cuatro en mi familia y a veces viajamos.”

Y la IA no responde con cinco campos.

Responde:

> Entiendo. Para cuatro personas y viajes ocasionales te conviene priorizar autonomía y espacio. ¿Tus recorridos diarios normalmente pasan de los 50 km?

La IA va generando silenciosamente un perfil:

```text
customer_context

budget:
  approximate: 25000

household:
  passengers: 4

usage:
  weekday: urban
  weekend: highway

priorities:
  - autonomy
  - space

purchase_intent:
  stage: discovery
```

Pero el cliente nunca ve JSON, formulario ni proceso de precalificación.

---

# Visualmente el asesor tampoco debe parecer ChatGPT

Esto es crucial.

No haría:

```text
sidebar
new chat
history
settings
...
```

Ni burbujas azul/morado.

La experiencia debe seguir sintiéndose OLBOL.

## Desktop

```text
┌────────────────────────────────────────────────────────────┐
│ OLBOL                                      Vehículos       │
├───────────────────────────┬────────────────────────────────┤
│                           │                                │
│                           │  Busquemos tu vehículo ideal.  │
│       VEHÍCULO            │                                │
│                           │  Cuéntame cómo piensas usarlo. │
│      seleccionado         │                                │
│                           │  [                            ] │
│                           │                                │
│                           │  Primer eléctrico              │
│                           │  Vehículo familiar             │
│                           │                                │
└───────────────────────────┴────────────────────────────────┘
```

Mientras la IA habla, la parte izquierda puede cambiar dinámicamente.

Si recomienda un vehículo:

**aparece el vehículo.**

Si compara:

**aparecen los dos.**

Si selecciona color:

**cambia el automóvil.**

La IA no vive dentro de un chat.

**La IA controla la experiencia comercial.**

---

# Sprint 4 — Recomendación y comparación inteligente

Aquí comienza la venta propiamente dicha.

La IA necesita herramientas para consultar:

```text
getVehicles()
getVehicleDetails()
checkAvailability()
compareVehicles()
getCurrentPrice()
getFinancingOptions()
```

No queremos que el modelo “recuerde” precios o inventario.

Debe consultar datos.

### Ejemplo

Cliente:

> ¿Cuál me recomiendas?

IA:

> Por lo que me contaste elegiría el Yuan Up.

Entonces cambia la pantalla:

```text
MI RECOMENDACIÓN

          [ YUAN UP GRANDE ]

          BYD Yuan Up

    La opción que mejor encaja contigo.

Por qué:
✓ espacio para cuatro personas
✓ autonomía adecuada para tus viajes
✓ dentro del rango que indicaste

401 km       $ XX.XXX       SUV

[ Ver configuración ]
```

Esto tiene muchísimo más valor visual que:

> “Según tus preferencias te recomiendo el modelo X.”

---

# Sprint 5 — WhatsApp + continuidad omnicanal

Aquí implementamos las piezas de la matriz:

`WA-01`
`WA-02`
`WA-04`
`WA-05`
`WA-06`

Pero con una diferencia:

WhatsApp es **otro canal del mismo vendedor IA**.

Ideal:

```text
WEB
Leonardo busca SUV familiar
↓
compara dos vehículos
↓
elige Yuan Up
↓
Continuar por WhatsApp
↓
WHATSAPP
"Seguíamos viendo el Yuan Up..."
```

No vuelve a empezar.

Esto sería uno de los momentos más fuertes de la demo.

La implementación deberá respetar las reglas vigentes de WhatsApp Business: la empresa puede automatizar respuestas dentro de la ventana de atención, necesita plantillas aprobadas para ciertos mensajes iniciados por la empresa fuera de esa ventana y debe ofrecer mecanismos claros de escalamiento. ([WhatsApp for Business][3])

---

# Sprint 6 — Configuración + financiamiento

Aquí ya estamos muy cerca de una venta real.

Una vez que el usuario dice:

> “Me interesa.”

La IA puede preguntar:

> Perfecto. ¿Quieres verlo pagando al contado o prefieres evaluar financiamiento?

Si dice financiamiento:

```text
BYD Yuan Up

Precio                  $ XX.XXX
Inicial                  $ X.XXX
Plazo                    48 meses
Cuota estimada           $ XXX

[ Ajustar inicial ]
[ Ajustar plazo ]

─────────────────────────

¿Cómo te resulta esta opción?

[ Me funciona ]
```

La conversación continúa debajo.

No aparece:

> Paso 4 de 9.

Eso haría que vuelva a sentirse como formulario.

---

# Sprint 7 — Reserva

Este sería mi **objetivo principal de producto para la primera demo avanzada**.

No intentaría todavía resolver transferencia bancaria, contratos electrónicos, impuestos, matrícula, etc.

Primero demostrar:

> **La IA logró llevar una conversación hasta una decisión comercial.**

Flujo:

```text
Vehículo
     ↓
Versión
     ↓
Color
     ↓
Financiamiento
     ↓
Disponibilidad
     ↓
Resumen
     ↓
Reserva
```

Pantalla:

```text
CONFIRMA TU YUAN UP

        [AUTO EN EL COLOR ELEGIDO]

Yuan Up
Blanco

Precio              $ XX.XXX
Reserva              $ XXX
Modalidad            Financiamiento

Entrega estimada     XX

[ Confirmar reserva ]
```

Después:

```text
Reserva confirmada

OLB-002184

Tu Yuan Up está reservado.

[ Ver mi compra ]
```

---

# Sprint 8 — Sales Console / CRM de OLBOL

Recién aquí mostraría fuertemente el CRM.

Porque ahora ya sabemos qué información genera la experiencia.

No deberíamos obligar al frontend comercial a adaptarse a un CRM genérico.

El CRM debe adaptarse a cómo vende OLBOL.

## Navegación

```text
OLBOL

Inicio

Ventas
Conversaciones
Clientes
Vehículos
Reservas

────────────

Configuración
```

Nada más.

---

# Dashboard comercial

No pondría 14 KPIs.

Arriba:

```text
Buenos días, Leonardo.

18
Conversaciones activas

7
Decisiones

3
Reservas

$ XX.XXX
Pipeline
```

Después:

## Necesitan atención

```text
CARLOS MENDOZA

Yuan Up
Solicitó precio corporativo.

IA recomienda intervención humana.

Hace 3 min

[ Revisar ]
```

Luego:

## Actividad de ventas IA

```text
10:41  María comparó Yuan Up vs Dolphin
10:38  Carlos solicitó financiamiento
10:32  Andrea reservó Yuan Up
10:27  José inició conversación
```

Eso comunica claramente:

> **El sistema está vendiendo.**

---

# Sprint 9 — Inteligencia comercial

Después de que todo lo anterior funcione.

La IA empieza a ayudar a OLBOL, no solamente al comprador.

Ejemplos:

```text
Esta semana

67 personas preguntaron por SUV.
23 llegaron a recomendación.
9 solicitaron financiamiento.
4 reservaron.

Principal objeción:
Autonomía.

Modelo más comparado:
Yuan Up.
```

Y eventualmente:

> 14 clientes tienen alta intención pero no reservaron.

`Reactivar conversaciones`

Ahí aparece muchísimo valor para la empresa.

---

# Mapa completo

Así quedaría el roadmap:

```text
SPRINT 0
Producto + identidad
        │
        ▼
SPRINT 1
Web premium
        │
        ▼
SPRINT 2
Catálogo + vehículo
        │
        ▼
SPRINT 3
Asesor IA
        │
        ▼
SPRINT 4
Recomendación + comparación
        │
        ▼
SPRINT 5
WhatsApp omnicanal
        │
        ▼
SPRINT 6
Financiamiento
        │
        ▼
SPRINT 7
Reserva
        │
        ▼
SPRINT 8
Sales Console / CRM
        │
        ▼
SPRINT 9
Inteligencia comercial
```

---

# Pero para la primera reunión no necesitamos 9 sprints

Para una **demo inicial de alto impacto**, el milestone sería:

### Demo V1

**Sprint 0 → Sprint 4**

La historia que mostramos:

```text
Home OLBOL
    ↓
Vehículos
    ↓
Yuan Up
    ↓
"¿Es adecuado para mí?"
    ↓
Conversación IA
    ↓
IA descubre necesidad
    ↓
Recomienda vehículo
    ↓
Comparación
    ↓
"Me interesa"
```

Aunque financiación, CRM y reserva inicialmente estén prototipados.

### Demo V2

Añadimos:

**WhatsApp + CRM**

### Demo V3

Añadimos:

**Financiamiento + reserva**

---

# Dirección visual: OLBOL Premium EV

Aquí establecería reglas bastante estrictas.

## 1. El auto siempre es protagonista

Una regla:

> **Cuando exista una imagen del vehículo, la UI nunca debe competir visualmente contra él.**

No meter 8 cards alrededor.

No gráficos al lado.

No cajas de colores.

La fotografía hace gran parte del trabajo.

---

# 2. Paleta

Hasta conocer el branding real de OLBOL partiría de una paleta neutral.

### Canvas

`#F7F7F5`

### Superficie

`#FFFFFF`

### Primary text

`#111111`

### Secondary

`#686868`

### Divider

`#E8E8E5`

### Dark sections

`#111111`

### Accent

Aquí entra **el color corporativo real de OLBOL**.

Regla:

**80% neutral / 15% imagery / 5% accent.**

No transformar toda la página en el color de marca.

---

# 3. Tipografía

Yo empezaría con:

**Inter / Geist**

o si queremos algo un poco más distintivo:

**Manrope.**

Escala desktop aproximada:

| Elemento   |   Tamaño |
| ---------- | -------: |
| Hero       | 64–80 px |
| H1         | 52–64 px |
| H2         | 36–44 px |
| H3         | 24–30 px |
| Body large |    18 px |
| Body       |    16 px |
| Metadata   | 13–14 px |

Pero el verdadero lujo no viene de poner fuente grande.

Viene de:

**espacio.**

---

# 4. Espaciado

Utilizaría grid de 8 px.

Secciones:

`120–160 px` vertical.

Cards:

`32–40 px` padding.

Separación:

mucho aire.

Una pantalla premium debería poder tener simplemente:

```text
      título


             AUTO



       401 km       130 kW       30 min
```

y sentirse terminada.

No necesitamos rellenar cada hueco.

---

# 5. Bordes

Muy pocos.

Radius:

`8–12 px`.

No `24px` en absolutamente todo.

No efecto:

> SaaS dashboard con tarjetas flotantes.

Muchas secciones ni siquiera necesitan una card.

---

# 6. Sombras

Casi ninguna.

Usarlas solamente para elementos realmente superpuestos:

- modales;
- selector flotante;
- menús;
- panel conversacional.

No:

```text
box-shadow:
0 20px 50px rgba(...)
```

en cada card.

---

# 7. Iconografía

Lineal.

Simple.

Evitar emojis en la interfaz final.

No:

⚡ 🔋 🚙 🤖

Sí:

iconos SVG muy discretos acompañando métricas.

---

# 8. Fotografía

Esto es probablemente más importante que los colores.

Necesitamos obtener de OLBOL:

- fotos oficiales;
- exterior;
- interior;
- frontal 3/4;
- lateral;
- trasera;
- pantalla;
- asientos;
- puerto de carga;
- maletero;
- versiones/color.

Una mala fotografía hará que incluso una UI excelente parezca barata.

---

# 9. Movimiento

El movimiento puede subir muchísimo la percepción de valor.

Pero debe ser lento y deliberado.

Ejemplos:

**scroll → auto entra suavemente**

**cambio de color → vehículo hace crossfade**

**IA recomienda → vehículo cambia**

**comparación → segundo vehículo entra**

Duraciones:

`200–400 ms` interfaz.

`500–900 ms` movimientos visuales grandes.

Nada de animaciones tipo gaming.

---

# 10. El producto debería parecer silencioso

Una buena referencia conceptual sería:

> **Apple + automotive premium + conversational commerce**

No:

> CRM + chatbot + template de Tailwind.

Lucid, por ejemplo, combina fotografía de producto, métricas técnicas y acciones de compra/configuración sin llenar la interfaz de componentes administrativos; su configurador mantiene permanentemente el vehículo como foco de la experiencia. ([Home | Lucid Motors][4])

Ese principio es exactamente el que usaría para OLBOL.

---

# Arquitectura técnica inicial

Todavía sin casarnos con tecnología concreta:

```text
                   OLBOL WEB
                      │
       ┌──────────────┴───────────────┐
       │                              │
   Commerce UI                    AI Sales UI
       │                              │
       └──────────────┬───────────────┘
                      │
                SALES ENGINE
                      │
       ┌──────────────┼──────────────┐
       │              │              │
     Catalog       Customer       Conversation
     Service        Context          Memory
       │              │              │
       └──────────────┼──────────────┘
                      │
                  AI AGENT
                      │
         ┌────────────┼────────────┐
         │            │            │
      Vehicle      Pricing     Financing
       Tools         Tool          Tool
         │            │            │
         └────────────┼────────────┘
                      │
                 Reservations
                      │
        ┌─────────────┴─────────────┐
        │                           │
    WhatsApp                     CRM
```

Esto permite que la IA **use herramientas**, en lugar de inventar respuestas.

---

# Principios que congelaría desde ahora

Aunque después cambiemos muchas cosas, mantendría estas decisiones:

| Principio   | Decisión                                  |
| ----------- | ----------------------------------------- |
| Experiencia | Conversacional, no formularios            |
| Producto    | Vehicle-first                             |
| IA          | Asesor comercial, no FAQ bot              |
| Información | IA consulta sistemas, no inventa          |
| Web         | Canal principal de descubrimiento         |
| WhatsApp    | Continuidad del mismo contexto            |
| CRM         | Consecuencia del proceso, no protagonista |
| Venta       | Intentar llegar hasta reserva             |
| Humano      | Escalamiento, no paso obligatorio         |
| Visual      | Editorial automotive premium              |
| Datos       | Capturados silenciosamente                |
| UI          | Mucho espacio, poca ornamentación         |

---

## Lo siguiente que haría

El **Sprint 0** merece que lo trabajemos ahora con más precisión. Antes de saltar a código, necesitamos definir únicamente cuatro cosas: **qué modelos vende OLBOL, quiénes son sus compradores principales, hasta dónde puede llegar realmente una compra y qué identidad gráfica tiene actualmente OLBOL**. es una demo para presentarle a olbol , aun no tenemos acceso a sus modelos ni nada , si no tenemos nada de los modelos podemos inventar modelos , colores , precios , etc

Con eso, el siguiente entregable debería ser un **Design System + sitemap + wireframe detallado de la Home y la página de vehículo**, y después ya podemos diseñar pantalla por pantalla el flujo del vendedor IA sin improvisar la interfaz a medida que programamos.

[1]: https://lucidmotors.com/?utm_source=chatgpt.com "Home | Lucid Motors"
[2]: https://lucidmotors.com/air?utm_source=chatgpt.com "Air | Lucid Motors"
[3]: https://business.whatsapp.com/policy/preview?lang=es_LA&utm_source=chatgpt.com "Política de comercio | WhatsApp Business"
[4]: https://lucidmotors.com/configure?utm_source=chatgpt.com "Design Your Lucid Air | Lucid Motors"
