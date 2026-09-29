# Plan — Próximos pasos para experiencia completa (circular)

## Roles y experiencia del usuario (circular)
1. **Cliente final** — busca club (Airbnb/Booking), ve mapa, reserva área, escanea QR, consume, paga (Cashea/Móvil/Cripto), recibe confirmación.
2. **Recepcionista / Mozo** — panel operativo del club: ver reservas del día, marcar ocupación, registrar consumo, cerrar cuenta, imprimir QR.
3. **Administrador / Propietario** — dashboard completo: ocupación, ingresos, reservas, configuración del club (mapa de áreas, precios, horarios), onboarding.
4. **Vendedor / Comerciante** — gestiona reservas externas (WhatsApp, OTA), asigna áreas, confirma consumo.
5. **Portal principal (buscador)** — indexa todos los clubs registrados en Reservana; búsqueda por ubicación, tipo de área, precio, disponibilidad; reserva directa.

## Tareas naturales (priorizadas)

### Fase 3: Panel operativo (club) — para recepcionista/mozo
- T10: Dashboard operativo (`/dashboard`) — reservas del día, mapa en vivo con ocupación, lista de consumo por reserva, botón para marcar ocupada/libre/consumiendo.
- T11: Componente `LiveStatusBadge` — indicador visual de estado del club (ocupación %, reservas activas).
- T12: Función `closeReservation` — libera área y genera total de consumo con enlace de pago.

### Fase 4: Portal de búsqueda y reserva (cliente final) — tipo Airbnb/Booking
- T13: Página `/search` o `/clubs` — buscador con filtros (ubicación, tipo de área, sombra, vista mar, rango de precios, fechas disponibles).
- T14: Componente `ClubCard` — tarjeta de club (nombre, imagen, ubicación, áreas disponibles, precio promedio, botón "Ver mapa y reservar").
- T15: Página `/club/[id]` — mapa interactivo del club con reservas en tiempo real, botón de reserva, QR generado al confirmar.

### Fase 5: Panel de administrador (propietario) — onboarding + gestión
- T16: Página `/admin` — configuración del club (nombre, ubicación, zonas, precios, horarios, imagen), mapa editable (agregar/eliminar áreas), estadísticas (ocupación, ingresos, reservas canceladas).
- T17: Componente `OnboardingFlow` — 3 pasos guiados (cuenta → cargar foto del club + configurar mapa → imprimir códigos QR + activar reservas) con instrucciones claras en español.
- T18: Función `generateQR` — genera códigos QR para cada área (texto: reserva + consumo) y descarga como imagen o imprime.

### Fase 6: Integración de pagos (producción)
- T19: Botón "Pagar con Cashea" en el componente `ConsumptionPanel` — llama al SDK (`cashea-web-checkout-sdk`) con `payload` (productos, precios, cliente) y `redirectUrl`.
- T20: Integración de Pago Móvil — enlace o formulario para transferencia bancaria (referencia, monto, confirmación manual por el club).
- T21: Integración Cripto — enlace para pago con USDT (wallet address o QR de wallet), confirmación manual.
- T22: Confirmación y cancelación de órdenes (`redirectUrl` + `idNumber`) — flujo de redirección al completar/cancelar el pago en Cashea.

### Fase 7: Mejoras de UX/UI táctil (producción)
- T23: Ajuste de colores de badge según tema (`Solaris Light` / `Tokyo Night`) en los componentes (`AreaCard`, `LiveStatusBadge`).
- T24: Aumentar tamaño de botones (`minHeight: 56px`) para pantallas táctiles grandes (tablets, kioskos de autoservicio).
- T25: Modo offline básico — guardar reservas y consumo en `localStorage` o `IndexedDB`, sincronizar al recuperar red.
- T26: Notificaciones por WhatsApp (Otelia AI) — confirmación de reserva, recordatorio 30 min antes, cierre de cuenta con total.

### Fase 8: Escalabilidad y multi-club
- T27: Modelo `BeachClub` actualizado con `ownerId`, `plan` (Esencial/Pro/Desarrollo), `stats` (ocupación mensual, ingreso mensual).
- T28: Dashboard consolidado (`/red`) — para cadenas o grupos de clubs: ocupación total, ingresos totales, reservas totales.
- T29: API pública (`/api/clubs`, `/api/reservations`, `/api/consumption`) para integración con Otelia PMS y otras plataformas.

## Restricciones y convenciones
- Cada subagente debe tocar archivos DISJUNTOS (evitar conflictos en JSX).
- Todos los componentes deben ser accesibles (táctiles, `minHeight`, contraste suficiente).
- El despliegue debe mantenerse ligero (`Dockerfile` multi-stage, `output: standalone`, `.dockerignore`).
- Los pagos en producción deben usar `Cashea SDK` con `redirectUrl` configurado (`https://reservana.com.ve/retorno`).
- El onboarding debe ser accesible para administradores no técnicos (texto en español, pasos guiados, sin código).
