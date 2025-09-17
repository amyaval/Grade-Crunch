import axios from "axios";

//create axios instance and set up default configuration
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

//adding auth token to requests if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

//handle response errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response?.status === 401){
            localStorage.removeItem('authToken');
            window.location.href = '/signin';
        }
        return Promise.reject(error);
    }
);

export default api;