import axios from "axios";
const BASE_URL = 'http://localhost:5000'

const api = axios.create({
    baseURL: BASE_URL,
    headers:{"Content-Type": "application/x-www-form-urlencoded"},
});

export const login = async (email, password) => {
    try {
      const response = await api.post('/login', 
      { email, password });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
export const register = async (userData) => {
    try {
      const response = await api.post('/registration', 
      userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

