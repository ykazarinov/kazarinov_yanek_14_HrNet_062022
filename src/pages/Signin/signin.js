import React, { useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "../../slices/auth";
import { clearMessage } from "../../slices/message";
import { transcription } from '../../app.config';

const Login = (props) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const  currentLang  = useSelector((state) => state['lang'].actualLang)
  const langData = transcription.find(lng => lng.lang === currentLang).data.signin

  const  currentTheme  = useSelector((state) => state['theme'].actualTheme)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
    document.title = "HRNet - Sign-in Page"
  }, [dispatch]);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  // function for submit
  const handleLogin = (formValue) => {
    const { email, password, rememberMeToggle } = formValue;

    if(rememberMeToggle){
      localStorage.setItem("rememberMe", true);
    }
    dispatch(login({ email, password }))
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
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleLogin}
                >
                  <Form>
                    <div className="form-group input-wrapper">
                      <label htmlFor="email">{langData[1]}</label>
                      <Field name="email" type="text" className="form-control input-standart" />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>
                    <div className="form-group input-wrapper">
                      <label htmlFor="password">{langData[2]}</label>
                      <Field name="password" type="password" className="form-control input-standart" />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>
                    <div className="input-remember">
                      <Field type="checkbox" id="remember-me" name="rememberMeToggle" />
                      <label htmlFor="remember-me">{langData[3]}</label>
                    </div>
                    <div className="form-group button-container">
                      <button type="submit" className="btn btn-primary btn-lg"
                      >
                        {langData[4]}
                      </button>
                    </div>
                  </Form>
                </Formik>

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