import Axios from 'axios'; 
import storage from '../utils/storage'

export const baseURL= '//novateva-codetest.herokuapp.com'

function authRequestInterceptor(config) {
  const token = storage.getToken();
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
}

const axios = Axios.create({
  baseURL 
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    throw new Error(message)
  }
);


export default axios;