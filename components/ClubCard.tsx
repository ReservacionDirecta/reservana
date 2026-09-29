
export default function ClubCard({ club }: { club: { id: string; name: string; location: string; areasCount: number } }) {
  return (
    <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1rem', minHeight: '160px', display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
      <h3 style={{ color: 'var(--blue)', fontSize: '1.1rem', margin: 0 }}>{club.name}</h3>
      <p style={{ color: 'var(--muted)', fontSize: '.85rem', margin: 0 }}>{club.location}</p>
      <p style={{ color: 'var(--fg)', fontSize: '.9rem', margin: '.25rem 0 0' }}>{club.areasCount} áreas disponibles</p>
      <span style={{ fontSize: '.75rem', color: 'var(--gold)', fontWeight: 700, marginTop: '.5rem' }}>Ver mapa →</span>
    </div>
  );
}
