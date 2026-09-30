
'use client';

import { useState, use } from 'react';
import AreaCard from '../../components/AreaCard';
import ReservationForm from '../../components/ReservationForm';
import QRAccess from '../../components/QRAccess';
import ConsumptionPanel from '../../components/ConsumptionPanel';
import { BeachArea } from '../../models/beach';
import { BeachReservation } from '../../models/reservation';
import { BeachConsumption } from '../../models/consumption';

export default function ClubDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const clubId = (id as string) || 'club-01';

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

  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const [selectedArea, setSelectedArea] = useState<BeachArea | null>(null);
  const [reservation, setReservation] = useState<BeachReservation | null>(null);
  const [consumption, setConsumption] = useState<BeachConsumption[]>([]);
  const [statusMap, setStatusMap] = useState<Record<number, 'libre' | 'reservada' | 'ocupada' | 'consumiendo'>>({});

  const handleSelect = (id: string | number) => {
    const isSelected = selectedIds.includes(id);
    const newIds = isSelected ? selectedIds.filter((i) => i !== id) : [...selectedIds, id];
    setSelectedIds(newIds);
    const area = newIds.length > 0 ? areas.find((a) => a.id === newIds[newIds.length - 1]) || null : null;
    setSelectedArea(area);
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
    setReservation(newRes);
    setStatusMap({ ...statusMap, [Number(selectedArea.id)]: 'reservada' });
    setConsumption([]);
  };

  const handleAddConsumption = (product: string) => {
    const price = product === 'Cerveza' ? 3.5 : product === 'Plato playa' ? 12 : 1;
    setConsumption([
      ...consumption,
      {
        id: Date.now(),
        reservationId: reservation?.id || '',
        producto: product,
        cantidad: 1,
        precio: price,
        pagado: false,
      },
    ]);
  };

  return (
    <main
      style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '2rem 1rem',
        minHeight: '100vh',
        background: 'var(--bg)',
        color: 'var(--fg)',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '1.05rem',
        lineHeight: 1.5,
      }}
    >
      <header style={{ marginBottom: '2rem' }}>
        <div style={{ position: 'relative', height: '240px', borderRadius: '1rem', overflow: 'hidden', marginBottom: '1.5rem', boxShadow: '0 8px 24px var(--shadow)' }}>
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80" alt="Club de playa en Margarita" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(15,17,23,.85))', padding: '2rem 1.5rem .75rem', color: '#fff' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-.03em', margin: 0, textShadow: '0 2px 8px rgba(0,0,0,.5)' }}>Club — {clubId}</h1>
            <p style={{ margin: '.25rem 0 0', opacity: .9, fontSize: '.95rem', textShadow: '0 1px 4px rgba(0,0,0,.4)' }}>Isla Margarita · Venezuela</p>
          </div>
        </div>
      </header>

      <section
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: '1rem',
          padding: '1.25rem',
          marginBottom: '1.25rem',
          boxShadow: '0 2px 10px var(--shadow)',
        }}
      >
        <h2
          style={{
            color: 'var(--blue)',
            fontSize: '1.1rem',
            marginBottom: '.5rem',
            borderLeft: '3px solid var(--blue)',
            paddingLeft: '.6rem',
          }}
        >
          🎬 Selección de sombrillas — Estilo cine
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: '.85rem', marginBottom: '1rem' }}>
          Haz clic en las sombrillas para seleccionar. Verde = libre, Dorado = reservada, Rojo = ocupada, Azul = consumiendo.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '.5rem',
            maxWidth: 600,
            margin: '0 auto',
          }}
        >
          {areas.map((area) => {
            const s = (statusMap[Number(area.id)] || 'libre') as 'libre' | 'reservada' | 'ocupada' | 'consumiendo';
            const colors = {
              libre: { bg: '#052e16', text: '#f4f4f4', label: 'Libre' },
              reservada: { bg: '#422006', text: '#f4f4f4', label: 'Reservada' },
              ocupada: { bg: '#450a0a', text: '#f4f4f4', label: 'Ocupada' },
              consumiendo: { bg: '#0a1c36', text: '#f4f4f4', label: 'Consumiendo' },
            };
            return (
              <button
                key={area.id}
                onClick={() => handleSelect(area.id)}
                aria-label={`Sombrilla ${area.id} — ${colors[s].label}`}
                style={{
                  background: colors[s].bg,
                  color: colors[s].text,
                  border: selectedIds.includes(area.id) ? '3px solid var(--gold)' : '1px solid var(--border)',
                  borderRadius: '.75rem',
                  padding: '.75rem',
                  minHeight: '120px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '.25rem',
                  cursor: 'pointer',
                  transition: 'all .2s ease',
                  boxShadow: selectedIds.includes(area.id) ? '0 0 12px var(--gold)' : 'none',
                  fontWeight: 700,
                }}
              >
                <span style={{ fontSize: '2.5rem', opacity: .8 }}>⛱</span>
                <span style={{ fontSize: '.9rem', fontWeight: 600 }}>{area.id}</span>
                <span style={{ fontSize: '.75rem', opacity: .9 }}>{colors[s].label}</span>
                <span style={{ fontSize: '.65rem', opacity: .7 }}>
                  {area.type === '2' ? '2 personas' : area.type === '4' ? '4 personas' : '6-12 personas'}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <section
          style={{
            flex: 1,
            minWidth: 300,
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '1rem',
            padding: '1.25rem',
            boxShadow: '0 2px 10px var(--shadow)',
          }}
        >
          <h3
            style={{
              color: 'var(--gold)',
              fontSize: '1.05rem',
              marginBottom: '.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '.5rem',
            }}
          >
            <span aria-hidden="true">📅</span> Reservar área
          </h3>
          <ReservationForm selectedArea={selectedArea} onReserve={handleReserve} />
          {reservation && (
            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
              <h4 style={{ color: 'var(--blue)', fontSize: '.95rem', marginBottom: '.5rem', marginTop: 0 }}>
                QR generado
              </h4>
              <QRAccess reservation={reservation} />
            </div>
          )}
        </section>

        <section
          style={{
            flex: 1,
            minWidth: 300,
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '1rem',
            padding: '1.25rem',
            boxShadow: '0 2px 10px var(--shadow)',
          }}
        >
          <h3
            style={{
              color: 'var(--red)',
              fontSize: '1.05rem',
              marginBottom: '.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '.5rem',
            }}
          >
            <span aria-hidden="true">🍹</span> Consumo
          </h3>
          <ConsumptionPanel consumption={consumption} onAdd={handleAddConsumption} />
        </section>
      </div>

      <section
        style={{
          marginTop: '1.25rem',
          padding: '1rem',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '1rem',
          borderLeft: '4px solid var(--blue)',
        }}
      >
        <h3
          style={{
            color: 'var(--blue)',
            fontSize: '1rem',
            marginBottom: '.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '.5rem',
          }}
        >
          <span aria-hidden="true">🏖️</span> Detalles del área
        </h3>
        {selectedArea ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: '.75rem',
            }}
          >
            <div
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '.75rem',
                padding: '1rem',
              }}
            >
              <p style={{ fontWeight: 700, color: 'var(--fg)', fontSize: '.95rem', margin: '0 0 .5rem' }}>
                A-{selectedArea.id}
              </p>
              <p style={{ fontSize: '.8rem', color: 'var(--muted)', margin: '.2rem 0' }}>
                Tipo:{' '}
                <span style={{ color: 'var(--fg)', fontWeight: 600 }}>
                  {selectedArea.type === '2'
                    ? '2 personas'
                    : selectedArea.type === '4'
                      ? '4 personas'
                      : '6-12 personas'}
                </span>
              </p>
              <p style={{ fontSize: '.8rem', color: 'var(--muted)', margin: '.2rem 0' }}>
                Vista al mar:{' '}
                <span
                  style={{
                    color: selectedArea.meta?.vista_mar ? 'var(--blue)' : 'var(--red)',
                    fontWeight: 600,
                  }}
                >
                  {selectedArea.meta?.vista_mar ? 'Sí' : 'No'}
                </span>
              </p>
              <p style={{ fontSize: '.8rem', color: 'var(--muted)', margin: '.2rem 0' }}>
                Sombra:{' '}
                <span
                  style={{
                    color: selectedArea.meta?.sombra ? 'var(--gold)' : 'var(--red)',
                    fontWeight: 600,
                  }}
                >
                  {selectedArea.meta?.sombra ? 'Sí' : 'No'}
                </span>
              </p>
              <p style={{ fontSize: '.8rem', color: 'var(--muted)', margin: '.2rem 0' }}>
                Club:{' '}
                <span style={{ color: 'var(--fg)', fontWeight: 600 }}>{clubId}</span>
              </p>
            </div>
          </div>
        ) : (
          <p style={{ color: 'var(--muted)', fontSize: '.85rem' }}>
            Selecciona un área en el mapa para ver sus detalles.
          </p>
        )}
      </section>
    </main>
  );
}
