import axios from "axios";
const API_URL = "http://localhost:4000/auth/login";

// services for login and logout request by the axios

const login = (email, password) => {
  return axios
    .post(API_URL, {
        email,
        password,
    })
    .then((response) => {
      console.log(response.data.token)
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