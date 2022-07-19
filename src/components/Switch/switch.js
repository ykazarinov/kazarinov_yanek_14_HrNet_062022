import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from "react-redux";

import { setActualTheme } from '../../slices/theme.slice';
export default function Switch(props){
    const dispatch = useDispatch();
    const  currentTheme  = useSelector((state) => state['theme'].actualTheme)


    return(
        <div className="switch"
            onClick={()=>dispatch(setActualTheme())}
        >
            <div 
                className={currentTheme === 'theme-light' ? "toggle" : "toggle active"}
                
            >

            </div>
            <div className='icon'>
                <FontAwesomeIcon icon={faMoon} />
            </div>
            <div className='icon'>
                <FontAwesomeIcon icon={faSun} />
            </div>

            
            
            <input type="checkbox" />
        </div>
        
    )
}