const { categoryController } = require("../controllers");
const route = require("express").Router();

route.get("/getallcategory", categoryController.getAllCategoryTenant);
route.post("/addcategory", categoryController.addCategory);
route.patch("/deletecategory", categoryController.deleteCategory);
route.patch("/editcategory", categoryController.editCategory);

module.exports = route;
