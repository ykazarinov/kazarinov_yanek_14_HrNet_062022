import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

import { useSelector, useDispatch } from "react-redux";

import {    
    setIsOpen1, 
    setIsOpen2,
} from "../slices/select.slice";

const OpenSelectList = styled('ul')`display: block;`
const CloseSelectList = styled('ul')`display: none;`

export default function Select( props ){

    const dispatch = useDispatch();
    const  actualItem  = useSelector((state) => state['selectReducer' + props.calNum])['actualItem'+props.calNum]
    const  isOpen  = useSelector((state) => state['selectReducer' + props.calNum])['isOpen'+props.calNum]

    const setIsOpen = (()=>{ 
        switch(props.calNum){
            case 1: return setIsOpen1() 
            case 2: return setIsOpen2() 
            default: return
        }
    })

    const changeItem = ((item)=>{
        return {
            type: "select"+ props.calNum+"/setActualItem",
            payload: item
        }
    })

    return <div className={props.prefix}>
        <div className={props.prefix + "--def-item-cont"}>
            <input 
                tabIndex={props.tabIndex}
                name={props.fieldName}
                id={props.fieldName}
                className={props.prefix + "--def-item-cont--input actual-item-cont"}
                onClick={()=>dispatch(setIsOpen())}
                value={actualItem}
                readOnly
                />
            
            <div className="select-btn" onClick={()=>dispatch(setIsOpen())}>
                <FontAwesomeIcon icon={faAngleDown} />
            </div>
        </div>
        
        {isOpen ?
        <OpenSelectList>
            {props.data.map && props.data.map((item, index)=>
                ( props.calNum === 1 ?
                <li key={index} onClick={()=>dispatch(changeItem(item.stateName))}>{item.stateName}</li>
                : <li key={index} onClick={()=>dispatch(changeItem(item.departmentName))}>{item.departmentName}</li>
                )
                
            )}
        </OpenSelectList>
       
        : <CloseSelectList></CloseSelectList>
        }
    </div>
}