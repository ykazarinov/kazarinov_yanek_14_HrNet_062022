import Table from '../../components/Table/table'
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
export default function Employees(){
    const { isLoggedIn } = useSelector((state) => state.auth);
    if (!isLoggedIn) {
        return <Navigate to="/" />;
      }

    let testData = [
        'qdqreq',
        'gsdfsdf'
    ] 
    return <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Current Employees</h1>
                    <Table data={testData}>Table</Table>
                </div>
            </div> 
        </div>
}