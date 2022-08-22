import axios from "axios";
import {API_REST_URL} from '../app.config'
const API_URL = API_REST_URL + "/auth/login";

// services for login and logout request by the axios

const login = (email, password) => {
  return axios
    .post(API_URL, {
        email,
        password,
    })
    .then((response) => {

      if (response.data.token) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
      }
      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("rememberMe");
 
};
const authService = {
  login,
  logout,
};
export default authService;