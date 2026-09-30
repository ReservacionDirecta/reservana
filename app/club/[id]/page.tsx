
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.25rem' }}>
          <span style={{ fontSize: '1.25rem' }} aria-hidden="true">🌊</span>
          <h1 style={{ color: 'var(--blue)', fontSize: '2rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
            Club — {clubId}
          </h1>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: '.95rem', margin: 0 }}>
          Mapa interactivo, reservas y consumo en vivo.
        </p>
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
          🗺️ Mapa del club
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: '.9rem', marginBottom: '1rem' }}>
          Toca un área para seleccionarla, reservar y ver su consumo.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
            gap: '.75rem',
          }}
        >
          {areas.map((area) => (
            <AreaCard
              key={area.id}
              area={area}
              onSelect={handleSelect}
              status={statusMap[Number(area.id)] || 'libre'}
              selected={selectedIds.includes(area.id)}
            />
          ))}
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
