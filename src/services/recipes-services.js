import axios from 'axios';

const http = axios.create({ baseURL: "https://api.spoonacular.com" })

http.interceptors.response.use(function (response) {
    return response.data;
})

export default http;