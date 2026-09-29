import { BeachConsumption } from '../models/consumption';
interface ConsumptionPanelProps {
  consumption: BeachConsumption[];
  onAdd: (product: string) => void;
}
export default function ConsumptionPanel({ consumption, onAdd }: ConsumptionPanelProps) {
  return (
    <div style={{ background: '#1a1a1a', borderRadius: '1rem', padding: '1.25rem', border: '1px solid #1f1f1f' }}>
      <h3 style={{ color: '#dc2626', margin: '0 0 .75rem', fontSize: '1.1rem' }}>Consumo</h3>
      {consumption.length === 0 ? (
        <p style={{ color: '#9ca3af', fontSize: '.85rem', margin: '.5rem 0 1rem' }}>No hay consumos registrados.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#9ca3af', fontSize: '.85rem', lineHeight: 1.6 }}>
          {consumption.map((item) => (
            <li key={`${item.id}-${item.producto}`} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #2a2a2a', padding: '.35rem 0' }}>
              <span>{item.producto}</span>
              <span style={{ color: '#e5e7eb' }}>{item.cantidad} x ${item.precio}</span>
            </li>
          ))}
        </ul>
      )}
      <div style={{ display: 'flex', gap: '.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        {['Cerveza', 'Agua', 'Plato playa'].map((product) => (
          <button key={product} onClick={() => onAdd(product)} style={{ padding: '.35rem .75rem', borderRadius: '.375rem', border: '1px solid #2563eb', background: '#1a1a1a', color: '#2563eb', fontSize: '.8rem', cursor: 'pointer' }}>+ {product}</button>
        ))}
      </div>
    </div>
  );
}
