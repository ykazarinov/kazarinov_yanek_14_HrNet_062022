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

    const {hidden1} = useSelector((state) => state.modal1)
    const {hidden2} = useSelector((state) => state.modal2)
    const {hidden3} = useSelector((state) => state.modal3)

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
        <div className='col-lg-6 col-sm-12 text-align-right'>
            <label htmlFor='search'  aria-label={langData[5]} > {langData[5]}
                <input 
                    aria-labelledby='search'
                    tabIndex={hidden1 && hidden2 && hidden3 ? '7': '-1'}
                    name='search'
                    id='search'
                    className='search-input' 
                    type='text' 
                    onChange={(e)=>dispatch(setSearchValue(e.target.value))} />
            </label>
        </div>
    )
}