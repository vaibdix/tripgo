import axios from 'axios';

const BASE_URL = 'http://localhost:5001';

export const api = {
  fetchtents: () => axios.get(`${BASE_URL}/tents`),
  fetchcottages: () => axios.get(`${BASE_URL}/cottages`),
  fetchfarmhouses: () => axios.get(`${BASE_URL}/farmhouses`),
  fetchhotels: () => axios.get(`${BASE_URL}/hotels`),
  fetchhomestays: () => axios.get(`${BASE_URL}/homestays`),
  fetchtreehouses: () => axios.get(`${BASE_URL}/treehouses`),
  fetchvillas: () => axios.get(`${BASE_URL}/villas`),

  // auth endpoint
  register: (userData) => axios.post(`${BASE_URL}/auth/register`, userData),
  login: (credentials) => axios.post(`${BASE_URL}/auth/login`, credentials),
  logout: () => axios.post(`${BASE_URL}/auth/logout`),
};
