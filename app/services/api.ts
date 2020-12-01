import Axios from "axios";
import {API_URL} from '@env';

const api = Axios.create({
  baseURL: API_URL,
  timeout: 60000,
  headers: {
    common: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }
});

export default api;
