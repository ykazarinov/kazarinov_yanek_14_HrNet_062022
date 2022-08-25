import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import { transcription } from '../app.config';
import { setActualPaginNumber } from '../slices/getAllEmployees.slice';

export default function PaginCountSelect(){
    const dispatch = useDispatch()
    const  currentLang  = useSelector((state) => state['lang'].actualLang)
    const langData = transcription.find(lng => lng.lang === currentLang).data.employees
    const {sortedArray} = useSelector((state)=>state.allEmployees)
    const emplCount = sortedArray.length
    const {paginCount} = useSelector((state) => state.allEmployees)

    const {hidden1} = useSelector((state) => state.modal1)
    const {hidden2} = useSelector((state) => state.modal2)
    const {hidden3} = useSelector((state) => state.modal3)

    const createCountSelect = ((num)=>{
        return {
            type: "allEmployees/setPaginCount",
            payload: num
        }
    })

    const changePaginSelect = ((e)=>{
        dispatch(setActualPaginNumber(0))
        dispatch(createCountSelect(Number(
            !isNaN(Number(e.target.value)) ?
            e.target.value : emplCount
        )))
    })

    const linesCounts = [5, 10, 15, 50, 100, langData[3]]

    return(
        <React.StrictMode>
            <label htmlFor="langselect" aria-label={langData[2] + paginCount + langData[4]}>
                {langData[2]}
            
                <select 
                    tabIndex={hidden1 && hidden2 && hidden3 ? '6': '-1'}
                    aria-labelledby='langselect'
                    value={paginCount}
                    onChange={(e)=> changePaginSelect(e)}
                    className='paginselect'
                >
                    {linesCounts.map((opt, index)=>(
                        <option 
                            value={String(opt)}
                            key={`opt` + index}
                        >
                            {opt}
                        </option>
                    ))}
                </select>
                {langData[4]}</label>
        </React.StrictMode>
    )
    
}