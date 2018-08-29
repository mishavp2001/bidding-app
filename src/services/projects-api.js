import axios from 'axios';
import { getAccessToken } from './AuthService';

const BASE_URL = 'http://localhost:8080';

export {getProjectsData};

function getProjectsData() {
  const url = `${BASE_URL}/api/projects`;
  return axios.get(url, { headers: { Authorization: `Bearer ${getAccessToken()}` }}).then(response => response.data);
}

function getBidsData() {
  const url = `${BASE_URL}/api/bids`;
  return axios.get(url, { headers: { Authorization: `Bearer ${getAccessToken()}` }}).then(response => response.data);
}
