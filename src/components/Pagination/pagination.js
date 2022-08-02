import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';


export default function Pagination(props){
    const {paginatedArray} = useSelector((state)=>state.allEmployees)
    const dispatch = useDispatch()

    const setPagNumber = ((num)=>{
        return {
            type: "allEmployees/setActualPaginNumber",
            payload: num
        }
    })

    return (
        <div className="pagination">
            {
                paginatedArray.map((line, index)=>(
                    <div 
                        className="pagination-item" 
                        key={`pag` + index}
                        onClick={
                            (e)=> 
                            dispatch(setPagNumber(Number(e.target.innerText)))
                            
                        }
                    >
                        {index}
                    </div>
                ))
            }
        </div>
    )
}