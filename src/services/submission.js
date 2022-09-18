import api from './apiServices';
import {API} from './urls';

// Post Submission
export async function postSubmission(data) {
  const res = await api.post(API.POST_SUBMISSION, data);
  return res;
}

