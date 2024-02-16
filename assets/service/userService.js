import axios from "axios";

const fetchUser = (userData) => {
    return axios.post("http://10.0.2.2:8080/api/v1/login", { ...userData })

}
const fetchUserRegister = (userData) => {
    return axios.post("http://10.0.2.2:8080/api/v1/register", { ...userData })

}

const fetchHistory = (user) => {
    return axios.post("http://10.0.2.2:8080/api/v1/read-history", { username : user })

}
const fetchCreate = (data) => {
    return axios.post("http://10.0.2.2:8080/api/v1/create-history", {...data})

}

export { fetchUser,fetchUserRegister ,fetchHistory , fetchCreate}