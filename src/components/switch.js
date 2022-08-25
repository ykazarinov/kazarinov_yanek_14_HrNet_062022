import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from "react-redux";

import { transcription } from '../app.config';

import { setActualTheme } from '../slices/theme.slice';
export default function Switch(props){
    const dispatch = useDispatch();
    const  currentTheme  = useSelector((state) => state['theme'].actualTheme)
    const  currentLang  = useSelector((state) => state['lang'].actualLang)
    const langData = transcription.find(lng => lng.lang === currentLang).data.footer

    const {hidden1} = useSelector((state) => state.modal1)
    const {hidden2} = useSelector((state) => state.modal2)
    const {hidden3} = useSelector((state) => state.modal3)


    return(
        <div className="switch" 
            onClick={()=>dispatch(setActualTheme())}
            tabIndex={hidden1 && hidden2 && hidden3 ? '50': '-1'}
            title={currentTheme === 'theme-light' ? langData[1]  : langData[2]}
            onKeyDown={(e) => e.keyCode === 13 ? dispatch(setActualTheme()) : null}
        >
            <div 
                className={currentTheme === 'theme-light' ? "toggle" : "toggle active"}
                
                
            >

            </div>
            <div className='icon'    >
                <FontAwesomeIcon icon={faMoon} />
            </div>
            <div className='icon'>
                <FontAwesomeIcon icon={faSun} />
            </div>

            
            
          
        </div>
        
    )
}