import styled from "styled-components"
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

const OpenSelectList = styled('ul')`
    display: block;`
const CloseSelectList = styled('ul')`display: none;`

function trueOrFalse(isOpen){
    return isOpen === true ? false : true
}



export default function Select( props ){

    const [actualItem, setActualItem] = useState('Choose item...')
    const [isOpen, setIsOpen] = useState(false)

    useEffect(()=>{
        setIsOpen(false)
    }, [])

    return <div className="select">
        <div className="select--def-item-cont"
            onBlur={()=>setIsOpen(false)}
        >
            <div 
                className="select--def-item-cont--input actual-item-cont"
                onClick={()=>setIsOpen(trueOrFalse(isOpen))}
                >{actualItem}
            </div>
            <div className="btn" onClick={()=>setIsOpen(trueOrFalse(isOpen))}>
                <FontAwesomeIcon icon={faAngleDown} />
            </div>
        </div>
        
        {isOpen ?
        <OpenSelectList>
            {props.data.map && props.data.map((item, index)=>
                (<li key={index} onClick={()=>{setActualItem(item)
                     setIsOpen(trueOrFalse(isOpen))}}>{item}</li>)
            )}
        </OpenSelectList>
        : <CloseSelectList></CloseSelectList>
        }
    </div>
}