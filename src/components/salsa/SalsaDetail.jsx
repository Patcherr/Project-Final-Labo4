import { useEffect, useState } from 'react';
import { useRoute, useLocation } from 'wouter';
import { getSalsa } from '../../api/salsas';

export default function SalsaDetail() {
  const [match, params] = useRoute('/salsas/:id');
  const [, navigate] = useLocation();
  const [salsa, setSalsa] = useState(null);

  useEffect(() => {
    getSalsa(params.id).then(setSalsa).catch(() => alert("No se pudo cargar."));
  }, [params.id]);

  if (!salsa) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Detalle de Salsa</h2>
      <ul>
        <li><strong>ID:</strong> {salsa.id}</li>
        <li><strong>Nombre:</strong> {salsa.nombre}</li>
        <li><strong>Sin TACC:</strong> {salsa.isSinTac ? "Sí" : "No"}</li>
        <li><strong>Ingredientes:</strong>{' '}
        {salsa.ingredientes?.map((i) => i.nombre).join(',')}
        </li>
      </ul>
      <button onClick={() => navigate('/salsas')} className='btn-volver'>← Volver</button>
    </div>
  );
}