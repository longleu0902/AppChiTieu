import axios from "axios";

const fetchUser = (userData) => {
    return axios.post("https://app-chitieu-dev-c70c970e63bc.herokuapp.com/api/v1/login", { ...userData })
    // return axios.post("http://10.0.2.2:8080/api/v1/login", { ...userData })


}
const fetchUserRegister = (userData) => {
    return axios.post("https://app-chitieu-dev-c70c970e63bc.herokuapp.com/api/v1/register", { ...userData })
    // return axios.post("http://10.0.2.2:8080/api/v1/register", { ...userData })

}

const fetchHistory = (user) => {
    return axios.post("https://app-chitieu-dev-c70c970e63bc.herokuapp.com/api/v1/read-history", { username: user })
    // return axios.post("http://10.0.2.2:8080/api/v1/read-history", { username: user })


}
const fetchCreate = (data) => {
    return axios.post("https://app-chitieu-dev-c70c970e63bc.herokuapp.com/api/v1/create-history", { ...data })
    // return axios.post("http://10.0.2.2:8080/api/v1/create-history", { ...data })


}
const fetchDelete = (id) => {
    return axios.post("https://app-chitieu-dev-c70c970e63bc.herokuapp.com/api/v1/delete-history", { id: id })
    // return axios.post("http://10.0.2.2:8080/api/v1/delete-history", { id: id })


}

export { fetchUser, fetchUserRegister, fetchHistory, fetchCreate, fetchDelete }