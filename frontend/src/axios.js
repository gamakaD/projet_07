import axios from "axios"

axios.defaults.baseURL = 'http://localhost:4000/api/'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token')