import { body, validationResult } from 'express-validator';
import jwt from "jsonwebtoken";
import User from '../models/user.js';


const signupValidations = () => {
    const allValidations= [body("name", "something wrong with name").not().isEmpty(),
    body("email", "something wrong with email").not().isEmpty().isEmail(),
    body("password", "something wrong with password").not().isEmpty().isLength({ min: 6 }),
    ]

    return allValidations;
}


// VALIDATIONS CHECKER MIDDLEWARE(USING express-validator).......

const SignupMiddleware = (req, res, next) => {
    const error = validationResult(req);
    if (error.isEmpty()) {
        return next()
    }
    return res.status(422).json({ "error": error.array(), "here": "WTF" });
}


const loginValidators=()=>{
    const allValidations= [body("email", "something wrong with email").not().isEmpty().isEmail(),
    body("password", "something wrong with password").not().isEmpty().isLength({ min: 6 }),
    ]

    return allValidations;
}

const loginMiddleware=(req,res,next)=>{
    const error= validationResult(req)
    if(error.isEmpty){
        return next();
    }
    return res.status(422).json({"error":error.array()})
}

const auth_verification=async (req,res)=>{
    const myCookie=req.signedCookies['auth_token']

    if(!myCookie){
       
        return res.status(400).send("cookie not found")
    }
   
  
    try{
    const tokenVerify = await jwt.verify(myCookie, process.env.TOKEN_SECURITY);
    

    const user=await User.findById(tokenVerify["id"]);

    
    return res.status(200).json({'id':tokenVerify["id"],'email':user["email"],"name":user["name"]})
    }
    catch(err){
        return res.status(400).json({"error":"token invalid"})
    }
}


export { signupValidations, SignupMiddleware, loginValidators, loginMiddleware, auth_verification }