import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';


const api = axios.create({
  baseURL: API_URL,
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const leadAPI = {

  getLeads: async (params: { page?: number; search?: string; status?: string; source?: string; sort?: string }) => {
    const response = await api.get('/leads', { params });
    return response.data;
  },

  // Create a new lead
  createLead: async (leadData: any) => {
    const response = await api.post('/leads', leadData);
    return response.data;
  },

  // Update a lead
  updateLead: async (id: string, leadData: any) => {
    const response = await api.put(`/leads/${id}`, leadData);
    return response.data;
  },

  // Delete a lead (Admin only based on backend middleware)
  deleteLead: async (id: string) => {
    const response = await api.delete(`/leads/${id}`);
    return response.data;
  }
};

export default api;