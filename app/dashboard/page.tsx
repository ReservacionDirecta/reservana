
'use client';
import { useState, useEffect } from 'react';
export default function DashboardPage() {
  const [stats, setStats] = useState({ ocupacion: 72, reservas: 4, ocupadas: 12, libres: 6 });
  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1rem', background: 'var(--bg)', color: 'var(--fg)' }}>
      <h1 style={{ color: 'var(--blue)', fontSize: '2rem', marginBottom: '.5rem' }}>Panel Operativo — Club</h1>
      <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>Estado en vivo. Táctil.</p>
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1rem' }}>
          <h4 style={{ color: 'var(--red)', fontSize: '.9rem', marginBottom: '.25rem' }}>Ocupación</h4>
          <p style={{ fontSize: '2rem', fontWeight: 800 }}>{stats.ocupacion}%</p>
        </div>
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1rem' }}>
          <h4 style={{ color: 'var(--blue)', fontSize: '.9rem', marginBottom: '.25rem' }}>Reservas activas</h4>
          <p style={{ fontSize: '2rem', fontWeight: 800 }}>{stats.reservas}</p>
        </div>
      </div>
    </main>
  );
}
