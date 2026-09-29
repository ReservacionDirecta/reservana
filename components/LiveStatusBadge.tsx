
'use client';
export default function LiveStatusBadge({ stats }: { stats: { ocupacion: number; reservas: number; ocupadas: number; libres: number } }) {
  const color = stats.ocupacion > 80 ? 'var(--red)' : stats.ocupacion > 50 ? 'var(--gold)' : 'var(--ok)';
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', padding: '.4rem .75rem', borderRadius: '1rem', background: 'var(--card)', border: '1px solid var(--border)', minHeight: '48px' }}>
      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: color }} />
      <span style={{ fontWeight: 700, color: 'var(--fg)', fontSize: '.9rem' }}>{stats.ocupacion}% — {stats.reservas} reservas</span>
    </div>
  );
}
