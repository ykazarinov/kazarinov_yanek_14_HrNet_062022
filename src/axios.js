import axios from "axios";
import {API_REST_URL} from './app.config'
const instance = axios.create({
    baseURL: API_REST_URL
})

export default instance