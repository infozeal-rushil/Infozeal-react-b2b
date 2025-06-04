/* eslint-disable @typescript-eslint/no-explicit-any */
// globals/Axois/panel/panelAxois.ts
import axios from 'axios';

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
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ✅ Common Methods
export const get = async <T>(url: string, params = {}): Promise<T> => {
  const response = await axiosInstance.get<T>(url, { params });
  return response.data;
};

export const post = async <T>(url: string, data: any): Promise<T> => {
  const response = await axiosInstance.post<T>(url, data);
  return response.data;
};

export const put = async <T>(url: string, data: any): Promise<T> => {
  const response = await axiosInstance.put<T>(url, data);
  return response.data;
};

export const del = async <T>(url: string, data: any): Promise<T> => {
  const response = await axiosInstance.delete<T>(url, { data });
  return response.data;
};

export default axiosInstance;
