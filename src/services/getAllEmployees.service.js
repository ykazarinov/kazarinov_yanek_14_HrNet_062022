import axios from "axios";
import {API_REST_URL} from '../app.config'
import authHeader from "./auth-header";
const API_URL = API_REST_URL + "/employees";

// service for edit User's Profile request by the axios

const getAllEmployeesService = () => {
    
        return axios.get(API_URL, {}, {headers: authHeader()}
        ).then((response) => {
            return response.data;
        })
      
    };


export default getAllEmployeesService