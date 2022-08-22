import Switch from "./switch"
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'

import loadable from '@loadable/component'
const LangSelect = loadable(() => import('./langselect'));

export default function Footer(){
    
    const  currentTheme  = useSelector((state) => state['theme'].actualTheme)
    return <footer className={currentTheme}>
        <div className="container">
            <div className="row">
                
                <div className="col-6">
                    <Switch></Switch>
         
                    
                </div>
                <div className="col-6 lang-cont flex-right">
                    <FontAwesomeIcon icon={faGlobe} className="lang-icon"/>
                    <LangSelect></LangSelect>
                </div>
            </div>
        </div>
        

    </footer>
}