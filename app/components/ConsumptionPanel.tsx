import { BeachConsumption } from '../models/consumption';
interface P { consumption: BeachConsumption[]; onAdd: (product:string)=>void; }
export default function ConsumptionPanel({ consumption, onAdd }: P) {
  return (
    <div style={{ background: 'var(--card)', borderRadius: '1rem', padding: '1.25rem', border: '1px solid var(--border)' }}>
      <h3 style={{ color: 'var(--red)', margin: '0 0 .75rem', fontSize: '1.1rem' }}>Consumo</h3>
      {consumption.length === 0 ? (
        <p style={{ color: 'var(--muted)', fontSize: '.85rem', margin: '.5rem 0 1rem' }}>No hay consumos registrados.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--fg)', fontSize: '.9rem', lineHeight: 1.7 }}>
          {consumption.map(item => (
            <li key={`${item.id}-${item.producto}`} style={{ display: 'flex', alignItems: 'center', gap: '.75rem', borderBottom: '1px solid var(--border)', padding: '.5rem 0' }}>
              <img src={`https://images.unsplash.com/photo-${item.producto === 'Cerveza' ? '1513558161293-cdaf765ed2fd' : item.producto === 'Agua' ? '1513558161293-cdaf765ed2fd' : item.producto === 'Plato playa (pescado)' ? '1504674900247-0877df9cc836' : '1504674900247-0877df9cc836'}?w=60&q=80`} alt={item.producto} style={{ width: '48px', height: '48px', borderRadius: '.5rem', objectFit: 'cover', flexShrink: 0, border: '1px solid var(--border)' }} />
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: 600, display: 'block' }}>{item.producto}</span>
                <span style={{ fontSize: '.8rem', color: 'var(--muted)' }}>{item.cantidad} x ${item.precio.toFixed(2)}</span>
              </div>
              <span style={{ color: item.pagado ? 'var(--ok)' : 'var(--red)', fontSize: '.75rem', fontWeight: 700 }}>{item.pagado ? 'Pagado' : 'Pendiente'}</span>
            </li>
          ))}
        </ul>
      )}
      <div style={{ display: 'flex', gap: '.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        {[
          { name: 'Cerveza', price: 3.50, img: '1513558161293-cdaf765ed2fd' },
          { name: 'Agua natural', price: 1.00, img: '1513558161293-cdaf765ed2fd' },
          { name: 'Plato playa (pescado)', price: 12.00, img: '1504674900247-0877df9cc836' },
          { name: 'Helado de mar', price: 1.50, img: '1504674900247-0877df9cc836' },
        ].map(p => (
          <button key={p.name} onClick={() => onAdd(p.name)} style={{ padding: '.6rem 1rem', borderRadius: '.5rem', border: '1px solid var(--blue)', background: 'var(--card)', color: 'var(--fg)', fontSize: '.95rem', fontWeight: 600, cursor: 'pointer', minHeight: '48px', display: 'flex', alignItems: 'center', gap: '.5rem' }} aria-label={`Agregar ${p.name}`}>
            <img src={`https://images.unsplash.com/photo-${p.img}?w=48&q=60`} alt={p.name} style={{ width: '28px', height: '28px', borderRadius: '.25rem', objectFit: 'cover', flexShrink: 0 }} />
            <span>{p.name}</span>
          </button>
        ))}
      </div>
      <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
        <button style={{ width: '100%', padding: '.75rem', borderRadius: '.75rem', border: 'none', background: 'var(--gold)', color: '#111', fontSize: '1.05rem', fontWeight: 800, cursor: 'pointer', minHeight: '56px', boxShadow: '0 4px 12px rgba(234,179,8,0.25)' }} aria-label="Pagar con Cashea">Pagar con Cashea</button>
        <div style={{ display: 'flex', gap: '.5rem', marginTop: '.75rem', flexWrap: 'wrap' }}>
          {['Pago Móvil', 'USDT / Cripto'].map(p => (
            <span key={p} style={{ fontSize: '.75rem', padding: '.25rem .5rem', borderRadius: '.375rem', background: 'var(--surface)', color: 'var(--fg)', border: '1px solid var(--border)' }}>{p}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
