import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
export default function Button(props){
    const  currentTheme  = useSelector((state) => state['theme'].actualTheme)
    return (<React.StrictMode>
        {props.datatype === 'button' ?
            <button 
                type="button" 
                className={currentTheme === 'theme-light' ?
                    `btn ` + props.bgColor + ' ' + props.addClass :
                    `btn btn-outline-dark ` + props.addClass}
            >
                {props.value}
            </button> 
            :
            <Link 
                to={props.to} 
                type="button" 
                className={currentTheme === 'theme-light' ?
                `btn ` + props.bgColor + ' ' + props.addClass :
                `btn btn-outline-dark ` + props.addClass}
            >
                {props.value}
            </Link> 

        }
        </React.StrictMode>
        
    )
}