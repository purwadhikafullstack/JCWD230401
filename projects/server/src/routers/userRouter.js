const route = require("express").Router();
const {
  register,
  login,
  keeplogin,
  changepassword,
  forgotpassword,
  resetpassword,
  registerastenant
} = require("../controllers/userController");
const { readToken } = require("../helper/jwt");
const uploader = require("../helper/uploader");
const { checkUser } = require("../helper/validator");


route.post("/register", checkUser, register);
route.post("/auth", checkUser, login);
route.get("/keeplogin", readToken, keeplogin);
route.patch("/changepw", readToken, checkUser, changepassword);
route.post("/forgotpw", checkUser, forgotpassword);
route.patch("/resetpw", readToken, checkUser, resetpassword);
route.post("/registerastenant"
// , checkUser
, uploader('/imgIdCard', 'IDC').array('image_ktp', 1), registerastenant);


module.exports = route;
