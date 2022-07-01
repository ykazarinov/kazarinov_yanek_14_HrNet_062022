import styled from "styled-components"
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faAngleLeft, faAngleRight, faHouse } from '@fortawesome/free-solid-svg-icons'

import { useSelector, useDispatch } from "react-redux";

import { setIsOpen1, setIsOpen2 } from "../../slices/calendar.slice";
import { setChoosedMonth1, setChoosedMonth2 } from "../../slices/calendar.slice";
import { setChoosedYear1, setChoosedYear2 } from "../../slices/calendar.slice";
import { setCurrentMonth1, setCurrentMonth2 } from "../../slices/calendar.slice";


const OpenCalendarList = styled('div')`
    display: block;`
const CloseCalendarList = styled('div')`display: none;`


export default function Calendar(props){

    const currentDay = new Date()

    const dispatch = useDispatch();
    const  choosedMonth  = useSelector((state) => state['calendarReducer' + props.calNum])['choosedMonth'+props.calNum]
    const  choosedYear  = useSelector((state) => state['calendarReducer' + props.calNum])['choosedYear'+props.calNum]
    const  isOpen  = useSelector((state) => state['calendarReducer' + props.calNum])['isOpen'+props.calNum]
    const  currentMonth  = useSelector((state) => state['calendarReducer' + props.calNum])['currentMonth'+props.calNum]

    const setIsOpen = (()=>{ return props.calNum === 1 ? setIsOpen1() : setIsOpen2()})
    const setChoosedYear = (()=>{ return props.calNum === 1 ? setChoosedYear1() : setChoosedYear2()})
    const setChoosedMonth = (()=>{ return props.calNum === 1 ? setChoosedMonth1() : setChoosedMonth2()})

    
    const setCurrentMonth = (()=>{ return props.calNum === 1 ? setCurrentMonth1() : setCurrentMonth2()})

    // const [choosedDay, setChoosedDay] = useState(currentDay.getDate())

    const weekDaysNames = [ 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di']
    const monthNames = [
        {index: 1, monthName:'Janvier'},
        {index: 2, monthName:'Février'},
        {index: 3, monthName:'Mars'},
        {index: 4, monthName:'Avril'},
        {index: 5, monthName:'Mai'},
        {index: 6, monthName:'Juin'},
        {index: 7, monthName:'Juillet'},
        {index: 8, monthName:'Août'},
        {index: 9, monthName:'Septembre'},
        {index: 10, monthName:'Octobre'},
        {index: 11, monthName:'Novembre'},
        {index: 12, monthName:'Décembre'}]
    const yearsNames = []
        for(let i=currentDay.getFullYear(); i>=1900; i--){
            yearsNames.push(i)
        }

    const leftDown = (() => {
        if(choosedMonth === 1){
            dispatch(yearDecrement())
            dispatch(monthToEnd())
            dispatch(setCurrentMonth())

        }else{
            dispatch(monthDecrement())
            dispatch(setCurrentMonth())
        }
    })

    const rightDown = (() => {
        if(choosedMonth === 12){
            dispatch(yearExcrement())
            dispatch(monthToBegin())
            dispatch(setCurrentMonth())
        }else{
            dispatch(monthExcrement())
            dispatch(setCurrentMonth())
        }
    })

    const yearDecrement = (()=>{
        return {
            type: "calendar"+ props.calNum+"/setChoosedYear",
            payload: Number(choosedYear)-1
        }
    })

    const yearExcrement = (()=>{
        return {
            type: "calendar"+ props.calNum+"/setChoosedYear",
            payload: Number(choosedYear)+1
        }
    })

    const yearChoose = ((value)=>{
        return {
            type: "calendar"+ props.calNum+"/setChoosedYear",
            payload: value
        }
    })

    const monthDecrement = (()=>{
        return {
            type: "calendar"+ props.calNum+"/setChoosedMonth",
            payload: Number(choosedMonth)-1
        }
    })

    const monthExcrement = (()=>{
        return {
            type: "calendar"+ props.calNum+"/setChoosedMonth",
            payload: Number(choosedMonth)+1
        }
    })

    const monthChoose = ((value)=>{
        return {
            type: "calendar"+ props.calNum+"/setChoosedMonth",
            payload: monthNames.find(mN => mN.monthName === value).index
        }
    })

    const monthToBegin = (()=>{
        return {
            type: "calendar"+ props.calNum+"/setChoosedMonth",
            payload: 1
        }
    })

    const monthToEnd = (()=>{
        return {
            type: "calendar"+ props.calNum+"/setChoosedMonth",
            payload: 12
        }
    })

    return <div className="calendar">
          
         <div className="calendar--def-item-cont">
             <div 
                className="calendar--def-item-cont--input actual-item-cont"
                onClick={()=>dispatch(setIsOpen())}>
            </div>
            <div className="btn" onClick={()=>dispatch(setIsOpen())}>
                <FontAwesomeIcon icon={faCalendarDays} />
            </div>
        </div>
        {isOpen ?
        <OpenCalendarList className='calendar-body'>
            <div className='control-elements'>
                <div className='control-left' onClick={()=>leftDown()}><FontAwesomeIcon icon={faAngleLeft} /></div>
                <div className='control-home' ><FontAwesomeIcon icon={faHouse} /></div>
               
                <select 
                    value={monthNames.find(mN => mN.index === choosedMonth).monthName}
                    onChange={(e)=>{
                        dispatch(monthChoose(e.target.value))
                        dispatch(setCurrentMonth())
                        }}>
                    {monthNames.map && monthNames.map((item, index)=>
                        (<option key={index}>{item.monthName}</option>)
                    )}
                </select>
                <select 
                    value={choosedYear} 
                    onChange={(e)=>{
                        dispatch(yearChoose(e.target.value))
                        dispatch(setCurrentMonth())
                        }}>
                    {yearsNames.map && yearsNames.map((item, index)=>
                        (<option key={index} 
                        >{item}</option>)
                    )}
                </select>
                <div className='control-right' onClick={()=>rightDown()}><FontAwesomeIcon icon={faAngleRight} /></div>
            </div>
            <div className='calendar-weektitles'>
                {weekDaysNames.map && weekDaysNames.map((weekDayName, i) => (
                    <div key={i} className='calendar-weekdayname'>{weekDayName}</div>
                ))}
            </div>
            {
                currentMonth.map && 
                currentMonth.map((week, i) => (
                    <div key={i} className='calendar-week'>
                    {week.map && week.map((day, j)=>(
                        <div key={j} className='calendar-day'>
                            {day.day}
                        </div>
                    ))}
                    </div>
                ))
           }
        </OpenCalendarList>
        : <CloseCalendarList></CloseCalendarList>
        }
    </div>
}