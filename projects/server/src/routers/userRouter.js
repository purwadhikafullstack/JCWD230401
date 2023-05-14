const route = require("express").Router();
const {
  register,
  login,
  keepLogin,
  changePassword,
  forgotPassword,
  resetPassword,
  registerAsTenant,
  verify,
  sendVerificationEmail,
  editProfile,
  updateProfileImage,
  showKTP,
} = require("../controllers/userController");
const { readToken } = require("../helper/jwt");
const uploader = require("../helper/uploader");
const { checkUser } = require("../helper/validator");

route.post("/register", checkUser, register);
route.post("/auth", checkUser, login);
route.get("/keeplogin", readToken, keepLogin);
route.patch("/changepw", readToken, checkUser, changePassword);
route.post("/forgotpw", checkUser, forgotPassword);
route.patch("/resetpw", readToken, checkUser, resetPassword);
route.post("/registerastenant", uploader("/imgIdCard", "IDC").array("images", 1), checkUser, registerAsTenant);
route.patch("/verifyaccount", readToken, verify);
route.post("/sendverificationemail", readToken, sendVerificationEmail);
route.patch("/editprofile", readToken, checkUser, editProfile);
route.patch("/updateprofileimage", readToken, uploader("/profileImage", "PRF").array("image_profile", 1), updateProfileImage);
route.get("/showktp", readToken, showKTP);

module.exports = route;
