const { join } = require("path");
require('dotenv').config({path:join(__dirname,'../.env')});
const express = require("express");
const cors = require("cors");
const bearerToken = require("express-bearer-token");
const cookieSession = require("cookie-session");
const passport = require("passport");
const cookieParser = require('cookie-parser');

// console.log("isi dari __dirname :" + __dirname);
const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(bearerToken());
// #destination file storage(image/pdf/document)
app.use("/", express.static(__dirname + "/public"));
app.use(cookieParser())

// required middlewares google auth
app.use(
  cookieSession({
    name: "authSession",
    keys: ["askduhakdnkbiygvhbad7a6s*&^*S^D8asdbk"],
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "None",
    secure: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());


//#region API ROUTES

const userRouter = require("./routers/userRouter");
const calendarRouter = require("./routers/calendarRouter");
const landingRouter = require("./routers/landingRouter");
const passportRouter = require("./routers/passportRouter");
app.use("/api/user", userRouter);
app.use("/api/calendar", calendarRouter);
app.use("/api/landing", landingRouter);
app.use('/api/auth', passportRouter);
// ===========================
// NOTE : Add your routes here

app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, Student !",
  });
});

// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err);
    res.status(500).send(err);
  } else {
    next();
  }
});

//#endregion

//#region CLIENT
const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"));
});

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
