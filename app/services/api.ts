import Axios from "axios";

const api = Axios.create({
  baseURL: 'http://192.168.0.2:8000/api',
  timeout: 60000,
  headers: {
    common: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }
});

export default api;
