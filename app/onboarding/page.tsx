'use client';

import { useState } from 'react';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [mapConfigured, setMapConfigured] = useState(false);
  const [qrPrinted, setQrPrinted] = useState(false);
  const [reservationsActive, setReservationsActive] = useState(false);

  const steps = [
    {
      num: 1,
      title: 'Crear tu cuenta',
      color: 'var(--blue)',
      description: 'Registra los datos básicos del club para empezar a gestionar tus reservas.',
      items: [
        'Nombre del club',
        'Nombre del administrador',
        'Correo electrónico',
        'Contraseña segura',
      ],
    },
    {
      num: 2,
      title: 'Foto del club + configurar mapa',
      color: 'var(--red)',
      description: 'Sube una foto representativa y define las áreas disponibles (sombrillas, mesas, zonas VIP).',
      items: [
        'Subir foto del club (recomendado)',
        'Agregar zonas con nombre y capacidad',
        'Indicar si tiene sombra o vista al mar',
        'Guardar la configuración del mapa',
      ],
    },
    {
      num: 3,
      title: 'Imprimir códigos QR + activar reservas',
      color: 'var(--gold)',
      description: 'Genera los códigos QR para cada área, imprímelos y activa las reservas para tus clientes.',
      items: [
        'Generar códigos QR automáticamente',
        'Imprimir los códigos para cada zona',
        'Colocar los QR en las mesas o sombrillas',
        'Activar reservas y empezar a recibir clientes',
      ],
    },
  ];

  const isStepComplete = (s: number) => {
    if (s === 1) return name.length > 0 && location.length > 0;
    if (s === 2) return photoUrl.length > 0 && mapConfigured;
    if (s === 3) return qrPrinted && reservationsActive;
    return false;
  };

  return (
    <main
      style={{
        maxWidth: 960,
        margin: '0 auto',
        padding: '2rem 1.25rem',
        minHeight: '100vh',
        background: 'var(--bg)',
        color: 'var(--fg)',
      }}
      aria-label="Flujo de onboarding para administradores"
    >
      <header style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1
          style={{
            fontSize: '2.2rem',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            marginBottom: '.5rem',
            color: 'var(--fg)',
          }}
        >
          Bienvenido a Reservana
        </h1>
        <p
          style={{
            color: 'var(--muted)',
            fontSize: '1.05rem',
            maxWidth: 520,
            margin: '0 auto',
          }}
        >
          Configura tu club en 3 pasos sencillos. No necesitas ser técnico — solo sigue las instrucciones.
        </p>
      </header>

      {/* Progreso de pasos */}
      <nav
        aria-label="Pasos del onboarding"
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1.25rem',
          marginBottom: '3rem',
          flexWrap: 'wrap',
        }}
      >
        {steps.map((s) => {
          const active = step === s.num;
          const complete = isStepComplete(s.num);
          return (
            <button
              key={s.num}
              onClick={() => setStep(s.num)}
              aria-label={`Paso ${s.num}: ${s.title}`}
              aria-current={active ? 'step' : false}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '.35rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                minHeight: 100,
                minWidth: 110,
                padding: '.5rem',
                borderRadius: '.75rem',
                transition: 'background .2s ease, transform .15s ease',
              }}
            >
              <span
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  color: complete ? '#fff' : (active ? '#fff' : 'var(--fg)'),
                  background: complete
                    ? s.color
                    : active
                      ? s.color
                      : 'var(--surface)',
                  border: `3px solid ${s.color}`,
                  boxShadow: active ? `0 6px 20px ${s.color}40` : 'none',
                  transition: 'all .25s ease',
                }}
              >
                {s.num}
              </span>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: '.85rem',
                  color: active ? s.color : (complete ? s.color : 'var(--muted)'),
                  textAlign: 'center',
                }}
              >
                {s.title}
              </span>
            </button>
          );
        })}
      </nav>

      <section
        aria-label={`Contenido del paso ${step}`}
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: '1.25rem',
          padding: '2rem 1.75rem',
          boxShadow: '0 4px 20px var(--shadow)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '1.25rem' }}>
          <span
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: steps[step - 1]?.color,
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              fontWeight: 800,
              flexShrink: 0,
            }}
            aria-hidden="true"
          >
            {step}
          </span>
          <div>
            <h2
              style={{
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--fg)',
                margin: 0,
                letterSpacing: '-.02em',
              }}
            >
              {steps[step - 1]?.title}
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '.9rem', margin: '.15rem 0 0 0' }}>
              {steps[step - 1]?.description}
            </p>
          </div>
        </div>

        {/* Paso 1: Cuenta */}
        {step === 1 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (name && location) setStep(2);
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            aria-label="Formulario paso 1"
          >
            <label htmlFor="onb-name" style={{ fontWeight: 600, fontSize: '.9rem' }}>
              Nombre del club
            </label>
            <input
              id="onb-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Club Playa Margarita"
              style={{
                padding: '.75rem 1rem',
                fontSize: '1rem',
                borderRadius: '.6rem',
                border: '1.5px solid var(--border)',
                background: 'var(--surface)',
                color: 'var(--fg)',
                outline: 'none',
                transition: 'border-color .2s ease',
                minHeight: 48,
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--blue)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
              aria-required="true"
            />

            <label htmlFor="onb-location" style={{ fontWeight: 600, fontSize: '.9rem' }}>
              Ubicación del club
            </label>
            <input
              id="onb-location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ej. Playa El Yaque, Margarita"
              style={{
                padding: '.75rem 1rem',
                fontSize: '1rem',
                borderRadius: '.6rem',
                border: '1.5px solid var(--border)',
                background: 'var(--surface)',
                color: 'var(--fg)',
                outline: 'none',
                transition: 'border-color .2s ease',
                minHeight: 48,
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--blue)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
              aria-required="true"
            />

            <button
              type="submit"
              disabled={!name || !location}
              style={{
                marginTop: '.5rem',
                padding: '.9rem 1.5rem',
                fontSize: '1rem',
                fontWeight: 700,
                borderRadius: '.75rem',
                border: 'none',
                background: 'var(--blue)',
                color: '#fff',
                cursor: (!name || !location) ? 'not-allowed' : 'pointer',
                opacity: (!name || !location) ? 0.5 : 1,
                minHeight: 56,
                boxShadow: '0 4px 14px var(--shadow)',
                transition: 'transform .15s ease, opacity .2s ease',
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
              onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              Continuar al paso 2
            </button>
          </form>
        )}

        {/* Paso 2: Foto + mapa */}
        {step === 2 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (photoUrl && mapConfigured) setStep(3);
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            aria-label="Formulario paso 2"
          >
            <label htmlFor="onb-photo" style={{ fontWeight: 600, fontSize: '.9rem' }}>
              Foto del club (opcional pero recomendada)
            </label>
            <input
              id="onb-photo"
              type="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="https://ejemplo.com/foto-club.jpg"
              style={{
                padding: '.75rem 1rem',
                fontSize: '1rem',
                borderRadius: '.6rem',
                border: '1.5px solid var(--border)',
                background: 'var(--surface)',
                color: 'var(--fg)',
                outline: 'none',
                transition: 'border-color .2s ease',
                minHeight: 48,
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--red)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
            />

            <div
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '.75rem',
                padding: '1rem',
              }}
            >
              <p style={{ fontWeight: 600, marginBottom: '.5rem', fontSize: '.9rem' }}>
                Configurar mapa del club
              </p>
              <ul style={{ color: 'var(--muted)', fontSize: '.85rem', lineHeight: 1.6, paddingLeft: '1.1rem', margin: '.5rem 0' }}>
                <li>Define las áreas disponibles (ej. sombreadas, con vista al mar).</li>
                <li>Asigna nombre y capacidad a cada zona.</li>
                <li>Marca las zonas con sombra o sin sombra.</li>
              </ul>
              <label style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginTop: '.75rem', fontWeight: 600, fontSize: '.85rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={mapConfigured}
                  onChange={(e) => setMapConfigured(e.target.checked)}
                  style={{ width: 20, height: 20, accentColor: 'var(--red)' }}
                  aria-required="true"
                />
                <span>He configurado el mapa del club</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={!photoUrl || !mapConfigured}
              style={{
                marginTop: '.5rem',
                padding: '.9rem 1.5rem',
                fontSize: '1rem',
                fontWeight: 700,
                borderRadius: '.75rem',
                border: 'none',
                background: 'var(--red)',
                color: '#fff',
                cursor: (!photoUrl || !mapConfigured) ? 'not-allowed' : 'pointer',
                opacity: (!photoUrl || !mapConfigured) ? 0.5 : 1,
                minHeight: 56,
                boxShadow: '0 4px 14px var(--shadow)',
                transition: 'transform .15s ease, opacity .2s ease',
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
              onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              Continuar al paso 3
            </button>
          </form>
        )}

        {/* Paso 3: QR + activar reservas */}
        {step === 3 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (qrPrinted && reservationsActive) {
                alert('¡Onboarding completado! Tu club está listo para recibir reservas.');
              }
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            aria-label="Formulario paso 3"
          >
            <p style={{ color: 'var(--muted)', fontSize: '.9rem', lineHeight: 1.6 }}>
              Una vez generado el mapa, los códigos QR se crean automáticamente para cada zona configurada. Puedes imprimirlos directamente desde esta pantalla.
            </p>

            <div
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '.75rem',
                padding: '1rem',
              }}
            >
              <p style={{ fontWeight: 600, marginBottom: '.5rem', fontSize: '.9rem' }}>
                Activar reservas y códigos QR
              </p>
              <ul style={{ color: 'var(--muted)', fontSize: '.85rem', lineHeight: 1.6, paddingLeft: '1.1rem', margin: '.5rem 0' }}>
                <li>Imprime los códigos QR para colocarlos en las áreas del club.</li>
                <li>Cada cliente escaneará su código para reservar y consumir.</li>
                <li>Activa las reservas para que tu club aparezca en el buscador.</li>
              </ul>

              <label style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginTop: '.75rem', fontWeight: 600, fontSize: '.85rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={qrPrinted}
                  onChange={(e) => setQrPrinted(e.target.checked)}
                  style={{ width: 20, height: 20, accentColor: 'var(--gold)' }}
                  aria-required="true"
                />
                <span>He impreso los códigos QR</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginTop: '.5rem', fontWeight: 600, fontSize: '.85rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={reservationsActive}
                  onChange={(e) => setReservationsActive(e.target.checked)}
                  style={{ width: 20, height: 20, accentColor: 'var(--gold)' }}
                  aria-required="true"
                />
                <span>He activado las reservas del club</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={!qrPrinted || !reservationsActive}
              style={{
                marginTop: '.5rem',
                padding: '.9rem 1.5rem',
                fontSize: '1rem',
                fontWeight: 700,
                borderRadius: '.75rem',
                border: 'none',
                background: 'var(--gold)',
                color: '#fff',
                cursor: (!qrPrinted || !reservationsActive) ? 'not-allowed' : 'pointer',
                opacity: (!qrPrinted || !reservationsActive) ? 0.5 : 1,
                minHeight: 56,
                boxShadow: '0 4px 14px var(--shadow)',
                transition: 'transform .15s ease, opacity .2s ease',
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
              onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              Finalizar onboarding
            </button>
          </form>
        )}
      </section>

      {/* Resumen visual de pasos */}
      <section
        aria-label="Resumen de pasos"
        style={{
          marginTop: '2.5rem',
          display: 'grid',
          gap: '.75rem',
        }}
      >
        {steps.map((s) => {
          const complete = isStepComplete(s.num);
          return (
            <div
              key={s.num}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                background: 'var(--card)',
                border: `2px solid ${complete ? s.color : 'var(--border)'}`,
                borderRadius: '.75rem',
                padding: '.75rem 1rem',
                opacity: complete ? 1 : 0.7,
                transition: 'opacity .2s ease, border-color .3s ease',
                minHeight: 56,
              }}
            >
              <span
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: s.color,
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '.9rem',
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                {s.num}
              </span>
              <div>
                <h3
                  style={{
                    fontSize: '.95rem',
                    fontWeight: 700,
                    color: complete ? s.color : 'var(--fg)',
                    margin: 0,
                    marginBottom: '.15rem',
                  }}
                >
                  {s.title}
                </h3>
                <ul style={{ paddingLeft: '1rem', margin: '.25rem 0 0 0', color: 'var(--muted)', fontSize: '.8rem', lineHeight: 1.5 }}>
                  {s.items.map((item, i) => (
                    <li key={i}>
                      <span style={{ color: complete ? s.color : 'inherit' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </section>

      <footer
        style={{
          marginTop: '2.5rem',
          textAlign: 'center',
          color: 'var(--muted)',
          fontSize: '.8rem',
        }}
      >
        Reservana — Flujo guiado para administradores. Sin código, accesible para todos.
      </footer>
    </main>
  );
}
