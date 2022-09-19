import Axios from 'axios';
import {BASE_URL} from '../../environment';

const api = Axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  res => {
    return res;
  },
  async function (err) {
    try {
      if (err.code == 'ERR_NETWORK') {
        err.response.data = {message: 'You have no active internet connection'};
      } else if (!err.response.data?.message) {
        err.response.data = {message: 'Something went wrong. Try again later'};
      }
      return Promise.reject(err);
    } catch (error) {
      null;
    }
  },
);

export const addBearerToken = token => {
  api.defaults.headers = {
    Authorization: token,
  };
};
export const removeBearerToken = () => {
  delete api.defaults.headers.Authorization;
};

export default api;
