import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIdCard } from '@fortawesome/free-solid-svg-icons'

export default function Headers(){
    return <header className="container-fluid">
        <div className="row">
            <div className="col-12">
                <div className="logo">
                    <Link to='/'>
                        <FontAwesomeIcon icon={faIdCard} /> HR<span>Net</span>
                    </Link></div>
                </div>
            </div>
        </header>
}