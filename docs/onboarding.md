# Onboarding — Reservana Beach Club

## Flujo guiado (3 pasos) — para administradores/proprietarios no técnicos

### Paso 1: Cuenta
- Nombre del club, ubicación, correo electrónico, WhatsApp.
- Tiempo estimado: 2 minutos.

### Paso 2: Club + Mapa
- Carga foto del club (opcional, mejora la visibilidad en el buscador `/search`).
- Configura las áreas en el mapa: marca dónde están las sombrillas (`2`, `4`, `6-12` personas), indica sombra (`var(--gold)`) y vista al mar (`var(--blue)`).
- Tiempo estimado: 5 minutos.

### Paso 3: QR + Activar reservas
- El sistema genera automáticamente códigos QR (`QR-{id}-{token}`) para cada área.
- Descarga los códigos (o imprímelos) y pégalos en las sombrillas correspondientes.
- Activa las reservas para recibir huéspedes inmediatamente.
- Primer mes gratis (`Plan Esencial`) para los primeros 5 clubs piloto en Margarita.

## Resultado inmediato
- El club aparece en `/search` con `ClubCard` (nombre, ubicación, áreas disponibles, precio promedio).
- El mapa interactivo (`/club/[id]`) muestra las áreas en vivo con reservas (`AreaCard` con `selected` y `status`).
- El panel operativo (`/dashboard`) muestra ocupación (`LiveStatusBadge`), reservas (`ReservationForm`), consumo (`ConsumptionPanel`) y cierre de cuenta (`closeReservation`).
- El huésped escanea el QR (`QRAccess`) para ver su reserva y ordenar consumo.
- El pago se realiza con `Cashea SDK` (`Pagar con Cashea`), `Pago Móvil` o `USDT / Cripto`.

## Diseñado para pantallas táctiles
- `minHeight: 120px` en `AreaCard` (mapa interactivo).
- `minHeight: 56px` en botones (`Pagar con Cashea`).
- `minHeight: 48px` en `LiveStatusBadge` y `ThemeToggle`.
- Diseño vertical (`grid` con `minmax`) para tablets y smartphones en posición vertical.
- Colores de contraste (`Solaris Light` / `Tokyo Night`) para accesibilidad.
