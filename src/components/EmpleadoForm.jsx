import { useEffect, useState } from 'react';
import { useLocation, useRoute } from 'wouter';
import { getEmpleado, createEmpleado, updateEmpleado } from '../api/empleados';

export default function EmpleadoForm() {
  const [match, params] = useRoute('/empleados/:id/editar');
  const isEdit = !!match;
  const id = params?.id;

  const [, navigate] = useLocation();

  const [form, setForm] = useState({
    nombre: '',
    puesto: '',
    telefono: '',
    email: '',
    direccion: ''
  });

  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (isEdit && id) {
      getEmpleado(id)
        .then((data) => setForm(data))
        .catch(() =>
          alert('Error al cargar los datos del empleado. Redirigiendo...')
        );
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validar = () => {
    const errors = {};
    if (!form.nombre) errors.nombre = 'El nombre es obligatorio.';
    if (form.email && !/\S+@\S+\.\S+/.test(form.email))
      errors.email = 'Email no válido.';
    if (form.telefono && !/^[0-9+\-() ]+$/.test(form.telefono))
      errors.telefono = 'Teléfono no válido.';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const erroresValidados = validar();
    if (Object.keys(erroresValidados).length > 0) {
      setErrores(erroresValidados);
      return;
    }

    try {
      if (isEdit) {
        await updateEmpleado(id, form);
        alert('Empleado actualizado correctamente.');
      } else {
        await createEmpleado(form);
        alert('Empleado creado correctamente.');
      }
      navigate('/');
    } catch {
      alert('Error al guardar el empleado.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEdit ? 'Editar Empleado' : 'Nuevo Empleado'}</h2>

      <label>
        Nombre:
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        {errores.nombre && <p className="error">{errores.nombre}</p>}
      </label>

      <label>
        Puesto:
        <input
          type="text"
          name="puesto"
          value={form.puesto}
          onChange={handleChange}
        />
      </label>

      <label>
        Teléfono:
        <input
          type="text"
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
        />
        {errores.telefono && <p className="error">{errores.telefono}</p>}
      </label>

      <label>
        Email:
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        {errores.email && <p className="error">{errores.email}</p>}
      </label>

      <label>
        Dirección:
        <input
          type="text"
          name="direccion"
          value={form.direccion}
          onChange={handleChange}
        />
      </label>

      <button type="submit">{isEdit ? 'Actualizar' : 'Crear'}</button>
      <button type="button" onClick={() => navigate('/')}>Cancelar</button>
    </form>
  );
}
