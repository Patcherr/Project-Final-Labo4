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
      <button onClick={() => navigate('/helados/nuevo')}>➕ Nuevo Helado</button>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {helados.map((h) => (
            <tr key={h.id}>
              <td>{h.id}</td>
              <td>{h.nombre}</td>
              <td>${h.precio.toFixed(2)}</td>
              <td>{h.estado?.nombre}</td>
              <td>
                <button onClick={() => navigate(`/helados/${h.id}`)}>Ver</button>
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