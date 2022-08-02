import { useDispatch } from "react-redux"

export default function PaginCountSelect(){
    const dispatch = useDispatch()

    const createCountSelect = ((num)=>{
        return {
            type: "allEmployees/setPaginCount",
            payload: num
        }
    })

    return(
        <select 
            onChange={(e)=> dispatch(createCountSelect(Number(e.target.value)))}
        >
            <option>5</option>
            <option>10</option>
            <option>15</option>
            <option>50</option>
            <option>100</option>
            <option>All</option>
        </select>
    )
}