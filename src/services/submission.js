import api from './apiServices';
import {API} from './urls';

// Post Submission
export async function postSubmission(data) {
  const res = await api.post(API.SUBMISSION, data);
  return res;
}

// Get Submission Detail
export async function getSubmission(id) {
  const res = await api.get(`${API.SUBMISSION}/${id}`);
  return res;
}

