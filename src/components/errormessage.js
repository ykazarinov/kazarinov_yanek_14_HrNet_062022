import { useSelector } from "react-redux";
export default function ErrorMessage(props) {
    const message = useSelector((state) => state.message);
    
    return <div>
        { message.find(mes => mes.param ===  props.myParam) ?
            
                <div className="form-group">
                    <div className="alert alert-danger" role="alert" tabIndex={props.tabIndex}>
                        {message.find(mes => mes.param ===  props.myParam).msg} 
                    </div>
                </div>
        : ''}  
        
    </div>
}