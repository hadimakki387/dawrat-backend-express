// this file contains that functions that would be use in the controller

import { User } from "../user"
import { getUserByEmail } from "../user/user.service"

const logWithEmailAndPassword = async (email:string,password:string)=>{
    const user  = await getUserByEmail(email)
    
}