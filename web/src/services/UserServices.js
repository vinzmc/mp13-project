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

const DELETE = (id, data) => {
    return fetch(API_URL.concat(id) , data);
}

const SIGNIN = async (data) => {
    const response = await axios.post(API_URL + 'signin', data)
    .then(
        (response)=>{
            if (response.data.status === 200) {
                
                sessionStorage.setItem("user", JSON.stringify(response.data));
            }
            return response;
        }
    )
    
}

const LOGOUT = async (data) => {
    sessionStorage.removeItem("user");
    return fetch(API_URL.concat("signout") , data);
}

const getCurrentUser = () => {
    return JSON.parse(sessionStorage.getItem("user"))
}

export default {
    GET, POST, PUT, DELETE, SIGNIN, LOGOUT, getCurrentUser
}