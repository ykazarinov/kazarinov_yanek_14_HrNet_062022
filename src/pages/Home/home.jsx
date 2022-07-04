import Select from "../../components/Select/select"
import Calendar from "../../components/Calendar/calendar"
import OutsideAlerter from "../../components/OutsideAlerter/outsidealerter";

import { useDispatch } from "react-redux";

import { setClose1, setClose2 } from "../../slices/calendar.slice";
import { setCloseSelect1, setCloseSelect2 } from "../../slices/select.slice";

const selectList = ['Choose item...', 'item 1', 'item 2', 'item 3']

export default function Home(){

    const dispatch = useDispatch();
    return <main className="container">
        <div className="row">
            <div className="col-12">
                <h1>Create Employee</h1>
            </div>
        </div>
        
        <form className="row">
            <div className="col-2"></div>
            <div className="col-8">
                <div className="row">
                    <div className="col-6">
                        <label htmlFor='firstName'>First Name</label>
                        <input className='input-standart' id="firstName" />
                    </div>
                    <div className="col-6">
                        <label htmlFor='lastName'>Last Name</label>
                        <input className='input-standart' id="lastName" />
                    </div>

                    <div className="address col-6">
                            <label htmlFor="birthday">Date of Birth</label>
                            <OutsideAlerter myDispatch={()=>dispatch(setClose1())}>
                                <Calendar  id='birthday' calNum={1} ></Calendar>
                            </OutsideAlerter>
                    </div>
                    <div className="address col-6">
                            <label htmlFor="startday">Start Date</label>
                            <OutsideAlerter myDispatch={()=>dispatch(setClose2())}>
                                <Calendar id='startday' calNum={2} selectNumber='2'></Calendar>
                            </OutsideAlerter>
                            
                    </div>

                    <fieldset className="scheduler-border col-12">
                        <legend className="scheduler-border">Address</legend>
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor='street'>Street</label>
                                <input className='input-standart' id="street" />
                            </div>
                            <div className="col-6">
                                <label htmlFor='city'>City</label>
                                <input className='input-standart' id="city" />
                            </div>
                            <div className="address col-6">
                                    <label htmlFor="state">State</label>
                                    <OutsideAlerter myDispatch={()=>dispatch(setCloseSelect1())}>
                                        <Select data={selectList} calNum={1} id='state' prefix='select'></Select>
                                    </OutsideAlerter>
                            </div>
                            <div className="col-6">
                                <label htmlFor='zip'>Zip Code</label>
                                <input className='input-standart' id="zip" type='number'/>
                            </div>
                        </div>
                    </fieldset> 
                    <div className="address col-6">
                        <label htmlFor="department">Department</label>
                        <OutsideAlerter myDispatch={()=>dispatch(setCloseSelect2())}>
                            <Select data={selectList} calNum={2} id='department' prefix='select'></Select>
                        </OutsideAlerter>
                    </div>
                    <div className="col-12 button-container">
                        <button type="button" className="btn btn-primary btn-lg col-3">Save</button>
                        <button type="button" className="btn btn-dark btn-lg col-3">Cancel</button>
                    </div>
                </div>
            </div>
            <div className="col-2"></div>
            
        </form>
            
        </main>
       
}