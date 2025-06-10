import axios from 'axios';

// globals/Axois/panel/panelAxois.ts
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
const axiosInstance = axios.create({
  baseURL: VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});
// Add bearer token if exists
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    // console.log('token', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);
// Global error handler
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    var _a;
    if (
      ((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) ===
      401
    ) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
// ✅ Common Methods
export const get = async (url, params = {}) => {
  const response = await axiosInstance.get(url, { params });
  return response.data;
};
export const post = async (url, data) => {
  const response = await axiosInstance.post(url, data);
  return response.data;
};
export const put = async (url, data) => {
  const response = await axiosInstance.put(url, data);
  return response.data;
};
export const del = async (url, data) => {
  const response = await axiosInstance.delete(url, { data });
  return response.data;
};
export default axiosInstance;
