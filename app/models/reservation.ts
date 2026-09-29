export type Estado = 'libre' | 'reservada' | 'ocupada' | 'consumiendo';

export interface BeachReservation {
  id: string;
  clubId: string;
  areaId: string;
  hora_inicio: string;
  hora_fin: string;
  estado: Estado;
  qr_token: string;
}
