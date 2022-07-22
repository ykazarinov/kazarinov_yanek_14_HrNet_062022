import Select from "../../components/Select/select"
import Calendar from "../../components/Calendar/calendar"
import OutsideAlerter from "../../components/OutsideAlerter/outsidealerter";

import { setClose1, setClose2 } from "../../slices/calendar.slice";
import { setCloseSelect1, setCloseSelect2 } from "../../slices/select.slice";

import { transcription } from '../../app.config';
import { useSelector, useDispatch } from "react-redux";

const selectList = ['Choose item...', 'item 1', 'item 2', 'item 3']

export default function Home(){
    const dispatch = useDispatch();
    const  currentLang  = useSelector((state) => state['lang'].actualLang)
    const  currentTheme  = useSelector((state) => state['theme'].actualTheme)

    const langData = transcription.find(lng => lng.lang === currentLang).data.addemployee

    return <main className={currentTheme}>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>{langData[0]}</h1>
                </div>
            </div>
            
            <form className="row">
                <div className="col-2"></div>
                <div className="col-8">
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor='firstName'>{langData[1]}</label>
                            <input className='input-standart' id="firstName" />
                        </div>
                        <div className="col-6">
                            <label htmlFor='lastName'>{langData[2]}</label>
                            <input className='input-standart' id="lastName" />
                        </div>

                        <div className="address col-6">
                                <label htmlFor="birthday">{langData[3]}</label>
                                <OutsideAlerter myDispatch={()=>dispatch(setClose1())}>
                                    <Calendar  id='birthday' calNum={1}></Calendar>
                                </OutsideAlerter>
                                
                        </div>
                        <div className="address col-6">
                                <label htmlFor="startday">{langData[4]}</label>
                                <OutsideAlerter myDispatch={()=>dispatch(setClose2())}>
                                    <Calendar id='startday' calNum={2}></Calendar>
                                </OutsideAlerter>
                                
                        </div>

                        <fieldset className="scheduler-border col-12">
                            <legend className="scheduler-border">{langData[5]}</legend>
                            <div className="row">
                                <div className="col-6">
                                    <label htmlFor='street'>{langData[6]}</label>
                                    <input className='input-standart' id="street" />
                                </div>
                                <div className="col-6">
                                    <label htmlFor='city'>{langData[7]}</label>
                                    <input className='input-standart' id="city" />
                                </div>
                                <div className="address col-6">
                                        <label htmlFor="state">{langData[8]}</label>
                                        <OutsideAlerter myDispatch={()=>dispatch(setCloseSelect1())}>
                                            <Select data={selectList} calNum={1} id='state' prefix='select'></Select>
                                        </OutsideAlerter>
                                </div>
                                <div className="col-6">
                                    <label htmlFor='zip'>{langData[9]}</label>
                                    <input className='input-standart' id="zip" type='number'/>
                                </div>
                            </div>
                        </fieldset> 
                        <div className="address col-6">
                            <label htmlFor="department">{langData[10]}</label>
                            <OutsideAlerter myDispatch={()=>dispatch(setCloseSelect2())}>
                                <Select data={selectList} calNum={2} id='department' prefix='select'></Select>
                            </OutsideAlerter>
                        </div>
                        <div className="col-12 button-container">
                            <button type="button" className="btn btn-primary btn-lg">{langData[11]}</button>
                            <button type="button" className="btn btn-dark btn-lg">{langData[12]}</button>
                        </div>
                    </div>
                </div>
                <div className="col-2"></div>
                
            </form>
        </div>    
    </main>
        
       
}