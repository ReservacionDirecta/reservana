
'use client';
import { useState } from 'react';
export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  return (
    <main style={{ maxWidth: 700, margin: '0 auto', padding: '2rem 1rem', background: 'var(--bg)', color: 'var(--fg)', minHeight: '100vh' }}>
      <h1 style={{ color: 'var(--red)', fontSize: '2rem', marginBottom: '1rem' }}>Onboarding — 3 pasos</h1>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        {[1, 2, 3].map(n => (
          <div key={n} style={{ flex: 1, textAlign: 'center', padding: '1rem', borderRadius: '1rem', border: step === n ? '2px solid var(--blue)' : '1px solid var(--border)', background: step === n ? 'var(--surface)' : 'var(--card)' }}>
            <span style={{ fontSize: '2rem', fontWeight: 800, color: step === n ? 'var(--blue)' : 'var(--muted)' }}>{n}</span>
            <p style={{ fontSize: '.75rem', color: 'var(--muted)', marginTop: '.25rem' }}>
              {n === 1 ? 'Cuenta' : n === 2 ? 'Club + Mapa' : 'QR + Activar'}
            </p>
          </div>
        ))}
      </div>
      {step === 1 && (
        <section style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.5rem' }}>
          <h3 style={{ color: 'var(--blue)', marginBottom: '1rem' }}>Paso 1 — Crea tu cuenta</h3>
          <p style={{ color: 'var(--fg)', fontSize: '1rem', lineHeight: 1.6 }}>
            Regístrate con tu correo electrónico y número de WhatsApp. No necesitas tarjeta de crédito ni contrato. Solo tu nombre y el nombre del club.
          </p>
          <button onClick={() => setStep(2)} style={{ marginTop: '1.5rem', padding: '1rem 2rem', borderRadius: '.75rem', border: 'none', background: 'var(--blue)', color: '#fff', fontSize: '1.05rem', fontWeight: 800, cursor: 'pointer', minHeight: '56px' }}>Continuar al paso 2 →</button>
        </section>
      )}
      {step === 2 && (
        <section style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.5rem' }}>
          <h3 style={{ color: 'var(--red)', marginBottom: '1rem' }}>Paso 2 — Sube foto del club y configura el mapa</h3>
          <p style={{ color: 'var(--fg)', fontSize: '1rem', lineHeight: 1.6 }}>
            Carga una foto del club (opcional) y dibuja las áreas en el mapa: marca dónde están las sombrillas de 2, 4 o 6-12 personas, indica si tienen sombra y si están frente al mar. Esto toma menos de 5 minutos.
          </p>
          <button onClick={() => setStep(3)} style={{ marginTop: '1.5rem', padding: '1rem 2rem', borderRadius: '.75rem', border: 'none', background: 'var(--red)', color: '#fff', fontSize: '1.05rem', fontWeight: 800, cursor: 'pointer', minHeight: '56px' }}>Continuar al paso 3 →</button>
        </section>
      )}
      {step === 3 && (
        <section style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.5rem' }}>
          <h3 style={{ color: 'var(--gold)', marginBottom: '1rem' }}>Paso 3 — Imprime códigos QR y activa reservas</h3>
          <p style={{ color: 'var(--fg)', fontSize: '1rem', lineHeight: 1.6 }}>
            Una vez configurado el mapa, el sistema genera automáticamente códigos QR para cada área. Imprime los códigos (o guárdalos en tu teléfono) y pégalos en las sombrillas correspondientes. Activa las reservas para empezar a recibir huéspedes inmediatamente.
          </p>
          <p style={{ color: 'var(--muted)', fontSize: '.85rem', marginTop: '1rem' }}><strong>Primer mes gratis</strong> para los primeros 5 clubs piloto en Margarita.</p>
          <button style={{ marginTop: '1.5rem', padding: '1rem 2rem', borderRadius: '.75rem', border: 'none', background: 'var(--gold)', color: '#111', fontSize: '1.05rem', fontWeight: 800, cursor: 'pointer', minHeight: '56px', boxShadow: '0 4px 12px rgba(234,179,8,0.25)' }} aria-label="Activar reservas">Activar reservas</button>
        </section>
      )}
    </main>
  );
}
