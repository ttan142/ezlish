const jwt = require('jsonwebtoken');
const { TokenExpiredError } = jwt;
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
    }
    return res.sendStatus(401).send(err);
}

exports.protect = asyncHandler(async (req, res, next) => {
    let token;
    
    if (!req.headers["x-access-token"]) {
        res.status(403).json('No token provided');
    }
    token = req.headers["x-access-token"];
      
           /*  JWT TOKEN - console.log(req.headers.authorization)  */
           
     jwt.verify(token, process.env.JWT_SECRET, (err,decoded)=>{
            if(err){
                return catchError(err, res);

            }
            
            req.user =  User.findById(decoded.id);
            next();
               
     });
   
    });

exports.admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
    
};


