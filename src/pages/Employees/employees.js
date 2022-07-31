import Table from '../../components/Table/table'
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setSuccessFalse } from "../../slices/employee.slice";
import { useEffect } from 'react';

import { getAllEmployees } from "../../slices/getAllEmployees.slice";

export default function Employees(){
    const dispatch = useDispatch();

    const {employeesState} = useSelector((state)=>state.allEmployees)
   
    useEffect(()=>{
        dispatch(setSuccessFalse())
        dispatch(getAllEmployees())
    }, [])



    
    const { isLoggedIn } = useSelector((state) => state.auth);
    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    return <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Current Employees</h1>
                    <Table data={employeesState}>Table</Table>
                </div>
            </div> 
        </div>
}