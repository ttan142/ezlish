const router = require("express").Router();
const passport = require("passport");
const generateToken = require('../utils/generateToken');
const CLIENT_URL = "http://localhost:3000/";
const Refresh = require('../models/refreshTokenModel');
const asyncHandler = require('express-async-handler');
const createRefresh = require('../controllers/refreshController')
const User = require("../models/userModel")

function omit(obj, ...props) {
  const result = { ...obj };
  props.forEach(function (prop) {
    delete result[prop];
  });
  return result;
}


router.get("/login/success", asyncHandler(async (req, res) => {
  if (req.user) {
   
  
    const rest = await Refresh.findOne({ user: req.user._id})
    if(!rest){
     const  user = User.findById(req.user._id);
     console.log(user);
      req.user.refreshToken=createRefresh.createToken(user)
    } else req.user.refreshToken = rest.token;
    /*const user = await Refresh.findById({"user":req.user._id});*/
    // sign with googleId
    req.user.token = generateToken(req.user.googleId)
    
    const result = omit(req.user,'googleId');
    res.status(200).json({
      success: true,
      message: "successfull",
      user: result
      //   cookies: req.cookies
    });
    //console.log(result);
  }
}));

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile","email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router