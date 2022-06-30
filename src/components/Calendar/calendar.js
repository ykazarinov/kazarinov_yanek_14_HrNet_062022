import styled from "styled-components"
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faAngleLeft, faAngleRight, faHouse } from '@fortawesome/free-solid-svg-icons'

import { useSelector, useDispatch } from "react-redux";

import { setChoosedYear1, setChoosedYear2 } from "../../slices/calendar.slice";
import { setIsOpen1, setIsOpen2 } from "../../slices/calendar.slice";




import Select from "../Select/select"

const OpenCalendarList = styled('div')`
    display: block;`
const CloseCalendarList = styled('div')`display: none;`

// function trueOrFalse(isOpen){
//     return isOpen === true ? false : true
// }

// splitting an array into subarrays
const subarrayCreator = ((myArray, size)=>{
    let subarray = [];
    for (let i = 0; i <Math.ceil(myArray.length/size); i++){
        subarray[i] = myArray.slice((i*size), (i*size) + size);
    }
    return (subarray)
})

// create array of empty dates before current month
const emptyDatesBefore = ((year, month) => {
    let firstWeekDay = new Date(year, month-1, 1).getDay()
    let countDaysBefore = 6 - firstWeekDay
    let emptyDays = []
    for(let i=1; i< countDaysBefore ; i++){
        emptyDays.push({})
    }
    return emptyDays
})

// create array of empty dates after current month
const emptyDatesAfter = ((lastWeek)=>{
    // console.log(lastWeek.length)
    // let countDaysAfter = 7 - lastWeek.length

    // let emptyDays = []
    // for(let i=0; i< countDaysAfter ; i++){
    //     emptyDays.push({})
    // }

    // return emptyDays
    return 2

})

// create array of array (weeks) of objects (days) with dates of given month of given year
const monthDates = ((year, month) => {

    var myDate = new Date(year, month-1, 1)
    var myMonth = myDate.getMonth() + 1
    var end = new Date(myDate.getFullYear(), myMonth, 0).getDate(); 
    var result = [];
    let firstDayOfCurrentMonth

    // 1. create array of dates
    for(let i = 1; i <= end; i++){
        firstDayOfCurrentMonth = new Date(new Date().setDate(i));
        result.push(
        {
            day: i < 10 ? '0'+ i : String(i),
            weekDay: firstDayOfCurrentMonth.getDay(),
            month: myMonth < 10 ? '0' + myMonth : myMonth,
            year: myDate.getFullYear()
        })
    }

    // 2. create array of empty dates before
    let emptyDaysBefore = emptyDatesBefore(year, month)
    // 2.1 and add this dates before main array
    for(let i = 0; i< emptyDaysBefore.length; i++){
        result.unshift(emptyDaysBefore[i])
    }

    // 3. create array of empty dates after
    let groupedResult = subarrayCreator(result, 7)
    let emptyDaysAfter = emptyDatesAfter(groupedResult[[groupedResult.length - 1]])
    // 3.1 and add this dates after main array
    for(let i = 0; i< emptyDaysAfter.length; i++){
        result.push(emptyDaysAfter[i])
    }
    // 4. grouping dates by week
    groupedResult = subarrayCreator(result, 7)

    return(groupedResult)
})



export default function Calendar(props){

    const currentDay = new Date()

    const dispatch = useDispatch();
    const  choosedYear  = useSelector((state) => state['calendarReducer' + props.calNum])['choosedYear'+props.calNum]
    const  isOpen  = useSelector((state) => state['calendarReducer' + props.calNum])['isOpen'+props.calNum]

    const setIsOpen = (()=>{ return props.calNum === 1 ? setIsOpen1() : setIsOpen2()})
    const setChoosedYear = (()=>{ return props.calNum === 1 ? setChoosedYear1() : setChoosedYear2()})

    // const [choosedYear, setChoosedYear] = useState(currentDay.getFullYear())
    const [choosedMonth, setChoosedMonth] = useState(currentDay.getMonth() + 1)
    const [choosedDay, setChoosedDay] = useState(currentDay.getDate())

    const [currentMonth, setCurrentMonth] = useState(monthDates(choosedYear, choosedMonth))

    const weekDaysNames = [ 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di']
    const monthNames = [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre']
    const yearsNames = []
        for(let i=currentDay.getFullYear(); i>=1900; i--){
            yearsNames.push(i)
        }

    // const [isOpen, setIsOpen] = useState(false)



    const leftDown = (() => {
        dispatch(yearDecrement())
        // if(choosedMonth === 1){
        //     setChoosedMonth(12)
            
        //     setCurrentMonth(monthDates(choosedYear, choosedMonth))
        // }else{
        //     setChoosedMonth(choosedMonth - 1)
        //     setCurrentMonth(monthDates(choosedYear, choosedMonth))
        // }
    })

    const rightDown = (() => {
        dispatch(yearExcrement())
        // if(choosedMonth === 12){
            
        //     setChoosedMonth(1)
        //     setCurrentMonth(monthDates(choosedYear, choosedMonth))

        // }else{
        //     setChoosedMonth(choosedMonth + 1)
        //     setCurrentMonth(monthDates(choosedYear, choosedMonth))
        // }
    })

    const yearDecrement = (()=>{
        return {
            type: "calendar"+ props.calNum+"/setChoosedYear",
            payload: choosedYear-1
        }
    })

    const yearExcrement = (()=>{
        return {
            type: "calendar"+ props.calNum+"/setChoosedYear",
            payload: choosedYear+1
        }
    })

    const yearChoose = ((value)=>{
        return {
            type: "calendar"+ props.calNum+"/setChoosedYear",
            payload: value
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
               
                {/* <Select 
                    data={monthNames} 
                    id='month' 
                    prefix='calsel' 
                    // calNum={3}
                    >
                </Select>
                <Select 
                    data={yearsNames} 
                    id='year' 
                    prefix='calsel' 
                    // calNum={4}
                    defaultValue={choosedYear}>
                </Select> */}
                <select>
                    {monthNames.map && monthNames.map((item, index)=>
                        (<option key={index}>{item}</option>)
                    )}
                </select>
                <select value={choosedYear} onChange={(e)=>{dispatch(yearChoose(e.target.value))}}>
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