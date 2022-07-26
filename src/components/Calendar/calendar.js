import styled from "styled-components"
// import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faAngleLeft, faAngleRight, faHouse } from '@fortawesome/free-solid-svg-icons'

import { useSelector, useDispatch } from "react-redux";

import { setIsOpen1, setIsOpen2 } from "../../slices/calendar.slice";
import { setOpen1, setOpen2 } from "../../slices/calendar.slice";
import { setCurrentMonth1, setCurrentMonth2 } from "../../slices/calendar.slice";
import { setChoosedDay1, setChoosedDay2 } from "../../slices/calendar.slice";
import { setClose1, setClose2 } from "../../slices/calendar.slice";
import { setInputDate1, setInputDate2 } from "../../slices/calendar.slice";
import { useEffect } from "react";

import { Field } from "formik";

import{today} from '../../app.config'
import {conf} from '../../app.config.js'

const OpenCalendarList = styled('div')`
    display: block;`
const CloseCalendarList = styled('div')`display: none;`


export default function Calendar(props){
    
    
    let globalCurrentDay

    props.calNum === 1
        ? globalCurrentDay = new Date(today.getFullYear() - conf.employeeMinAge, today.getMonth(), today.getDate())
        : globalCurrentDay = today


    const dispatch = useDispatch();

    const setIsOpen = (()=>{ return props.calNum === 1 ? setIsOpen1() : setIsOpen2()})
    const setOpen = (()=>{ return props.calNum === 1 ? setOpen1() : setOpen2()})
    const setClose = (()=>{ return props.calNum === 1 ? setClose1() : setClose2()})
    const setCurrentMonth = (()=>{ return props.calNum === 1 ? setCurrentMonth1() : setCurrentMonth2()})
    const setChoosedDay = (()=>{ return props.calNum === 1 ? setChoosedDay1() : setChoosedDay2()})
    const setInputDate = (()=>{return props.calNum === 1 ? setInputDate1() : setInputDate2()})

    const  choosedMonth  = useSelector((state) => state['calendarReducer' + props.calNum])['choosedMonth'+props.calNum]
    const  choosedYear  = useSelector((state) => state['calendarReducer' + props.calNum])['choosedYear'+props.calNum]
    const  isOpen  = useSelector((state) => state['calendarReducer' + props.calNum])['isOpen'+props.calNum]
    const  open  = useSelector((state) => state['calendarReducer' + props.calNum])['open'+props.calNum]
    const  currentMonth  = useSelector((state) => state['calendarReducer' + props.calNum])['currentMonth'+props.calNum]
    const  choosedDay = useSelector((state) => state['calendarReducer' + props.calNum])['choosedDay'+props.calNum]
    const  inputDate = useSelector((state) => state['calendarReducer' + props.calNum])['inputDate'+props.calNum]

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
        for(let i=globalCurrentDay.getFullYear(); i>=1900; i--){
            yearsNames.push(i)
        }

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

    const monthChooseNumber = ((value)=>{
        return {
            type: "calendar"+ props.calNum+"/setChoosedMonth",
            payload: value
        }
    })

    const exeptionMonth = ((value)=>{
        return{
            type: "calendar"+ props.calNum+"/setChoosedMonth",
            payload: Number(value)
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

    const returnDay = ((myDay) => {
        return {
            type: "calendar"+ props.calNum+"/setChoosedDay",
            payload: myDay
        }
    })

    const home = (()=>{
        dispatch(returnDay(globalCurrentDay.getDate()))
        dispatch(yearChoose(globalCurrentDay.getFullYear()))
        dispatch(monthChooseNumber(globalCurrentDay.getMonth() + 1))
        dispatch(setCurrentMonth())
    })

    const inputDateFromCalendar = ((date)=>{
        return {
            type: "calendar"+ props.calNum+"/setInputDate",
            payload: date
        }
    })

    const frenchFormatDate = ((myDay, myMonth, myYear) => {
        return (myDay < 10 ? ('0' + myDay): myDay) + '/' + (myMonth < 10 ? ('0' + myMonth) : myMonth) + '/' + myYear
    })

    const exeptionDate = ((myChoosedDay, myChoosedMonth, myCurrentMonth)=>{
      
        let indexOfLastWeek = myCurrentMonth.length -1
        let lastWeekCurrentMonth = myCurrentMonth[indexOfLastWeek].filter(obj => Number(obj.month) === Number(myChoosedMonth))
        let lastDate = lastWeekCurrentMonth[lastWeekCurrentMonth.length - 1]
              
        if(Number(myChoosedMonth) === Number(lastDate.month) &&
            Number(myChoosedDay) > Number(lastDate.day)){
            return Number(lastDate.day) 
        }else{
            return Number(myChoosedDay)
        }
    })

    const leftDown = (() => {
        
        if(Number(choosedMonth) === 1){
            dispatch(yearDecrement())
            dispatch(monthToEnd())
        }else{
            dispatch(monthDecrement())
        }
        dispatch(setCurrentMonth())
    })

    const rightDown = (() => {
        if(!isFutureDate(choosedDay, choosedMonth+1, choosedYear)){
            if(Number(choosedMonth) === 12){
                dispatch(yearExcrement())
                dispatch(monthToBegin())
            }else{
                dispatch(monthExcrement())
            }
            dispatch(setCurrentMonth())
        }

        
    })



    
    useEffect(()=>{
        dispatch(returnDay(exeptionDate(choosedDay, choosedMonth, currentMonth)))
       
    }, [currentMonth])


    useEffect(()=>{
        if(inputDate !== ''){
            dispatch(inputDateFromCalendar(frenchFormatDate(
                exeptionDate(choosedDay, choosedMonth, currentMonth),
                choosedMonth,
                choosedYear
            )))
        }
        
       
    }, [currentMonth])


    const monthSelectDown = ((newMonth) =>{
        let newMonthIndex = monthNames.find(mN => mN.monthName === newMonth).index
        dispatch(monthChoose(newMonth))
        dispatch(setCurrentMonth())
    })

    const yearSelectDown = ((newYear) => {
        dispatch(yearChoose(newYear))
        dispatch(setCurrentMonth())

    })

    const isFutureDate = ((day, month, year)=>{
        // let realDate
        // let today = new Date()

        // if(props.employeeMinAge){
        //     realDate = new Date(today.getFullYear() - props.employeeMinAge, today.getMonth(), today.getDate())
            
        // }else{
        //     realDate = new Date()
        // }

        let myDate = new Date(year, Number(month)-1, Number(day))
        return myDate > globalCurrentDay ?
            true :
            false
    })

    

    return <div className="calendar">
          
        <div className="calendar--def-item-cont">
            <Field type='text'
                className="calendar--def-item-cont--input actual-item-cont"
                onClick={()=>dispatch(setOpen())} 
                maxLength='10'
                value={inputDate}
                onFocus={()=> dispatch(setOpen())}
                onBlur={(e)=>{
                    
                    const str = e.target.value
                    const myMask = str.match(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/)
                    if(myMask === null ||
                        isFutureDate(
                            Number(e.target.value.substr(0,2)), 
                            Number(e.target.value.substr(3,2)),
                            Number(e.target.value.substr(6,4))
                        ) ){
                        // let myDate = new Date()
                        let myDay = globalCurrentDay.getDate()
                        let myMonth = globalCurrentDay.getMonth() +1
                        let myYear = globalCurrentDay.getFullYear()
                        dispatch(returnDay(myDay)) 
                        dispatch(monthChooseNumber(myMonth))
                        dispatch(yearChoose(myYear))
                        dispatch(setCurrentMonth())
                        dispatch(inputDateFromCalendar(frenchFormatDate(myDay, myMonth, myYear)))
                         e.target.value = inputDate
                    }
                }
                }
                onChange={(e)=>{
                    const str = e.target.value
                    const myMask = str.match(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/)
                    dispatch(inputDateFromCalendar(e.target.value))
                    if(myMask  && 
                        !isFutureDate(
                            Number(e.target.value.substr(0,2)), 
                            Number(e.target.value.substr(3,2)),
                            Number(e.target.value.substr(6,4))
                        ) 
                        ){

                        let day = e.target.value.substr(0, 2)
                        let month = Number(e.target.value.substr(3, 2))
                        let year = e.target.value.substr(6, 4)

                        dispatch(returnDay(day)) 
                        dispatch(monthChooseNumber(month))
                        dispatch(yearChoose(year))
                        dispatch(setCurrentMonth())
                        dispatch(inputDateFromCalendar(frenchFormatDate(day, month, year)))
                        e.target.value = inputDate
                    }
                }}
                onKeyUp={
                    (e)=>{
                        let myStr = e.target.value
                        // prohibition to enter any characters except numbers and slash
                        e.target.value = myStr.replace(/[^0-9/]/g,'')
                        // key 'Enter'
                        if(e.keyCode === 13){
                            
                            const myMask = myStr.match(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/)

                            if(myMask === null ||
                                isFutureDate(
                                    Number(e.target.value.substr(0,2)), 
                                    Number(e.target.value.substr(3,2)),
                                    Number(e.target.value.substr(6,4))
                                ) 
                                ){
                                // let date = new Date()
                                dispatch(inputDateFromCalendar(frenchFormatDate(
                                    globalCurrentDay.getDate(), 
                                    Number(globalCurrentDay.getMonth()) + 1, 
                                    globalCurrentDay.getFullYear()
                                    )))
                                dispatch(setClose())
                            }
                            dispatch(setClose())
                        }
                        // key '/'
                        if(e.keyCode === 190){
                            let previousValue = e.target.value
                            e.target.value = previousValue
                            // reassign so that it works again next time
                            previousValue = e.target.value
                        }

                        // add '/' after day
                        if(e.target.value.substr(1,1)  && !e.target.value.substr(2,1) && e.keyCode !== 8)
                            {
                                e.target.value = myStr + '/'
                                dispatch(inputDateFromCalendar(e.target.value))
                            }

                        // add '/' after month
                        if(e.target.value.substr(4,1) && !e.target.value.substr(5,1) && e.keyCode !== 8)
                            {
                                e.target.value = myStr + '/'
                                dispatch(inputDateFromCalendar(e.target.value))
                            }

                        // delete '/' when you delete symbols
                        if(myStr.slice(-1) === '/'){
                            e.target.value = myStr.substr(0, myStr.length - 1)
                        }
                    }
                }
            />
                    
            
            <div className="select-btn" onClick={()=>dispatch(setIsOpen())}>
                <FontAwesomeIcon icon={faCalendarDays} />
            </div>
        </div>
        {isOpen ?
        <OpenCalendarList className='calendar-body'>
            <div className='control-elements'>
                <div className='control-left' onClick={()=>{
                    leftDown()
                    }}><FontAwesomeIcon icon={faAngleLeft} /></div>
                <div className='control-home' onClick={()=>home()} ><FontAwesomeIcon icon={faHouse} /></div>
               
                <select 
                    value={monthNames.find(mN => mN.index === choosedMonth).monthName}
                    onChange={(e)=>{
                        monthSelectDown(e.target.value)
                        
                    }}>
                    {monthNames.map && monthNames.map((item, index)=>
                        (<option key={index}>{item.monthName}</option>)
                    )}
                </select>
                <select 
                    value={choosedYear} 
                    onChange={(e)=>{
                        yearSelectDown(e.target.value)
                    }}>
                    {yearsNames.map && yearsNames.map((item, index)=>
                        (<option key={index} 
                        >{item}</option>)
                    )}
                </select>
                <div 
                    className={
                        !isFutureDate(choosedDay, choosedMonth+1, choosedYear) ?
                       'control-right'  :
                       'control-right desactive'
                    }
                    onClick={()=>
                        rightDown()
                    }
                >
                    <FontAwesomeIcon icon={faAngleRight} /></div>
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
                        <div 
                            key={j} 
                            className={
                                isFutureDate(Number(day.day), Number(day.month), day.year) ? 'calendar-day disactive':
                                day.day == choosedDay && Number(day.month) === Number(choosedMonth) ? 'calendar-day active' : // if 
                                day.day != choosedDay && Number(day.month) === Number(choosedMonth) ? 'calendar-day'  : // else if 
                                'calendar-day disactive' // else if
                                
                        }
                            onClick={()=>{
                               
                                if(!isFutureDate(day.day, day.month, day.year)){
                                    dispatch(returnDay(day.day)) 
                                    dispatch(yearChoose(day.year))
                                    dispatch(exeptionMonth(currentMonth[i][j].month))
                                    dispatch(setCurrentMonth())
                                    dispatch(inputDateFromCalendar(frenchFormatDate(day.day, Number(day.month), day.year)))
                                    dispatch(setClose())
                                }
                            }}
                            
                        >
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