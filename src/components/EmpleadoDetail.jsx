import { useEffect, useState } from 'react';
import { useRoute, useLocation } from 'wouter';
import { getEmpleado } from '../api/empleados';

export default function EmpleadoDetail() {
  const [match, params] = useRoute('/empleados/:id');
  const [, navigate] = useLocation();
  const id = params?.id;

  const [empleado, setEmpleado] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    getEmpleado(id)
      .then((data) => setEmpleado(data))
      .catch(() => setError('No se pudo cargar el empleado.'));
  }, [id]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!empleado) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Detalle del Empleado</h2>
      <ul>
        <li><strong>ID:</strong> {empleado.id}</li>
        <li><strong>Nombre:</strong> {empleado.nombre}</li>
        <li><strong>Puesto:</strong> {empleado.puesto || '-'}</li>
        <li><strong>Teléfono:</strong> {empleado.telefono || '-'}</li>
        <li><strong>Email:</strong> {empleado.email || '-'}</li>
        <li><strong>Dirección:</strong> {empleado.direccion || '-'}</li>
      </ul>
      <button onClick={() => navigate('/')}>← Volver</button>
    </div>
  );
}