import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:4000/employees/";

// service for edit User's Profile request by the axios

const deleteEmployeeService = (id) => {
       
        return axios.delete(API_URL + id, {headers: authHeader()}
        ).then((response) => {
            return response.data;
        })
      
    };


export default deleteEmployeeService