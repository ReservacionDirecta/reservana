import { BeachArea } from '../models/beach';
interface P { area: BeachArea; onSelect: (id: string|number)=>void; status: 'libre'|'reservada'|'ocupada'|'consumiendo'; selected?: boolean; }
export default function AreaCard({ area, onSelect, status, selected=false }: P) {
  const s = { libre:{t:'Libre',c:'var(--ok)',bg:'#052e16'}, reservada:{t:'Reservada',c:'var(--gold)',bg:'#422006'}, ocupada:{t:'Ocupada',c:'var(--red)',bg:'#450a0a'}, consumiendo:{t:'Consumiendo',c:'var(--blue)',bg:'#0a1c36'} }[status];
  return <button onClick={()=>onSelect(area.id)} style={{border:selected?'2px solid var(--gold)':'1px solid var(--border)', background:'var(--card)', borderRadius:'0.75rem', padding:'1rem', textAlign:'center', cursor:'pointer', minWidth:'120px', minHeight:'120px'}} aria-label={"A-"+String(area.id)}><span style={{fontWeight:700,fontSize:'0.85rem'}}>A-{area.id}</span></button>;
}
