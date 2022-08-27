import api from './apiServices';
import {API} from './urls';

// Register
export async function register(data) {
  const res = await api.post(API.REGISTER, data);
  return res;
}