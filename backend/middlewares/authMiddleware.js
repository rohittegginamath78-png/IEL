
const jwt = require("jsonwebtoken");

const authmiddleware = (req , res , next)=>{
    try{
        const authheader = req.header.authorization;

    if(!authheader){
        return res.status(401).json({message: "No token is provided"});
    }
    const token = authheader.split(" ")[1];
    if(!token){
        return res.status(401).json({message : "Invalid token format"})
    }
    const decoded = jwt.verify(token , process.env.JWT_SECRET );
    
    req.userId = decoded.userId;
    next();
    }catch(err){
        res.status(401).json({
            message:"Token is invalid or expired"
        })
    }
}

module.exports = authmiddleware;