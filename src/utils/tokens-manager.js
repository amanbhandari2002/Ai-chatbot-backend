import jwt from "jsonwebtoken";

const tokenGenerator= (id,email,expire)=>{
    const token=  jwt.sign({id,email},process.env.TOKEN_SECURITY,{ expiresIn: expire});

    return token
}

export default tokenGenerator