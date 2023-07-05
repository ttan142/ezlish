const randToken = require('rand-token');
const RefreshToken = require("../models/refreshTokenModel")
const jwt = require('jsonwebtoken')
const generateToken = require('../utils/generateToken');
exports.createToken = async function (user) {
    let expiredAt = new Date();
    expiredAt.setSeconds(
        expiredAt.getSeconds() + process.env.JWT_REFRESH_EXPIRE
    );
    let _token = randToken.generate(100);
   // generate alpha numeric 100
   
    const  _object = await RefreshToken.create({
        token: _token,
        user: user._id,
        expiryDate: expiredAt.getTime(),
    });
    console.log(_object);
    
    return _token;
};

const verifyExpiration = (token) => {
  
    return token.expiryDate.getTime() < new Date().getTime();
}

/*can truyen body refreshToken:"string" */
exports.refreshToken = async (req, res) => {
    const { refreshToken: requestToken } = req.body;
    if (requestToken == null) {
        return res.status(401).json({ message: "Refresh Token is required!" });
    }
    try{
        let refreshToken = await RefreshToken.findOne({ token: requestToken });
        if (!refreshToken) {
            res.status(403).json({ message: "Refresh token is not in database!" });
            return;
        }
        
        if (verifyExpiration(refreshToken)) {
            RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();
            res.status(403).json({
                message: "Refresh token was expired. Please make a new signin request",
            });
            return;
        }

        let newAccessToken = generateToken(refreshToken.user); 
        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: refreshToken.token,
        });
    }catch(err){
        res.status(500).json(err);
    }
};
