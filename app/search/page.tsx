
'use client';
import { useState } from 'react';
import AreaCard from '../components/AreaCard';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results] = useState([
    { id: 1, clubId: 'club-01', type: '2', meta: { vista_mar: true, sombra: false }, coordenadas: 'A-1', name: 'Club Sol Norte' },
    { id: 2, clubId: 'club-02', type: '4', meta: { vista_mar: false, sombra: true }, coordenadas: 'B-1', name: 'Playa Arena' },
  ]);
  const filtered = results.filter(r => r.name.toLowerCase().includes(query.toLowerCase()) || String(r.type).includes(query));
  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1rem', background: 'var(--bg)', color: 'var(--fg)' }}>
      <h1 style={{ color: 'var(--red)', fontSize: '2rem', marginBottom: '.25rem' }}>Buscar clubes</h1>
      <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>Encuentra clubs en Margarita. Filtros por tipo, sombra y vista al mar.</p>
      <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar por nombre o tipo..." style={{ width: '100%', padding: '.75rem 1rem', borderRadius: '.75rem', border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--fg)', fontSize: '1rem', marginBottom: '1.5rem', boxSizing: 'border-box', minHeight: '56px' }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {filtered.map((r: any) => (
          <a key={r.id} href={`/club/${r.clubId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1rem', minHeight: '160px', display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
              <h3 style={{ color: 'var(--blue)', fontSize: '1.1rem', margin: 0 }}>{r.name}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '.85rem', margin: 0 }}>Tipo: {r.type === '2' ? '2 personas' : r.type === '4' ? '4 personas' : '6-12 personas'}</p>
              <p style={{ color: 'var(--muted)', fontSize: '.85rem', margin: 0 }}>{r.meta?.vista_mar ? 'Vista al mar' : 'Lateral'} · {r.meta?.sombra ? 'Sombra' : 'Sol'}</p>
              <span style={{ fontSize: '.75rem', color: 'var(--gold)', fontWeight: 700, marginTop: '.5rem' }}>Ver mapa y reservar →</span>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
