import { useEffect, useState } from 'react';
import { useLocation, useRoute } from 'wouter';
import { getIngrediente, createIngrediente, updateIngrediente } from '../../api/ingredientes';

export default function IngredienteForm() {
  const [match, params] = useRoute('/ingredientes/:id/editar');
  const isEdit = !!match;
  const [, navigate] = useLocation();

  const [form, setForm] = useState({
    nombre: ''
  });

  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (isEdit) {
      getIngrediente(params.id).then((i) => {
        setForm({ nombre: i.nombre });
      });
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre.trim()) {
      setErrores({ nombre: 'Campo obligatorio' });
      return;
    }

    try {
      isEdit
        ? await updateIngrediente(params.id, form)
        : await createIngrediente(form);
      navigate('/ingredientes');
    } catch {
      alert('Error al guardar el ingrediente.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEdit ? 'Editar Ingrediente' : 'Nuevo Ingrediente'}</h2>

      <label>
        Nombre:
        <input name="nombre" value={form.nombre} onChange={handleChange} />
        {errores.nombre && <p className="error">{errores.nombre}</p>}
      </label>

      <button type="submit">{isEdit ? 'Actualizar' : 'Crear'}</button>
      <button type="button" onClick={() => navigate('/ingredientes')}>Cancelar</button>
    </form>
  );
}