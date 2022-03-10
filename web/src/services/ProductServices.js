import axios from "axios";
const API_URL = "http://localhost:8080/mp13/api/products/";

const GET = (data, id) => {
    return axios.post(id === undefined ? API_URL + 'all' : API_URL + id, {
        sessionId: data
    })
}

const POST = (data) => {
    return axios.post(API_URL, data)
}

const PUT = (id, data) => {
    return axios.put(API_URL + id, data)
}

const DELETE = (id, data) => {
    return axios.delete(API_URL + id, {
        sessionId: data
    })
}

export default {
    GET, POST, PUT, DELETE
}