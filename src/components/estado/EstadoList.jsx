import { useEffect, useState } from 'react';
import { getEstados } from '../../api/estados';

export default function EstadoList() {
  const [estados, setEstados] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getEstados()
      .then(setEstados)
      .catch(() => setError('Error al cargar estados.'));
  }, []);

  return (
    <div>
      <h2>Estados</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {estados.map((e) => (
          <li key={e.id}>{e.nombre}</li>
        ))}
      </ul>
    </div>
  );
}