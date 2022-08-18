export function searchPhrase(value, employeesState){
    let newArr = []
    let subVerif, verif

    let isSearch
    let searchResult

    if(value.length >= 3){
        isSearch = true
        
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
                        emp[key] === null ? null :
                        typeof emp[key] === 'object' ? 
                        Object.keys(emp[key][0]).forEach((subKey)=>(
                            subKey === 'createdAt' ||
                            subKey === 'updatedAt' ||
                            subKey === '__v' ||
                            subKey === '_id' ? null :
                            (
                                
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
                        // : emp[key] === null ? null :
                         
                        String(emp[key]).indexOf(value)!== -1 ?
                        (   
                                newArr.length === 0 ? newArr.push(Object.assign({}, emp)) : null,
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
                    
                    )
                ))
                
            
            
        )
        // console.log(value.length)
        // console.log(newArr)
        searchResult = newArr
    }else{
        isSearch = false
    }

    return {isSearch, searchResult}
    
}