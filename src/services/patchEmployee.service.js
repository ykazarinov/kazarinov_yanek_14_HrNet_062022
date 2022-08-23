import axios from "axios";
import {API_REST_URL} from '../app.config'
import authHeader from "./auth-header";
const API_URL = API_REST_URL + "/employees/";

// service for edit User's Profile request by the axios

const patchEmployee = (
    id,
    photo, 
    firstName, 
    lastName, 
    email,
    phone,
    birthday,
    startday,
    street,
    city,
    state,
    zipcode,
    department,) => {
    
        return axios.patch(API_URL + id, {
            "photo": photo, 
            "firstName": firstName,
            "lastName":lastName, 
            "email":email,
            "phone": phone,
            "birthday": birthday,
            "startday": startday,
            "street": street,
            "city": city,
            "state": state,
            "zipcode": zipcode,
            "department": department
        }, {headers: authHeader()}
         
        ).then((response) => {
          
            return response.data;
        })
       
   
    };

const patchEmployeeService = {
    patchEmployee,
};
export default patchEmployeeService