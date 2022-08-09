import { useDispatch, useSelector } from 'react-redux';
import { transcription } from '../app.config';
import {setSearchResult, setIsSearch} from '../slices/getAllEmployees.slice'
export default function Search(){
    const  currentLang  = useSelector((state) => state['lang'].actualLang)
    const langData = transcription.find(lng => lng.lang === currentLang).data.employees
    const {employeesState} = useSelector((state)=>state.allEmployees)
    const dispatch = useDispatch()

    const searchPhrase = ((value) =>{
        let newArr = []
        let subVerif, verif
        if(value.length >= 3){
            dispatch(setIsSearch(true))
            employeesState.map((emp)=>(
                // console.log(emp)
               
                    Object.keys(emp)).forEach((key)=>(
                        key === '_id' || 
                        key === 'photo' ||
                        key === 'user' ||
                        key === 'createdAt' ||
                        key === 'updatedAt' ||
                        key === '__v' ?  null :
                        (
                            typeof emp[key] === 'object' ?
                            Object.keys(emp[key][0]).forEach((subKey)=>(
                                subKey === 'createdAt' ||
                                subKey === 'updatedAt' ||
                                subKey === '__v' ||
                                subKey === '_id' ? null :
                                (
                                    // console.log(subKey +  ' : ' + emp[key][0][subKey])
                                    emp[key][0][subKey].indexOf(value)!== -1 ?
                                    (   newArr.length === 0 ? newArr.push(Object.assign({}, emp)) : null,
                                        newArr.forEach(obj=>{
                                            subVerif = false;
                                            // console.log(obj._id, emp._id)
                                            (String(obj._id) === String(emp._id) ? 
                                                subVerif = false : 
                                                subVerif = true
                                            )
                                        }
                                        ),
                                        subVerif === true ? 
                                        newArr.push(Object.assign({}, emp)): null
                                    )
                                     : null 
                                ) 
                            ))
                            : 
                            // console.log(key + ' : ' + emp[key])
                            String(emp[key]).indexOf(value)!== -1 ?
                            (   newArr.length === 0 ? newArr.push(Object.assign({}, emp)) : null,
                                newArr.forEach(obj=>{
                                    verif = false;
                                    // console.log(obj._id, emp._id)
                                    (String(obj._id) === String(emp._id) ? 
                                        verif = false : 
                                        verif = true
                                    )
                                }
                                ),
                                verif === true ? 
                                newArr.push(Object.assign({}, emp)): null
                            )
                             : null 
                            
                            
                            //newArr.push(Object.assign({}, emp)) : null
                         
                        )
                    ))
                    
                
                
            )
            // console.log(value.length)
            // console.log(newArr)
            dispatch(setSearchResult(newArr))
        }else{
            dispatch(setIsSearch(false))
        }
    })
    return(
        <div>
            <label> {langData[5]}
                <input 
                    className='search-input' 
                    type='text' 
                    onChange={(e)=>searchPhrase(e.target.value)} />
            </label>
        </div>
    )
}