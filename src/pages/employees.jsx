import Table from '../components/table'
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setSuccessFalse } from "../slices/employee.slice";
import { useEffect } from 'react';
import { transcription } from '../app.config';


export default function Employees(){
    const dispatch = useDispatch();
    const  currentLang  = useSelector((state) => state['lang'].actualLang)
    const langData = transcription.find(lng => lng.lang === currentLang).data.employees
    const  currentTheme  = useSelector((state) => state['theme'].actualTheme)
    const {searchResult} = useSelector((state)=>state.allEmployees)
    const {isSearch} = useSelector((state)=>state.allEmployees)
    const { success } = useSelector((state) => state.newEmployee);



    useEffect(()=>{
        // dispatch(getAllEmployees())
        dispatch(setSuccessFalse())
        
       
    }, [])

    

    
    const { isLoggedIn } = useSelector((state) => state.auth);
    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }


    

    return <div className={currentTheme}>
        <div className='container'>
                <div className="row">
                    <div className="col-12">
                        <h1>{langData[0]}</h1>
                        <Table />
                    </div>
                </div> 
            </div>
        </div>
}