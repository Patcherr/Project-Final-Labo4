import axios from 'axios';

const baseURL = 'http://localhost:3000/empleados';

export const getEmpleados = async () => {
    const res = await axios.get(baseURL);
    return res.data;
}

export const getEmpleado = async (id) => {
    const res = await axios.get(`${baseURL}/${id}`);
    return res.data;
}

export const createEmpleado = async (data) => {
    const res = await axios.post(baseURL, data);
    return res.data;
}

export const updateEmpleado = async (id, data) => {
    const res = await axios.put(`${baseURL}/${id}`, data);
    return res.data;
}

export const deleteEmpleado = async (id) => {
    await axios.delete(`${baseURL}/${id}`);
}