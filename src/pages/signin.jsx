import React, { useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import authHeader from "../services/auth-header";
// import { Formik, Field, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";
import { login, rememberMe, signIn } from "../slices/auth";
import { clearMessage } from "../slices/message";
import { transcription } from '../app.config';

import axios from "../axios";

import loadable from '@loadable/component'
const ErrorMessage  = loadable(() => import("../components/errormessage"))


const Login = (props) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const  currentLang  = useSelector((state) => state['lang'].actualLang)
  const langData = transcription.find(lng => lng.lang === currentLang).data.signin

  const  currentTheme  = useSelector((state) => state['theme'].actualTheme)
  const dispatch = useDispatch();

  useEffect(()=>{
    const token = JSON.parse(localStorage.getItem('token'));
        const rememberMeToggle = localStorage.getItem('rememberMe')
        if(token && rememberMeToggle){

          const getUser = async () => {
            try {
                const { data } = await axios.get('/auth/me', {headers: authHeader()})
                dispatch(signIn(data))
                dispatch(rememberMe())
            }
            catch (err) {
                console.warn(err)
           }
        }
       
        getUser()
    
      }

  },[])

  useEffect(() => {
    // dispatch(clearMessage());
    document.title = "HRNet - Sign-in Page"
  }, [dispatch]);


  const handleLogin = (e) => {
    e.preventDefault();
    let formValues = {}
    formValues = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
      rememberMeToggle: e.target.elements.rememberMeToggle.value,
    }

    if(formValues.rememberMeToggle){
      localStorage.setItem("rememberMe", true);
    }
    
    dispatch(login(formValues))
  };

  if (isLoggedIn) {

    return <Navigate to="/employees" />;
  }




  return (
    <main className={currentTheme}>
      <div className="container">
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6">
            <section className="sign-in-content">

             
              <h1>{langData[0]}</h1>
               
                  <form onSubmit={handleLogin}>
                    <div className="form-group input-wrapper">
                      <label htmlFor="email">{langData[1]}</label>
                      <input name="email" type="text" className="form-control input-standart" />
                      {message ? (
                        
                         <ErrorMessage myParam="error"></ErrorMessage>
                      ):null}
                    </div>
                    <div className="form-group input-wrapper">
                      <label htmlFor="password">{langData[2]}</label>
                      <input name="password" type="password" className="form-control input-standart" />
                      {message ? (
                        
                        <ErrorMessage myParam="error"></ErrorMessage>
                      ):null}
                    </div>
                    <div className="input-remember">
                      <input type="checkbox" id="remember-me" name="rememberMeToggle" />
                      <label htmlFor="remember-me">{langData[3]}</label>
                    </div>
                    <div className="form-group button-container">
                      <button type="submit" className="btn btn-primary btn-lg"
                      >
                        {langData[4]}
                      </button>
                    </div>
                  </form>
              

              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
            </section>
          </div>
          <div className="col-3"></div>
        </div>
      </div>
    </main>
  );
};
export default Login;