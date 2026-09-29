'use client';

import { useState } from 'react';
import { BeachArea } from '../models/beach';

export default function AdminPanel() {
  // Configuración del club
  const [clubName, setClubName] = useState('Club Playa Reservana');
  const [location, setLocation] = useState('Playa El Yaque, Isla de Margarita');
  const [hours, setHours] = useState('09:00 - 18:00');

  // Zonas (BeachArea actuales)
  const [areas, setAreas] = useState<BeachArea[]>([
    { id: 1, clubId: 'club-01', type: '2', meta: { vista_mar: true, sombra: false }, coordenadas: 'A-1' },
    { id: 2, clubId: 'club-01', type: '4', meta: { vista_mar: true, sombra: true }, coordenadas: 'A-2' },
    { id: 3, clubId: 'club-01', type: '6-12', meta: { vista_mar: false, sombra: true }, coordenadas: 'A-3' },
    { id: 4, clubId: 'club-01', type: '2', meta: { vista_mar: true, sombra: true }, coordenadas: 'A-4' },
    { id: 5, clubId: 'club-01', type: '4', meta: { vista_mar: true, sombra: false }, coordenadas: 'A-5' },
    { id: 6, clubId: 'club-01', type: '4', meta: { vista_mar: false, sombra: true }, coordenadas: 'A-6' },
    { id: 7, clubId: 'club-01', type: '6-12', meta: { vista_mar: true, sombra: false }, coordenadas: 'A-7' },
    { id: 8, clubId: 'club-01', type: '2', meta: { vista_mar: true, sombra: true }, coordenadas: 'A-8' },
  ]);

  // Precios (simulados por tipo de zona)
  const [prices, setPrices] = useState<Record<string, number>>({
    '2': 15,
    '4': 28,
    '6-12': 45,
  });

  // Estadísticas
  const stats = {
    ocupacionMensual: 72,
    ingresoMensual: 8420,
    reservasCanceladas: 14,
  };

  // Agregar área
  const [newAreaType, setNewAreaType] = useState<'2' | '4' | '6-12'>('2');
  const [newAreaMeta, setNewAreaMeta] = useState({ vista_mar: true, sombra: false });
  const [newAreaCoord, setNewAreaCoord] = useState('');

  function addArea() {
    const id = Math.max(...areas.map(a => Number(a.id))) + 1;
    setAreas([...areas, {
      id,
      clubId: 'club-01',
      type: newAreaType,
      meta: { vista_mar: newAreaMeta.vista_mar, sombra: newAreaMeta.sombra },
      coordenadas: newAreaCoord || `A-${id}`,
    }]);
    setNewAreaCoord('');
  }

  function removeArea(id: string | number) {
    setAreas(areas.filter(a => a.id !== id));
  }

  // Actualizar precios
  function updatePrice(type: string, value: number) {
    setPrices({ ...prices, [type]: value });
  }

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1rem', minHeight: '100vh', background: 'var(--bg)', color: 'var(--fg)' }}>
      <h1 style={{ color: 'var(--red)', fontSize: '2rem', marginBottom: '.25rem', letterSpacing: '-.02em' }}>Panel de Administrador</h1>
      <p style={{ color: 'var(--muted)', marginBottom: '1.5rem', fontSize: '.95rem' }}>
        Configuración del club, zonas, precios, mapa editable y estadísticas.
      </p>

      {/* Configuración del club */}
      <section style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.25rem', marginBottom: '1.25rem' }}>
        <h2 style={{ color: 'var(--blue)', fontSize: '1.05rem', marginBottom: '.75rem', borderLeft: '3px solid var(--blue)', paddingLeft: '.6rem' }}>Configuración del Club</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '.35rem', fontSize: '.85rem', color: 'var(--fg)' }}>
            <span>Nombre del club</span>
            <input
              type="text"
              value={clubName}
              onChange={e => setClubName(e.target.value)}
              style={{ minHeight: '48px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '.5rem', padding: '0 0.75rem', color: 'var(--fg)', fontSize: '.9rem' }}
            />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '.35rem', fontSize: '.85rem', color: 'var(--fg)' }}>
            <span>Ubicación</span>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              style={{ minHeight: '48px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '.5rem', padding: '0 0.75rem', color: 'var(--fg)', fontSize: '.9rem' }}
            />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '.35rem', fontSize: '.85rem', color: 'var(--fg)' }}>
            <span>Horarios</span>
            <input
              type="text"
              value={hours}
              onChange={e => setHours(e.target.value)}
              style={{ minHeight: '48px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '.5rem', padding: '0 0.75rem', color: 'var(--fg)', fontSize: '.9rem' }}
            />
          </label>
        </div>
        <div style={{ marginTop: '.75rem', display: 'flex', gap: '.5rem' }}>
          <button
            onClick={() => { setClubName('Club Playa Reservana'); setLocation('Playa El Yaque, Isla de Margarita'); setHours('09:00 - 18:00'); }}
            style={{ minHeight: '48px', background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: '.5rem', padding: '0 .75rem', fontSize: '.85rem', fontWeight: 600, cursor: 'pointer' }}
          >
            ✅ Confirmar cambios
          </button>
        </div>
      </section>

      {/* Precios */}
      <section style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.25rem', marginBottom: '1.25rem' }}>
        <h2 style={{ color: 'var(--gold)', fontSize: '1.05rem', marginBottom: '.75rem', borderLeft: '3px solid var(--gold)', paddingLeft: '.6rem' }}>Precios por zona</h2>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {(['2', '4', '6-12'] as const).map(type => (
            <div key={type} style={{ flex: 1, minWidth: 160 }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '.35rem', fontSize: '.85rem' }}>
                <span>Tipo <strong>{type}</strong> (USD)</span>
                <input
                  type="number"
                  value={prices[type] ?? 0}
                  onChange={e => updatePrice(type, Number(e.target.value) || 0)}
                  style={{ minHeight: '48px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '.5rem', padding: '0 0.75rem', color: 'var(--fg)', fontSize: '.9rem' }}
                />
              </label>
            </div>
          ))}
        </div>
      </section>

      {/* Mapa editable */}
      <section style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.25rem', marginBottom: '1.25rem' }}>
        <h2 style={{ color: 'var(--blue)', fontSize: '1.05rem', marginBottom: '.75rem', borderLeft: '3px solid var(--blue)', paddingLeft: '.6rem' }}>Mapa editable — Zonas</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
          {areas.map(area => (
            <div key={area.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '.75rem', padding: '.75rem', position: 'relative' }}>
              <p style={{ fontWeight: 700, margin: '0 0 .25rem' }}>A-{area.id}</p>
              <p style={{ fontSize: '.75rem', color: 'var(--muted)', margin: '0 0 .25rem' }}>Tipo: <span style={{ color: 'var(--fg)', fontWeight: 600 }}>{area.type}</span></p>
              <p style={{ fontSize: '.75rem', color: 'var(--muted)', margin: '0 0 .25rem' }}>Coordenada: {area.coordenadas}</p>
              <p style={{ fontSize: '.75rem', color: 'var(--muted)', margin: '0 0 .25rem' }}>
                Vista mar: <span style={{ color: area.meta?.vista_mar ? 'var(--blue)' : 'var(--red)', fontWeight: 600 }}>{area.meta?.vista_mar ? 'Sí' : 'No'}</span>
              </p>
              <button
                onClick={() => removeArea(area.id)}
                style={{ minHeight: '48px', background: 'var(--red)', color: '#fff', border: 'none', borderRadius: '.5rem', padding: '0 .5rem', fontSize: '.8rem', fontWeight: 700, cursor: 'pointer', marginTop: '.25rem', width: '100%' }}
                aria-label={`Eliminar A-${area.id}`}
              >
                ❌ Eliminar
              </button>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '.75rem', padding: '.75rem' }}>
          <h3 style={{ fontSize: '.9rem', color: 'var(--fg)', marginBottom: '.5rem' }}>Agregar zona</h3>
          <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '.25rem', fontSize: '.8rem' }}>
              <span>Tipo</span>
              <select
                value={newAreaType}
                onChange={e => setNewAreaType(e.target.value as '2' | '4' | '6-12')}
                style={{ minHeight: '48px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '.5rem', padding: '0 .75rem', fontSize: '.9rem' }}
              >
                <option value="2">2 personas</option>
                <option value="4">4 personas</option>
                <option value="6-12">6-12 personas</option>
              </select>
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '.25rem', fontSize: '.8rem' }}>
              <span>Coordenada</span>
              <input
                type="text"
                value={newAreaCoord}
                onChange={e => setNewAreaCoord(e.target.value)}
                placeholder="A-9"
                style={{ minHeight: '48px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '.5rem', padding: '0 .75rem', fontSize: '.9rem' }}
              />
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '.25rem', fontSize: '.8rem' }}>
              <input type="checkbox" checked={newAreaMeta.vista_mar} onChange={e => setNewAreaMeta({ ...newAreaMeta, vista_mar: e.target.checked })} /> Vista mar
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '.25rem', fontSize: '.8rem' }}>
              <input type="checkbox" checked={newAreaMeta.sombra} onChange={e => setNewAreaMeta({ ...newAreaMeta, sombra: e.target.checked })} /> Sombra
            </label>
            <button
              onClick={addArea}
              style={{ minHeight: '48px', background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: '.5rem', padding: '0 .75rem', fontSize: '.85rem', fontWeight: 600, cursor: 'pointer' }}
            >
              ➕ Agregar zona
            </button>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.25rem', marginBottom: '1.25rem' }}>
        <h2 style={{ color: 'var(--red)', fontSize: '1.05rem', marginBottom: '.75rem', borderLeft: '3px solid var(--red)', paddingLeft: '.6rem' }}>Estadísticas</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '.75rem', padding: '1rem' }}>
            <p style={{ fontSize: '.8rem', color: 'var(--muted)', margin: '0 0 .25rem' }}>Ocupación mensual</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--blue)', margin: 0 }}>{stats.ocupacionMensual}%</p>
            <div style={{ marginTop: '.5rem', height: '8px', borderRadius: '4px', background: 'var(--border)', overflow: 'hidden' }}>
              <div style={{ width: `${stats.ocupacionMensual}%`, height: '100%', background: 'var(--blue)' }} />
            </div>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '.75rem', padding: '1rem' }}>
            <p style={{ fontSize: '.8rem', color: 'var(--muted)', margin: '0 0 .25rem' }}>Ingreso mensual</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--gold)', margin: 0 }}>${stats.ingresoMensual.toLocaleString('es-VE')}</p>
            <p style={{ fontSize: '.75rem', color: 'var(--muted)', marginTop: '.25rem' }}>USD estimado</p>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '.75rem', padding: '1rem' }}>
            <p style={{ fontSize: '.8rem', color: 'var(--muted)', margin: '0 0 .25rem' }}>Reservas canceladas</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--red)', margin: 0 }}>{stats.reservasCanceladas}</p>
            <p style={{ fontSize: '.75rem', color: 'var(--muted)', marginTop: '.25rem' }}>Últimos 30 días</p>
          </div>
        </div>
      </section>
    </main>
  );
}
