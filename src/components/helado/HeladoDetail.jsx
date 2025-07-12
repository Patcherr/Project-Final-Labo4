import { useEffect, useState } from 'react';
import { useLocation, useRoute } from 'wouter';
import { getHelado } from '../../api/helados';

export default function HeladoDetail() {
  const [match, params] = useRoute('/helados/:id');
  const [, navigate] = useLocation();
  const [helado, setHelado] = useState(null);

  useEffect(() => {
    getHelado(params.id).then(setHelado).catch(() => alert("No se pudo cargar el helado."));
  }, [params.id]);

  if (!helado) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Detalle del Helado</h2>
      <ul>
        <li><strong>ID:</strong> {helado.id}</li>
        <li><strong>Nombre:</strong> {helado.nombre}</li>
        <li><strong>Descripción:</strong> {helado.descripcion}</li>
        <li><strong>Precio:</strong> ${helado.precio.toFixed(2)}</li>
        <li><strong>Estado:</strong> {helado.estado?.nombre}</li>
        <li><strong>Ingredientes:</strong>{' '}
        {helado.ingredientes?.map((i) => i.nombre).join(',') || '-'}
        </li>
        <li><strong>¿Es artesanal?:</strong> {helado.isArtesanal ? 'Sí' : 'No'}</li>
        <li><strong>Fecha creación:</strong> {helado.fechaCreacion}</li>
      </ul>
      <button onClick={() => navigate('/helados')} className='btn-volver'>← Volver</button>
    </div>
  );
}