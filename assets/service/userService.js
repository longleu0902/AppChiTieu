import axios from "axios";

const fetchUser = (userData) => {
    return axios.post("http://10.0.2.2:8080/api/v1/login", { ...userData })
    // return axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')

}

export { fetchUser, }