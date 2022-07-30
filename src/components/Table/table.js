export default function Table(props){
    console.log(props.data)
    return (
        <table className="table-cont">
           <thead>
                <tr role='row'>
                    { Object.keys(props.data[0]).map((objKey, index)=>(
                            objKey === '_id' ||
                            objKey === 'user' ||
                            objKey === 'createdAt' ||
                            objKey === 'updatedAt' ||
                            objKey === '__v' ?
                            null : <th key={index}>{objKey}</th>
                            
                            
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {props.data.map((emplObj, index)=>(
                    
                    <tr role='row' 
                        key={`row` + index}
                        className={index % 2 == 0 ? `dark` : `light`}
                    >

                        {Object.keys(emplObj).map((myKey, index)=>(
                             myKey === '_id' ||
                             myKey === 'user' ||
                             myKey === 'createdAt' ||
                             myKey === 'updatedAt' ||
                             myKey === '__v' ?
                             null : <td key={`val`+index}>
                                {
                                Array.isArray(Object.values(emplObj)[index]) && myKey === 'state' ? 
                                    Object.values(emplObj)[index][0].stateName :
                                Array.isArray(Object.values(emplObj)[index]) && myKey === 'department' ? 
                                    Object.values(emplObj)[index][0].departmentName :
                                String(Object.values(emplObj)[index])
                                
                                }
                             </td>
                        ))}
                    </tr>
                ))}
                
            </tbody>
          
        </table>
    )
}