import axios from 'axios';
import { HOST } from '../common/js/config.js';

axios.defaults.baseURL = HOST;
export default axios;
