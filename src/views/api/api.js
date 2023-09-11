import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Authorization'
    }
})

export default instance;