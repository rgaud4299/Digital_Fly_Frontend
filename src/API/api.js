import axios from "axios";
const url=import.meta.env.VITE__APP_BACKEND_URL;

const api = axios.create({
  baseURL:url,
}); 

  
// ✅ 1. Global header setter
export const setApiHeaders = (headers = {}) => {
  api.defaults.headers.common = {
    ...api.defaults.headers.common,
    ...headers,
  };
};
setApiHeaders({ "Content-Type": "application/json" });


// ✅ 2. POST function
export const postContactForm = (endpoint, data, extraHeaders = {}) =>
  api.post(endpoint, data, { headers: extraHeaders }).then((res) => res.data);


export default api;
