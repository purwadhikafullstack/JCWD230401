const { join } = require("path");
require("dotenv/config");
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
// #destination file storage(image/pdf/document)
app.use("/", express.static(__dirname + "/public"));

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
const { reminderCheckInUser } = require("./helper/schedule");

app.use('/api/user', userRouter);
app.use('/api/transaction', transactionRouter)
app.use('/api/category', categoryRouter)
app.use('/api/property', propertyRouter)
app.use('/api/order', orderRouter)
app.use('/api/room', roomRouter)
app.use("/api/calendar", calendarRouter);
app.use("/api/review", reviewRouter);

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

// reminderCheckInUser()

let arr1 = [
  { propertyId: 1, name: 'hotel 1', normalPrice: 25000, description: 'sss', location: 'jakarta', rating: 4.00 },
  { propertyId: 2, name: 'resort 1', normalPrice: 40000, description: 'sss', location: 'bali', rating: 4.00 }
];

let arr2 = [
  { id: 1, start_date: '2023-05-06', end_date: '2023-05-08', propertyId: 1, priceOnDate: 1000 },
  { id: 2, start_date: '2023-05-06', end_date: '2023-05-08', propertyId: 2, priceOnDate: 2000 },
  { id: 3, start_date: '2023-05-06', end_date: '2023-05-08', propertyId: 1, priceOnDate: 3000 }
];


let final = arr1.map(item1 => {
  let item2 = arr2.find(item => item.propertyId === item1.propertyId);
  console.log(item2);
  if (item2) {
    return { ...item1, normalPrice: item2.priceOnDate };
  } else {
    return item1
  }
});



console.log("ssss1", final);


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
