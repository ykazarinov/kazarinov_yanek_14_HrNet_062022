import styled from "styled-components"

import { useSelector, useDispatch } from "react-redux";

import { setActualItem } from "../../slices/select.slice";
import { setIsOpen } from "../../slices/select.slice";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

const OpenSelectList = styled('ul')`
    display: block;`
const CloseSelectList = styled('ul')`display: none;`

export default function Select({data}){

    const dispatch = useDispatch();
    const { actualItem } = useSelector((state) => state.actualItem);
    const { isOpen } = useSelector((state) => state.isOpen)

    return <div className="select">
        <div className="select--def-item-cont">
            <div 
                className="select--def-item-cont--input actual-item-cont"
                onClick={()=>dispatch(setIsOpen())}>{actualItem}</div>
            <div className="btn" onClick={()=>dispatch(setIsOpen())}>
                <FontAwesomeIcon icon={faAngleDown} />
            </div>
        </div>
        
        {isOpen ?
        <OpenSelectList>
            {data.map && data.map((item, index)=>
                (<li key={index} onClick={()=>{dispatch(setActualItem(item))}}>{item}</li>)
            )}
        </OpenSelectList>
        : <CloseSelectList></CloseSelectList>
        }
    </div>
}