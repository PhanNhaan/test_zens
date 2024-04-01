import axios from 'axios';

const instance = axios.create({
    baseURL: "https://test-zens-fms3.onrender.com",
    // baseURL: "http://localhost:5000",
    withCredentials: true
});

export default instance;