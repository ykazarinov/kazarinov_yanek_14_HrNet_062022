import { useDispatch, useSelector } from 'react-redux';

export default function Pagination(props){
    const {paginatedArray} = useSelector((state)=>state.allEmployees)
    const {actualPaginNumber} = useSelector((state)=>state.allEmployees)
    const {actualTheme} = useSelector((state) => state.theme)

    const {hidden1} = useSelector((state) => state.modal1)
    const {hidden2} = useSelector((state) => state.modal2)
    const {hidden3} = useSelector((state) => state.modal3)

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
                    tabIndex={hidden1 && hidden2 && hidden3 ? '10': '-1'}
                        title={index}
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
                        onKeyDown={(e) => e.keyCode === 13 ? pagNumberClick(e) : null}
                    >
                        {index}
                    </div>
                )) : null
            }
        </div>
    )
}