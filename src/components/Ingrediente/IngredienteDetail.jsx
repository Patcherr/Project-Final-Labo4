import { useEffect, useState } from 'react';
import { useRoute, useLocation } from 'wouter';
import { getIngrediente } from '../../api/ingredientes';

export default function IngredienteDetail() {
  const [match, params] = useRoute('/ingredientes/:id');
  const [, navigate] = useLocation();
  const [ingrediente, setIngrediente] = useState(null);

  useEffect(() => {
    getIngrediente(params.id).then(setIngrediente).catch(() => alert('No se pudo cargar.'));
  }, [params.id]);

  if (!ingrediente) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Detalle del Ingrediente</h2>
      <ul>
        <li><strong>ID:</strong> {ingrediente.id}</li>
        <li><strong>Nombre:</strong> {ingrediente.nombre}</li>
      </ul>
      <button onClick={() => navigate('/ingredientes')}>← Volver</button>
    </div>
  );
}