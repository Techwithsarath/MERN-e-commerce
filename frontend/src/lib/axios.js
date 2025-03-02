import axios from "axios";
const axiosInstance = axios.create({
    baseURL:import.meta.mode === "development"?"http://localhost:5000/":"/api",
    withCreadentials:true,
});

export default axiosInstance;

// import axios from 'axios';

// const token = localStorage.getItem('token'); // Get token from storage

// axios.get('/api/products', {
//   headers: { Authorization: `Bearer ${token}` } // Attach token
// })
// .then(response => console.log(response.data))
// .catch(error => console.error(error));
