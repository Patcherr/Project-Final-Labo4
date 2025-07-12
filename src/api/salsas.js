import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL + '/salsas';

export const getSalsas = () =>
  axios.get(baseURL).then(res => res.data);

export const getSalsa = (id) =>
  axios.get(`${baseURL}/${id}`).then(res => res.data);

export const createSalsa = (data) =>
  axios.post(baseURL, data).then(res => res.data);

export const updateSalsa = (id, data) =>
  axios.put(`${baseURL}/${id}`, data).then(res => res.data);

export const deleteSalsa = (id) =>
  axios.delete(`${baseURL}/${id}`);