
'use client';
export default function ClubPage({ params }: { params: any }) {
  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1rem', background: 'var(--bg)', color: 'var(--fg)' }}>
      <h1 style={{ color: 'var(--red)', fontSize: '2rem', marginBottom: '.25rem' }}>Club — {params.id}</h1>
      <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>Detalle del club seleccionado.</p>
      <section style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.25rem' }}>
        <h2 style={{ color: 'var(--blue)', fontSize: '1.05rem', marginBottom: '.75rem', borderLeft: '3px solid var(--blue)', paddingLeft: '.6rem' }}>Mapa</h2>
        <p style={{ color: 'var(--muted)', fontSize: '.85rem' }}>Mapa interactivo del club (simulado). Áreas disponibles.</p>
      </section>
    </main>
  );
}
