import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp, faUserPlus, faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import {setSortDirection} from '../../slices/getAllEmployees.slice';
import { useDispatch, useSelector } from 'react-redux';
import { transcription } from '../../app.config';
import Button from '../../components/Button/button'
import PaginCountSelect from '../paginCountSelect/pagincountselect';
import Pagination from '../Pagination/pagination';
import { useEffect } from 'react';
import { getNextKeyDef } from '@testing-library/user-event/dist/keyboard/getNextKeyDef';

export default function Table(props){
    // console.log(props.data)
    const dispatch = useDispatch()
    const {sort} = useSelector((state)=>state.allEmployees)
    const {sortDirection} = useSelector((state)=>state.allEmployees)
    const {sortedArray} = useSelector((state)=>state.allEmployees)
    const {paginCount} = useSelector((state)=>state.allEmployees)
    const {employeesState} = useSelector((state)=>state.allEmployees)
    const {actualPaginNumber} = useSelector((state)=>state.allEmployees)
    const {paginatedArray} = useSelector((state)=>state.allEmployees)

    const  currentLang  = useSelector((state) => state['lang'].actualLang)
    const langData = transcription.find(lng => lng.lang === currentLang).data.employees
    const setTableSort = ((key)=>{
        return {
            type: "allEmployees/setSort",
            payload: key
        }
    })

    const createSortedArray = ((array)=>{
        return {
            type: "allEmployees/setSortedData",
            payload: array
        }
    })

    function byField(field, sortDirection) {
        let result
        sortDirection === 'ascending' ?
        result = ((a, b) => a[field] > b[field] ? 1 : -1) :
        result = ((a, b) => b[field] > a[field] ? 1 : -1)
        return result
    }

    // let arrayForSort = [...employeesState]
    // let tempArray = arrayForSort.sort(byField(sort, sortDirection))

    useEffect(()=>{
        var clone = Object.assign([], employeesState);
        // console.log(clone.sort(byField(sort, sortDirection)))
        dispatch(createSortedArray(clone.sort(byField(sort, sortDirection)))) 
 
    }, [sort, sortDirection])

    const sorting = ((objKey) => {
        if(objKey === sort){
            dispatch(setSortDirection())
        }
        dispatch(setTableSort(objKey))

        // dispatch(createSortedArray(tempArray))

    })

    const createSubarray = ((array, size)=>{
        let subarray = [];
        for (let i = 0; i <Math.ceil(array.length/size); i++){
            subarray[i] = array.slice((i*size), (i*size) + size);
        }
        return subarray;
    })
    
    const createPaginatedArray = ((array)=>{
        return {
            type: "allEmployees/setPaginatedData",
            payload: array
        }
    })

    useEffect(()=>{
        var clone = Object.assign([], sortedArray);
        let arrayByPages = createSubarray(clone, paginCount)
        // console.log(arrayByPages)
        dispatch(createPaginatedArray(arrayByPages))
    }, [sortedArray, paginCount])
    
    


    return (
        <div>

            <Button 
                datatype='link' 
                to="/addemployee" 
                bgColor="btn-primary"
                addClass='color-blue'
                value = {
                    <FontAwesomeIcon icon={faUserPlus} />
                }
            >
                
            </Button>
            <PaginCountSelect></PaginCountSelect>
            <table className="table-cont">
            <thead>
                    <tr>
                        { 
                        // paginatedArray && actualPaginNumber ?
                        Object.keys(paginatedArray[actualPaginNumber][0]).map((objKey, index)=>(
                                objKey === '_id' ||
                                objKey === 'user' ||
                                objKey === 'createdAt' ||
                                objKey === 'updatedAt' ||
                                objKey === '__v' ?
                                null : 
                                <th 
                                    key={index} 
                                    title={objKey}
                                    onClick={() => sorting(objKey)}
                                >
                                    <div className='title'>
                                        <div className='text'>
                                        
                                            {langData[1][objKey]}
                                            {/* {objKey} */}
                                        </div>
                                        
                                        {
                                            sort === objKey && sortDirection === 'ascending' ?
                                                <div className='arrow-cont'><FontAwesomeIcon icon={faAngleDown} className='arrow' /></div> : 
                                            sort === objKey && sortDirection === 'descending' ? 
                                                <div className='arrow-cont'><FontAwesomeIcon icon={faAngleUp} className='arrow' /></div> :
                                            null
                                        }
                                    </div>
                                    
                                </th>
                                
                                
                            ))
                            //  : null
                        }
                    </tr>
                </thead>
                <tbody>
                    { 
                    // paginatedArray && actualPaginNumber ? 
                    paginatedArray[actualPaginNumber].map((emplObj, index)=>(
                        
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
                                null : <td 
                                    key={`val`+index}
                                    className='data'
                                    title={
                                        Array.isArray(Object.values(emplObj)[index]) && myKey === 'state' ? 
                                            Object.values(emplObj)[index][0].stateName :
                                        Array.isArray(Object.values(emplObj)[index]) && myKey === 'department' ? 
                                            Object.values(emplObj)[index][0].departmentName :
                                        String(Object.values(emplObj)[index])
                                    }
                                >
                                    {
                                    Array.isArray(Object.values(emplObj)[index]) && myKey === 'state' ? 
                                        Object.values(emplObj)[index][0].stateName :
                                    Array.isArray(Object.values(emplObj)[index]) && myKey === 'department' ? 
                                        Object.values(emplObj)[index][0].departmentName :
                                    String(Object.values(emplObj)[index])
                                    
                                    }
                                </td>
                                
                            ))}
                        <td>
                            {/* <button type="button" className="btn btn-primary btn-sm"><FontAwesomeIcon icon={faPen} /></button> */}
                            <div className='but-cont'>
                                <Button 
                                    datatype='button' 
                                    addClass='btn-sm color-blue'
                                    bgColor="btn-primary"
                                    value = {
                                        <FontAwesomeIcon icon={faPen} />
                                    }
                                ></Button>
                                <Button 
                                    datatype='button' 
                                    addClass='btn-sm color-red'
                                    bgColor="btn-danger"
                                    value = {
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    }
                                ></Button>
                            </div>
                        </td>
                        </tr>
                    )) 
                    // : null
                }
                    
                </tbody>
            
            </table>
            <Pagination></Pagination>
        </div>
    )
}