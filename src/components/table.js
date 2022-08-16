import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp, faUserPlus, faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons'
import {setSortDirection} from '../slices/getAllEmployees.slice';
import { useDispatch, useSelector } from 'react-redux';
import { transcription } from '../app.config';
import PaginCountSelect from './pagincountselect';
import Pagination from './pagination';
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { deleteEmployee } from "../slices/deleteEmployee.slice";
import { getAllEmployees } from "../slices/getAllEmployees.slice";
import { setSuccessFalse } from '../slices/deleteEmployee.slice';
import Search from './search';
import {toFrenchFormatDate} from './calendar'

export function byField(field, sortDirection) {
    let result
    if(field !== 'state' && field !== 'department'){
        sortDirection === 'ascending' ?
        result = ((a, b) => a[field] > b[field] ? 1 : -1) :
        result = ((a, b) => b[field] > a[field] ? 1 : -1)
    }else if(field === 'state'){
        sortDirection === 'ascending' ?
        result = ((a, b) => (
            a[field] !== null ?
            a[field][0].stateAbbreviation : 
            ''
        ) > (
            b[field] !== null ?
            b[field][0].stateAbbreviation :
            ''
        ) ? 1 : -1) :
        result = ((a, b) => (
            b[field] !== null ?
            b[field][0].stateAbbreviation :
            ''
        ) > (
            a[field] !== null ?
            a[field][0].stateAbbreviation : 
            ''
        ) ? 1 : -1)
    }else if(field === 'department'){
        sortDirection === 'ascending' ?
        result = ((a, b) => (
            a[field] !== null ?
            a[field][0].departmentName : 
            ''
        ) > (
            b[field] !== null ?
            b[field][0].departmentName :
            ''
        ) ? 1 : -1) :
        result = ((a, b) => (
            b[field] !== null ?
            b[field][0].departmentName :
            ''
        ) > (
            a[field] !== null ?
            a[field][0].departmentName : 
            ''
        ) ? 1 : -1)
    }
    
    return result
}

export default function Table(props){
    const dispatch = useDispatch()
    const {sort} = useSelector((state)=>state.allEmployees)
    const {sortDirection} = useSelector((state)=>state.allEmployees)
    const {sortedArray} = useSelector((state)=>state.allEmployees)
    const {paginCount} = useSelector((state)=>state.allEmployees)

    const {actualPaginNumber} = useSelector((state)=>state.allEmployees)
    const {paginatedArray} = useSelector((state)=>state.allEmployees)
    const {searchResult} = useSelector((state)=>state.allEmployees)
    const {actualTheme} = useSelector((state) => state.theme)
    const  currentLang  = useSelector((state) => state['lang'].actualLang)
    const langData = transcription.find(lng => lng.lang === currentLang).data.employees
    const {success} = useSelector((state)=>state.delEmployee)


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



    const sorting = ((objKey) => {
        if(objKey === sort){
            dispatch(setSortDirection())
        }
        dispatch(setTableSort(objKey))

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


    //after delete
    useEffect(()=>{
        dispatch(setSuccessFalse())
        dispatch(getAllEmployees())
    }, [success])


    useEffect(()=>{
        let clone = Object.assign([], searchResult);

        dispatch(createSortedArray(clone.sort(byField(sort, sortDirection)))) 
 
    }, [sort, sortDirection])

    useEffect(()=>{
        const clone = Object.assign([], sortedArray);
        let arrayByPages = createSubarray(clone, paginCount)
        dispatch(createPaginatedArray(arrayByPages))
    }, [sortedArray, paginCount])
    



    return (
        <div>
            <section className='above-table'>
                <section className='above-tabble-1'>
                    <Link 
                        to="/addemployee" 
                        className={
                            actualTheme === 'theme-light' ?
                            'btn btn-primary color-blue' :
                            'btn btn-outline-dark color-blue'
                        }
                    >
                        <FontAwesomeIcon icon={faUserPlus} />
                    </Link>
                    <PaginCountSelect></PaginCountSelect>
                </section>
                <Search></Search>
            </section>
            {searchResult.length > 0 ?
            <table className="table-cont">
            <thead>
                    <tr>
                        { 
                        Object.keys(paginatedArray[0][0]).map((objKey, index)=>(
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
                        }
                    </tr>
                </thead>
                <tbody>
                    { 
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
                                        
                                        myKey === 'birthday' || myKey === 'startday' ?
                                            toFrenchFormatDate(
                                                String(Object.values(emplObj)[index])
                                                )
                                                :
                                        Array.isArray(Object.values(emplObj)[index]) && myKey === 'state' ? 
                                            Object.values(emplObj)[index][0].stateAbbreviation :
                                        Array.isArray(Object.values(emplObj)[index]) && myKey === 'department' ? 
                                            Object.values(emplObj)[index][0].departmentName :
                                        Object.values(emplObj)[index] === null ?
                                            '':
                                        String(Object.values(emplObj)[index])
                                    }
                                >
                                    {   myKey === 'birthday' || myKey === 'startday' ?
                                            toFrenchFormatDate(Object.values(emplObj)[index]):
                                        Array.isArray(Object.values(emplObj)[index]) && myKey === 'state' ? 
                                            Object.values(emplObj)[index][0].stateAbbreviation :
                                        Array.isArray(Object.values(emplObj)[index]) && myKey === 'department' ? 
                                            Object.values(emplObj)[index][0].departmentName :
                                        Object.values(emplObj)[index] === null ?
                                            '':
                                        String(Object.values(emplObj)[index])
                                    
                                    }
                                </td>
                                
                            ))}
                        <td>
                            <div className='but-cont'>
                                <button 
                                    type='button' 
                                    className={ actualTheme === 'theme-light' ?
                                        'btn btn-sm btn-primary color-blue' :
                                        'btn btn-sm btn-outline-dark color-blue'
                                    }
                                >{<FontAwesomeIcon icon={faPen} />}</button>
                               
                                    <button 
                                        onClick={()=>dispatch(deleteEmployee(emplObj._id))}
                                        type='submit' 
                                        className={ actualTheme === 'theme-light' ?
                                            'btn btn-sm btn-danger color-red' :
                                            'btn btn-sm btn-outline-dark color-red'
                                        }
                                    >
                                        {<FontAwesomeIcon icon={faTrashCan} />}
                                    </button>
                               
                            </div>
                        </td>
                        </tr>
                        
                    )) 
                }
                    
                </tbody>
            
            </table>
            : 
            <div className="alert alert-secondary" role="alert">
                {langData[12]}
            </div>
            }
            <Pagination></Pagination>
        </div>
    )
}