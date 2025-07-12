import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL + '/estados';

export const getEstados = () =>
  axios.get(baseURL).then(res => res.data);

export const getEstado = (id) =>
  axios.get(`${baseURL}/${id}`).then(res => res.data);