import axios from "axios";

// Define the API endpoint
const backendURL = `${import.meta.env.VITE_BACKEND_URL}/api`;
const API = axios.create({ baseURL: backendURL });

// Add token to request header
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Add response interceptor to handle 401 errors
API.interceptors.response.use(
  (response) => response, // Return the response if no error
  (error) => {
    if (error.response && error.response.status === 401) {
      // Log out the user
      localStorage.removeItem("token"); // Clear the token
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error); // Pass the error along
  }
);

export default API;
