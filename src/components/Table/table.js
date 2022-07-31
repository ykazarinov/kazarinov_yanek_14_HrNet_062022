import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

import {setSortDirection} from '../../slices/getAllEmployees.slice';
import { useDispatch, useSelector } from 'react-redux';

export default function Table(props){
    console.log(props.data)
    const dispatch = useDispatch()
    const {sort} = useSelector((state)=>state.allEmployees)
    const {sortDirection} = useSelector((state)=>state.allEmployees)
    const setTableSort = ((date)=>{
        return {
            type: "allEmployees/setSort",
            payload: date
        }
    })

    function byField(field, sortDirection) {
        let result
        sortDirection === 'ascending' ?
        result = ((a, b) => a[field] > b[field] ? 1 : -1) :
        result = ((a, b) => b[field] > a[field] ? 1 : -1)
        return result
    }

    const sorting = ((e) => {
       
        if(e.target.innerText === sort){
            dispatch(setSortDirection())
        }
        dispatch(setTableSort(e.target.innerText))

    })
    
    let arrayForSort = [...props.data]
    let tempArray = arrayForSort.sort(byField(sort, sortDirection))
    return (
        <table className="table-cont">
           <thead>
                <tr 
                    role='row'
                    onClick={(e) => sorting(e)}
                >
                    { Object.keys(tempArray[0]).map((objKey, index)=>(
                            objKey === '_id' ||
                            objKey === 'user' ||
                            objKey === 'createdAt' ||
                            objKey === 'updatedAt' ||
                            objKey === '__v' ?
                            null : 
                            <th key={index} className='title'>
                                {objKey}
                                {
                                    sort === objKey && sortDirection === 'ascending' ?
                                        <FontAwesomeIcon icon={faAngleDown} className='arrow' /> : 
                                    sort === objKey && sortDirection === 'descending' ? 
                                        <FontAwesomeIcon icon={faAngleUp} className='arrow' /> :
                                    null
                                }
                                
                            </th>
                            
                            
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {tempArray.map((emplObj, index)=>(
                    
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