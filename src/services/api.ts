import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api'; // Replace with your actual base URL

// Create an Axios instance
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // Include cookies in requests
});

export default apiClient;
