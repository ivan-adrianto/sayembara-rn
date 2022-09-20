import api from './apiServices';
import {API} from './urls';

// Get Profile
export async function getProfile() {
  const res = await api.get(API.GET_PROFILE);
  return res;
}

// Update Profile
export async function updateProfile(data) {
  const res = await api.put(API.UPDATE_PROFILE, data);
  return res;
}
