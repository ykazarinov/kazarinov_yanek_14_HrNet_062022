import { useState } from "react"
import styled from "styled-components"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

const OpenSelectList = styled('ul')`
    display: block;`
const CloseSelectList = styled('ul')`display: none;`

export default function Select({data}){
    const [actualItem, setActualItem] = useState('Choose item...')
    const [isOpen, setIsOpen] = useState(false)
    return <div className="select">
        <div className="select--def-item-cont">
            <div 
                className="select--def-item-cont--input actual-item-cont"
                onClick={()=>setIsOpen(isOpen === true ? false : true )}>{actualItem}</div>
            <button onClick={()=>setIsOpen(isOpen === true ? false : true )}>
                <FontAwesomeIcon icon={faAngleDown} />
               
            </button>
        </div>
        
        {isOpen ?
        <OpenSelectList>
            {data.map && data.map((item, index)=>
                (<li key={index} onClick={
                    ()=>{setActualItem(item)
                        setIsOpen(false)

                    }

                    
                }>{item}</li>)
            )}
            
        </OpenSelectList>
        : <CloseSelectList></CloseSelectList>
        }
    </div>
}