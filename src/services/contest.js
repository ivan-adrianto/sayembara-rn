import api from './apiServices';
import {API} from './urls';

// get categories
export async function getCategories() {
  const res = await api.get(API.CATEGORIES);
  return res;
}

// get contests
export async function getContests(data) {
  const res = await api.get(API.GET_CONTESTS, {params: data});
  return res;
}

// get contests
export async function getContestDetail(id) {
  const res = await api.get(`${API.GET_CONTESTS_DETAIL}/${id}`);
  return res;
}
