import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIdCard } from '@fortawesome/free-solid-svg-icons'
import LangSelect from '../LangSelect/langselect'


export default function Headers(){
    return (
        <header>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4 logo-cont">
                        <div className="logo">
                            <Link to='/'>
                                <FontAwesomeIcon icon={faIdCard} /> HR<span>Net</span>
                            </Link>
                        </div>
                    </div>
                
                    <div className="col-4"></div>
                    <div className="col-4 lang-cont">
                        <LangSelect></LangSelect>
                    </div>
                </div>
            </div>
        </header>)
}