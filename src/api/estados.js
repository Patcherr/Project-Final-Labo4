import axios from 'axios';

const baseURL = 'https://localhost:7051/api/estados';

export const getEstados = () =>
  axios.get(baseURL).then(res => res.data);

export const getEstado = (id) =>
  axios.get(`${baseURL}/${id}`).then(res => res.data);