# Integración de Pagos — Reservana

## Plataformas soportadas (fase 2)
- **Cashea** (BNPL — Buy Now Pay Later) — SDK oficial: `npm install cashea-web-checkout-sdk`
- **Pago Móvil** (transferencia inmediata — Venecos/Venezuela)
- **Cripto** (USDT / BTC via wallet link o QR)
- **QR de consumo** — generado por la reserva; muestra total al escanear

## SDK Cashea
```bash
npm install cashea-web-checkout-sdk
```
Configuración en `public/index.html` o componente React:
```typescript
import CheckoutSDK from 'cashea-web-checkout-sdk';
const sdk = new CheckoutSDK({ apiKey: process.env.CASHEA_API_KEY });
```
Flujo: usuario confirma consumo → botón "Pagar con Cashea" → SDK abre checkout → redirección con `idNumber` → confirmación en `redirectUrl`.
