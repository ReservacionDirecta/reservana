'use client';

import { useState } from 'react';
import AreaCard from './components/AreaCard';
import ReservationForm from './components/ReservationForm';
import QRAccess from './components/QRAccess';
import ConsumptionPanel from './components/ConsumptionPanel';
import { BeachArea } from './models/beach';
import { BeachReservation } from './models/reservation';
import { BeachConsumption } from './models/consumption';

export default function HomePage() {
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const [selectedArea, setSelectedArea] = useState<BeachArea | null>(null);
  const [areas] = useState<BeachArea[]>([
    { id: 1, clubId: 'club-01', type: '2', meta: { vista_mar: true, sombra: false }, coordenadas: 'A-1' },
    { id: 2, clubId: 'club-01', type: '4', meta: { vista_mar: true, sombra: true }, coordenadas: 'A-2' },
    { id: 3, clubId: 'club-01', type: '6-12', meta: { vista_mar: false, sombra: true }, coordenadas: 'A-3' },
    { id: 4, clubId: 'club-01', type: '2', meta: { vista_mar: true, sombra: true }, coordenadas: 'A-4' },
    { id: 5, clubId: 'club-01', type: '4', meta: { vista_mar: true, sombra: false }, coordenadas: 'A-5' },
    { id: 6, clubId: 'club-01', type: '4', meta: { vista_mar: false, sombra: true }, coordenadas: 'A-6' },
    { id: 7, clubId: 'club-01', type: '6-12', meta: { vista_mar: true, sombra: false }, coordenadas: 'A-7' },
    { id: 8, clubId: 'club-01', type: '2', meta: { vista_mar: true, sombra: true }, coordenadas: 'A-8' },
  ]);
  const [res, setRes] = useState<BeachReservation | null>(null);
  const [cons, setCons] = useState<BeachConsumption[]>([]);
  const [statusMap, setStatusMap] = useState<Record<number, 'libre'|'reservada'|'ocupada'|'consumiendo'>>({});

  const handleSelect = (id: string | number) => {
    const isSelected = selectedIds.includes(id);
    const newIds = isSelected ? selectedIds.filter(i => i !== id) : [...selectedIds, id];
    setSelectedIds(newIds);
    const firstArea = newIds.length > 0 ? areas.find(a => a.id === newIds[newIds.length - 1]) || null : null;
    setSelectedArea(firstArea);
  };

  const handleReserve = (data: { name: string; time: string; duration: string }) => {
    if (!selectedArea) return;
    const newRes: BeachReservation = {
      id: `res-${Date.now()}`,
      clubId: String(selectedArea.clubId),
      areaId: String(selectedArea.id),
      hora_inicio: data.time,
      hora_fin: data.time,
      estado: 'reservada',
      qr_token: `QR-${selectedArea.id}-${Date.now().toString().slice(-4)}`,
    };
    setRes(newRes);
    setStatusMap({ ...statusMap, [selectedArea.id]: 'reservada' });
    setCons([]);
  };

  const handleAdd = (product: string) => {
    setCons([...cons, { id: Date.now(), reservationId: res?.id || '', producto: product, cantidad: 1, precio: product === 'Cerveza' ? 3.5 : product === 'Plato playa' ? 12 : 1, pagado: false }]);
  };

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1rem', minHeight: '100vh', background: 'var(--bg)', color: 'var(--fg)' }}>
      <h1 style={{ color: 'var(--red)', fontSize: '2rem', marginBottom: '.25rem', letterSpacing: '-.02em' }}>Reservana</h1>
      <p style={{ color: 'var(--muted)', marginBottom: '1.5rem', fontSize: '.95rem' }}>Clubes de playa — Mapa, reservas, QR y consumo. Diseño táctil.</p>

      <section style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.25rem', marginBottom: '1.25rem' }}>
        <h2 style={{ color: 'var(--blue)', fontSize: '1.05rem', marginBottom: '.75rem', borderLeft: '3px solid var(--blue)', paddingLeft: '.6rem' }}>Mapa de la playa</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '0.6rem' }}>
          {areas.map(area => (
            <AreaCard
              key={area.id}
              area={area}
              onSelect={handleSelect}
              status={statusMap[area.id] || 'libre'}
              selected={selectedIds.includes(area.id)}
            />
          ))}
        </div>
      </section>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <section style={{ flex: 1, minWidth: 260, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.25rem' }}>
          <h3 style={{ color: 'var(--gold)', fontSize: '1.05rem', marginBottom: '.75rem' }}>Estado de la reserva</h3>
          <p style={{ fontWeight: 700, color: res ? 'var(--gold)' : 'var(--ok)', fontSize: '.95rem' }}>
            {res ? `Reservada — ${res.areaId}` : (selectedArea ? 'Libre — seleccionada' : 'Selecciona un área')}
          </p>
          {res && <p style={{ fontSize: '.85rem', color: 'var(--muted)', marginTop: '.25rem' }}>{res.qr_token}</p>}
          <ReservationForm selectedArea={selectedArea} onReserve={handleReserve} />
        </section>

        <section style={{ flex: 1, minWidth: 260, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.25rem' }}>
          <h3 style={{ color: 'var(--red)', fontSize: '1.05rem', marginBottom: '.75rem' }}>QR — Acceso y consumo</h3>
          <QRAccess reservation={res} />
          <ConsumptionPanel consumption={cons} onAdd={handleAdd} />
        </section>
      </div>

      <section style={{ marginTop: '1.25rem', padding: '1rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '1rem', borderLeft: '4px solid var(--blue)' }}>
        <h3 style={{ color: 'var(--blue)', fontSize: '1rem', marginBottom: '.75rem' }}>Detalles de sombrillas / áreas seleccionadas</h3>
        {selectedIds.length === 0 ? (
          <p style={{ color: 'var(--muted)', fontSize: '.85rem' }}>Selecciona una o varias áreas para ver sus detalles.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '.75rem' }}>
            {areas.filter(area => selectedIds.includes(area.id)).map(area => (
              <div key={area.id} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '.75rem', padding: '.75rem' }}>
                <p style={{ fontWeight: 700, color: 'var(--fg)', fontSize: '.9rem', margin: '0 0 .25rem' }}>A-{area.id}</p>
                <p style={{ fontSize: '.75rem', color: 'var(--muted)', margin: '.1rem 0' }}>Tipo: <span style={{ color: 'var(--fg)', fontWeight: 600 }}>{area.type === '2' ? '2 personas' : area.type === '4' ? '4 personas' : '6-12 personas'}</span></p>
                <p style={{ fontSize: '.75rem', color: 'var(--muted)', margin: '.1rem 0' }}>Vista al mar: <span style={{ color: area.meta?.vista_mar ? 'var(--blue)' : 'var(--red)', fontWeight: 600 }}>{area.meta?.vista_mar ? 'Sí' : 'No'}</span></p>
                <p style={{ fontSize: '.75rem', color: 'var(--muted)', margin: '.1rem 0' }}>Sombra: <span style={{ color: area.meta?.sombra ? 'var(--gold)' : 'var(--red)', fontWeight: 600 }}>{area.meta?.sombra ? 'Sí' : 'No'}</span></p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section style={{ marginTop: '2rem', padding: '1rem', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '1rem', borderLeft: '4px solid var(--red)' }}>
        <h3 style={{ color: 'var(--red)' }}>Modelo y próximos pasos</h3>
        <p><strong>Marca y dominio sugerido:</strong> <code>reservana.com.ve</code> (local, reservas + playa).</p>
        <p><strong>Inversión MVP (3 meses):</strong> ~$5.300 USD — desarrollo, diseño de mapa, despliegue.</p>
        <p><strong>Modelo SaaS:</strong> Esencial $40/mes, Pro $85/mes, Anual -20%, Desarrollo dedicado $500/mes.</p>
        <p><strong>Onboarding:</strong> flujo guiado de 3 pasos para administradores/proprietarios no técnicos; primer mes gratis para los primeros 5 clubs piloto.</p>
        <p><strong>Integración de pagos:</strong> Cashea SDK instalado; botón "Pagar con Cashea" activo; Pago Móvil y USDT/Cripto listos para conectar.</p>
      </section>
    </main>
  );
}
