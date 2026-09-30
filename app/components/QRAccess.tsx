import { BeachReservation } from '../models/reservation';
interface P { reservation: BeachReservation|null; }
export default function QRAccess({ reservation }: P) {
  return (
    <div style={{ border: '2px dashed var(--gold)', borderRadius: '1.5rem', padding: '1.5rem 1rem', textAlign: 'center', background: 'var(--surface)', boxShadow: '0 4px 16px var(--shadow)' }}>
      <p style={{ fontSize: '.75rem', color: 'var(--muted)', margin: '0 0 .25rem', letterSpacing: '.05em', fontWeight: 600 }}>CÓDIGO DE ACCESO</p>
      <div style={{ fontFamily: 'monospace', fontSize: '3rem', letterSpacing: '.2rem', color: 'var(--red)', margin: '.25rem 0 .75rem', fontWeight: 800, textShadow: '0 2px 8px rgba(220,38,38,0.2)' }}>
        {reservation ? reservation.qr_token.slice(-4) : '----'}
      </div>
      <p style={{ fontSize: '.9rem', color: 'var(--fg)', fontWeight: 700, margin: '.5rem 0 0' }}>
        {reservation ? 'Confirmado — Reserva activa' : 'Pendiente — Selecciona un área'}
      </p>
      <p style={{ fontSize: '.75rem', color: 'var(--muted)', margin: '.25rem 0 0' }}>
        Escanea para ver tu reserva y ordenar consumo.
      </p>
      <div style={{ marginTop: '1rem', paddingTop: '.75rem', borderTop: '1px solid var(--border)' }}>
        <span style={{ display: 'inline-block', padding: '.35rem .75rem', borderRadius: '.75rem', background: reservation ? 'var(--ok)' : 'var(--red)', color: '#fff', fontSize: '.75rem', fontWeight: 700 }}>
          {reservation ? 'Pagado' : 'Pendiente'}
        </span>
      </div>
    </div>
  );
}
