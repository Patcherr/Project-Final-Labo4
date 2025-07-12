import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { getIngredientes, deleteIngrediente } from '../../api/ingredientes';

export default function IngredienteList() {
  const [ingredientes, setIngredientes] = useState([]);
  const [error, setError] = useState(null);
  const [, navigate] = useLocation();

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    try {
      const data = await getIngredientes();
      setIngredientes(data);
    } catch {
      setError('Error al cargar los ingredientes.');
    }
  };

  const handleEliminar = async (id) => {
    if (!confirm('¿Eliminar ingrediente?')) return;
    try {
      await deleteIngrediente(id);
      cargar();
    } catch {
      alert('No se pudo eliminar.');
    }
  };

  return (
    <div>
      <h2>Ingredientes</h2>
      <div className='actions-bar'>
        <button onClick={() => navigate('/ingredientes/nuevo')} className='btn-add'>➕ Nuevo Ingrediente</button>
        <button onClick={() => navigate("/")} className='btn-volver'> ← Volver</button>
      </div>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ingredientes.map((i) => (
            <tr key={i.id}>
              <td>{i.nombre}</td>
              <td>
                <button onClick={() => navigate(`/ingredientes/${i.id}`)}>Ver</button>
                <button onClick={() => navigate(`/ingredientes/${i.id}/editar`)}>Editar</button>
                <button onClick={() => handleEliminar(i.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}