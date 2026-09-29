import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1 style={{ color: '#dc2626', fontSize: '2rem', marginBottom: '.25rem' }}>Reservana</h1>
      <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>Clubes de playa — Mapa, reservas, QR y consumo.</p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <a href="/wireframe.html" style={{ padding: '.55rem 1rem', borderRadius: '.5rem', background: '#2563eb', color: '#fff', textDecoration: 'none' }}>Ver prototipo interactivo</a>
        <Link href="#" style={{ padding: '.55rem 1rem', borderRadius: '.5rem', border: '1px solid #2563eb', color: '#2563eb', textDecoration: 'none' }}>Panel del club</Link>
      </div>
      <section style={{ marginTop: '3rem', borderTop: '1px solid #1f1f1f', paddingTop: '1.5rem' }}>
        <h2 style={{ color: '#2563eb' }}>Estado de despliegue</h2>
        <ul style={{ color: '#9ca3af', fontSize: '.9rem', paddingLeft: '1rem' }}>
          <li>Railway: configurado (railway.json)</li>
          <li>GitHub Actions: deploy automático (main branch)</li>
          <li>Docker: multi-stage (builder + runner, alpine)</li>
          <li>Optimizado: `output: standalone`, `images.unoptimized`, `.dockerignore`</li>
        </ul>
      </section>
    </main>
  );
}
