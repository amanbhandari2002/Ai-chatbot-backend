import User from "../models/user.js";
import {hash, compare} from "bcrypt"
import tokenGenerator from "../utils/tokens-manager.js";


const getAllUsers=async (req,res,next)=>{
    // get all users from the database

    try{
        const users= await User.find();
        return res.status(200).json({message:"OK",users});
    }
    catch(err){
        return res.status(200).json({message:"error",cause:err.message});;
    }
}



const signUp=async (req,res)=>{
    // add new user to the database...

    try{
      
        const {name,email,password}=req.body;
        const existingUser= await User.findOne({email})
        if(existingUser){
            return res.status(422).json({"error":"user already exist"});
        }
        res.clearCookie("auth_token", {httpOnly:true, signed:true,path:"/",domain:"aibotbackend.onrender"})
        const hashPassowrd= await hash(password,10);

        const user = new User({name,email,password:hashPassowrd});
        user.save()

        const token= tokenGenerator(user._id.toString(),user.email,"7d")
    const expiretime = new Date();
    var date = expiretime.getDate();
    var expireTime = date + 7;
    expiretime.setDate(expireTime);
    res.cookie("auth_token",token,{path:'/',httpOnly:true, signed:true,expires:expiretime,domain:"aibotbackend.onrender"})

    return res.status(200).json({"message":"OK",user,email})
    }

    
    catch(err){
        return res.status(200).json({message:"error",cause:err.message});;
    }
}


const login=async (req,res)=> {

    const {email,password}=req.body;
    const user = await User.findOne({email})
    
    if(!user){
        return res.status(404).json({"error":"user not registered"})
    }

    res.clearCookie("auth_token", {httpOnly:true, signed:true,path:"/",domain:"aibotbackend.onrender"})

    const verifyPassword= await compare(password,user.password)
    if(verifyPassword==false){
        return res.status(400).json({"error":"password was incorect"})
    }

    const token= tokenGenerator(user._id.toString(),user.email,"7d")
    const expiretime = new Date();
    var date = expiretime.getDate();
    var expireTime = date + 7;
    expiretime.setDate(expireTime);
    res.cookie("auth_token",token,{path:'/',httpOnly:true, signed:true,expires:expiretime,domain:"aibotbackend.onrender"})
    return res.status(200).json({"message":"found",email,user})
}


const logout=async (req,res)=>{
    res.clearCookie("auth_token", {httpOnly:true, signed:true,path:"/",domain:"aibotbackend.onrender"})
    res.status(200).json({"message":"logout successful"})

}

export  {getAllUsers, signUp,login,logout};