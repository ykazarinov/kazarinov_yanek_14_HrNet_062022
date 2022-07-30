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

    let testData = [
        {
            "photo": "",
            "firstName": "sgf",
            "lastName": "dfsf",
            "email": "sdfsdf@rgffg.rtt",
            "phone": "",
            "birthday": "2004-07-02",
            "startday": "2022-07-07",
            "street": "",
            "city": "",
            "state": "62de4f9df5885a099d8dd473",
            "zipcode": "",
            "department": "62de9795bbd221693ca401d4"
        },
        {
            "photo": "",
            "firstName": "sgf",
            "lastName": "dfsf",
            "email": "sdfsdf@rgffg.rtt",
            "phone": "",
            "birthday": "2004-07-02",
            "startday": "2022-07-07",
            "street": "",
            "city": "",
            "state": "62de4f9df5885a099d8dd473",
            "zipcode": "",
            "department": "62de9795bbd221693ca401d4"
        }
    ] 
    return <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Current Employees</h1>
                    <Table data={employeesState}>Table</Table>
                </div>
            </div> 
        </div>
}