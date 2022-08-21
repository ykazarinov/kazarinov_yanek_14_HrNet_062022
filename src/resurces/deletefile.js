import authHeader from "../services/auth-header";
import axios from "../axios";


export default async function handleDeleteFile (imageName){
    try{
        await axios.delete('/uploads/:' + imageName.split('/').pop(), {headers: authHeader()})
    }
    catch(err){
        console.warn(err)
    }
}