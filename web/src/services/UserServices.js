import axios from "axios";
const API_URL = "http://localhost:8080/mp13/api/users/";

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

const SIGNIN = async (data) => {
    const response = await axios.post(API_URL + 'signin', data);
    if (response.data.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response;
}

const LOGOUT = () => {
    localStorage.removeItem("user")
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"))
}

export default {
    GET, POST, PUT, DELETE, SIGNIN, LOGOUT, getCurrentUser
}