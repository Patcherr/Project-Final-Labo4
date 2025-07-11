import axios from 'axios';

const baseURL = 'https://localhost:7051/api/salsas';

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