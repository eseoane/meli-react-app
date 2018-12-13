import axios from 'axios';

const API_ENDPOINT = process.env.BACKEND_API || 'http://localhost:5000/api/';

const API = {
  find(search) {
    console.log(search);
    const promise = axios.get(API_ENDPOINT + 'items?q=' + search);
    return promise.then((response) => response.data);
  },
  findById(id) {
    const promise = axios.get(API_ENDPOINT + 'items/' + id);
    return promise.then((response) => response.data);
  },
};

export default API;
