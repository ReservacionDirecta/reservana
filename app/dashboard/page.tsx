'use client';

import { useState, useMemo } from 'react';

// Datos actuales del club (extraídos del proyecto)
interface BeachArea {
  id: number;
  clubId: string;
  type: '2' | '4' | '6-12';
  meta: { vista_mar: boolean; sombra: boolean };
  coordenadas: string;
}

interface Reservation {
  id: string;
  name: string;
  areaId: number;
  areaName: string;
  hora_inicio: string;
  estado: 'libre' | 'reservada' | 'ocupada' | 'consumiendo';
}

interface ConsumptionItem {
  id: number;
  producto: string;
  cantidad: number;
  precio: number;
  pagado: boolean;
}

const AREAS: BeachArea[] = [
  { id: 1, clubId: 'club-01', type: '2', meta: { vista_mar: true, sombra: false }, coordenadas: 'A-1' },
  { id: 2, clubId: 'club-01', type: '4', meta: { vista_mar: true, sombra: true }, coordenadas: 'A-2' },
  { id: 3, clubId: 'club-01', type: '6-12', meta: { vista_mar: false, sombra: true }, coordenadas: 'A-3' },
  { id: 4, clubId: 'club-01', type: '2', meta: { vista_mar: true, sombra: true }, coordenadas: 'A-4' },
  { id: 5, clubId: 'club-01', type: '4', meta: { vista_mar: true, sombra: false }, coordenadas: 'A-5' },
  { id: 6, clubId: 'club-01', type: '4', meta: { vista_mar: false, sombra: true }, coordenadas: 'A-6' },
  { id: 7, clubId: 'club-01', type: '6-12', meta: { vista_mar: true, sombra: false }, coordenadas: 'A-7' },
  { id: 8, clubId: 'club-01', type: '2', meta: { vista_mar: true, sombra: true }, coordenadas: 'A-8' },
];

const INITIAL_RESERVATIONS: Reservation[] = [
  { id: 'res-001', name: 'Familia Ramírez', areaId: 1, areaName: 'A-1 (2 pers.)', hora_inicio: '14:00', estado: 'ocupada' },
  { id: 'res-002', name: 'Carlos M.', areaId: 3, areaName: 'A-3 (6-12 pers.)', hora_inicio: '15:30', estado: 'consumiendo' },
  { id: 'res-003', name: 'Grupo Playa Norte', areaId: 5, areaName: 'A-5 (4 pers.)', hora_inicio: '16:00', estado: 'reservada' },
  { id: 'res-004', name: 'Ana & Pedro', areaId: 7, areaName: 'A-7 (6-12 pers.)', hora_inicio: '13:00', estado: 'libre' },
];

const INITIAL_CONSUMPTION: Record<string, ConsumptionItem[]> = {
  'res-002': [
    { id: 101, producto: 'Cerveza', cantidad: 2, precio: 3.5, pagado: false },
    { id: 102, producto: 'Plato playa', cantidad: 1, precio: 12, pagado: false },
    { id: 103, producto: 'Agua', cantidad: 1, precio: 1, pagado: false },
  ],
  'res-001': [
    { id: 201, producto: 'Agua', cantidad: 2, precio: 1, pagado: false },
  ],
};

