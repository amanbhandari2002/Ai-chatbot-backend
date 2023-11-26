import { Router } from "express";
import {getAllUsers} from "../controllers/user-controllers.js";
import { signUp , login,logout} from "../controllers/user-controllers.js";
import { signupValidations,SignupMiddleware,loginValidators,loginMiddleware, auth_verification } from "../utils/validators.js";



const userRoutes= Router();



// validations are the set of rules for validation,
// validate is an middleware to check if data is valid or not

userRoutes.get("/",getAllUsers);
userRoutes.post("/signup",signupValidations(),SignupMiddleware,signUp);
userRoutes.post("/login",loginValidators(),loginMiddleware,login);
userRoutes.get("/auth-verification",auth_verification)
userRoutes.get("/logout",logout)





export default userRoutes;

