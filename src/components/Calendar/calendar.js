import styled from "styled-components"
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'

const OpenCalendarList = styled('div')`
    display: block;`
const CloseCalendarList = styled('div')`display: none;`

function trueOrFalse(isOpen){
    return isOpen === true ? false : true
}

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
    let countDaysAfter = 7 - lastWeek.length

    let emptyDays = []
    for(let i=0; i< countDaysAfter ; i++){
        emptyDays.push({})
    }

    return emptyDays

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



export default function Calendar(){

    const currentDay = new Date()

    const [choosedYear, setChoosedYear] = useState(currentDay.getFullYear())
    const [choosedMonth, setChoosedMonth] = useState(currentDay.getMonth() + 1)
    const [choosedDay, setChoosedDay] = useState(currentDay.getDate())

    const weekDaysNames = [ 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di']

    const [isOpen, setIsOpen] = useState(false)

    return <div className="calendar">
        <div className="calendar--def-item-cont">
            <div 
                className="calendar--def-item-cont--input actual-item-cont"
                onClick={()=>setIsOpen(trueOrFalse(isOpen))}>
            </div>
            <div className="btn" onClick={()=>setIsOpen(trueOrFalse(isOpen))}>
                <FontAwesomeIcon icon={faCalendarDays} />
            </div>
        </div>
        {isOpen ?
        <OpenCalendarList className='calendar-body'>
            <div className='calendar-weektitles'>
                {weekDaysNames.map && weekDaysNames.map((weekDayName, i) => (
                    <div key={i} className='calendar-weekdayname'>{weekDayName}</div>
                ))}
            </div>
            {
                monthDates(choosedYear, choosedMonth).map && 
                monthDates(choosedYear, choosedMonth).map((week, i) => (
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