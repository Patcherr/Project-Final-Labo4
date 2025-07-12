import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { getSalsas, deleteSalsa } from '../../api/salsas';

export default function SalsaList() {
  const [salsas, setSalsas] = useState([]);
  const [error, setError] = useState(null);
  const [, navigate] = useLocation();

  useEffect(() => {
    cargarSalsas();
  }, []);

  const cargarSalsas = async () => {
    try {
      const data = await getSalsas();
      setSalsas(data);
    } catch {
      setError('No se pudieron cargar las salsas.');
    }
  };

  const handleEliminar = async (id) => {
    if (!confirm('¿Eliminar esta salsa?')) return;
    try {
      await deleteSalsa(id);
      cargarSalsas();
    } catch {
      alert('No se pudo eliminar.');
    }
  };

  return (
    <div>
      <h2>Salsas</h2>
      <div className="actions-bar">
        <button onClick={() => navigate('/salsas/nueva')} className='btn-add'>➕ Nueva Salsa</button>
        <button onClick={() => navigate("/")} className='btn-volver'> ← Volver</button>
      </div>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Sin TACC</th>
            <th>Ingredientes</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {salsas.map((salsa) => (
            <tr key={salsa.id}>
              <td>{salsa.nombre}</td>
              <td>{salsa.isSinTac ? '✅' : '❌'}</td>
              <td>{salsa.ingredientes.join(', ')}</td>
              <td>
                <button onClick={() => navigate(`/salsas/${salsa.id}`)}>Ver</button>
                <button onClick={() => navigate(`/salsas/${salsa.id}/editar`)}>Editar</button>
                <button onClick={() => handleEliminar(salsa.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}