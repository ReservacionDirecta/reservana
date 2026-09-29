
'use client';

import { useState, useMemo } from 'react';

interface BeachClub {
  id: string | number;
  name: string;
  location: string;
}

interface BeachArea {
  id: string | number;
  clubId: string | number;
  type: '2' | '4' | '6-12';
  meta: {
    vista_mar: boolean;
    sombra: boolean;
  };
  coordenadas: string;
}

interface ClubData {
  club: BeachClub;
  areas: BeachArea[];
  avgPrice: number;
  availableDates: string[];
}

const CLUBS_DATA: ClubData[] = [
  {
    club: { id: 'club-01', name: 'Playa Escondida', location: 'La Guaira, Vargas' },
    areas: [
      { id: 1, clubId: 'club-01', type: '2', meta: { vista_mar: true, sombra: false }, coordenadas: 'A-1' },
      { id: 2, clubId: 'club-01', type: '4', meta: { vista_mar: true, sombra: true }, coordenadas: 'A-2' },
      { id: 3, clubId: 'club-01', type: '6-12', meta: { vista_mar: false, sombra: true }, coordenadas: 'A-3' },
      { id: 4, clubId: 'club-01', type: '2', meta: { vista_mar: true, sombra: true }, coordenadas: 'A-4' },
    ],
    avgPrice: 35,
    availableDates: ['2026-09-30', '2026-10-01', '2026-10-02', '2026-10-03'],
  },
  {
    club: { id: 'club-02', name: 'Mar Caribe Beach', location: 'Chuao, Aragua' },
    areas: [
      { id: 5, clubId: 'club-02', type: '4', meta: { vista_mar: false, sombra: true }, coordenadas: 'B-1' },
      { id: 6, clubId: 'club-02', type: '6-12', meta: { vista_mar: true, sombra: false }, coordenadas: 'B-2' },
      { id: 7, clubId: 'club-02', type: '2', meta: { vista_mar: true, sombra: false }, coordenadas: 'B-3' },
    ],
    avgPrice: 55,
    availableDates: ['2026-09-30', '2026-10-01'],
  },
  {
    club: { id: 'club-03', name: 'Sol y Arena Club', location: 'El Morro, Nueva Esparta' },
    areas: [
      { id: 8, clubId: 'club-03', type: '2', meta: { vista_mar: true, sombra: true }, coordenadas: 'C-1' },
      { id: 9, clubId: 'club-03', type: '4', meta: { vista_mar: false, sombra: false }, coordenadas: 'C-2' },
      { id: 10, clubId: 'club-03', type: '6-12', meta: { vista_mar: true, sombra: true }, coordenadas: 'C-3' },
      { id: 11, clubId: 'club-03', type: '4', meta: { vista_mar: true, sombra: false }, coordenadas: 'C-4' },
      { id: 12, clubId: 'club-03', type: '2', meta: { vista_mar: false, sombra: true }, coordenadas: 'C-5' },
    ],
    avgPrice: 42,
    availableDates: ['2026-09-30', '2026-10-01', '2026-10-02', '2026-10-03', '2026-10-04'],
  },
];

