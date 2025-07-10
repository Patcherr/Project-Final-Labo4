import { useEffect, useState } from "react";
import { getEmpleado, deleteEmpleado } from "../api/empleados";
import { useLocation } from "wouter";

export default function EmpleadoList() {
    const [empleados, setEmpleados] = useState([]);
    const [error, setError] = useState(null);
    const [, navigate] = useLocation();

    useEffect(() => {
        cargarEmpleados();
    }, []);

    const cargarEmpleados = async () => {
        try {
            const data = await getEmpleados();
            setEmpleados(res);
        } catch (err) {
            setError("Error al cargar los empleados.");
        }
    };

    const handleDelete = async (id) => {
        if(!confirm(`¿Estás seguro de que quieres eliminar este empleado ${id}?`)) 
        return;
        try {
            await deleteEmpleado(id);
            cargarEmpleados();
        } catch (err) {
            setError("Error al eliminar el empleado.");
        }
    };
    return (
        <div>
            <button onClick={() => navigate("../api/Empleados.js")}>
            ➕ Nuevo Empleado
            </button>

            {error && <p style={{ color: "red"}}>{error}</p>}
            {empleados.length === 0 ? (
                <p>No hay empleados registrados.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Puesto</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empleados.map((emp) => (
                            <tr key={emp.id}>
                                <td data-label="ID">{emp.id}</td>
                                <td data-label="Nombre">{emp.nombre}</td>
                                <td data-label="Puesto">{emp.puesto || '-'}</td>
                                <td data-label="Email">{emp.email || '-'}</td>
                                <td data-label="Acciones">
                                    <button onClick={() => navigate(`../api/Empleados.js/${emp.id}`)}>Ver</button>
                                    <button onClick={() => navigate(`../api/Empleados.js/${emp.id}/editar`)}>Ver</button>
                                    <button onClick={() => handleDelete(emp.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}              
        </div>    
    );
}