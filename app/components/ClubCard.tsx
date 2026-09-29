interface Club {
  nombre: string;
  imagen?: string;
  ubicacion: string;
  areasDisponibles: string[];
  precioPromedio: number;
}

interface Props {
  club: Club;
  onVerMapa?: () => void;
}

export default function ClubCard({ club, onVerMapa }: Props) {
  return (
    <div
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: '1rem',
        padding: '1rem',
        minHeight: '120px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        boxShadow: '0 2px 8px var(--shadow)',
        transition: 'all .2s ease',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '80px',
          borderRadius: '0.5rem',
          overflow: 'hidden',
          background: club.imagen ? `url(${club.imagen}) center/cover no-repeat` : 'var(--bg)',
          border: '1px solid var(--border)',
        }}
      />
      <h3 style={{ margin: 0, fontWeight: 700, fontSize: '1rem', color: 'var(--fg)' }}>
        {club.nombre}
      </h3>
      <p style={{ margin: '0.25rem 0', fontSize: '0.85rem', color: 'var(--muted)' }}>
        {club.ubicacion}
      </p>
      <p style={{ margin: '0.25rem 0', fontSize: '0.85rem', color: 'var(--blue)' }}>
        Áreas: {club.areasDisponibles.join(', ')}
      </p>
      <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', fontWeight: 600, color: 'var(--gold)' }}>
        ${club.precioPromedio.toFixed(2)} prom.
      </p>
      <button
        onClick={onVerMapa}
        style={{
          marginTop: 'auto',
          padding: '0.5rem 1rem',
          borderRadius: '0.75rem',
          border: '1px solid var(--border)',
          background: 'var(--card)',
          color: 'var(--blue)',
          fontWeight: 600,
          fontSize: '0.85rem',
          cursor: 'pointer',
          boxShadow: '0 1px 4px var(--shadow)',
          transition: 'all .2s ease',
        }}
      >
        Ver mapa y reservar
      </button>
    </div>
  );
}
