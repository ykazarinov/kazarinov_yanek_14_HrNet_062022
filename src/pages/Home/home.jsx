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
    return <main className="container">
        <div className="row">
            <div className="col-12">
                <h1>{transcription.find(lng => lng.lang === currentLang).data[1]}</h1>
            </div>
        </div>
        
        <form className="row">
            <div className="col-2"></div>
            <div className="col-8">
                <div className="row">
                    <div className="col-6">
                        <label htmlFor='firstName'>{transcription.find(lng => lng.lang === currentLang).data[2]}</label>
                        <input className='input-standart' id="firstName" />
                    </div>
                    <div className="col-6">
                        <label htmlFor='lastName'>{transcription.find(lng => lng.lang === currentLang).data[3]}</label>
                        <input className='input-standart' id="lastName" />
                    </div>

                    <div className="address col-6">
                            <label htmlFor="birthday">{transcription.find(lng => lng.lang === currentLang).data[4]}</label>
                            <OutsideAlerter myDispatch={()=>dispatch(setClose1())}>
                                <Calendar  id='birthday' calNum={1}></Calendar>
                            </OutsideAlerter>
                            
                    </div>
                    <div className="address col-6">
                            <label htmlFor="startday">{transcription.find(lng => lng.lang === currentLang).data[5]}</label>
                            <OutsideAlerter myDispatch={()=>dispatch(setClose2())}>
                                <Calendar id='startday' calNum={2}></Calendar>
                            </OutsideAlerter>
                            
                    </div>

                    <fieldset className="scheduler-border col-12">
                        <legend className="scheduler-border">{transcription.find(lng => lng.lang === currentLang).data[6]}</legend>
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor='street'>{transcription.find(lng => lng.lang === currentLang).data[7]}</label>
                                <input className='input-standart' id="street" />
                            </div>
                            <div className="col-6">
                                <label htmlFor='city'>{transcription.find(lng => lng.lang === currentLang).data[8]}</label>
                                <input className='input-standart' id="city" />
                            </div>
                            <div className="address col-6">
                                    <label htmlFor="state">{transcription.find(lng => lng.lang === currentLang).data[9]}</label>
                                    <OutsideAlerter myDispatch={()=>dispatch(setCloseSelect1())}>
                                        <Select data={selectList} calNum={1} id='state' prefix='select'></Select>
                                    </OutsideAlerter>
                            </div>
                            <div className="col-6">
                                <label htmlFor='zip'>{transcription.find(lng => lng.lang === currentLang).data[10]}</label>
                                <input className='input-standart' id="zip" type='number'/>
                            </div>
                        </div>
                    </fieldset> 
                    <div className="address col-6">
                        <label htmlFor="department">{transcription.find(lng => lng.lang === currentLang).data[11]}</label>
                        <OutsideAlerter myDispatch={()=>dispatch(setCloseSelect2())}>
                            <Select data={selectList} calNum={2} id='department' prefix='select'></Select>
                        </OutsideAlerter>
                    </div>
                    <div className="col-12 button-container">
                        <button type="button" className="btn btn-primary btn-lg">{transcription.find(lng => lng.lang === currentLang).data[12]}</button>
                        <button type="button" className="btn btn-dark btn-lg">{transcription.find(lng => lng.lang === currentLang).data[13]}</button>
                    </div>
                </div>
            </div>
            <div className="col-2"></div>
            
        </form>
            
        </main>
       
}