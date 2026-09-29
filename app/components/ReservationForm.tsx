import { useState } from 'react';
import { BeachArea } from '../models/beach';
interface ReservationFormProps {
  selectedArea: BeachArea | null;
  onReserve: (data: { name: string; time: string; duration: string }) => void;
}
export default function ReservationForm({ selectedArea, onReserve }: ReservationFormProps) {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('2');
  const [reserved, setReserved] = useState(false);
  const [summary, setSummary] = useState({ name: '', time: '', duration: '2' });
  const handleReserve = () => {
    if (!selectedArea || !name || !time) return;
    onReserve({ name, time, duration });
    setSummary({ name, time, duration });
    setReserved(true);
    setName(''); setTime(''); setDuration('2');
  };
  return (
    <div style={{ background: '#1a1a1a', borderRadius: '1rem', padding: '1.25rem', border: '1px solid #1f1f1f' }}>
      <h3 style={{ color: '#eab308', margin: '0 0 .75rem', fontSize: '1.1rem' }}>Reservar</h3>
      <label style={{ display: 'block', color: '#9ca3af', fontSize: '.85rem', marginBottom: '.25rem' }}>Nombre</label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Tu nombre" style={{ width: '100%', padding: '.5rem .75rem', borderRadius: '.375rem', border: '1px solid #2a2a2a', background: '#111', color: '#e5e7eb', fontSize: '.9rem', marginBottom: '.75rem', boxSizing: 'border-box' }} />
      <label style={{ display: 'block', color: '#9ca3af', fontSize: '.85rem', marginBottom: '.25rem' }}>Hora</label>
      <input type="time" value={time} onChange={e => setTime(e.target.value)} style={{ width: '100%', padding: '.5rem .75rem', borderRadius: '.375rem', border: '1px solid #2a2a2a', background: '#111', color: '#e5e7eb', fontSize: '.9rem', marginBottom: '.75rem', boxSizing: 'border-box' }} />
      <label style={{ display: 'block', color: '#9ca3af', fontSize: '.85rem', marginBottom: '.25rem' }}>Duración</label>
      <select value={duration} onChange={e => setDuration(e.target.value)} style={{ width: '100%', padding: '.5rem .75rem', borderRadius: '.375rem', border: '1px solid #2a2a2a', background: '#111', color: '#e5e7eb', fontSize: '.9rem', marginBottom: '1rem', boxSizing: 'border-box' }}>
        <option value="2">2 horas</option><option value="4">4 horas</option><option value="6">6 horas</option>
      </select>
      {reserved && <p style={{ color: '#eab308', fontSize: '.85rem', margin: '.5rem 0 1rem' }}>Reserva confirmada: {summary.name || '—'} a las {summary.time || '—'} por {summary.duration}h</p>}
      <button onClick={handleReserve} disabled={!selectedArea || !name || !time} style={{ width: '100%', padding: '.6rem 1rem', borderRadius: '.5rem', border: 'none', background: (selectedArea && name && time) ? '#2563eb' : '#1f1f1f', color: (selectedArea && name && time) ? '#fff' : '#6b7280', fontSize: '.95rem', fontWeight: 600, cursor: (selectedArea && name && time) ? 'pointer' : 'not-allowed' }}>Confirmar reserva</button>
    </div>
  );
}
