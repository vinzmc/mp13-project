import axios from "axios";
const API_URL = "http://localhost:8080/mp13/api/products/";

const GET = (id) => {
    return axios.get(id === undefined ? API_URL : API_URL + id)
}

const POST = (data) => {
    return axios.post(API_URL, data)
}

const PUT = (id, data) => {
    return axios.put(API_URL + id, data)
}

const DELETE = (id) => {
    return axios.delete(API_URL + id)
}

export default {
    GET, POST, PUT, DELETE
}