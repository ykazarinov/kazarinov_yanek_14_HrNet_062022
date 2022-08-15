import axios from "axios";
import {API_REST_URL} from '../app.config'
import authHeader from "./auth-header";
const API_URL = API_REST_URL + "/employees/";

// service for edit User's Profile request by the axios

const deleteEmployeeService = (id) => {
       
        return axios.delete(API_URL + id, {headers: authHeader()}
        ).then((response) => {
            return response.data;
        })
      
    };


export default deleteEmployeeService