import axios from 'axios'
import {ADMIN_URL , TIMEOUT} from '../const'
import ErrorHandler from '../errorHandler'
const addAdmin = async(username, password)=>{
    try{
    const addAdminURL = ADMIN_URL + '/new-admin'
    const result = await axios.post(addAdminURL, {
        username,
        password
    },
    {
        timeout : TIMEOUT,
        withCredentials : true
    }
    );
    return result.data;
    }catch(err){
        return ErrorHandler.errorHandler(err);
    }
    
}

export default{
    addAdmin
}