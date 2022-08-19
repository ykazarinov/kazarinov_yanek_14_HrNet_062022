import Select from "../components/select"
import Calendar from "../components/calendar"
import OutsideAlerter from "../components/outsidealerter";
import ErrorMessage from "../components/errormessage"
import authHeader from "../services/auth-header";
import { Navigate } from 'react-router-dom';

import { setClose1, setClose2 } from "../slices/calendar.slice";
import { setCloseSelect1, setCloseSelect2 } from "../slices/select.slice";
import { setEmployee } from "../slices/employee.slice";
import {getStates} from "../slices/states.slice"
import {getDepartments} from "../slices/departments.slice"

import { transcription } from '../app.config';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import React from "react";
import axios from "../axios";
import {API_REST_URL} from '../app.config'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'


// const stateList = ['', '62de4f9df5885a099d8dd473', 'item 2', 'item 3']
// const depList = ['', '62de9795bbd221693ca401d4', 'item 2', 'item 3']

export default function AddEmployee(){
    const dispatch = useDispatch();
    const  currentLang  = useSelector((state) => state['lang'].actualLang)
    const  currentTheme  = useSelector((state) => state['theme'].actualTheme)

    const message = useSelector((state) => state.message);
    const {actualTheme} = useSelector((state) => state.theme)
    const langData = transcription.find(lng => lng.lang === currentLang).data.addemployee
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { createEmployeeSuccess } = useSelector((state) => state.newEmployee);

    const {statesList} = useSelector((state) => state.states)
    const {departmentsList} = useSelector((state) => state.departments)
    
    const [imageUrl, setImageUrl] = useState('') 
    const [isLoading, setLoading] = useState('')

    const inputFileRef = React.useRef(null)
    // const imageUrl = ''

    const changeDateFormatToBackEnd = (dateIn) =>{
        let day = dateIn.substr(0, 2)
        let month = dateIn.substr(3, 2)
        let year = dateIn.substr(6, 4)
        return year + '-' + month + '-' + day
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let formValues = {}

        formValues = { 
            photo: API_REST_URL + imageUrl, 
            firstName: e.target.elements.firstName.value, 
            lastName: e.target.elements.lastName.value, 
            email: e.target.elements.email.value, 
            phone: e.target.elements.phone.value, 
            birthday: changeDateFormatToBackEnd(e.target.elements.birthday.value), 
            startday: changeDateFormatToBackEnd(e.target.elements.startday.value), 
            street: e.target.elements.street.value, 
            city: e.target.elements.city.value, 
            state: e.target.elements.state.value !== '' ? 
                statesList.find(val => val.stateName === e.target.elements.state.value)._id : 
                null, 
            zipcode: e.target.elements.zipcode.value, 
            department: e.target.elements.department.value !== '' ?
                departmentsList.find(val => val.departmentName === e.target.elements.department.value)._id : 
                null, 
            
        }

        dispatch(setEmployee( formValues ))


        
    };

    const handleChangeFile= async(event)=>{
        try{
            const formData = new FormData()
            const file = event.target.files[0]
            formData.append('image', file)
            const {data} = await axios.post('/upload', formData, {headers: authHeader()})

            setImageUrl(data.url)
        }
        catch(err){
            console.warn(err)
            alert(err)
        }
    }

    const onClickRemoveImage = () => {
        setImageUrl('')
    }

    useEffect(()=>{
        dispatch(getStates())
        dispatch(getDepartments())
       
    }, [])



    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    if(createEmployeeSuccess){
        return <Navigate to="/employees" />;
    }



    return <main className={currentTheme}>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>{langData[0]}</h1>
                </div>
            </div>
            <form className="row" onSubmit={handleSubmit}>
                <div className="col-2"></div>
                <div className="col-8">
                    <div className="row">
                        <div className="col-12 uploadContainer">
                          
                            <input 
                                name='photo' 
                                type='file' 
                                // className='input-standart' 
                                id="photo"
                                onChange={handleChangeFile}
                                ref={inputFileRef}
                                hidden
                                
                            />
                            
                               {imageUrl === '' ?
                                    <>
                                    <FontAwesomeIcon className="defaultImage" icon={faCircleUser} />
                                    <div className="butUplCont">
                                        <button 
                                            type="button" 
                                            className={
                                                actualTheme === 'theme-light' ?
                                                'btn btn-primary color-blue' :
                                                'btn btn-outline-dark color-blue'
                                            }
                                            onClick={()=>inputFileRef.current.click()}
                                        >
                                            {langData[16]}
                                        </button>
                                    </div>
                                    </>
                                    : 
                                    <>
                                    <img className="uploadedImage" src={API_REST_URL + imageUrl} alt='Uploaded' />
                                    <div className="butUplCont">   
                                        <button 
                                            type="button" 
                                            className={
                                                actualTheme === 'theme-light' ?
                                                'btn btn-sm btn-danger color-red' :
                                                'btn btn-sm btn-outline-dark color-red'
                                            }
                                            onClick={onClickRemoveImage}
                                        >
                                            {langData[17]}
                                        </button>
                                    </div> 
                                    </>

                                }
                                
                               
                            
                            
                           
                            {Array.isArray(message) && (
                                <ErrorMessage myParam="photo"></ErrorMessage>
                            )}
                           
                                
                        </div>
                        <div className="col-6">
                            <label htmlFor='firstName'>{langData[1]}</label>
                            <input 
                                name='firstName' 
                                className='input-standart' 
                                id="firstName" 
                                
                            />
                            {Array.isArray(message) && (
                                <ErrorMessage myParam="firstName"></ErrorMessage>
                            )}
                        </div>
                        <div className="col-6">
                            <label htmlFor='lastName'>{langData[2]}</label>
                            <input 
                                name='lastName' 
                                className='input-standart' 
                                id="lastName"
                                
                            />
                            {Array.isArray(message) && (
                                <ErrorMessage myParam="lastName"></ErrorMessage>
                            )}
                        </div>

                        <div className="col-6">
                            <label htmlFor='email'>{langData[13]}</label>
                            <input name='email' type='email' className='input-standart' id="email" />
                            {Array.isArray(message) && (
                                <ErrorMessage myParam="email"></ErrorMessage>
                            )}
                        </div>
                        <div className="col-6">
                            <label htmlFor='phone'>{langData[14]}</label>
                            <input name='phone' type='phone' className='input-standart' id="phone" />
                            {Array.isArray(message) && (
                                <ErrorMessage myParam="phone"></ErrorMessage>
                            )}
                        </div>

                        <div className="address col-6">
                                <label htmlFor="birthday">{langData[3]}</label>
                                <OutsideAlerter myDispatch={()=>dispatch(setClose1())}>
                                    <Calendar fieldName='birthday' calNum={1}></Calendar>
                                </OutsideAlerter>
                                {Array.isArray(message) && (
                                    <ErrorMessage myParam="birthday"></ErrorMessage>
                                )}
                  
                                
                        </div>
                        <div className="address col-6">
                                <label htmlFor="startday">{langData[4]}</label>
                                <OutsideAlerter myDispatch={()=>dispatch(setClose2())}>
                                    <Calendar fieldName='startday' calNum={2}></Calendar>
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
                                    <input name='street' className='input-standart' id="street" />
                                    {Array.isArray(message) && (
                                        <ErrorMessage myParam="street"></ErrorMessage>
                                    )}
                                </div>
                                <div className="col-6">
                                    <label htmlFor='city'>{langData[7]}</label>
                                    <input name='city' className='input-standart' id="city" />
                                    {Array.isArray(message) && (
                                        <ErrorMessage myParam="city"></ErrorMessage>
                                    )}
                                </div>
                                <div className="address col-6">
                                        <label htmlFor="state">{langData[8]}</label>
                                        <OutsideAlerter myDispatch={()=>dispatch(setCloseSelect1())}>
                                            <Select fieldName='state' data={statesList} calNum={1} prefix='select'></Select>
                                        </OutsideAlerter>
                                        {Array.isArray(message) && (
                                            <ErrorMessage myParam="state"></ErrorMessage>
                                        )}
                                      
                                       
                                </div>
                                <div className="col-6">
                                    <label htmlFor='zipcode'>{langData[9]}</label>
                                    <input name='zipcode' className='input-standart' id="zipcode" type='number'/>
                                    {Array.isArray(message) && (
                                        <ErrorMessage myParam="zipcode"></ErrorMessage>
                                    )}
                                </div>
                            </div>
                        </fieldset> 
                        <div className="address col-6">
                            <label htmlFor="department">{langData[10]}</label>
                            <OutsideAlerter myDispatch={()=>dispatch(setCloseSelect2())}>
                                <Select fieldName='department' data={departmentsList} calNum={2} prefix='select'></Select>
                            </OutsideAlerter>
                            {Array.isArray(message) && (
                                <ErrorMessage myParam="department"></ErrorMessage>
                            )}
                           
                        </div>
                        <div className="col-12 button-container">
                            <button 
                                type="submit" 
                                className={
                                    actualTheme === 'theme-light' ?
                                    'btn btn-lg btn-primary color-blue' :
                                    'btn btn-lg btn-outline-dark color-blue'
                                }
                            >
                                {langData[11]}
                            </button>
                            <Link 
                                to='/employees'
                                className={
                                    actualTheme === 'theme-light' ?
                                    'btn btn-lg btn-dark color-white' :
                                    'btn btn-lg btn-outline-dark color-white'
                                }
                            >
                                {langData[12]}
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-2"></div>
                
            </form>
        </div>    
    </main>
        
       
}