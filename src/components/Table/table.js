export default function Table(props){
    return (
        <div className="table-cont">
            {props.data && props.data.map((item, index)=>(
                <div key={index}>{item}</div>
            ))}
        </div>
    )
}