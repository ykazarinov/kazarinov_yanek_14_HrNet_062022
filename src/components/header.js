import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIdCard, faUserCircle, faSignOut } from '@fortawesome/free-solid-svg-icons'

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/auth";

import { transcription } from '../app.config';

import handleDeleteFile from "../resurces/deletefile";
import { setImageUrl } from "../slices/employee.slice";

export default function Headers(){

    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.auth)

    const  currentLang  = useSelector((state) => state['lang'].actualLang)
    const langData = transcription.find(lng => lng.lang === currentLang).data.header
    const {imageUrl} = useSelector((state) => state.newEmployee)

    const {hidden1} = useSelector((state) => state.modal1)
    const {hidden2} = useSelector((state) => state.modal2)
    const {hidden3} = useSelector((state) => state.modal3)

    const clickAndImageDelete = (()=>{
        if(imageUrl !== ''){
            handleDeleteFile(imageUrl)
            dispatch(setImageUrl(''))
        }
    })
    
    const  currentTheme  = useSelector((state) => state['theme'].actualTheme)
    return (
        <header className={currentTheme}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-4 col-sm-6 logo-cont">
                        <div className="logo">
                            <Link 
                                to='/employees'
                                onClick={clickAndImageDelete} 
                                tabIndex={hidden1 && hidden2 && hidden3 ? '1': '-1'} 
                            >
                                <FontAwesomeIcon icon={faIdCard} /> HR<span>Net</span>
                            </Link>
                        </div>
                       
                    </div>
                
                    
                    <div className="col-lg-8 col-sm-6 flex-right">
                        
                    {isLoggedIn ? (
                        user.email === null ? ( 
                            <p>Loading profile...</p>
                        ) :(
                            <div className="authcont">
                                <Link 
                                    className="authcont-user-icon" 
                                    to="/" title={user.email}
                                    onClick={clickAndImageDelete} 
                                    tabIndex={hidden1 && hidden2 && hidden3 ? '2': '-1'}
                                >
                                    {user.email.substr(0, 1)}
                                </Link>
                
                                <button  
                                    className="authcont-text" 
                                    onClick={()=>(
                                        clickAndImageDelete(), 
                                        dispatch(logout())
                                        
                                    )}
                                    tabIndex={hidden1 && hidden2 && hidden3 ? '2': '-1'}
                                >
                                    <FontAwesomeIcon icon={faSignOut} />
                                    {langData[1]} 
                                </button>
                            </div>
                        )
                    ) : (
                        <div className="authcont">
                            <Link className='user-icon' to="/" tabIndex={hidden1 && hidden2 && hidden3 ? '2': '-1'}>
                                <FontAwesomeIcon icon={faUserCircle}   />
                            </Link>
                            <Link className="authcont-text" to="/" tabIndex={hidden1 && hidden2 && hidden3 ? '2': '-1'} >
                                {langData[0]} 
                            </Link>
                        </div>
            )} 
                    </div>
                </div>
            </div>
        </header>)
}