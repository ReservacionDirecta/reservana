export interface BeachConsumption {
  id: string | number;
  reservationId: string | number;
  producto: string;
  cantidad: number;
  precio: number;
  pagado: boolean;
}

export function calculateTotal(consumptions: BeachConsumption[]): number {
  return consumptions.reduce((sum, c) => sum + c.cantidad * c.precio, 0);
}
