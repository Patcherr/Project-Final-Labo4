import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL + '/ingredientes';

export const getIngredientes = () =>
  axios.get(baseURL).then(res => res.data);

export const getIngrediente = (id) =>
  axios.get(`${baseURL}/${id}`).then(res => res.data);

export const createIngrediente = (data) =>
  axios.post(baseURL, data).then(res => res.data);

export const updateIngrediente = (id, data) =>
  axios.put(`${baseURL}/${id}`, data).then(res => res.data);

export const deleteIngrediente = (id) =>
  axios.delete(`${baseURL}/${id}`);