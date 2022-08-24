import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp, faUserPlus, faTrashCan, faPen, faCircleUser, faXmark } from '@fortawesome/free-solid-svg-icons'

import {setSortDirection, setLocalEmployee} from '../slices/getAllEmployees.slice';
import { useDispatch, useSelector } from 'react-redux';
import { transcription } from '../app.config';

import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { deleteEmployee } from "../slices/deleteEmployee.slice";

import { setSuccessFalse } from '../slices/deleteEmployee.slice';

import {fillCalendar1, fillCalendar2} from '../slices/calendar.slice'
import {setActualItem1, setActualItem2} from '../slices/select.slice'
import {setCloseSelect1, setCloseSelect2} from '../slices/select.slice'
import {setImageUrl} from '../slices/file.slice'

import {setEditableEmployee} from '../slices/editEmployee.slice'

import {API_REST_URL} from '../app.config'

import {toFrenchFormatDate} from './calendar'
import {LightBox} from '@artfish/lightbox'
import {useState} from "react"

import loadable from '@loadable/component'

const PaginCountSelect = loadable(() => import('./pagincountselect'));
const Pagination = loadable(() => import('./pagination'));
const Search = loadable(() => import('./search'));

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

    const {employeesState} = useSelector((state)=>state.allEmployees)

    const {actualPaginNumber} = useSelector((state)=>state.allEmployees)
    const {paginatedArray} = useSelector((state)=>state.allEmployees)
    const {searchResult} = useSelector((state)=>state.allEmployees)
    const {actualTheme} = useSelector((state) => state.theme)
    const  currentLang  = useSelector((state) => state['lang'].actualLang)
    const langData = transcription.find(lng => lng.lang === currentLang).data.employees
    const {success} = useSelector((state)=>state.delEmployee)

    const {editEmployeeSuccess} = useSelector((state)=>state.editEmployee)



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

        if(success === true){
            const clone = (Object.assign([], employeesState))
            const cloneIndex = clone.findIndex(item => item._id === elemId);
            clone.splice(cloneIndex, 1)
            dispatch(setLocalEmployee(clone))
            dispatch(setSuccessFalse())
        }
    }, [dispatch, success])






    useEffect(()=>{
        let clone = Object.assign([], searchResult);
       
        dispatch(createSortedArray(clone.sort(byField(sort, sortDirection)))) 
 
    }, [sort, sortDirection])

    useEffect(()=>{
        const clone = Object.assign([], sortedArray);
        let arrayByPages = createSubarray(clone, paginCount)
        dispatch(createPaginatedArray(arrayByPages))
    }, [sortedArray, paginCount])
    

    const [hidden, setHidden] = useState(true);
    const [elemId, setElemId] = useState(null)
    const openModal = (id) => {
      setHidden(false)
      setElemId(id)
    }
    const closeModal = () => {
      setHidden(true)
    }

    const deleteItem = (()=>{
        dispatch(deleteEmployee(elemId))

        setHidden(true)
    })

    const [hidden2, setHidden2] = useState(true);
    const [elemImg, setElemImg] = useState(null)
    const openModal2 = (img) => {
      setHidden2(false)
      setElemImg(img)
    }
    const closeModal2 = () => {
      setHidden2(true)
    }

    const dateToObject = (date) => {
        let myYear = date.substring(0,4)
        let myMonth = date.substring(5,7)
        let myDay = date.substring(8,10)
        return{
            choosedYear: myYear,
            choosedMonth: Number(myMonth),
            choosedDay: myDay,
            inputDate: toFrenchFormatDate(date)
        }
    }

    const editItem = (id) => {
        const item = employeesState.find(item=>item._id === id)
        dispatch(setEditableEmployee(item))
        dispatch(fillCalendar1(dateToObject(item.birthday)))
        dispatch(fillCalendar2(dateToObject(item.startday)))
        if(item.state !== null){
           
            dispatch(setActualItem1(item.state[0].stateName))
            dispatch(setCloseSelect1())
        }
        if(item.department !== null){
            dispatch(setActualItem2(item.department[0].departmentName))
            dispatch(setCloseSelect2())
        }
        if(item.photo){
            dispatch(setImageUrl(item.photo.replace(API_REST_URL, '')))
        }
        
        
       
        
    }

    return (
        <div>
            <LightBox 
                content={
                    <>
                    {langData[13]}
                    <div className='buttons-container'>
                        <button 
                            type='button' 
                            onClick={deleteItem}
                            className={ 
                                actualTheme === 'theme-light' ?
                                'btn btn-sm btn-danger color-red' :
                                'btn btn-sm btn-outline-dark color-red'
                            }
                        >{langData[14]}</button>
                        <button 
                            type='button'
                            onClick={closeModal}
                            className={ 
                                actualTheme === 'theme-light' ?
                                'btn btn-sm btn-primary color-blue' :
                                'btn btn-sm btn-outline-dark color-blue'
                            }
                        >{langData[15]}</button>
                    </div>
                    
                    </>
                }
                hidden={hidden}
                onClick={closeModal}
                close={<FontAwesomeIcon icon={faXmark} />}
            ></LightBox>

            <LightBox 
                content={
                    <div className='uploadImgCont'>
                        <img src={elemImg} alt='Uploaded' />
                    </div>
                    
                }
                hidden={hidden2}
                onClick={closeModal2}
                close={<FontAwesomeIcon icon={faXmark} />}
            ></LightBox>
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
            {paginatedArray.length > 0 ?
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
                                    
                                    className={myKey === 'photo' ? 'photoTd data' : 'data'}
                                    title={
                                        // myKey === 'photo' ?  <FontAwesomeIcon icon={faCircleUser} /> :
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
                                    {   
                                        myKey === 'photo' && String(Object.values(emplObj)[index]) ?  
                                        <FontAwesomeIcon 
                                            className='photoTd-icon'
                                            onClick={()=>openModal2(String(Object.values(emplObj)[index]))}
                                            icon={faCircleUser} 
                                        /> :
                                        myKey === 'photo' && !String(Object.values(emplObj)[index]) ?  
                                        null :

                                        myKey === 'birthday' || myKey === 'startday' ?
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
                                <Link
                                    onClick={
                                        ()=>editItem(emplObj._id)
                                    }
                                    to={'/editeemployee/' + emplObj._id} 
                                    type='button' 
                                    className={ actualTheme === 'theme-light' ?
                                        'btn btn-sm btn-primary color-blue' :
                                        'btn btn-sm btn-outline-dark color-blue'
                                    }
                                >{<FontAwesomeIcon icon={faPen} />}</Link>
                               
                                    <button 
                                        onClick={
                                            // ()=>dispatch(deleteEmployee(emplObj._id))
                                            ()=>openModal(emplObj._id)
                                        }
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