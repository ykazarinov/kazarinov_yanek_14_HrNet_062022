import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setSuccessFalse } from "../slices/employee.slice";
import { useEffect } from 'react';
import { transcription } from '../app.config';
import {  setActualItem1, setActualItem2, setIsOpen1, setIsOpen2 } from "../slices/select.slice";
import { resetCalendar1, resetCalendar2 } from "../slices/calendar.slice";
import {setImageUrl, setFileType} from "../slices/file.slice"
import {afterEditSuccess} from "../slices/editEmployee.slice"
import {setLocalEmployee} from "../slices/getAllEmployees.slice"
import {setEditedEmployee} from "../slices/editEmployee.slice"
import { getAllEmployees } from "../slices/getAllEmployees.slice";
import {clearMessage} from "../slices/message"


import loadable from '@loadable/component'
const Table = loadable(() => import("../components/table"))

export default function Employees(){
    const dispatch = useDispatch();
    const  currentLang  = useSelector((state) => state['lang'].actualLang)
    const langData = transcription.find(lng => lng.lang === currentLang).data.employees
    const  currentTheme  = useSelector((state) => state['theme'].actualTheme)
    const { createEmployeeSuccess } = useSelector((state) => state.newEmployee);
    const {editEmployeeSuccess} = useSelector((state)=>state.editEmployee)
    const {editableEmployee} = useSelector((state)=> state.editEmployee)
    const {editedEmployee} = useSelector((state)=>state.editEmployee)
    const {employeesState} = useSelector((state)=>state.allEmployees)
    const {isLoggedIn} = useSelector((state)=> state.auth)

    const {hidden1} = useSelector((state) => state.modal1)
    const {hidden2} = useSelector((state) => state.modal2)

 
    useEffect(()=>{
        dispatch(setSuccessFalse())
        dispatch(clearMessage())
    }, [])

        //after create
    // useEffect(()=>{
    //     dispatch(setLocalEmployee(employeesAfterLocalEdit()))
    // },[])

    //after create
    useEffect(()=>{
        if(editableEmployee === null){
            dispatch(getAllEmployees())
        }
        
        if(createEmployeeSuccess === false){
            dispatch(setActualItem1(''))
            dispatch(setActualItem2(''))
            dispatch(setIsOpen1(false))
            dispatch(setIsOpen2(false))
            dispatch(resetCalendar1())
            dispatch(resetCalendar2())
            dispatch(setImageUrl(''))
            dispatch(setFileType(''))
            
        }
       
    }, [createEmployeeSuccess])


    const employeesAfterLocalEdit = (()=>{
        const clone = (Object.assign([], employeesState))
        const editeElemId = editableEmployee._id
        const cloneIndex = clone.findIndex(item => item._id === editeElemId);
        clone[cloneIndex] = editedEmployee
        
        return clone
    })


    //after edit
    useEffect(()=>{
        if(editEmployeeSuccess === true){
          
            dispatch(setLocalEmployee(employeesAfterLocalEdit()))
            console.log('rrr')
            dispatch(afterEditSuccess())
        }
        
    }, [editEmployeeSuccess])



    
    
    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }


    

    return <main className={currentTheme}>
        <div className='container'>
                <div className="row">
                    <div className="col-12">
                        <h1 
                            tabIndex={hidden1 && hidden2 ? '4': '-1'}
                            title={langData[0]}
                        >{langData[0]}</h1>
                        <Table />
                    </div>
                </div> 
            </div>
        </main>
}