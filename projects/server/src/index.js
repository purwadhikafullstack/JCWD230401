const { join } = require("path");
require("dotenv/config");
require("dotenv").config({ path: join(__dirname, ".env") });
require("dotenv").config({ path: join(__dirname, ".env") });
const express = require("express");
const cors = require("cors");
const bearerToken = require("express-bearer-token");

// console.log("isi dari __dirname :" + __dirname);
const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(bearerToken());
app.use("/", express.static(__dirname + "/public"));

//#region API ROUTES
const transactionRouter = require('./routers/transactionRouter');
const categoryRouter = require('./routers/categoryRouter');
const userRouter = require('./routers/userRouter');
const propertyRouter = require('./routers/propertyRouter');
const orderRouter = require('./routers/orderRouter');
const roomRouter = require('./routers/roomRouter');
const calendarRouter = require("./routers/calendarRouter");
const reviewRouter = require("./routers/reviewRouter");
const specialRouter = require("./routers/specialRouter");
const maintenanceRouter = require("./routers/maintenanceRouter");
const reportRouter = require("./routers/reportRouter");
const { reminderCheckInUser } = require("./helper/schedule");

app.use('/api/user', userRouter);
app.use('/api/transaction', transactionRouter)
app.use('/api/category', categoryRouter)
app.use('/api/property', propertyRouter)
app.use('/api/order', orderRouter)
app.use('/api/room', roomRouter)
app.use("/api/calendar", calendarRouter);
app.use("/api/review", reviewRouter);
app.use("/api/property", propertyRouter);
app.use("/api/special", specialRouter);
app.use("/api/maintenance", maintenanceRouter);
app.use("/api/report", reportRouter)
// ==============================================
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

// reminderCheckInUser()

const value = 25000;
const displayedValue = (value / 1000).toFixed(0); // '500'
console.log("displayedValue", displayedValue); // Output: 500



// error
app.use((err, req, res, next) => {
    if (req.path.includes("/api/")) {
        console.error("Error : ", err);
        res.status(500).send(err);
    } else {
        next();
    }
});

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
