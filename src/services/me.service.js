import axios from "axios";
import {API_REST_URL} from '../app.config'
const API_URL = API_REST_URL + "/auth/me";

// services for login and logout request by the axios

const me = (token) => {
  return axios
    .get(API_URL, {
        token
    })
    .then((response) => {

      
      return response.data;
    });
};

const meService = {
  me,
};
export default meService;