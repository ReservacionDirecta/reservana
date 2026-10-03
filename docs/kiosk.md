# Kiosk Táctil — Reservana Beach Club

## Modelo recomendado (estándar mundial — más económico)
- **Hardware**: `Raspberry Pi 4` (`2GB` RAM, `~$45`) + `Pantalla táctil 7" HDMI+USB` (`genérica China`, `~$35`) + `Carcasa ABS` (`~$10`) = `~$90` por unidad (`escala` = `100` unidades → `~$8,000`).
- **Software**: `Electron` (`.exe` en `Windows` o `.AppImage` en `Linux`) + `Next.js` (`PWA` con `offline`) como `backup`.

## Instalación en kiosk
1. `npm install` (instala `electron`, `electron-builder`).
2. `npm run build` (compila `Next.js` estático).
3. `npm run electron` (lanza `Electron` con `main.ts`).
4. `npm run dist` (genera `.exe` / `.AppImage` para distribución).

## Características del kiosk
- `Pantalla táctil vertical` (`touchscreen`): `Sidebar` (colapsable) + `BottomNav` (inferior) para navegación táctil.
- `Experiencia tipo cine`: `ClubDetailPage` (`club/[id]`) con `mapa interactivo` (`🎬`) para `reserva` de sombrillas (`tipo 2`, `4`, `6-12`).
- `Perfil público`: imagen (`unsplash`) del `club` (`Club — {clubId}`) con `gradiente` oscuro y `texto` (`Isla Margarita · Venezuela`).
- `Consumo`: `ConsumptionPanel` con `imágenes` (`Cerveza`, `Agua`, `Pescado`, `Helado de mar`) y `botón Pagar con Cashea` (`minHeight: 56px`).
- `QRAccess`: `número grande` (`3rem`) del `access code` (`qr_token.slice(-4)`) con `confirmación` (`Confirmado` / `Pendiente`) y `estado` (`Pagado` / `Pendiente`).
- `Tema`: `Solaris Light` (`#fdf6e3`) + `Tokyo Night` (`#0f1117`) con `ThemeToggle`.

## Uso en campo (`kiosk` en playa)
- `Cliente` (`huésped`): `escanea QR` (`QRAccess`) → `selecciona sombrilla` (`🎬`) → `confirma reserva` (`QRAccess` muestra `Confirmado`) → `paga` (`Pagar con Cashea`) → `consumo` (`ConsumptionPanel` con `imágenes` de `Cerveza`, `Agua`, `Pescado`, `Helado de mar`).
- `Administrador` (`club`): `/admin` (panel operativo con `LiveStatusBadge`, `closeReservation`, `mapa` en vivo).
- `Vendedor` (`recepcionista`): `/dashboard` (`LiveStatusBadge`, `mapa` en vivo, `consumo`, `reservas` del día).
- `Propietario` (`club`): `/admin` (`estadísticas`, `mapa editable`, `configuración`).

## Entregables (`repo` actualizado)
- `docs/kiosk.md`: documentación de instalación (`Electron` + `Next.js` + `kiosk`).
- `docs/onboarding.md`: flujo (`3 pasos`: `cuenta` → `mapa` → `QR`).
- `docs/pagos.md`: `Cashea SDK` (`v1.1.19`), `Pago Móvil`, `USDT / Cripto`.
- `docs/plans/next-steps.md`: `Fase 4 ✅` (29 tareas: `modelos`, `componentes`, `mapa interactivo`, `buscador`, `club/[id]`, `dashboard`, `admin`, `onboarding`, `multi-select sombrillas`, `tema`, `HeroUI`, `Cashea SDK`).
- `app/components/BottomNav.tsx`: `navbar inferior` (`minHeight: 72px`).
- `app/components/Sidebar.tsx`: `sidebar colapsable` (`minHeight: 48px`).
- `package.json`: `electron`, `electron-builder`, `next: 15.1.6`, `react: 19`, `tailwindcss: 4.3.3`, `cashea-web-checkout-sdk`.
- `main.ts`: archivo de `Electron` (`loadURL('http://localhost:3001')`, `fullscreen: true`).
- `.github/workflows/deploy.yml`: `despliegue` (`Railway`).
- `railway.json`: `configuración` (`port: 3000`).
- `Dockerfile`: `contenedor` (`Node.js` + `npm run build` + `npm start`).

## Cierre (`final`)
- `Build`: `PASS` (`Next.js 15.1.6`, `Static` + `Dynamic`).
- `Repo`: `https://github.com/ReservacionDirecta/reservana` (`commit final: 8dcf375`).
- `UI/UX táctil`: `minHeight: 120px` (`AreaCard`), `minHeight: 56px` (`Pagar con Cashea`), `minHeight: 48px` (`LiveStatusBadge`, `ThemeToggle`).
- `HeroUI`: `manual` (`Tailwind v4`, `Solaris Light` / `Tokyo Night`).
- `Multi-select sombrillas` (`selectedIds` + `detalles tipo/configuración` + `mapa interactivo`).
- `Cashea SDK`: `npm install` (`v1.1.19`), `docs/pagos.md` con `payload`, `redirectUrl`, `idNumber`.
