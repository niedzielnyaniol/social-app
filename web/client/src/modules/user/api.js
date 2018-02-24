import axios from 'axios';

export async function getUser(email) {
  const val = await axios.get(`http://localhost:8000/api/user/${email}`);
  return val;
}

export async function search() {
  console.log('search');
}
