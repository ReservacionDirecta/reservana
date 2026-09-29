import { BeachConsumption } from './consumption';

export interface CloseResult {
  total: number;
  items: BeachConsumption[];
}

export function closeReservation(
  reservationId: string,
  consumption: BeachConsumption[]
): CloseResult {
  if (!consumption || consumption.length === 0) {
    return { total: 0, items: [] };
  }
  const total = consumption.reduce(
    (sum, c) => sum + c.cantidad * c.precio,
    0
  );
  return { total, items: consumption };
}
