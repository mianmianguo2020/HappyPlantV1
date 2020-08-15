const passport = require("passport");
const db = require('../models');
require('dotenv').config();


const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

passport.use(new LocalStrategy(
  {
    usernameField: "name"
  },
  function (name, password, done) {
    // When a user tries to sign in this code runs
    let dbUser = { name, password }
    db.User.findOne({
      "user.name": name
    }).then(function (dbUser) {
      // If there's no user with the given email
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect username."
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // If none of the above, return the user
      return done(null, { id:dbUser._id, name: dbUser.user.name });
    });
  }
))

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

passport.use(new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.ACCESS_TOKEN_SECRET
  },
  (data, done) => {
    try {
      const username = data.name;
      db.User.findOne({
        "user.name": username
      }).then(function (dbUser) {
        if (dbUser === null) {
          return done(null, false, { message: "Invalid username" });
        }
        return done(null, { id: dbUser._id });
      });
    }
       catch(error) {
      return done(null, false, { message: "Invalid token" })
    }
  }
))

module.exports = passport;



