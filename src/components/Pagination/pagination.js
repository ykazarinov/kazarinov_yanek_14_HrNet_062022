export default function Pagination(props){

    const createSubarray = ((array, size)=>{
        let subarray = [];
        for (let i = 0; i <Math.ceil(array.length/size); i++){
            subarray[i] = array.slice((i*size), (i*size) + size);
        }
        return subarray;
    })

    let arrayByPages = createSubarray(props.array, 3)

    console.log(arrayByPages)

    return (
        <div className="pagination">
            {
                arrayByPages.map((line, index)=>{
                    <div className="pagination-item">
                        {index}
                    </div>
                })
            }
        </div>
    )
}