import Table from '../components/table'
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setSuccessFalse } from "../slices/employee.slice";
import { useEffect } from 'react';
import { transcription } from '../app.config';
import {  setActualItem1, setActualItem2, setIsOpen1, setIsOpen2 } from "../slices/select.slice";
import { resetCalendar1, resetCalendar2 } from "../slices/calendar.slice";


export default function Employees(){
    const dispatch = useDispatch();
    const  currentLang  = useSelector((state) => state['lang'].actualLang)
    const langData = transcription.find(lng => lng.lang === currentLang).data.employees
    const  currentTheme  = useSelector((state) => state['theme'].actualTheme)
    // const {searchResult} = useSelector((state)=>state.allEmployees)
    // const {isSearch} = useSelector((state)=>state.allEmployees)
    // const { success } = useSelector((state) => state.newEmployee);
    const { createEmployeeSuccess } = useSelector((state) => state.newEmployee);
    // const  actualItem1  = useSelector((state) => state['selectReducer1'])['actualItem1']
    // const  actualItem2  = useSelector((state) => state['selectReducer2'])['actualItem2']


    useEffect(()=>{
        dispatch(setSuccessFalse())
    }, [])

    useEffect(()=>{
        if(createEmployeeSuccess === false){
             dispatch(setActualItem1(''))
            dispatch(setActualItem2(''))
            dispatch(setIsOpen1(false))
            dispatch(setIsOpen2(false))
            dispatch(resetCalendar1())
            dispatch(resetCalendar2())
        }
       
    }, [createEmployeeSuccess])

    
    const { isLoggedIn } = useSelector((state) => state.auth);
    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }


    

    return <main className={currentTheme}>
        <div className='container'>
                <div className="row">
                    <div className="col-12">
                        <h1>{langData[0]}</h1>
                        <Table />
                    </div>
                </div> 
            </div>
        </main>
}