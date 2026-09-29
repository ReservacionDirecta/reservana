# Reservana — Especificación Técnica (MVP)

## Arquitectura (extensión Otelia)
- **Stack**: Next.js / Node + Prisma + Postgres (mismo que Otelia) + Firebase (QR, real-time).
- **Nuevo esquema Prisma** (módulo beach):
  - `BeachClub` (nombre, ubicación, zonas)
  - `BeachArea` (tipo: 2/4/6-12, vista_mar: bool, sombra: bool, coordenadas_x/y)
  - `BeachReservation` (club_id, area_id, hora_inicio, hora_fin, estado, qr_token)
  - `BeachConsumption` (reservation_id, producto, cantidad, precio, pagado)

## Flujo del huésped (QR)
1. Escanea QR en la butaca/área → abre webapp (sin login obligatorio).
2. Ve su reserva (nombre, hora) y menú del club.
3. Agrega consumo → se guarda en `BeachConsumption`; notifica al personal.
4. Al finalizar, personal cierra reserva; total de consumo se muestra.

## Flujo del club (panel)
- Vista en vivo del mapa (zonas ocupadas/libres/reservadas con colores).
- Reservas del día con filtro.
- Reporte diario: ocupación, consumo total, reservas canceladas.

## Integraciones
- WhatsApp (Otelia AI): confirmación de reserva, recordatorio 30 min antes.
- Pagos: enlace a pasarela local; registro manual si no hay pasarela activa.
