
'use client';
import { useState } from 'react';
export default function AdminPage() {
  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1rem', background: 'var(--bg)', color: 'var(--fg)' }}>
      <h1 style={{ color: 'var(--red)', fontSize: '2rem', marginBottom: '.5rem' }}>Panel del Propietario — Club</h1>
      <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>Configuración, estadísticas y gestión del club.</p>
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1rem' }}>
          <h4 style={{ color: 'var(--blue)', fontSize: '.9rem', marginBottom: '.25rem' }}>Ocupación mensual</h4>
          <p style={{ fontSize: '2rem', fontWeight: 800 }}>72%</p>
        </div>
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1rem' }}>
          <h4 style={{ color: 'var(--gold)', fontSize: '.9rem', marginBottom: '.25rem' }}>Ingreso mensual</h4>
          <p style={{ fontSize: '2rem', fontWeight: 800 }}>$148</p>
        </div>
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1rem' }}>
          <h4 style={{ color: 'var(--red)', fontSize: '.9rem', marginBottom: '.25rem' }}>Reservas canceladas</h4>
          <p style={{ fontSize: '2rem', fontWeight: 800 }}>2</p>
        </div>
      </div>
      <section style={{ marginTop: '2rem', padding: '1rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '1rem', borderLeft: '4px solid var(--red)' }}>
        <h3 style={{ color: 'var(--red)' }}>Configuración del club</h3>
        <p><strong>Nombre:</strong> Playa Sol — Margarita</p>
        <p><strong>Ubicación:</strong> Playa Norte, Isla Margarita, Venezuela</p>
        <p><strong>Plan:</strong> Pro ($85/mes) — Anual con 20% de descuento aplicado.</p>
        <p><strong>Onboarding:</strong> completado. 5 clubs piloto activados. Primer mes gratis aplicado.</p>
      </section>
    </main>
  );
}
