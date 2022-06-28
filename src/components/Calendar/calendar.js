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

const monthDates = (() => {
    var today = new Date(); // current date
    var currentMonth = today.getMonth() + 1
    var end = new Date(today.getFullYear(), currentMonth, 0).getDate(); // end date of month
    var result = [{}];
    
    let firstDayOfCurrentMonth
    for(let i = 1; i <= end; i++){
        firstDayOfCurrentMonth = new Date(new Date().setDate(i));
       result.push(
        {
            day: i < 10 ? '0'+ i : String(i),
            weekDay: firstDayOfCurrentMonth.getDay(),
            month: currentMonth < 10 ? '0' + currentMonth : currentMonth,
            year: today.getFullYear()
        })
    }
    
    return(result)
})

console.log(monthDates())

export default function Calendar(){

    const [actualItem, setActualItem] = useState('Choose item...')
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
           111
        </OpenCalendarList>
        : <CloseCalendarList></CloseCalendarList>
        }
    </div>
}