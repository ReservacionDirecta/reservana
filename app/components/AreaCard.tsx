import { BeachArea } from '../models/beach';
interface P { area: BeachArea; onSelect: (id: string|number)=>void; status: 'libre'|'reservada'|'ocupada'|'consumiendo'; selected?: boolean; }
export default function AreaCard({ area, onSelect, status, selected=false }: P) {
  const s = { libre:{t:'Libre',c:'#22c55e'}, reservada:{t:'Reservada',c:'#eab308'}, ocupada:{t:'Ocupada',c:'#dc2626'}, consumiendo:{t:'Consumiendo',c:'#2563eb'} }[status];
  return <button onClick={()=>onSelect(area.id)} style={{border:selected?'2px solid #eab308':'1px solid #1f1f1f', background:'#111', borderRadius:'0.75rem', padding:'0.6rem', textAlign:'center', cursor:'pointer', minWidth:'120px', minHeight:'120px', padding:'1rem'}} aria-label={"A-"+String(area.id)}><span style={{fontWeight:700,fontSize:'0.85rem'}}>A-{area.id}</span></button>;
}
