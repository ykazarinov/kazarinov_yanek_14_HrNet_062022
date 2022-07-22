import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIdCard } from '@fortawesome/free-solid-svg-icons'


import { faUserCircle, faSignOut } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/auth";

import { transcription } from '../../app.config';


export default function Headers(){

    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.auth)

    const  currentLang  = useSelector((state) => state['lang'].actualLang)
    const langData = transcription.find(lng => lng.lang === currentLang).data.header

    // function for logout
    const myLogout = () => {
        dispatch(logout())
    }
    
    const  currentTheme  = useSelector((state) => state['theme'].actualTheme)
    return (
        <header className={currentTheme}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4 logo-cont">
                        <div className="logo">
                            <Link to='/'>
                                <FontAwesomeIcon icon={faIdCard} /> HR<span>Net</span>
                            </Link>
                        </div>
                    </div>
                
                    
                    <div className="col-8 flex-right">
                        
                    {isLoggedIn ? (
                        user.email === null ? ( 
                            <p>Loading profile...</p>
                        ) :(
                            <div className="authcont">
                                <Link className="authcont-user-icon" to="/" title={user.email}>
                                    {user.email.substr(0, 1)}
                                </Link>
                
                                <button  className="authcont-text" onClick={myLogout}>
                                    <FontAwesomeIcon icon={faSignOut} />
                                    {langData[1]} 
                                </button>
                            </div>
                        )
                    ) : (
                        <div className="authcont">
                            <Link className='user-icon' to="/">
                                <FontAwesomeIcon icon={faUserCircle}   />
                            </Link>
                            <Link className="authcont-text" to="/" >
                                {langData[0]} 
                            </Link>
                        </div>
            )} 
                    </div>
                </div>
            </div>
        </header>)
}