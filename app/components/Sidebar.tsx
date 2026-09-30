
'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: collapsed ? '72px' : '240px', background: 'var(--surface)', borderRight: '1px solid var(--border)', zIndex: 90, transition: 'width .3s ease', overflow: 'hidden', padding: '1rem .5rem' }} aria-label="Sidebar">
      <button onClick={() => setCollapsed(!collapsed)} aria-label={collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'} style={{ background: 'transparent', border: 'none', color: 'var(--fg)', cursor: 'pointer', fontSize: '1.2rem', marginBottom: '1rem', minHeight: '48px', padding: '.25rem .5rem', borderRadius: '.5rem', fontWeight: 700 }}>{collapsed ? '→' : '←'}</button>
      {!collapsed && (
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }} aria-label="Navegación del club">
          <Link href="/" style={{ color: 'var(--fg)', textDecoration: 'none', fontSize: '.9rem', fontWeight: 600, padding: '.5rem .75rem', borderRadius: '.5rem', background: 'var(--card)', border: '1px solid var(--border)', minHeight: '48px', display: 'flex', alignItems: 'center', transition: 'background .15s ease' }} aria-label="Inicio">🏠 Inicio</Link>
          <Link href="/search" style={{ color: 'var(--fg)', textDecoration: 'none', fontSize: '.9rem', fontWeight: 600, padding: '.5rem .75rem', borderRadius: '.5rem', background: 'var(--card)', border: '1px solid var(--border)', minHeight: '48px', display: 'flex', alignItems: 'center', transition: 'background .15s ease' }} aria-label="Buscar clubes">🔍 Buscar</Link>
          <Link href="/club/club-01" style={{ color: 'var(--fg)', textDecoration: 'none', fontSize: '.9rem', fontWeight: 600, padding: '.5rem .75rem', borderRadius: '.5rem', background: 'var(--card)', border: '1px solid var(--border)', minHeight: '48px', display: 'flex', alignItems: 'center', transition: 'background .15s ease' }} aria-label="Club">🏖️ Club</Link>
          <Link href="/dashboard" style={{ color: 'var(--fg)', textDecoration: 'none', fontSize: '.9rem', fontWeight: 600, padding: '.5rem .75rem', borderRadius: '.5rem', background: 'var(--card)', border: '1px solid var(--border)', minHeight: '48px', display: 'flex', alignItems: 'center', transition: 'background .15s ease' }} aria-label="Panel operativo">📊 Operativo</Link>
          <Link href="/admin" style={{ color: 'var(--fg)', textDecoration: 'none', fontSize: '.9rem', fontWeight: 600, padding: '.5rem .75rem', borderRadius: '.5rem', background: 'var(--card)', border: '1px solid var(--border)', minHeight: '48px', display: 'flex', alignItems: 'center', transition: 'background .15s ease' }} aria-label="Panel del propietario">⚙️ Admin</Link>
          <Link href="/onboarding" style={{ color: 'var(--fg)', textDecoration: 'none', fontSize: '.9rem', fontWeight: 600, padding: '.5rem .75rem', borderRadius: '.5rem', background: 'var(--card)', border: '1px solid var(--border)', minHeight: '48px', display: 'flex', alignItems: 'center', transition: 'background .15s ease' }} aria-label="Onboarding">🚀 Onboarding</Link>
        </nav>
      )}
    </aside>
  );
}
