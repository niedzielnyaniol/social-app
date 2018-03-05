import axios from 'axios';

export async function getUser() {
  const val = await axios.get('http://localhost:8000/api/user');
  return val;
}

export async function getPageData() {
  const val = await axios.get('http://localhost:8000/api/table-info');
  return val;
}
