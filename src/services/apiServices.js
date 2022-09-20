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
    console.log(JSON.stringify(err.response, null, 4))
    try {
      if (!err.response.data?.message) {
        err.response.data = {message: 'Something went wrong. Try again later'};
      }
      return Promise.reject(err);
    } catch (error) {
      return Promise.reject(err);
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
