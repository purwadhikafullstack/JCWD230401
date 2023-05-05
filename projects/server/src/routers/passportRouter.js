const route = require("express").Router();
const googleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const jwt = require("jsonwebtoken");
const cookieSession = require("cookie-session");
const sequelize = require("sequelize");
const model = require("../models");
const { v4: uuidv4 } = require("uuid");
const cookieParser = require("cookie-parser");

//serializeUser determines which data of the user object should be stored in the session.
passport.serializeUser((user, done) => {
  done(null, user);
});

//deserialize are used to set id as a cookie in the user's browser and to get the id from the cookie when it then used to get user info in a callback.
passport.deserializeUser((user, done) => {
  done(null, user);
});

//Configuring google's strategy
passport.use(
  new googleStrategy(
    {
      clientID:
        "308432764826-9gi91q8c9d8ur2knl6icdemcjj1qrkt3.apps.googleusercontent.com", //passing CLIENT ID
      clientSecret: "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", //Passing CLIENT SECRET
      callbackURL: "http://localhost:8000/api/auth/google/callback", //This means after signin on what route google should redirect
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      const ormTransaction = await model.sequelize.transaction();
      try {
        let user = await model.user.findAll({
          where: { email: profile.emails[0].value },
        });
        if (user && user.length > 0) {
          //if email exist in database login
          await ormTransaction.commit();
          return done(null, user);
        } else if (user.length == 0) {
          //if email doesnt exist in database register
          const uuid = uuidv4();
          let newUser = await model.user.create(
            {
              uuid,
              email: profile.emails[0].value,
              roleId: 1,
              password: "NULL",
              phone: "NULL",
            },
            {
              transaction: ormTransaction,
            }
          );
          let newUserDetail = await model.user_detail.create(
            {
              uuid,
              name: profile.displayName,
              userId: newUser.id,
              image_profile: profile.photos[0].value,
            },
            {
              transaction: ormTransaction,
            }
          );
          await ormTransaction.commit();
          return done(null, profile);
        }
      } catch (error) {
        if (ormTransaction.finished === "commit") {
          console.log("Transaction already committed");
        } else {
          await ormTransaction.rollback();
        }
        console.log(error);
        return done(error, false);
      }
    }
  )
);

// Passing google authenticate method as a middleware
route.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// after signin the google will redirect to this route
route.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    //If user exist
    if (req.user) {
      console.log("ini isi req.user :", req.user[0]);
      const googleAuthToken = jwt.sign(
        { googleAuthToken: req.user },
        "tempatku",
        { expiresIn: "24h" }
      );
      res.cookie("googleAuthToken", googleAuthToken, {
        expires: new Date(Date.now() + 86400 * 1000),
        // httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      res.redirect("http://localhost:3000");
    }
  }
);

// send data to frontend
route.get("/login/success", async (req, res, next) => {
  const googleAuthToken = req.cookies.googleAuthToken;
  if (googleAuthToken) {
    try {
      const decrypt = jwt.verify(googleAuthToken, "tempatku");
      const user = decrypt.googleAuthToken[0];
      console.log("ini isi dari req.user google :", user.id);
      let getuser = await model.user.findAll({
        where: { id: user.id },
        include: [
          { model: model.user_detail },
          { model: model.role, attributes: ["role"] },
        ],
      });
      // resolve cors blocked
      res.header("Access-Control-Allow-Origin", "http://localhost:3000");
      res.header("Access-Control-Allow-Credentials", true);
      res.status(200).json({
        success: true,
        message: "login successfull ✅",
        getuser,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  } else {
    res.status(400).send({
      success: false,
      message: "cookie not found ❌",
    });
  }
});

route.get("/logout", (req, res) => {
  // resolve cors blocked
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  req.session = null;
  res.clearCookie("googleAuthToken");
  res.redirect("http://localhost:3000");
});

module.exports = route;
