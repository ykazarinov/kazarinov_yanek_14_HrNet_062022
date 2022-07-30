import Select from "../../components/Select/select"
import Calendar from "../../components/Calendar/calendar"
import OutsideAlerter from "../../components/OutsideAlerter/outsidealerter";
import ErrorMessage from "../../components/ErrorMessage/errormessage"

import { Navigate } from 'react-router-dom';

import { setClose1, setClose2 } from "../../slices/calendar.slice";
import { setCloseSelect1, setCloseSelect2 } from "../../slices/select.slice";
import { setEmployee } from "../../slices/employee.slice";

import { transcription } from '../../app.config';
import { useSelector, useDispatch } from "react-redux";

const stateList = ['', '62de4f9df5885a099d8dd473', 'item 2', 'item 3']
const depList = ['', '62de9795bbd221693ca401d4', 'item 2', 'item 3']

export default function Home(){
    const dispatch = useDispatch();
    const  currentLang  = useSelector((state) => state['lang'].actualLang)
    const  currentTheme  = useSelector((state) => state['theme'].actualTheme)

    const message = useSelector((state) => state.message);

    const langData = transcription.find(lng => lng.lang === currentLang).data.addemployee
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { success } = useSelector((state) => state.newEmployee);

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
            photo: e.target.elements.photo.value, 
            firstName: e.target.elements.firstName.value, 
            lastName: e.target.elements.lastName.value, 
            email: e.target.elements.email.value, 
            phone: e.target.elements.phone.value, 
            birthday: changeDateFormatToBackEnd(e.target.elements.birthday.value), 
            startday: changeDateFormatToBackEnd(e.target.elements.startday.value), 
            street: e.target.elements.street.value, 
            city: e.target.elements.city.value, 
            state: e.target.elements.state.value, 
            zipcode: e.target.elements.zipcode.value, 
            department: e.target.elements.department.value, 
            
        }
        console.log(formValues)
        dispatch(setEmployee( formValues ))

        
    };

    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    if(success){
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
                        <div className="col-12">
                            <label htmlFor='photo'>{langData[15]}</label>
                            <input 
                                name='photo' 
                                type='file' 
                                className='input-standart' 
                                id="photo"
                                
                            />
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
                                            <Select fieldName='state' data={stateList} calNum={1} prefix='select'></Select>
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
                                <Select fieldName='department' data={depList} calNum={2} prefix='select'></Select>
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
                
            </form>
        </div>    
    </main>
        
       
}