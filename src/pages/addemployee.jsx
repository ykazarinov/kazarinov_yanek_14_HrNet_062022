import React from "react";
import authHeader from "../services/auth-header";
import { Navigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { setClose1, setClose2 } from "../slices/calendar.slice";
import { setCloseSelect1, setCloseSelect2 } from "../slices/select.slice";
import { setEmployee } from "../slices/employee.slice";
import { setFileType, setImageUrl } from '../slices/file.slice'
import { getStates } from "../slices/states.slice"
import { getDepartments } from "../slices/departments.slice"
import { transcription } from '../app.config';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import {patchEmployee} from '../slices/editEmployee.slice'
import {setEditedEmployee} from '../slices/editEmployee.slice'
import {setCreatedEmployee} from '../slices/employee.slice'

import { faCircleUser, faXmark, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import axios from "../axios";
import { API_REST_URL } from '../app.config'
import handleDeleteFile from '../resurces/deletefile'

import {setHidden3} from '../slices/modal.slice'

import { LightBox } from '@artfish/lightbox'

import loadable from '@loadable/component'
const OutsideAlerter = loadable(() => import("../components/outsidealerter"))
const ErrorMessage  = loadable(() => import("../components/errormessage"))
const  Select = loadable(() => import('../components/select'))
const Calendar = loadable(() => import("../components/calendar"));

export default function AddEmployee() {

    const dispatch = useDispatch();
    const currentLang = useSelector((state) => state['lang'].actualLang)
    const currentTheme = useSelector((state) => state['theme'].actualTheme)

    const message = useSelector((state) => state.message);
    const { actualTheme } = useSelector((state) => state.theme)
    const langData = transcription.find(lng => lng.lang === currentLang).data.addemployee
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { createEmployeeSuccess } = useSelector((state) => state.newEmployee);
    const {editEmployeeSuccess} = useSelector((state) => state.editEmployee)

    const { fileType, imageUrl } = useSelector((state) => state.uploadFile)

    const { statesList } = useSelector((state) => state.states)
    const { departmentsList } = useSelector((state) => state.departments)

    const {editableEmployee} = useSelector((state) => state.editEmployee)


    const {hidden3} = useSelector((state)=> state.modal3)

    const [uploadedFile, setUploadedFile] = useState(null)

    const inputFileRef = React.useRef(null)



    const changeDateFormatToBackEnd = (dateIn) => {
        let day = dateIn.substr(0, 2)
        let month = dateIn.substr(3, 2)
        let year = dateIn.substr(6, 4)
        return year + '-' + month + '-' + day
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let formValuesForCreate = {}
        let formValuesForServerUpdate = {}
        let formValuesForLocalUpdate = {}

        formValuesForCreate = {
            // _id: editableEmployee !== null ? editableEmployee._id : '', 
            photo: imageUrl ? API_REST_URL + imageUrl: '',
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

       

        formValuesForServerUpdate = (Object.assign([], formValuesForCreate))
        formValuesForServerUpdate.id = editableEmployee !== null ? editableEmployee._id : ''
      

        formValuesForLocalUpdate = (Object.assign([], formValuesForCreate))
        formValuesForLocalUpdate._id = editableEmployee !== null ? editableEmployee._id : ''

        
            if(e.target.elements.state.value !== ''){
                formValuesForLocalUpdate.state = []
                formValuesForLocalUpdate.state[0] = statesList.find(val => val.stateName === e.target.elements.state.value)
            } else{ formValuesForLocalUpdate.state = null }
            if(e.target.elements.department.value !== ''){
                formValuesForLocalUpdate.department = []
                formValuesForLocalUpdate.department[0] = departmentsList.find(val => val.departmentName === e.target.elements.department.value)
            } else{ formValuesForLocalUpdate.department = null }
             
       

        
       
        if(editableEmployee === null){
            dispatch(setEmployee(formValuesForCreate))
            // dispatch(setCreatedEmployee(formValuesForLocalCreate))
        }else{
            dispatch(patchEmployee(formValuesForServerUpdate))
            dispatch(setEditedEmployee(formValuesForLocalUpdate))
        }
        

    };



    function checkFileType(uploadedFile) {
        let fileReader = new FileReader()
        fileReader.onloadend = function (e) {
            let arr = (new Uint8Array(e.target.result)).subarray(0, 4)
            let header = ""
            let type
            for (let i = 0; i < arr.length; i++) {
                header += arr[i].toString(16)
            }
            switch (header) {
                case "89504e47":
                    type = "image/png"
                    break;
                case "ffd8ffe0":
                case "ffd8ffe1":
                case "ffd8ffe2":
                case "ffd8ffe3":
                case "ffd8ffe8":
                    type = "image/jpeg"
                    break;
                default:
                    type = "unknown"
                    break;
            }
            dispatch(setFileType(type))
        }
        fileReader.readAsArrayBuffer(uploadedFile)
    }


    const handleChangeFile = (event) => {
        if(event.target.files[0]){
            setUploadedFile(event.target.files[0])
        }else{return}
        
    }

    const onClickRemoveImage = (imageName) => {
        dispatch(setImageUrl(''))
        handleDeleteFile(imageName)
    }

    useEffect(() => {
        if (uploadedFile !== null) {
            checkFileType(uploadedFile)
        }
    }, [uploadedFile])

    useEffect(() => {
        dispatch(getStates())
        dispatch(getDepartments())

    }, [])

    useEffect(() => {

        const uploadFileToServer = async () => {
            try {

                const formData = new FormData()
                if (fileType !== 'unknown') {
                    formData.append('image', uploadedFile)
                    const { data } = await axios.post('/upload', formData, { headers: authHeader() })
                    dispatch(setImageUrl(data.url))
                } else {
                    openModal()
                }


            }
            catch (err) {
                console.warn(err)

            }
        }
        if (fileType !== '') {
            uploadFileToServer()
        }

    }, [fileType])


    if (!isLoggedIn) {

        return <Navigate to="/" />;
    }

    if (createEmployeeSuccess  || editEmployeeSuccess) {
        return <Navigate to="/employees" />;
    }

    const clickAndImageDelete = (() => {
        if (imageUrl !== '') {
            handleDeleteFile(imageUrl)
            dispatch(setImageUrl(''))
        }
    })


    const openModal = () => {
        dispatch(setHidden3(false))
    }
    const closeModal = () => {
        dispatch(setHidden3(true))
    }

    return <main className={currentTheme}>
        <OutsideAlerter myDispatch={closeModal}>
            <LightBox
                content={
                    <div className="error-container" tabIndex='1'>
                        <div className="error-icon">
                        
                            <FontAwesomeIcon icon={faCircleExclamation} />
                        
                        </div>
                        {langData[18]}
                    </div>
                }
                hidden={hidden3}
                onClick={closeModal}
                close={<FontAwesomeIcon icon={faXmark} />}
            ></LightBox>
        </OutsideAlerter>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 title={langData[0]} tabIndex={hidden3 ? '3': '-1'}>{langData[0]}</h1>
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
                                        accept="image/*"
                                        // className='input-standart' 
                                        id="photo"
                                        onChange={handleChangeFile}
                                        ref={inputFileRef}
                                        hidden
                                        // defaultValue={editableEmployee ? editableEmployee.photo : null}


                                    />
                                  

                            {imageUrl === '' ?
                                <>
                                    <div className="container">
                                    <div className="row">
                                    
                                        <div className="col-lg-6 col-sm-12 text-align-center bottom-margin">
                                            <FontAwesomeIcon 
                                                className="defaultImage" 
                                                icon={faCircleUser}
                                                title={langData[19]} 
                                                aria-label={langData[19]}
                                                tabIndex={hidden3 ? '4': '-1'} 
                                            />
                                        </div>
                                        <div className="col-lg-6 col-sm-12 flex-center">
                                            <div className="butUplCont">
                                                <button
                                                    type="button"
                                                    tabIndex={hidden3 ? '5': '-1'} 
                                                    aria-label={langData[16]}
                                                    title={langData[16]}
                                                    className={
                                                        actualTheme === 'theme-light' ?
                                                            'btn btn-primary color-blue' :
                                                            'btn btn-outline-dark color-blue'
                                                    }
                                                    onClick={() => inputFileRef.current.click()}
                                                >
                                                    {langData[16]}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </>
                                :
                                <>
                                <div className="container">
                                 <div className="row">
                                        <div className="col-lg-6 col-sm-12 text-align-center bottom-margin">
                                            <img 
                                                className="uploadedImage" 
                                                src={API_REST_URL + imageUrl} 
                                                alt={langData[20]}  
                                                title={langData[20]} 
                                                aria-label={langData[20]}
                                                tabIndex={hidden3 ? '4': '-1'} 
                                            />
                                        </div>
                                        <div className="col-lg-6 col-sm-12 flex-center">
                                            <div className="butUplCont">
                                                <button
                                                    type="button"
                                                    tabIndex={hidden3 ? '5': '-1'} 
                                                    aria-label={langData[17]}
                                                    title={langData[17]}
                                                    className={
                                                        actualTheme === 'theme-light' ?
                                                            'btn btn-sm btn-danger color-red' :
                                                            'btn btn-sm btn-outline-dark color-red'
                                                    }
                                                    onClick={() => onClickRemoveImage(API_REST_URL + imageUrl)}
                                                >
                                                    {langData[17]}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </>

                            }





                            {Array.isArray(message) && (
                                <ErrorMessage myParam="photo"  tabIndex={hidden3 ? '6': '-1'}></ErrorMessage>
                            )}


                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <label htmlFor='firstName'  aria-label={langData[1]}>{langData[1]}</label>
                            <input
                                name='firstName'
                                className='input-standart'
                                id="firstName"
                                defaultValue={editableEmployee ? editableEmployee.firstName : null}
                                tabIndex={hidden3 ? '7': '-1'}
                                aria-labelledby='firstName'

                            />
                            {Array.isArray(message) && (
                                <ErrorMessage myParam="firstName"  tabIndex={hidden3 ? '8': '-1'}></ErrorMessage>
                            )}
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <label htmlFor='lastName'aria-label={langData[2]}>{langData[2]}</label>
                            <input
                                name='lastName'
                                className='input-standart'
                                id="lastName"
                                defaultValue={editableEmployee ? editableEmployee.lastName : null}
                                tabIndex={hidden3 ? '9': '-1'}
                                aria-labelledby='lastName'

                            />
                            {Array.isArray(message) && (
                                <ErrorMessage myParam="lastName"  tabIndex={hidden3 ? '10': '-1'}></ErrorMessage>
                            )}
                        </div>

                        <div className="col-lg-6 col-sm">
                            <label htmlFor='email' aria-label={langData[13]}>{langData[13]}</label>
                            <input 
                                name='email' 
                                type='email' 
                                className='input-standart' 
                                id="email" 
                                defaultValue={editableEmployee ? editableEmployee.email : null}
                                tabIndex={hidden3 ? '11': '-1'}
                                aria-labelledby='email'
                            />
                            {Array.isArray(message) && (
                                <ErrorMessage myParam="email"  tabIndex={hidden3 ? '12': '-1'}></ErrorMessage>
                            )}
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <label htmlFor='phone' aria-label={langData[14]}>{langData[14]}</label>
                            <input 
                                name='phone' 
                                type='phone' 
                                className='input-standart' 
                                id="phone" 
                                defaultValue={editableEmployee ? editableEmployee.phone : null}
                                tabIndex={hidden3 ? '13': '-1'}
                                aria-labelledby='phone'
                                />
                            {Array.isArray(message) && (
                                <ErrorMessage myParam="phone"  tabIndex={hidden3 ? '14': '-1'}></ErrorMessage>
                            )}
                        </div>

                        <div className="address col-lg-6 col-sm-12">
                            <label htmlFor="birthday" aria-label={langData[3]}>{langData[3]}</label>
                            <OutsideAlerter myDispatch={() => dispatch(setClose1())}>
                               
                                    <Calendar fieldName='birthday' calNum={1}  tabIndex={hidden3 ? '15': '-1'}></Calendar>
                               
                            </OutsideAlerter>
                            {Array.isArray(message) && (
                                <ErrorMessage myParam="birthday"  tabIndex={hidden3 ? '16': '-1'}></ErrorMessage>
                            )}


                        </div>
                        <div className="address col-lg-6 col-sm-12">
                            <label htmlFor="startday" aria-label={langData[4]}>{langData[4]}</label>
                            <OutsideAlerter myDispatch={() => dispatch(setClose2())}>
                               
                                    <Calendar fieldName='startday' calNum={2}   tabIndex={hidden3 ? '17': '-1'}></Calendar>
                               
                            </OutsideAlerter>
                            {Array.isArray(message) && (
                                <ErrorMessage myParam="startday"  tabIndex={hidden3 ? '18': '-1'}></ErrorMessage>
                            )}


                        </div>

                        <fieldset className="scheduler-border col-12">
                            <legend className="scheduler-border"   tabIndex={hidden3 ? '19': '-1'}>{langData[5]}</legend>
                            <div className="row">
                                <div className="col-lg-6 col-sm-12">
                                    <label htmlFor='street' aria-label={langData[6]}>{langData[6]}</label>
                                    <input 
                                        name='street' 
                                        className='input-standart' 
                                        id="street"
                                        defaultValue={editableEmployee ? editableEmployee.street : null} 
                                        tabIndex={hidden3 ? '20': '-1'}
                                        aria-labelledby='street'
                                    />
                                    {Array.isArray(message) && (
                                        <ErrorMessage myParam="street"  tabIndex={hidden3 ? '21': '-1'}></ErrorMessage>
                                    )}
                                </div>
                                <div className="col-lg-6 col-sm-12">
                                    <label htmlFor='city' aria-label={langData[7]}>{langData[7]}</label>
                                    <input 
                                        name='city' 
                                        className='input-standart' 
                                        id="city" 
                                        defaultValue={editableEmployee ? editableEmployee.city : null}
                                        tabIndex={hidden3 ? '22': '-1'}
                                        aria-labelledby='city'
                                    />
                                    {Array.isArray(message) && (
                                        <ErrorMessage myParam="city"  tabIndex={hidden3 ? '23': '-1'}></ErrorMessage>
                                    )}
                                </div>
                                <div className="address col-lg-6 col-sm-12">
                                    <label htmlFor="state" aria-label={langData[8]}>{langData[8]}</label>
                                    <OutsideAlerter myDispatch={() => dispatch(setCloseSelect1())}>
                                        <Select 
                                            fieldName='state' 
                                            data={statesList} 
                                            calNum={1} 
                                            prefix='select'
                                            tabIndex={hidden3 ? '24': '-1'}
                                        ></Select>
                                    </OutsideAlerter>
                                    {Array.isArray(message) && (
                                        <ErrorMessage myParam="state"  tabIndex={hidden3 ? '25': '-1'}></ErrorMessage>
                                    )}


                                </div>
                                <div className="col-lg-6 col-sm-12">
                                    <label htmlFor='zipcode' aria-label={langData[9]}>{langData[9]}</label>
                                    <input 
                                        name='zipcode' 
                                        className='input-standart' 
                                        id="zipcode" 
                                        type='number' 
                                        defaultValue={editableEmployee ? editableEmployee.zipcode : null}
                                        tabIndex={hidden3 ? '26': '-1'}
                                        aria-labelledby='zipcode'
                                    />
                                    {Array.isArray(message) && (
                                        <ErrorMessage myParam="zipcode"  tabIndex={hidden3 ? '27': '-1'}></ErrorMessage>
                                    )}
                                </div>
                            </div>
                        </fieldset>
                        <div className="address col-lg-6 col-sm-12">
                            <label htmlFor="department" aria-label={langData[10]}>{langData[10]}</label>
                            <OutsideAlerter myDispatch={() => dispatch(setCloseSelect2())}>
                                <Select 
                                    fieldName='department' 
                                    data={departmentsList} 
                                    calNum={2} 
                                    prefix='select'
                                    tabIndex={hidden3 ? '28': '-1'}
                                ></Select>
                            </OutsideAlerter>
                            {Array.isArray(message) && (
                                <ErrorMessage myParam="department"  tabIndex={hidden3 ? '29': '-1'}></ErrorMessage>
                            )}

                        </div>
                        <div className="col-12 button-container">
                            <div className="row">
                                <div className="col-lg-6 col-sm-12">
                                    <button
                                        type="submit"
                                        className={
                                            actualTheme === 'theme-light' ?
                                                'btn btn-lg btn-primary color-blue bottom-margin btn-block' :
                                                'btn btn-lg btn-outline-dark color-blue bottom-margin btn-block'
                                        }
                                        tabIndex={hidden3 ? '30': '-1'}
                                        title={langData[11]}
                                        aria-label={langData[11]}
                                    >
                                        {langData[11]}
                                    </button>
                                </div>
                                <div className="col-lg-6 col-sm-12">
                                    <Link
                                        to='/employees'
                                        onClick={clickAndImageDelete}
                                        onKeyDown={(e) => e.keyCode === 13 ? clickAndImageDelete : null}
                                        className={
                                            actualTheme === 'theme-light' ?
                                                'btn btn-lg btn-dark color-white btn-block' :
                                                'btn btn-lg btn-outline-dark color-white btn-block'
                                        }
                                        tabIndex={hidden3 ? '31': '-1'}
                                        aria-label={langData[12]}
                                        title={langData[11]}
                                    >
                                        {langData[12]}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-2"></div>

            </form>
        </div>
    </main>


}