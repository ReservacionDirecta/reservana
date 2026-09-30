
'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function BottomNav() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: '/', label: 'Inicio' },
    { href: '/search', label: 'Buscar' },
    { href: '/club/club-01', label: 'Club' },
    { href: '/dashboard', label: 'Operativo' },
    { href: '/admin', label: 'Admin' },
  ];
  return (
    <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100, background: 'var(--card)', borderTop: '1px solid var(--border)', boxShadow: '0 -4px 16px var(--shadow)', display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '.5rem 0', minHeight: '72px' }} aria-label="Navegación principal">
      {links.map(link => (
        <Link key={link.href} href={link.href} style={{ color: 'var(--fg)', textDecoration: 'none', fontSize: '.85rem', fontWeight: 600, padding: '.5rem .75rem', borderRadius: '.5rem', minHeight: '48px', display: 'flex', alignItems: 'center', gap: '.25rem' }} aria-label={link.label}>
          <span>{link.label}</span>
        </Link>
      ))}
      <button onClick={() => setOpen(!open)} style={{ background: 'var(--gold)', border: 'none', borderRadius: '.5rem', padding: '.5rem .75rem', fontWeight: 700, color: '#111', cursor: 'pointer', minHeight: '48px', fontSize: '.85rem' }} aria-label="Ver más">
        {open ? '▼' : '▲'}
      </button>
      {open && (
        <div style={{ position: 'absolute', bottom: '72px', left: 0, right: 0, background: 'var(--surface)', borderTop: '1px solid var(--border)', padding: '1rem', borderRadius: '1rem 1rem 0 0', boxShadow: '0 -2px 10px var(--shadow)' }}>
          <Link href="/onboarding" style={{ display: 'block', color: 'var(--fg)', textDecoration: 'none', fontSize: '.95rem', padding: '.75rem', borderBottom: '1px solid var(--border)' }}>Onboarding</Link>
          <Link href="#" style={{ display: 'block', color: 'var(--muted)', fontSize: '.85rem', padding: '.5rem .75rem' }}>Configuración del club</Link>
        </div>
      )}
    </nav>
  );
}
