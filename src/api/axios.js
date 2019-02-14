import axios from 'axios';
import { HOST } from '../common/js/config.js';

const settings = {
  crossdomain: true,
  withCredentials: true
}
const axios_proxy = axios.create(settings);
// axios.defaults.baseURL = HOST;
export default axios_proxy;
