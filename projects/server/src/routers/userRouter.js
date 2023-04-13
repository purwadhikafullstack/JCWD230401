const route = require("express").Router();
const {
  register,
  login,
  keeplogin,
  changepassword,
  forgotpassword,
  resetpassword,
  registerastenant,
  verify,
  sendverificationemail,
  editprofile,
  updateprofileimage,
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
route.post(
  "/registerastenant",
  // checkUser, //masih error
  uploader("/api/imgIdCard", "IDC").array("image_ktp", 1),
  registerastenant
);
route.patch("/verifyaccount", readToken, verify);
route.post("/sendverificationemail", readToken, sendverificationemail);
route.patch("/editprofile", readToken, checkUser, editprofile);
route.patch(
  "/updateprofileimage",
  readToken,
  uploader("/api/profileImage", "PRF").array("image_profile", 1),
  updateprofileimage
);

module.exports = route;
