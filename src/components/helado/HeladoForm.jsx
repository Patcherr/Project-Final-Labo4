import { useEffect, useState } from 'react';
import { useLocation, useRoute } from 'wouter';
import { createHelado, getHelado, updateHelado } from '../../api/helados';
import { getIngredientes } from '../../api/ingredientes';

export default function HeladoForm() {
  const [match, params] = useRoute('/helados/:id/editar');
  const isEdit = !!match;
  const [, navigate] = useLocation();

  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    isArtesanal: false,
    ingredientesIds: []
  });

  const [ingredientes, setIngredientes] = useState([]);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    getIngredientes().then(setIngredientes);
    if (isEdit) {
      getHelado(params.id).then((h) =>
        setForm({
          nombre: h.nombre,
          descripcion: h.descripcion,
          precio: h.precio,
          isArtesanal: h.isArtesanal,
          ingredientesIds: [] 
        })
      );
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleMultiSelect = (e) => {
    const selected = Array.from(e.target.selectedOptions).map((o) => parseInt(o.value));
    setForm({ ...form, ingredientesIds: selected });
  };
const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevosErrores = {};
    if (!form.nombre) nuevosErrores.nombre = 'Campo obligatorio';
    if (!form.descripcion) nuevosErrores.descripcion = 'Campo obligatorio';
    if (!form.precio || form.precio <= 0) nuevosErrores.precio = 'Debe ser mayor a 0';
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length) return;

    try {
      if (isEdit) {
        await updateHelado(params.id, form);
      } else {
        await createHelado(form);
      }
      navigate('/helados');
    } catch {
      alert('Error al guardar el helado.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEdit ? 'Editar Helado' : 'Nuevo Helado'}</h2>

      <label>
        Nombre:
        <input name="nombre" value={form.nombre} onChange={handleChange} />
        {errores.nombre && <p className="error">{errores.nombre}</p>}
      </label>

      <label>
        Descripción:
        <input name="descripcion" value={form.descripcion} onChange={handleChange} />
        {errores.descripcion && <p className="error">{errores.descripcion}</p>}
      </label>

      <label>
        Precio:
        <input type="number" name="precio" value={form.precio} onChange={handleChange} />
        {errores.precio && <p className="error">{errores.precio}</p>}
      </label>

      <label>
        ¿Es artesanal?
        <input type="checkbox" name="isArtesanal" checked={form.isArtesanal} onChange={handleChange} />
      </label>

      <label>
        Ingredientes:
        <select multiple value={form.ingredientesIds} onChange={handleMultiSelect}>
          {ingredientes.map((ing) => (
            <option key={ing.id} value={ing.id}>{ing.nombre}</option>
          ))}
        </select>
      </label>

      <button type="submit">{isEdit ? 'Actualizar' : 'Crear'}</button>
      <button type="button" onClick={() => navigate('/helados')}>Cancelar</button>
    </form>
  );
}