
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const refresh = require('./controllers/refreshController')

const Refresh = require("./models/refreshTokenModel")
const GOOGLE_CLIENT_ID = "1085038059617-hdhu0vpbgg8pl2knb524mj9a91j0ssm3.apps.googleusercontent.com"  
const GOOGLE_CLIENT_SECRET ="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"

GITHUB_CLIENT_ID = "your id";
GITHUB_CLIENT_SECRET = "your id";

FACEBOOK_APP_ID = "your id";
FACEBOOK_APP_SECRET = "your id";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    //accessToken of google api
    async (accessToken, refreshToken, profile, done) => {
    
      const existingUser = await User.findOne({ googleId: profile.id });
    
      if (existingUser) {
      
      
         let token = refresh.createToken(existingUser)
        
  
        return done(null, existingUser);
      }
    
      const user = await new User({
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.name.familyName + ' ' + profile.name.givenName
       ,photo: profile.photos[0].value,
      }).save();
      let refreshT = await refresh.createToken(user);
      done(null, user);
    })
);
/*

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);*/
/*
passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);
*/
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

