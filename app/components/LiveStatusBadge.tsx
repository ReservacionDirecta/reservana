interface Stats {
  ocupacion: number;
  reservas: number;
  ocupadas: number;
  libres: number;
}

export default function LiveStatusBadge({ stats }: { stats: Stats }) {
  const { ocupacion, reservas, ocupadas, libres } = stats;
  const color = ocupacion >= 70 ? 'var(--red)' : ocupacion >= 40 ? 'var(--gold)' : 'var(--ok)';
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '.75rem',
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: '.75rem',
        padding: '.5rem .85rem',
        minHeight: '48px',
        fontSize: '.85rem',
        color: 'var(--text)',
      }}
      aria-label={`Ocupación ${ocupacion}%`}
    >
      <span style={{ fontWeight: 700, color }}>{ocupacion}%</span>
      <span style={{ color: 'var(--muted)', fontSize: '.75rem' }}>
        {reservas} reservas · {ocupadas} ocupadas · {libres} libres
      </span>
    </div>
  );
}
