import Select from "../../components/Select/select"
import Calendar from "../../components/Calendar/calendar"
import OutsideAlerter from "../../components/OutsideAlerter/outsidealerter";
import ErrorMessage from "../../components/ErrorMessage/errormessage"

import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Navigate } from 'react-router-dom';

import { setClose1, setClose2 } from "../../slices/calendar.slice";
import { setCloseSelect1, setCloseSelect2 } from "../../slices/select.slice";
import { setEmployee } from "../../slices/employee.slice";

import { transcription } from '../../app.config';
import { useSelector, useDispatch } from "react-redux";

const selectList = ['Choose item...', 'item 1', 'item 2', 'item 3']

export default function Home(){
    const dispatch = useDispatch();
    const  currentLang  = useSelector((state) => state['lang'].actualLang)
    const  currentTheme  = useSelector((state) => state['theme'].actualTheme)

    const message = useSelector((state) => state.message);

    const langData = transcription.find(lng => lng.lang === currentLang).data.addemployee
    const { isLoggedIn } = useSelector((state) => state.auth);

    const initialValues = {
        photo: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        birthday: "",
        startday: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        department: ""
      };
      const validationSchema = Yup.object().shape({
        
        // firstName: Yup.string(Array.isArray(message)?
        //     message.find(mes => mes.param === 'firstName').msg 
        //     : ''           
        //     ),
        // lastName: Yup.string().required("This field is required!"),
        // email: Yup.string().required("This field is required!"),
        // birthday: Yup.string().required("This field is required!"),
        // startday: Yup.string().required("This field is required!"),
        
      });
      const submitEmployee = (formValue) => {
        const { 
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
            department,
        } = formValue;
    
        dispatch(setEmployee({ photo, 
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
            department, }))

           
       
      };

    if (!isLoggedIn) {
        return <Navigate to="/" />;
      }

    return <main className={currentTheme}>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>{langData[0]}</h1>
                </div>
            </div>
            <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={submitEmployee}
                >
            <Form className="row">
                <div className="col-2"></div>
                <div className="col-8">
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor='photo'>{langData[15]}</label>
                            <Field name='photo' type='file' className='input-standart' id="photo" />
                            {Array.isArray(message) && (
                                <ErrorMessage myParam="photo"></ErrorMessage>
                            )}
                           
                                
                        </div>
                        <div className="col-6">
                            <label htmlFor='firstName'>{langData[1]}</label>
                            <Field name='firstName' className='input-standart' id="firstName" />
                            {Array.isArray(message) && (
                                <ErrorMessage myParam="firstName"></ErrorMessage>
                            )}
                        </div>
                        <div className="col-6">
                            <label htmlFor='lastName'>{langData[2]}</label>
                            <Field name='lastName' className='input-standart' id="lastName" />
                            {Array.isArray(message) && (
                                <ErrorMessage myParam="lastName"></ErrorMessage>
                            )}
                        </div>

                        <div className="col-6">
                            <label htmlFor='email'>{langData[13]}</label>
                            <Field name='email' type='email' className='input-standart' id="email" />
                            {Array.isArray(message) && (
                                <ErrorMessage myParam="email"></ErrorMessage>
                            )}
                        </div>
                        <div className="col-6">
                            <label htmlFor='phone'>{langData[14]}</label>
                            <Field name='phone' type='phone' className='input-standart' id="phone" />
                            {Array.isArray(message) && (
                                <ErrorMessage myParam="phone"></ErrorMessage>
                            )}
                        </div>

                        <div className="address col-6">
                                <label htmlFor="birthday">{langData[3]}</label>
                                <OutsideAlerter myDispatch={()=>dispatch(setClose1())}>
                                    <Calendar name='birthday' id='birthday' calNum={1}></Calendar>
                                </OutsideAlerter>
                                {Array.isArray(message) && (
                                    <ErrorMessage myParam="birthday"></ErrorMessage>
                                )}
                  
                                
                        </div>
                        <div className="address col-6">
                                <label htmlFor="startday">{langData[4]}</label>
                                <OutsideAlerter myDispatch={()=>dispatch(setClose2())}>
                                    <Calendar name='startday' id='startday' calNum={2}></Calendar>
                                </OutsideAlerter>
                                {Array.isArray(message) && (
                                    <ErrorMessage myParam="startday"></ErrorMessage>
                                )}
                               
                                
                        </div>

                        <fieldset className="scheduler-border col-12">
                            <legend className="scheduler-border">{langData[5]}</legend>
                            <div className="row">
                                <div className="col-6">
                                    <label htmlFor='street'>{langData[6]}</label>
                                    <Field name='street' className='input-standart' id="street" />
                                    {Array.isArray(message) && (
                                        <ErrorMessage myParam="street"></ErrorMessage>
                                    )}
                                </div>
                                <div className="col-6">
                                    <label htmlFor='city'>{langData[7]}</label>
                                    <Field name='city' className='input-standart' id="city" />
                                    {Array.isArray(message) && (
                                        <ErrorMessage myParam="city"></ErrorMessage>
                                    )}
                                </div>
                                <div className="address col-6">
                                        <label htmlFor="state">{langData[8]}</label>
                                        <OutsideAlerter myDispatch={()=>dispatch(setCloseSelect1())}>
                                            <Select name='state' data={selectList} calNum={1} id='state' prefix='select'></Select>
                                        </OutsideAlerter>
                                        {Array.isArray(message) && (
                                            <ErrorMessage myParam="state"></ErrorMessage>
                                        )}
                                       
                                </div>
                                <div className="col-6">
                                    <label htmlFor='zipcode'>{langData[9]}</label>
                                    <Field name='zipcode' className='input-standart' id="zipcode" type='number'/>
                                    {Array.isArray(message) && (
                                        <ErrorMessage myParam="zipcode"></ErrorMessage>
                                    )}
                                </div>
                            </div>
                        </fieldset> 
                        <div className="address col-6">
                            <label htmlFor="department">{langData[10]}</label>
                            <OutsideAlerter myDispatch={()=>dispatch(setCloseSelect2())}>
                                <Select name='department' data={selectList} calNum={2} id='department' prefix='select'></Select>
                            </OutsideAlerter>
                            {Array.isArray(message) && (
                                <ErrorMessage myParam="department"></ErrorMessage>
                            )}
                           
                        </div>
                        <div className="col-12 button-container">
                            <button type="submit" className="btn btn-primary btn-lg">{langData[11]}</button>
                            <button type="button" className="btn btn-dark btn-lg">{langData[12]}</button>
                        </div>
                    </div>
                </div>
                <div className="col-2"></div>
                
            </Form>
            </Formik>
        </div>    
    </main>
        
       
}