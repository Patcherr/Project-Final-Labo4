import { useEffect, useState } from 'react';
import { useLocation, useRoute } from 'wouter';
import { getSalsa, createSalsa, updateSalsa } from '../../api/salsas';
import { getIngredientes } from '../../api/ingredientes';

export default function SalsaForm() {
  const [match, params] = useRoute('/salsas/:id/editar');
  const isEdit = !!match;
  const [, navigate] = useLocation();

  const [form, setForm] = useState({
    nombre: '',
    ingredientesIds: [],
    isSinTac: false
  });

  const [ingredientes, setIngredientes] = useState([]);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    getIngredientes().then(setIngredientes);
    if (isEdit) {
      getSalsa(params.id).then((s) => {
        setForm({
          nombre: s.nombre,
          ingredientesIds: [], // mapear si backend lo devuelve
          isSinTac: s.isSinTac
        });
      });
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
    const erroresValidados = {};
    if (!form.nombre) erroresValidados.nombre = 'Campo obligatorio';
    if (form.ingredientesIds.length === 0) erroresValidados.ingredientes = 'Debe seleccionar al menos uno';
    setErrores(erroresValidados);
    if (Object.keys(erroresValidados).length) return;

    try {
      if (isEdit) {
        await updateSalsa(params.id, form);
      } else {
        await createSalsa(form);
      }
      navigate('/salsas');
    } catch {
      alert('Error al guardar salsa.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEdit ? 'Editar Salsa' : 'Nueva Salsa'}</h2>
<label>
        Nombre:
        <input name="nombre" value={form.nombre} onChange={handleChange} />
        {errores.nombre && <p className="error">{errores.nombre}</p>}
      </label>

      <label>
        Ingredientes:
        <select multiple value={form.ingredientesIds} onChange={handleMultiSelect}>
          {ingredientes.map((ing) => (
            <option key={ing.id} value={ing.id}>{ing.nombre}</option>
          ))}
        </select>
        {errores.ingredientes && <p className="error">{errores.ingredientes}</p>}
      </label>

      <label>
        <input type="checkbox" name="isSinTac" checked={form.isSinTac} onChange={handleChange} />
        ¿Sin TACC?
      </label>

      <button type="submit">{isEdit ? 'Actualizar' : 'Crear'}</button>
      <button type="button" onClick={() => navigate('/salsas')}>Cancelar</button>
    </form>
  );
}