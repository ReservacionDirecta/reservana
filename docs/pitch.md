# Reservana — Propuesta de Inversión / Producto

## 1. Concepto
Extensión del PMS Otelia.com (PMS padre) para **clubes de playa** (Margarita y Caribe). No reemplaza el PMS hotelero; es un módulo especializado para propiedades costeras con distribución física de áreas (butacas, camastros, palapas) en la arena.

## 2. Problema real (Margarita)
- Los beach clubs gestionan reservas de áreas por WhatsApp o papel.
- No hay mapa visual de disponibilidad en tiempo real.
- El consumo (comida/bebida) se registra manualmente; no se vincula a la reserva.
- Sin control de ocupación por zona ni vista al mar como variable.

## 3. Funcionalidad clave (MVP)
| Función | Descripción |
|---|---|
| Mapa de playa | Grilla interactiva con áreas (2, 4, 6-12 personas), vista al mar, sombra. |
| Reservas | Por fecha/hora; estado: libre, reservada, ocupada, consumiendo. |
| QR en sitio | Cada área muestra QR; huésped escanea para ver reserva y ordenar consumo. |
| Control de consumo | Productos añadidos en tiempo real; cierre de cuenta al liberar área. |
| Panel del club | Ocupación, ingresos por consumo, reservas del día, mapa en vivo. |

## 4. Modelo de ingresos (SaaS)
- **Plan Beach**: $40/mes — 1 club, mapa básico, reservas, consumo básico, QR.
- **Plan Club**: $80/mes — 1 club, mapa avanzado (zonas, sombra/vista), reportes diarios, integración WhatsApp.
- **Plan Red**: $150/mes — 3+ clubs o cadena, dashboard consolidado, comisión 3% sobre consumo gestionado por app.

## 5. Mercado objetivo (fase 1)
- **Geografía**: Isla de Margarita (Venezuela) — 15+ beach clubs operativos.
- **Perfil**: Clubes con 10-60 áreas, que ya reciben reservas por WhatsApp y quieren profesionalizar la operación.
- **Referencia**: Peña Linda Bungalows (Hothelia) ya opera con modelo de reservas y consumo; este módulo expande ese conocimiento a la arena.

## 6. Inversión estimada (MVP 3 meses)
| Rubro | Costo (USD aproximado) |
|---|---|
| Desarrollo (extensión Otelia) | $3.500 |
| Diseño / UX del mapa | $800 |
| Infraestructura (Railway/Firebase) | $400 |
| Marketing inicial (redes, demo clubs) | $600 |
| Total MVP | **$5.300** |

## 7. Ventaja competitiva
- Se conecta al ecosistema Otelia (PMS, WhatsApp AI, facturación) sin duplicar datos.
- No existe un PMS específico para beach clubs en la región con mapa visual y consumo vinculado.
- Modelo de baja fricción: el club no cambia su flujo; solo reemplaza WhatsApp por QR + app.

## 8. Riesgos y mitigación
| Riesgo | Mitigación |
|---|---|
| Baja conectividad en playa | Modo offline básico; sincronización al recuperar red. |
| Adopción del personal | Capacitación de 1h; QR impreso con instrucciones. |
| Estacionalidad (Margarita) | Modelo anual con descuento de 2 meses; enfoque en temporada alta primero. |
