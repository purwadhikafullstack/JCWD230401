const route = require("express").Router();
const {
  register,
  login,
  keeplogin,
  changepassword,
  forgotpassword,
  resetpassword,
} = require("../controllers/userController");
const { readToken } = require("../helper/jwt");
const { checkUser } = require("../helper/validator");

route.post("/register", checkUser, register);
route.post("/auth", checkUser, login);
route.get("/keeplogin", readToken, keeplogin);
route.patch("/changepw", readToken, checkUser, changepassword);
route.post("/forgotpw", checkUser, forgotpassword);
route.patch("/resetpw", readToken, checkUser, resetpassword);

module.exports = route;