export default function SearchPage() {
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [shadowFilter, setShadowFilter] = useState<string>('');
  const [seaViewFilter, setSeaViewFilter] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string>('');

  const results = useMemo(() => {
    return CLUBS_DATA.filter((c) => {
      const matchLocation = !locationFilter || c.club.location.toLowerCase().includes(locationFilter.toLowerCase());
      const matchType = !typeFilter || c.areas.some((a) => a.type === typeFilter);
      const matchShadow = shadowFilter === '' || (shadowFilter === 'si' ? c.areas.some((a) => a.meta.sombra) : c.areas.some((a) => !a.meta.sombra));
      const matchSea = seaViewFilter === '' || (seaViewFilter === 'si' ? c.areas.some((a) => a.meta.vista_mar) : c.areas.some((a) => !a.meta.vista_mar));
      const matchMin = minPrice === '' || c.avgPrice >= Number(minPrice);
      const matchMax = maxPrice === '' || c.avgPrice <= Number(maxPrice);
      const matchDate = !dateFilter || c.availableDates.includes(dateFilter);
      return matchLocation && matchType && matchShadow && matchSea && matchMin && matchMax && matchDate;
    });
  }, [locationFilter, typeFilter, shadowFilter, seaViewFilter, minPrice, maxPrice, dateFilter]);

  const availableDates = useMemo(() => {
    const set = new Set<string>();
    CLUBS_DATA.forEach((c) => c.availableDates.forEach((d) => set.add(d)));
    return Array.from(set).sort();
  }, []);

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1rem', minHeight: '100vh', background: 'var(--bg)', color: 'var(--fg)' }}>
      <header style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ color: 'var(--red)', fontSize: '2.2rem', marginBottom: '.25rem', letterSpacing: '-.03em' }}>🔍 Buscar clubs</h1>
        <p style={{ color: 'var(--muted)', fontSize: '.95rem' }}>Encuentra tu club de playa por ubicación, tipo de área, sombra, vista al mar, precio y fechas disponibles.</p>
      </header>

      <section style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.25rem', marginBottom: '1.25rem' }}>
        <h2 style={{ color: 'var(--blue)', fontSize: '1.05rem', marginBottom: '.75rem', borderLeft: '3px solid var(--blue)', paddingLeft: '.6rem' }}>Filtros de búsqueda</h2>
        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}
        >
          <label style={{ display: 'flex', flexDirection: 'column', gap: '.25rem' }}>
            <span style={{ fontSize: '.75rem', fontWeight: 600, color: 'var(--muted)' }}>📍 Ubicación</span>
            <input
              type="text"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              placeholder="Ej. Vargas, Aragua"
              style={{ minHeight: 48, padding: '0 .75rem', borderRadius: '.5rem', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--fg)', fontSize: '.9rem' }}
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '.25rem' }}>
            <span style={{ fontSize: '.75rem', fontWeight: 600, color: 'var(--muted)' }}>🏖️ Tipo de área</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              style={{ minHeight: 48, padding: '0 .75rem', borderRadius: '.5rem', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--fg)', fontSize: '.9rem' }}
            >
              <option value="">Todos</option>
              <option value="2">2 personas</option>
              <option value="4">4 personas</option>
              <option value="6-12">6-12 personas</option>
            </select>
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '.25rem' }}>
            <span style={{ fontSize: '.75rem', fontWeight: 600, color: 'var(--muted)' }}>☀️ Sombra</span>
            <select
              value={shadowFilter}
              onChange={(e) => setShadowFilter(e.target.value)}
              style={{ minHeight: 48, padding: '0 .75rem', borderRadius: '.5rem', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--fg)', fontSize: '.9rem' }}
            >
              <option value="">Cualquiera</option>
              <option value="si">Con sombra</option>
              <option value="no">Sin sombra</option>
            </select>
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '.25rem' }}>
            <span style={{ fontSize: '.75rem', fontWeight: 600, color: 'var(--muted)' }}>🌊 Vista al mar</span>
            <select
              value={seaViewFilter}
              onChange={(e) => setSeaViewFilter(e.target.value)}
              style={{ minHeight: 48, padding: '0 .75rem', borderRadius: '.5rem', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--fg)', fontSize: '.9rem' }}
            >
              <option value="">Cualquiera</option>
              <option value="si">Con vista</option>
              <option value="no">Sin vista</option>
            </select>
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '.25rem' }}>
            <span style={{ fontSize: '.75rem', fontWeight: 600, color: 'var(--muted)' }}>💰 Precio desde (USD)</span>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Min"
              min={0}
              style={{ minHeight: 48, padding: '0 .75rem', borderRadius: '.5rem', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--fg)', fontSize: '.9rem' }}
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '.25rem' }}>
            <span style={{ fontSize: '.75rem', fontWeight: 600, color: 'var(--muted)' }}>💰 Precio hasta (USD)</span>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Max"
              min={0}
              style={{ minHeight: 48, padding: '0 .75rem', borderRadius: '.5rem', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--fg)', fontSize: '.9rem' }}
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '.25rem' }}>
            <span style={{ fontSize: '.75rem', fontWeight: 600, color: 'var(--muted)' }}>📅 Fecha disponible</span>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              style={{ minHeight: 48, padding: '0 .75rem', borderRadius: '.5rem', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--fg)', fontSize: '.9rem' }}
            >
              <option value="">Cualquier fecha</option>
              {availableDates.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </label>
        </form>

        <div style={{ marginTop: '.5rem', display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              setLocationFilter('');
              setTypeFilter('');
              setShadowFilter('');
              setSeaViewFilter('');
              setMinPrice('');
              setMaxPrice('');
              setDateFilter('');
            }}
            style={{ minHeight: 48, padding: '0 1rem', borderRadius: '.5rem', border: '1px solid var(--red)', background: 'transparent', color: 'var(--red)', fontWeight: 600, cursor: 'pointer', fontSize: '.85rem' }}
          >
            🗑️ Limpiar filtros
          </button>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {results.map((item) => {
          const areaTypes = Array.from(new Set(item.areas.map((a) => a.type))).sort();
          const hasSea = item.areas.some((a) => a.meta.vista_mar);
          const hasShadow = item.areas.some((a) => a.meta.sombra);
          return (
            <article
              key={String(item.club.id)}
              style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.25rem', boxShadow: '0 2px 8px var(--shadow)', display: 'flex', flexDirection: 'column', gap: '.75rem' }}
            >
              <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ color: 'var(--blue)', fontSize: '1.1rem', margin: 0, letterSpacing: '-.02em' }}>{item.club.name}</h3>
                <span style={{ fontSize: '.85rem', fontWeight: 700, color: 'var(--red)' }}>${item.avgPrice}</span>
              </header>
              <p style={{ color: 'var(--muted)', fontSize: '.85rem', margin: 0 }}>📍 {item.club.location}</p>

              <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
                {areaTypes.map((t) => (
                  <span key={t} style={{ padding: '.2rem .5rem', borderRadius: '.4rem', background: 'var(--surface)', border: '1px solid var(--border)', fontSize: '.75rem', color: 'var(--fg)' }}>
                    {t === '2' ? '2 pers.' : t === '4' ? '4 pers.' : '6-12 pers.'}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', fontSize: '.8rem' }}>
                <span style={{ color: hasSea ? 'var(--blue)' : 'var(--muted)' }}>🌊 {hasSea ? 'Vista mar' : 'Sin vista'}</span>
                <span style={{ color: hasShadow ? 'var(--gold)' : 'var(--muted)' }}>☀️ {hasShadow ? 'Sombra' : 'Sin sombra'}</span>
              </div>

              <p style={{ fontSize: '.8rem', color: 'var(--muted)', margin: '.25rem 0 0' }}>Zonas: {item.areas.length} &nbsp;|&nbsp; Precio promedio: <span style={{ color: 'var(--fg)', fontWeight: 600 }}>${item.avgPrice}</span> / día</p>

              <div style={{ display: 'flex', gap: '.25rem', flexWrap: 'wrap' }}>
                {item.areas.map((a) => (
                  <span key={String(a.id)} style={{ padding: '.15rem .35rem', borderRadius: '.35rem', background: 'var(--surface)', border: '1px solid var(--border)', fontSize: '.7rem', color: 'var(--fg)' }}>
                    A-{a.id} {a.type}
                  </span>
                ))}
              </div>

              <p style={{ fontSize: '.75rem', color: 'var(--muted)', margin: '.25rem 0 0' }}>
                📅 Disponibles: {item.availableDates.join(', ')}
              </p>

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Ver mapa de ' + item.club.name);
                }}
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minHeight: 48, padding: '0 1rem', borderRadius: '.75rem', background: 'var(--blue)', color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '.9rem', marginTop: '.25rem', cursor: 'pointer', boxShadow: '0 2px 8px var(--shadow)' }}
              >
                🗺️ Ver mapa y reservar
              </a>
            </article>
          );
        })}
      </section>

      {results.length === 0 && (
        <section style={{ background: 'var(--card)', border: '1px dashed var(--border)', borderRadius: '1rem', padding: '2rem 1rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', margin: 0 }}>
            😕 No se encontraron clubs con esos filtros. Intenta ajustar los criterios.
          </p>
        </section>
      )}

      <section style={{ marginTop: '2rem', padding: '1rem', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '1rem', borderLeft: '4px solid var(--red)' }}>
        <h3 style={{ color: 'var(--red)' }}>Sobre el buscador</h3>
        <p><strong>Búsqueda simulada:</strong> los datos provienen del modelo <code>BeachArea</code> y <code>BeachClub</code> del proyecto.</p>
        <p><strong>Filtros activos:</strong> ubicación, tipo de área (2 / 4 / 6-12), sombra, vista al mar, rango de precios y fechas disponibles.</p>
        <p><strong>Interfaz táctil:</strong> botones e inputs con <code>minHeight: 48px</code> para pantallas grandes.</p>
      </section>
    </main>
  );
}

