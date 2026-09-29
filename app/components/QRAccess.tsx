import { BeachReservation } from '../models/reservation';
interface P { reservation: BeachReservation|null; }
export default function QRAccess({ reservation }: P) {
  return <div style={{border:'2px dashed #eab308',borderRadius:'1rem',padding:'1rem',textAlign:'center',background:'var(--surface)'}}><div style={{fontFamily:'monospace',fontSize:'2.2rem',letterSpacing:'.25rem',color:'var(--gold)',margin:'.3rem 0'}}>{reservation ? reservation.qr_token : '—'}</div><p style={{fontSize:'.75rem',color:'var(--muted)',margin:0}}>Escanea para ver tu reserva y ordenar</p></div>;
}
