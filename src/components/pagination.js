import { useDispatch, useSelector } from 'react-redux';

export default function Pagination(props){
    const {paginatedArray} = useSelector((state)=>state.allEmployees)
    const {actualPaginNumber} = useSelector((state)=>state.allEmployees)
    const {actualTheme} = useSelector((state) => state.theme)

    const dispatch = useDispatch()

    const setPagNumber = ((num)=>{
        return {
            type: "allEmployees/setActualPaginNumber",
            payload: num
        }
    })

    const pagNumberClick = ((e)=>{
        dispatch(setPagNumber(Number(e.target.innerText)))
    })

    return (

        <div className="pagination">
            {   paginatedArray.length > 1 ?
                paginatedArray.map((line, index)=>(

                    <div 
                        className={
                            actualTheme === 'theme-light' ? (
                                actualPaginNumber === index ? 
                                'btn btn-sm pagination-item btn-primary color-white' : 
                                'btn btn-sm pagination-item btn-secondary color-white'
                            ) : (
                                actualPaginNumber === index ?
                                'btn btn-sm pagination-item btn-outline-dark color-blue':
                                'btn btn-sm pagination-item btn-outline-dark color-white'
                            )
                        }
                        key={`pag` + index}
                        onClick={
                            (e)=> 
                            pagNumberClick(e)
                        }
                    >
                        {index}
                    </div>
                )) : null
            }
        </div>
    )
}