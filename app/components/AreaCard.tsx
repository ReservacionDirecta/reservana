import { BeachArea } from '../models/beach';
interface AreaCardProps {
  area: BeachArea;
  onSelect: (areaId: string | number) => void;
  status: 'libre' | 'reservada' | 'ocupada' | 'consumiendo';
  selected?: boolean;
}
export default function AreaCard({ area, onSelect, status, selected = false }: AreaCardProps) {
  const statusMap = {
    libre: { text: 'Libre', color: '#22c55e', bg: '#052e16' },
    reservada: { text: 'Reservada', color: '#eab308', bg: '#422006' },
    ocupada: { text: 'Ocupada', color: '#dc2626', bg: '#450a0a' },
    consumiendo: { text: 'Consumiendo', color: '#2563eb', bg: '#0a1c36' },
  };
  const s = statusMap[status];
  const metaParts: string[] = [];
  metaParts.push(area.type);
  if (area.meta?.vista_mar) metaParts.push('Vista mar');
  if (area.meta?.sombra) metaParts.push('Sombra');
  return (
    <button
      onClick={() => onSelect(area.id)}
      aria-label={`Área ${area.id}`}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
        gap: '0.35rem', padding: '0.6rem', borderRadius: '0.75rem',
        border: selected ? '2px solid #eab308' : '1px solid #1f1f1f',
        background: '#111', color: '#f4f4f4', cursor: 'pointer',
        transition: 'transform 0.1s ease, border-color 0.2s, box-shadow 0.2s',
        boxShadow: selected ? '0 0 0 2px #eab308' : 'none', minWidth: '110px',
      }}
    >
      <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>A-{area.id}</span>
      <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{metaParts.join(' · ')}</span>
      <span style={{ display: 'inline-block', fontSize: '0.65rem', padding: '0.1rem 0.35rem', borderRadius: '0.25rem', marginTop: '0.15rem', background: s.bg, color: s.color, fontWeight: 600 }}>{s.text}</span>
    </button>
  );
}