export default function DashboardPage() {
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);
  const [consumption, setConsumption] = useState<Record<string, ConsumptionItem[]>>(INITIAL_CONSUMPTION);
  const [selectedResId, setSelectedResId] = useState<string | null>('res-002');

  const selectedRes = reservations.find((r) => r.id === selectedResId) || null;
  const selectedAreaId = selectedRes ? selectedRes.areaId : null;

  const statusColors = {
    libre: { label: 'Libre', color: 'var(--ok)', bg: '#e8f5e9' },
    reservada: { label: 'Reservada', color: 'var(--gold)', bg: '#fff8e1' },
    ocupada: { label: 'Ocupada', color: 'var(--red)', bg: '#ffebee' },
    consumiendo: { label: 'Consumiendo', color: 'var(--blue)', bg: '#e3f2fd' },
  } as const;

  const handleStatusChange = (resId: string, newStatus: 'libre' | 'reservada' | 'ocupada' | 'consumiendo') => {
    setReservations((prev) => prev.map((r) => (r.id === resId ? { ...r, estado: newStatus } : r)));
  };

  const handleCloseAccount = (resId: string) => {
    setReservations((prev) => prev.map((r) => (r.id === resId ? { ...r, estado: 'libre' } : r)));
    // Al cerrar cuenta, se libera el área y se mantiene el registro de consumo (no se borra para historial)
  };

  const selectedConsumption = selectedResId ? consumption[selectedResId] || [] : [];
  const total = selectedConsumption.reduce((sum, c) => sum + c.cantidad * c.precio, 0);

  const ocupacionCount = reservations.filter((r) => r.estado === 'ocupada' || r.estado === 'consumiendo').length;
  const totalAreas = AREAS.length;
  const ocupacionPct = Math.round((ocupacionCount / totalAreas) * 100);

  return (
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1rem', background: 'var(--bg)', color: 'var(--fg)', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', fontSize: '1.05rem', lineHeight: 1.5 }}>
      {/* Cabecera */}
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--blue)', fontSize: '2.2rem', fontWeight: 800, marginBottom: '.25rem', letterSpacing: '-0.02em' }}>
          Panel Operativo — Recepción / Mozo
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem' }}>
          Estado en vivo. Táctil. <span style={{ fontWeight: 700, color: 'var(--red)' }}>{ocupacionPct}% ocupación</span> — {reservations.length} reservas hoy.
        </p>
      </header>

      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', marginBottom: '2rem' }}>
        <article style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.25rem', boxShadow: '0 2px 10px var(--shadow)' }}>
          <h3 style={{ color: 'var(--red)', fontSize: '1rem', marginBottom: '.25rem', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
            📋 Reservas del día
          </h3>
          <p style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--fg)', margin: '.25rem 0 .75rem' }}>{reservations.length}</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
            {reservations.map((r) => {
              const s = statusColors[r.estado];
              return (
                <li key={r.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '.5rem .75rem', borderRadius: '.75rem', background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div>
                    <button
                      onClick={() => setSelectedResId(r.id)}
                      style={{
                        background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', width: '100%',
                      }}
                      aria-label={`Seleccionar ${r.name}`}
                    >
                      <span style={{ fontWeight: 700, color: 'var(--fg)', fontSize: '1rem', display: 'block' }}>{r.name}</span>
                      <span style={{ color: 'var(--muted)', fontSize: '.85rem', display: 'block' }}>{r.areaName}</span>
                      <span style={{ color: 'var(--muted)', fontSize: '.8rem', display: 'block' }}>{r.hora_inicio} — {s.label}</span>
                    </button>
                  </div>
                  <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', background: s.color, flexShrink: 0 }} aria-hidden />
                </li>
              );
            })}
          </ul>
        </article>

        <article style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.25rem', boxShadow: '0 2px 10px var(--shadow)' }}>
          <h3 style={{ color: 'var(--blue)', fontSize: '1rem', marginBottom: '.25rem', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
            🌊 Ocupación en vivo
          </h3>
          <p style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--fg)', margin: '.25rem 0 .5rem' }}>{ocupacionPct}%</p>
          <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginBottom: '.5rem' }}>
            <span style={{ fontSize: '.85rem', color: 'var(--muted)' }}>Ocupadas: <b style={{ color: 'var(--red)' }}>{reservations.filter((r) => r.estado === 'ocupada' || r.estado === 'consumiendo').length}</b></span>
            <span style={{ fontSize: '.85rem', color: 'var(--muted)' }}>Libres: <b style={{ color: 'var(--ok)' }}>{totalAreas - (reservations.filter((r) => r.estado === 'ocupada' || r.estado === 'consumiendo').length)}</b></span>
          </div>
          <div style={{ height: '8px', borderRadius: '4px', background: 'var(--surface)', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <div style={{ width: `${ocupacionPct}%`, height: '100%', background: ocupacionPct > 80 ? 'var(--red)' : ocupacionPct > 50 ? 'var(--gold)' : 'var(--blue)', transition: 'width .3s ease' }} />
          </div>
        </article>
      </div>

      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr', marginBottom: '2rem' }}>
        {/* Mapa en vivo */}
        <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.25rem', boxShadow: '0 2px 10px var(--shadow)' }}>
          <h2 style={{ color: 'var(--blue)', fontSize: '1.15rem', marginBottom: '.5rem', borderLeft: '3px solid var(--blue)', paddingLeft: '.6rem' }}>Mapa en vivo</h2>
          <p style={{ color: 'var(--muted)', fontSize: '.9rem', marginBottom: '1rem' }}>
            Áreas disponibles y ocupadas. Toca un área para ver detalles.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '.75rem' }}>
            {AREAS.map((area) => {
              const areaRes = reservations.find((r) => r.areaId === area.id);
              const estado = areaRes ? areaRes.estado : 'libre';
              const s = statusColors[estado];
              return (
                <button
                  key={area.id}
                  onClick={() => {
                    const res = reservations.find((r) => r.areaId === area.id);
                    if (res) setSelectedResId(res.id);
                    else setSelectedResId(null);
                  }}
                  style={{
                    minHeight: '120px',
                    borderRadius: '.75rem',
                    border: selectedAreaId === area.id ? '2px solid var(--gold)' : '1px solid var(--border)',
                    background: s.bg,
                    color: 'var(--fg)',
                    padding: '.75rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'transform .1s ease',
                  }}
                  aria-label={`Área A-${area.id} — ${s.label}`}
                >
                  <span style={{ display: 'block', fontWeight: 800, fontSize: '1.1rem', marginBottom: '.25rem' }}>A-{area.id}</span>
                  <span style={{ display: 'block', fontSize: '.7rem', color: 'var(--muted)', marginBottom: '.25rem' }}>
                    {area.type === '2' ? '2 pers.' : area.type === '4' ? '4 pers.' : '6-12 pers.'}
                  </span>
                  <span style={{ display: 'inline-block', padding: '.2rem .5rem', borderRadius: '.5rem', background: s.color, color: '#fff', fontSize: '.75rem', fontWeight: 700 }}>
                    {s.label}
                  </span>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '.25rem', marginTop: '.5rem' }}>
                    <span title="Vista al mar" style={{ width: '8px', height: '8px', borderRadius: '50%', background: area.meta.vista_mar ? 'var(--blue)' : 'var(--muted)', display: 'inline-block' }} />
                    <span title="Sombra" style={{ width: '8px', height: '8px', borderRadius: '50%', background: area.meta.sombra ? 'var(--gold)' : 'var(--muted)', display: 'inline-block' }} />
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Consumo por reserva */}
        <section style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.25rem', boxShadow: '0 2px 10px var(--shadow)' }}>
          <h2 style={{ color: 'var(--red)', fontSize: '1.15rem', marginBottom: '.5rem', borderLeft: '3px solid var(--red)', paddingLeft: '.6rem' }}>Consumo por reserva</h2>

          {selectedRes ? (
            <>
              <div style={{ marginBottom: '.75rem' }}>
                <p style={{ fontWeight: 800, color: 'var(--fg)', fontSize: '1.1rem', margin: '0 0 .25rem' }}>{selectedRes.name}</p>
                <p style={{ color: 'var(--muted)', fontSize: '.9rem' }}>
                  Área <b style={{ color: 'var(--fg)' }}>{selectedRes.areaName}</b> · Inicio {selectedRes.hora_inicio} · Estado <b style={{ color: statusColors[selectedRes.estado].color }}>{statusColors[selectedRes.estado].label}</b>
                </p>
              </div>

              {selectedConsumption.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem', display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
                  {selectedConsumption.map((item) => (
                    <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '.5rem .75rem', borderRadius: '.5rem', background: 'var(--surface)', border: '1px solid var(--border)' }}>
                      <span style={{ fontWeight: 600, color: 'var(--fg)', fontSize: '.95rem' }}>{item.producto}</span>
                      <span style={{ color: 'var(--muted)', fontSize: '.85rem' }}>
                        {item.cantidad} × ${item.precio}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: 'var(--muted)', fontSize: '.85rem', margin: '.5rem 0 1rem' }}>No hay consumos registrados para esta reserva.</p>
              )}

              <div style={{ padding: '.75rem', borderRadius: '.75rem', background: 'var(--surface)', border: '1px solid var(--border)', marginBottom: '1rem' }}>
                <span style={{ fontWeight: 700, color: 'var(--fg)', fontSize: '1rem' }}>Total consumo:</span>
                <span style={{ float: 'right', fontWeight: 800, color: 'var(--red)', fontSize: '1.2rem' }}>${total.toFixed(2)}</span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.75rem', marginBottom: '1rem' }}>
                {(['Cerveza', 'Agua', 'Plato playa'] as const).map((prod) => (
                  <button
                    key={prod}
                    onClick={() => {
                      setConsumption((prev) => {
                        const existing = prev[selectedResId!] || [];
                        return {
                          ...prev,
                          [selectedResId!]: [
                            ...existing,
                            {
                              id: Date.now(),
                              producto: prod,
                              cantidad: 1,
                              precio: prod === 'Cerveza' ? 3.5 : prod === 'Plato playa' ? 12 : 1,
                              pagado: false,
                            },
                          ],
                        };
                      });
                    }}
                    style={{
                      minHeight: '56px',
                      padding: '.75rem 1.25rem',
                      borderRadius: '.75rem',
                      border: '1px solid var(--blue)',
                      background: 'var(--card)',
                      color: 'var(--blue)',
                      fontSize: '.95rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all .15s ease',
                    }}
                    aria-label={`Agregar ${prod}`}
                  >
                    + {prod}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.75rem' }}>
                {(
                  [
                    { label: 'Ocupada', status: 'ocupada' as const },
                    { label: 'Libre', status: 'libre' as const },
                    { label: 'Consumiendo', status: 'consumiendo' as const },
                    { label: 'Reservada', status: 'reservada' as const },
                  ] as const
                ).map(({ label, status }) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(selectedResId, status)}
                    style={{
                      minHeight: '56px',
                      padding: '.75rem 1rem',
                      borderRadius: '.75rem',
                      border: `2px solid ${selectedRes.estado === status ? 'var(--gold)' : 'var(--border)'}`,
                      background: selectedRes.estado === status ? 'var(--gold)' : 'var(--card)',
                      color: selectedRes.estado === status ? '#111' : 'var(--fg)',
                      fontSize: '1rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                    aria-label={`Marcar como ${label}`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handleCloseAccount(selectedResId)}
                style={{
                  marginTop: '1rem',
                  width: '100%',
                  minHeight: '56px',
                  padding: '.75rem',
                  borderRadius: '.75rem',
                  border: 'none',
                  background: 'var(--red)',
                  color: '#fff',
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(195,65,12,0.25)',
                  transition: 'all .2s ease',
                }}
                aria-label="Cerrar cuenta y liberar área"
              >
                💰
                Cerrar cuenta — ${total.toFixed(2)}
              </button>
            </>
          ) : (
            <p style={{ color: 'var(--muted)', fontSize: '.9rem' }}>Selecciona una reserva del panel para ver su consumo.</p>
          )}
        </section>
      </div>
    </main>
  );
}
