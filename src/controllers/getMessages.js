import User from "../models/user.js";
import jwt from "jsonwebtoken";
const getMessages=async(req,res)=>{
    
    const token=req.signedCookies["auth_token"]
    if(token){
    const userData= jwt.verify(token, process.env.TOKEN_SECURITY);
    const userEmail=userData.email

    const user =await User.findOne({ email: userEmail})
    // await User.updateMany({email:userEmail},{$set:{chats:[]}})
    // user.save()
    

    res.status(200).json(user.chats)}
    else{
        res.status(404)
    }


}

export default getMessages