// src/api.js
import axios from "axios";

const API_URL = "http://localhost:5000"; // Change to your backend URL

export const signup = (data) => {
  return axios.post(`${API_URL}/api/signup`, data);
};

export const signin = (data) => {
  return axios.post(`${API_URL}/api/signin`, data);
};
