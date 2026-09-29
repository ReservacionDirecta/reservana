import { BeachReservation } from '../models/reservation';
interface QRAccessProps { reservation: BeachReservation | null; }
export default function QRAccess({ reservation }: QRAccessProps) {
  return (
    <div style={{ border: '2px dashed #eab308', borderRadius: '1rem', padding: '1rem', textAlign: 'center', background: '#0a0a0a' }}>
      <div style={{ fontFamily: 'monospace', fontSize: '2.2rem', letterSpacing: '.25rem', color: '#eab308', margin: '.3rem 0' }}>{reservation ? reservation.qr_token : '—'}</div>
      <p style={{ fontSize: '.75rem', color: '#9ca3af', margin: 0 }}>Escanea para ver tu reserva y ordenar</p>
    </div>
  );
}
