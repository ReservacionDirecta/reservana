# Pagos — Reservana Beach Club

## Cashea SDK (`npm install cashea-web-checkout-sdk`)
Flujo:
1. Usuario confirma consumo (`ConsumptionPanel` → botón `Pagar con Cashea`).
2. SDK (`CheckoutSDK`) crea orden con `payload`: `deliveryMethod: IN_STORE`, `merchantName`, `orders`, `products`, `identificationNumber`, `redirectUrl`.
3. Usuario completa pago en Cashea; redirige a `redirectUrl` (`https://reservana.com.ve/retorno?idNumber=...`).
4. El club confirma/cancela la orden con `idNumber`; `closeReservation` calcula el total (`$`).

Configuración (`.env.local`):
```
CASHEA_API_KEY=tu_api_key
CASHEA_REDIRECT_URL=https://reservana.com.ve/retorno
```

## Pago Móvil (transferencia bancaria — Venezuela)
- Enlace o formulario para transferencia bancaria (referencia, monto, confirmación manual por el club).
- La confirmación se hace manualmente por el club (no hay SDK automático).

## Cripto (`USDT / BTC`)
- Enlace para pago con `USDT` (`wallet address` o `QR` de wallet).
- Confirmación manual por el club.
