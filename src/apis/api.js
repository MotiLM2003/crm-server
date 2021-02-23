import axios from 'axios';
import Cookies from 'universal-cookie';
const cookie = new Cookies();

const token = cookie.get('token');

export default axios.create({
  baseURL: 'https://crm-server-01.herokuapp.com/',
  headers: {
    'Authorization': `Bearer ${cookie.get('token')}`,
  },
  withCredentials: true,
});
