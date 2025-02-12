import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-ofx7.onrender.com/',
});

export { api };
