import Switch from "../Switch/switch"
import { useSelector } from "react-redux";


export default function Footer(){
    const  currentTheme  = useSelector((state) => state['theme'].actualTheme)
    return <footer className={currentTheme}>
        <div className="container">
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6 flex-center">
                    <Switch></Switch>
                </div>
                <div className="col-3"></div>
            </div>
        </div>
        

    </footer>
}