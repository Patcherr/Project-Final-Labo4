import axios from 'axios';

const baseURL = 'https://localhost:7051/api/helados';

export const getHelados = () =>
  axios.get(baseURL).then(res => res.data);

export const getHelado = (id) =>
  axios.get(`${baseURL}/${id}`).then(res => res.data);

export const createHelado = (data) =>
  axios.post(baseURL, data).then(res => res.data);

export const updateHelado = (id, data) =>
  axios.put(`${baseURL}/${id}`, data).then(res => res.data);

export const deleteHelado = (id) =>
  axios.delete(`${baseURL}/${id}`);