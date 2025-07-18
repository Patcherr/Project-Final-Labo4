import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { getHelados, deleteHelado } from '../../api/helados';

export default function HeladoList() {
  const [helados, setHelados] = useState([]);
  const [, navigate] = useLocation();
  const [error, setError] = useState(null);

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    try {
      const data = await getHelados();
      setHelados(data);
    } catch {
      setError('Error al cargar los helados.');
    }
  };

  const handleEliminar = async (id) => {
    if (!confirm('¿Seguro que querés eliminar el helado?')) return;
    try {
      await deleteHelado(id);
      cargar();
    } catch {
      alert('No se pudo eliminar.');
    }
  };

  return (
    <div>
      <h2>Lista de Helados</h2>
      <div className="actions-bar">
        <button onClick={() => navigate('/helados/nuevo')} className='btn-add'>➕ Nuevo Helado</button>
        <button className="btn-volver" onClick={() => navigate("/")}> ← Volver</button>   
      </div>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Ingredientes</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {helados.map((h) => (
            <tr key={h.id}>
              <td data-label="Nombre">{h.nombre}</td>
              <td data-label="Precio">${h.precio.toFixed(2)}</td>
              <td data-label="Estado">{h.estado?.nombre}</td>
              <td data-label="Ingredientes">{h.ingredientes.join(', ')}</td>
              <td data-label="Acciones">
                <button  onClick={() => navigate(`/helados/${h.id}`)}>Ver</button>
                <button onClick={() => navigate(`/helados/${h.id}/editar`)}>Editar</button>
                <button onClick={() => handleEliminar(h.id)}>Eliminar</button>               
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    
    </div>
  );
}