
import axios, { AxiosResponse, AxiosError } from 'axios';
// import { getToken } from '@/lib/cookie';

const apiMuslim = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MUSLIM_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiMuslim.interceptors.request.use(
  (config) => {
    // const token = getToken("renimo_token"); 
    // if (token) {
    //     if (config.headers) {
    //         config.headers['Authorization'] = `Bearer ${token}`;
    //     }
    // }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiMuslim.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.warn('Unauthorized. Maybe token expired.');
          break;
        case 403:
          console.warn('Forbidden.');
          break;
        default:
          console.error(`API error: ${error.message}`);
      }
    }
    return Promise.reject(error);
  }
);

export default apiMuslim;
