import { useDispatch, useSelector } from 'react-redux';
import { transcription } from '../app.config';
import {setSearchResult, setIsSearch, setSearchValue} from '../slices/getAllEmployees.slice'
import { useEffect } from 'react';
import {searchPhrase} from '../resurces/searchphrase'



export default function Search(){
    const  currentLang  = useSelector((state) => state['lang'].actualLang)
    const langData = transcription.find(lng => lng.lang === currentLang).data.employees
    const {searchValue, employeesState} = useSelector((state)=>state.allEmployees)
    const dispatch = useDispatch()

   

    useEffect(()=>{


        let serchRes = searchPhrase(searchValue, employeesState)
       
        if(serchRes.isSearch && serchRes.searchResult){
            dispatch(setIsSearch(serchRes.isSearch))
            dispatch(setSearchResult(serchRes.searchResult))
        }else if(!serchRes.isSearch){
            dispatch(setIsSearch(serchRes.isSearch))
        }
        
    },[searchValue])


    return(
        <div>
            <label> {langData[5]}
                <input 
                    className='search-input' 
                    type='text' 
                    onChange={(e)=>dispatch(setSearchValue(e.target.value))} />
            </label>
        </div>
    )
}