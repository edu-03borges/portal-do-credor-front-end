import axios from 'axios';
import { publicIp } from 'public-ip';

const meuIP = await publicIp();
const token = localStorage.getItem('tokenportalcredor');
const urlBack = 'http://localhost:3334/' // process.env.VITE_APP_API_URL;
const apiKey = '7c358afd-f805-4134-aef1-279da82d28a5' // process.env.API_KEY;

export const apiAuth = axios.create({
  baseURL: urlBack,
  headers: {
    'API_KEY': apiKey,
    'x-forwarded-for': meuIP,
  }
});

const api = axios.create({
  baseURL: urlBack,
  headers: {
    'API_KEY': apiKey,
    'x-forwarded-for': meuIP,
    'x-access-token': token
  }
});

export default api;
